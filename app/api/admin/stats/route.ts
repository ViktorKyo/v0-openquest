import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { db } from '@/lib/db/supabase';
import { problems, users } from '@/lib/db/schema';
import { eq, and, count, sql, gte } from 'drizzle-orm';

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get current date and 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Total problems count
    const [totalProblemsResult] = await db
      .select({ count: count() })
      .from(problems);
    const totalProblems = totalProblemsResult.count;

    // Pending problems count
    const [pendingProblemsResult] = await db
      .select({ count: count() })
      .from(problems)
      .where(eq(problems.status, 'pending_review'));
    const pendingProblems = pendingProblemsResult.count;

    // Total users count
    const [totalUsersResult] = await db
      .select({ count: count() })
      .from(users);
    const totalUsers = totalUsersResult.count;

    // Active builders count (problems with "looking_for_builders" status)
    const [activeBuildersResult] = await db
      .select({ count: count() })
      .from(problems)
      .where(eq(problems.status, 'looking_for_builders'));
    const activeBuilders = activeBuildersResult.count;

    // Problems created in last 30 days
    const [recentProblemsResult] = await db
      .select({ count: count() })
      .from(problems)
      .where(gte(problems.createdAt, thirtyDaysAgo));
    const recentProblems = recentProblemsResult.count;

    // Calculate trend (simple: compare to previous 30 days)
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const [previousPeriodResult] = await db
      .select({ count: count() })
      .from(problems)
      .where(
        and(
          gte(problems.createdAt, sixtyDaysAgo),
          sql`${problems.createdAt} < ${thirtyDaysAgo.toISOString()}`
        )
      );
    const previousPeriodProblems = previousPeriodResult.count;

    // Calculate percentage change
    const problemsTrend =
      previousPeriodProblems > 0
        ? ((recentProblems - previousPeriodProblems) / previousPeriodProblems) * 100
        : 0;

    // Users created in last 30 days
    const [recentUsersResult] = await db
      .select({ count: count() })
      .from(users)
      .where(gte(users.createdAt, thirtyDaysAgo));
    const recentUsers = recentUsersResult.count;

    const [previousUsersResult] = await db
      .select({ count: count() })
      .from(users)
      .where(
        and(
          gte(users.createdAt, sixtyDaysAgo),
          sql`${users.createdAt} < ${thirtyDaysAgo.toISOString()}`
        )
      );
    const previousUsers = previousUsersResult.count;

    const usersTrend =
      previousUsers > 0 ? ((recentUsers - previousUsers) / previousUsers) * 100 : 0;

    return NextResponse.json({
      stats: {
        totalProblems,
        pendingProblems,
        totalUsers,
        activeBuilders,
      },
      trends: {
        problems: parseFloat(problemsTrend.toFixed(1)),
        users: parseFloat(usersTrend.toFixed(1)),
      },
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
