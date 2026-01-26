import { NextResponse } from 'next/server';
import { clearAdminSession, getAdminSession, logAdminAction } from '@/lib/admin-auth';

export async function POST() {
  try {
    const session = await getAdminSession();

    if (session) {
      // Log logout action
      await logAdminAction({
        adminId: session.adminDbId,
        actionType: 'logout',
        targetType: 'admin',
        targetId: session.adminDbId,
      });
    }

    await clearAdminSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
