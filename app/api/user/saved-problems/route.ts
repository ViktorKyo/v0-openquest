import { NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/lib/user-auth';
import { db } from '@/lib/db/supabase';
import { problems, users, userSavedProblems } from '@/lib/db/schema';
import { and, eq, desc, inArray } from 'drizzle-orm';
import { getCategoryColor, getTimeAgo } from '@/lib/formatters';
import { PUBLIC_PROBLEM_STATUSES } from '@/lib/problem-access';
import { getInstitutionFlagsFromAuthorName } from '@/lib/problem-utils';

// GET /api/user/saved-problems - Get user's saved problems
export async function GET(req: NextRequest) {
  try {
    const session = await getUserSession(req);
    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Fetch saved problems with full problem data
    const savedProblems = await db
      .select({
        // Save metadata
        savedAt: userSavedProblems.createdAt,
        // Problem data
        id: problems.id,
        title: problems.title,
        elevatorPitch: problems.elevatorPitch,
        category: problems.category,
        status: problems.status,
        upvotes: problems.upvotes,
        commentCount: problems.commentCount,
        builderCount: problems.builderCount,
        investorCount: problems.investorCount,
        createdAt: problems.createdAt,
        isAnonymous: problems.isAnonymous,
        authorId: problems.authorId,
        // Author data
        authorName: users.name,
        authorAvatarUrl: users.avatarUrl,
      })
      .from(userSavedProblems)
      .innerJoin(problems, eq(userSavedProblems.problemId, problems.id))
      .leftJoin(users, eq(problems.authorId, users.id))
      .where(
        and(
          eq(userSavedProblems.userId, session.userId),
          inArray(problems.status, [...PUBLIC_PROBLEM_STATUSES])
        )
      )
      .orderBy(desc(userSavedProblems.createdAt));

    // Transform results
    const transformedProblems = savedProblems.map((p) => {
      const flags = getInstitutionFlagsFromAuthorName(p.authorName);
      return {
        // ProblemCard-compatible fields
        id: p.id,
        title: p.title,
        description: p.elevatorPitch,
        category: p.category,
        categoryColor: getCategoryColor(p.category),
        timeAgo: getTimeAgo(p.createdAt),
        status: p.status,
        upvotes: p.upvotes || 0,
        comments: p.commentCount || 0,
        building: p.builderCount || 0,
        investors: p.investorCount || 0,
        author: {
          id: p.authorId,
          name: p.isAnonymous ? 'Anonymous' : (p.authorName || 'Anonymous'),
          avatar: p.isAnonymous ? '/placeholder.svg' : (p.authorAvatarUrl || '/placeholder.svg'),
          isAnonymous: p.isAnonymous,
          isYC: flags.isYC,
          isWeekendFund: flags.isWeekendFund,
        },
        createdAt: p.createdAt,
        savedAt: p.savedAt,
        isSaved: true,
      };
    });

    return NextResponse.json({
      problems: transformedProblems,
      count: transformedProblems.length,
    });
  } catch (error) {
    console.error('Error fetching saved problems:', error);
    return NextResponse.json({ error: 'Failed to fetch saved problems' }, { status: 500 });
  }
}

// GET all saved problem IDs (for checking save status across multiple problems)
export async function POST(req: NextRequest) {
  try {
    const session = await getUserSession(req);
    if (!session) {
      return NextResponse.json({ savedIds: [] });
    }

    const savedIds = await db
      .select({ problemId: userSavedProblems.problemId })
      .from(userSavedProblems)
      .innerJoin(problems, eq(userSavedProblems.problemId, problems.id))
      .where(
        and(
          eq(userSavedProblems.userId, session.userId),
          inArray(problems.status, [...PUBLIC_PROBLEM_STATUSES])
        )
      );

    return NextResponse.json({
      savedIds: savedIds.map((s) => s.problemId),
    });
  } catch (error) {
    console.error('Error fetching saved IDs:', error);
    return NextResponse.json({ savedIds: [] });
  }
}
