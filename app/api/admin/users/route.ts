import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { db } from '@/lib/db/supabase';
import { users } from '@/lib/db/schema';
import { or, ilike, desc, asc, sql, eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    const filter = searchParams.get('filter'); // 'suspended', 'banned', 'active'

    // Build query
    let query = db.select().from(users);

    // Apply filters
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(users.name, `%${search}%`),
          ilike(users.email, `%${search}%`)
        )!
      );
    }

    if (filter === 'suspended') {
      conditions.push(eq(users.isSuspended, true));
    } else if (filter === 'banned') {
      conditions.push(eq(users.isBanned, true));
    } else if (filter === 'active') {
      conditions.push(eq(users.isSuspended, false));
      conditions.push(eq(users.isBanned, false));
    }

    if (conditions.length > 0) {
      query = query.where(
        conditions.length === 1 ? conditions[0] : sql`${conditions.join(' AND ')}`
      );
    }

    // Apply sorting
    const orderColumn = sortBy === 'name' ? users.name :
                       sortBy === 'email' ? users.email :
                       sortBy === 'createdAt' ? users.createdAt :
                       users.createdAt;

    query = sortOrder === 'asc'
      ? query.orderBy(asc(orderColumn))
      : query.orderBy(desc(orderColumn));

    // Get total count
    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(users);
    const total = countResult.count;

    // Apply pagination
    const results = await query.limit(limit).offset(offset);

    return NextResponse.json({
      users: results,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Users fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
