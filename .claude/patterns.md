# Preferred Patterns & Anti-Patterns

Our established approaches and what to avoid.

---

## Authentication

### ✅ Preferred: Passwordless Admin Auth with Admin IDs
**Use when**: Admin authentication
**Why**: Simpler than passwords, no password reset flow needed, secure enough for admin access
**Example**:
```typescript
// Admin ID format: admin_[16 random hex chars]
const adminId = `admin_${crypto.randomBytes(8).toString('hex')}`;
// Example: admin_a1b2c3d4e5f6g7h8
```

### ❌ Anti-Pattern: Storing Admin Passwords
**Avoid because**: Adds complexity, password reset flows, security burden
**Instead do**: Use admin ID authentication - share ID securely out-of-band

---

## Cookie Management

### ✅ Preferred: Consistent Cookie Configuration
**Use when**: Setting authentication cookies
**Why**: Ensures cookies work across all routes and scenarios
**Example**:
```typescript
cookieStore.set('admin_session', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
});
```

### ❌ Anti-Pattern: Restrictive Cookie Paths
**Avoid because**: Causes cookies to not be sent to API routes
**Instead do**: Use `path: '/'` for auth cookies

---

## Database Queries

### ✅ Preferred: Drizzle ORM with Type Safety
**Use when**: All database operations
**Why**: Type-safe, catches errors at compile time, good DX
**Example**:
```typescript
const problems = await db
  .select()
  .from(problems)
  .where(eq(problems.status, 'approved'))
  .orderBy(desc(problems.createdAt));
```

### ✅ Preferred: ISO Strings for Date Comparisons
**Use when**: Comparing dates in SQL queries
**Why**: Postgres driver expects strings, not Date objects
**Example**:
```typescript
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

// Use .toISOString()
sql`${problems.createdAt} > ${thirtyDaysAgo.toISOString()}`
```

### ❌ Anti-Pattern: Raw Date Objects in SQL
**Avoid because**: Causes runtime errors
**Instead do**: Always call `.toISOString()` on dates

---

## Route Organization

### ✅ Preferred: Route Groups for Auth Boundaries
**Use when**: Some routes need auth, others don't (like login pages)
**Why**: Clean separation without affecting URLs
**Example**:
```
app/admin/
├── (authenticated)/     ← Protected routes
│   ├── layout.tsx       ← Auth check here
│   └── dashboard/
├── login/               ← Public
└── setup/               ← Public
```

### ❌ Anti-Pattern: Auth Check in Root Layout
**Avoid because**: Applies auth to ALL routes including login
**Instead do**: Use route groups to scope layouts

---

## UI Components

### ✅ Preferred: shadcn/ui Components
**Use when**: Building UI
**Why**: Consistent styling, accessible, customizable
**Example**:
```typescript
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell } from "@/components/ui/table"
```

### ✅ Preferred: Check Component Exists Before Using
**Use when**: Adding new shadcn/ui components
**Why**: shadcn/ui is copy-paste - components only exist if added
**Process**:
1. Check if `components/ui/[component].tsx` exists
2. If not, create it with standard shadcn/ui implementation
3. Use class-variance-authority for variants

---

## API Routes

### ✅ Preferred: Session Check at Start
**Use when**: Any protected API route
**Why**: Fail fast, consistent auth pattern
**Example**:
```typescript
export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // ... rest of handler
}
```

### ✅ Preferred: Contextual Error Payloads with Incident IDs
**Use when**: Returning errors from browse/search/write APIs
**Why**: Enables tracing failures across client ↔ server; structured payloads help frontend show meaningful messages
**Example**:
```typescript
import { reportIncident } from '@/lib/incident';

try {
  // ... API logic
} catch (error) {
  const incidentId = reportIncident('sections-api', error);
  return NextResponse.json(
    { error: 'Failed to load sections', incidentId },
    { status: 500 }
  );
}
```

### ❌ Anti-Pattern: Generic 500 with No Context
**Avoid because**: `{ error: 'Internal server error' }` is useless for debugging
**Instead do**: Include incident ID and descriptive error message

---

## Redirects

### ✅ Preferred: Hard Redirects After Auth Changes
**Use when**: After login/logout
**Why**: Ensures cookies are properly sent on next request
**Example**:
```typescript
// After successful login
window.location.href = '/admin/dashboard';

// NOT router.push() - cookies may not be available immediately
```

### ❌ Anti-Pattern: Client Router After Setting Cookies
**Avoid because**: HTTP-only cookies not immediately available
**Instead do**: Use `window.location.href` for hard reload

---

## Deferred Authentication (Form-First, Auth-Later)

### ✅ Preferred: Let Users Fill Forms Before Auth Check
**Use when**: Engagement actions with forms (Build, Invest, Join Team)
**Why**: Better UX - users can explore/commit before friction of login
**Flow**:
1. User clicks action → Modal opens immediately (no auth check)
2. User fills form → Clicks submit
3. If not authenticated: Save form data to localStorage, show login prompt
4. User logs in → Returns to page → Confirmation modal appears
5. User confirms → Action completes with saved data

**Example**:
```typescript
// In modal's handleSubmit
if (!isAuthenticated && onAuthRequired) {
  onAuthRequired(formData);  // Save to localStorage + show login
  onClose();
  return;
}
onSubmit(formData);  // Normal submit
```

### ❌ Anti-Pattern: Auth Check Before Opening Modal
**Avoid because**: Adds friction before user can even see the form
**Instead do**: Check auth on submit, save pending data if needed

---

## Conditional Field Rendering

### ✅ Preferred: Animated Progressive Disclosure
**Use when**: Form fields that depend on other selections
**Why**: Reduces overwhelm, focuses user on relevant fields
**Example**:
```tsx
{showProgressField && (
  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
    <Label>What have you accomplished so far?</Label>
    <Textarea ... />
  </div>
)}
```

### ✅ Preferred: Dynamic Placeholders Based on Context
**Use when**: Same field has different meanings based on selections
**Why**: Guides users with context-appropriate prompts
**Example**:
```typescript
const placeholder = {
  idea: "What's your hypothesis?",
  research: "What are you learning?",
  building: "What makes it different?",
  launched: "How does it work?",
}[stage];
```

---

## Form Character Limits

### ✅ Preferred: Live Character Counter with Max Limit
**Use when**: Textarea fields with length limits
**Why**: Users can see remaining space, prevents truncation
**Example**:
```tsx
<div className="flex justify-between">
  <Label>Description</Label>
  <span className="text-xs text-muted-foreground">{value.length}/500</span>
</div>
<Textarea
  value={value}
  onChange={(e) => {
    if (e.target.value.length <= 500) setValue(e.target.value);
  }}
/>
```

---

## Social Link Inputs

### ✅ Preferred: Icon-Prefixed Inputs with Inline SVG
**Use when**: Social media profile inputs (LinkedIn, Twitter)
**Why**: Instant recognition, avoids lucide-react deprecation issues
**Example**:
```tsx
<div className="relative">
  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      {/* LinkedIn or Twitter path */}
    </svg>
  </div>
  <Input placeholder="linkedin.com/in/..." className="pl-10" />
</div>
```

### ❌ Anti-Pattern: Using Deprecated lucide-react Icons
**Avoid because**: `Linkedin` and `Twitter` icons are deprecated
**Instead do**: Use inline SVG for social icons

---

## Comments Threading

### ✅ Preferred: Self-Referencing parentId for Threading
**Use when**: Building threaded comments/replies
**Why**: Simple, efficient, allows arbitrary nesting (limit in UI)
**Example**:
```typescript
// Schema
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  parentId: uuid('parent_id'), // null = top-level, set = reply
  // ...
});

// Fetch: top-level first, then replies
const topLevel = await db.select().from(comments)
  .where(isNull(comments.parentId));
const replies = await db.select().from(comments)
  .where(sql`${comments.parentId} IS NOT NULL`);

// Build tree in code
const repliesMap = new Map<string, Comment[]>();
for (const reply of replies) {
  const parentId = reply.parentId!;
  if (!repliesMap.has(parentId)) repliesMap.set(parentId, []);
  repliesMap.get(parentId)!.push(reply);
}
```

### ❌ Anti-Pattern: Storing Full Thread in JSON
**Avoid because**: Hard to query, can't easily fetch/update individual comments
**Instead do**: Use relational parentId with tree-building in code

---

## Time-Limited Edit Windows

### ✅ Preferred: Hacker News Style 2-Hour Edit Window
**Use when**: User-generated content that may need corrections
**Why**: Allows fixing typos without enabling revisionism on old content
**Example**:
```typescript
// Constants
const EDIT_WINDOW_MS = 2 * 60 * 60 * 1000; // 2 hours

// Check permission
const canEdit = currentUserId === comment.authorId
  && (Date.now() - new Date(comment.createdAt).getTime()) < EDIT_WINDOW_MS;

// UI feedback
export function getEditTimeRemaining(createdAt: Date): string | null {
  const remaining = EDIT_WINDOW_MS - (Date.now() - createdAt.getTime());
  if (remaining <= 0) return null;
  const minutes = Math.floor(remaining / 60000);
  return minutes < 60 ? `${minutes}m left to edit` : `${Math.floor(minutes/60)}h left`;
}
```

---

## Soft Delete with Reply Protection

### ✅ Preferred: Only Delete Comments Without Replies
**Use when**: Threaded content where replies provide context
**Why**: Deleting a parent orphans children; soft delete preserves thread structure
**Example**:
```typescript
// Can only delete if no replies
const canDelete = currentUserId === comment.authorId
  && (!comment.replies || comment.replies.length === 0);

// Soft delete (mark, don't remove)
await db.update(comments)
  .set({ isDeleted: true, deletedAt: new Date() })
  .where(eq(comments.id, commentId));
```

### ❌ Anti-Pattern: Hard Delete with Cascading
**Avoid because**: Loses reply context, confuses readers
**Instead do**: Soft delete or show "[deleted]" placeholder

---

## Comment Engagement Badges

### ✅ Preferred: Badges Based on User's Relationship to Problem
**Use when**: Showing context about commenters (Author, Builder, Investor)
**Why**: Helps readers understand commenter's perspective and credibility
**Example**:
```typescript
interface CommentAuthor {
  id: string;
  name: string;
  engagement?: {
    isProblemAuthor?: boolean;
    isBuilder?: boolean;
    isInvestor?: boolean;
    isTeamApplicant?: boolean;
  };
}

// In API: Check relationships
const engagement: CommentAuthor['engagement'] = {};
if (commentAuthorId === problemAuthorId) {
  engagement.isProblemAuthor = true;
}
// TODO: Check problem_engagements table for builder/investor status
```

### ❌ Anti-Pattern: Badges Based on Global User Status
**Avoid because**: Context matters - being a builder on problem A doesn't mean you're building problem B
**Instead do**: Always scope badges to the specific problem being discussed

---

## Institutional Authors (YC, Weekend Fund, Conviction, ARK, Pathlight)

### ✅ Preferred: InstitutionalAuthor/InstitutionalLogo Components
**Use when**: Displaying problems from VC partner sources
**Why**: Clean, consistent branding; avoids broken avatar images; shows year/quarter
**Components**:
- `InstitutionalAuthor` - Full display with logo + name + year (for detail pages)
- `InstitutionalLogo` - Small inline logo (for cards/feeds)

**Supported Types**:
| Type | Source | Color Theme |
|------|--------|-------------|
| `yc` | Y Combinator RFS | Orange |
| `weekend-fund` | Weekend Fund RFS | Purple |
| `conviction` | Conviction VC | Blue |
| `ark` | ARK Invest Big Ideas | Cyan |
| `pathlight` | Pathlight Ventures | Emerald |

**Example**:
```tsx
// In problem detail page - check all VC types
{problem.isYCRFS ? (
  <InstitutionalAuthor type="yc" quarter={problem.ycQuarter} size="md" />
) : problem.isWeekendFundRFS ? (
  <InstitutionalAuthor type="weekend-fund" year={problem.wfPublishedDate} size="md" />
) : problem.isConviction ? (
  <InstitutionalAuthor type="conviction" year={problem.convictionPublishedDate} size="md" />
) : problem.isARK ? (
  <InstitutionalAuthor type="ark" year={problem.arkPublishedDate} size="md" />
) : problem.isPathlight ? (
  <InstitutionalAuthor type="pathlight" year={problem.pathlightPublishedDate} size="md" />
) : (
  // Regular author avatar
)}

// In problem card
{problem.author.isYC ? (
  <InstitutionalLogo type="yc" />
) : problem.author.isWeekendFund ? (
  <InstitutionalLogo type="weekend-fund" />
) : problem.author.isARK ? (
  <InstitutionalLogo type="ark" />
) : (
  <img src={problem.author.avatar} />
)}
```

### ❌ Anti-Pattern: Using Avatar Images for Institutional Authors
**Avoid because**: Institutional authors don't have real avatars, causes broken images
**Instead do**: Check `isYC`/`isWeekendFund`/`isARK`/`isConviction`/`isPathlight` flags and render appropriate logo component

---

## Source Filtering (VC Partners vs Community)

### ✅ Preferred: Helper Function for VC Problem Detection
**Use when**: Filtering between VC-sourced and community-submitted problems
**Why**: Centralizes logic, handles all VC types consistently
**Example**:
```typescript
function isVCProblem(problem: any): boolean {
  return (
    problem.isYCRFS ||
    problem.isWeekendFundRFS ||
    problem.isConviction ||
    problem.isARK ||
    problem.isPathlight ||
    problem.author?.isYC ||
    problem.author?.isWeekendFund ||
    problem.author?.isConviction ||
    problem.author?.isARK ||
    problem.author?.isPathlight
  )
}

// Usage in filter
if (selectedSource === "VC Partners") {
  filtered = filtered.filter((problem) => isVCProblem(problem))
} else if (selectedSource === "Community") {
  filtered = filtered.filter((problem) => !isVCProblem(problem))
}
```
**Files**: `components/feed-list.tsx`, `contexts/feed-filter-context.tsx`

### ❌ Anti-Pattern: Checking Only Some VC Flags
**Avoid because**: New VC sources get added over time; incomplete checks cause inconsistent filtering
**Instead do**: Use centralized `isVCProblem()` helper and update it when adding new VC sources

---

## Adding New VCs

### ✅ Preferred: Use VC Registry + Scaffolding CLI
**Use when**: Adding a new VC partner with RFS problems
**Why**: Ensures all required files are created, prevents missing imports
**Process**:
```bash
# 1. Run the scaffolding CLI
npm run add-vc

# 2. Fill in the generated files (thesis, problems)

# 3. Validate everything is connected
npm run validate:vc
```

### ✅ Preferred: Generic VCBadge Component
**Use when**: Displaying VC badges on problem cards
**Why**: Single component, config-driven, no duplication
**Example**:
```tsx
import { VCBadge, VCDateTag, detectVCFromFlags } from '@/components/vc-badge'

// Detect VC type from problem flags
const vcType = detectVCFromFlags({ isYCRFS: problem.isYCRFS, ... })

// Render badge
{vcType && <VCBadge vc={vcType} variant="compact" />}
```

### ❌ Anti-Pattern: Creating Separate Badge Components Per VC
**Avoid because**: Duplicates code, easy to forget when adding new VCs
**Instead do**: Use generic `<VCBadge vc="yc" />` with registry configuration

---

## Text Overflow in Dynamic UX Copy

### ✅ Preferred: Constrain + Truncate Dynamic Text
**Use when**: Labels or tooltips include dynamic content (theme names, VC names)
**Why**: Prevents layout breaking with long strings
**Example**:
```tsx
// Truncate long theme names in stats labels
const label = themeName.length > 12
  ? `VCs on ${themeName.slice(0, 12)}…`
  : `VCs on ${themeName}`

// Add max-width and truncate to containers
<div className="max-w-[280px]">
  <span className="truncate" title={fullText}>
    {fullText}
  </span>
</div>

// For bubble text, use line-clamp
<span className="line-clamp-2 max-w-full overflow-hidden">
  {themeName}
</span>
```

### ❌ Anti-Pattern: Unbounded Dynamic Text
**Avoid because**: Long names break layouts, overflow containers
**Instead do**: Always add max-width, truncate, or line-clamp to dynamic content

---

## Empty States & UX Copy

### ✅ Preferred: Honest Counts with Consistent Messaging
**Use when**: Displaying counts alongside content (comments, followers, etc.)
**Why**: Fake content that contradicts counts creates confusion and erodes trust
**Example**:
```tsx
// Header shows accurate count
{totalComments > 0 ? `Discussion (${totalComments})` : "Discussion"}

// Empty state is simple and honest
{comments.length === 0 ? (
  <p className="text-sm text-muted-foreground">
    No comments yet. Be the first to share your thoughts.
  </p>
) : (
  // Real comments
)}
```

### ✅ Preferred: Single Clear CTA
**Use when**: Prompting user action (sign in, submit, etc.)
**Why**: Multiple CTAs compete for attention and create decision fatigue
**Example**:
```tsx
// ONE sign-in prompt at the top, not repeated at bottom
{!isAuthenticated && (
  <button onClick={onSignIn}>
    Sign in to join the discussion
  </button>
)}
```

### ❌ Anti-Pattern: Sample/Fake Content with Real Counts
**Avoid because**: "Discussion (0)" with visible sample comments is contradictory
**Instead do**: If count shows 0, show empty state - no fake samples

### ❌ Anti-Pattern: Repetitive CTAs
**Avoid because**: "Sign in to join" + "Sign in to start" is redundant and contradictory
**Instead do**: One clear, contextual call to action

---

## Header Variants for Different Page Widths

### ✅ Preferred: Compact Header for Narrow Content Pages
**Use when**: Page content is narrower than the default `max-w-7xl` (e.g., forms at `max-w-3xl`)
**Why**: Full header with 6+ nav links + logo text gets cramped in narrow layouts
**Example**:
```tsx
// Narrow page — icon-only logo, grouped nav, matched width
<Header compact hideSubmitButton maxWidth="max-w-3xl" />

// Full page — default behavior
<Header />
```
**What `compact` does**:
- Logo: icon only (hides "OpenQuest" text)
- Nav: Groups Accelerators/VCs/Fellowships into "Explore" dropdown
- Keeps Browse and How it works as standalone links
- Removes Categories link

### ❌ Anti-Pattern: Just Narrowing maxWidth Without Reducing Content
**Avoid because**: 6+ links + logo text + avatar in `max-w-3xl` = layout breakage
**Instead do**: Use `compact` prop to reduce content density alongside width

---

## Optimistic Updates with Server Sync

### ✅ Preferred: Optimistic Update → Server Call → Sync or Rollback
**Use when**: Any user action that should feel instant but must persist (upvotes, saves, follows)
**Why**: Users get immediate feedback; server remains source of truth
**Example**:
```typescript
const handleAction = async () => {
  // 1. Save previous state for rollback
  const previousState = currentState

  // 2. Optimistic UI update
  setCurrentState(newState)

  // 3. Server call
  const result = await fetch('/api/action', { method: 'POST' })
  if (!result.ok) {
    // 4a. Rollback on failure
    setCurrentState(previousState)
    return
  }
  // 4b. Sync with server truth
  const data = await result.json()
  setCurrentState(data.serverState)
}
```

### ❌ Anti-Pattern: UI-Only State Updates
**Avoid because**: Upvotes/saves that only toggle local state vanish on page refresh
**Instead do**: Always wire UI actions to their corresponding API endpoints

### ❌ Anti-Pattern: Waiting for Server Before UI Update
**Avoid because**: 200ms+ delay on every click feels sluggish
**Instead do**: Update UI immediately, then correct if server disagrees

---

## Adding New Pillar Pages (Accelerators, Fellowships, Residencies Pattern)

### ✅ Preferred: Replicate Existing Pillar Architecture
**Use when**: Creating a new "explore" section like Accelerators, Fellowships, or Residencies
**Why**: Maintains consistent UX, SEO, and data flow patterns across all program types
**Process**: (Residencies example - replicated from Accelerators in ~70% code reuse)

**Step 1: Create data layer**
```bash
# 1. Create data directory structure
mkdir -p data/residencies
touch data/residencies/index.ts
touch data/residencies/vc-backed.ts
touch data/residencies/community.ts
```

```typescript
// data/residencies/index.ts
export interface Residency {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: 'vc-backed' | 'community';
  tags: string[];
  funding?: string;
  equity?: string;
  duration: string;
  cohortSize?: string;
  location: string;
  isLiveIn: boolean;
  // ... other fields
}

export const allResidencies: Residency[] = [
  ...vcBackedResidencies,
  ...communityResidencies,
];

// Helper functions
export function getResidencyBySlug(slug: string): Residency | undefined {
  return allResidencies.find((r) => r.slug === slug);
}
```

**Step 2: Create theme utility** (Read reference file first!)
```bash
# Read the pattern from an existing pillar
# Read accelerator-themes.ts or fellowship-themes.ts as reference
```

```typescript
// lib/residency-themes.ts
// Copy structure from lib/accelerator-themes.ts and adapt:
// - FOCUS_COLORS (color mapping for tags/focus areas)
// - RESIDENCY_CATEGORY_META (category descriptions)
// - ResidencyFocusArea, ResidencyStats interfaces
// - slugifyResidencyFocus, getResidenciesByFocusTag, getResidencyFocusStats, etc.
```

**Step 3: Create page hierarchy** (Read reference files first!)
```bash
# Read existing pillar pages as reference
# Read app/accelerators/layout.tsx, page.tsx, [slug]/page.tsx, focus/[slug]/page.tsx

mkdir -p app/residencies/[slug] app/residencies/focus/[slug]
```

```typescript
// app/residencies/layout.tsx (SEO metadata)
export const metadata: Metadata = {
  title: 'Residencies | OpenQuest',
  description: 'Discover pre-idea residencies...',
  // ... OpenGraph, Twitter cards
};

// app/residencies/page.tsx (hub page - client component)
'use client'
// Uses: AnimatedStats, CategoryInfographic, EntityQuickLinks
// State: selectedFocus, showOpenOnly filters
// Gradient, hero icon, browse by category

// app/residencies/[slug]/page.tsx (detail page - server component)
export async function generateStaticParams() {
  return allResidencies.map((r) => ({ slug: r.slug }));
}
export async function generateMetadata({ params }) { ... }
// Brand color header, program info grid, tags, sections, JSON-LD

// app/residencies/focus/[slug]/page.tsx (focus aggregation - server component)
export async function generateStaticParams() {
  return getAllResidencyFocusSlugs().map((slug) => ({ slug }));
}
// Stats, program grid, related focus areas, JSON-LD
```

**Step 4: Integrate with navigation and sitemap**
```typescript
// components/header.tsx - Add to Resources dropdown
<DropdownMenuItem asChild>
  <Link href="/residencies">Residencies</Link>
</DropdownMenuItem>

// components/footer.tsx - Add to Explore links
{ name: "Residencies", href: "/residencies" }

// app/sitemap.ts - Add pages
import { allResidencies } from '@/data/residencies'
import { getAllResidencyFocusSlugs } from '@/lib/residency-themes'

const residencyPages = allResidencies.map((r) => ({ ... }))
const residencyFocusPages = getAllResidencyFocusSlugs().map((slug) => ({ ... }))
// Add to sitemap return array
```

**Step 5: Type-check and verify**
```bash
npx tsc --noEmit
npm run dev
# Visit /residencies, /residencies/[slug], /residencies/focus/[slug]
```

**Files to read as reference**:
- `lib/accelerator-themes.ts` — theme utility pattern
- `app/accelerators/layout.tsx` — layout metadata
- `app/accelerators/page.tsx` — hub page structure
- `app/accelerators/[slug]/page.tsx` — detail page + generateStaticParams
- `app/accelerators/focus/[slug]/page.tsx` — focus aggregation

**Key insight**: ~70% code reuse via copy-paste-adapt. The pattern is consistent enough to replicate quickly but flexible enough to customize per pillar.

---

## Adding Programs to Existing Pillars (Data-Only Pattern)

### ✅ Preferred: Add Entries to Data Files, Everything Else Auto-Updates
**Use when**: Adding new accelerators, fellowships, or residencies to existing pillar pages
**Why**: The architecture automatically surfaces new entries on hub, detail, focus, and sitemap pages — no page code changes needed
**Process**:

**Step 1: Read existing data file to match type shape**
```bash
# Example: adding a new accelerator
cat data/accelerators/west-top-tier.ts  # Check existing entries
```

**Step 2: Append new entry with all required fields**
```typescript
// data/accelerators/west-top-tier.ts
export const westTopTierAccelerators: Accelerator[] = [
  // ... existing entries
  {
    id: 'new-accelerator-2026',
    slug: 'new-accelerator',
    name: 'New Accelerator',
    tagline: 'One-line pitch',
    description: 'Full description...',
    category: 'generalist',  // or 'industry-specialized'
    tags: ['AI', 'B2B', 'Early Stage'],  // Used for focus areas
    funding: '$125K',
    equity: '7%',
    duration: '3 months',
    cohortSize: '10-15 teams',
    location: 'San Francisco',
    applicationDeadline: 'Rolling',
    status: 'open',  // or 'closed', 'rolling'
    website: 'https://...',
    applyUrl: 'https://...',
    founded: 2024,
    batchesPerYear: 2,
    summary: 'Why this program is unique...',
    sections: [
      { title: 'What You Get', bullets: [...] },
      { title: 'Ideal For', bullets: [...] },
    ],
    notableAlumni: ['Company A', 'Company B'],
    sourceLinks: [
      { title: 'Official Site', url: 'https://...' },
    ],
  },
];
```

**Step 3: Type-check**
```bash
npx tsc --noEmit
```

**What auto-updates** (no code changes needed):
- Hub page (`/accelerators`) — new entry appears in grid
- Detail page (`/accelerators/new-accelerator`) — auto-generated via `generateStaticParams`
- Focus pages (`/accelerators/focus/ai`, `/accelerators/focus/b2b`) — new entry appears in matching focus areas
- Sitemap (`sitemap.xml`) — new detail page + focus pages added
- Stats (`AnimatedStats` component) — counts update automatically

**What does NOT auto-update** (manual if needed):
- Category metadata (`ACCELERATOR_CATEGORY_META` in `lib/accelerator-themes.ts`) — only if adding a NEW category
- Navigation links — only if adding a NEW pillar entirely

**Program categorization criteria**:
- **Accelerator**: Structured program, 0→1 stage, cohort-based, curriculum, demo day (e.g., YC, Neo, AngelPad)
- **Fellowship**: Grant-based, exploration/research, less structured, pre-commitment (e.g., Thiel Fellowship, Soma Fellows)
- **Residency**: Workspace + community, -1→0 stage, light structure, focus on exploration (e.g., South Park Commons, AI2 Incubator)

**Validation before adding**:
1. Confirm the program is **active** (check website, recent cohorts, Twitter/LinkedIn activity)
2. Match the **category** (accelerator vs fellowship vs residency)
3. Find the right **subcategory file** (e.g., `tech-startup.ts` vs `research-science.ts`)
4. Include **all required fields** (read existing entries to see field names)
5. Use **tags** that already exist in the focus area taxonomy when possible (check hub page for existing tags)

**Example session**: Added 12 new programs (8 accelerators, 3 residencies, 1 fellowship) by:
- Reading existing data files to match type shapes
- Researching each program (funding, equity, duration, status)
- Appending entries to appropriate subcategory files
- Type-checking — zero errors
- No page code changes needed — everything auto-surfaced

**Files affected per addition**:
- `data/[pillar]/[subcategory].ts` — append new entry
- Everything else auto-updates via `allX` aggregates

---

## Shared DB-Backed Rate Limiting

### ✅ Preferred: Database-Backed Rate Limiting with Local Fallback
**Use when**: Auth endpoints (login, signup, forgot-password), draft updates, or any abuse-sensitive surface
**Why**: Works across multiple server instances; local fallback ensures availability if DB is slow
**Example**:
```typescript
import { checkRateLimit } from '@/lib/rate-limit';

const { allowed, remaining, retryAfter } = await checkRateLimit({
  key: `auth:login:${ip}`,
  limit: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
});

if (!allowed) {
  return NextResponse.json(
    { error: 'Too many attempts', retryAfter },
    { status: 429 }
  );
}
```
**Files**: `lib/rate-limit.ts`

### ❌ Anti-Pattern: Process-Local Rate Limiting Only
**Avoid because**: Each server instance tracks separately — attacker can bypass by hitting different instances
**Instead do**: Use shared state (DB-backed) with local fallback for resilience

---

## Optimistic Concurrency for Drafts

### ✅ Preferred: Version-Based Concurrency Control
**Use when**: Draft PATCH/update operations where multiple tabs or sessions may edit simultaneously
**Why**: Prevents silent overwrites; user gets explicit conflict notification
**Example**:
```typescript
// Client sends submissionVersion with PATCH
const result = await fetch(`/api/problems/drafts/${id}`, {
  method: 'PATCH',
  body: JSON.stringify({ ...data, submissionVersion: currentVersion }),
});

if (result.status === 409) {
  const { latestVersion } = await result.json();
  // Show conflict UI — user can reload and retry
}

// Server checks version match
if (draft.submissionVersion !== submittedVersion) {
  return NextResponse.json(
    { error: 'VERSION_CONFLICT', latestVersion: draft.submissionVersion },
    { status: 409 }
  );
}
```

### ❌ Anti-Pattern: Last-Write-Wins for Drafts
**Avoid because**: User in tab A silently loses work when tab B saves
**Instead do**: Enforce version match on update; return 409 with latest version on conflict

---

## SEO Indexing Controls

### ✅ Preferred: noindex for Internal/Form/Action Pages
**Use when**: Pages that are not destination content (login, reset, admin login, profile edit, submit form)
**Why**: Prevents search engines from indexing utility/form pages; improves crawl budget on real content
**Example**:
```typescript
// In page metadata export
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  // ... rest of metadata
};
```

**Pages that should be noindex**:
- `/login`, `/signup`, `/forgot-password`
- `/admin/login`, `/admin/setup`
- `/profile` (edit form)
- `/submit` (submission form)

**Pages that must be indexed**:
- Problem detail pages (`/problem/[id]`)
- Pillar hub/detail/focus pages
- Category pages
- Landing page, feed

### ✅ Preferred: Server-Hydrated Content for SEO-Critical Pages
**Use when**: Problem detail pages or any content page that needs first-render HTML to be real content
**Why**: Search engines see real content on first HTML response, not loading spinners or placeholders
**Example**: Problem detail pages server-render the full problem content, not a client-side fetch

### ✅ Preferred: Sitemap Aligned with Public Status Policy
**Use when**: Generating `sitemap.xml`
**Why**: Only approved + published problems should be in the sitemap — no drafts, no rejected content
**Pattern**: `app/sitemap.ts` filters problems by status before including them

---

## Request Cancellation / Stale Response Guards

### ✅ Preferred: Request-ID Guards for Feed/Browse
**Use when**: Client-side fetching where filters/sort can change rapidly (feed, search)
**Why**: Prevents stale response from slower request overwriting fresher data
**Example**:
```typescript
const requestIdRef = useRef(0);

const fetchData = async (filters) => {
  const thisRequestId = ++requestIdRef.current;
  const data = await fetch(`/api/problems?${params}`);

  // Only update if this is still the latest request
  if (thisRequestId !== requestIdRef.current) return; // Stale — discard
  setProblems(data);
};
```

### ❌ Anti-Pattern: No Cancellation on Rapid Filter Changes
**Avoid because**: User changes filter 3 times rapidly → 3 in-flight requests → slowest one "wins" → shows wrong data
**Instead do**: Track request ID; discard responses from outdated requests

---

## Compatibility-First Rollout

### ✅ Preferred: New Model + Legacy Fallback During Transition
**Use when**: Migrating data models (e.g., from author-name flags to join-table source model)
**Why**: Avoids big-bang migration; both old and new data patterns work simultaneously
**Example**:
```typescript
// Source filtering: try new join-table model first, fall back to legacy author flags
const sourceResults = await getBySourceInstitution(sourceId);
if (sourceResults.length === 0) {
  // Legacy fallback: filter by author name flags
  return getByAuthorFlags(sourceFlags);
}
return sourceResults;
```

### ❌ Anti-Pattern: Big-Bang Data Model Switchover
**Avoid because**: If backfill is incomplete, features break for records not yet migrated
**Instead do**: Support both models during transition; remove legacy path only after full migration is verified

---

## Autosave Efficiency

### ✅ Preferred: Autosave Without Full List Refetch
**Use when**: Draft autosave (e.g., problem submission form saving every N seconds)
**Why**: Refetching the entire drafts list on every autosave causes unnecessary network churn and UI flicker
**Example**:
```typescript
// ✅ Autosave: only PATCH the current draft, update local state
const autosave = async (draftData) => {
  await fetch(`/api/problems/drafts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(draftData),
  });
  // Update local state only — don't refetch entire list
};
```

### ❌ Anti-Pattern: Refetch All Drafts After Every Autosave
**Avoid because**: Autosave fires frequently (every 5-30s); refetching full list each time wastes bandwidth and can cause UI jank
**Instead do**: Only update the specific draft in local state after a successful PATCH
