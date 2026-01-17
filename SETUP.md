# OpenQuest - Setup Guide

This document provides an overview of the OpenQuest platform architecture and setup instructions.

## 📁 Project Structure

```
v0-presentation-design/
├── app/                          # Next.js app router pages
│   ├── page.tsx                 # Landing page
│   ├── feed/page.tsx            # Problem feed
│   ├── problem/[id]/page.tsx    # Problem detail page
│   ├── submit/page.tsx          # Submit problem form
│   ├── category/[slug]/page.tsx # Category filtered view
│   ├── demo/page.tsx            # Component demo page
│   └── layout.tsx               # Root layout
│
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── badge.tsx
│   │   ├── radio-group.tsx
│   │   └── ... (other UI primitives)
│   │
│   ├── hero.tsx                 # Landing page hero
│   ├── header.tsx               # Landing page header
│   ├── footer.tsx               # Footer component
│   ├── navigation-header.tsx    # Main navigation
│   ├── feed-header.tsx          # Feed page header
│   ├── feed-filters.tsx         # Trending/New filters
│   ├── feed-list.tsx            # Problem feed list
│   ├── problem-card.tsx         # Problem card (landing)
│   ├── reusable-problem-card.tsx # Problem card (reusable)
│   ├── feed-problem-card.tsx    # Problem card (feed)
│   ├── problem-detail-page.tsx  # Problem detail view
│   ├── problem-submit-form.tsx  # Submit problem form
│   ├── problems-preview.tsx     # Landing page preview
│   ├── categories.tsx           # Category showcase
│   └── how-it-works.tsx         # How it works section
│
├── lib/                          # Utility functions and data
│   ├── types.ts                 # ✨ Centralized TypeScript types
│   ├── mock-data.ts             # ✨ Centralized mock data
│   └── utils.ts                 # Utility functions (cn, etc.)
│
├── public/                       # Static assets
├── styles/                       # Global styles
└── package.json                 # Dependencies
```

## 🎯 Key Features Implemented

### 1. **Centralized Type Definitions** (`lib/types.ts`)

All TypeScript types are defined in a single location:

- `Problem` - Main problem type with full details
- `ProblemCardData` - Simplified version for card displays
- `Comment` - Comment system types
- `User` & `Author` - User profile types
- `Category` - Enumerated categories
- `Engagement` - Builder/investor engagement types
- Category metadata with colors and descriptions
- Utility functions: `getCategoryColor()`, `getTimeAgo()`

### 2. **Centralized Mock Data** (`lib/mock-data.ts`)

10 comprehensive mock problems covering all categories:
- AI & infrastructure
- Longevity
- Climate tech
- Future of work
- Rebuild money
- World of atoms
- Creator economy
- Niche markets

Helper functions available:
- `getProblemById(id)` - Get single problem
- `getProblemsByCategory(category)` - Filter by category
- `getTrendingProblems()` - Get problems sorted by trending score
- `getNewProblems()` - Get problems sorted by date
- `searchProblems(query)` - Search problems
- `getCommentsForProblem(problemId)` - Get comments

### 3. **Complete UI Component Library**

All shadcn/ui components are configured:
- ✅ Button, Card, Input, Textarea
- ✅ Dropdown Menu, Select, Dialog
- ✅ Form, Label, Checkbox
- ✅ Badge, Avatar, Separator
- ✅ Radio Group (newly added)
- ✅ Sheet (mobile menu)

### 4. **Fully Functional Pages**

All core pages are implemented:
- ✅ Landing page with hero, preview, categories
- ✅ Problem feed with filters and cards
- ✅ Problem detail page
- ✅ Submit problem form
- ✅ Category pages
- ✅ Demo page (component showcase)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Development

Open [http://localhost:3000](http://localhost:3000) to view the app.

**Key Routes:**
- `/` - Landing page
- `/feed` - Problem feed
- `/problem/[id]` - Problem detail
- `/submit` - Submit a problem
- `/category/[slug]` - Category view
- `/demo` - Component demo

## 🎨 Design System

### Colors (Tailwind Classes)

**Category Colors:**
```typescript
"Moonshots"           → purple
"Niche markets"       → blue
"Future of work"      → indigo
"Creator economy"     → pink
"Longevity"           → green
"Rebuild money"       → yellow
"Climate tech"        → emerald
"AI & infrastructure" → cyan
"World of atoms"      → orange
"Other"               → gray
```

### Typography
- Headings: `font-bold`
- Body: `font-normal`
- Hero: `text-5xl md:text-7xl`
- Section Title: `text-3xl`
- Card Title: `text-xl`

### Spacing
- Container: `max-w-4xl` or `max-w-7xl`
- Section Gap: `py-20 md:py-32`
- Card Gap: `space-y-4`

## 📊 Mock Data Usage

### Importing Mock Data

```typescript
import { mockProblems, getProblemById, getTrendingProblems } from '@/lib/mock-data'
import type { Problem } from '@/lib/types'

// Get all problems
const problems = mockProblems

// Get trending problems
const trending = getTrendingProblems()

// Get specific problem
const problem = getProblemById('1')

// Search problems
const results = searchProblems('AI benchmark')
```

### Example Component

```typescript
import { getTrendingProblems } from '@/lib/mock-data'
import type { Problem } from '@/lib/types'

export function ProblemFeed() {
  const problems = getTrendingProblems()

  return (
    <div>
      {problems.map((problem: Problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  )
}
```

## 🔌 API Integration (Future Phase)

The current implementation uses mock data. For backend integration:

1. **Database Setup** (Supabase)
   - Create `problems` table matching `Problem` type
   - Create `comments` table matching `Comment` type
   - Create `users` table matching `User` type
   - Set up row-level security policies

2. **API Routes** (Next.js API routes)
   - `GET /api/problems` - List problems
   - `POST /api/problems` - Create problem
   - `GET /api/problems/[id]` - Get problem
   - `POST /api/problems/[id]/upvote` - Upvote
   - `POST /api/problems/[id]/comment` - Add comment

3. **Authentication** (Clerk)
   - Install `@clerk/nextjs`
   - Wrap app with `<ClerkProvider>`
   - Add auth middleware
   - Protect routes: `/submit`, `/profile`, etc.

4. **Replace Mock Data**
   - Replace `mockProblems` with Supabase queries
   - Add real-time subscriptions
   - Implement search with PostgreSQL full-text search
   - Add pagination

## 🧪 Testing the Build

```bash
# Type checking
pnpm tsc --noEmit

# Build
pnpm build

# Preview production build
pnpm start
```

## 📝 Next Steps

### Phase 1: Backend Integration (with Claude Code)
- [ ] Set up Supabase project
- [ ] Create database schema
- [ ] Add Clerk authentication
- [ ] Implement API routes
- [ ] Replace mock data with real data

### Phase 2: Advanced Features
- [ ] Real-time updates (Supabase subscriptions)
- [ ] Full-text search
- [ ] User profiles
- [ ] Admin dashboard
- [ ] Email notifications (Resend)

### Phase 3: Launch Preparation
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Analytics (Vercel Analytics + custom events)
- [ ] Error tracking (Sentry)
- [ ] Rate limiting
- [ ] Content moderation

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Contributing

This project follows the OpenQuest project brief specifications. When adding features:

1. Follow existing type definitions in `lib/types.ts`
2. Use centralized mock data from `lib/mock-data.ts`
3. Maintain consistent design system
4. Write TypeScript (no implicit `any` types)
5. Keep components small and focused

## 📄 License

Private project for OpenQuest platform development.
