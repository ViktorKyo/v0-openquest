import { allResidencies, type Residency, type ResidencyCategory } from '@/data/residencies'

const FOCUS_COLORS: Record<string, { color: string; colorClass: string }> = {
  AI: { color: '#8B5CF6', colorClass: 'violet' },
  Enterprise: { color: '#3B82F6', colorClass: 'blue' },
  Fintech: { color: '#F59E0B', colorClass: 'amber' },
  'Developer Tools': { color: '#06B6D4', colorClass: 'cyan' },
  Consumer: { color: '#F97316', colorClass: 'orange' },
  'Deep Tech': { color: '#A855F7', colorClass: 'purple' },
  'Co-founder Matching': { color: '#EC4899', colorClass: 'pink' },
  Biotech: { color: '#10B981', colorClass: 'emerald' },
  Climate: { color: '#84CC16', colorClass: 'lime' },
}

const DEFAULT_COLOR = { color: '#6B7280', colorClass: 'gray' }

export const RESIDENCY_CATEGORY_META: Record<
  ResidencyCategory,
  { name: string; color: string; description: string }
> = {
  'vc-backed': {
    name: 'VC-Backed',
    color: '#3B82F6',
    description: 'Residency programs run or funded by venture capital firms',
  },
  community: {
    name: 'Community',
    color: '#8B5CF6',
    description: 'Community-driven programs with cohort-based models and founder networks',
  },
  corporate: {
    name: 'Corporate',
    color: '#10B981',
    description: 'Corporate-backed residency and founder programs',
  },
}

export interface ResidencyFocusArea {
  slug: string
  name: string
  residencyCount: number
  totalResidencies: number
  consensusPercentage: number
  residencies: {
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

export interface ResidencyStats {
  totalResidencies: number
  totalFocusAreas: number
  mostPopularFocus: string
  mostPopularCount: number
  openNowCount: number
  rollingCount: number
  closedCount: number
}

export function slugifyResidencyFocus(name: string): string {
  return name
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getResidencyFocusTagsWithCounts(): {
  tag: string
  count: number
  residencies: string[]
}[] {
  const tagMap = new Map<string, Set<string>>()

  for (const residency of allResidencies) {
    for (const tag of residency.tags) {
      if (!tagMap.has(tag)) tagMap.set(tag, new Set())
      tagMap.get(tag)!.add(residency.slug)
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, slugs]) => ({ tag, count: slugs.size, residencies: Array.from(slugs) }))
    .sort((a, b) => b.count - a.count)
}

export function getResidenciesByFocusTag(tag: string): Residency[] {
  return allResidencies.filter((r) => r.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}

export function getResidencyFocusByPopularity(): ResidencyFocusArea[] {
  const tagsWithCounts = getResidencyFocusTagsWithCounts()
  const totalResidencies = allResidencies.length

  return tagsWithCounts.map(({ tag, count, residencies }) => {
    const focusColor = FOCUS_COLORS[tag] || DEFAULT_COLOR
    const residencyDetails = residencies
      .map((slug) => {
        const residency = allResidencies.find((r) => r.slug === slug)
        if (!residency) return null
        return {
          slug: residency.slug,
          name: residency.name,
          shortName: residency.shortName,
          brandColor: residency.brandColor,
          year: residency.year,
        }
      })
      .filter(Boolean) as ResidencyFocusArea['residencies']

    return {
      slug: slugifyResidencyFocus(tag),
      name: tag,
      residencyCount: count,
      totalResidencies,
      consensusPercentage: Math.round((count / totalResidencies) * 100),
      residencies: residencyDetails,
      color: focusColor.color,
      colorClass: focusColor.colorClass,
      seo: {
        title: `${tag} Residencies | Founder Residency Guide | OpenQuest`,
        description: `${count} of ${totalResidencies} top founder residencies focus on ${tag}. Compare leading residency programs in this area.`,
      },
    }
  })
}

export function getResidencyFocusBySlug(slug: string): ResidencyFocusArea | undefined {
  const focusAreas = getResidencyFocusByPopularity()
  return focusAreas.find((f) => f.slug === slug)
}

export function getResidenciesForFocus(focusSlug: string): Residency[] {
  const focus = getResidencyFocusBySlug(focusSlug)
  if (!focus) return []

  return focus.residencies
    .map((r) => allResidencies.find((res) => res.slug === r.slug))
    .filter(Boolean) as Residency[]
}

export function getResidencyFocusStats(): ResidencyStats {
  const tagsWithCounts = getResidencyFocusTagsWithCounts()
  const mostPopular = tagsWithCounts[0] || { tag: '', count: 0 }

  let openNowCount = 0
  let rollingCount = 0
  let closedCount = 0

  for (const residency of allResidencies) {
    if (residency.applicationStatus === 'open') openNowCount += 1
    else if (residency.applicationStatus === 'rolling') rollingCount += 1
    else if (residency.applicationStatus === 'closed') closedCount += 1
  }

  return {
    totalResidencies: allResidencies.length,
    totalFocusAreas: tagsWithCounts.length,
    mostPopularFocus: mostPopular.tag,
    mostPopularCount: mostPopular.count,
    openNowCount,
    rollingCount,
    closedCount,
  }
}

export function getAllResidencyFocusSlugs(): string[] {
  return getResidencyFocusByPopularity().map((f) => f.slug)
}

export function getRelatedResidencyFocusAreas(
  focusSlug: string,
  limit: number = 5
): ResidencyFocusArea[] {
  const focus = getResidencyFocusBySlug(focusSlug)
  if (!focus) return []

  const focusResidencySlugs = new Set(focus.residencies.map((r) => r.slug))
  const allFocusAreas = getResidencyFocusByPopularity()

  const relatedWithScores = allFocusAreas
    .filter((f) => f.slug !== focusSlug)
    .map((f) => {
      const shared = f.residencies.filter((r) => focusResidencySlugs.has(r.slug)).length
      return { focus: f, score: shared }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return relatedWithScores.map((r) => r.focus)
}
