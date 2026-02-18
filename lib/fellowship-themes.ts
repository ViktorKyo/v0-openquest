/**
 * Fellowship Themes - Focus Area Aggregation & Cross-Fellowship Analysis
 *
 * This module provides utilities for analyzing focus areas across
 * all fellowships, enabling the interactive Fellowships hub visualization.
 * Mirrors the pattern from lib/funding-themes.ts.
 */

import { allFellowships, type Fellowship, type FellowshipCategory } from '@/data/fellowships'

// Focus area color mapping for visualization
const FOCUS_COLORS: Record<string, { color: string; colorClass: string }> = {
  'AI & Machine Learning': { color: '#8B5CF6', colorClass: 'violet' },
  'Entrepreneurship': { color: '#F97316', colorClass: 'orange' },
  'Social Impact': { color: '#10B981', colorClass: 'emerald' },
  'Science & Research': { color: '#3B82F6', colorClass: 'blue' },
  'Creative Arts': { color: '#EC4899', colorClass: 'pink' },
  'Policy & Government': { color: '#6366F1', colorClass: 'indigo' },
  'Climate & Energy': { color: '#84CC16', colorClass: 'lime' },
  'Healthcare & Biotech': { color: '#14B8A6', colorClass: 'teal' },
  'Deep Tech': { color: '#A855F7', colorClass: 'purple' },
  'Education': { color: '#FBBF24', colorClass: 'yellow' },
  'Open Source': { color: '#22C55E', colorClass: 'green' },
  'Leadership': { color: '#0EA5E9', colorClass: 'sky' },
  'Global Affairs': { color: '#64748B', colorClass: 'slate' },
  'Journalism': { color: '#EF4444', colorClass: 'red' },
}

// Tags excluded from focus area aggregation (too generic to be useful as filters)
const EXCLUDED_TAGS = new Set(['Any Field'])

const DEFAULT_COLOR = { color: '#6B7280', colorClass: 'gray' }

// Category metadata for display
export const CATEGORY_META: Record<FellowshipCategory, { name: string; color: string; description: string }> = {
  'tech-startup': { name: 'Tech & Startup', color: '#F97316', description: 'Fellowships for founders, builders, and tech entrepreneurs' },
  'research-science': { name: 'Research & Science', color: '#3B82F6', description: 'Fellowships for researchers, scientists, and PhD students' },
  'social-impact': { name: 'Social Impact', color: '#10B981', description: 'Fellowships for social entrepreneurs and changemakers' },
  'creative-arts': { name: 'Creative & Arts', color: '#EC4899', description: 'Fellowships for artists, writers, and creative thinkers' },
  'open-ended': { name: 'Open-Ended & Ambitious', color: '#8B5CF6', description: 'Fellowships for ambitious projects in any domain' },
  'international-graduate': { name: 'International & Graduate', color: '#6366F1', description: 'Prestigious graduate study fellowships worldwide' },
  'ai-tech': { name: 'AI & Technology', color: '#A855F7', description: 'Fellowships focused on AI research and trustworthy technology' },
  'journalism': { name: 'Journalism', color: '#EF4444', description: 'Fellowships for journalists and media professionals' },
}

export interface FellowshipFocusArea {
  slug: string
  name: string
  fellowshipCount: number
  totalFellowships: number
  consensusPercentage: number
  fellowships: {
    slug: string
    name: string
    shortName: string
    brandColor: string
    year: number
  }[]
  color: string
  colorClass: string
  seo: {
    title: string
    description: string
  }
}

export interface FellowshipStats {
  totalFellowships: number
  totalFocusAreas: number
  mostPopularFocus: string
  mostPopularCount: number
  globalCount: number
  maxFundingDisplay: string
}

/**
 * Slugify a focus area name for URL use
 */
export function slugifyFocus(name: string): string {
  return name
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Get all focus area tags with their fellowship counts
 */
export function getFocusTagsWithCounts(): { tag: string; count: number; fellowships: string[] }[] {
  const tagMap = new Map<string, Set<string>>()

  for (const fellowship of allFellowships) {
    for (const tag of fellowship.tags) {
      if (EXCLUDED_TAGS.has(tag)) continue
      if (!tagMap.has(tag)) {
        tagMap.set(tag, new Set())
      }
      tagMap.get(tag)!.add(fellowship.slug)
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, slugs]) => ({
      tag,
      count: slugs.size,
      fellowships: Array.from(slugs),
    }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Get fellowships that cover a specific focus area tag
 */
export function getFellowshipsByFocusTag(tag: string): Fellowship[] {
  return allFellowships.filter((f) =>
    f.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get all focus areas sorted by popularity (fellowship count)
 */
export function getFocusByPopularity(): FellowshipFocusArea[] {
  const tagsWithCounts = getFocusTagsWithCounts()
  const totalFellowships = allFellowships.length

  return tagsWithCounts.map(({ tag, count, fellowships }) => {
    const focusColors = FOCUS_COLORS[tag] || DEFAULT_COLOR
    const fellowshipDetails = fellowships
      .map((slug) => {
        const f = allFellowships.find((fe) => fe.slug === slug)
        if (!f) return null
        return {
          slug: f.slug,
          name: f.name,
          shortName: f.shortName,
          brandColor: f.brandColor,
          year: f.year,
        }
      })
      .filter(Boolean) as FellowshipFocusArea['fellowships']

    return {
      slug: slugifyFocus(tag),
      name: tag,
      fellowshipCount: count,
      totalFellowships,
      consensusPercentage: Math.round((count / totalFellowships) * 100),
      fellowships: fellowshipDetails,
      color: focusColors.color,
      colorClass: focusColors.colorClass,
      seo: {
        title: `${tag} Fellowships | Fellowship Guide | OpenQuest`,
        description: `${count} of ${totalFellowships} top fellowships focus on ${tag}. Discover fellowships funding ${tag} projects and find problems to work on.`,
      },
    }
  })
}

/**
 * Get a single focus area by slug
 */
export function getFocusBySlug(slug: string): FellowshipFocusArea | undefined {
  const focusAreas = getFocusByPopularity()
  return focusAreas.find((f) => f.slug === slug)
}

/**
 * Get fellowships for a specific focus area
 */
export function getFellowshipsForFocus(focusSlug: string): Fellowship[] {
  const focus = getFocusBySlug(focusSlug)
  if (!focus) return []

  return focus.fellowships
    .map((f) => allFellowships.find((fe) => fe.slug === f.slug))
    .filter(Boolean) as Fellowship[]
}

/**
 * Get overall fellowship statistics
 */
export function getFocusStats(): FellowshipStats {
  const tagsWithCounts = getFocusTagsWithCounts()
  const globalCount = allFellowships.filter((f) => f.geographicScope === 'global').length

  const mostPopular = tagsWithCounts[0] || { tag: '', count: 0 }

  // Find max single funding amount
  let maxFunding = 0
  let maxFundingDisplay = '$0'
  for (const f of allFellowships) {
    const max = f.fundingMax || f.fundingMin || 0
    if (max > maxFunding) {
      maxFunding = max
      maxFundingDisplay = f.fundingAmount
    }
  }

  return {
    totalFellowships: allFellowships.length,
    totalFocusAreas: tagsWithCounts.length,
    mostPopularFocus: mostPopular.tag,
    mostPopularCount: mostPopular.count,
    globalCount,
    maxFundingDisplay,
  }
}

/**
 * Get top N focus areas
 */
export function getTopFocusAreas(n: number = 10): FellowshipFocusArea[] {
  return getFocusByPopularity().slice(0, n)
}

/**
 * Get focus areas that have consensus (more than X% of fellowships)
 */
export function getConsensusFocusAreas(minPercentage: number = 30): FellowshipFocusArea[] {
  return getFocusByPopularity().filter(
    (focus) => focus.consensusPercentage >= minPercentage
  )
}

/**
 * Get all unique focus area slugs for static generation
 */
export function getAllFocusSlugs(): string[] {
  return getFocusByPopularity().map((f) => f.slug)
}

/**
 * Get related focus areas (areas that share fellowships with a given focus)
 */
export function getRelatedFocusAreas(focusSlug: string, limit: number = 5): FellowshipFocusArea[] {
  const focus = getFocusBySlug(focusSlug)
  if (!focus) return []

  const focusFellowshipSlugs = new Set(focus.fellowships.map((f) => f.slug))
  const allFocusAreas = getFocusByPopularity()

  const relatedWithScores = allFocusAreas
    .filter((f) => f.slug !== focusSlug)
    .map((f) => {
      const sharedFellowships = f.fellowships.filter((fe) => focusFellowshipSlugs.has(fe.slug)).length
      return { focus: f, score: sharedFellowships }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return relatedWithScores.map((r) => r.focus)
}
