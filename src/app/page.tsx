import Link from "next/link";

export default function Home() {
  return (
    <main className="from-background to-secondary/20 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <div className="mb-8 flex items-center justify-center">
          <div className="bg-primary/10 rounded-2xl p-4">
            <svg
              className="text-primary h-12 w-12"
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

        <h1 className="text-foreground mb-4 text-5xl font-bold tracking-tight">Jadaru Starter</h1>

        <p className="text-muted-foreground mb-8 text-lg">
          A full-stack Next.js template with TypeScript, Prisma, NextAuth, and Tailwind CSS. Built
          for rapid development.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md px-8 text-sm font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/1Jadaru/jadaru-starter"
            target="_blank"
            rel="noopener noreferrer"
            className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-11 items-center justify-center rounded-md border px-8 text-sm font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
          >
            GitHub
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h3 className="mb-2 font-semibold">Type Safe</h3>
            <p className="text-muted-foreground text-sm">
              Strict TypeScript from top to bottom. Prisma generates types for your database.
            </p>
          </div>
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h3 className="mb-2 font-semibold">Auth Ready</h3>
            <p className="text-muted-foreground text-sm">
              NextAuth v5 with credentials and OAuth providers pre-configured.
            </p>
          </div>
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <h3 className="mb-2 font-semibold">Production Ready</h3>
            <p className="text-muted-foreground text-sm">
              CI/CD, linting, testing, and conventional commits from day one.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
