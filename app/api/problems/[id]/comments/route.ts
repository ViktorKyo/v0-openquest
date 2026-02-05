import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/lib/user-auth';
import { db } from '@/lib/db/supabase';
import { comments, users, commentUpvotes, problems } from '@/lib/db/schema';
import { eq, and, isNull, desc, sql } from 'drizzle-orm';
import type { Comment, CommentAuthor } from '@/types/comment';

const EDIT_WINDOW_MS = 2 * 60 * 60 * 1000; // 2 hours

// GET /api/problems/[id]/comments - List comments for a problem
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: problemId } = await params;
    const session = await getUserSession(req);
    const currentUserId = session?.userId;

    // Fetch problem author to mark their comments
    const [problem] = await db
      .select({ authorId: problems.authorId })
      .from(problems)
      .where(eq(problems.id, problemId))
      .limit(1);

    const problemAuthorId = problem?.authorId;

    // Fetch top-level comments with author info
    const topLevelComments = await db
      .select({
        id: comments.id,
        problemId: comments.problemId,
        content: comments.content,
        upvotes: comments.upvotes,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        isDeleted: comments.isDeleted,
        parentId: comments.parentId,
        authorId: comments.authorId,
        authorName: users.name,
        authorAvatar: users.avatarUrl,
      })
      .from(comments)
      .leftJoin(users, eq(comments.authorId, users.id))
      .where(
        and(
          eq(comments.problemId, problemId),
          isNull(comments.parentId),
          eq(comments.isHidden, false)
        )
      )
      .orderBy(desc(comments.createdAt));

    // Fetch all replies
    const replies = await db
      .select({
        id: comments.id,
        problemId: comments.problemId,
        content: comments.content,
        upvotes: comments.upvotes,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        isDeleted: comments.isDeleted,
        parentId: comments.parentId,
        authorId: comments.authorId,
        authorName: users.name,
        authorAvatar: users.avatarUrl,
      })
      .from(comments)
      .leftJoin(users, eq(comments.authorId, users.id))
      .where(
        and(
          eq(comments.problemId, problemId),
          sql`${comments.parentId} IS NOT NULL`,
          eq(comments.isHidden, false)
        )
      )
      .orderBy(comments.createdAt);

    // If user is logged in, get their upvotes
    let userUpvotes: Set<string> = new Set();
    if (currentUserId) {
      const upvotes = await db
        .select({ commentId: commentUpvotes.commentId })
        .from(commentUpvotes)
        .where(eq(commentUpvotes.userId, currentUserId));
      userUpvotes = new Set(upvotes.map(u => u.commentId));
    }

    // Helper to transform DB row to Comment
    const transformComment = (row: typeof topLevelComments[0]): Comment => {
      const now = Date.now();
      const createdAt = new Date(row.createdAt);
      const canEdit = currentUserId === row.authorId && (now - createdAt.getTime()) < EDIT_WINDOW_MS;

      // Determine engagement badges for this commenter
      const engagement: CommentAuthor['engagement'] = {};
      if (row.authorId === problemAuthorId) {
        engagement.isProblemAuthor = true;
      }
      // TODO: When problem_engagements table exists, check if user is building/investing/team
      // engagement.isBuilder = ...
      // engagement.isInvestor = ...
      // engagement.isTeamApplicant = ...

      const hasEngagement = Object.keys(engagement).length > 0;

      return {
        id: row.id,
        problemId: row.problemId,
        author: {
          id: row.authorId,
          name: row.authorName || 'Anonymous',
          avatarUrl: row.authorAvatar || undefined,
          engagement: hasEngagement ? engagement : undefined,
        },
        content: row.content,
        upvotes: row.upvotes || 0,
        createdAt: createdAt,
        updatedAt: row.updatedAt ? new Date(row.updatedAt) : undefined,
        isDeleted: row.isDeleted || false,
        hasUpvoted: userUpvotes.has(row.id),
        canEdit,
        canDelete: currentUserId === row.authorId,
        replies: [],
      };
    };

    // Build comment tree
    const repliesMap = new Map<string, Comment[]>();
    for (const reply of replies) {
      const transformed = transformComment(reply);
      const parentId = reply.parentId!;
      if (!repliesMap.has(parentId)) {
        repliesMap.set(parentId, []);
      }
      repliesMap.get(parentId)!.push(transformed);
    }

    const commentsWithReplies: Comment[] = topLevelComments.map(comment => {
      const transformed = transformComment(comment);
      transformed.replies = repliesMap.get(comment.id) || [];
      // Can only delete if no replies
      transformed.canDelete = currentUserId === comment.authorId && transformed.replies.length === 0;
      return transformed;
    });

    return NextResponse.json({ comments: commentsWithReplies });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST /api/problems/[id]/comments - Create a new comment
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { id: problemId } = await params;
    const body = await req.json();
    const { content, parentId } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const trimmedContent = content.trim();
    if (trimmedContent.length < 1 || trimmedContent.length > 2000) {
      return NextResponse.json({ error: 'Content must be between 1 and 2000 characters' }, { status: 400 });
    }

    // If replying, verify parent exists and belongs to same problem
    if (parentId) {
      const [parent] = await db
        .select()
        .from(comments)
        .where(and(eq(comments.id, parentId), eq(comments.problemId, problemId)))
        .limit(1);

      if (!parent) {
        return NextResponse.json({ error: 'Parent comment not found' }, { status: 404 });
      }
    }

    // Check if user is the problem author
    const [problem] = await db
      .select({ authorId: problems.authorId })
      .from(problems)
      .where(eq(problems.id, problemId))
      .limit(1);

    const isProblemAuthor = problem?.authorId === session.userId;

    // Create comment
    const [newComment] = await db
      .insert(comments)
      .values({
        problemId,
        authorId: session.userId,
        parentId: parentId || null,
        content: trimmedContent,
      })
      .returning();

    // Increment problem comment count
    // TODO: Add this when problems table has comment_count

    return NextResponse.json({
      comment: {
        id: newComment.id,
        problemId: newComment.problemId,
        author: {
          id: session.userId,
          name: session.name || 'Anonymous',
          avatarUrl: session.avatarUrl || undefined,
          engagement: isProblemAuthor ? { isProblemAuthor: true } : undefined,
        },
        content: newComment.content,
        upvotes: 0,
        createdAt: newComment.createdAt,
        isDeleted: false,
        hasUpvoted: false,
        canEdit: true,
        canDelete: true,
        replies: [],
      },
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
