# Development Guide

## Getting Started

### Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **pnpm** - `npm install -g pnpm`
- **PostgreSQL** - Local or [Supabase](https://supabase.com/) (free tier available)
- **Git** - [Download](https://git-scm.com/)

### Initial Setup

1. **Clone and install**
   ```bash
   git clone https://github.com/ViktorKyo/v0-openquest.git
   cd v0-openquest
   pnpm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```env
   DATABASE_URL="postgresql://..."
   JWT_SECRET="your-32-char-secret"
   ADMIN_JWT_SECRET="another-32-char-secret"
   RESEND_API_KEY="re_..."
   EMAIL_FROM="noreply@yourdomain.com"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. **Set up database**
   ```bash
   pnpm db:push
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open http://localhost:3000**

## Development Workflow

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:push` | Push schema changes to database |
| `pnpm db:studio` | Open Drizzle Studio (database GUI) |

### Database Management

**Push schema changes:**
```bash
pnpm db:push
```

**View database in browser:**
```bash
pnpm db:studio
```

**Seed sample data:**
```bash
node scripts/seed-problems.mjs
```

### Code Organization

```
project/
├── app/                    # Pages and API routes
│   ├── page.tsx           # Home page
│   ├── feed/page.tsx      # Feed page
│   ├── problem/[id]/      # Dynamic problem pages
│   ├── admin/             # Admin section
│   └── api/               # API endpoints
│
├── components/            # React components
│   ├── ui/               # Base UI (shadcn)
│   ├── admin/            # Admin components
│   └── [feature].tsx     # Feature components
│
├── lib/                  # Utilities
│   ├── db/              # Database
│   ├── email/           # Email
│   └── utils.ts         # Helpers
│
├── types/               # TypeScript definitions
├── hooks/               # Custom hooks
└── contexts/            # React contexts
```

## Common Development Tasks

### Creating a New Page

1. Create file in `app/` directory:
   ```tsx
   // app/new-page/page.tsx
   export default function NewPage() {
     return <div>New Page Content</div>
   }
   ```

2. Page is automatically available at `/new-page`

### Creating an API Route

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Hello' });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Process body...
  return NextResponse.json({ success: true });
}
```

### Adding a Database Column

1. Update schema in `lib/db/schema.ts`:
   ```typescript
   export const users = pgTable('users', {
     // existing columns...
     newColumn: varchar('new_column', { length: 255 }),
   });
   ```

2. Push to database:
   ```bash
   pnpm db:push
   ```

### Creating a Component

**Server Component (default):**
```tsx
// components/problem-list.tsx
import { db } from '@/lib/db/supabase';
import { problems } from '@/lib/db/schema';

export async function ProblemList() {
  const data = await db.select().from(problems);
  return <ul>{data.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
```

**Client Component (interactive):**
```tsx
// components/vote-button.tsx
"use client"
import { useState } from 'react';

export function VoteButton({ problemId }: { problemId: string }) {
  const [voted, setVoted] = useState(false);

  async function handleVote() {
    await fetch(`/api/problems/${problemId}/vote`, { method: 'POST' });
    setVoted(true);
  }

  return <button onClick={handleVote}>{voted ? 'Voted' : 'Vote'}</button>
}
```

### Adding a Custom Hook

```typescript
// hooks/use-problem.ts
import { useState, useEffect } from 'react';

export function useProblem(id: string) {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/problems/${id}`)
      .then(res => res.json())
      .then(data => {
        setProblem(data);
        setLoading(false);
      });
  }, [id]);

  return { problem, loading };
}
```

## Debugging

### View Database State

```bash
pnpm db:studio
```
Opens a web UI at http://localhost:4983

### Check API Responses

Use browser DevTools Network tab or:
```bash
curl http://localhost:3000/api/problems | jq
```

### View Server Logs

Development server shows logs in terminal. Look for:
- API request logs
- Database query logs
- Error stack traces

### Common Issues

**"Cannot find module"**
```bash
pnpm install
```

**"Database connection failed"**
- Check DATABASE_URL in .env.local
- Ensure Supabase project is running

**"JWT/Auth errors"**
- Verify JWT_SECRET is set and consistent
- Clear cookies and try again

**Schema out of sync**
```bash
pnpm db:push
```

## Testing Changes

### Manual Testing Checklist

Before pushing:
- [ ] Does the app start? (`pnpm dev`)
- [ ] Does it build? (`pnpm build`)
- [ ] Are there lint errors? (`pnpm lint`)
- [ ] Test the feature you changed
- [ ] Test related features

### Admin Dashboard Testing

1. Go to `/admin/setup` to create initial admin
2. Login at `/admin/login` with your admin ID
3. Test moderation features

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | User auth token signing |
| `ADMIN_JWT_SECRET` | Yes | Admin auth token signing |
| `RESEND_API_KEY` | Yes* | For password reset emails |
| `EMAIL_FROM` | Yes* | Sender email address |
| `NEXT_PUBLIC_APP_URL` | No | Base URL (defaults to localhost) |

*Required for email features

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment instructions.

## Getting Help

- Check existing [GitHub Issues](https://github.com/ViktorKyo/v0-openquest/issues)
- Read the [Architecture docs](ARCHITECTURE.md)
- Review the [.claude/](../.claude/) folder for project-specific patterns
