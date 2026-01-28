import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <div className="mb-8 flex items-center justify-center">
          <div className="rounded-2xl bg-primary/10 p-4">
            <svg
              className="h-12 w-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>

        <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground">Jadaru Starter</h1>

        <p className="mb-8 text-lg text-muted-foreground">
          A full-stack Next.js template with TypeScript, Prisma, NextAuth, and Tailwind CSS. Built
          for rapid development.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/1Jadaru/jadaru-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            GitHub
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 font-semibold">Type Safe</h3>
            <p className="text-sm text-muted-foreground">
              Strict TypeScript from top to bottom. Prisma generates types for your database.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 font-semibold">Auth Ready</h3>
            <p className="text-sm text-muted-foreground">
              NextAuth v5 with credentials and OAuth providers pre-configured.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 font-semibold">Production Ready</h3>
            <p className="text-sm text-muted-foreground">
              CI/CD, linting, testing, and conventional commits from day one.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
