/**
 * Problem utility functions for OpenQuest
 */

import type { VCProblemFlags, VCAuthorFlags } from "@/types/problem"
import { getVCPartnerAuthorNames } from "@/lib/source-registry"

interface ProblemWithVCFlags extends VCProblemFlags {
  author?: VCAuthorFlags
}

export const VC_AUTHOR_NAMES = getVCPartnerAuthorNames()

/**
 * Check if a problem is from a VC partner (YC, Weekend Fund, Conviction, ARK, Pathlight)
 * Used for source filtering (VC Partners vs Community)
 */
export function isVCProblem(problem: ProblemWithVCFlags): boolean {
  return Boolean(
    problem.isYCRFS ||
    problem.isWeekendFundRFS ||
    problem.isConviction ||
    problem.isARK ||
    problem.isPathlight ||
    problem.isAccel ||
    problem.author?.isYC ||
    problem.author?.isWeekendFund ||
    problem.author?.isConviction ||
    problem.author?.isARK ||
    problem.author?.isPathlight ||
    problem.author?.isAccel
  )
}

/**
 * Get the VC partner type for a problem (for display purposes)
 */
export function getVCPartnerType(problem: ProblemWithVCFlags): string | null {
  if (problem.isYCRFS || problem.author?.isYC) return "yc"
  if (problem.isWeekendFundRFS || problem.author?.isWeekendFund) return "weekend-fund"
  if (problem.isConviction || problem.author?.isConviction) return "conviction"
  if (problem.isARK || problem.author?.isARK) return "ark"
  if (problem.isPathlight || problem.author?.isPathlight) return "pathlight"
  if (problem.isAccel || problem.author?.isAccel) return "accel"
  return null
}

export interface InstitutionFlags extends VCAuthorFlags, VCProblemFlags {}

export function getInstitutionFlagsFromAuthorName(authorName: string | null | undefined): InstitutionFlags {
  const isYC = authorName === "Y Combinator"
  const isWeekendFund = authorName === "Weekend Fund"
  const isConviction = authorName === "Conviction"
  const isARK = authorName === "ARK Invest"
  const isPathlight = authorName === "Pathlight Ventures"
  const isAccel = authorName === "Accel"

  return {
    isYC,
    isWeekendFund,
    isConviction,
    isARK,
    isPathlight,
    isAccel,
    isYCRFS: isYC,
    isWeekendFundRFS: isWeekendFund,
  }
}
