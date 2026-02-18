import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession, hasPermission, logAdminAction } from '@/lib/admin-auth';
import { db } from '@/lib/db/supabase';
import { comments, problems, problemModeration, users } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { sendModerationEmail } from '@/lib/email/send';
import { validateTweetUrls } from '@/lib/tweet-utils';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has moderation permission
    if (!hasPermission(session, 'moderator')) {
      return NextResponse.json(
        { error: 'You do not have permission to moderate problems' },
        { status: 403 }
      );
    }

    const { action, notes, tweetUrls: rawTweetUrls } = await req.json();
    const validatedTweetUrls = rawTweetUrls ? validateTweetUrls(rawTweetUrls) : undefined;

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const { id: problemId } = await params;

    // Get the problem
    const [problem] = await db
      .select()
      .from(problems)
      .where(eq(problems.id, problemId))
      .limit(1);

    if (!problem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    if (problem.status !== 'pending_review') {
      return NextResponse.json(
        { error: 'Problem is not pending review' },
        { status: 400 }
      );
    }

    // Get problem author info for email
    let author = null;
    if (problem.authorId) {
      const [authorResult] = await db
        .select()
        .from(users)
        .where(eq(users.id, problem.authorId))
        .limit(1);
      author = authorResult;
    }

    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    const shouldRequireLaunchComment = action === 'approve' && Boolean(problem.creatorLaunchCommentRequired);
    const launchCommentDraft = (problem.creatorLaunchCommentDraft || '').trim();

    if (shouldRequireLaunchComment && !problem.authorId) {
      return NextResponse.json(
        { error: 'Cannot approve: non-anonymous submission is missing author' },
        { status: 400 }
      );
    }

    if (shouldRequireLaunchComment && !launchCommentDraft) {
      return NextResponse.json(
        { error: 'Cannot approve: creator context comment is required before launch' },
        { status: 400 }
      );
    }

    await db.transaction(async (tx) => {
      let launchCommentId: string | null = null;
      const now = new Date();

      if (shouldRequireLaunchComment && problem.authorId) {
        const [insertedLaunchComment] = await tx
          .insert(comments)
          .values({
            problemId,
            authorId: problem.authorId,
            parentId: null,
            content: launchCommentDraft,
            isLaunchComment: true,
          })
          .returning({ id: comments.id });

        launchCommentId = insertedLaunchComment.id;
      }

      await tx
        .update(problems)
        .set({
          status: newStatus,
          moderatedAt: now,
          creatorLaunchCommentId: launchCommentId,
          creatorLaunchCommentPostedAt: launchCommentId ? now : null,
          creatorLaunchCommentDraft: launchCommentId ? null : problem.creatorLaunchCommentDraft,
          commentCount: launchCommentId
            ? sql`(
              SELECT COUNT(*)
              FROM comments c
              WHERE c.problem_id = ${problemId}
                AND c.is_deleted = FALSE
            )`
            : problem.commentCount,
          ...(validatedTweetUrls !== undefined && { tweetUrls: validatedTweetUrls }),
        })
        .where(eq(problems.id, problemId));

      await tx.insert(problemModeration).values({
        problemId,
        reviewedBy: session.adminDbId,
        status: action === 'approve' ? 'approved' : 'rejected',
        adminNotes: notes || null,
        rejectionReason: action === 'reject' ? notes || null : null,
        reviewedAt: now,
      });
    });

    // Log the action
    await logAdminAction({
      adminId: session.adminDbId,
      actionType: action === 'approve' ? 'approve_problem' : 'reject_problem',
      targetType: 'problem',
      targetId: problemId,
      notes: notes || `Problem ${action}ed`,
      metadata: {
        problemTitle: problem.title,
        authorId: problem.authorId,
      },
    });

    // Send email notification to author
    if (author?.email) {
      await sendModerationEmail({
        to: author.email,
        action,
        problemTitle: problem.title,
        problemId,
        notes,
        authorName: author.name || undefined,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Problem ${action}ed successfully`,
      problem: {
        id: problemId,
        status: newStatus,
      },
    });
  } catch (error) {
    console.error('Moderation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
