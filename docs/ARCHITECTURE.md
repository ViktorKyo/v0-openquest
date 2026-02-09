# OpenQuest Architecture

## Overview

OpenQuest is a Next.js 16 application using the App Router pattern with server and client components, REST API routes, and PostgreSQL database via Drizzle ORM.

## System Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser                               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js Frontend                           │
│              (Server + Client Components)                    │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Pages     │  │  Contexts   │  │     Components      │ │
│  │  (app/)     │  │  (React)    │  │  (Server + Client)  │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Routes (app/api/)                     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  /api/auth/  │  │/api/problems/│  │   /api/admin/    │  │
│  │  User auth   │  │  CRUD ops    │  │  Moderation API  │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Database Layer (lib/db/)                    │
│                                                              │
│  ┌──────────────────────┐  ┌────────────────────────────┐  │
│  │   Drizzle Schema     │  │     Query Functions        │  │
│  │   (schema.ts)        │  │    (in API routes)         │  │
│  └──────────────────────┘  └────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              PostgreSQL Database (Supabase)                  │
│                                                              │
│   users │ problems │ comments │ admin_users │ admin_actions │
└─────────────────────────────────────────────────────────────┘
```

## Key Architectural Patterns

### 1. Server Components (Default)

By default, components in the `app/` directory are Server Components:
- Fetch data directly without client-side state
- No JavaScript shipped to browser
- Better performance and SEO

### 2. Client Components

Use `"use client"` directive for interactivity:
- Forms with user input
- Interactive elements (modals, dropdowns)
- Components using hooks (useState, useEffect)

```tsx
"use client"
import { useState } from 'react'
// This component runs in the browser
```

### 3. Route Groups

Used for organizing routes without affecting URL:

```
app/
├── admin/
│   ├── (authenticated)/     # Route group - doesn't appear in URL
│   │   ├── layout.tsx       # Auth check wrapper
│   │   ├── dashboard/
│   │   └── problems/
│   └── login/               # Public login page
```

### 4. API Route Pattern

RESTful endpoints in `app/api/`:

```typescript
// app/api/problems/route.ts
export async function GET(req: NextRequest) {
  // List problems
}

export async function POST(req: NextRequest) {
  // Create problem
}

// app/api/problems/[id]/route.ts
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Get single problem
}
```

## Database Schema

### Core Tables

#### users
```sql
- id (uuid, pk)
- email (varchar, unique)
- name (varchar)
- avatarUrl (text)
- passwordHash (varchar)
- passwordResetToken (varchar)
- passwordResetExpires (timestamp)
- isSuspended (boolean)
- isBanned (boolean)
- banReason (text)
- suspendedAt, suspendedUntil, bannedAt (timestamps)
- createdAt, lastLoginAt (timestamps)
```

#### problems
```sql
- id (uuid, pk)
- title (varchar)
- elevatorPitch (text)
- fullDescription (text)
- category (varchar)
- industryTags (jsonb)
- authorId (uuid, fk → users)
- isAnonymous (boolean)
- status (varchar: pending_review, approved, rejected, archived)
- upvotes, commentCount, builderCount, investorCount (int)
- createdAt, updatedAt, publishedAt, moderatedAt (timestamps)
```

#### comments
```sql
- id (uuid, pk)
- problemId (uuid, fk → problems)
- authorId (uuid, fk → users)
- parentId (uuid, self-reference for threading)
- content (text)
- upvotes (int)
- createdAt, updatedAt (timestamps)
- isDeleted, deletedAt (soft delete)
- isHidden, hiddenReason (moderation)
```

#### admin_users
```sql
- id (uuid, pk)
- adminId (varchar, unique - login ID)
- name, email (varchar)
- role (varchar: super_admin, moderator, analyst)
- isActive (boolean)
- createdBy (uuid, fk → admin_users)
- createdAt, lastLogin (timestamps)
```

#### admin_actions (Audit Log)
```sql
- id (uuid, pk)
- adminId (uuid, fk → admin_users)
- actionType (varchar: approve_problem, reject_problem, etc.)
- targetType (varchar: problem, user, comment)
- targetId (uuid)
- notes (text)
- metadata (jsonb)
- createdAt (timestamp)
```

### Relations

```
users ──┬── problems (one-to-many)
        ├── comments (one-to-many)
        └── commentUpvotes (one-to-many)

problems ─��┬── comments (one-to-many)
           └── problemModeration (one-to-many)

comments ── replies (self-referential, one-to-many)

admin_users ──┬── admin_actions (one-to-many)
              └── problemModeration (one-to-many)
```

## Authentication

### User Authentication

1. **Registration**: Email + password → bcrypt hash stored
2. **Login**: Verify password → Issue JWT token
3. **Session**: JWT stored in HTTP-only cookie
4. **Password Reset**: Token-based email flow via Resend

```typescript
// lib/user-auth.ts
export async function verifyUserSession(): Promise<User | null>
export async function createUserSession(userId: string): Promise<void>
```

### Admin Authentication

Passwordless authentication using admin IDs:

1. Admin enters their admin ID
2. System verifies ID exists in `admin_users` table
3. JWT token issued with role information
4. Role-based permission checks

```typescript
// lib/admin-auth.ts
export async function getAdminSession(): Promise<AdminSession | null>
export function hasPermission(session: AdminSession, permission: string): boolean
```

## Data Flow

### Reading Data (Server Component)

```
Page Component
    │
    ▼
Direct DB Query (Drizzle)
    │
    ▼
Render HTML
    │
    ▼
Send to Browser (minimal JS)
```

### Writing Data (Client → API → DB)

```
User Action (form submit)
    │
    ▼
POST to API Route
    │
    ▼
Validate Input (Zod)
    │
    ▼
Write to Database
    │
    ▼
Return JSON Response
    │
    ▼
Update UI (revalidate/refetch)
```

## Security Measures

1. **SQL Injection Prevention**: Drizzle ORM with parameterized queries
2. **Input Validation**: Zod schemas for API inputs
3. **Authentication**: JWT with HTTP-only cookies
4. **Authorization**: Role-based checks on admin routes
5. **Rate Limiting**: LRU cache-based limiting (lib/rate-limit.ts)
6. **CSRF**: Implicit via SameSite cookies
7. **XSS**: React's built-in escaping + Content Security headers

## Email System

Using Resend with React Email templates:

```
lib/email/
├── send.ts           # sendEmail, sendModerationEmail functions
└── templates/
    ├── password-reset.tsx
    └── moderation-notification.tsx (if exists)
```

## Performance Optimizations

1. **Server Components**: Reduce client JS bundle
2. **Database Indexes**: On frequently queried columns
3. **Denormalized Counts**: upvotes, commentCount on problems table
4. **Image Optimization**: Next.js Image component
5. **Route Groups**: Separate admin bundle from public

## Deployment Architecture

```
GitHub Repo
    │
    ▼ (push)
Vercel Build
    │
    ├── Build Next.js app
    ├── Deploy to Edge Network
    └── Connect to Supabase PostgreSQL
    │
    ▼
Global CDN (static assets)
    │
Serverless Functions (API routes)
    │
    ▼
Supabase PostgreSQL (managed database)
```

## Future Considerations

- [ ] Add Redis for caching hot data
- [ ] Implement full-text search (PostgreSQL or Algolia)
- [ ] Real-time updates (Server-Sent Events)
- [ ] Background jobs for email queuing
- [ ] CDN for user-uploaded images
