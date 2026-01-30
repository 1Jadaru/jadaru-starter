# Jadaru Starter

A full-stack Next.js 15 starter template with TypeScript, Prisma, NextAuth.js v5, and Tailwind CSS.

Built for rapid development with best practices baked in.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js v5 (credentials + OAuth-ready)
- **Styling:** Tailwind CSS + shadcn/ui
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint + Prettier
- **Commits:** Conventional Commits (commitlint + husky)
- **CI/CD:** GitHub Actions

## Quick Start

```bash
# 1. Clone or use as template
git clone https://github.com/1Jadaru/jadaru-starter.git my-app
cd my-app

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and NEXTAUTH_SECRET

# 4. Set up the database
npx prisma migrate dev --name init

# 5. Start development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run type-check` | TypeScript type checking |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:generate` | Generate Prisma Client |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Tailwind imports + CSS variables
│   ├── api/auth/           # NextAuth API route
│   └── (dashboard)/        # Protected route group
├── components/
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   ├── db.ts               # Prisma client singleton
│   └── utils.ts            # Utility functions (cn helper)
├── types/
│   └── index.ts            # TypeScript type definitions
└── __tests__/
    └── example.test.ts     # Example test
```

## Authentication

This template includes NextAuth.js v5 with:

- **Credentials provider** — Email + password with bcrypt hashing
- **Google OAuth** — Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `.env`
- **GitHub OAuth** — Add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to `.env`

Protected routes are handled via `middleware.ts`. Any route under `/dashboard` requires authentication.

## Database

Using Prisma with PostgreSQL. The schema includes NextAuth-compatible models:

- `User` — User accounts with optional password field
- `Account` — OAuth provider accounts
- `Session` — User sessions
- `VerificationToken` — Email verification tokens

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# etc.
```

Components will be added to `src/components/ui/`.

## BMAD Method (V6)

This template includes [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD/) V6 — an AI-driven agile development framework with specialized agent personas.

### Orchestrating Claude Code with BMAD

When managing CC sessions, invoke BMAD workflows by telling CC which slash command to run:

**Planning Phase (Phases 1-3):**
```
"Run /bmad-bmm-create-brief to create the product brief"
"Run /bmad-bmm-prd to create the PRD"
"Run /bmad-bmm-create-architecture for the technical design"
```

**Schema Generation (after architecture, before epics):**
```
"Based on the architecture, generate the complete prisma/schema.prisma file.
Include all entities from the PRD, soft delete fields (deletedAt), audit fields
(createdAt, updatedAt), and use onDelete: Restrict or SetNull — never Cascade.
Include the NextAuth models."
```

Then continue:
```
"Run /bmad-bmm-create-epics-and-stories to break down the work"
```

> ⚠️ **Why schema first?** Adding tables/columns mid-project risks data loss. Lock the schema before implementation.

**Implementation Phase (Phase 4) — repeat per story:**
```
1. "Run /bmad-bmm-sprint-planning to initialize the sprint"
2. "Run /bmad-bmm-create-story to prepare the next story"
3. "Run /bmad-bmm-dev-story to implement"
4. "Run /bmad-bmm-code-review to review" (adversarial — finds 3-10 issues minimum)

→ If issues: "Run /bmad-bmm-dev-story to fix the issues"
→ If clean: "Run /bmad-bmm-create-story for the next story"
→ Epic done: "Run /bmad-bmm-retrospective" then next epic
```

**Quick Flow (simple tasks):**
```
"Run /bmad-bmm-quick-spec for a tech spec"
"Run /bmad-bmm-quick-dev to implement"
```

### BMAD Agents

| Agent | Name | Specialty |
|-------|------|-----------|
| 📊 Analyst | Mary | Product briefs, research |
| 📋 PM | John | PRDs, epics & stories |
| 🏗️ Architect | Winston | Technical architecture |
| 🎨 UX Designer | Sally | UX design, wireframes |
| 🏃 Scrum Master | Bob | Sprint management |
| 💻 Developer | Amelia | Implementation & code review |
| 🚀 Quick Flow | Barry | Fast-track simple tasks |

### Output Locations

| Artifact | Location |
|----------|----------|
| Planning docs | `_bmad-output/planning-artifacts/` |
| Story files | `_bmad-output/implementation-artifacts/` |
| Sprint status | `_bmad-output/implementation-artifacts/sprint-status.yaml` |

---

## New Project Setup

When starting a new project from this template:

### 1. Clone and Configure
```bash
cp -r ~/projects/jadaru-starter ~/projects/my-new-app
cd ~/projects/my-new-app
```

- [ ] Update `package.json` name and version
- [ ] Set git author for Vercel: `git config user.email "your-vercel-email@example.com"`
- [ ] Create GitHub repo: `gh repo create username/my-new-app --private --source=. --push`

### 2. Environment Setup
- [ ] Copy `.env.example` to `.env`
- [ ] Generate `NEXTAUTH_SECRET`: `openssl rand -base64 32`
- [ ] Set `DATABASE_URL` (or add Neon via Vercel later)

### 3. BMAD Planning (in Claude Code)
```bash
cd ~/projects/my-new-app
claude --dangerously-skip-permissions
```
Then run BMAD workflows to generate planning artifacts:
1. `/bmad-bmm-create-brief` → product-brief.md
2. `/bmad-bmm-prd` → prd.md  
3. `/bmad-bmm-create-architecture` → architecture.md
4. **Generate schema** → prisma/schema.prisma (see prompt above)
5. `/bmad-bmm-create-epics-and-stories` → epics.md

### 4. Implementation (orchestrate CC through BMAD)
Follow the Phase 4 cycle above for each story.

### 5. Pre-Deploy Checklist
- [ ] `npm run build` passes
- [ ] `npm run test` passes
- [ ] `npm run dev` renders locally
- [ ] All env vars documented in `.env.example`

### 6. Deploy to Vercel
```bash
vercel link
vercel --prod
```
- Add Neon Postgres via Vercel Storage tab
- Set `NEXTAUTH_SECRET` in environment variables
- Push schema: `vercel env pull .env.local && npx prisma db push`

## Vercel Deployment

When deploying to Vercel:

1. **Git author must match Vercel team**
   ```bash
   git config user.email "your-vercel-email@example.com"
   ```

2. **Add environment variables in Vercel dashboard:**
   - `DATABASE_URL` — From Neon Postgres (add via Storage tab)
   - `NEXTAUTH_SECRET` — Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` — Your production URL

3. **Push schema to database:**
   ```bash
   # Pull Vercel env vars locally
   vercel env pull .env.local
   # Push Prisma schema
   npx prisma db push
   ```

4. **Common issues:**
   - Edge function > 1MB: This template uses lightweight JWT middleware to avoid this
   - useSearchParams errors: Wrap in Suspense (Next.js 15 requirement)

## Conventional Commits

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add user profile page
fix: resolve login redirect issue
docs: update README setup instructions
chore: upgrade dependencies
test: add auth middleware tests
refactor: extract form validation logic
```

Commit messages are enforced via commitlint + husky.

## License

MIT
