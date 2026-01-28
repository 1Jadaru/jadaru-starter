import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="mb-8 text-muted-foreground">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}! This is a protected
          page.
        </p>
        <div className="rounded-lg border bg-card p-6 text-left shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">Session Info</h2>
          <pre className="overflow-auto rounded-md bg-muted p-4 text-sm">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}
