import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/supabase';
import { problems, users, problemSources, sourceInstitutions } from '@/lib/db/schema';
import { and, eq, or, ilike, desc, sql, inArray, notInArray, isNull, ne } from 'drizzle-orm';
import { sanitizeSearchInput } from '@/lib/search-utils';
import { PUBLIC_PROBLEM_STATUSES } from '@/lib/problem-access';
import { getInstitutionFlagsFromAuthorName } from '@/lib/problem-utils';
import { reportIncident } from '@/lib/incident-monitoring';
import { getVCPartnerAuthorNames } from '@/lib/source-registry';

function parsePositiveInt(value: string | null, fallback: number): number {
  const parsed = Number.parseInt(value || '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

// GET /api/problems/search - Search published problems
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'trending';
  const tab = searchParams.get('tab') || 'trending';
  const source = searchParams.get('source') || 'All Sources';
  const vcPartnerAuthorNames = getVCPartnerAuthorNames();
  const page = parsePositiveInt(searchParams.get('page'), 1);
  const limit = Math.min(parsePositiveInt(searchParams.get('limit'), 20), 200);
  const offset = (page - 1) * limit;

  try {
    // Sanitize search query: trim, truncate, and escape SQL LIKE wildcards (%, _, \)
    const sanitizedQuery = sanitizeSearchInput(query);

    // Build base query - only published problems
    let dbQuery = db
      .select({
        id: problems.id,
        title: problems.title,
        elevatorPitch: problems.elevatorPitch,
        fullDescription: problems.fullDescription,
        category: problems.category,
        industryTags: problems.industryTags,
        status: problems.status,
        upvotes: problems.upvotes,
        commentCount: problems.commentCount,
        builderCount: problems.builderCount,
        investorCount: problems.investorCount,
        createdAt: problems.createdAt,
        publishedAt: problems.publishedAt,
        authorId: problems.authorId,
        isAnonymous: problems.isAnonymous,
        authorName: users.name,
        authorAvatarUrl: users.avatarUrl,
      })
      .from(problems)
      .leftJoin(users, eq(problems.authorId, users.id))
      .leftJoin(problemSources, and(eq(problemSources.problemId, problems.id), eq(problemSources.isPrimary, true)))
      .leftJoin(sourceInstitutions, eq(problemSources.sourceInstitutionId, sourceInstitutions.id))
      .$dynamic();

    // Build conditions
    const conditions = [];

    // Only show publicly visible problems
    conditions.push(inArray(problems.status, [...PUBLIC_PROBLEM_STATUSES]));

    // Exclude Demo User problems
    conditions.push(sql`(${users.name} IS NULL OR ${users.name} != 'Demo User')`);

    if (source === 'VC Partners') {
      conditions.push(
        or(
          eq(sourceInstitutions.sourceType, 'vc_partner'),
          inArray(users.name, vcPartnerAuthorNames)
        )!
      );
    } else if (source === 'Community') {
      conditions.push(
        and(
          or(isNull(sourceInstitutions.sourceType), ne(sourceInstitutions.sourceType, 'vc_partner'))!,
          or(sql`${users.name} IS NULL`, notInArray(users.name, vcPartnerAuthorNames))!
        )!
      );
    }

    // Apply category filter (case-insensitive)
    if (category && category !== 'All Categories') {
      conditions.push(ilike(problems.category, category));
    }

    // Apply search query
    if (sanitizedQuery) {
      conditions.push(
        or(
          ilike(problems.title, `%${sanitizedQuery}%`),
          ilike(problems.elevatorPitch, `%${sanitizedQuery}%`),
          ilike(problems.category, `%${sanitizedQuery}%`)
        )!
      );
    }

    // Apply conditions
    if (conditions.length > 0) {
      dbQuery = dbQuery.where(and(...conditions));
    }

    // Apply sorting based on tab and sort option
    if (tab === 'new') {
      dbQuery = dbQuery.orderBy(desc(problems.createdAt));
    } else {
      // Trending tab with sort options
      switch (sort) {
        case 'Most recent':
          dbQuery = dbQuery.orderBy(desc(problems.createdAt));
          break;
        case 'Most discussed':
          dbQuery = dbQuery.orderBy(desc(problems.commentCount), desc(problems.createdAt));
          break;
        case 'Most upvoted':
        default:
          dbQuery = dbQuery.orderBy(desc(problems.upvotes), desc(problems.createdAt));
          break;
      }
    }

    // Get total count with same conditions (need to join with users for Demo User filter)
    const countConditions = [...conditions];
    let countQuery = db
      .select({ count: sql<number>`count(*)::int` })
      .from(problems)
      .leftJoin(users, eq(problems.authorId, users.id))
      .leftJoin(problemSources, and(eq(problemSources.problemId, problems.id), eq(problemSources.isPrimary, true)))
      .leftJoin(sourceInstitutions, eq(problemSources.sourceInstitutionId, sourceInstitutions.id))
      .$dynamic();

    if (countConditions.length > 0) {
      countQuery = countQuery.where(and(...countConditions));
    }

    const [countResult] = await countQuery;
    const total = countResult?.count || 0;

    // Apply pagination
    const results = await dbQuery.limit(limit).offset(offset);

    // Transform results to match feed format
    const transformedProblems = results.map((p) => {
      const flags = getInstitutionFlagsFromAuthorName(p.authorName);

      return {
        id: p.id,
        title: p.title,
        description: p.elevatorPitch,
        fullDescription: p.fullDescription,
        category: p.category,
        industryTags: p.industryTags,
        upvotes: p.upvotes || 0,
        comments: p.commentCount || 0,
        building: p.builderCount || 0,
        investors: p.investorCount || 0,
        author: {
          id: p.authorId,
          name: p.isAnonymous ? 'Anonymous' : (p.authorName || 'Anonymous'),
          avatarUrl: p.isAnonymous ? null : p.authorAvatarUrl,
          isAnonymous: p.isAnonymous,
          isYC: flags.isYC,
          isWeekendFund: flags.isWeekendFund,
          isConviction: flags.isConviction,
          isARK: flags.isARK,
          isPathlight: flags.isPathlight,
          isAccel: flags.isAccel,
        },
        createdAt: p.createdAt,
        publishedAt: p.publishedAt,
        // Top-level flags for badge display
        isYCRFS: flags.isYCRFS,
        isWeekendFundRFS: flags.isWeekendFundRFS,
        isConviction: flags.isConviction,
        isARK: flags.isARK,
        isPathlight: flags.isPathlight,
        isAccel: flags.isAccel,
      };
    });

    return NextResponse.json({
      problems: transformedProblems,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      query: sanitizedQuery,
    });
  } catch (error) {
    const incidentId = await reportIncident({
      area: 'browse',
      route: '/api/problems/search',
      message: 'Search query failed',
      details: { queryLength: query.length, category, sort, tab, source, page, limit },
      error,
    });

    return NextResponse.json(
      {
        error: `Our search robots tripped over a cable. Please retry in a moment. Incident: ${incidentId}`,
        incidentId,
      },
      {
        status: 500,
        headers: { 'x-openquest-incident-id': incidentId },
      }
    );
  }
}
