# Contributing to OpenQuest

Thanks for your interest in contributing! This document provides guidelines for contributing to OpenQuest.

## Code of Conduct

Be respectful, constructive, and collaborative. We're all here to build something useful.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/ViktorKyo/v0-openquest/issues)
2. If not, create a new issue using the bug report template
3. Include:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check [existing feature requests](https://github.com/ViktorKyo/v0-openquest/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. Create a new issue using the feature request template
3. Explain:
   - The problem it solves
   - How it should work
   - Why it's valuable to users

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/v0-openquest.git
   cd v0-openquest
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Set up your environment**
   ```bash
   pnpm install
   cp .env.example .env.local
   # Add your database URL and other config
   ```

4. **Make your changes**
   - Write clean, readable code
   - Follow existing code patterns
   - Update documentation if needed

5. **Test your changes**
   ```bash
   pnpm lint
   pnpm build
   ```

6. **Commit with clear messages**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation only
   - `style:` Formatting, no code change
   - `refactor:` Code restructure, no feature change
   - `test:` Adding tests
   - `chore:` Maintenance tasks

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a Pull Request**
   - Use a clear, descriptive title
   - Describe what changed and why
   - Reference related issues (e.g., "Closes #123")
   - Add screenshots for UI changes

## Development Guidelines

### Code Style

- TypeScript for all code
- Functional components with hooks
- Descriptive variable and function names
- Comments only for complex logic (code should be self-documenting)
- Keep functions small and focused

### File Organization

- Components go in `components/`
- UI primitives (shadcn) go in `components/ui/`
- Admin-specific components go in `components/admin/`
- Hooks go in `hooks/`
- Types go in `types/`
- Database logic goes in `lib/db/`

### Component Guidelines

```tsx
// Good: Clear, typed, focused component
interface ProblemCardProps {
  problem: Problem;
  onVote: (id: string) => void;
}

export function ProblemCard({ problem, onVote }: ProblemCardProps) {
  // Single responsibility
}
```

### API Route Guidelines

- Use proper HTTP methods (GET, POST, PATCH, DELETE)
- Return consistent response shapes
- Always validate input
- Handle errors gracefully
- Log errors server-side

```typescript
// Good: Consistent API response
return NextResponse.json({
  success: true,
  data: result
});

// Error response
return NextResponse.json({
  error: 'Description of what went wrong'
}, { status: 400 });
```

### Database Guidelines

- All schema changes go in `lib/db/schema.ts`
- Use `pnpm db:push` to apply changes
- Use parameterized queries (Drizzle handles this)
- Add relations for connected tables

## Project Structure

```
app/
├── (pages)/           # Public pages
├── admin/
│   ├── (authenticated)/  # Protected admin routes
│   └── login/
└── api/               # API routes

components/
├── ui/               # shadcn/ui components
├── admin/            # Admin-only components
└── [feature].tsx     # Feature components

lib/
├── db/
│   ├── schema.ts     # Drizzle schema
│   └── supabase.ts   # Database client
├── email/
│   ├── send.ts       # Email sending logic
│   └── templates/    # React Email templates
└── [utility].ts      # Utility functions
```

## Getting Help

- Open an issue for bugs or features
- Check existing issues and PRs
- Read the [Architecture docs](docs/ARCHITECTURE.md)

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions

Thank you for contributing!
