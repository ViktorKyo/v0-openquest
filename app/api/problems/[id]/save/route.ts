import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/lib/user-auth';
import { db } from '@/lib/db/supabase';
import { problems, userSavedProblems } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { isPublicProblemStatus } from '@/lib/problem-access';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// POST /api/problems/[id]/save - Toggle save on a problem
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

    // Check if problem exists
    const [problem] = await db
      .select({ id: problems.id, status: problems.status })
      .from(problems)
      .where(eq(problems.id, problemId))
      .limit(1);

    if (!problem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }
    if (!isPublicProblemStatus(problem.status)) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    // Check if already saved
    const [existingSave] = await db
      .select()
      .from(userSavedProblems)
      .where(
        and(
          eq(userSavedProblems.problemId, problemId),
          eq(userSavedProblems.userId, session.userId)
        )
      )
      .limit(1);

    let isSaved: boolean;

    if (existingSave) {
      // Remove save
      await db
        .delete(userSavedProblems)
        .where(
          and(
            eq(userSavedProblems.problemId, problemId),
            eq(userSavedProblems.userId, session.userId)
          )
        );
      isSaved = false;
    } else {
      // Add save
      await db.insert(userSavedProblems).values({
        problemId,
        userId: session.userId,
      });
      isSaved = true;
    }

    return NextResponse.json({ isSaved });
  } catch (error) {
    console.error('Error toggling save:', error);
    return NextResponse.json({ error: 'Failed to toggle save' }, { status: 500 });
  }
}

// GET /api/problems/[id]/save - Check if problem is saved
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getUserSession(req);
    if (!session) {
      return NextResponse.json({ isSaved: false });
    }

    const { id: problemId } = await params;
    if (!UUID_RE.test(problemId)) {
      return NextResponse.json({ isSaved: false });
    }

    const [problem] = await db
      .select({ status: problems.status })
      .from(problems)
      .where(eq(problems.id, problemId))
      .limit(1);

    if (!problem || !isPublicProblemStatus(problem.status)) {
      return NextResponse.json({ isSaved: false });
    }

    const [existingSave] = await db
      .select()
      .from(userSavedProblems)
      .where(
        and(
          eq(userSavedProblems.problemId, problemId),
          eq(userSavedProblems.userId, session.userId)
        )
      )
      .limit(1);

    return NextResponse.json({ isSaved: !!existingSave });
  } catch (error) {
    console.error('Error checking save status:', error);
    return NextResponse.json({ isSaved: false });
  }
}
