import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/lib/user-auth';
import { db } from '@/lib/db/supabase';
import { comments, commentUpvotes } from '@/lib/db/schema';
import { eq, and, sql } from 'drizzle-orm';

// POST /api/comments/[id]/upvote - Toggle upvote on a comment
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { id: commentId } = await params;

    // Check if comment exists
    const [comment] = await db
      .select()
      .from(comments)
      .where(eq(comments.id, commentId))
      .limit(1);

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Check if already upvoted
    const [existingUpvote] = await db
      .select()
      .from(commentUpvotes)
      .where(
        and(
          eq(commentUpvotes.commentId, commentId),
          eq(commentUpvotes.userId, session.userId)
        )
      )
      .limit(1);

    let hasUpvoted: boolean;
    let newUpvoteCount: number;

    if (existingUpvote) {
      // Remove upvote
      await db
        .delete(commentUpvotes)
        .where(
          and(
            eq(commentUpvotes.commentId, commentId),
            eq(commentUpvotes.userId, session.userId)
          )
        );

      // Decrement count
      const [updated] = await db
        .update(comments)
        .set({
          upvotes: sql`GREATEST(${comments.upvotes} - 1, 0)`,
        })
        .where(eq(comments.id, commentId))
        .returning({ upvotes: comments.upvotes });

      hasUpvoted = false;
      newUpvoteCount = updated.upvotes || 0;
    } else {
      // Add upvote
      await db.insert(commentUpvotes).values({
        commentId,
        userId: session.userId,
      });

      // Increment count
      const [updated] = await db
        .update(comments)
        .set({
          upvotes: sql`${comments.upvotes} + 1`,
        })
        .where(eq(comments.id, commentId))
        .returning({ upvotes: comments.upvotes });

      hasUpvoted = true;
      newUpvoteCount = updated.upvotes || 0;
    }

    return NextResponse.json({
      hasUpvoted,
      upvotes: newUpvoteCount,
    });
  } catch (error) {
    console.error('Error toggling upvote:', error);
    return NextResponse.json({ error: 'Failed to toggle upvote' }, { status: 500 });
  }
}
