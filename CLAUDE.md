# CLAUDE.md — Project Instructions for Claude Code

This file provides project-level instructions for Claude Code (claude.ai/code) when working in this repository.

---

## Project Overview

**Jadaru Starter** is a full-stack Next.js 15 template using App Router, TypeScript (strict), Prisma ORM, NextAuth.js v5, and Tailwind CSS with shadcn/ui.

**Stack**: Next.js 15 (App Router), React 19, TypeScript 5 (strict), Prisma, NextAuth v5, Tailwind CSS, shadcn/ui, Vitest

---

## 🥇 First Principles Philosophy

> Build what is necessary. Nothing more. Nothing less.

### Golden Rules

1. **Do Not Over-Engineer**
   - Prefer clarity over cleverness
   - Avoid premature abstractions unless justified by repeated patterns
   - Don't build "just in case" — build "just in time"

2. **Follow First Principles**
   - Start from the core problem → derive the simplest functional solution
   - Ask *"What is the user actually trying to achieve?"* before coding
   - Design from fundamental truths, not assumptions

3. **Code Should Explain Itself**
   - If a comment must explain logic, simplify the logic instead
   - One source of truth per concept
   - Small, readable functions > "smart" one-liners

4. **Architect for Maintainability**
   - Start lean; scale by extraction, not prediction
   - Always ask: *"Can a new dev understand this in 5 minutes?"*
   - Default to simple data structures, predictable flow, minimal state

5. **AI Collaboration Principle**
   - Every function and structure should be transparent enough that AI tools can analyze, refactor, and test it without ambiguity

---

## ✅ Quality Enforcement (Mandatory)

### Real-Time Quality Gates

**After ANY code change >10 lines:**
```bash
npm run lint
```
- If ANY errors appear, **STOP** and fix immediately
- **NEVER** proceed with >5 warnings or any lint errors

### Quality Checkpoint Frequency

| When | Command | Rule |
|------|---------|------|
| After >10 line changes | `npm run lint` | Fix errors before continuing |
| Every 30 minutes | `npm run lint && npm run type-check` | Must pass |
| Before any commit | `npm run type-check && npm run test` | All green, no exceptions |
| Before marking task complete | `npm run lint && npm run type-check && npm run test` | All must pass |

### Complexity Rules

- Max cyclomatic complexity: **8**
- Max function length: **50 lines**
- Extract helper functions early (≥6 complexity)

### ESLint Error Resolution Workflow

1. **STOP** — Do not continue coding until errors are resolved
2. **ANALYZE** — Identify root cause (complexity, type safety, function length)
3. **REFACTOR** — Apply quality patterns immediately
4. **VERIFY** — Re-run linting to confirm resolution
5. **CONTINUE** — Only proceed once clean lint status achieved

---

## 📦 Coding Standards

### TypeScript

- **Strict mode is mandatory** — never disable strict checks
- Use `noUncheckedIndexedAccess` — always handle potential `undefined`
- Prefer explicit return types on exported functions
- Use `unknown` over `any`; narrow types with type guards
- No `any` types — use Zod for runtime validation
- All database access goes through Prisma (`@/lib/db`) — no raw SQL

### React / Next.js

- **Prefer Server Components** — only use `"use client"` when you need interactivity, hooks, or browser APIs
- Use App Router patterns (layouts, loading, error boundaries)
- Colocate related files (page + components + actions in the same route folder)
- Data fetching in Server Components, mutations via Server Actions or API routes

### Testing — TDD MANDATORY

**⚠️ TDD (Test-Driven Development) is REQUIRED, not optional.**

#### TDD Workflow (Red-Green-Refactor)
1. 🔴 **RED**: Write a failing test FIRST that defines expected behavior
2. 🟢 **GREEN**: Write minimum code to make the test pass
3. 🔄 **REFACTOR**: Clean up while keeping tests green

#### TDD Enforcement Rules
- **NO CODE WITHOUT TESTS**: Do not write implementation until a failing test exists
- **Test File First**: Create `*.test.ts(x)` before creating the component/function
- **One Test at a Time**: Write one failing test, make it pass, then write the next
- **Commit Discipline**: Each commit should include tests + implementation together

#### Pre-Implementation Checklist
```bash
# BEFORE writing any code:
1. Create ComponentName.test.tsx (or function.test.ts)
2. Write test for expected behavior
3. Run: npm run test -- --watch
4. Confirm test FAILS (red)
5. THEN create the implementation
6. Confirm test PASSES (green)
7. Refactor, keeping tests green
```

#### Test Configuration
- Use Vitest + React Testing Library
- Test files: `src/__tests__/` or colocated as `*.test.ts(x)`
- Coverage ≥80%, ≥90% for critical logic
- Test behavior, not implementation

#### TDD Violation Response
If you find yourself writing implementation before tests:
1. **STOP** immediately
2. **DELETE** the untested code
3. **WRITE** the test first
4. **THEN** re-implement

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
- Write meaningful commit messages
- Keep commits atomic — one logical change per commit

---

## 🗄️ Database Safety

### Critical Rules

- **NEVER use destructive flags** (`--all`, `--force`) without explicit user confirmation
- **ALWAYS list first** — use `--list` or `--dry-run` to preview before deleting
- **Be surgical** — delete specific records, not entire datasets
- **Understand foreign key constraints** — deletion order matters

### Safe Workflow Example

```bash
# 1. List what exists first
npx prisma studio  # or a list command

# 2. Delete only specific records
# NEVER do bulk deletes without explicit confirmation
```

### Schema Changes

- All schema changes go through Prisma migrations (`npm run db:migrate`)
- Use `npm run db:push` only in development for rapid iteration
- Always run `npm run db:generate` after schema changes
- The Prisma client singleton is at `@/lib/db`

---

## 🖥️ Development Commands

```bash
# Development
npm run dev          # Start dev server (ALWAYS use port 3000)
npm run build        # Production build
npm run start        # Start production server

# Quality (run before commits!)
npm run type-check   # TypeScript check
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run test         # Vitest

# Database
npm run db:migrate   # Run Prisma migrations
npm run db:push      # Push schema (dev only)
npm run db:generate  # Regenerate Prisma client
npm run db:studio    # Prisma Studio GUI
npm run db:seed      # Seed database
```

### Port Management

**ALWAYS use port 3000** for consistency. If port 3000 is in use:

```bash
# Check what's using the port
lsof -i :3000        # Linux/Mac
netstat -ano | findstr :3000  # Windows

# Kill the process
kill -9 <PID>        # Linux/Mac
taskkill //PID <PID> //F      # Windows

# Or use npx
npx kill-port 3000
```

---

## 📁 Key Paths

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

---

## 🔐 Environment Variables

| File | Purpose | Commit? |
|------|---------|---------|
| `.env.local` | Local secrets, database URLs | ❌ Never |
| `.env.example` | Template showing required vars | ✅ Yes |
| `.env.test` | Test environment overrides | ❌ No |

### Required Variables

```bash
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"

# Auth (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Rules

- **Always update `.env.example`** when adding new environment variables
- Never commit real secrets to git
- Use different databases for dev/test/prod
- Validate required vars exist at startup

---

## 🪝 Pre-Commit Hooks (Recommended)

Set up automated validation before every commit:

```bash
# Install husky and lint-staged
npm install -D husky lint-staged

# Initialize husky
npx husky init

# Add pre-commit hook
echo "npx lint-staged" > .husky/pre-commit
```

Add to `package.json`:
```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

This ensures:
- Code is linted before commit
- Formatting is consistent
- Type errors don't reach the repo

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Prisma client outdated | `npm run db:generate` |
| Port 3000 in use | `npx kill-port 3000` |
| Type errors after schema change | `npm run db:generate && npm run type-check` |
| Auth not working | Check `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are set |
| Module not found errors | `rm -rf node_modules && npm install` |
| Prisma migration drift | `npx prisma migrate reset` (⚠️ destroys data) |
| Hydration mismatch | Check for `"use client"` on interactive components |
| Build fails but dev works | Run `npm run type-check` — strict mode catches more |

### Debug Commands

```bash
# Check environment
npx prisma validate          # Validate schema
npx prisma db pull           # Introspect existing DB
npm run type-check           # Find type errors
npm run lint -- --debug      # Verbose lint output

# Reset everything (nuclear option)
rm -rf node_modules .next
npm install
npm run db:generate
npm run dev
```

---

## 🌐 Platform Considerations

When working in WSL or cross-platform environments:

- Use Node.js `path` module for file paths (not string concatenation)
- Handle path separators appropriately (Windows `\` vs Unix `/`)
- Use proper line ending handling in file parsing
- Test file system operations work on both platforms

---

## 🤖 AI Collaboration Protocol

- **Read this file before writing code**
- Follow TDD, lint, and quality rules strictly
- If instructions are ambiguous, **ask** — don't guess
- Keep functions transparent and testable
- Prefer explicit over implicit behavior

---

## 📋 BMAD Method

This project includes the [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD/) for AI-driven agile development. BMAD workflows are available via Claude Code slash commands.

**Key workflows:**
- `/bmad-help` — See available workflows and next steps
- `/bmad-bmm-create-product-brief` — Create a product brief
- `/bmad-bmm-create-prd` — Create a PRD from the brief
- `/bmad-bmm-create-architecture` — Design system architecture
- `/bmad-bmm-create-epics-and-stories` — Break work into stories
- `/bmad-bmm-dev-story` — Implement a story with TDD
- `/bmad-bmm-quick-spec` — Quick spec for simple tasks
- `/bmad-bmm-quick-dev` — Quick dev without heavy planning

---

## 🔒 Authentication

- Auth config is at `@/lib/auth.ts`
- Use `auth()` from `@/lib/auth` for server-side session checks
- Protected routes defined in `src/middleware.ts`
- **Never store plain-text passwords** — always use bcrypt

---

*Remember: The goal is not impressive code — it's durable code.*
