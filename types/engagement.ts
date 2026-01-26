// Engagement types for problem interactions

export type EngagementType = "upvote" | "invest" | "build" | "follow" | "apply"

export type InvestmentTier = "scout" | "angel" | "institutional"
export type BuildStatus = "active" | "exploring"
export type Visibility = "public" | "private"
export type RoleInterest = "cofounder" | "fulltime" | "parttime" | "volunteer"

export interface InvestmentData {
  tier: InvestmentTier
  note?: string
  isPublic: boolean
}

export interface BuildData {
  status: BuildStatus
  visibility: Visibility
  description?: string
}

export interface ApplicationData {
  roleInterest: RoleInterest
  skills: string[]
  intro: string
  attachmentUrl?: string
}

export interface ProblemEngagement {
  id: string
  problemId: string
  userId: string
  engagementType: EngagementType
  investmentData?: InvestmentData
  buildData?: BuildData
  applicationData?: ApplicationData
  createdAt: Date
}

export interface EngagementCounts {
  upvotes: number
  investors: number
  building: number
  buildingAnonymous: number
  followers: number
}

export interface EngagedUser {
  name: string
  avatar: string
  type: "building" | "investor" | "follower"
}
