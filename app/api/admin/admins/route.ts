import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession, generateAdminId, logAdminAction } from '@/lib/admin-auth';
import { db } from '@/lib/db/supabase';
import { adminUsers } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Get all admin users
export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Only Super Admins can view admin users' },
        { status: 403 }
      );
    }

    const admins = await db
      .select({
        id: adminUsers.id,
        adminId: adminUsers.adminId,
        name: adminUsers.name,
        email: adminUsers.email,
        role: adminUsers.role,
        isActive: adminUsers.isActive,
        createdAt: adminUsers.createdAt,
        lastLogin: adminUsers.lastLogin,
      })
      .from(adminUsers);

    return NextResponse.json({ admins });
  } catch (error) {
    console.error('Admins fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Create new admin user
export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Only Super Admins can create admin users' },
        { status: 403 }
      );
    }

    const { name, email, role } = await req.json();

    if (!['super_admin', 'moderator', 'analyst'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Generate admin ID
    const adminId = generateAdminId();

    // Create admin user
    const [newAdmin] = await db
      .insert(adminUsers)
      .values({
        adminId,
        name: name || null,
        email: email || null,
        role,
        isActive: true,
        createdBy: session.adminDbId,
      })
      .returning();

    // Log the action
    await logAdminAction({
      adminId: session.adminDbId,
      actionType: 'create_admin',
      targetType: 'admin',
      targetId: newAdmin.id,
      notes: `Created ${role} admin: ${name || email || adminId}`,
      metadata: {
        newAdminId: adminId,
        role,
      },
    });

    return NextResponse.json({
      success: true,
      admin: {
        id: newAdmin.id,
        adminId,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error('Admin creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
