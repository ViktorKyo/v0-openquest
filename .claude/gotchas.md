# Known Gotchas & Workarounds

Issues and limitations we've encountered.

---

## Edge Runtime Limitations in Middleware
**What**: Node.js crypto module and other Node APIs don't work in Edge Runtime
**When it happens**: Using `crypto` or other Node-specific modules in `middleware.ts`
**Workaround**: Use Edge-compatible alternatives like `jose` library for JWT, or move logic to API routes
**Status**: Permanent - Next.js middleware runs on Edge Runtime

---

## Shared DB-Backed Rate Limiting
**What**: Auth and draft-update rate limiting is DB-backed with local fallback
**When it happens**: Login (5/hour/IP), signup (3/hour/IP), forgot-password (3/hour/IP), draft PATCH
**Behavior**: Returns 429 status with `retryAfter` field
**Location**: `lib/rate-limit.ts`, all auth API routes, draft PATCH route
**Note**: Uses `x-forwarded-for` header for IP detection. DB-backed means limits are shared across multiple server instances. Local fallback kicks in if DB is slow/unavailable.

---

## Hydration Warnings in Admin Dashboard
**What**: React hydration warnings may appear in browser console
**When it happens**: When server-rendered HTML doesn't match client render (dates, random IDs)
**Workaround**: These are warnings, not errors - functionality still works. Can suppress with `suppressHydrationWarning` if needed.
**Status**: Known Next.js behavior - monitor but don't panic

---

## Database Connection String Special Characters
**What**: Special characters in DATABASE_URL password need proper escaping
**When it happens**: When password contains characters like `!`, `@`, `#`
**Workaround**: Ensure URL is properly quoted in shell commands, or URL-encode special chars
**Status**: Permanent - standard URL encoding behavior

---

## UUID Format for Database IDs
**What**: All database tables use UUID primary keys, not string IDs
**When it happens**: When creating seed scripts or manual database operations
**Workaround**: Use `gen_random_uuid()` in SQL or `randomUUID()` from Node's crypto
**Status**: Permanent - part of schema design
**Code Pattern**:
```javascript
import { randomUUID } from 'crypto';
const id = randomUUID(); // Returns UUID like '550e8400-e29b-41d4-a716-446655440000'
```

---

## TypeScript Import for Data Files
**What**: Node.js can import `.ts` files directly in recent versions but shows warnings
**When it happens**: Running seed scripts that import from `data/*.ts`
**Workaround**: Ignore the `MODULE_TYPELESS_PACKAGE_JSON` warning, or add `"type": "module"` to package.json
**Status**: Development convenience - not affecting production

---

## Comment Edit Window Server-Side Enforcement
**What**: The 2-hour edit window must be enforced both client AND server side
**When it happens**: Users try to edit comments after window expires
**Why matters**: Client-side checks can be bypassed; API must be authoritative
**Implementation**:
```typescript
// API route must check
const now = Date.now();
const createdAt = new Date(comment.createdAt).getTime();
const canEdit = (now - createdAt) < EDIT_WINDOW_MS;
if (!canEdit) {
  return NextResponse.json({ error: 'Edit window has expired' }, { status: 403 });
}
```
**Status**: Permanent - security requirement

---

## Comment Delete Protection
**What**: Comments with replies cannot be deleted
**When it happens**: User tries to delete a comment that has responses
**Why matters**: Deleting would orphan replies and destroy context
**Behavior**: API returns error, UI disables delete button
**Location**: `app/api/comments/[id]/route.ts` (DELETE handler)
**Status**: Permanent - preserves discussion integrity

---

## Vote Count Drift With Increment/Decrement
**What**: Denormalized `comments.upvotes` count drifts from actual `comment_upvotes` records
**When it happens**: Concurrent votes, partial failures, or any count that was previously wrong
**Root cause**: Original code used `upvotes + 1` / `upvotes - 1` — if count ever gets out of sync (race condition, partial failure), it never self-corrects
**Fix**: Wrap vote insert/delete + count update in a `db.transaction()`, and set count via `COUNT(*)` subquery instead of increment/decrement:
```typescript
await db.transaction(async (tx) => {
  // insert or delete vote record...
  await tx.update(comments).set({
    upvotes: sql`(SELECT COUNT(*) FROM comment_upvotes WHERE comment_id = ${commentId})`,
  }).where(eq(comments.id, commentId));
});
```
**Location**: `app/api/comments/[id]/upvote/route.ts`
**Tests**: `__tests__/api/vote-count.test.ts`
**Status**: Fixed - always use COUNT(*) for denormalized counters, never increment/decrement

---

## Search LIKE Wildcard Injection
**What**: PostgreSQL LIKE wildcards (`%`, `_`, `\`) in user search input are not escaped, allowing users to match all rows or arbitrary patterns
**When it happens**: Any LIKE query with unsanitized user input (e.g., searching for `%` matches everything)
**Root cause**: Original code did `query.slice(0, 200).trim()` — truncates but never escapes LIKE special characters
**Fix**: Use `sanitizeSearchInput()` from `lib/search-utils.ts`, which trims, truncates to 256 chars, and escapes `\`, `%`, `_`
```typescript
import { sanitizeSearchInput } from '@/lib/search-utils';
const safe = sanitizeSearchInput(rawQuery);
// safe to use in: sql`... LIKE ${'%' + safe + '%'}`
```
**Location**: `app/api/problems/search/route.ts`, `lib/search-utils.ts`
**Tests**: `__tests__/api/search-sanitization.test.ts` (23 test cases)
**Status**: Fixed - always use `sanitizeSearchInput()` for any user input going into LIKE queries

---

## Drizzle Schema vs Database Out of Sync
**What**: Drizzle schema defines tables/columns that may not exist in the actual database
**When it happens**: After adding new schema definitions without running migrations, or when migrations weren't applied to the target database
**Detection**: Generic API 500 errors that hide the real cause — check server logs for `column "X" does not exist` or `relation "X" does not exist`
**Workaround**: Compare schema against actual DB, then apply missing migrations:
```bash
# Check what actually exists
export $(grep -v '^#' .env.local | xargs) && node -e "
const postgres = require('postgres');
const sql = postgres(process.env.DATABASE_URL);
sql\`SELECT tablename FROM pg_tables WHERE schemaname = 'public'\`.then(t => { console.log(t.map(r=>r.tablename)); sql.end(); });
"

# Apply specific migration
export $(grep -v '^#' .env.local | xargs) && node -e "
const postgres = require('postgres');
const fs = require('fs');
const sql = postgres(process.env.DATABASE_URL);
sql.unsafe(fs.readFileSync('./drizzle/migrations/0006_add_user_profiles.sql', 'utf8')).then(() => { console.log('done'); sql.end(); });
"
```
**Status**: Permanent risk — always verify DB state after schema changes

---

## drizzle-kit push Doesn't Load .env.local
**What**: `npm run db:push` fails because `drizzle.config.ts` can't read `DATABASE_URL`
**When it happens**: Running drizzle-kit CLI commands
**Workaround**: Prefix with env loading: `export $(grep -v '^#' .env.local | xargs) && npx drizzle-kit push`
**Note**: drizzle-kit push is also interactive — asks about truncating tables for constraint changes
**Status**: Permanent — drizzle-kit is a standalone tool, doesn't use Next.js env loading

---

## Optional Props That Silently Break Features
**What**: React components with optional props (like `currentUserId?: string`) render without error when the prop is missing — but the behavior is broken
**When it happens**: After adding a component that depends on auth state or user identity, forgetting to pass the prop from the parent
**Example**: `<CommentsSection>` worked fine visually without `currentUserId`, but `canEdit`/`canDelete` were always false
**Detection**: No console errors, no TypeScript errors — only manual testing reveals the broken behavior
**Workaround**: After rendering any component that uses optional auth props, verify in the parent that all identity-related props are passed. Consider making critical props required instead of optional.
**Status**: Permanent risk — TypeScript can't warn about "missing but optional" props

---

## Supabase Connection Pool Saturation During Development
**What**: `MaxClientsInSessionMode` error when running scripts alongside the dev server
**When it happens**: Dev server (`npm run dev`) consumes all available session pooler connections; any additional script or one-off query fails
**Workaround**: Use Supabase's transaction pooler (port 6543) instead of the session pooler (port 5432):
```javascript
const url = process.env.DATABASE_URL.replace(':5432/', ':6543/');
const sql = postgres(url, { max: 1 });
```
**Note**: Supabase REST API may also fail with "Invalid API key" — direct postgres via transaction pooler is more reliable for scripts
**Status**: Permanent — Supabase session pooler has limited slots per project

---

## react-tweet Embeds: Use CSS Variables, Not Scale Transforms
**What**: `transform: scale()` shrinks tweet embeds visually but leaves ghost space (empty area the original size)
**When it happens**: Trying to make tweet embeds proportionate to other cards
**Workaround**: Override react-tweet CSS variables instead:
```css
.tweet-compact .react-tweet-theme {
  --tweet-body-font-size: 0.8rem;
  --tweet-header-font-size: 0.7rem;
  --tweet-actions-font-size: 0.7rem;
  --tweet-container-margin: 0;
}
```
Combine with `max-w-sm` on the container for width control.
**Status**: Permanent — CSS transforms don't affect layout flow by design

---

## Comment Validation Inconsistency (Client vs Server)
**What**: Comment max length was hardcoded differently in client (2000) vs server (inline checks), and client had no error display for failed submissions
**When it happens**: User submits a comment that passes client validation but fails server validation, or vice versa
**Root cause**: No shared validation function — each location had its own inline checks with different limits
**Fix**: Created shared `validateCommentContent()` in `types/comment.ts` with exported constants (`COMMENT_MIN_LENGTH = 1`, `COMMENT_MAX_LENGTH = 5000`). Both API routes and client component import from the same source.
```typescript
import { validateCommentContent, COMMENT_MAX_LENGTH } from '@/types/comment';
const error = validateCommentContent(content);
if (error) return NextResponse.json({ error }, { status: 400 });
```
**Locations**: `types/comment.ts`, `app/api/problems/[id]/comments/route.ts`, `app/api/comments/[id]/route.ts`, `components/comments-section.tsx`
**Tests**: `__tests__/api/comment-validation.test.ts` (12 test cases)
**Status**: Fixed - always use shared validation for any user content with length constraints

---

## Search Still Uses %ILIKE% (Known Performance Limitation)
**What**: Problem search uses `%ILIKE%` pattern matching and count+page query pattern
**When it happens**: As problem count grows, search queries slow down — full table scan on every request
**Current mitigation**: `sanitizeSearchInput()` prevents wildcard injection, but the fundamental query pattern is O(n)
**Future fix**: Migrate to PostgreSQL FTS (full-text search) or trigram indexes + cursor pagination
**Status**: Known cost center — acceptable for current scale, needs attention at 10K+ problems

---

## Sections Endpoint N+1 Queries
**What**: `/api/problems/sections` executes per-category follow-up queries (N+1 pattern)
**When it happens**: Every browse page load — one query per category to build sections
**Current mitigation**: None — acceptable for current category count (~10)
**Future fix**: Replace with window-function query or materialized aggregate
**Status**: Known cost center — monitor as category count grows

---

## Draft Concurrency: 409 VERSION_CONFLICT
**What**: Draft PATCH returns 409 if `submissionVersion` doesn't match
**When it happens**: Two tabs/sessions edit the same draft simultaneously; the second save gets a 409
**Behavior**: Response includes `latestVersion` — client should show conflict UI and let user reload
**Location**: Draft PATCH API route
**Note**: Autosave triggers this more often than manual saves — client should handle 409 gracefully (not as a hard error)
**Status**: Permanent — intentional design for data safety

---

## noindex Pages Must Be Maintained
**What**: Internal/form pages have `robots: { index: false, follow: false }` metadata
**When it happens**: Creating new utility/form/action pages (login, settings, admin)
**Risk**: Forgetting to add `noindex` to new internal pages wastes crawl budget and pollutes search results
**Pages with noindex**: `/login`, `/signup`, `/forgot-password`, `/admin/login`, `/admin/setup`, `/profile`, `/submit`
**Workaround**: When creating any new page that isn't destination content, add `robots: { index: false, follow: false }` to its metadata
**Status**: Permanent — requires manual attention for each new page
