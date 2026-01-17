# OpenQuest - Drop what you're doing. Find your quest.

**Product Hunt for Problems** - A community platform where people share real problems they want solved, connecting problem-havers with talented builders looking for meaningful projects.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/viktor-upperfloorves-projects/v0-presentation-design)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/uw6ZPEpzXWW)

---

## 🎯 Project Overview

OpenQuest is where problems meet solutions. Users can:
- 🔍 **Browse** curated problems worth solving
- 📝 **Submit** problems they've encountered
- 👍 **Upvote** problems they find compelling
- 💬 **Comment** and discuss solutions
- 🔨 **Commit** to building solutions
- 💰 **Signal** investment interest

---

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```
├── app/                 # Next.js pages (App Router)
│   ├── page.tsx        # Landing page
│   ├── feed/           # Problem feed
│   ├── problem/[id]/   # Problem detail
│   ├── submit/         # Submit problem
│   └── category/[slug]/ # Category pages
│
├── components/          # React components
│   ├── ui/             # shadcn/ui primitives
│   ├── hero.tsx        # Landing hero
│   ├── feed-list.tsx   # Problem feed
│   └── ...             # Other components
│
├── lib/                 # Utilities and data
│   ├── types.ts        # ✨ TypeScript type definitions
│   ├── mock-data.ts    # ✨ Mock data for development
│   └── utils.ts        # Utility functions
│
└── public/             # Static assets
```

For detailed documentation, see [SETUP.md](./SETUP.md)

---

## 🎨 Design Philosophy

**Inspired by:**
- **Product Hunt** - Clean cards, upvote UI
- **Linear** - Smooth animations, polish
- **Hacker News** - Information density
- **Stripe** - Beautiful typography

**Principles:**
1. Premium MVP - Simple but polished
2. Information hierarchy - Trending problems stand out
3. Effortless interactions - Smooth upvotes, comments
4. Mobile-first - Most users browse on mobile
5. Fast perceived performance - Optimistic UI updates

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui |
| **Icons** | Lucide React |
| **Animations** | Framer Motion |
| **Forms** | React Hook Form + Zod |
| **Deployment** | Vercel |

**Coming Soon:**
- Database: Supabase (PostgreSQL)
- Auth: Clerk
- ORM: Drizzle
- Email: Resend

---

## ✨ Features

### Current (v0 Phase)
- ✅ Landing page with hero and problem preview
- ✅ Problem feed with trending/new filters
- ✅ Problem detail pages
- ✅ Submit problem form
- ✅ Category pages
- ✅ Upvote system (client-side)
- ✅ Comment threads (UI only)
- ✅ Responsive mobile design
- ✅ Smooth animations
- ✅ 10 categories with color coding

### Next (Backend Integration Phase)
- 🔜 Database integration (Supabase)
- 🔜 User authentication (Clerk)
- 🔜 Real-time updates
- 🔜 Full-text search
- 🔜 User profiles
- 🔜 Admin moderation
- 🔜 Email notifications

---

## 📊 Categories

1. **Moonshots** - Change the trajectory of humanity
2. **Niche markets** - Small markets needing champions
3. **Future of work** - Reimagining how we work
4. **Creator economy** - Empowering creators
5. **Longevity** - Extending healthspan
6. **Rebuild money** - Fixing financial systems
7. **Climate tech** - Climate solutions
8. **AI & infrastructure** - Building AI tools
9. **World of atoms** - Physical products & hardware
10. **Other** - Everything else

---

## 🧪 Development

### Mock Data

The app uses comprehensive mock data for development:

```typescript
import { getTrendingProblems, getProblemById } from '@/lib/mock-data'
import type { Problem } from '@/lib/types'

const trending = getTrendingProblems()
const problem = getProblemById('1')
```

See `lib/mock-data.ts` for 10+ mock problems across all categories.

### Type System

All types are centralized in `lib/types.ts`:

```typescript
import type { Problem, Category, Comment } from '@/lib/types'
```

### Component Demo

View all components at `/demo` route.

---

## 📝 Key Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/feed` | Problem feed |
| `/problem/[id]` | Problem detail |
| `/submit` | Submit problem |
| `/category/[slug]` | Category filtered view |
| `/demo` | Component showcase |

---

## 🎯 Roadmap

### Phase 1: Frontend (Current) ✅
- [x] Landing page
- [x] Problem feed
- [x] Problem detail
- [x] Submit form
- [x] Category pages
- [x] Mock data
- [x] Type definitions

### Phase 2: Backend Integration (Next)
- [ ] Supabase setup
- [ ] Database schema
- [ ] Clerk auth
- [ ] API routes
- [ ] Real-time updates

### Phase 3: Advanced Features
- [ ] User profiles & reputation
- [ ] Admin dashboard
- [ ] Search
- [ ] Notifications
- [ ] Analytics

### Phase 4: Launch
- [ ] SEO optimization
- [ ] Performance tuning
- [ ] Content moderation
- [ ] Marketing site

---

## 🤝 Contributing

This project follows the OpenQuest project brief. When contributing:

1. Use types from `lib/types.ts`
2. Use mock data from `lib/mock-data.ts`
3. Follow existing design patterns
4. Write TypeScript (no implicit `any`)
5. Test responsive design

---

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup guide and architecture
- **[Project Brief](#)** - Original project specifications
- **[Next.js Docs](https://nextjs.org/docs)** - Framework documentation
- **[shadcn/ui](https://ui.shadcn.com/)** - UI component library

---

## 📄 License

Private project for OpenQuest platform development.

---

## 🌐 Deployment

**Production URL:** [https://vercel.com/viktor-upperfloorves-projects/v0-presentation-design](https://vercel.com/viktor-upperfloorves-projects/v0-presentation-design)

The app is deployed on Vercel with automatic deployments from the main branch.

---

**Built with ❤️ using v0, Next.js, and shadcn/ui**