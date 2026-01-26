import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession, hasPermission, logAdminAction } from '@/lib/admin-auth';
import { db } from '@/lib/db/supabase';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has moderation permission
    if (!hasPermission(session.role, 'manage_users')) {
      return NextResponse.json(
        { error: 'You do not have permission to manage users' },
        { status: 403 }
      );
    }

    const { action, reason, duration } = await req.json();

    if (!['suspend', 'unsuspend', 'ban', 'unban'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const userId = params.id;

    // Get the user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate suspension expiry if applicable
    let suspendedUntil = null;
    if (action === 'suspend' && duration) {
      const durationDays = parseInt(duration);
      if (!isNaN(durationDays)) {
        suspendedUntil = new Date();
        suspendedUntil.setDate(suspendedUntil.getDate() + durationDays);
      }
    }

    // Update user based on action
    let updateData: any = {};
    let actionType = '';

    switch (action) {
      case 'suspend':
        updateData = {
          isSuspended: true,
          suspendedAt: new Date(),
          suspendedUntil,
          suspensionReason: reason || null,
        };
        actionType = 'suspend_user';
        break;
      case 'unsuspend':
        updateData = {
          isSuspended: false,
          suspendedAt: null,
          suspendedUntil: null,
          suspensionReason: null,
        };
        actionType = 'unsuspend_user';
        break;
      case 'ban':
        updateData = {
          isBanned: true,
          bannedAt: new Date(),
          banReason: reason || null,
        };
        actionType = 'ban_user';
        break;
      case 'unban':
        updateData = {
          isBanned: false,
          bannedAt: null,
          banReason: null,
        };
        actionType = 'unban_user';
        break;
    }

    await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId));

    // Log the action
    await logAdminAction({
      adminId: session.adminDbId,
      actionType,
      targetType: 'user',
      targetId: userId,
      notes: reason || `User ${action}ed`,
      metadata: {
        userEmail: user.email,
        userName: user.name,
        duration: suspendedUntil ? duration : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: `User ${action}ed successfully`,
      user: {
        id: userId,
        isSuspended: updateData.isSuspended ?? user.isSuspended,
        isBanned: updateData.isBanned ?? user.isBanned,
      },
    });
  } catch (error) {
    console.error('User moderation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
