import { NextRequest, NextResponse } from 'next/server';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db/supabase';
import { problemEngagements, problems } from '@/lib/db/schema';
import { getUserSession } from '@/lib/user-auth';
import { isPublicProblemStatus } from '@/lib/problem-access';

const VALID_VISIBILITIES = new Set(['public', 'private']);

async function syncDenormalizedCounts(problemId: string) {
  await db
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
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; engagementId: string }> }
) {
  try {
    const session = await getUserSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { id: problemId, engagementId } = await params;
    const body = await req.json();
    const visibility = body?.visibility;
    const payload = body?.payload;

    if (visibility !== undefined && !VALID_VISIBILITIES.has(visibility)) {
      return NextResponse.json({ error: 'Invalid visibility value' }, { status: 400 });
    }

    const [problem] = await db
      .select({ status: problems.status })
      .from(problems)
      .where(eq(problems.id, problemId))
      .limit(1);

    if (!problem || !isPublicProblemStatus(problem.status)) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    const [existing] = await db
      .select({
        id: problemEngagements.id,
        userId: problemEngagements.userId,
        problemId: problemEngagements.problemId,
      })
      .from(problemEngagements)
      .where(
        and(
          eq(problemEngagements.id, engagementId),
          eq(problemEngagements.problemId, problemId),
          eq(problemEngagements.status, 'active')
        )
      )
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: 'Engagement not found' }, { status: 404 });
    }

    if (existing.userId !== session.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const [updated] = await db
      .update(problemEngagements)
      .set({
        ...(visibility !== undefined ? { visibility } : {}),
        ...(payload !== undefined ? { payload } : {}),
        updatedAt: new Date(),
      })
      .where(eq(problemEngagements.id, engagementId))
      .returning();

    return NextResponse.json({
      success: true,
      engagement: updated,
    });
  } catch (error) {
    console.error('Update engagement error:', error);
    return NextResponse.json({ error: 'Failed to update engagement' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; engagementId: string }> }
) {
  try {
    const session = await getUserSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { id: problemId, engagementId } = await params;

    const [problem] = await db
      .select({ status: problems.status })
      .from(problems)
      .where(eq(problems.id, problemId))
      .limit(1);

    if (!problem || !isPublicProblemStatus(problem.status)) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    const [existing] = await db
      .select({
        id: problemEngagements.id,
        userId: problemEngagements.userId,
      })
      .from(problemEngagements)
      .where(
        and(
          eq(problemEngagements.id, engagementId),
          eq(problemEngagements.problemId, problemId),
          eq(problemEngagements.status, 'active')
        )
      )
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: 'Engagement not found' }, { status: 404 });
    }

    if (existing.userId !== session.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await db
      .update(problemEngagements)
      .set({
        status: 'withdrawn',
        updatedAt: new Date(),
      })
      .where(eq(problemEngagements.id, engagementId));

    await syncDenormalizedCounts(problemId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete engagement error:', error);
    return NextResponse.json({ error: 'Failed to delete engagement' }, { status: 500 });
  }
}
