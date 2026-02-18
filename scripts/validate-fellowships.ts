import { allFellowships } from '../data/fellowships'
import { getFocusByPopularity, getFocusStats, getAllFocusSlugs } from '../lib/fellowship-themes'

console.log('=== Fellowship Data Validation ===\n')

// 1. Total count
console.log('Total fellowships:', allFellowships.length)

// 2. Check for duplicate slugs
const slugs = allFellowships.map(f => f.slug)
const seen = new Set<string>()
const dupes: string[] = []
for (const s of slugs) {
  if (seen.has(s)) dupes.push(s)
  seen.add(s)
}
if (dupes.length) {
  console.log('DUPLICATE SLUGS:', dupes)
} else {
  console.log('No duplicate slugs')
}

// 3. Check required fields
const issues: string[] = []
for (const f of allFellowships) {
  if (!f.slug) issues.push('Missing slug: ' + f.name)
  if (!f.name) issues.push('Missing name: ' + f.slug)
  if (!f.brandColor) issues.push('Missing brandColor: ' + f.slug)
  if (!f.sections || f.sections.length === 0) issues.push('Missing sections: ' + f.slug)
  if (!f.tags || f.tags.length === 0) issues.push('Missing tags: ' + f.slug)
  for (const s of (f.sections || [])) {
    if (typeof s.content !== 'string') issues.push(`Section missing content in ${f.slug}: ${s.title}`)
  }
}
if (issues.length) {
  console.log('\nISSUES FOUND:')
  issues.forEach(i => console.log('  -', i))
} else {
  console.log('All required fields present')
}

// 4. Count by category
const cats: Record<string, number> = {}
for (const f of allFellowships) {
  cats[f.category] = (cats[f.category] || 0) + 1
}
console.log('\nBy category:', cats)

// 5. Focus area stats
const focusAreas = getFocusByPopularity()
const stats = getFocusStats()
console.log('\nFocus areas:', focusAreas.length)
console.log('Stats:', stats)
console.log('Focus slugs count:', getAllFocusSlugs().length)

// 6. Top 5 focus areas
console.log('\nTop 5 focus areas:')
focusAreas.slice(0, 5).forEach(f => {
  console.log(`  ${f.name}: ${f.fellowshipCount}/${f.totalFellowships} (${f.consensusPercentage}%)`)
})

console.log('\n=== Validation complete ===')
