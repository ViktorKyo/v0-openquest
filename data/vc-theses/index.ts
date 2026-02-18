/**
 * VC Thesis Data Types and Index
 *
 * This file contains type definitions for VC investment thesis articles
 * and exports all available theses.
 */

export interface ThesisSection {
  title: string
  content: string
  bulletPoints?: string[]
  relatedProblemIds?: string[]
}

export interface VCThesis {
  // Identification
  slug: string
  vcName: string
  vcShortName: string

  // Timing
  year: number
  quarter?: string
  publishedAt: string
  lastUpdated?: string

  // Display
  title: string
  subtitle: string
  logoUrl?: string
  brandColor: string

  // Source
  sourceUrl: string
  sourceName: string
  asOfDate?: string
  evidenceLinks?: Array<{ label: string; url: string }>
  engagementUrl?: string
  engagementLabel?: string

  // Content
  summary: string
  sections: ThesisSection[]

  // Metadata
  hasRFSProblems: boolean
  rfsPageUrl?: string
  tags: string[]

  // Stats
  problemCount?: number
  themeCount?: number
}

// Import all thesis articles
import { a16z2026Thesis } from './a16z-2026'
import { ycSpring2026Thesis } from './yc-spring-2026'
import { conviction2026Thesis } from './conviction-2026'
import { pathlight2026Thesis } from './pathlight-2026'
import { sequoia2025Thesis } from './sequoia-2025'
import { lightspeed2026Thesis } from './lightspeed-2026'
import { bessemer2025Thesis } from './bessemer-2025'
import { generalCatalyst2025Thesis } from './general-catalyst-2025'
import { foundersFund2025Thesis } from './founders-fund-2025'
import { khosla2025Thesis } from './khosla-2025'
import { greylock2025Thesis } from './greylock-2025'
import { felicis2025Thesis } from './felicis-2025'
import { lux2025Thesis } from './lux-2025'
import { index2026Thesis } from './index-2026'
import { ivp2026Thesis } from './ivp-2026'
import { nea2026Thesis } from './nea-2026'
import { insight2026Thesis } from './insight-2026'
import { gv2026Thesis } from './gv-2026'
import { accel2026Thesis } from './accel-2026'
import { kleinerPerkins2026Thesis } from './kleiner-perkins-2026'

// Export all theses
export const allVCTheses: VCThesis[] = [
  ycSpring2026Thesis,
  a16z2026Thesis,
  index2026Thesis,
  ivp2026Thesis,
  nea2026Thesis,
  insight2026Thesis,
  gv2026Thesis,
  accel2026Thesis,
  kleinerPerkins2026Thesis,
  conviction2026Thesis,
  pathlight2026Thesis,
  sequoia2025Thesis,
  lightspeed2026Thesis,
  bessemer2025Thesis,
  generalCatalyst2025Thesis,
  foundersFund2025Thesis,
  khosla2025Thesis,
  greylock2025Thesis,
  felicis2025Thesis,
  lux2025Thesis,
]

// Helper to get thesis by slug
export function getThesisBySlug(slug: string): VCThesis | undefined {
  return allVCTheses.find(thesis => thesis.slug === slug)
}

// Helper to get theses by year
export function getThesesByYear(year: number): VCThesis[] {
  return allVCTheses.filter(thesis => thesis.year === year)
}

// Helper to get theses with RFS problems
export function getThesesWithProblems(): VCThesis[] {
  return allVCTheses.filter(thesis => thesis.hasRFSProblems)
}

// Get unique years
export function getAvailableYears(): number[] {
  const years = [...new Set(allVCTheses.map(t => t.year))]
  return years.sort((a, b) => b - a)
}

// Get unique tags
export function getAllTags(): string[] {
  const tags = allVCTheses.flatMap(t => t.tags)
  return [...new Set(tags)].sort()
}

// Get tags with counts for visualization
export function getTagsWithCounts(): { tag: string; count: number; vcSlugs: string[] }[] {
  const tagMap = new Map<string, Set<string>>()

  for (const thesis of allVCTheses) {
    for (const tag of thesis.tags) {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, new Set())
      }
      tagMap.get(tag)!.add(thesis.slug)
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, vcSlugs]) => ({
      tag,
      count: vcSlugs.size,
      vcSlugs: Array.from(vcSlugs),
    }))
    .sort((a, b) => b.count - a.count)
}

// Get VCs that cover a specific tag
export function getVCsByTag(tag: string): VCThesis[] {
  return allVCTheses.filter(thesis =>
    thesis.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

// Get theme consensus - how many VCs agree on each theme
export function getThemeConsensus(): Map<string, VCThesis[]> {
  const consensus = new Map<string, VCThesis[]>()

  for (const thesis of allVCTheses) {
    for (const tag of thesis.tags) {
      if (!consensus.has(tag)) {
        consensus.set(tag, [])
      }
      consensus.get(tag)!.push(thesis)
    }
  }

  return consensus
}
