/**
 * Problems Data
 * Currently contains YC RFS, Weekend Fund RFS, and Conviction problems
 * Regular user-submitted problems can be added gradually
 */

import { ycRfsProblems, ycAuthor } from "./yc-rfs-problems"
import { weekendFundProblems, weekendFundAuthor } from "./weekend-fund-problems"
import { convictionProblems, convictionAuthor } from "./conviction-problems"
import { arkInvestProblems, arkInvestAuthor } from "./ark-invest-problems"
import { pathlightProblems, pathlightAuthor } from "./pathlight-problems"

interface RegularProblem {
  id: number | string
  title: string
  elevatorPitch: string
  fullDescription: string
  author: {
    username: string
    avatarUrl: string
    isYC?: boolean
    isWeekendFund?: boolean
    verified?: boolean
  }
  category: string
  industryTags: string[]
  upvotes: number
  commentCount: number
  builderCount: number
  investorCount: number
  createdAt: Date
  isAnonymous: boolean
  involvement: "want-build" | "already-building" | "just-sharing" | "want-to-work"
}

// Regular user problems (empty for now - to be added gradually)
const regularProblems: RegularProblem[] = []

// Transform YC problems to match the regular problem format
const ycProblems = ycRfsProblems.map((problem, index) => ({
  id: problem.id,
  title: problem.title,
  elevatorPitch: problem.elevatorPitch,
  fullDescription: problem.fullDescription,
  author: {
    username: ycAuthor.username,
    avatarUrl: ycAuthor.avatar,
    isYC: true,
    verified: true,
  },
  category: getCategoryDisplayName(problem.category),
  industryTags: problem.industryTags,
  upvotes: 150 + index * 20, // Simulate varying popularity
  commentCount: 10 + index * 3,
  builderCount: 5 + index * 2,
  investorCount: 8 + index,
  createdAt: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000), // Spread over days
  isAnonymous: false,
  involvement: "just-sharing" as const,
  isYCRFS: true,
  ycQuarter: problem.quarter,
  ycPartner: problem.ycPartner,
  originalUrl: problem.originalUrl,
}))

// Transform Weekend Fund problems to match the regular problem format
const weekendFundProblemsTransformed = weekendFundProblems.map((problem, index) => ({
  id: problem.id,
  title: problem.title,
  elevatorPitch: problem.elevatorPitch,
  fullDescription: problem.fullDescription,
  author: {
    username: weekendFundAuthor.username,
    avatarUrl: weekendFundAuthor.avatar,
    isWeekendFund: true,
    verified: true,
  },
  category: getCategoryDisplayName(problem.category),
  industryTags: problem.industryTags,
  upvotes: 120 + index * 15, // Simulate varying popularity
  commentCount: 8 + index * 2,
  builderCount: 3 + index,
  investorCount: 6 + index,
  createdAt: new Date(problem.publishedDate),
  isAnonymous: false,
  involvement: "just-sharing" as const,
  isWeekendFundRFS: true,
  wfPublishedDate: problem.publishedDate,
  wfAuthors: problem.authors,
  originalUrl: problem.originalUrl,
}))

// Transform Conviction problems to match the regular problem format
const convictionProblemsTransformed = convictionProblems.map((problem, index) => ({
  id: problem.id,
  title: problem.title,
  elevatorPitch: problem.elevatorPitch,
  fullDescription: problem.fullDescription,
  author: {
    username: convictionAuthor.username,
    avatarUrl: convictionAuthor.avatar,
    isConviction: true,
    verified: true,
  },
  category: getCategoryDisplayName(problem.category),
  industryTags: problem.industryTags,
  upvotes: 100 + index * 12, // Simulate varying popularity
  commentCount: 6 + index * 2,
  builderCount: 2 + index,
  investorCount: 4 + index,
  createdAt: new Date(problem.publishedDate),
  isAnonymous: false,
  involvement: "just-sharing" as const,
  isConviction: true,
  convictionPublishedDate: problem.publishedDate,
  originalUrl: problem.originalUrl,
}))

// Transform ARK Invest problems to match the regular problem format
const arkInvestProblemsTransformed = arkInvestProblems.map((problem, index) => ({
  id: problem.id,
  title: problem.title,
  elevatorPitch: problem.elevatorPitch,
  fullDescription: problem.fullDescription,
  author: {
    username: arkInvestAuthor.username,
    avatarUrl: arkInvestAuthor.avatarUrl,
    isARK: true,
    verified: true,
  },
  category: getCategoryDisplayName(problem.category),
  industryTags: problem.industryTags,
  upvotes: 90 + index * 10, // Simulate varying popularity
  commentCount: 5 + index * 2,
  builderCount: 2 + index,
  investorCount: 5 + index,
  createdAt: new Date(problem.publishedDate),
  isAnonymous: false,
  involvement: "just-sharing" as const,
  isARK: true,
  arkPublishedDate: problem.publishedDate,
  originalUrl: problem.originalUrl,
}))

// Transform Pathlight problems to match the regular problem format
const pathlightProblemsTransformed = pathlightProblems.map((problem, index) => ({
  id: problem.id,
  title: problem.title,
  elevatorPitch: problem.elevatorPitch,
  fullDescription: problem.fullDescription,
  author: {
    username: pathlightAuthor.username,
    avatarUrl: pathlightAuthor.avatarUrl,
    isPathlight: true,
    verified: true,
  },
  category: getCategoryDisplayName(problem.category),
  industryTags: problem.industryTags,
  upvotes: 80 + index * 8, // Simulate varying popularity
  commentCount: 4 + index * 2,
  builderCount: 1 + index,
  investorCount: 3 + index,
  createdAt: new Date(problem.publishedDate),
  isAnonymous: false,
  involvement: "just-sharing" as const,
  isPathlight: true,
  pathlightPublishedDate: problem.publishedDate,
  originalUrl: problem.originalUrl,
}))

// Helper to map category slugs to display names
function getCategoryDisplayName(slug: string): string {
  const mapping: Record<string, string> = {
    "future-of-work": "Future of Work",
    "ai-infrastructure": "AI & Infrastructure",
    moonshots: "Moonshots",
    "creator-economy": "Creator Economy",
    longevity: "Longevity",
    "rebuild-money": "Rebuild Money",
    "climate-tech": "Climate Tech",
    "world-of-atoms": "World of Atoms",
    "niche-markets": "Niche Markets",
    other: "Other",
  }
  return mapping[slug] || slug
}

// Mix regular and VC partner problems
export const allProblems = [
  ...regularProblems,
  ...ycProblems,
  ...weekendFundProblemsTransformed,
  ...convictionProblemsTransformed,
  ...arkInvestProblemsTransformed,
  ...pathlightProblemsTransformed,
].sort((a, b) => {
  // Sort by upvotes descending (you can change this to sort by date or other criteria)
  return b.upvotes - a.upvotes
})

// Export just YC problems if needed
export const ycOnlyProblems = ycProblems

// Export just Weekend Fund problems if needed
export const weekendFundOnlyProblems = weekendFundProblemsTransformed

// Export just Conviction problems if needed
export const convictionOnlyProblems = convictionProblemsTransformed

// Export just ARK Invest problems if needed
export const arkInvestOnlyProblems = arkInvestProblemsTransformed

// Export just Pathlight problems if needed
export const pathlightOnlyProblems = pathlightProblemsTransformed

// Export just regular problems if needed
export { regularProblems }

// Get problems by category
export function getProblemsByCategory(categorySlug: string) {
  const categoryName = getCategoryDisplayName(categorySlug)
  return allProblems.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase())
}

// Get trending problems with balanced VC diversity
// Takes the top problem from each source, then fills remaining slots
export function getTrendingProblems(limit = 6) {
  const sources = [
    { key: "yc", problems: ycProblems },
    { key: "weekend-fund", problems: weekendFundProblemsTransformed },
    { key: "conviction", problems: convictionProblemsTransformed },
    { key: "ark", problems: arkInvestProblemsTransformed },
    { key: "pathlight", problems: pathlightProblemsTransformed },
  ]

  // Take the top problem from each source (highest upvotes first since allProblems is sorted)
  const picked: typeof allProblems = []
  const usedIds = new Set<number | string>()

  for (const source of sources) {
    if (source.problems.length > 0 && picked.length < limit) {
      // Find the highest-upvoted problem from this source
      const top = [...source.problems].sort((a, b) => b.upvotes - a.upvotes)[0]
      picked.push(top)
      usedIds.add(top.id)
    }
  }

  // Fill remaining slots from the overall sorted list
  for (const problem of allProblems) {
    if (picked.length >= limit) break
    if (!usedIds.has(problem.id)) {
      picked.push(problem)
      usedIds.add(problem.id)
    }
  }

  // Deterministic shuffle so order varies but is stable across renders
  for (let i = picked.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % (i + 1)
    ;[picked[i], picked[j]] = [picked[j], picked[i]]
  }

  return picked.slice(0, limit)
}

// Get recent problems (sorted by date)
export function getRecentProblems(limit = 10) {
  return [...allProblems].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit)
}
