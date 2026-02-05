import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { db } from '@/lib/db/supabase';
import { comments, users, problems } from '@/lib/db/schema';
import { eq, and, desc, asc, sql, like, or } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const filter = searchParams.get('filter') || 'all';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [eq(comments.isDeleted, false)];

    if (filter === 'hidden') {
      conditions.push(eq(comments.isHidden, true));
    } else if (filter === 'visible') {
      conditions.push(eq(comments.isHidden, false));
    }

    // Get comments with author and problem info
    const commentsQuery = db
      .select({
        id: comments.id,
        content: comments.content,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        upvotes: comments.upvotes,
        isHidden: comments.isHidden,
        hiddenReason: comments.hiddenReason,
        problemId: comments.problemId,
        authorId: comments.authorId,
        authorName: users.name,
        authorEmail: users.email,
        problemTitle: problems.title,
      })
      .from(comments)
      .leftJoin(users, eq(comments.authorId, users.id))
      .leftJoin(problems, eq(comments.problemId, problems.id))
      .where(and(...conditions))
      .limit(limit)
      .offset(offset);

    // Apply sorting
    if (sortBy === 'createdAt') {
      commentsQuery.orderBy(sortOrder === 'desc' ? desc(comments.createdAt) : asc(comments.createdAt));
    } else if (sortBy === 'upvotes') {
      commentsQuery.orderBy(sortOrder === 'desc' ? desc(comments.upvotes) : asc(comments.upvotes));
    }

    const commentsData = await commentsQuery;

    // Filter by search if provided (in-memory for now)
    let filteredComments = commentsData;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredComments = commentsData.filter(
        (c) =>
          c.content.toLowerCase().includes(searchLower) ||
          c.authorName?.toLowerCase().includes(searchLower) ||
          c.authorEmail?.toLowerCase().includes(searchLower) ||
          c.problemTitle?.toLowerCase().includes(searchLower)
      );
    }

    // Get total count
    const [countResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(comments)
      .where(and(...conditions));

    const total = Number(countResult.count);

    return NextResponse.json({
      comments: filteredComments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Comments fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
