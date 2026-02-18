import { NextRequest, NextResponse } from "next/server"
import { and, desc, eq, ilike, inArray, notInArray, or, sql, gte, isNull, ne } from "drizzle-orm"
import { db } from "@/lib/db/supabase"
import { problems, users, problemSources, sourceInstitutions } from "@/lib/db/schema"
import { PUBLIC_PROBLEM_STATUSES } from "@/lib/problem-access"
import { getInstitutionFlagsFromAuthorName } from "@/lib/problem-utils"
import { getVCPartnerAuthorNames } from "@/lib/source-registry"
import { reportIncident } from "@/lib/incident-monitoring"

const SECTION_LIMIT = 5
const CATEGORY_LIMIT = 3

type SourceFilter = "All Sources" | "VC Partners" | "Community"

function normalizeSource(input: string | null): SourceFilter {
  if (input === "VC Partners" || input === "Community") return input
  return "All Sources"
}

function normalizeCategory(input: string | null): string | null {
  if (!input || input === "All Categories") return null
  return input
}

function buildConditions(params: {
  source: SourceFilter
  category: string | null
  vcPartnerAuthorNames: string[]
}) {
  const conditions = [
    inArray(problems.status, [...PUBLIC_PROBLEM_STATUSES]),
    sql`(${users.name} IS NULL OR ${users.name} != 'Demo User')`,
  ]

  if (params.source === "VC Partners") {
    conditions.push(
      or(
        eq(sourceInstitutions.sourceType, "vc_partner"),
        inArray(users.name, params.vcPartnerAuthorNames),
      )!,
    )
  } else if (params.source === "Community") {
    conditions.push(
      and(
        or(isNull(sourceInstitutions.sourceType), ne(sourceInstitutions.sourceType, "vc_partner"))!,
        or(sql`${users.name} IS NULL`, notInArray(users.name, params.vcPartnerAuthorNames))!,
      )!,
    )
  }

  if (params.category) {
    conditions.push(ilike(problems.category, params.category))
  }

  return conditions
}

const SECTION_SELECT = {
  id: problems.id,
  title: problems.title,
  elevatorPitch: problems.elevatorPitch,
  fullDescription: problems.fullDescription,
  category: problems.category,
  industryTags: problems.industryTags,
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
}

type SectionRow = {
  id: string
  title: string
  elevatorPitch: string
  fullDescription: string
  category: string
  industryTags: string[] | null
  upvotes: number | null
  commentCount: number | null
  builderCount: number | null
  investorCount: number | null
  createdAt: Date
  publishedAt: Date | null
  authorId: string | null
  isAnonymous: boolean | null
  authorName: string | null
  authorAvatarUrl: string | null
}

function mapProblemRow(row: SectionRow) {
  const flags = getInstitutionFlagsFromAuthorName(row.authorName)

  return {
    id: row.id,
    title: row.title,
    description: row.elevatorPitch,
    fullDescription: row.fullDescription,
    category: row.category,
    industryTags: row.industryTags,
    upvotes: row.upvotes || 0,
    comments: row.commentCount || 0,
    building: row.builderCount || 0,
    investors: row.investorCount || 0,
      author: {
        id: row.authorId,
        name: row.isAnonymous ? "Anonymous" : (row.authorName || "Anonymous"),
        avatarUrl: row.isAnonymous ? null : row.authorAvatarUrl,
        isAnonymous: row.isAnonymous,
      isYC: flags.isYC,
      isWeekendFund: flags.isWeekendFund,
      isConviction: flags.isConviction,
      isARK: flags.isARK,
      isPathlight: flags.isPathlight,
      isAccel: flags.isAccel,
    },
    createdAt: row.createdAt,
    publishedAt: row.publishedAt,
    isYCRFS: flags.isYCRFS,
    isWeekendFundRFS: flags.isWeekendFundRFS,
    isConviction: flags.isConviction,
    isARK: flags.isARK,
    isPathlight: flags.isPathlight,
    isAccel: flags.isAccel,
  }
}

export async function GET(req: NextRequest) {
  const source = normalizeSource(req.nextUrl.searchParams.get("source"))
  const category = normalizeCategory(req.nextUrl.searchParams.get("category"))
  const vcPartnerAuthorNames = getVCPartnerAuthorNames()
  const baseConditions = buildConditions({ source, category, vcPartnerAuthorNames })
  const whereClause = and(...baseConditions)

  try {
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const [trendingRows, popularRows, recentlyAddedRows, categoryCountRows] = await Promise.all([
      db
        .select(SECTION_SELECT)
        .from(problems)
        .leftJoin(users, eq(problems.authorId, users.id))
        .leftJoin(problemSources, and(eq(problemSources.problemId, problems.id), eq(problemSources.isPrimary, true)))
        .leftJoin(sourceInstitutions, eq(problemSources.sourceInstitutionId, sourceInstitutions.id))
        .where(and(whereClause, gte(problems.createdAt, thirtyDaysAgo)))
        .orderBy(desc(problems.upvotes), desc(problems.createdAt))
        .limit(SECTION_LIMIT),
      db
        .select(SECTION_SELECT)
        .from(problems)
        .leftJoin(users, eq(problems.authorId, users.id))
        .leftJoin(problemSources, and(eq(problemSources.problemId, problems.id), eq(problemSources.isPrimary, true)))
        .leftJoin(sourceInstitutions, eq(problemSources.sourceInstitutionId, sourceInstitutions.id))
        .where(whereClause)
        .orderBy(desc(problems.upvotes), desc(problems.createdAt))
        .limit(SECTION_LIMIT),
      db
        .select(SECTION_SELECT)
        .from(problems)
        .leftJoin(users, eq(problems.authorId, users.id))
        .leftJoin(problemSources, and(eq(problemSources.problemId, problems.id), eq(problemSources.isPrimary, true)))
        .leftJoin(sourceInstitutions, eq(problemSources.sourceInstitutionId, sourceInstitutions.id))
        .where(whereClause)
        .orderBy(desc(problems.createdAt))
        .limit(SECTION_LIMIT),
      db
        .select({
          category: problems.category,
          count: sql<number>`count(*)::int`,
        })
        .from(problems)
        .leftJoin(users, eq(problems.authorId, users.id))
        .leftJoin(problemSources, and(eq(problemSources.problemId, problems.id), eq(problemSources.isPrimary, true)))
        .leftJoin(sourceInstitutions, eq(problemSources.sourceInstitutionId, sourceInstitutions.id))
        .where(whereClause)
        .groupBy(problems.category)
        .having(sql`count(*) >= 2`)
        .orderBy(desc(sql`count(*)`)),
    ])

    const trendingWithFallback = trendingRows.length >= SECTION_LIMIT
      ? trendingRows
      : await db
          .select(SECTION_SELECT)
          .from(problems)
          .leftJoin(users, eq(problems.authorId, users.id))
          .leftJoin(problemSources, and(eq(problemSources.problemId, problems.id), eq(problemSources.isPrimary, true)))
          .leftJoin(sourceInstitutions, eq(problemSources.sourceInstitutionId, sourceInstitutions.id))
          .where(whereClause)
          .orderBy(desc(problems.upvotes), desc(problems.createdAt))
          .limit(SECTION_LIMIT)

    const categoryGroups = await Promise.all(
      categoryCountRows.map(async ({ category: categoryName, count }) => {
        const rows = await db
          .select(SECTION_SELECT)
          .from(problems)
          .leftJoin(users, eq(problems.authorId, users.id))
          .leftJoin(problemSources, and(eq(problemSources.problemId, problems.id), eq(problemSources.isPrimary, true)))
          .leftJoin(sourceInstitutions, eq(problemSources.sourceInstitutionId, sourceInstitutions.id))
          .where(and(whereClause, ilike(problems.category, categoryName)))
          .orderBy(desc(problems.upvotes), desc(problems.createdAt))
          .limit(CATEGORY_LIMIT)

        return {
          category: categoryName,
          count,
          problems: rows.map(mapProblemRow),
        }
      })
    )

    return NextResponse.json({
      sections: {
        trending: trendingWithFallback.map(mapProblemRow),
        recentlyAdded: recentlyAddedRows.map(mapProblemRow),
        popular: popularRows.map(mapProblemRow),
        categoryGroups: categoryGroups.map(({ category: categoryName, problems: groupedProblems }) => ({
          category: categoryName,
          problems: groupedProblems,
        })),
      },
    })
  } catch (error) {
    const incidentId = await reportIncident({
      area: "browse",
      route: "/api/problems/sections",
      message: "Failed to load browse sections",
      details: { source, category },
      error,
    })

    return NextResponse.json(
      {
        error: `Our browse curator dropped the filing cabinet. Please retry shortly. Incident: ${incidentId}`,
        incidentId,
      },
      {
        status: 500,
        headers: { "x-openquest-incident-id": incidentId },
      },
    )
  }
}
