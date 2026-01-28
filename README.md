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

## New Project Checklist (BMAD Workflow)

When starting a new project from this template:

1. **Clone and configure**
   - [ ] Use this template / clone the repo
   - [ ] Update `package.json` name, description, and version
   - [ ] Copy `.env.example` to `.env` and fill in values
   - [ ] Generate a new `NEXTAUTH_SECRET` (`openssl rand -base64 32`)

2. **Database setup**
   - [ ] Create a PostgreSQL database
   - [ ] Update `DATABASE_URL` in `.env`
   - [ ] Run `npx prisma migrate dev --name init`
   - [ ] Extend the Prisma schema for your domain models

3. **Authentication**
   - [ ] Configure OAuth providers (if needed)
   - [ ] Customize the sign-in page
   - [ ] Set up user registration flow

4. **Development workflow**
   - [ ] Write tests first (TDD)
   - [ ] Use conventional commit messages
   - [ ] Run `npm run type-check` before committing
   - [ ] Create feature branches, PR into `main`

5. **BMAD method**
   - [ ] Check `bmad-method/` for workflow templates and agents
   - [ ] Use BMAD personas for structured product development
   - [ ] Follow the PRD → architecture → stories → implementation flow

6. **Deployment**
   - [ ] Set up hosting (Render, Vercel, etc.)
   - [ ] Configure production environment variables
   - [ ] Set up CI/CD (GitHub Actions included)
   - [ ] Configure custom domain

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
