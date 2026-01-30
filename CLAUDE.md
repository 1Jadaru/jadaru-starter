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

### ⚠️ CRITICAL: Schema Planning First

**Design your complete database schema during the Architecture phase, BEFORE implementation begins.**

Adding tables or columns mid-project can cause:
- Data loss during migrations
- Breaking changes to existing features
- Complex migration scripts

During `/bmad-bmm-create-architecture`, ensure the schema covers:
- All entities from the PRD
- All relationships between entities
- Soft delete fields (`deletedAt`) where needed
- Audit fields (`createdAt`, `updatedAt`, `createdBy`)

### Critical Rules

- **🚫 NEVER use CASCADE deletes** — always use `onDelete: Restrict` or `onDelete: SetNull`
- **NEVER use destructive flags** (`--all`, `--force`) without explicit user confirmation
- **ALWAYS list first** — use `--list` or `--dry-run` to preview before deleting
- **Be surgical** — delete specific records, not entire datasets
- **Soft delete by default** — add `deletedAt DateTime?` instead of hard deletes

### Prisma Relation Rules

```prisma
// ✅ CORRECT — Restrict deletion if children exist
model Parent {
  children Child[]
}
model Child {
  parent   Parent @relation(fields: [parentId], references: [id], onDelete: Restrict)
  parentId String
}

// ✅ CORRECT — Nullify reference if parent deleted
model Child {
  parent   Parent? @relation(fields: [parentId], references: [id], onDelete: SetNull)
  parentId String?
}

// 🚫 NEVER — Cascade deletes can destroy data unexpectedly
model Child {
  parent   Parent @relation(fields: [parentId], references: [id], onDelete: Cascade)  // FORBIDDEN
}
```

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
- **Review migration SQL** before applying — check for DROP statements
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

## 🚀 Deployment (Vercel)

### Pre-Deploy Checklist

**Complete this checklist before every deployment:**

```
□ npm run build passes (no errors)
□ npm run test passes (all tests green)
□ npm run dev renders locally (smoke test)
□ Middleware size < 1MB (check build output)
□ git config user.email matches Vercel team
□ .env.example has all required vars documented
□ NEXTAUTH_SECRET generated and ready
□ Database connection string ready (or Neon integration)
```

### Git Author for Vercel

**Critical:** Your git author email must match your Vercel team membership for CLI deploys to work.

```bash
# Set per-project (recommended)
git config user.email "your-vercel-email@example.com"

# Verify before deploying
git config user.email
```

### Deployment Flow

```bash
# 1. Run full quality checks
npm run build && npm test

# 2. Push to GitHub
git push origin main

# 3. Deploy via CLI
vercel --prod

# 4. Configure infrastructure (first deploy only)
# - Add Postgres: Vercel dashboard → Storage → Add Neon Postgres
# - Set env vars: NEXTAUTH_SECRET (generate: openssl rand -base64 32)
# - DATABASE_URL is auto-added by Neon integration

# 5. Push schema to production database
vercel env pull .env.local
DATABASE_URL="$(grep '^DATABASE_URL=' .env.local | cut -d'=' -f2- | tr -d '"')" npx prisma db push

# 6. Live smoke test — verify deployed site works
```

### Middleware Size Limits

Vercel Edge Functions have a **1MB size limit**. If your middleware exceeds this:

- ❌ **Don't**: Import heavy libraries (full Prisma client, bcrypt, etc.)
- ✅ **Do**: Use lightweight JWT validation in middleware
- ✅ **Do**: Move heavy auth logic to API routes (not middleware)

**Lightweight middleware pattern:**
```typescript
// src/middleware.ts — keep this thin!
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Only check for session token existence
  const token = request.cookies.get("next-auth.session-token");
  
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}
```

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
| Vercel deploy fails (git author) | `git config user.email "your-vercel-email"` |
| Middleware too large (>1MB) | Move heavy imports to API routes, thin middleware |
| `useSearchParams` hydration error | Wrap component in `<Suspense>` boundary |
| Prisma v7 compatibility issues | Stick with Prisma v6 for now |
| Tailwind v4 `@apply` errors | Use direct CSS properties instead of `@apply` |

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

## ⚡ Next.js 15 / React 19 Gotchas

### useSearchParams Requires Suspense

In Next.js 15, `useSearchParams()` must be wrapped in a Suspense boundary or the build will fail:

```tsx
// ❌ WRONG — will fail production build
export default function LoginPage() {
  const searchParams = useSearchParams(); // Error!
  return <div>...</div>;
}

// ✅ CORRECT — wrap in Suspense
function LoginContent() {
  const searchParams = useSearchParams();
  return <div>...</div>;
}

function LoginFallback() {
  return <div>Loading...</div>;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
}
```

### Tailwind CSS v4 Changes

Tailwind v4 has breaking changes with `@apply`:

```css
/* ❌ May fail in Tailwind v4 */
body {
  @apply bg-background text-foreground;
}

/* ✅ Use direct CSS with variables */
body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

### Server Components vs Client Components

- **Default**: Components are Server Components (no `"use client"`)
- **Add `"use client"`** only when you need: hooks, event handlers, browser APIs
- **Don't mix**: Server Components can import Client Components, not vice versa

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

## 📋 BMAD Method (V6)

This project includes the [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD/) V6 for AI-driven agile development. BMAD uses specialized agent personas to guide you through structured workflows.

### BMAD Agents

| Agent | Name | Role |
|-------|------|------|
| 📊 Analyst | Mary | Business analysis, product briefs, research |
| 📋 PM | John | PRD creation, epics & stories |
| 🏗️ Architect | Winston | Technical architecture decisions |
| 🎨 UX Designer | Sally | UX design, wireframes, diagrams |
| 🏃 Scrum Master | Bob | Sprint planning, story prep, retrospectives |
| 💻 Developer | Amelia | Implementation, TDD, code review |
| 🧪 Test Architect | Murat | Test design (pre-implementation) |
| 🚀 Quick Flow | Barry | Fast-track for simple tasks |

### Workflow Phases

**Phase 1-3: Planning** (Use these slash commands in sequence)

| Phase | Command | Agent | Output |
|-------|---------|-------|--------|
| 1. Analysis | `/bmad-bmm-create-brief` | Mary | `product-brief.md` |
| 2. Planning | `/bmad-bmm-prd` | John | `prd.md` |
| 2. Planning | `/bmad-bmm-create-ux-design` | Sally | `ux-design.md` (if UI) |
| 3. Solutioning | `/bmad-bmm-create-architecture` | Winston | `architecture.md` |
| 3. Solutioning | **Schema Generation** (manual step) | — | `prisma/schema.prisma` |
| 3. Solutioning | `/bmad-bmm-create-epics-and-stories` | John | `epics.md` |
| 3. Solutioning | `/bmad-bmm-check-implementation-readiness` | Winston | Readiness report |

**⚠️ Schema Generation Step (After Architecture, Before Epics):**
After architecture is complete, generate the full Prisma schema before creating epics:

```
"Based on the architecture document, generate the complete prisma/schema.prisma file.
Include:
- All entities and relationships from the PRD and architecture
- Soft delete fields (deletedAt DateTime?) on all main entities
- Audit fields (createdAt, updatedAt) on all entities
- Use onDelete: Restrict or SetNull — NEVER use Cascade
- Include the NextAuth models (User, Account, Session, VerificationToken)"
```

This ensures the schema is locked before implementation begins. Adding tables/columns mid-project risks data loss.

**Phase 4: Implementation** (Repeat this cycle for each story)

| Step | Command | Agent | Purpose |
|------|---------|-------|---------|
| 1 | `/bmad-bmm-sprint-planning` | Bob | Initialize sprint tracking |
| 2 | `/bmad-bmm-create-story` | Bob | Prepare next story with full context |
| 3 | `/bmad-bmm-dev-story` | Amelia | Implement the story (TDD) |
| 4 | `/bmad-bmm-code-review` | Amelia | **Adversarial** self-review |

**Code Review is adversarial by design:**
> "Find 3-10 specific issues in every review minimum - no lazy 'looks good' reviews"

- ❌ Issues found → Back to `/bmad-bmm-dev-story` for fixes
- ✅ All issues resolved → **Commit**, then `/bmad-bmm-create-story` for next story
- 🏁 Epic complete → `/bmad-bmm-retrospective` then next epic

**Commit after each story** — don't let work pile up uncommitted. One story = one commit.

### UAT Before Deployment

**Before asking for human UAT, the AI should complete its own UAT:**

1. **Create test account** on live site
2. **Test all user flows:**
   - Registration → Login → Dashboard
   - CRUD operations for each main entity
   - Error handling (invalid inputs, unauthorized access)
   - Edge cases (empty states, long text, special characters)
3. **Fix issues iteratively** — don't just report, fix and redeploy
4. **Verify fixes** — test again after each fix
5. **Document remaining issues** — only escalate blockers or design questions
6. **Only then** ask for human UAT

**UAT Checklist Template:**
```
□ Landing page renders correctly
□ Registration works (valid + invalid inputs)
□ Login works (valid + invalid credentials)
□ Dashboard loads after login
□ [Entity] list/create/view/edit/delete works
□ Error messages display correctly
□ Mobile responsive (if applicable)
□ No console errors
□ Page titles and branding correct
```

**Review output for hallucinations** before accepting:
- Verify founder bios, personal info, company details
- Check external URLs actually exist
- Confirm dates and specific claims match source material
- If it sounds specific but wasn't in the PRD/architecture, verify it

### Quick Flow (Simple Tasks)

For bug fixes, small features, or clear-scope work without full planning:

1. `/bmad-bmm-quick-spec` — Analyzes codebase, produces tech-spec with stories
2. `/bmad-bmm-quick-dev` — Implements the spec
3. `/bmad-bmm-code-review` — Validates quality

### Utility Commands

- `/bmad-help` — Get guidance on what to do next (works with context, e.g., `/bmad-help I just finished architecture`)
- `/bmad-bmm-sprint-status` — Check current sprint progress
- `/bmad-bmm-correct-course` — Handle significant scope changes

### Output Locations

- Planning artifacts: `_bmad-output/planning-artifacts/`
- Implementation artifacts: `_bmad-output/implementation-artifacts/`
- Sprint status: `_bmad-output/implementation-artifacts/sprint-status.yaml`

---

## 🔒 Authentication

- Auth config is at `@/lib/auth.ts`
- Use `auth()` from `@/lib/auth` for server-side session checks
- Protected routes defined in `src/middleware.ts`
- **Never store plain-text passwords** — always use bcrypt

---

*Remember: The goal is not impressive code — it's durable code.*
