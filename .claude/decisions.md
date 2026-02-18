# Technical Decisions

Major technical choices and their rationale.

---

## Admin Authentication System - 2026-01-25
**Decision**: Passwordless authentication using Admin IDs

**Alternatives considered**:
- Username/password with bcrypt
- OAuth (Google, GitHub)
- Magic links via email
- Supabase Auth

**Reasoning**:
- Simpler implementation - no password reset flow
- No email service dependency for initial setup
- Admin IDs can be shared securely (Slack DM, in-person)
- Fast to implement for MVP

**Trade-offs**:
- Less familiar UX for admins
- Admin ID must be kept secret
- No self-service password reset

**Revisit when**: If we need many admins or self-service onboarding

---

## Database: PostgreSQL on Supabase - 2026-01-25
**Decision**: Use Supabase-hosted PostgreSQL with Drizzle ORM

**Alternatives considered**:
- Vercel Postgres
- PlanetScale (MySQL)
- MongoDB Atlas
- Self-hosted PostgreSQL

**Reasoning**:
- Relational model fits our data (users, problems, votes, comments)
- Supabase provides good dashboard for debugging
- Drizzle ORM gives type safety with minimal overhead
- Free tier sufficient for MVP

**Trade-offs**:
- Vendor lock-in to Supabase
- Migrations required for schema changes
- Connection pooling needed at scale

**Revisit when**: If we hit connection limits or need global distribution

---

## Session Storage: JWT in HTTP-only Cookies - 2026-01-25
**Decision**: Store JWT tokens in HTTP-only cookies, not localStorage

**Alternatives considered**:
- localStorage with JWT
- Server-side sessions (Redis)
- Supabase Auth sessions

**Reasoning**:
- HTTP-only cookies prevent XSS attacks
- Stateless - no session store needed
- Works with Next.js middleware
- jose library is Edge-compatible

**Trade-offs**:
- JWTs can't be revoked instantly (using short expiry)
- Cookie size limits (~4KB)
- CSRF considerations (using SameSite)

**Revisit when**: If we need instant session revocation

---

## UI Components: shadcn/ui - 2026-01-25
**Decision**: Use shadcn/ui for all UI components

**Alternatives considered**:
- Material UI
- Chakra UI
- Radix UI directly
- Custom components

**Reasoning**:
- Copy-paste means full control over code
- Tailwind CSS integration
- Accessible by default (built on Radix)
- Easy to customize

**Trade-offs**:
- Must manually add each component needed
- No automatic updates (copy-paste model)
- Some components need creation from scratch

**Revisit when**: Never - this is working well

---

## Route Protection: Route Groups + Layout - 2026-01-25
**Decision**: Use Next.js route groups with auth-checking layout

**Alternatives considered**:
- Middleware-only protection
- HOC wrapper for each page
- Per-page auth checks

**Reasoning**:
- Single point of auth enforcement
- Clean URL structure (route groups don't affect URLs)
- Layout runs on server - fast auth check
- Public pages (login) stay outside protected group

**Trade-offs**:
- Must remember to put new pages in correct group
- Slightly more complex directory structure

**Revisit when**: Never - this pattern is solid

---

## Problem Data: Static TypeScript Files - 2026-01-25
**Decision**: Store YC RFS and Weekend Fund problems as TypeScript files

**Alternatives considered**:
- Database only
- Headless CMS (Contentful, Sanity)
- Markdown files
- JSON files

**Reasoning**:
- Type safety for problem structure
- Easy to update in code
- Can be seeded to database OR used directly
- No external service dependency

**Trade-offs**:
- Requires code deploy to update content
- Not editable by non-developers
- Duplicated if also in database

**Revisit when**: If non-technical team needs to update content frequently

---

## Admin Roles: Simple Three-Tier - 2026-01-25
**Decision**: Three admin roles: super_admin, moderator, analyst

**Alternatives considered**:
- Single admin role
- Fine-grained permissions
- Role + permissions model

**Reasoning**:
- Simple enough for small team
- Clear separation of capabilities
- Easy to understand and implement

**Trade-offs**:
- May need more granularity later
- Role changes require code updates

**Revisit when**: If we need more nuanced access control

---

## Pillar Page Architecture: 3-Level Hierarchy + Data-Driven - 2026-02-16
**Decision**: Use consistent 3-level page architecture (hub → detail → focus) with data-driven generation for all "explore" sections (Accelerators, Fellowships, Residencies)

**Alternatives considered**:
- Single flat list page per pillar
- Database-driven with CMS
- Markdown files + MDX
- Separate architecture per pillar type

**Reasoning**:
- **Consistent UX**: Users get same navigation experience across all program types
- **SEO optimized**: Static generation via `generateStaticParams` → fast, crawlable pages
- **Type safety**: TypeScript data files catch missing fields at compile time
- **Auto-surfacing**: Adding a program to data file auto-generates detail page, updates hub, focus pages, and sitemap
- **Build-time aggregation**: Theme utilities compute focus areas/stats at build time → zero runtime cost
- **Easy replication**: Adding a new pillar = copy existing structure, adapt names/colors (~70% code reuse)

**Architecture breakdown**:
1. **Hub page** (`/accelerators`): Grid view, filters, stats, category browser
2. **Detail page** (`/accelerators/yc`): Full program info, JSON-LD, related programs
3. **Focus pages** (`/accelerators/focus/ai`): Aggregation by tag, related focus areas

**Data flow**:
```
data/[pillar]/[file].ts (add entry)
  → allX aggregate array (auto-includes new entry)
  → generateStaticParams (auto-creates route)
  → Hub grid (auto-displays)
  → Focus pages (auto-includes if tags match)
  → Sitemap (auto-adds URL)
```

**Trade-offs**:
- **Upfront complexity**: Initial pillar setup requires 9 files (data, theme util, 4 pages, integrations)
- **Code deploy needed**: Can't update content without code change (vs CMS)
- **Rigid structure**: All pillars must follow the same 3-level hierarchy
- **Focus tag taxonomy**: Adding new tags requires understanding theme utility pattern

**Benefits realized**:
- Added Residencies pillar (9 files) in one session with zero errors
- Added 12 programs by only editing data files — everything else auto-updated
- Consistent UX means users instantly understand how to navigate new pillars
- Type safety caught missing fields before runtime

**Revisit when**:
- If non-technical team needs to update programs frequently (consider CMS)
- If we need pillar-specific features that break the 3-level pattern
- If we have 100+ programs per pillar (may need pagination, search)

---

## Source Modeling: Many-to-Many with is_primary - 2026-02-18
**Decision**: Introduce `source_institutions` + `problem_sources` join table with `is_primary` flag, keeping legacy author-name flag fallback during transition

**Alternatives considered**:
- Keep author-name flags forever (isYCRFS, isConviction, etc.)
- Full many-to-many with no primary concept
- Embed source info as JSONB in problems table
- Separate source column per VC (one-to-one)

**Reasoning**:
- Author-name flags don't scale — each new VC requires adding flags to schema, transformations, filtering
- Many-to-many is the correct model — problems can come from multiple sources
- `is_primary` supports current UX ("one badge per problem") without blocking future flexibility
- Compatibility-first rollout means no big-bang migration — both paths work during transition
- Backfill from author-name to join table can happen incrementally

**Trade-offs**:
- Join queries are slightly more complex than flag checks
- Two code paths (new model + legacy fallback) during transition period
- Admin UI for managing sources not yet built

**Migration**: `0014_add_problem_source_model.sql`
**Revisit when**: Legacy fallback code can be removed after full backfill is verified

---

## DB-Backed Rate Limiting over Process-Local - 2026-02-18
**Decision**: Shared DB-backed rate limiting for auth and draft endpoints, with local in-memory fallback

**Alternatives considered**:
- Process-local in-memory rate limiting (Map/WeakMap)
- Redis-backed rate limiting
- Edge middleware rate limiting
- No rate limiting (rely on WAF/Cloudflare)

**Reasoning**:
- Process-local fails in multi-instance deployments — each instance tracks independently
- Redis adds infrastructure complexity (another service to manage)
- DB-backed uses existing Postgres — no new infrastructure
- Local fallback ensures availability if DB is slow/unreachable
- Acceptable latency for auth endpoints (not hot-path like feed reads)

**Trade-offs**:
- Slightly more DB load per auth request (one read + one write)
- Local fallback means brief windows of slightly relaxed limits during DB issues
- Not suitable for very high-rate endpoints (use Redis for those)

**Revisit when**: If auth endpoints need <5ms rate check latency, or if we add Redis for other reasons

---

## SEO: noindex for Internal/Form Pages - 2026-02-18
**Decision**: Add `robots: { index: false, follow: false }` to all non-destination pages (login, signup, admin, profile, submit)

**Alternatives considered**:
- robots.txt Disallow rules only
- Leave all pages indexable
- Use sitemap exclusion only (no page-level control)

**Reasoning**:
- Page-level `noindex` is more authoritative than robots.txt for index control
- Internal pages in search results look unprofessional and waste crawl budget
- Sitemap already excludes these pages, but `noindex` is defense-in-depth
- `nofollow` on internal pages prevents PageRank flowing to utility routes

**Trade-offs**:
- Must remember to add `noindex` to every new internal page (manual process)
- If someone links to `/login`, search engines won't index it (desired behavior)

**Revisit when**: Never — this is standard SEO hygiene

---

## Compatibility-First Data Model Rollout - 2026-02-18
**Decision**: When migrating data models, always support both old and new patterns during transition; remove legacy path only after verifying full backfill

**Alternatives considered**:
- Big-bang migration (switch everything at once)
- Feature flag to toggle between old and new
- Run old and new in parallel with A/B testing

**Reasoning**:
- Big-bang is risky — incomplete backfills break features silently
- Dual-path code is slightly more complex but much safer
- Legacy fallback ensures zero downtime during transition
- Can verify backfill completeness before removing legacy code

**Applied to**: Source modeling migration (author-name flags → join-table)

**Trade-offs**:
- Two code paths to maintain during transition
- Slightly harder to reason about behavior (which path is active?)
- Requires explicit cleanup step to remove legacy code

**Revisit when**: Legacy code becomes confusing — remove it once backfill is 100% verified
