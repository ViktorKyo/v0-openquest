import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { db } from '@/lib/db/supabase';
import { users } from '@/lib/db/schema';
import { and, or, ilike, desc, asc, sql, eq } from 'drizzle-orm';

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
    let query = db.select().from(users).$dynamic();

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
      query = query.where(and(...conditions));
    }

    // Apply sorting
    const orderColumn = sortBy === 'name' ? users.name :
                       sortBy === 'email' ? users.email :
                       sortBy === 'createdAt' ? users.createdAt :
                       users.createdAt;

    query = sortOrder === 'asc'
      ? query.orderBy(asc(orderColumn))
      : query.orderBy(desc(orderColumn));

    // Get total count (with same filters as main query)
    const baseCountQuery = db
      .select({ count: sql<number>`count(*)::int` })
      .from(users)
      .$dynamic();

    const [countResult] = conditions.length > 0
      ? await baseCountQuery.where(and(...conditions))
      : await baseCountQuery;
    const total = countResult?.count ?? 0;

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
