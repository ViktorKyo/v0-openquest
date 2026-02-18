# OpenQuest — Claude Code Instructions

## Stack
- Next.js 16 (App Router), React 19, TypeScript 5
- PostgreSQL on Supabase, Drizzle ORM
- Tailwind CSS 4 + shadcn/ui
- Auth: Custom user auth + Admin passwordless (JWT via jose)

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npx tsc --noEmit` — type-check (run after every edit)
- `npm run validate:vc` — validate VC data consistency
- `npm run db:push` — push schema changes to database

## Debugging: Check Environment FIRST
Before modifying code to fix an issue, check these common root causes:
1. **Missing env vars** — compare `.env.local` against `.env.example` for missing keys
2. **Supabase connection** — `DATABASE_URL` may be wrong or expired
3. **Auth tokens** — `JWT_SECRET` and `ADMIN_JWT_SECRET` must be set, min 32 chars
4. **OAuth/email** — `RESEND_API_KEY` needed for password reset
5. **Node version** — project uses Node 20+ features

## Data Flow Rule
Before editing any display/rendering code, trace the data flow from source to UI:
1. Identify data source (static file in `data/`, API route, database query)
2. Check transformations (are all flags like `isYC`, `isWeekendFund` being passed through?)
3. Look for hardcoded values or downstream overrides
4. Only then edit the rendering code

## Safety Rules
- NEVER move, rename, or delete directories without asking the user first
- Use `pwd` to verify working directory before destructive operations
- On repeated errors (3+ failures on same task), stop, summarize what was tried, and ask the user how to proceed
- Never commit `.env.local`, credentials, or secrets

## Communication
- When stuck, provide a brief summary of: what was attempted, what failed, what the likely cause is
- Ask clarifying questions rather than guessing at ambiguous requirements
- After completing a task, run `npx tsc --noEmit` and report any new type errors

## Project Documentation
Detailed docs live in `.claude/` — reference these for deeper context:
- `.claude/architecture.md` — system structure, database schema, auth flow
- `.claude/patterns.md` — preferred patterns and anti-patterns (institutional authors, VC badges, comments threading)
- `.claude/learnings.md` — past mistakes and fixes (date comparisons, cookie paths, Next.js 16 async params)
- `.claude/gotchas.md` — known limitations (Edge Runtime, rate limiting, hydration)
- `.claude/decisions.md` — why we chose this stack and these patterns

## Key Gotchas (Quick Reference)
- Date comparisons in Drizzle: use `.toISOString()`, not raw Date objects
- Cookie paths: always `path: '/'` for auth cookies
- Next.js 16 API route params are Promise-based — must `await params`
- After auth changes: use `window.location.href`, not `router.push()`
- shadcn/ui components only exist if added — check `components/ui/` first
- Institutional authors (YC, Weekend Fund, etc.) need `InstitutionalLogo` component, never avatar images
