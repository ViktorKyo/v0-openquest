#!/usr/bin/env npx tsx

import { allAccelerators } from '../data/accelerators'
import { getAcceleratorFocusByPopularity } from '../lib/accelerator-themes'

const MIN_REQUIRED_ACCELERATOR_COUNT = 16

function fail(message: string): never {
  console.error(`ERROR: ${message}`)
  process.exit(1)
}

function warn(message: string) {
  console.warn(`WARN: ${message}`)
}

function validateDuplicateSlugs() {
  const seen = new Set<string>()
  const duplicates: string[] = []

  for (const accelerator of allAccelerators) {
    if (seen.has(accelerator.slug)) duplicates.push(accelerator.slug)
    seen.add(accelerator.slug)
  }

  if (duplicates.length > 0) {
    fail(`Duplicate slugs found: ${duplicates.join(', ')}`)
  }
}

function validateRequiredFields() {
  const issues: string[] = []

  for (const accelerator of allAccelerators) {
    if (!accelerator.slug) issues.push(`Missing slug for ${accelerator.name}`)
    if (!accelerator.name) issues.push(`Missing name for ${accelerator.slug}`)
    if (!accelerator.shortName) issues.push(`Missing shortName for ${accelerator.slug}`)
    if (!accelerator.organization) issues.push(`Missing organization for ${accelerator.slug}`)
    if (!accelerator.brandColor) issues.push(`Missing brandColor for ${accelerator.slug}`)
    if (!accelerator.websiteUrl) issues.push(`Missing websiteUrl for ${accelerator.slug}`)
    if (!accelerator.summary) issues.push(`Missing summary for ${accelerator.slug}`)
    if (!accelerator.description) issues.push(`Missing description for ${accelerator.slug}`)
    if (!accelerator.fundingModel) issues.push(`Missing fundingModel for ${accelerator.slug}`)
    if (!accelerator.duration) issues.push(`Missing duration for ${accelerator.slug}`)
    if (!accelerator.cohortCadence) issues.push(`Missing cohortCadence for ${accelerator.slug}`)
    if (!accelerator.applicationCycle) issues.push(`Missing applicationCycle for ${accelerator.slug}`)
    if (!accelerator.category) issues.push(`Missing category for ${accelerator.slug}`)
    if (!accelerator.tags?.length) issues.push(`Missing tags for ${accelerator.slug}`)
    if (!accelerator.focusAreas?.length) issues.push(`Missing focusAreas for ${accelerator.slug}`)
    if (!accelerator.sections?.length) issues.push(`Missing sections for ${accelerator.slug}`)
    if (!accelerator.lastVerifiedAt) issues.push(`Missing lastVerifiedAt for ${accelerator.slug}`)

    if (accelerator.sections?.length) {
      for (const section of accelerator.sections) {
        if (!section.title) issues.push(`Section missing title in ${accelerator.slug}`)
        if (!section.content) issues.push(`Section missing content in ${accelerator.slug}`)
      }
    }
  }

  if (issues.length > 0) {
    fail(`Validation issues:\n- ${issues.join('\n- ')}`)
  }
}

function validateStatusValues() {
  const valid = new Set(['open', 'closed', 'rolling', 'unknown', undefined])

  for (const accelerator of allAccelerators) {
    if (!valid.has(accelerator.applicationStatus)) {
      fail(`Invalid applicationStatus '${String(accelerator.applicationStatus)}' in ${accelerator.slug}`)
    }
  }
}

function validateSourceLinks() {
  for (const accelerator of allAccelerators) {
    if (!accelerator.sourceLinks?.length) {
      warn(`No sourceLinks for ${accelerator.slug}`)
      continue
    }

    for (const source of accelerator.sourceLinks) {
      if (!source.label || !source.url) {
        fail(`Invalid sourceLinks entry in ${accelerator.slug}`)
      }
      try {
        const parsed = new URL(source.url)
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          fail(`Invalid URL protocol in ${accelerator.slug}: ${source.url}`)
        }
      } catch {
        fail(`Invalid URL in ${accelerator.slug}: ${source.url}`)
      }
    }
  }
}

function validateFocusCoverage() {
  const focusAreas = getAcceleratorFocusByPopularity()

  if (focusAreas.length === 0) {
    fail('No focus areas generated from accelerator tags')
  }

  for (const focus of focusAreas) {
    if (focus.acceleratorCount <= 0) {
      fail(`Invalid focus area count for ${focus.slug}`)
    }
    if (!focus.accelerators.length) {
      fail(`Focus area ${focus.slug} has no accelerator references`)
    }
  }
}

function validateCardinality() {
  if (allAccelerators.length < MIN_REQUIRED_ACCELERATOR_COUNT) {
    warn(
      `Expected at least ${MIN_REQUIRED_ACCELERATOR_COUNT} accelerators for this pass, found ${allAccelerators.length}`
    )
  }
}

function main() {
  console.log('=== Accelerator Data Validation ===')
  console.log(`Found ${allAccelerators.length} accelerators`)

  validateDuplicateSlugs()
  validateRequiredFields()
  validateStatusValues()
  validateSourceLinks()
  validateFocusCoverage()
  validateCardinality()

  console.log('Validation passed')
}

main()
