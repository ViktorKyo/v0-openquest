# Adding a New VC Partner

This guide explains how to add a new VC partner to OpenQuest.

## Quick Start (Recommended)

Use the interactive CLI:

```bash
npm run add-vc
```

This will prompt you for the VC details and create the necessary files.

## Manual Process

If you need more control, follow these steps:

### Step 1: Determine VC Type

**Type A: Thesis Only** (e.g., a16z, Sequoia)
- VC publishes investment themes/thesis
- No specific RFS problems to add to feed
- Only needs thesis file

**Type B: Thesis + RFS Problems** (e.g., YC, Conviction)
- VC publishes investment thesis AND specific problems
- Problems appear in the feed with VC badge
- Needs: thesis file, problems file, registry entry

### Step 2: Create Thesis File

Create `data/vc-theses/[vc-name]-[year].ts`:

```typescript
import type { VCThesis } from './index'

export const newVc2026Thesis: VCThesis = {
  slug: 'new-vc-2026',
  vcName: 'New VC',
  vcShortName: 'NVC',

  year: 2026,
  publishedAt: '2026-01-01',

  title: 'Investment Thesis',
  subtitle: 'What New VC is looking for',
  brandColor: '#000000',

  sourceUrl: 'https://example.com/thesis',
  sourceName: 'New VC',

  summary: `Summary of the investment thesis...`,

  sections: [
    {
      title: 'Focus Area',
      content: 'Description of focus area...',
      bulletPoints: ['Point 1', 'Point 2'],
    },
  ],

  hasRFSProblems: false, // Set to true if adding problems
  tags: ['AI', 'Enterprise'], // Investment themes
}
```

### Step 3: Update Thesis Index

Edit `data/vc-theses/index.ts`:

```typescript
// Add import
import { newVc2026Thesis } from './new-vc-2026'

// Add to array
export const allVCTheses: VCThesis[] = [
  // ... existing theses
  newVc2026Thesis,
]
```

### Step 4: (If has RFS) Create Problems File

Create `data/[vc-key]-problems.ts`:

```typescript
export interface NewVCProblem {
  id: string
  title: string
  elevatorPitch: string
  fullDescription: string
  category: string
  industryTags: string[]
  publishedDate: string
  originalUrl: string
}

export const newVCProblems: NewVCProblem[] = [
  {
    id: 'nvc-1',
    title: 'Problem Title',
    elevatorPitch: 'Brief description',
    fullDescription: 'Detailed description',
    category: 'AI',
    industryTags: ['AI', 'Enterprise'],
    publishedDate: '2026-01-01',
    originalUrl: 'https://example.com/problem',
  },
]

export const newVCAuthor = {
  id: 'newvc',
  username: 'New VC',
  avatarUrl: '',
  isNewVC: true,
}
```

### Step 5: (If has RFS) Update Mock Problems

Edit `data/mock-problems.ts`:

```typescript
// Add imports
import { newVCProblems, newVCAuthor } from './newvc-problems'

// Add transformation in the problems aggregation
```

### Step 6: (If has RFS) Add to VC Registry

Edit `lib/vc-registry.ts`:

```typescript
// Add to VC_PARTNER_KEYS
export const VC_PARTNER_KEYS = [
  // ... existing keys
  'newvc',
] as const

// Add registry entry
export const vcRegistry: VCRegistryEntry[] = [
  // ... existing entries
  {
    key: 'newvc',
    slug: 'new-vc-2026',
    vcName: 'New VC',
    vcShortName: 'NVC',
    brandColor: '#000000',
    thesisFile: 'data/vc-theses/new-vc-2026.ts',
    problemsFile: 'data/newvc-problems.ts',
    hasThesis: true,
    hasRFSProblems: true,
    badge: {
      label: 'New VC',
      bgColor: 'bg-slate-500/10',
      textColor: 'text-slate-600',
      darkTextColor: 'dark:text-slate-400',
      borderColor: 'border-slate-500/20',
    },
    authorFlagName: 'isNewVC',
    problemFlagName: 'isNewVC',
  },
]
```

### Step 7: Validate

Run the validation script:

```bash
npm run validate:vc
```

This checks:
- All thesis files exist
- All problems files are imported
- Registry entries are complete
- Theme tags have color mappings

## File Reference

| File | Purpose |
|------|---------|
| `data/vc-theses/*.ts` | Individual VC thesis data |
| `data/vc-theses/index.ts` | Exports all theses |
| `data/*-problems.ts` | VC-specific problem lists |
| `data/mock-problems.ts` | Aggregates all problems |
| `lib/vc-registry.ts` | Central VC configuration |
| `lib/funding-themes.ts` | Theme analysis and colors |
| `components/vc-badge.tsx` | Generic VC badge component |

## Troubleshooting

### "Theme has no color mapping"

Add the theme to `THEME_COLORS` in `lib/funding-themes.ts`:

```typescript
const THEME_COLORS: Record<string, string> = {
  // ... existing themes
  'new-theme': '#hexcolor',
}
```

### "Problems file not imported"

Make sure the problems file is:
1. Created in `data/`
2. Imported in `data/mock-problems.ts`
3. Problems are transformed and added to the mock problems array

### Validation fails in CI

Check that:
1. All files are committed
2. Import paths are correct (use relative paths)
3. TypeScript compiles without errors
