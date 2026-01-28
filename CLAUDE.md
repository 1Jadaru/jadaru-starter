# CLAUDE.md — Project Instructions for Claude Code

This file provides project-level instructions for Claude Code (claude.ai/code) when working in this repository.

## Project Overview

Jadaru Starter is a full-stack Next.js 15 template using App Router, TypeScript (strict), Prisma ORM, NextAuth.js v5, and Tailwind CSS with shadcn/ui.

## Coding Standards

### TypeScript
- **Strict mode is mandatory** — never disable strict checks
- Use `noUncheckedIndexedAccess` — always handle potential `undefined` from index access
- Prefer explicit return types on exported functions
- Use `unknown` over `any`; narrow types with type guards
- All database access goes through Prisma (`@/lib/db`) — no raw SQL

### React / Next.js
- **Prefer Server Components** — only use `"use client"` when you need interactivity, hooks, or browser APIs
- Use the App Router patterns (layouts, loading, error boundaries)
- Colocate related files (page + components + actions in the same route folder when it makes sense)
- Data fetching in Server Components, mutations via Server Actions or API routes

### Testing (TDD First)
- **Write tests before implementation** — red-green-refactor
- Use Vitest + React Testing Library
- Test files go in `src/__tests__/` or colocated as `*.test.ts(x)`
- Run `npm run test` before committing
- Aim for meaningful coverage, not 100% — test behavior, not implementation

### Styling
- Use Tailwind CSS utility classes
- Use the `cn()` helper from `@/lib/utils` for conditional classes
- Use shadcn/ui components (`npx shadcn@latest add <component>`)
- Follow the existing CSS variable theme system in `globals.css`

### Git & Commits
- **Always run `npm run type-check` before committing**
- Use [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat:` — new feature
  - `fix:` — bug fix
  - `docs:` — documentation
  - `test:` — tests
  - `refactor:` — code restructuring
  - `chore:` — maintenance / deps
- Write meaningful commit messages (not just "update files")
- Keep commits atomic — one logical change per commit

### Database
- All schema changes go through Prisma migrations (`npm run db:migrate`)
- Use `npm run db:push` only in development for rapid iteration
- Always run `npm run db:generate` after schema changes
- The Prisma client singleton is at `@/lib/db`

### Authentication
- Auth config is at `@/lib/auth.ts`
- Use `auth()` from `@/lib/auth` for server-side session checks
- Protected routes are defined in `src/middleware.ts`
- Never store plain-text passwords — always use bcrypt

## Key Paths

| Path | Purpose |
|------|---------|
| `src/app/` | Next.js App Router pages and API routes |
| `src/components/ui/` | shadcn/ui components |
| `src/lib/auth.ts` | NextAuth configuration |
| `src/lib/db.ts` | Prisma client singleton |
| `src/lib/utils.ts` | Shared utilities (cn helper) |
| `src/types/` | TypeScript type definitions |
| `prisma/schema.prisma` | Database schema |
| `src/middleware.ts` | Route protection middleware |

## BMAD Method

This project includes the [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD/) for AI-driven agile development. BMAD workflows and agents are available via Claude Code slash commands (`.claude/commands/`).

Key workflows:
- `/bmad-bmm-create-product-brief` — Create a product brief
- `/bmad-bmm-create-prd` — Create a PRD from the brief
- `/bmad-bmm-create-architecture` — Design system architecture
- `/bmad-bmm-create-epics-and-stories` — Break work into stories
- `/bmad-bmm-dev-story` — Implement a story with TDD

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run type-check   # TypeScript check (run before commits!)
npm run lint         # ESLint
npm run test         # Vitest
npm run db:migrate   # Prisma migrations
npm run db:studio    # Prisma Studio GUI
```
