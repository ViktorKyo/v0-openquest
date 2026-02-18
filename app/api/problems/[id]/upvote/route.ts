import { NextRequest, NextResponse } from 'next/server';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db/supabase';
import { problemUpvotes, problems } from '@/lib/db/schema';
import { getUserSession } from '@/lib/user-auth';
import { canAccessProblem, isPublicProblemStatus } from '@/lib/problem-access';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

// GET /api/problems/[id]/upvote - Get upvote status for current user
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: problemId } = await params;
    if (!UUID_RE.test(problemId)) {
      return NextResponse.json({ error: 'Invalid problem ID' }, { status: 400 });
    }
    const problem = await getProblem(problemId);

    if (!problem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    const session = await getUserSession(req);
    if (!canAccessProblem({ status: problem.status, authorId: problem.authorId, userId: session?.userId })) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    if (!session) {
      return NextResponse.json({
        hasUpvoted: false,
        upvoteCount: problem.upvotes || 0,
      });
    }

    const [upvote] = await db
      .select({ id: problemUpvotes.id })
      .from(problemUpvotes)
      .where(and(eq(problemUpvotes.problemId, problemId), eq(problemUpvotes.userId, session.userId)))
      .limit(1);

    return NextResponse.json({
      hasUpvoted: !!upvote,
      upvoteCount: problem.upvotes || 0,
    });
  } catch (error) {
    console.error('Get problem upvote status error:', error);
    return NextResponse.json({ error: 'Failed to fetch upvote status' }, { status: 500 });
  }
}

// POST /api/problems/[id]/upvote - Toggle upvote for current user
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

    const result = await db.transaction(async (tx) => {
      const [existing] = await tx
        .select({ id: problemUpvotes.id })
        .from(problemUpvotes)
        .where(and(eq(problemUpvotes.problemId, problemId), eq(problemUpvotes.userId, session.userId)))
        .limit(1);

      let hasUpvoted: boolean;

      if (existing) {
        await tx
          .delete(problemUpvotes)
          .where(and(eq(problemUpvotes.problemId, problemId), eq(problemUpvotes.userId, session.userId)));
        hasUpvoted = false;
      } else {
        await tx.insert(problemUpvotes).values({
          problemId,
          userId: session.userId,
        });
        hasUpvoted = true;
      }

      const [updated] = await tx
        .update(problems)
        .set({
          upvotes: hasUpvoted
            ? sql`COALESCE(${problems.upvotes}, 0) + 1`
            : sql`GREATEST(COALESCE(${problems.upvotes}, 0) - 1, 0)`,
        })
        .where(eq(problems.id, problemId))
        .returning({ upvotes: problems.upvotes });

      return {
        hasUpvoted,
        upvoteCount: updated?.upvotes || 0,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Toggle problem upvote error:', error);
    return NextResponse.json({ error: 'Failed to toggle upvote' }, { status: 500 });
  }
}
