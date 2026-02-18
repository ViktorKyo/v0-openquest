export interface AcceleratorSection {
  title: string
  content: string
  bulletPoints?: string[]
}

export type AcceleratorCategory = 'generalist' | 'deep-tech' | 'industry-specialized'

export interface Accelerator {
  slug: string
  name: string
  shortName: string
  organization: string

  fundingModel: string
  typicalCheckSize?: string
  equityTerms?: string
  duration: string
  cohortCadence: string
  applicationCycle: string
  deadline?: string

  hqRegion: string
  geographicScope: 'global' | 'us' | 'canada' | 'uk' | 'eu' | 'multi-west'

  brandColor: string
  websiteUrl: string

  description: string
  summary: string
  sections: AcceleratorSection[]

  category: AcceleratorCategory
  tags: string[]
  focusAreas: string[]

  applicationStatus?: 'open' | 'closed' | 'rolling' | 'unknown'
  lastVerifiedAt?: string
  sourceLinks?: Array<{ label: string; url: string }>

  year: number
  notableAlumni?: string[]
}

import { westTopTierAccelerators } from './west-top-tier'

export const allAccelerators: Accelerator[] = [...westTopTierAccelerators]

export function getAcceleratorBySlug(slug: string): Accelerator | undefined {
  return allAccelerators.find((a) => a.slug === slug)
}

export function getAcceleratorsByTag(tag: string): Accelerator[] {
  return allAccelerators.filter((a) =>
    a.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAcceleratorsByCategory(category: AcceleratorCategory): Accelerator[] {
  return allAccelerators.filter((a) => a.category === category)
}

export function getAllAcceleratorTags(): string[] {
  const tags = new Set<string>()
  for (const accelerator of allAccelerators) {
    for (const tag of accelerator.tags) tags.add(tag)
  }
  return Array.from(tags).sort()
}
