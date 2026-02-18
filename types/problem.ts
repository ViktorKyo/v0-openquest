/**
 * Unified problem types for OpenQuest
 * Includes VC partner flags to eliminate `as any` type casts
 */

/**
 * VC Partner author flags
 */
export interface VCAuthorFlags {
  isYC?: boolean
  isWeekendFund?: boolean
  isConviction?: boolean
  isARK?: boolean
  isPathlight?: boolean
  isAccel?: boolean
}

/**
 * VC Partner problem flags with dates
 */
export interface VCProblemFlags {
  isYCRFS?: boolean
  ycQuarter?: string
  isWeekendFundRFS?: boolean
  wfPublishedDate?: string
  isConviction?: boolean
  convictionPublishedDate?: string
  isARK?: boolean
  arkPublishedDate?: string
  isPathlight?: boolean
  pathlightPublishedDate?: string
  isAccel?: boolean
  accelPublishedDate?: string
}

/**
 * Problem author with VC flags
 */
export interface ProblemAuthor extends VCAuthorFlags {
  id?: string
  name: string
  username?: string
  avatar?: string
  avatarUrl?: string | null
  isAnonymous?: boolean
}

/**
 * Author intent fields for problem submissions
 */
export interface AuthorIntentFields {
  involvement?: "want-build" | "already-building" | "just-sharing" | "want-to-work"
  wantBuildBlocker?: Array<"need-capital" | "need-cofounder">
  wantToWorkInvolvement?: Array<"volunteer" | "full-time">
  alreadyBuildingSupport?: Array<"awareness" | "founding-team" | "cofounder" | "capital">
}

/**
 * Base problem structure from mock data
 */
export interface BaseProblem extends VCProblemFlags, AuthorIntentFields {
  id: string | number
  title: string
  elevatorPitch: string
  fullDescription?: string
  category: string
  industryTags?: string[]

  // Engagement metrics
  upvotes: number
  commentCount: number
  builderCount: number
  investorCount: number

  // Author
  author: ProblemAuthor
  isAnonymous?: boolean

  // Curated tweets
  tweetUrls?: string[]

  // Timestamps
  createdAt: Date | string
  publishedAt?: Date | string
}

/**
 * Transformed problem for feed display
 */
export interface FeedProblem extends VCProblemFlags {
  id: string | number
  title: string
  description: string
  category: string
  categoryColor: string
  upvotes: number
  comments: number
  building: number
  investors: number
  author: ProblemAuthor
  timeAgo: string
  createdAt: Date | string
}

/**
 * Problem card display format
 */
export interface ProblemCardData extends AuthorIntentFields {
  id: string | number
  title: string
  description: string
  category: string
  categoryColor: string
  upvotes: number
  comments: number
  author: ProblemAuthor
  timeAgo: string
  isAnonymous?: boolean
}

/**
 * Shape of a single problem returned by the search API (GET /api/problems/search)
 */
export interface SearchProblemResult extends VCProblemFlags {
  id: string | number
  title: string
  description: string
  fullDescription: string | null
  category: string
  industryTags: string[] | null
  upvotes: number
  comments: number
  building: number
  investors: number
  author: {
    id?: string | null
    name: string
    avatarUrl: string | null
    isAnonymous: boolean | null
  } & VCAuthorFlags
  createdAt: string | Date
  publishedAt: string | Date | null
  // Fallback fields (present in some data paths)
  elevatorPitch?: string
  commentCount?: number
  builderCount?: number
  investorCount?: number
}

/**
 * Shape of the problem object returned by the detail API (GET /api/problems/[id])
 */
export interface ProblemDetailApiResponse extends VCProblemFlags {
  id: string
  title: string
  elevatorPitch: string
  fullDescription: string
  category: string
  industryTags: string[] | null
  upvotes: number
  commentCount: number
  builderCount: number
  investorCount: number
  involvement: string | null
  wantBuildBlocker: string[] | null
  alreadyBuildingSupport: string[] | null
  wantToWorkInvolvement: string[] | null
  deckType: string | null
  deckLink: string | null
  forkedFromProblemId: string | null
  author: {
    id: string | null
    name: string
    avatarUrl: string | null
    isAnonymous: boolean | null
  } & VCAuthorFlags
  tweetUrls?: string[]
  createdAt: string | Date
  publishedAt: string | Date | null
}
