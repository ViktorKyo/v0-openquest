import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession, logAdminAction } from '@/lib/admin-auth';
import { db } from '@/lib/db/supabase';
import { adminUsers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Update admin (deactivate/activate)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Only Super Admins can modify admin users' },
        { status: 403 }
      );
    }

    const { isActive } = await req.json();
    const { id: adminId } = await params;

    // Prevent self-deactivation
    if (adminId === session.adminDbId) {
      return NextResponse.json(
        { error: 'You cannot deactivate your own account' },
        { status: 400 }
      );
    }

    // Get the admin user
    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, adminId))
      .limit(1);

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    // Update admin
    await db
      .update(adminUsers)
      .set({ isActive })
      .where(eq(adminUsers.id, adminId));

    // Log the action
    await logAdminAction({
      adminId: session.adminDbId,
      actionType: isActive ? 'activate_admin' : 'deactivate_admin',
      targetType: 'admin',
      targetId: adminId,
      notes: `${isActive ? 'Activated' : 'Deactivated'} admin: ${admin.name || admin.email || admin.adminId}`,
    });

    return NextResponse.json({
      success: true,
      message: `Admin ${isActive ? 'activated' : 'deactivated'} successfully`,
    });
  } catch (error) {
    console.error('Admin update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
