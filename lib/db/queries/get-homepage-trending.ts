import { unstable_cache } from 'next/cache'
import { and, desc, eq, inArray, sql } from 'drizzle-orm'
import { db } from '@/lib/db/supabase'
import { problems, users } from '@/lib/db/schema'
import { PUBLIC_PROBLEM_STATUSES } from '@/lib/problem-access'
import { getInstitutionFlagsFromAuthorName } from '@/lib/problem-utils'
import { getCategoryColor, getTimeAgo } from '@/lib/formatters'
import { getTrendingProblems } from '@/data/mock-problems'

type WantBuildBlocker = 'need-capital' | 'need-cofounder'
type WantToWorkInvolvement = 'volunteer' | 'full-time'
type AlreadyBuildingSupport = 'awareness' | 'founding-team' | 'cofounder' | 'capital'

export interface HomepageTrendingProblem {
  id: string
  title: string
  description: string
  category: string
  upvotes: number
  comments: number
  author: {
    name: string
    avatar: string | null
    isYC?: boolean
    isWeekendFund?: boolean
    isConviction?: boolean
    isARK?: boolean
    isPathlight?: boolean
    isAccel?: boolean
  }
  timeAgo: string
  categoryColor: string
  involvement?: 'want-build' | 'already-building' | 'just-sharing' | 'want-to-work'
  wantBuildBlocker?: Array<WantBuildBlocker>
  wantToWorkInvolvement?: Array<WantToWorkInvolvement>
  alreadyBuildingSupport?: Array<AlreadyBuildingSupport>
  isAnonymous?: boolean
}

async function fetchHomepageTrendingProblems(): Promise<HomepageTrendingProblem[]> {
  try {
    const rows = await db
      .select({
        id: problems.id,
        title: problems.title,
        elevatorPitch: problems.elevatorPitch,
        category: problems.category,
        upvotes: problems.upvotes,
        commentCount: problems.commentCount,
        createdAt: problems.createdAt,
        involvement: problems.involvement,
        wantBuildBlocker: problems.wantBuildBlocker,
        wantToWorkInvolvement: problems.wantToWorkInvolvement,
        alreadyBuildingSupport: problems.alreadyBuildingSupport,
        isAnonymous: problems.isAnonymous,
        authorName: users.name,
        authorAvatarUrl: users.avatarUrl,
      })
      .from(problems)
      .leftJoin(users, eq(problems.authorId, users.id))
      .where(
        and(
          inArray(problems.status, [...PUBLIC_PROBLEM_STATUSES]),
          sql`(${users.name} IS NULL OR ${users.name} != 'Demo User')`
        )
      )
      .orderBy(desc(problems.upvotes), desc(problems.createdAt))
      .limit(6)

    if (rows.length > 0) {
      return rows.map((row) => {
        const flags = getInstitutionFlagsFromAuthorName(row.authorName)

        return {
          id: row.id,
          title: row.title,
          description: row.elevatorPitch,
          category: row.category,
          upvotes: row.upvotes || 0,
          comments: row.commentCount || 0,
          author: {
            name: row.isAnonymous ? 'Anonymous' : (row.authorName || 'Anonymous'),
            avatar: row.isAnonymous ? null : row.authorAvatarUrl,
            isYC: flags.isYC,
            isWeekendFund: flags.isWeekendFund,
            isConviction: flags.isConviction,
            isARK: flags.isARK,
            isPathlight: flags.isPathlight,
            isAccel: flags.isAccel,
          },
          timeAgo: getTimeAgo(row.createdAt),
          categoryColor: getCategoryColor(row.category),
          involvement: (row.involvement || undefined) as HomepageTrendingProblem['involvement'],
          wantBuildBlocker: (row.wantBuildBlocker as Array<WantBuildBlocker> | null) || undefined,
          wantToWorkInvolvement: (row.wantToWorkInvolvement as Array<WantToWorkInvolvement> | null) || undefined,
          alreadyBuildingSupport: (row.alreadyBuildingSupport as Array<AlreadyBuildingSupport> | null) || undefined,
          isAnonymous: Boolean(row.isAnonymous),
        }
      })
    }
  } catch {
    // Fall through to curated fallback dataset for local/dev resilience.
  }

  const fallback = getTrendingProblems(6)
  return fallback.map((problem) => {
    const flags = getInstitutionFlagsFromAuthorName(problem.author.username)

    return {
      id: String(problem.id),
      title: problem.title,
      description: problem.elevatorPitch,
      category: problem.category,
      upvotes: problem.upvotes,
      comments: problem.commentCount,
      author: {
        name: problem.author.username,
        avatar: problem.author.avatarUrl,
        isYC: flags.isYC,
        isWeekendFund: flags.isWeekendFund,
        isConviction: flags.isConviction,
        isARK: flags.isARK,
        isPathlight: flags.isPathlight,
        isAccel: flags.isAccel,
      },
      timeAgo: getTimeAgo(problem.createdAt),
      categoryColor: getCategoryColor(problem.category),
      involvement: problem.involvement,
      isAnonymous: problem.isAnonymous,
    }
  })
}

export const getHomepageTrendingProblems = unstable_cache(
  fetchHomepageTrendingProblems,
  ['homepage-trending-v1'],
  { revalidate: 300, tags: ['homepage'] }
)
