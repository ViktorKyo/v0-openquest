import { db } from '@/lib/db/supabase'
import { problems, users } from '@/lib/db/schema'
import { and, eq, inArray } from 'drizzle-orm'
import { PUBLIC_PROBLEM_STATUSES } from '@/lib/problem-access'
import { getInstitutionFlagsFromAuthorName } from '@/lib/problem-utils'

/** Fetch a problem by ID with author info. Used by both generateMetadata and API route. */
export async function getProblemById(problemId: string) {
  const [result] = await db
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
      involvement: problems.involvement,
      wantBuildBlocker: problems.wantBuildBlocker,
      alreadyBuildingSupport: problems.alreadyBuildingSupport,
      wantToWorkInvolvement: problems.wantToWorkInvolvement,
      deckType: problems.deckType,
      deckLink: problems.deckLink,
      forkedFromProblemId: problems.forkedFromProblemId,
      tweetUrls: problems.tweetUrls,
      createdAt: problems.createdAt,
      publishedAt: problems.publishedAt,
      authorId: problems.authorId,
      isAnonymous: problems.isAnonymous,
      authorName: users.name,
      authorAvatarUrl: users.avatarUrl,
    })
    .from(problems)
    .leftJoin(users, eq(problems.authorId, users.id))
    .where(and(eq(problems.id, problemId), inArray(problems.status, [...PUBLIC_PROBLEM_STATUSES])))
    .limit(1)

  if (!result) return null

  const flags = getInstitutionFlagsFromAuthorName(result.authorName)

  return {
    id: result.id,
    title: result.title,
    elevatorPitch: result.elevatorPitch,
    fullDescription: result.fullDescription,
    category: result.category,
    industryTags: result.industryTags,
    upvotes: result.upvotes || 0,
    commentCount: result.commentCount || 0,
    builderCount: result.builderCount || 0,
    investorCount: result.investorCount || 0,
    involvement: result.involvement,
    wantBuildBlocker: (result.wantBuildBlocker as string[] | null) || [],
    alreadyBuildingSupport: (result.alreadyBuildingSupport as string[] | null) || [],
    wantToWorkInvolvement: (result.wantToWorkInvolvement as string[] | null) || [],
    deckType: result.deckType,
    deckLink: result.deckLink,
    forkedFromProblemId: result.forkedFromProblemId,
    tweetUrls: (result.tweetUrls as string[] | null) || [],
    author: {
      id: result.authorId,
      name: result.isAnonymous ? 'Anonymous' : (result.authorName || 'Anonymous'),
      avatarUrl: result.isAnonymous ? null : result.authorAvatarUrl,
      isAnonymous: result.isAnonymous,
      isYC: flags.isYC,
      isWeekendFund: flags.isWeekendFund,
      isConviction: flags.isConviction,
      isARK: flags.isARK,
      isPathlight: flags.isPathlight,
      isAccel: flags.isAccel,
    },
    createdAt: result.createdAt,
    publishedAt: result.publishedAt,
    isYCRFS: flags.isYCRFS,
    isWeekendFundRFS: flags.isWeekendFundRFS,
    isConviction: flags.isConviction,
    isARK: flags.isARK,
    isPathlight: flags.isPathlight,
    isAccel: flags.isAccel,
  }
}
