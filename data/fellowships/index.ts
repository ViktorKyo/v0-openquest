// Fellowship data types, central re-export, and helper functions

// ============================================================
// Types
// ============================================================

export interface FellowshipSection {
  title: string
  content: string
  bulletPoints?: string[]
}

export type FellowshipCategory =
  | 'tech-startup'
  | 'research-science'
  | 'social-impact'
  | 'creative-arts'
  | 'open-ended'
  | 'international-graduate'
  | 'ai-tech'
  | 'journalism'

export interface Fellowship {
  slug: string
  name: string
  shortName: string
  organization: string

  fundingAmount: string
  fundingMin?: number
  fundingMax?: number

  duration: string
  applicationCycle: string
  deadline?: string
  year: number

  brandColor: string
  websiteUrl: string
  applicationStatus?: 'open' | 'closed' | 'rolling' | 'unknown'
  lastVerifiedAt?: string
  sourceLinks?: Array<{ label: string; url: string }>

  description: string
  summary: string
  sections: FellowshipSection[]

  eligibility: string
  ageRange?: string
  geographicScope: 'global' | 'us' | 'us-canada' | 'uk' | 'multi-country'

  category: FellowshipCategory
  tags: string[]

  relatedProblemCategories?: string[]
  tagCount?: number
}

// ============================================================
// Data imports
// ============================================================

import { techStartupFellowships } from './tech-startup'
import { researchScienceFellowships } from './research-science'
import { socialImpactFellowships } from './social-impact'
import { creativeArtsFellowships } from './creative-arts'
import { openEndedFellowships } from './open-ended'
import { internationalGraduateFellowships } from './international-graduate'
import { aiTechFellowships } from './ai-tech'
import { journalismFellowships } from './journalism'

export const allFellowships: Fellowship[] = [
  ...techStartupFellowships,
  ...researchScienceFellowships,
  ...socialImpactFellowships,
  ...creativeArtsFellowships,
  ...openEndedFellowships,
  ...internationalGraduateFellowships,
  ...aiTechFellowships,
  ...journalismFellowships,
]

// ============================================================
// Helper functions
// ============================================================

export function getFellowshipBySlug(slug: string): Fellowship | undefined {
  return allFellowships.find((f) => f.slug === slug)
}

export function getFellowshipsByCategory(category: FellowshipCategory): Fellowship[] {
  return allFellowships.filter((f) => f.category === category)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const f of allFellowships) {
    for (const tag of f.tags) {
      tags.add(tag)
    }
  }
  return Array.from(tags).sort()
}

export function getTagsWithCounts(): { tag: string; count: number; fellowshipSlugs: string[] }[] {
  const tagMap = new Map<string, string[]>()
  for (const f of allFellowships) {
    for (const tag of f.tags) {
      const existing = tagMap.get(tag) || []
      existing.push(f.slug)
      tagMap.set(tag, existing)
    }
  }
  return Array.from(tagMap.entries())
    .map(([tag, slugs]) => ({ tag, count: slugs.length, fellowshipSlugs: slugs }))
    .sort((a, b) => b.count - a.count)
}

export function getFellowshipsByTag(tag: string): Fellowship[] {
  return allFellowships.filter((f) => f.tags.includes(tag))
}

export function getFellowshipsByYear(year: number): Fellowship[] {
  return allFellowships.filter((f) => f.year === year)
}

export function getGlobalFellowships(): Fellowship[] {
  return allFellowships.filter((f) => f.geographicScope === 'global')
}

// Re-export category arrays for direct access
export {
  techStartupFellowships,
  researchScienceFellowships,
  socialImpactFellowships,
  creativeArtsFellowships,
  openEndedFellowships,
  internationalGraduateFellowships,
  aiTechFellowships,
  journalismFellowships,
}
