/**
 * Funding Themes - Theme Aggregation & Cross-VC Analysis
 *
 * This module provides utilities for analyzing investment themes across
 * all VC theses, enabling the interactive Funding Landscape visualization.
 */

import { allVCTheses, type VCThesis } from '@/data/vc-theses'

// Theme color mapping for visualization
const THEME_COLORS: Record<string, { color: string; colorClass: string }> = {
  // Primary themes (high consensus)
  'AI': { color: '#8B5CF6', colorClass: 'violet' },
  'Healthcare': { color: '#10B981', colorClass: 'emerald' },
  'Defense': { color: '#6366F1', colorClass: 'indigo' },
  'Fintech': { color: '#F59E0B', colorClass: 'amber' },
  'Enterprise': { color: '#3B82F6', colorClass: 'blue' },
  'Crypto': { color: '#EC4899', colorClass: 'pink' },
  'Infrastructure': { color: '#14B8A6', colorClass: 'teal' },
  'Biotech': { color: '#22C55E', colorClass: 'green' },
  'Deep Tech': { color: '#8B5CF6', colorClass: 'purple' },
  'Climate': { color: '#84CC16', colorClass: 'lime' },
  'Consumer': { color: '#F97316', colorClass: 'orange' },
  'Robotics': { color: '#64748B', colorClass: 'slate' },
  'Space': { color: '#0EA5E9', colorClass: 'sky' },
  'Science': { color: '#A855F7', colorClass: 'purple' },
  'Government': { color: '#6366F1', colorClass: 'indigo' },
  'Manufacturing': { color: '#78716C', colorClass: 'stone' },

  // Secondary themes (emerging/niche)
  'B2B': { color: '#3B82F6', colorClass: 'blue' },
  'SMB': { color: '#06B6D4', colorClass: 'cyan' },
  'Security': { color: '#EF4444', colorClass: 'red' },
  'Cybersecurity': { color: '#DC2626', colorClass: 'red' },
  'Commerce': { color: '#F97316', colorClass: 'orange' },
  'Voice': { color: '#8B5CF6', colorClass: 'violet' },
  'Scientific Discovery': { color: '#A855F7', colorClass: 'purple' },
  'Autonomy': { color: '#64748B', colorClass: 'slate' },
  'Energy': { color: '#FBBF24', colorClass: 'yellow' },
}

const DEFAULT_COLOR = { color: '#6B7280', colorClass: 'gray' }

export interface FundingTheme {
  slug: string
  name: string
  vcCount: number
  totalVCs: number
  consensusPercentage: number
  vcs: {
    slug: string
    vcName: string
    vcShortName: string
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

export interface ThemeStats {
  totalThemes: number
  totalVCs: number
  mostPopularTheme: string
  mostPopularCount: number
  averageThemesPerVC: number
}

/**
 * Slugify a theme name for URL use
 */
export function slugifyTheme(name: string): string {
  return name
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Get all tags with their VC counts
 */
export function getTagsWithCounts(): { tag: string; count: number; vcs: string[] }[] {
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
      vcs: Array.from(vcSlugs),
    }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Get VCs that cover a specific tag
 */
export function getVCsByTag(tag: string): VCThesis[] {
  return allVCTheses.filter((thesis) =>
    thesis.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get theme consensus - map of themes to VCs
 */
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

/**
 * Get all funding themes sorted by popularity (VC count)
 */
export function getThemesByPopularity(): FundingTheme[] {
  const tagsWithCounts = getTagsWithCounts()
  const totalVCs = allVCTheses.length

  return tagsWithCounts.map(({ tag, count, vcs }) => {
    const themeColors = THEME_COLORS[tag] || DEFAULT_COLOR
    const vcDetails = vcs
      .map((slug) => {
        const thesis = allVCTheses.find((t) => t.slug === slug)
        if (!thesis) return null
        return {
          slug: thesis.slug,
          vcName: thesis.vcName,
          vcShortName: thesis.vcShortName,
          brandColor: thesis.brandColor,
          year: thesis.year,
        }
      })
      .filter(Boolean) as FundingTheme['vcs']

    return {
      slug: slugifyTheme(tag),
      name: tag,
      vcCount: count,
      totalVCs,
      consensusPercentage: Math.round((count / totalVCs) * 100),
      vcs: vcDetails,
      color: themeColors.color,
      colorClass: themeColors.colorClass,
      seo: {
        title: `${tag} Investment Opportunities | Funding Landscape | OpenQuest`,
        description: `${count} of ${totalVCs} top VCs are investing in ${tag}. See which VCs are funding ${tag} startups and explore related problems.`,
      },
    }
  })
}

/**
 * Get a single theme by slug
 */
export function getThemeBySlug(slug: string): FundingTheme | undefined {
  const themes = getThemesByPopularity()
  return themes.find((t) => t.slug === slug)
}

/**
 * Get VCs for a specific theme
 */
export function getVCsForTheme(themeSlug: string): VCThesis[] {
  const theme = getThemeBySlug(themeSlug)
  if (!theme) return []

  return theme.vcs
    .map((vc) => allVCTheses.find((t) => t.slug === vc.slug))
    .filter(Boolean) as VCThesis[]
}

/**
 * Get overall theme statistics
 */
export function getThemeStats(): ThemeStats {
  const tagsWithCounts = getTagsWithCounts()
  const totalVCs = allVCTheses.length
  const totalThemeMentions = tagsWithCounts.reduce((sum, t) => sum + t.count, 0)

  const mostPopular = tagsWithCounts[0] || { tag: '', count: 0 }

  return {
    totalThemes: tagsWithCounts.length,
    totalVCs,
    mostPopularTheme: mostPopular.tag,
    mostPopularCount: mostPopular.count,
    averageThemesPerVC: Math.round(totalThemeMentions / totalVCs),
  }
}

/**
 * Get top N themes
 */
export function getTopThemes(n: number = 10): FundingTheme[] {
  return getThemesByPopularity().slice(0, n)
}

/**
 * Get themes that have consensus (more than X% of VCs)
 */
export function getConsensusThemes(minPercentage: number = 30): FundingTheme[] {
  return getThemesByPopularity().filter(
    (theme) => theme.consensusPercentage >= minPercentage
  )
}

/**
 * Get all unique theme slugs for static generation
 */
export function getAllThemeSlugs(): string[] {
  return getThemesByPopularity().map((t) => t.slug)
}

/**
 * Get related themes (themes that share VCs with a given theme)
 */
export function getRelatedThemes(themeSlug: string, limit: number = 5): FundingTheme[] {
  const theme = getThemeBySlug(themeSlug)
  if (!theme) return []

  const themeVCSlugs = new Set(theme.vcs.map((v) => v.slug))
  const allThemes = getThemesByPopularity()

  // Find themes that share VCs with this theme
  const relatedWithScores = allThemes
    .filter((t) => t.slug !== themeSlug)
    .map((t) => {
      const sharedVCs = t.vcs.filter((v) => themeVCSlugs.has(v.slug)).length
      return { theme: t, score: sharedVCs }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return relatedWithScores.map((r) => r.theme)
}
