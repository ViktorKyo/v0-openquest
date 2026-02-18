export interface ResidencySection {
  title: string
  content: string
  bulletPoints?: string[]
}

export type ResidencyCategory = 'vc-backed' | 'community' | 'corporate'

export interface Residency {
  slug: string
  name: string
  shortName: string
  organization: string

  // Funding
  fundingAmount: string
  fundingMin?: number
  fundingMax?: number
  equityTerms?: string

  // Program
  duration: string
  cohortSize?: string
  cohortCadence?: string
  applicationCycle: string
  deadline?: string

  // Location
  location: string
  isLiveIn: boolean
  geographicScope: 'global' | 'us' | 'multi-country'

  // Meta
  brandColor: string
  websiteUrl: string
  applicationStatus?: 'open' | 'closed' | 'rolling' | 'unknown'
  lastVerifiedAt?: string
  sourceLinks?: Array<{ label: string; url: string }>

  // Content
  description: string
  summary: string
  sections: ResidencySection[]

  // Classification
  category: ResidencyCategory
  tags: string[]
  focusAreas: string[]

  year: number
  notableAlumni?: string[]
}

import { vcBackedResidencies } from './vc-backed'
import { communityResidencies } from './community'

export const allResidencies: Residency[] = [...vcBackedResidencies, ...communityResidencies]

export function getResidencyBySlug(slug: string): Residency | undefined {
  return allResidencies.find((r) => r.slug === slug)
}

export function getResidenciesByTag(tag: string): Residency[] {
  return allResidencies.filter((r) =>
    r.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getResidenciesByCategory(category: ResidencyCategory): Residency[] {
  return allResidencies.filter((r) => r.category === category)
}

export function getAllResidencyTags(): string[] {
  const tags = new Set<string>()
  for (const residency of allResidencies) {
    for (const tag of residency.tags) tags.add(tag)
  }
  return Array.from(tags).sort()
}
