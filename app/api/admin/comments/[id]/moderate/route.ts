import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { db } from '@/lib/db/supabase';
import { comments, adminActions } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { action, reason } = body;

    if (!['hide', 'unhide', 'delete'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Get the comment
    const [comment] = await db
      .select()
      .from(comments)
      .where(eq(comments.id, id));

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    // Perform the action
    if (action === 'hide') {
      await db
        .update(comments)
        .set({
          isHidden: true,
          hiddenReason: reason || 'Hidden by moderator',
        })
        .where(eq(comments.id, id));
    } else if (action === 'unhide') {
      await db
        .update(comments)
        .set({
          isHidden: false,
          hiddenReason: null,
        })
        .where(eq(comments.id, id));
    } else if (action === 'delete') {
      await db
        .update(comments)
        .set({
          isDeleted: true,
          deletedAt: new Date(),
        })
        .where(eq(comments.id, id));
    }

    // Log the action
    await db.insert(adminActions).values({
      adminId: session.adminId,
      actionType: `comment_${action}`,
      targetType: 'comment',
      targetId: id,
      notes: reason || `Comment ${action} by moderator`,
      metadata: {
        commentContent: comment.content.substring(0, 100),
        problemId: comment.problemId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Comment moderation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
