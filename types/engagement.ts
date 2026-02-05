// Engagement types for problem interactions

export type EngagementType = "upvote" | "invest" | "build" | "follow" | "apply"

export type InvestmentTier = "scout" | "angel" | "institutional"
export type InvestmentFocus = "pre-seed" | "seed" | "series-a-plus"
export type EngagementLevel = "watching" | "evaluating" | "ready-to-support"
export type BuildStatus = "active" | "exploring"
export type BuildStage = "idea" | "research" | "building" | "launched"
export type LookingFor = "feedback" | "early-users" | "domain-experts" | "cofounders" | "investment"
export type RaisingStage = "pre-seed" | "seed" | "series-a-plus" | "not-sure"
export type Visibility = "public" | "private"
export type RoleInterest = "cofounder" | "fulltime" | "parttime" | "volunteer"

export interface InvestmentData {
  tier: InvestmentTier
  focus: InvestmentFocus
  engagementLevel: EngagementLevel
  note?: string
  isPublic: boolean
  visibility: Visibility
  linkedIn?: string
}

export interface BuildData {
  status: BuildStatus
  stage: BuildStage
  visibility: Visibility
  lookingFor: LookingFor[]
  projectLink?: string
  description?: string
  // Enhanced fields for accelerator-style application
  whyYou: string
  progressSoFar?: string
  linkedIn?: string
  twitter?: string
  website?: string
  raisingStage?: RaisingStage
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
