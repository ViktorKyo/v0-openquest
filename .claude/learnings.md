# Project Learnings

Track mistakes, fixes, and "aha" moments here.

---

### Drizzle ORM Condition Building (2026-02-04)
**Context**: Admin API routes for filtering problems and users with multiple conditions
**Mistake**: Used `sql\`${conditions.join(' AND ')}\`` to combine filter conditions
**Solution**: Import `and` from drizzle-orm and use `and(...conditions)`
**Why**: Drizzle SQL objects aren't strings - they're tagged template objects. Joining them with `.join()` converts them to `[object Object]` strings, breaking the query.
**Code Pattern**:
```typescript
// ❌ Wrong - conditions are SQL objects, not strings
const conditions = [eq(users.status, 'active'), ilike(users.name, '%john%')];
query.where(sql`${conditions.join(' AND ')}`);

// ✅ Correct - use drizzle's and() helper
import { and } from 'drizzle-orm';
query.where(and(...conditions));
```
**Files affected**: `app/api/admin/users/route.ts`, `app/api/admin/problems/route.ts`

---

### Development Console.log Security (2026-02-04)
**Context**: Password reset URL was being logged to console
**Mistake**: Console.log for debugging wasn't gated behind environment check
**Solution**: Wrap development logs with `process.env.NODE_ENV === 'development'`
**Why**: Production logs shouldn't contain sensitive data like password reset tokens
**Code Pattern**:
```typescript
// ❌ Wrong - logs in all environments
console.log('[DEV] Password reset URL:', resetUrl);

// ✅ Correct - only in development
if (process.env.NODE_ENV === 'development') {
  console.log('[DEV] Password reset URL:', resetUrl);
}
```
**Files affected**: `app/api/auth/forgot-password/route.ts`

---

### Accessibility for Toggle Buttons (2026-02-04)
**Context**: Login page Sign In / Sign Up toggle buttons
**Mistake**: Custom toggle buttons didn't have aria attributes
**Solution**: Add `aria-pressed={isSelected}` to toggle buttons
**Why**: Screen readers need to know which option is currently selected
**Code Pattern**:
```tsx
<button
  type="button"
  aria-pressed={isLogin}  // ← Add this
  onClick={() => setIsLogin(true)}
>
  Sign In
</button>
```
**Files affected**: `app/login/page.tsx`

---

### Cookie Naming Consistency (2026-01-25)
**Context**: Admin authentication system - login was succeeding but user kept getting redirected back to login
**Mistake**: Used different cookie names in different places (`admin-session` vs `admin_session`)
**Solution**: Standardized on `admin_session` (underscore) everywhere
**Why**: Middleware checked for `admin_session` but auth library was setting `admin-session`. The mismatch caused the session to never be found.
**Files affected**: `lib/admin-auth.ts`, `middleware.ts`

---

### Date Objects in SQL Template Literals (2026-01-25)
**Context**: Dashboard stats API was failing with "Failed to load dashboard stats"
**Mistake**: Passed Date objects directly to SQL template literals
**Solution**: Convert dates to ISO strings with `.toISOString()`
**Why**: The postgres library expects strings, not Date objects, in template literal interpolation
**Code Pattern**:
```typescript
// ❌ Wrong
sql`${problems.createdAt} < ${thirtyDaysAgo}`

// ✅ Correct
sql`${problems.createdAt} < ${thirtyDaysAgo.toISOString()}`
```
**Files affected**: `app/api/admin/stats/route.ts`

---

### Next.js Route Groups for Selective Layouts (2026-01-25)
**Context**: Admin login and setup pages were being protected by auth middleware even though they should be public
**Mistake**: Put auth-checking layout at `app/admin/layout.tsx` which applied to ALL admin routes
**Solution**: Use route groups - created `app/admin/(authenticated)/` folder with layout inside
**Why**: Route groups (folders with parentheses) don't affect the URL but allow different layouts. Public routes stay at `app/admin/login/`, protected routes go in `app/admin/(authenticated)/dashboard/`
**Code Pattern**:
```
app/admin/
├── (authenticated)/     ← Has auth-checking layout
│   ├── layout.tsx       ← Checks session, redirects if not logged in
│   ├── dashboard/
│   └── problems/
├── login/               ← No auth check (public)
└── setup/               ← No auth check (public)
```

---

### Hard Redirects After Login (2026-01-25)
**Context**: After successful login, `router.push()` wasn't working - user stayed on login page
**Mistake**: Used Next.js client-side navigation after setting HTTP-only cookie
**Solution**: Use `window.location.href` for hard redirect after authentication
**Why**: HTTP-only cookies set by the server aren't immediately available to the client-side router. A hard reload ensures the browser sends the new cookie with the request.
**Code Pattern**:
```typescript
// ❌ Doesn't work reliably after setting auth cookie
router.push('/admin/dashboard')

// ✅ Works - forces full page reload
window.location.href = '/admin/dashboard'
```

---

### Cookie Path and SameSite for Admin Auth (2026-01-25)
**Context**: Session cookie wasn't being sent with requests to admin pages
**Mistake**: Set cookie path to `/admin` and SameSite to `strict`
**Solution**: Changed path to `/` and SameSite to `lax`
**Why**:
- Path `/admin` was too restrictive for API routes at `/api/admin/`
- `strict` SameSite blocks cookies on navigation from external links
**Code Pattern**:
```typescript
cookieStore.set('admin_session', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',  // Not 'strict'
  path: '/',        // Not '/admin'
  maxAge: 24 * 60 * 60,
});
```

---

### Missing shadcn/ui Components (2026-01-25)
**Context**: Build errors for missing components like Badge, Table, Alert
**Mistake**: Assumed shadcn/ui components existed without checking
**Solution**: Create the missing components in `components/ui/`
**Why**: shadcn/ui is a copy-paste component library - components only exist if you've added them to your project
**Components created**: `badge.tsx`, `table.tsx`, `alert.tsx`

---

### Next.js 16 API Route Params are Promise-based (2026-02-04)
**Context**: Creating API routes for comments CRUD
**Mistake**: Used synchronous params signature `{ params: { id: string } }`
**Solution**: Use Promise-based signature and await params
**Why**: Next.js 16 changed params to be async to support dynamic route resolution
**Code Pattern**:
```typescript
// ❌ Old (Next.js 15 and earlier)
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
}

// ✅ New (Next.js 16+)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;  // Must await!
}
```
**Files affected**: All dynamic API routes in `app/api/`

---

### Engagement Badges Require Problem Author Check (2026-02-04)
**Context**: Showing "Author" badge next to problem author's comments
**Mistake**: Tried to pass engagement data without fetching problem info
**Solution**: Fetch problem's `authorId` and compare with comment author
**Why**: Comment author's engagement status depends on the specific problem context
**Code Pattern**:
```typescript
// Fetch problem author
const [problem] = await db
  .select({ authorId: problems.authorId })
  .from(problems)
  .where(eq(problems.id, problemId))
  .limit(1);

// Set badge
const engagement = problem?.authorId === commentAuthorId
  ? { isProblemAuthor: true }
  : undefined;
```
**Files affected**: `app/api/problems/[id]/comments/route.ts`

---

### Institutional Author Flags Must Be Passed Through Transformations (2026-02-04)
**Context**: Home page "Trending Problems" section showing broken avatar images
**Mistake**: When transforming problem data for `ProblemCard`, only passed `name` and `avatar` for author
**Solution**: Include `isYC` and `isWeekendFund` flags in author transformation
**Why**: `ProblemCard` checks these flags to decide whether to render `InstitutionalLogo` or an avatar image. Without the flags, it falls back to loading the avatar URL which doesn't exist for institutional authors (YC, Weekend Fund).
**Code Pattern**:
```typescript
// ❌ Wrong - missing institutional flags
author: {
  name: problem.author.username,
  avatar: problem.author.avatarUrl,
},

// ✅ Correct - include institutional flags
author: {
  name: problem.author.username,
  avatar: problem.author.avatarUrl,
  isYC: problem.author.isYC,
  isWeekendFund: problem.author.isWeekendFund,
},
```
**Files affected**: `components/problems-preview.tsx`

---

### Category Filter Case Sensitivity (2026-02-10)
**Context**: Feed page category filter wasn't working - no results when filtering
**Mistake**: Categories in dropdown ("Climate tech") didn't match data exactly ("Climate Tech")
**Solution**: Use case-insensitive comparison for category filtering
**Why**: Category names in data use Title Case; any mismatch causes filter to fail silently
**Code Pattern**:
```typescript
// ❌ Wrong - case-sensitive comparison
filtered = filtered.filter(
  (problem) => problem.category === selectedCategory
)

// ✅ Correct - case-insensitive comparison
filtered = filtered.filter(
  (problem) => problem.category.toLowerCase() === selectedCategory.toLowerCase()
)
```
**Files affected**: `components/feed-list.tsx`

---

### Date Sorting with Mixed Types (2026-02-10)
**Context**: Feed "Most recent" sort wasn't working correctly
**Mistake**: Assumed `createdAt` was always a Date object
**Solution**: Handle both Date objects and date strings in sort comparison
**Why**: Mock data has Date objects, API data may have ISO strings. Type coercion is needed.
**Code Pattern**:
```typescript
// ❌ Wrong - assumes Date object
sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

// ✅ Correct - handles both Date and string
sorted.sort((a, b) => {
  const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : new Date(a.createdAt).getTime()
  const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : new Date(b.createdAt).getTime()
  return dateB - dateA
})
```
**Files affected**: `components/feed-list.tsx`

---

### WebFetch 403 Errors Require Alternative Sources (2026-02-10)
**Context**: Fetching ARK Invest Big Ideas 2025 report data directly from ark-invest.com
**Mistake**: Tried to fetch directly from the source website
**Solution**: Search for and use alternative sources (news articles, summaries) when primary source blocks requests
**Why**: Many sites block automated requests. Finding articles that cite the primary source often provides the key data needed.
**Pattern**: When WebFetch returns 403, search for "[topic] site:news_site" or "[topic] summary" to find alternative sources

---

### Dynamic Text in UI Components Can Break Layouts (2026-02-11)
**Context**: Landscape page theme bubbles and stats showing theme names
**Issue**: Long theme names like "Scientific Discovery" were overflowing bubbles and breaking tooltip layouts
**Solution**: Added `line-clamp-2`, `max-w-full`, `overflow-hidden` to bubble text; `max-w-[280px]` to tooltips; truncation with ellipsis for stats labels over 12 chars
**Why**: Dynamic content from data (theme names, VC names) varies in length - always constrain it
**Code Pattern**:
```tsx
// Inside bubble
<span className="line-clamp-2 max-w-full overflow-hidden">
  {theme.name}
</span>

// Stats label with truncation
const label = name.length > 12 ? `VCs on ${name.slice(0, 12)}…` : `VCs on ${name}`

// Tooltip container
<div className="max-w-[280px]">...</div>
```
**Files affected**: `components/landscape/theme-bubble.tsx`, `components/landscape/consensus-stats.tsx`

---

### TypeScript Type Inference with Mixed Optional Properties (2026-02-11)
**Context**: Footer links array where some items have `external: true` and others don't
**Issue**: TypeScript inferred narrow types for each array, causing "property does not exist" errors when iterating
**Solution**: Add explicit type annotation to the object
**Why**: When arrays have different object shapes, TS infers union types that don't include all properties
**Code Pattern**:
```typescript
// ❌ TypeScript infers narrow types per array
const links = {
  Product: [{ name: "...", href: "..." }],  // no external property
  Social: [{ name: "...", href: "...", external: true }],
}
// Error: 'external' does not exist on type '{name, href}'

// ✅ Add explicit type
type FooterLink = { name: string; href: string; external?: boolean }
const links: Record<string, FooterLink[]> = { ... }
```
**Files affected**: `components/footer.tsx`

---

### Client Layout Wrapper to Preserve Server-Component Metadata (2026-02-11)
**Context**: Adding consistent header/footer to YC RFS page which exports `metadata` (server-only)
**Issue**: `Header` component uses `useAuth()` hook, requiring a client component. But converting the page to `'use client'` would lose the `metadata` export (SEO).
**Solution**: Create a `'use client'` layout file (`app/yc-rfs/layout.tsx`) that wraps `{children}` with `<Header />` and `<Footer />`, keeping the page itself as a server component.
**Why**: In Next.js App Router, a client layout can wrap a server page. The page's `metadata` export still works because Next.js extracts it at build/request time, separate from the render tree.
**Code Pattern**:
```tsx
// app/yc-rfs/layout.tsx (client)
'use client'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-16">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

// app/yc-rfs/page.tsx (server - metadata still works!)
export const metadata: Metadata = { title: "..." }
```
**Files affected**: `app/yc-rfs/layout.tsx` (new), `app/landscape/page.tsx`

---

### Next.js Dev Server Lock File Prevents Restart (2026-02-11)
**Context**: Dev server was stuck/slow, needed to restart
**Issue**: `npm run dev` failed with "Unable to acquire lock at .next/dev/lock"
**Solution**: Force kill the old process and remove the stale lock file
**Why**: When the dev server doesn't shut down cleanly (kill vs graceful exit), the lock file persists and blocks new instances.
**Code Pattern**:
```bash
# Find and kill the old process
lsof -i :3000 -P -t | xargs kill -9
# Remove stale lock
rm -f .next/dev/lock
# Restart
npm run dev
```
**Note**: Always try `kill` before `kill -9`. The lock file is at `.next/dev/lock`.

---

### Database Migrations Not Applied — Schema/DB Mismatch (2026-02-12)
**Context**: Signup failed with "Failed to create account. Please try again." — a generic 500 error
**Mistake**: Assumed all database migrations had been applied. The Drizzle schema defined columns and tables that didn't exist in the actual Supabase database.
**Root cause**: Migration files existed in `drizzle/migrations/` but were never run against the database. The error surfaced as `column "password_hash" does not exist`, then `relation "user_profiles" does not exist`.
**Solution**: Applied all missing migrations manually via SQL:
1. Added `password_hash`, `password_reset_token`, `password_reset_expires` to `users`
2. Created 6 missing tables: `comments`, `comment_upvotes`, `user_profiles`, `user_saved_problems`, `problem_engagements`, `problem_upvotes`
3. Added ~12 columns to `problems` (drafts, submission metadata, creator launch comments)
4. Updated status constraint (old values like `looking_for_builders` → `published`)
**Debugging approach**: Always check server logs for the ACTUAL error — the generic catch-all message hides the real cause. Use `curl` to hit the API directly and read the server output.
**Code Pattern**:
```bash
# Quick way to check what tables/columns actually exist
export $(grep -v '^#' .env.local | xargs) && node -e "
const postgres = require('postgres');
const sql = postgres(process.env.DATABASE_URL);
sql\`SELECT tablename FROM pg_tables WHERE schemaname = 'public'\`.then(console.log).then(() => sql.end());
"

# Check columns on a specific table
export $(grep -v '^#' .env.local | xargs) && node -e "
const postgres = require('postgres');
const sql = postgres(process.env.DATABASE_URL);
sql\`SELECT column_name FROM information_schema.columns WHERE table_name = 'users'\`.then(console.log).then(() => sql.end());
"
```
**Files affected**: Database (Supabase), all auth-related API routes

---

### Drizzle Config Doesn't Auto-Load .env.local (2026-02-12)
**Context**: Running `npm run db:push` (drizzle-kit push) failed with "Either connection url or host, database are required"
**Mistake**: Expected `drizzle.config.ts` to read `.env.local` automatically
**Solution**: Load env vars manually before running drizzle-kit
**Why**: Drizzle-kit doesn't use Next.js's env loading — it's a standalone CLI tool
**Code Pattern**:
```bash
# ❌ Fails - drizzle-kit can't see .env.local
npm run db:push

# ✅ Works - load env first
export $(grep -v '^#' .env.local | xargs) && npx drizzle-kit push
```
**Note**: `drizzle-kit push` is also interactive (asks about truncating tables) — may need to pipe `yes` or handle prompts

---

### Status Constraint Migration Requires Data Update First (2026-02-12)
**Context**: Updating the `problems` status CHECK constraint to add new values
**Issue**: Existing rows had old status values (`looking_for_builders`) not in the new constraint
**Solution**: Must update data BEFORE adding the new constraint, all in one transaction
**Why**: PostgreSQL validates ALL existing rows when adding a CHECK constraint
**Code Pattern**:
```sql
-- Must be in a transaction
BEGIN;
  ALTER TABLE problems DROP CONSTRAINT problems_status_check;
  UPDATE problems SET status = 'published' WHERE status IN ('looking_for_builders', 'in_progress', 'completed');
  ALTER TABLE problems ADD CONSTRAINT problems_status_check CHECK (status IN ('draft', 'pending_review', 'approved', 'published', 'rejected', 'archived', 'being_built', 'solved'));
COMMIT;
```

---

### Missing Props Silently Break Features (2026-02-14)
**Context**: CommentsSection component rendered without `currentUserId` prop on the problem detail page
**Mistake**: Parent component (`ProblemDetailPage`) had `user` from `useAuth()` but never passed `user?.id` to `<CommentsSection>`
**Consequence**: `canEdit`, `canDelete`, and `isAuthor` were always `false` — no user could edit or delete their own comments. Feature appeared to work (no errors) but was completely broken.
**Solution**: Added `currentUserId={user?.id}` to the CommentsSection JSX
**Why**: Optional props that default to `undefined` produce no error when missing — the component renders fine, it's the *behavior* that's broken. These are the hardest bugs to catch.
**Lesson**: After adding any component that depends on auth state, always verify the auth-related props are being passed from the parent.
**Files affected**: `components/problem-detail-page.tsx`

---

### UI-Only State Updates Without Server Persistence (2026-02-14)
**Context**: Feed upvote button toggled local state but never called the API
**Mistake**: `handleUpvote` in `feed-list.tsx` only checked auth (`requireAuth()`) and returned a boolean. `FeedProblemCard` used that boolean to flip local state, but no `fetch()` call was ever made to `POST /api/problems/[id]/upvote`.
**Consequence**: Upvotes appeared to work (button toggled, count changed) but vanished on page refresh. The API route existed and was fully functional — it was never called.
**Solution**: Changed `handleUpvote` to be async, call the API, and return the server response. `FeedProblemCard` now does optimistic update immediately, then syncs with server response (or reverts on failure).
**Why**: When building features incrementally, the UI component and API route can be built separately. If nobody wires them together, the feature looks complete but is broken.
**Lesson**: After building any user action that should persist (upvote, save, follow), always verify the API call is actually being made — not just the auth check.
**Files affected**: `components/feed-list.tsx`, `components/feed-problem-card.tsx`, `components/feed-sections.tsx`

---

### CSS transform: scale() Creates Ghost Space in Layouts (2026-02-14)
**Context**: Resizing react-tweet embeds to be proportionate to other cards on problem detail page
**Mistake**: Used `transform: scale(0.75)` with `origin-top-left` to shrink the tweet
**Issue**: CSS transforms don't affect layout flow — the container keeps its original height, creating empty "ghost space" below the scaled element
**Solution**: Use CSS variable overrides instead of scale transforms for react-tweet:
```css
.tweet-compact .react-tweet-theme {
  --tweet-body-font-size: 0.8rem;
  --tweet-header-font-size: 0.7rem;
  --tweet-actions-font-size: 0.7rem;
  --tweet-container-margin: 0;
}
```
**Why**: CSS variables change the actual rendered size (no ghost space), while `transform: scale()` only visually shrinks the element without changing its layout box.
**Files affected**: `app/globals.css`, `components/tweet-embeds-section.tsx`

---

### Header Compact Variant for Narrow Pages (2026-02-14)
**Context**: Submit page form uses `max-w-3xl` but full header has 6+ nav links at `max-w-7xl` — everything got cramped
**Mistake**: Just changed header `maxWidth` to `max-w-3xl` without adjusting content — all links + logo text + avatar crammed into narrow space
**Solution**: Added `compact` prop to Header component:
- Logo: icon only (hide "OpenQuest" text)
- Nav: Group Accelerators/VCs/Fellowships into "Explore" dropdown
- Keep only Browse and How it works as standalone links
- Remove Categories link (just an anchor to homepage)
**Why**: Different pages have different content widths. The header needs to adapt its content density, not just its max-width.
**Code Pattern**:
```tsx
// Narrow page (submit form)
<Header compact hideSubmitButton maxWidth="max-w-3xl" />

// Full page (home, feed)
<Header />  // defaults: compact=false, maxWidth="max-w-7xl"
```
**Files affected**: `components/header.tsx`, `components/problem-submit-form.tsx`

---

### Supabase Connection Pool Saturation (2026-02-14)
**Context**: Needed to insert a missing launch comment via a script while dev server was running
**Issue**: `MaxClientsInSessionMode` error — dev server consumed all available Supabase pooler connections
**Solution**: Use transaction pooler (port 6543) instead of session pooler (port 5432) with `max: 1`
**Why**: Transaction pooler allows connection sharing and has higher limits. Session pooler assigns a dedicated connection per client.
**Code Pattern**:
```javascript
// Replace port 5432 with 6543 in DATABASE_URL
const connectionString = process.env.DATABASE_URL.replace(':5432/', ':6543/');
const sql = postgres(connectionString, { max: 1 });
```
**Note**: Supabase REST API keys may fail with "Invalid API key" — direct postgres connection via transaction pooler is more reliable for scripts.

---

### Optimistic Updates Need Rollback on Failure (2026-02-14)
**Context**: Implementing server-persisted upvotes in the feed
**Pattern**: Save the previous state before updating, then revert if the server call fails
**Why**: Users expect instant feedback, but the server is authoritative. Optimistic updates provide both.
**Code Pattern**:
```typescript
// 1. Save previous state
const wasUpvoted = upvoted

// 2. Optimistic update
setUpvoted(!wasUpvoted)
setUpvoteCount(wasUpvoted ? count - 1 : count + 1)

// 3. Call server
const result = await onUpvote()
if (result === null) {
  // 4a. Revert on failure
  setUpvoted(wasUpvoted)
  setUpvoteCount(count)  // original count
  return
}
// 4b. Sync with server truth
setUpvoted(result.hasUpvoted)
setUpvoteCount(result.upvoteCount)
```
**Key insight**: The server response is always the source of truth — use it to correct any drift between optimistic state and reality.
**Files affected**: `components/feed-problem-card.tsx`

---

### Pillar Page Replication is Fast With Reference Files (2026-02-16)
**Context**: Building the Residencies pillar page from scratch by replicating Accelerators architecture
**Approach**: Read all reference files first, then create parallel structure with ~70% code reuse
**Result**: Complete pillar page (data, themes, hub, detail, focus, nav integration, sitemap) built in one session with zero errors
**Process**:
1. Created data layer: `data/residencies/index.ts`, `vc-backed.ts`, `community.ts` (9 programs)
2. Read `lib/accelerator-themes.ts` as reference → Created `lib/residency-themes.ts` with same pattern
3. Read `app/accelerators/` pages as reference → Created parallel `app/residencies/` structure:
   - `layout.tsx` (SEO metadata)
   - `page.tsx` (hub with AnimatedStats, CategoryInfographic, EntityQuickLinks)
   - `[slug]/page.tsx` (detail with generateStaticParams, generateMetadata, JSON-LD)
   - `focus/[slug]/page.tsx` (focus aggregation with related areas)
4. Integrated with `components/header.tsx` (nav dropdown) and `components/footer.tsx` (Explore section)
5. Updated `app/sitemap.ts` to include all residency pages
6. Type-checked: `npx tsc --noEmit` → 0 errors

**Key insights**:
- Reading reference files BEFORE writing saves massive time — copied structure, adapted names/gradients/icons
- The 3-level page hierarchy (hub → detail → focus) is consistent enough to replicate but flexible enough to customize
- Most code differences are just name changes (`Accelerator` → `Residency`, `accelerator` → `residency`)
- Theme utility files follow identical pattern: FOCUS_COLORS → CATEGORY_META → interfaces → helper functions
- All pillar pages share the same components: AnimatedStats, CategoryInfographic, EntityQuickLinks

**What was different per pillar**:
- Gradient colors (`from-violet-500/5` for residencies vs `from-blue-500/5` for accelerators)
- Hero icon (Home for residencies, Zap for accelerators)
- Category metadata (VC-backed vs community for residencies; generalist vs industry-specialized for accelerators)
- Field names in data (e.g., residencies have `isLiveIn` boolean, accelerators don't)

**Files read as reference**: `lib/accelerator-themes.ts`, `app/accelerators/layout.tsx`, `app/accelerators/page.tsx`, `app/accelerators/[slug]/page.tsx`, `app/accelerators/focus/[slug]/page.tsx`
**Files created**: 9 files total (3 data, 1 theme util, 4 pages, 2 integration points)

---

### Program Audit: Research Before Adding (2026-02-16)
**Context**: User provided list of 35 popular startup programs; needed to check which were missing, categorize, and verify active status
**Challenge**: Many programs exist but may be inactive, discontinued, or misclassified
**Approach**: Comprehensive web research with parallel agents, then user clarification on edge cases
**Process**:
1. **Audit existing data** (Explore agent): Found 47 fellowships, 16 accelerators, 9 residencies already in system
2. **Research missing programs** (2 parallel general-purpose agents): 19 programs across 2 batches
   - For each: Check website, recent cohorts, Twitter/LinkedIn, application status, funding terms
3. **Categorize using criteria**:
   - **Accelerator**: Structured program, 0→1 stage, cohort-based, curriculum, demo day
   - **Fellowship**: Grant-based, exploration/research, less structured, pre-commitment
   - **Residency**: Workspace + community, -1→0 stage, light structure, focus on exploration
4. **Validate active status**: Check for recent cohorts (2024-2026), active applications, or official announcements
5. **Ask user for edge case decisions**: Inactive programs, India-focused, borderline cases

**Results**:
- 12 already in system
- 5 inactive/discontinued (OpenAI Converge, Pioneer, Buildspace, Nights & Weekends, Founders Fellowship)
- 2 edge cases user skipped (Unshackled VC, Accel Atoms)
- 12 new programs added:
  - 8 accelerators: LAUNCH, NEO, AngelPad, Founder University, The Mint, Conviction Embed, Betaworks AI Camp, AI Grant
  - 3 residencies: AI2 Incubator, Founders Inc, The Residency
  - 1 fellowship: Soma Capital Fellows

**Key research signals**:
- **Active**: Recent cohorts on website, active Twitter/LinkedIn posts, open applications
- **Inactive**: No cohorts since 2023, "paused" messaging, founders moved to other projects, Twitter dormant
- **Categorization clues**:
  - Accelerators: "demo day", "cohort", "curriculum", "batch", equity percentage (5-10%)
  - Fellowships: "grant", "no equity", "explore", "research", uncapped SAFE (if investment at all)
  - Residencies: "workspace", "live-in", "community", "pre-idea", "explore", lighter equity (0-5%)

**Files affected**: `data/accelerators/west-top-tier.ts`, `data/residencies/vc-backed.ts`, `data/residencies/community.ts`, `data/fellowships/tech-startup.ts`

---

### Data-Only Additions Auto-Update All Pages (2026-02-16)
**Context**: Adding 12 new programs across accelerators, residencies, and fellowships
**Discovery**: Appending entries to data files automatically surfaces them on hub, detail, focus, and sitemap pages — ZERO page code changes needed
**Why it works**:
1. **Data aggregation**: Each `data/[pillar]/index.ts` re-exports `allX` aggregate array (e.g., `allAccelerators`)
2. **Static generation**: Detail pages use `generateStaticParams()` which maps over `allX` to create all routes
3. **Focus computation**: Theme utilities (`lib/[pillar]-themes.ts`) compute focus areas from tags in `allX`
4. **Sitemap**: `app/sitemap.ts` maps over `allX` to generate all URLs

**Process**:
1. Read existing data file to match exact type shape
2. Append new entry with all required fields (id, slug, name, tags, funding, etc.)
3. Type-check: `npx tsc --noEmit`
4. Start dev server: `npm run dev`
5. Visit new pages — they exist automatically!

**What auto-updates**:
- Hub page grid (`/accelerators`) — new entry appears
- Detail page (`/accelerators/new-program`) — auto-generated via `generateStaticParams`
- Focus pages (`/accelerators/focus/ai`) — new entry appears if tags match
- Sitemap (`sitemap.xml`) — new URLs added
- Stats on hub page — counts update

**What does NOT auto-update**:
- Category metadata (only if adding a NEW category)
- Navigation links (only if adding a NEW pillar)

**Type safety ensures correctness**: TypeScript validates all required fields; if you forget `tags` or `slug`, it won't compile
**Files affected per addition**: Only 1 file (`data/[pillar]/[subcategory].ts`) — everything else is automatic

**Example**: Added `ai-grant` accelerator to `data/accelerators/west-top-tier.ts` → automatically appeared on:
- `/accelerators` (hub grid)
- `/accelerators/ai-grant` (detail page with full info)
- `/accelerators/focus/ai` (focus aggregation)
- `/accelerators/focus/climate-tech` (focus aggregation)
- `sitemap.xml` (new entry)

**Key insight**: This architecture scales beautifully — adding program #100 is exactly as easy as adding program #10. The complexity is in the initial pillar setup, not in ongoing additions.

---

### Account Enumeration Prevention in Signup (2026-02-18)
**Context**: Pre-ship hardening — standardizing auth endpoint responses
**Issue**: Original signup endpoint returned different messages for "email already exists" vs "account created" — an attacker could enumerate valid email addresses
**Solution**: Standardized signup response to return the same structure regardless of whether the account already exists
**Why**: Account enumeration is a real attack vector; OWASP recommends identical responses for exists/not-exists
**Key insight**: Auth endpoints should be paranoid about information leakage — even error message differences reveal information
**Files affected**: `app/api/auth/signup/route.ts`

---

### Stale Response Race Conditions in Feed (2026-02-18)
**Context**: User changes feed filters/sort rapidly → multiple in-flight API requests → slowest one wins → shows wrong data
**Issue**: No request cancellation or ordering — whichever fetch resolved last would overwrite state, regardless of whether it was the most recent request
**Solution**: Added request-ID guards — each fetch increments a counter; only the response matching the latest counter updates state. Earlier responses are silently discarded.
**Why**: This is a classic race condition in client-side data fetching. AbortController can help too, but request-ID guards are simpler and handle the "display" race even with concurrent requests.
**Code Pattern**:
```typescript
const requestIdRef = useRef(0);
const fetchData = async (filters) => {
  const thisId = ++requestIdRef.current;
  const data = await fetch(...);
  if (thisId !== requestIdRef.current) return; // Stale
  setData(data);
};
```
**Files affected**: `components/feed-list.tsx`

---

### Autosave Shouldn't Trigger Full List Refetch (2026-02-18)
**Context**: Draft autosave was refetching the entire drafts list on every save (every 5-30s)
**Issue**: Unnecessary network churn, UI flicker, and wasted bandwidth — the list hasn't changed, only the current draft's content
**Solution**: Autosave now only PATCHes the current draft and updates local state — no full list refetch
**Why**: Autosave is a frequent operation; it should be as lightweight as possible. Only refetch the list on explicit user actions (create new, delete, navigate away).
**Files affected**: Draft-related components, `app/api/problems/drafts/`

---

### Server-Hydrate SEO-Critical Pages (2026-02-18)
**Context**: Problem detail pages were rendering placeholder/loading state first, then fetching real content client-side
**Issue**: Search engine crawlers see the placeholder HTML, not the actual problem content — bad for SEO indexing
**Solution**: Server-render the full problem content in the initial HTML response — no client-side fetch for the primary content
**Why**: Google and other crawlers may not wait for client-side JS to execute. The first HTML response should contain all SEO-relevant content.
**Key insight**: For any page you want indexed, the first render must contain real content, not spinners or skeleton UI.

---

### Forgot-Password Base URL Must Be Dynamic (2026-02-18)
**Context**: Password reset emails were generating links with hardcoded `localhost:3000` base URL
**Issue**: Reset links didn't work in production because the base URL was wrong
**Solution**: Use `NEXT_PUBLIC_APP_URL` environment variable for the base URL in email generation
**Why**: Email content is generated server-side but clicked client-side — the base URL must match the actual deployment domain
**Files affected**: `lib/email/` templates, forgot-password API route

---

### Optimistic Concurrency Prevents Silent Draft Overwrites (2026-02-18)
**Context**: Two tabs open on same draft — both edit, both save — last save silently overwrites first
**Solution**: Added `submissionVersion` field to drafts. PATCH requires version match; mismatches return 409 `VERSION_CONFLICT` with the latest version
**Why**: Without concurrency control, users lose work without knowing. The 409 response lets the client show a conflict UI and let the user decide.
**Code Pattern**:
```typescript
// Server checks version match
if (draft.submissionVersion !== body.submissionVersion) {
  return NextResponse.json(
    { error: 'VERSION_CONFLICT', latestVersion: draft.submissionVersion },
    { status: 409 }
  );
}
// Increment version on successful update
await db.update(drafts).set({
  ...data,
  submissionVersion: draft.submissionVersion + 1,
});
```
**Files affected**: Draft PATCH API route, problem-submit-form component

---

### Source Model Migration with Compatibility Fallback (2026-02-18)
**Context**: Moving from author-name flags (`isYCRFS`, `isConviction`, etc.) to a proper many-to-many source model
**Approach**: New `source_institutions` + `problem_sources` tables, but search/sections filtering falls back to legacy author-name mapping if join-table data isn't populated yet
**Why**: Big-bang migrations are risky — if backfill is incomplete, features break. Compatibility-first approach means both paths work during transition.
**Migration**: `0014_add_problem_source_model.sql` — creates tables, seeds known VC institutions, backfills primary source links
**Key insight**: When migrating data models, always support both old and new patterns during transition. Remove legacy path only after verifying full backfill.
