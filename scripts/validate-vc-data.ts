#!/usr/bin/env npx tsx
/**
 * VC Data Validation Script
 *
 * Validates that all VC data is consistent across the codebase:
 * - All VCs in registry have their required files
 * - All problem files are imported in mock-problems.ts
 * - All theme tags have color mappings
 *
 * Run with: npm run validate:vc
 */

import * as fs from 'fs'
import * as path from 'path'

const ROOT_DIR = path.resolve(__dirname, '..')

interface ValidationResult {
  passed: boolean
  errors: string[]
  warnings: string[]
}

const result: ValidationResult = {
  passed: true,
  errors: [],
  warnings: [],
}

function error(msg: string) {
  result.errors.push(msg)
  result.passed = false
}

function warn(msg: string) {
  result.warnings.push(msg)
}

function success(msg: string) {
  console.log(`✓ ${msg}`)
}

// === Validation Checks ===

async function validateRegistryFiles() {
  console.log('\n📁 Checking registry file references...\n')

  // Import the registry
  const { vcRegistry } = await import('../lib/vc-registry')

  for (const vc of vcRegistry) {
    // Check thesis file exists (if declared)
    if (vc.thesisFile) {
      const thesisPath = path.join(ROOT_DIR, vc.thesisFile)
      if (!fs.existsSync(thesisPath)) {
        error(`${vc.vcName}: Thesis file not found: ${vc.thesisFile}`)
      } else {
        success(`${vc.vcName}: Thesis file exists`)
      }
    }

    // Check problems file exists (if hasRFSProblems)
    if (vc.hasRFSProblems) {
      if (!vc.problemsFile) {
        error(`${vc.vcName}: hasRFSProblems=true but no problemsFile defined`)
      } else {
        const problemsPath = path.join(ROOT_DIR, vc.problemsFile)
        if (!fs.existsSync(problemsPath)) {
          error(`${vc.vcName}: Problems file not found: ${vc.problemsFile}`)
        } else {
          success(`${vc.vcName}: Problems file exists`)
        }
      }
    }
  }
}

async function validateMockProblemsImports() {
  console.log('\n📦 Checking mock-problems.ts imports...\n')

  const mockProblemsPath = path.join(ROOT_DIR, 'data/mock-problems.ts')
  if (!fs.existsSync(mockProblemsPath)) {
    error('mock-problems.ts not found')
    return
  }

  const mockProblemsContent = fs.readFileSync(mockProblemsPath, 'utf-8')

  const { vcRegistry } = await import('../lib/vc-registry')

  for (const vc of vcRegistry) {
    if (vc.hasRFSProblems && vc.problemsFile) {
      // Extract filename without extension
      const fileName = path.basename(vc.problemsFile, '.ts')

      // Check if it's imported in mock-problems.ts
      const importPattern = new RegExp(`from\\s+['"]\\./${fileName}['"]`)
      if (!importPattern.test(mockProblemsContent)) {
        error(`${vc.vcName}: Problems file not imported in mock-problems.ts`)
      } else {
        success(`${vc.vcName}: Problems imported in mock-problems.ts`)
      }
    }
  }
}

async function validateThemeColors() {
  console.log('\n🎨 Checking theme color mappings...\n')

  const fundingThemesPath = path.join(ROOT_DIR, 'lib/funding-themes.ts')
  if (!fs.existsSync(fundingThemesPath)) {
    warn('funding-themes.ts not found - skipping theme color check')
    return
  }

  const fundingThemesContent = fs.readFileSync(fundingThemesPath, 'utf-8')

  // Get all tags from VC theses
  const { allVCTheses } = await import('../data/vc-theses')

  const allTags = new Set<string>()
  for (const thesis of allVCTheses) {
    for (const tag of thesis.tags) {
      allTags.add(tag.toLowerCase())
    }
  }

  // Check each tag has a color mapping
  let missingColors = 0
  for (const tag of allTags) {
    // Look for the tag in THEME_COLORS constant
    const colorPattern = new RegExp(`['"]${tag}['"]\\s*:`, 'i')
    if (!colorPattern.test(fundingThemesContent)) {
      warn(`Theme "${tag}" has no color mapping in funding-themes.ts`)
      missingColors++
    }
  }

  if (missingColors === 0) {
    success(`All ${allTags.size} theme tags have color mappings`)
  }
}

async function validateThesisExports() {
  console.log('\n📤 Checking thesis exports...\n')

  const indexPath = path.join(ROOT_DIR, 'data/vc-theses/index.ts')
  if (!fs.existsSync(indexPath)) {
    error('data/vc-theses/index.ts not found')
    return
  }

  const indexContent = fs.readFileSync(indexPath, 'utf-8')

  // Check all thesis files in the directory are exported
  const thesesDir = path.join(ROOT_DIR, 'data/vc-theses')
  const thesisFiles = fs.readdirSync(thesesDir).filter(
    (f) => f.endsWith('.ts') && f !== 'index.ts'
  )

  for (const file of thesisFiles) {
    const fileName = path.basename(file, '.ts')
    const importPattern = new RegExp(`from\\s+['"]\\./${fileName}['"]`)

    if (!importPattern.test(indexContent)) {
      error(`Thesis file ${file} not imported in index.ts`)
    }
  }

  // Check allVCTheses array contains all imports
  const { allVCTheses } = await import('../data/vc-theses')
  success(`${allVCTheses.length} VC theses exported from index.ts`)
}

async function validateBadgeUsage() {
  console.log('\n🏷️ Checking badge component usage...\n')

  // Check that the generic VCBadge component exists
  const vcBadgePath = path.join(ROOT_DIR, 'components/vc-badge.tsx')
  if (!fs.existsSync(vcBadgePath)) {
    warn('Generic vc-badge.tsx not found - using individual badge components')
    return
  }

  success('Generic VCBadge component exists')

  // Check legacy badge files (informational)
  const legacyBadges = [
    'yc-badge.tsx',
    'conviction-badge.tsx',
    'ark-invest-badge.tsx',
    'pathlight-badge.tsx',
    'weekend-fund-badge.tsx',
  ]

  const existingLegacy = legacyBadges.filter((badge) =>
    fs.existsSync(path.join(ROOT_DIR, 'components', badge))
  )

  if (existingLegacy.length > 0) {
    warn(
      `${existingLegacy.length} legacy badge files exist - consider migrating to VCBadge`
    )
  }
}

// === Main ===

async function main() {
  console.log('🔍 Validating VC Data Consistency\n')
  console.log('='.repeat(50))

  try {
    await validateRegistryFiles()
    await validateMockProblemsImports()
    await validateThemeColors()
    await validateThesisExports()
    await validateBadgeUsage()
  } catch (err) {
    error(`Validation error: ${err}`)
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('\n📊 Validation Summary\n')

  if (result.warnings.length > 0) {
    console.log('⚠️  Warnings:')
    for (const w of result.warnings) {
      console.log(`   - ${w}`)
    }
    console.log()
  }

  if (result.errors.length > 0) {
    console.log('❌ Errors:')
    for (const e of result.errors) {
      console.log(`   - ${e}`)
    }
    console.log()
  }

  if (result.passed) {
    console.log('✅ All validations passed!\n')
    process.exit(0)
  } else {
    console.log(`❌ Validation failed with ${result.errors.length} error(s)\n`)
    process.exit(1)
  }
}

main()
