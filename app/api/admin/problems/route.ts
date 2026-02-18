import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { db } from '@/lib/db/supabase';
import { problems, users } from '@/lib/db/schema';
import { and, eq, or, ilike, desc, asc, sql } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    // Build query
    let query = db
      .select({
        id: problems.id,
        title: problems.title,
        elevatorPitch: problems.elevatorPitch,
        category: problems.category,
        status: problems.status,
        upvotes: problems.upvotes,
        commentCount: problems.commentCount,
        createdAt: problems.createdAt,
        authorId: problems.authorId,
        authorName: users.name,
        authorEmail: users.email,
        tweetUrls: problems.tweetUrls,
      })
      .from(problems)
      .leftJoin(users, eq(problems.authorId, users.id))
      .$dynamic();

    // Apply filters
    const conditions = [];

    if (status) {
      conditions.push(eq(problems.status, status));
    }

    if (search) {
      conditions.push(
        or(
          ilike(problems.title, `%${search}%`),
          ilike(problems.elevatorPitch, `%${search}%`)
        )!
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    // Apply sorting
    const orderColumn = sortBy === 'title' ? problems.title :
                       sortBy === 'upvotes' ? problems.upvotes :
                       sortBy === 'createdAt' ? problems.createdAt :
                       problems.createdAt;

    query = sortOrder === 'asc'
      ? query.orderBy(asc(orderColumn))
      : query.orderBy(desc(orderColumn));

    // Get total count (with same filters as main query)
    const baseCountQuery = db
      .select({ count: sql<number>`count(*)::int` })
      .from(problems)
      .$dynamic();

    const [countResult] = conditions.length > 0
      ? await baseCountQuery.where(and(...conditions))
      : await baseCountQuery;
    const total = countResult?.count ?? 0;

    // Apply pagination
    const results = await query.limit(limit).offset(offset);

    return NextResponse.json({
      problems: results,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Problems fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
