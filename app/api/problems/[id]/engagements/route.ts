import { NextRequest, NextResponse } from 'next/server';
import { and, desc, eq, or, sql } from 'drizzle-orm';
import { db } from '@/lib/db/supabase';
import { problemEngagements, problems, users } from '@/lib/db/schema';
import { getUserSession } from '@/lib/user-auth';
import { canAccessProblem, isPublicProblemStatus } from '@/lib/problem-access';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const VALID_TYPES = new Set(['build', 'invest', 'join_team', 'follow']);
const VALID_VISIBILITIES = new Set(['public', 'private']);

type EngagementType = 'build' | 'invest' | 'join_team' | 'follow';
type Visibility = 'public' | 'private';

async function getProblem(problemId: string) {
  const [problem] = await db
    .select({
      id: problems.id,
      authorId: problems.authorId,
      status: problems.status,
      upvotes: problems.upvotes,
    })
    .from(problems)
    .where(eq(problems.id, problemId))
    .limit(1);

  return problem;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: problemId } = await params;
    if (!UUID_RE.test(problemId)) {
      return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400 });
    }
    const session = await getUserSession(req);
    const problem = await getProblem(problemId);

    if (!problem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    if (!canAccessProblem({ status: problem.status, authorId: problem.authorId, userId: session?.userId })) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    const isProblemAuthor = Boolean(session?.userId && problem.authorId === session.userId);
    const publicOnlyParam = req.nextUrl.searchParams.get('publicOnly');
    const publicOnly = publicOnlyParam === null ? true : publicOnlyParam !== 'false';

    let visibilityFilter;
    if (isProblemAuthor) {
      visibilityFilter = undefined;
    } else if (!publicOnly && session?.userId) {
      visibilityFilter = or(
        eq(problemEngagements.visibility, 'public'),
        eq(problemEngagements.userId, session.userId)
      );
    } else {
      visibilityFilter = eq(problemEngagements.visibility, 'public');
    }

    const conditions = [
      eq(problemEngagements.problemId, problemId),
      eq(problemEngagements.status, 'active'),
    ];
    if (visibilityFilter) {
      conditions.push(visibilityFilter);
    }

    const rows = await db
      .select({
        id: problemEngagements.id,
        userId: problemEngagements.userId,
        type: problemEngagements.type,
        visibility: problemEngagements.visibility,
        payload: problemEngagements.payload,
        createdAt: problemEngagements.createdAt,
        updatedAt: problemEngagements.updatedAt,
        userName: users.name,
        userAvatarUrl: users.avatarUrl,
      })
      .from(problemEngagements)
      .leftJoin(users, eq(problemEngagements.userId, users.id))
      .where(and(...conditions))
      .orderBy(desc(problemEngagements.createdAt));

    const [countRow] = await db
      .select({
        building: sql<number>`COALESCE(SUM(CASE WHEN ${problemEngagements.type} = 'build' AND ${problemEngagements.status} = 'active' THEN 1 ELSE 0 END), 0)`,
        buildingAnonymous: sql<number>`COALESCE(SUM(CASE WHEN ${problemEngagements.type} = 'build' AND ${problemEngagements.status} = 'active' AND ${problemEngagements.visibility} = 'private' THEN 1 ELSE 0 END), 0)`,
        investors: sql<number>`COALESCE(SUM(CASE WHEN ${problemEngagements.type} = 'invest' AND ${problemEngagements.status} = 'active' THEN 1 ELSE 0 END), 0)`,
        followers: sql<number>`COALESCE(SUM(CASE WHEN ${problemEngagements.type} = 'follow' AND ${problemEngagements.status} = 'active' THEN 1 ELSE 0 END), 0)`,
      })
      .from(problemEngagements)
      .where(eq(problemEngagements.problemId, problemId));

    const engagedUsers = rows
      .filter((row) => row.type === 'build' || row.type === 'invest' || row.type === 'follow')
      .map((row) => ({
        id: row.id,
        userId: row.userId,
        name: row.userName || 'Anonymous',
        avatar: row.userAvatarUrl || '/placeholder.svg',
        type: row.type === 'invest' ? 'investor' : row.type === 'build' ? 'building' : 'follower',
        visibility: row.visibility,
      }));

    const myEngagements = session?.userId
      ? rows.filter((row) => row.userId === session.userId).map((row) => row.type)
      : [];

    return NextResponse.json({
      engagements: rows,
      engagedUsers,
      myEngagements: {
        isBuilding: myEngagements.includes('build'),
        hasInvested: myEngagements.includes('invest'),
        hasApplied: myEngagements.includes('join_team'),
        isFollowing: myEngagements.includes('follow'),
      },
      counts: {
        upvotes: problem.upvotes || 0,
        building: Number(countRow?.building || 0),
        buildingAnonymous: Number(countRow?.buildingAnonymous || 0),
        investors: Number(countRow?.investors || 0),
        followers: Number(countRow?.followers || 0),
      },
    });
  } catch (error) {
    console.error('Get problem engagements error:', error);
    return NextResponse.json({ error: 'Failed to fetch engagements' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { id: problemId } = await params;
    if (!UUID_RE.test(problemId)) {
      return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400 });
    }
    const problem = await getProblem(problemId);

    if (!problem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    if (!isPublicProblemStatus(problem.status)) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    const body = await req.json();
    const type = body?.type as EngagementType;
    const visibility = (body?.visibility || 'public') as Visibility;
    const payload = body?.payload ?? {};

    if (!VALID_TYPES.has(type)) {
      return NextResponse.json({ error: 'Invalid engagement type' }, { status: 400 });
    }

    if (!VALID_VISIBILITIES.has(visibility)) {
      return NextResponse.json({ error: 'Invalid visibility value' }, { status: 400 });
    }

    const [engagement] = await db.transaction(async (tx) => {
      const [existing] = await tx
        .select()
        .from(problemEngagements)
        .where(
          and(
            eq(problemEngagements.problemId, problemId),
            eq(problemEngagements.userId, session.userId),
            eq(problemEngagements.type, type),
            eq(problemEngagements.status, 'active')
          )
        )
        .limit(1);

      const now = new Date();
      let row;
      if (existing) {
        [row] = await tx
          .update(problemEngagements)
          .set({
            visibility,
            payload,
            updatedAt: now,
            status: 'active',
          })
          .where(eq(problemEngagements.id, existing.id))
          .returning();
      } else {
        [row] = await tx
          .insert(problemEngagements)
          .values({
            problemId,
            userId: session.userId,
            type,
            visibility,
            payload,
            status: 'active',
            updatedAt: now,
          })
          .returning();
      }

      await tx
        .update(problems)
        .set({
          builderCount: sql`(
            SELECT COUNT(*)
            FROM problem_engagements pe
            WHERE pe.problem_id = ${problemId}
              AND pe.type = 'build'
              AND pe.status = 'active'
          )`,
          investorCount: sql`(
            SELECT COUNT(*)
            FROM problem_engagements pe
            WHERE pe.problem_id = ${problemId}
              AND pe.type = 'invest'
              AND pe.status = 'active'
          )`,
        })
        .where(eq(problems.id, problemId));

      return [row];
    });

    return NextResponse.json({
      engagement,
      success: true,
    });
  } catch (error) {
    console.error('Create problem engagement error:', error);
    return NextResponse.json({ error: 'Failed to save engagement' }, { status: 500 });
  }
}
