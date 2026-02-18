# Adding a Pillar Page

This guide explains how to add a new pillar page (like Funding Landscape or Fellowships) to OpenQuest. Pillar pages are comprehensive content sections with a hub page, individual detail pages, and category/aggregation pages.

## Architecture

Every pillar page follows a three-level structure:

```
/[pillar]              → Hub page (client, interactive)
/[pillar]/[slug]       → Detail page (server, SEO-optimized)
/[pillar]/[category]/[slug] → Aggregation page (server, SEO-optimized)
```

**Examples:**
- `/landscape` → `/landscape/a16z` → `/landscape/theme/ai`
- `/fellowships` → `/fellowships/thiel-fellowship` → `/fellowships/focus/entrepreneurship`

## Step-by-Step Checklist

### 1. Data Layer

Create `data/[pillar]/` with:

```
data/[pillar]/
├── index.ts           # Types, central re-export, helpers
├── category-a.ts      # Data file per category
├── category-b.ts
└── ...
```

**`index.ts` must export:**
- `interface [Entity]` — the main data type (e.g., `VCThesis`, `Fellowship`)
- `all[Entities]: [Entity][]` — merged array of all items
- `get[Entity]BySlug(slug: string)` — lookup by slug
- `get[Entities]ByCategory(category: string)` — filter by category
- `getAllTags()` / `getTagsWithCounts()` — tag aggregation

### 2. Utility Library

Create `lib/[pillar]-themes.ts` (mirrors `lib/funding-themes.ts` and `lib/fellowship-themes.ts`):

**Must export:**
- `slugify[Category](name: string)` — URL-safe slug from tag name. Must replace `&` with `"and"` then strip non-alphanumeric.
- `get[Categories]ByPopularity()` — returns `CategoryItem[]`-compatible data
- `get[Category]BySlug(slug: string)` — single category lookup
- `get[Entities]For[Category](slug: string)` — entities in a category
- `get[Category]Stats()` — aggregated statistics
- `getAll[Category]Slugs()` — for `generateStaticParams`
- `getRelated[Categories](slug: string, limit: number)` — related categories by overlap

**Important:** Always use the slugify function from the utility library, never inline regex.

### 3. Shared Components

Use the shared pillar components in `components/pillar/`:

#### `AnimatedStats`
```tsx
import { AnimatedStats, type StatItem } from '@/components/pillar/animated-stats'

const items: StatItem[] = [
  { icon: Users, value: 42, label: 'Total', color: 'text-violet-500', bgColor: 'bg-violet-500/10' },
  // ... up to 4 items
]

<AnimatedStats items={items} />
```

#### `CategoryInfographic`
```tsx
import { CategoryInfographic, type CategoryItem } from '@/components/pillar/category-infographic'

const items: CategoryItem[] = data.map((d) => ({
  slug: d.slug,
  name: d.name,
  count: d.entityCount,
  totalCount: d.totalEntities,
  consensusPercentage: d.percentage,
  color: d.color,
  entities: d.entities.map((e) => ({
    slug: e.slug, shortName: e.shortName, brandColor: e.brandColor, name: e.name,
  })),
  detailUrl: `/[pillar]/[category]/${d.slug}`,
}))

<CategoryInfographic
  items={items}
  onSelect={setSelected}
  selected={selected}
  labels={{
    entityNoun: 'entities',
    emergingLabel: 'Emerging categories',
    viewAllLabel: 'View all {name} entities',
    selectedPrefix: 'Showing entities for:',
  }}
/>
```

#### `EntityQuickLinks`
```tsx
import { EntityQuickLinks, type QuickLinkEntity } from '@/components/pillar/entity-quick-links'

const entities: QuickLinkEntity[] = data.map((d) => ({
  slug: d.slug,
  shortName: d.shortName,
  brandColor: d.brandColor,
  href: `/[pillar]/${d.slug}`,
  subtitle: d.year.toString(),
  badge: d.featured ? { label: 'Featured', icon: Star, colorClass: '...', bgClass: '...' } : undefined,
}))

<EntityQuickLinks entities={entities} />
```

### 4. Pages

#### Hub Page (`app/[pillar]/layout.tsx` + `page.tsx`)

**`layout.tsx`** (server — provides metadata since hub is a client component):
```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "[Pillar Name] 2026",
  description: "...",
  alternates: { canonical: "/[pillar]" },
  openGraph: { ... },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
```

**`page.tsx`** (`'use client'`):
- Header + Footer
- JSON-LD `CollectionPage`
- Hero section with animated gradient
- `AnimatedStats`
- `CategoryInfographic` (with `id="[anchor]"` for scroll link)
- `EntityQuickLinks`
- CTA section

#### Detail Page (`app/[pillar]/[slug]/page.tsx`)

Server component:
- `generateStaticParams()` — return all entity slugs
- `generateMetadata()` — with canonical, OG image via `/api/og`, Twitter card
- Breadcrumb: Home / [Pillar] / [Entity Name]
- Brand color header bar
- Content sections
- Related entities
- JSON-LD `Article` + `BreadcrumbList`

**No Header/Footer** — detail pages are standalone (consistent with existing pattern).

#### Aggregation Page (`app/[pillar]/[category]/[slug]/page.tsx`)

Server component:
- `generateStaticParams()` — return all category slugs
- `generateMetadata()` — with canonical, OG image, Twitter card
- Hero with category stats
- Grid of entities in this category
- Related categories
- CTA section
- JSON-LD `CollectionPage`

### 5. SEO Checklist

Every page must have:

| Page | Canonical | OG Image | JSON-LD | Sitemap |
|------|-----------|----------|---------|---------|
| Hub | `layout.tsx` | Default | CollectionPage | Priority 0.9 |
| Detail | `generateMetadata` | `/api/og?title=...` | Article | Priority 0.8 |
| Aggregation | `generateMetadata` | `/api/og?title=...` | CollectionPage | Priority 0.7 |

**OG Image pattern:**
```tsx
const ogImageUrl = `/api/og?${new URLSearchParams({
  title: entity.name,
  description: entity.description.slice(0, 140),
  category: '[Pillar Name]',
}).toString()}`
```

**Use relative URLs** in metadata — Next.js resolves them via `metadataBase`.

### 6. Navigation Integration

**Footer** (`components/footer.tsx`):
Add to the Product section.

**Navigation** (`components/navigation-header.tsx`):
Add to both desktop nav links and mobile menu.

**Sitemap** (`app/sitemap.ts`):
```tsx
import { all[Entities] } from '@/data/[pillar]'
import { getAll[Category]Slugs } from '@/lib/[pillar]-themes'

// Add hub page (priority 0.9)
// Add detail pages (priority 0.8)
// Add aggregation pages (priority 0.7)
```

### 7. Verification

After implementation:
1. `npx tsc --noEmit` — must pass clean
2. Check hub page renders with interactive infographic
3. Check detail page metadata (canonical, OG, JSON-LD)
4. Check aggregation page metadata
5. Check all tag links resolve correctly (especially tags with `&`)
6. Check sitemap includes all new pages
7. Check nav/footer links work

## Reference Implementations

| Component | Landscape | Fellowship |
|-----------|-----------|------------|
| Data | `data/vc-theses/` | `data/fellowships/` |
| Utils | `lib/funding-themes.ts` | `lib/fellowship-themes.ts` |
| Hub | `app/landscape/page.tsx` | `app/fellowships/page.tsx` |
| Detail | `app/landscape/[slug]/page.tsx` | `app/fellowships/[slug]/page.tsx` |
| Aggregation | `app/landscape/theme/[slug]/page.tsx` | `app/fellowships/focus/[slug]/page.tsx` |
| Layout | `app/landscape/layout.tsx` | `app/fellowships/layout.tsx` |
