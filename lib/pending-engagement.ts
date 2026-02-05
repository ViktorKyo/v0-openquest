import type {
  InvestmentTier,
  InvestmentFocus,
  EngagementLevel,
  BuildStatus,
  BuildStage,
  LookingFor,
  RaisingStage,
  Visibility,
  RoleInterest,
} from "@/types/engagement"

// Form data types for each engagement action
export interface BuildFormData {
  status: BuildStatus
  stage: BuildStage
  visibility: Visibility
  lookingFor: LookingFor[]
  projectLink: string
  description: string
  // Enhanced fields
  whyYou: string
  progressSoFar?: string
  linkedIn?: string
  twitter?: string
  website?: string
  raisingStage?: RaisingStage
}

export interface InvestFormData {
  tier: InvestmentTier
  focus: InvestmentFocus
  engagementLevel: EngagementLevel
  note: string
  visibility: Visibility
  linkedIn?: string
}

export interface JoinTeamFormData {
  roleInterest: RoleInterest
  skills: string[]
  intro: string
  // Social proof fields
  linkedIn?: string
  twitter?: string
  portfolio?: string
}

export type EngagementActionType = 'build' | 'invest' | 'joinTeam' | 'upvote' | 'follow' | 'fork'

export interface PendingEngagement {
  type: EngagementActionType
  problemId: string
  problemTitle?: string
  data?: BuildFormData | InvestFormData | JoinTeamFormData
  timestamp: number
}

const STORAGE_KEY = 'openquest_pending_engagement'
const EXPIRY_HOURS = 24

/**
 * Save pending engagement data to localStorage
 */
export function savePendingEngagement(
  engagement: Omit<PendingEngagement, 'timestamp'>
): void {
  const data: PendingEngagement = {
    ...engagement,
    timestamp: Date.now(),
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage may be unavailable (SSR, private browsing)
  }
}

/**
 * Get pending engagement from localStorage
 * Returns null if not found, expired, or invalid
 */
export function getPendingEngagement(): PendingEngagement | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const data: PendingEngagement = JSON.parse(stored)

    // Check expiry (24 hours)
    const hoursElapsed = (Date.now() - data.timestamp) / (1000 * 60 * 60)
    if (hoursElapsed > EXPIRY_HOURS) {
      clearPendingEngagement()
      return null
    }

    return data
  } catch {
    return null
  }
}

/**
 * Clear pending engagement from localStorage
 */
export function clearPendingEngagement(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // localStorage may be unavailable
  }
}

/**
 * Check if there's a pending engagement for a specific problem
 */
export function hasPendingEngagementForProblem(problemId: string): boolean {
  const pending = getPendingEngagement()
  return pending !== null && pending.problemId === problemId
}

/**
 * Get action label for display
 */
export function getActionLabel(type: EngagementActionType): string {
  const labels: Record<EngagementActionType, string> = {
    build: "register as building this problem",
    invest: "express investment interest",
    joinTeam: "apply to join this team",
    upvote: "upvote this problem",
    follow: "follow this problem",
    fork: "fork this problem",
  }
  return labels[type] || "complete your action"
}
