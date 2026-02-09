# OpenQuest

> Product Hunt for Problems - A platform where people share problems they wish existed solutions for, and discover problems worth solving.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-green)](https://orm.drizzle.team/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com/)

[Live Demo](https://openquest.vercel.app) | [Report Bug](https://github.com/ViktorKyo/v0-openquest/issues) | [Request Feature](https://github.com/ViktorKyo/v0-openquest/issues)

## Features

- **Problem Discovery** - Browse problems people wish were solved
- **Categories** - Explore by category (Climate, AI/ML, Healthcare, etc.)
- **Engagement System** - Express interest as builder, investor, or upvoter
- **Comments & Discussion** - Threaded comments with engagement badges
- **User Profiles** - Track submissions and engagement history
- **Admin Dashboard** - Full moderation system for problems, users, and comments
- **YC RFS Integration** - Curated Y Combinator Request for Startups
- **Weekend Fund Problems** - Featured investor-sourced problems

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) via [Supabase](https://supabase.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Authentication:** Custom JWT-based auth with passwordless admin login
- **Email:** [Resend](https://resend.com/) with React Email templates
- **Deployment:** [Vercel](https://vercel.com/)

## Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase account)
- pnpm (recommended) or npm

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ViktorKyo/v0-openquest.git
   cd v0-openquest
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your values (see [.env.example](.env.example) for required variables).

4. **Set up the database**
   ```bash
   pnpm db:push    # Push schema to database
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
openquest/
├── app/                    # Next.js App Router pages & API routes
│   ├── admin/             # Admin dashboard (route group auth)
│   ├── api/               # REST API endpoints
│   └── [pages]/           # Public pages
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── admin/            # Admin-specific components
├── contexts/             # React context providers
├── data/                 # Static data (YC RFS, Weekend Fund)
├── drizzle/              # Database migrations
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── db/              # Database schema & client
│   └── email/           # Email templates & sending
├── public/              # Static assets
├── scripts/             # Utility scripts (seeding, etc.)
├── types/               # TypeScript type definitions
└── .claude/             # Claude AI project documentation
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed documentation.

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm db:push      # Push schema changes to database
pnpm db:studio    # Open Drizzle Studio
```

## Database Schema

Key tables:
- `users` - User accounts with auth and moderation fields
- `problems` - Problem submissions with status workflow
- `comments` - Threaded comments with upvotes
- `admin_users` - Admin accounts with role-based permissions
- `admin_actions` - Audit log for admin activities

See [lib/db/schema.ts](lib/db/schema.ts) for the complete schema.

## Admin Dashboard

The admin dashboard provides:
- Problem moderation (approve/reject submissions)
- User management (suspend/ban)
- Comment moderation (hide/delete)
- Analytics and audit logs
- Admin user management (super_admin only)

Access at `/admin` with a valid admin ID.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## Contact

Viktor - [@ViktorKyo](https://github.com/ViktorKyo)

Project Link: [https://github.com/ViktorKyo/v0-openquest](https://github.com/ViktorKyo/v0-openquest)
