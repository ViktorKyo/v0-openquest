import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { db } from '@/lib/db/supabase';
import { adminActions, adminUsers } from '@/lib/db/schema';
import { eq, desc, and, gte, sql } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const actionType = searchParams.get('actionType');
    const adminId = searchParams.get('adminId');
    const days = searchParams.get('days') || '30';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // Calculate date filter
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(days));

    // Build query
    const conditions = [gte(adminActions.createdAt, daysAgo)];

    if (actionType && actionType !== 'all') {
      conditions.push(eq(adminActions.actionType, actionType));
    }

    if (adminId && adminId !== 'all') {
      conditions.push(eq(adminActions.adminId, adminId));
    }

    // Get logs with admin info
    const logs = await db
      .select({
        id: adminActions.id,
        actionType: adminActions.actionType,
        targetType: adminActions.targetType,
        targetId: adminActions.targetId,
        notes: adminActions.notes,
        metadata: adminActions.metadata,
        createdAt: adminActions.createdAt,
        adminName: adminUsers.name,
        adminEmail: adminUsers.email,
        adminRole: adminUsers.role,
      })
      .from(adminActions)
      .leftJoin(adminUsers, eq(adminActions.adminId, adminUsers.id))
      .where(and(...conditions))
      .orderBy(desc(adminActions.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(adminActions)
      .where(and(...conditions));
    const total = countResult.count;

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Logs fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
