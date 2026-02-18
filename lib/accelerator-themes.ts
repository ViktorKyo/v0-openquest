import { allAccelerators, type Accelerator, type AcceleratorCategory } from '@/data/accelerators'

const FOCUS_COLORS: Record<string, { color: string; colorClass: string }> = {
  AI: { color: '#8B5CF6', colorClass: 'violet' },
  Enterprise: { color: '#3B82F6', colorClass: 'blue' },
  Fintech: { color: '#F59E0B', colorClass: 'amber' },
  'Developer Tools': { color: '#06B6D4', colorClass: 'cyan' },
  Consumer: { color: '#F97316', colorClass: 'orange' },
  Climate: { color: '#84CC16', colorClass: 'lime' },
  Biotech: { color: '#10B981', colorClass: 'emerald' },
  'Deep Tech': { color: '#A855F7', colorClass: 'purple' },
  Cybersecurity: { color: '#EF4444', colorClass: 'red' },
  Manufacturing: { color: '#78716C', colorClass: 'stone' },
  Science: { color: '#6366F1', colorClass: 'indigo' },
}

const DEFAULT_COLOR = { color: '#6B7280', colorClass: 'gray' }

export const ACCELERATOR_CATEGORY_META: Record<
  AcceleratorCategory,
  { name: string; color: string; description: string }
> = {
  generalist: {
    name: 'Generalist',
    color: '#3B82F6',
    description: 'Broad early-stage accelerators across software and internet markets',
  },
  'deep-tech': {
    name: 'Deep Tech',
    color: '#8B5CF6',
    description: 'Science, hardtech, and technical frontier accelerator programs',
  },
  'industry-specialized': {
    name: 'Industry Specialized',
    color: '#10B981',
    description: 'Accelerators with sector-specific program infrastructure and networks',
  },
}

export interface AcceleratorFocusArea {
  slug: string
  name: string
  acceleratorCount: number
  totalAccelerators: number
  consensusPercentage: number
  accelerators: {
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

export interface AcceleratorStats {
  totalAccelerators: number
  totalFocusAreas: number
  mostPopularFocus: string
  mostPopularCount: number
  openNowCount: number
  rollingCount: number
  closedCount: number
}

export function slugifyAcceleratorFocus(name: string): string {
  return name
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getAcceleratorFocusTagsWithCounts(): {
  tag: string
  count: number
  accelerators: string[]
}[] {
  const tagMap = new Map<string, Set<string>>()

  for (const accelerator of allAccelerators) {
    for (const tag of accelerator.tags) {
      if (!tagMap.has(tag)) tagMap.set(tag, new Set())
      tagMap.get(tag)!.add(accelerator.slug)
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, slugs]) => ({ tag, count: slugs.size, accelerators: Array.from(slugs) }))
    .sort((a, b) => b.count - a.count)
}

export function getAcceleratorsByFocusTag(tag: string): Accelerator[] {
  return allAccelerators.filter((a) => a.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
}

export function getAcceleratorFocusByPopularity(): AcceleratorFocusArea[] {
  const tagsWithCounts = getAcceleratorFocusTagsWithCounts()
  const totalAccelerators = allAccelerators.length

  return tagsWithCounts.map(({ tag, count, accelerators }) => {
    const focusColor = FOCUS_COLORS[tag] || DEFAULT_COLOR
    const acceleratorDetails = accelerators
      .map((slug) => {
        const accelerator = allAccelerators.find((a) => a.slug === slug)
        if (!accelerator) return null
        return {
          slug: accelerator.slug,
          name: accelerator.name,
          shortName: accelerator.shortName,
          brandColor: accelerator.brandColor,
          year: accelerator.year,
        }
      })
      .filter(Boolean) as AcceleratorFocusArea['accelerators']

    return {
      slug: slugifyAcceleratorFocus(tag),
      name: tag,
      acceleratorCount: count,
      totalAccelerators,
      consensusPercentage: Math.round((count / totalAccelerators) * 100),
      accelerators: acceleratorDetails,
      color: focusColor.color,
      colorClass: focusColor.colorClass,
      seo: {
        title: `${tag} Accelerators | Top-Tier Accelerator Guide | OpenQuest`,
        description: `${count} of ${totalAccelerators} top Western accelerators focus on ${tag}. Compare leading accelerator programs in this area.`,
      },
    }
  })
}

export function getAcceleratorFocusBySlug(slug: string): AcceleratorFocusArea | undefined {
  const focusAreas = getAcceleratorFocusByPopularity()
  return focusAreas.find((f) => f.slug === slug)
}

export function getAcceleratorsForFocus(focusSlug: string): Accelerator[] {
  const focus = getAcceleratorFocusBySlug(focusSlug)
  if (!focus) return []

  return focus.accelerators
    .map((a) => allAccelerators.find((accel) => accel.slug === a.slug))
    .filter(Boolean) as Accelerator[]
}

export function getAcceleratorFocusStats(): AcceleratorStats {
  const tagsWithCounts = getAcceleratorFocusTagsWithCounts()
  const mostPopular = tagsWithCounts[0] || { tag: '', count: 0 }

  let openNowCount = 0
  let rollingCount = 0
  let closedCount = 0

  for (const accelerator of allAccelerators) {
    if (accelerator.applicationStatus === 'open') openNowCount += 1
    else if (accelerator.applicationStatus === 'rolling') rollingCount += 1
    else if (accelerator.applicationStatus === 'closed') closedCount += 1
  }

  return {
    totalAccelerators: allAccelerators.length,
    totalFocusAreas: tagsWithCounts.length,
    mostPopularFocus: mostPopular.tag,
    mostPopularCount: mostPopular.count,
    openNowCount,
    rollingCount,
    closedCount,
  }
}

export function getAllAcceleratorFocusSlugs(): string[] {
  return getAcceleratorFocusByPopularity().map((f) => f.slug)
}

export function getRelatedAcceleratorFocusAreas(
  focusSlug: string,
  limit: number = 5
): AcceleratorFocusArea[] {
  const focus = getAcceleratorFocusBySlug(focusSlug)
  if (!focus) return []

  const focusAcceleratorSlugs = new Set(focus.accelerators.map((a) => a.slug))
  const allFocusAreas = getAcceleratorFocusByPopularity()

  const relatedWithScores = allFocusAreas
    .filter((f) => f.slug !== focusSlug)
    .map((f) => {
      const shared = f.accelerators.filter((a) => focusAcceleratorSlugs.has(a.slug)).length
      return { focus: f, score: shared }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)

  return relatedWithScores.map((r) => r.focus)
}
