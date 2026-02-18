#!/usr/bin/env npx tsx
/**
 * Add VC Script
 *
 * Interactive CLI to scaffold a new VC with all required files.
 *
 * Run with: npm run add-vc
 */

import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

const ROOT_DIR = path.resolve(__dirname, '..')

// Simple prompt helper
function createPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return {
    ask: (question: string): Promise<string> => {
      return new Promise((resolve) => {
        rl.question(question, (answer) => {
          resolve(answer.trim())
        })
      })
    },
    confirm: async (question: string): Promise<boolean> => {
      const answer = await new Promise<string>((resolve) => {
        rl.question(`${question} (y/n): `, (answer) => {
          resolve(answer.trim().toLowerCase())
        })
      })
      return answer === 'y' || answer === 'yes'
    },
    close: () => rl.close(),
  }
}

// Templates
function getThesisTemplate(config: {
  slug: string
  vcName: string
  vcShortName: string
  year: number
  brandColor: string
}) {
  const exportName = config.slug
    .split('-')
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('')
    .replace(/\d+/g, (match) => match) + 'Thesis'

  return `import type { VCThesis } from './index'

export const ${exportName}: VCThesis = {
  slug: '${config.slug}',
  vcName: '${config.vcName}',
  vcShortName: '${config.vcShortName}',

  year: ${config.year},
  publishedAt: '${config.year}-01-01',

  title: '${config.vcName} Investment Thesis',
  subtitle: 'What ${config.vcName} is looking for in ${config.year}',
  brandColor: '${config.brandColor}',

  sourceUrl: 'https://example.com',
  sourceName: '${config.vcName}',

  summary: \`TODO: Add summary of ${config.vcName}'s investment thesis for ${config.year}.\`,

  sections: [
    {
      title: 'Focus Area 1',
      content: 'TODO: Describe this focus area.',
      bulletPoints: [
        'Key point 1',
        'Key point 2',
      ],
    },
  ],

  hasRFSProblems: false,
  tags: ['AI'], // TODO: Add relevant tags
}
`
}

function getProblemsTemplate(config: {
  vcName: string
  vcShortName: string
  key: string
}) {
  const interfaceName = `${config.vcShortName.replace(/\s+/g, '')}Problem`
  const arrayName = `${config.key}Problems`
  const authorName = `${config.key}Author`

  return `/**
 * ${config.vcName} Problems
 *
 * Problems/RFS from ${config.vcName}
 */

export interface ${interfaceName} {
  id: string
  title: string
  elevatorPitch: string
  fullDescription: string
  category: string
  industryTags: string[]
  publishedDate: string
  originalUrl: string
}

export const ${arrayName}: ${interfaceName}[] = [
  {
    id: '${config.key}-1',
    title: 'Example Problem',
    elevatorPitch: 'A brief description of the problem.',
    fullDescription: 'A more detailed description of the problem and why it matters.',
    category: 'AI',
    industryTags: ['AI', 'Enterprise'],
    publishedDate: '2026-01-01',
    originalUrl: 'https://example.com',
  },
]

export const ${authorName} = {
  id: '${config.key}',
  username: '${config.vcName}',
  avatarUrl: '',
  is${config.vcShortName.replace(/\s+/g, '')}: true,
}
`
}

function getRegistryEntryTemplate(config: {
  key: string
  slug: string
  vcName: string
  vcShortName: string
  brandColor: string
  hasRFSProblems: boolean
  thesisFile?: string
  problemsFile?: string
}) {
  const colorName = config.brandColor.toLowerCase().includes('f26')
    ? 'orange'
    : config.brandColor.toLowerCase().includes('636')
    ? 'indigo'
    : config.brandColor.toLowerCase().includes('8b5')
    ? 'violet'
    : config.brandColor.toLowerCase().includes('10b')
    ? 'emerald'
    : 'slate'

  return `  {
    key: '${config.key}',
    slug: '${config.slug}',
    vcName: '${config.vcName}',
    vcShortName: '${config.vcShortName}',
    brandColor: '${config.brandColor}',
    ${config.thesisFile ? `thesisFile: '${config.thesisFile}',` : ''}
    ${config.problemsFile ? `problemsFile: '${config.problemsFile}',` : ''}
    hasThesis: ${!!config.thesisFile},
    hasRFSProblems: ${config.hasRFSProblems},
    badge: {
      label: '${config.vcShortName}',
      bgColor: 'bg-${colorName}-500/10',
      textColor: 'text-${colorName}-600',
      darkTextColor: 'dark:text-${colorName}-400',
      borderColor: 'border-${colorName}-500/20',
    },
    authorFlagName: 'is${config.vcShortName.replace(/\s+/g, '')}',
    problemFlagName: 'is${config.vcShortName.replace(/\s+/g, '')}',
  },`
}

async function main() {
  const prompt = createPrompt()

  console.log('\n🚀 Add New VC Partner\n')
  console.log('This wizard will create all required files for a new VC.\n')

  try {
    // Gather information
    const vcName = await prompt.ask('VC Name (e.g., "Benchmark Capital"): ')
    if (!vcName) {
      console.log('❌ VC name is required')
      process.exit(1)
    }

    const vcShortName = await prompt.ask(`Short Name (e.g., "Benchmark") [${vcName}]: `) || vcName

    const suggestedSlug = vcName.toLowerCase().replace(/\s+/g, '-') + '-2026'
    const slug = await prompt.ask(`Slug (e.g., "benchmark-2026") [${suggestedSlug}]: `) || suggestedSlug

    const suggestedKey = vcShortName.toLowerCase().replace(/\s+/g, '')
    const key = await prompt.ask(`Registry Key (e.g., "benchmark") [${suggestedKey}]: `) || suggestedKey

    const brandColor = await prompt.ask('Brand Color (hex, e.g., "#000000"): ') || '#64748B'

    const yearStr = await prompt.ask('Year [2026]: ') || '2026'
    const year = parseInt(yearStr, 10)

    const hasRFSProblems = await prompt.confirm('Does this VC publish RFS problems?')

    // Summary
    console.log('\n📋 Configuration Summary:\n')
    console.log(`  Name:          ${vcName}`)
    console.log(`  Short Name:    ${vcShortName}`)
    console.log(`  Slug:          ${slug}`)
    console.log(`  Registry Key:  ${key}`)
    console.log(`  Brand Color:   ${brandColor}`)
    console.log(`  Year:          ${year}`)
    console.log(`  Has RFS:       ${hasRFSProblems}`)
    console.log()

    const confirm = await prompt.confirm('Create files with this configuration?')
    if (!confirm) {
      console.log('❌ Cancelled')
      process.exit(0)
    }

    // Create files
    console.log('\n📁 Creating files...\n')

    // 1. Create thesis file
    const thesisFileName = `${slug}.ts`
    const thesisPath = path.join(ROOT_DIR, 'data/vc-theses', thesisFileName)

    if (fs.existsSync(thesisPath)) {
      console.log(`⚠️  Thesis file already exists: ${thesisFileName}`)
    } else {
      const thesisContent = getThesisTemplate({
        slug,
        vcName,
        vcShortName,
        year,
        brandColor,
      })
      fs.writeFileSync(thesisPath, thesisContent)
      console.log(`✓ Created data/vc-theses/${thesisFileName}`)
    }

    // 2. Create problems file (if has RFS)
    let problemsFile: string | undefined
    if (hasRFSProblems) {
      const problemsFileName = `${key}-problems.ts`
      const problemsPath = path.join(ROOT_DIR, 'data', problemsFileName)
      problemsFile = `data/${problemsFileName}`

      if (fs.existsSync(problemsPath)) {
        console.log(`⚠️  Problems file already exists: ${problemsFileName}`)
      } else {
        const problemsContent = getProblemsTemplate({
          vcName,
          vcShortName,
          key,
        })
        fs.writeFileSync(problemsPath, problemsContent)
        console.log(`✓ Created data/${problemsFileName}`)
      }
    }

    // 3. Show manual steps
    console.log('\n📝 Manual Steps Required:\n')

    console.log('1. Update data/vc-theses/index.ts:')
    console.log(`   - Add import: import { ${slug.split('-').map((p, i) => i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1)).join('')}Thesis } from './${slug}'`)
    console.log(`   - Add to allVCTheses array`)
    console.log()

    if (hasRFSProblems) {
      console.log('2. Update data/mock-problems.ts:')
      console.log(`   - Import ${key}Problems and ${key}Author`)
      console.log(`   - Add transformation mapping`)
      console.log()

      console.log('3. Update lib/vc-registry.ts:')
      console.log(`   - Add '${key}' to VC_PARTNER_KEYS`)
      console.log(`   - Add registry entry:`)
      console.log(getRegistryEntryTemplate({
        key,
        slug,
        vcName,
        vcShortName,
        brandColor,
        hasRFSProblems,
        thesisFile: `data/vc-theses/${thesisFileName}`,
        problemsFile,
      }))
      console.log()
    }

    console.log('4. Fill in the TODO sections in the generated files')
    console.log()
    console.log('5. Run validation: npm run validate:vc')
    console.log()

    console.log('✅ Done! Files created successfully.\n')
  } finally {
    prompt.close()
  }
}

main()
