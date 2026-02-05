import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/lib/user-auth';
import { db } from '@/lib/db/supabase';
import { comments } from '@/lib/db/schema';
import { eq, and, isNull } from 'drizzle-orm';

const EDIT_WINDOW_MS = 2 * 60 * 60 * 1000; // 2 hours

// PATCH /api/comments/[id] - Edit a comment
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { id: commentId } = await params;
    const body = await req.json();
    const { content } = body;

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const trimmedContent = content.trim();
    if (trimmedContent.length < 1 || trimmedContent.length > 2000) {
      return NextResponse.json({ error: 'Content must be between 1 and 2000 characters' }, { status: 400 });
    }

    // Fetch the comment
    const [comment] = await db
      .select()
      .from(comments)
      .where(eq(comments.id, commentId))
      .limit(1);

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Check ownership
    if (comment.authorId !== session.userId) {
      return NextResponse.json({ error: 'Not authorized to edit this comment' }, { status: 403 });
    }

    // Check edit window
    const createdAt = new Date(comment.createdAt).getTime();
    const now = Date.now();
    if (now - createdAt > EDIT_WINDOW_MS) {
      return NextResponse.json({ error: 'Edit window has expired (2 hours)' }, { status: 403 });
    }

    // Update comment
    const [updated] = await db
      .update(comments)
      .set({
        content: trimmedContent,
        updatedAt: new Date(),
      })
      .where(eq(comments.id, commentId))
      .returning();

    return NextResponse.json({
      comment: {
        id: updated.id,
        content: updated.content,
        updatedAt: updated.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error editing comment:', error);
    return NextResponse.json({ error: 'Failed to edit comment' }, { status: 500 });
  }
}

// DELETE /api/comments/[id] - Delete a comment
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { id: commentId } = await params;

    // Fetch the comment
    const [comment] = await db
      .select()
      .from(comments)
      .where(eq(comments.id, commentId))
      .limit(1);

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Check ownership
    if (comment.authorId !== session.userId) {
      return NextResponse.json({ error: 'Not authorized to delete this comment' }, { status: 403 });
    }

    // Check if comment has replies
    const [reply] = await db
      .select({ id: comments.id })
      .from(comments)
      .where(eq(comments.parentId, commentId))
      .limit(1);

    if (reply) {
      return NextResponse.json(
        { error: 'Cannot delete a comment that has replies' },
        { status: 400 }
      );
    }

    // Soft delete the comment
    await db
      .update(comments)
      .set({
        isDeleted: true,
        deletedAt: new Date(),
        content: '[deleted]',
      })
      .where(eq(comments.id, commentId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}
