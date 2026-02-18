# Architecture Decisions

Why things are structured the way they are.

---

## Overall Application Structure

**Structure**:
```
app/
├── (public pages)      ← Landing, feed, problem details
├── admin/              ← Admin dashboard
│   ├── (authenticated)/ ← Protected admin pages
│   ├── login/          ← Public admin login
│   └── setup/          ← Public first-time setup
├── api/                ← API routes
│   └── admin/          ← Admin-specific APIs
components/
├── admin/              ← Admin-specific components
├── ui/                 ← shadcn/ui primitives
└── [feature].tsx       ← Feature components
lib/
├── db/                 ← Database schema and client
└── [utilities].ts      ← Shared utilities
data/
└── [static-data].ts    ← YC RFS, Weekend Fund problems
```

**Why this way**:
- Next.js 16 App Router conventions
- Clear separation between public and admin
- Colocation of related files

**Don't change**:
- The `app/api/` prefix (Next.js API routes convention)
- The `(authenticated)` route group pattern

**Can extend**:
- Add more route groups for other auth levels
- Add more feature directories under `components/`

---

## Database Architecture

**Structure**: PostgreSQL on Supabase with Drizzle ORM

**Tables**:
- `users` - End users who submit/interact with problems
- `problems` - User-submitted startup problems (with `submissionVersion` for optimistic concurrency)
- `comments` - Threaded comments on problems (self-referencing parentId)
- `comment_upvotes` - Track who upvoted which comments
- `problem_upvotes` - Track who upvoted which problems
- `problem_engagements` - Builder/investor/team engagement tracking
- `user_profiles` - Extended user profile data
- `user_saved_problems` - User bookmarks/saves
- `source_institutions` - VC partner / editorial source registry (many-to-many source model)
- `problem_sources` - Links problems to source institutions (`is_primary` flag for primary source)
- `admin_users` - Admin accounts (separate from regular users)
- `admin_actions` - Audit log for admin activities
- `problem_moderation` - Moderation history for problems

**Comments Schema Highlights**:
```typescript
comments {
  id, problemId, authorId,
  parentId,        // null = top-level, set = reply to another comment
  content, upvotes,
  createdAt, updatedAt,
  isDeleted, deletedAt,  // Soft delete
  isHidden, hiddenReason // Moderation
}
```

**Why this way**:
- Relational model fits the data (problems have authors, votes, comments)
- Drizzle provides type safety
- Supabase provides managed Postgres with good DX
- Self-referencing `parentId` enables threaded discussions

**Don't change**:
- UUID primary keys (used throughout)
- The separation of `users` and `admin_users` tables
- Comments `parentId` pattern for threading

**Can extend**:
- Add notifications table
- Add indexes for frequently queried columns
- Add admin UI for managing `source_institutions` and assigning `problem_sources`

---

## Authentication Architecture

**Structure**: Dual auth systems

1. **User Auth** (implemented)
   - Custom email/password with bcrypt hashing
   - JWT sessions via jose library, HTTP-only cookies
   - Cookie name: `user_session`
   - Standardized signup response (no account enumeration)
   - Password reset via Resend email service
   - Shared DB-backed rate limiting on login/signup endpoints (with local fallback)

2. **Admin Auth** (implemented)
   - Passwordless using Admin IDs
   - JWT sessions with jose library
   - HTTP-only cookies
   - Cookie name: `admin_session`

**Why this way**:
- User auth is custom (not NextAuth) for full control over flows
- Admin auth is simpler — no password reset, no email verification
- Admin IDs can be shared securely out-of-band
- Separation allows different security policies
- DB-backed rate limiting works across multiple instances (not just process-local)

**Don't change**:
- Cookie names: `admin_session`, `user_session`
- JWT secrets: `ADMIN_JWT_SECRET`, `JWT_SECRET` env vars
- Standardized signup response (prevents account enumeration)

**Can extend**:
- Add OAuth providers for users
- Add MFA for admins if needed

---

## Admin Dashboard Architecture

**Structure**: Server components + client components

```
app/admin/(authenticated)/
├── layout.tsx          ← Server: auth check, sidebar
├── dashboard/
│   └── page.tsx        ← Server: fetch stats
├── problems/
│   └── page.tsx        ← Client: interactive table
└── settings/
    └── page.tsx        ← Client: form interactions
```

**Why this way**:
- Server components for data fetching (no loading states needed)
- Client components for interactivity (tables, modals, forms)
- Layout handles auth once for all child routes

**Don't change**:
- Auth check in layout (single point of enforcement)
- Sidebar in layout (consistent navigation)

**Can extend**:
- Add more admin pages as needed
- Add role-based access within admin

---

## Static Data Architecture

**Structure**: TypeScript files in `data/` directory

```
data/
├── vc-theses/               ← VC investment thesis articles (13 VCs)
│   ├── index.ts             ← Types + exports all theses
│   └── [vc-slug].ts         ← Individual thesis files
├── accelerators/            ← Accelerator program data (24 programs)
│   ├── index.ts             ← Accelerator type + helpers + re-exports
│   └── west-top-tier.ts     ← All current accelerator entries
├── fellowships/             ← Fellowship program data (47+ programs)
│   ├── index.ts             ← Fellowship type + helpers + re-exports
│   ├── tech-startup.ts      ← Tech/startup fellowships
│   ├── research-science.ts  ← Research/science fellowships
│   ├── social-impact.ts     ← Social impact fellowships
│   ├── creative-arts.ts     ← Creative arts fellowships
│   ├── open-ended.ts        ← Open-ended fellowships
│   ├── international-graduate.ts
│   ├── ai-tech.ts           ← AI/tech fellowships
│   └── journalism.ts        ← Journalism fellowships
├── residencies/             ← Residency program data (12 programs)
│   ├── index.ts             ← Residency type + helpers + re-exports
│   ├── vc-backed.ts         ← VC-backed residencies (8 programs)
│   └── community.ts         ← Community residencies (4 programs)
├── yc-rfs-problems.ts       ← YC Request for Startups
├── conviction-problems.ts   ← Conviction's Plausible AI Schemes
├── pathlight-problems.ts    ← Pathlight RFS
├── ark-invest-problems.ts   ← ARK Big Ideas
├── weekend-fund-problems.ts ← Weekend Fund problems
└── mock-problems.ts         ← Aggregates all problems for feed
```

**Why this way**:
- Type-safe data with TypeScript
- Easy to update without database changes
- Can be seeded to database or used directly
- Adding entries to data files auto-surfaces on hub, detail, focus, and sitemap pages

**Don't change**:
- The data structure (id, title, elevatorPitch, fullDescription, category)
- The transform functions that convert to display format
- The `allX` aggregate arrays (allAccelerators, allFellowships, allResidencies) — these drive all pages

**Can extend**:
- Add more investor RFS data
- Add new pillar types (see Pillar Page Architecture below)
- Convert to CMS if content changes frequently

---

## Pillar Page Architecture (Accelerators, Fellowships, Residencies)

**Structure**: Each pillar follows a 3-level page hierarchy:

```
app/[pillar]/
├── layout.tsx               ← SEO metadata (title, OG, Twitter cards)
├── page.tsx                 ← Hub page (client component, filters, stats)
├── [slug]/
│   └── page.tsx             ← Detail page (server component, generateStaticParams)
└── focus/
    └── [slug]/
        └── page.tsx         ← Focus aggregation page (server component)

lib/
└── [pillar]-themes.ts       ← Theme utility (focus areas, stats, slugs)

data/
└── [pillar]/
    ├── index.ts             ← Types, helpers, allX aggregate array
    └── [subcategory].ts     ← Category data files
```

**Key files per pillar**:
- **Data**: `data/[pillar]/index.ts` — defines the entity type, helper functions, and re-exports all entries as `allX`
- **Themes**: `lib/[pillar]-themes.ts` — computes focus areas from tags, provides slug/stats/related utilities
- **Hub**: `app/[pillar]/page.tsx` — uses `AnimatedStats`, `CategoryInfographic`, `EntityQuickLinks`
- **Detail**: `app/[pillar]/[slug]/page.tsx` — JSON-LD Article schema, `generateStaticParams`, `generateMetadata`
- **Focus**: `app/[pillar]/focus/[slug]/page.tsx` — JSON-LD CollectionPage, related focus areas

**Integration points** (auto-updated when data changes):
- `components/header.tsx` — nav dropdown links
- `components/footer.tsx` — Explore section links
- `app/sitemap.ts` — hub, detail, and focus pages

**Why this way**:
- Consistent UX across all program types
- Static generation via `generateStaticParams` — fast, SEO-friendly
- Theme utilities compute aggregations at build time — no runtime cost
- Adding a new program = only edit one data file — everything else updates automatically

**Don't change**:
- The 3-level page hierarchy (hub → detail → focus)
- `generateStaticParams` + `generateMetadata` pattern
- JSON-LD structured data on detail and focus pages

**Can extend**:
- Add new pillars by replicating the pattern (see Patterns for how-to)
- Add more subcategory data files within existing pillars

---

## VC Registry & Automation Architecture

**Structure**: Central registry with validation and scaffolding

```
lib/
└── vc-registry.ts           ← Single source of truth for VCs with RFS

scripts/
├── validate-vc-data.ts      ← Validates data consistency
└── add-vc.ts                ← Interactive CLI for adding VCs

components/
└── vc-badge.tsx             ← Generic badge using registry config

.github/workflows/
└── validate-vc.yml          ← CI validation on VC file changes

docs/
└── adding-a-vc.md           ← Step-by-step guide
```

**Why this way**:
- Registry is single source of truth for VC configuration
- Validation catches missing files/imports before production
- Scaffolding CLI prevents forgetting required steps
- Generic VCBadge reduces component duplication

**Key Commands**:
```bash
npm run validate:vc   # Check data consistency
npm run add-vc        # Interactive CLI for new VCs
```

**Don't change**:
- VC registry structure (`lib/vc-registry.ts`)
- Validation checks order (registry → imports → themes → badges)

**Can extend**:
- Add more validation checks
- Auto-generate more files from registry
- Add pre-commit hook to run validation

---

## Source Modeling Architecture

**Structure**: Many-to-many model for linking problems to editorial/VC sources

```
source_institutions
├── id (UUID)
├── name ("Y Combinator", "Conviction", etc.)
├── slug
├── type (vc_partner, editorial, community)
└── metadata (JSONB)

problem_sources
├── problem_id (FK → problems)
├── source_institution_id (FK → source_institutions)
├── is_primary (boolean)
└── UNIQUE(problem_id, source_institution_id)
└── UNIQUE partial index: one is_primary per problem
```

**Why this way**:
- Problems can have multiple sources (e.g., a problem from YC that's also relevant to Conviction)
- `is_primary` supports the current "one primary source per problem" display without blocking future many-to-many
- Join-table model is extensible without schema rewrites later
- Source filtering in search/sections uses join queries with legacy fallback for backward compatibility

**Migration**: `0014_add_problem_source_model.sql`
- Creates tables, seeds known VC institutions, backfills primary source links by author name

**Don't change**:
- The unique constraint on `(problem_id, source_institution_id)`
- The partial unique index for one `is_primary` per problem

**Can extend**:
- Admin UI for managing source_institutions
- Full many-to-many display on problem cards
- Source-based analytics/reporting

---

## Browse & Discovery Architecture

**Structure**: Server-side sections API + client feed with race-condition guards

```
app/api/problems/sections/route.ts  ← Server-side globally accurate browse sections
app/api/problems/search/route.ts    ← Search with sanitized LIKE queries
components/feed-list.tsx             ← Client feed with cancellation/request-id guards
components/feed-sections.tsx         ← Section-based browse UI
```

**Key patterns**:
- **Sections API** (`/api/problems/sections`): Returns pre-computed sections for browse page (editorial-first, community-after). Avoids deriving sections from one paginated slice.
- **Request cancellation**: Feed client uses request-id guards to prevent stale response races when filters change rapidly.
- **Contextual error payloads**: Browse/search APIs return structured errors with incident IDs for debugging.
- **Category mixed content**: Category pages render editorial/sourced problems first, community DB submissions after — supports gradual transition from curated to community-dominant content.

**Why this way**:
- Server-side sections gives globally accurate results (not derived from client-side pagination)
- Cancellation guards prevent UI flickering from stale responses
- Incident IDs enable tracing failures across client ↔ server

**Don't change**:
- Sections API as primary browse data source
- Request cancellation pattern in feed client

**Can extend**:
- Replace `%ILIKE%` search with FTS/trigram + cursor pagination
- Replace sections N+1 category queries with window-function query or materialized aggregate
- Add incident reporting to all critical write/auth/admin APIs

---

## Middleware Architecture

**Structure**: Single middleware file at project root

```typescript
// middleware.ts
export async function middleware(req: NextRequest) {
  // Only checks for cookie existence (Edge-compatible)
  // Full JWT validation happens in layout/API routes
}

export const config = {
  matcher: '/admin/:path*',
};
```

**Why this way**:
- Edge Runtime limitations prevent full JWT validation
- Quick cookie check is sufficient for initial redirect
- Full validation in server components/API routes

**Don't change**:
- Keep middleware simple (Edge-compatible)
- Don't add Node.js-specific code

**Can extend**:
- Add rate limiting at edge
- Add geo-blocking if needed
- Add request logging
