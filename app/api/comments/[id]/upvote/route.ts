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

    // Use a transaction to ensure vote record and count stay in sync
    const result = await db.transaction(async (tx) => {
      // Check if already upvoted
      const [existingUpvote] = await tx
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

      if (existingUpvote) {
        // Remove upvote record
        await tx
          .delete(commentUpvotes)
          .where(
            and(
              eq(commentUpvotes.commentId, commentId),
              eq(commentUpvotes.userId, session.userId)
            )
          );
        hasUpvoted = false;
      } else {
        // Add upvote record
        await tx.insert(commentUpvotes).values({
          commentId,
          userId: session.userId,
        });
        hasUpvoted = true;
      }

      // FIX: Set count to actual COUNT(*) of vote records instead of increment/decrement.
      // This ensures the denormalized count always matches reality, even if it drifted before.
      const [updated] = await tx
        .update(comments)
        .set({
          upvotes: sql`(SELECT COUNT(*) FROM comment_upvotes WHERE comment_id = ${commentId})`,
        })
        .where(eq(comments.id, commentId))
        .returning({ upvotes: comments.upvotes });

      return {
        hasUpvoted,
        upvotes: updated.upvotes || 0,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error toggling upvote:', error);
    return NextResponse.json({ error: 'Failed to toggle upvote' }, { status: 500 });
  }
}
