/**
 * Problems Data
 * Currently contains YC RFS and Weekend Fund RFS problems
 * Regular user-submitted problems can be added gradually
 */

import { ycRfsProblems, ycAuthor } from "./yc-rfs-problems"
import { weekendFundProblems, weekendFundAuthor } from "./weekend-fund-problems"

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

// Mix regular, YC, and Weekend Fund problems
export const allProblems = [...regularProblems, ...ycProblems, ...weekendFundProblemsTransformed].sort((a, b) => {
  // Sort by upvotes descending (you can change this to sort by date or other criteria)
  return b.upvotes - a.upvotes
})

// Export just YC problems if needed
export const ycOnlyProblems = ycProblems

// Export just Weekend Fund problems if needed
export const weekendFundOnlyProblems = weekendFundProblemsTransformed

// Export just regular problems if needed
export { regularProblems }

// Get problems by category
export function getProblemsByCategory(categorySlug: string) {
  const categoryName = getCategoryDisplayName(categorySlug)
  return allProblems.filter((p) => p.category.toLowerCase() === categoryName.toLowerCase())
}

// Get trending problems (top 6 by upvotes)
export function getTrendingProblems(limit = 6) {
  return allProblems.slice(0, limit)
}

// Get recent problems (sorted by date)
export function getRecentProblems(limit = 10) {
  return [...allProblems].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit)
}
