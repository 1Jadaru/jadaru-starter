import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";

/**
 * Admin Layout
 * 
 * Protects all /admin/* routes and provides admin navigation.
 * 
 * Prerequisites:
 * 1. Add 'role' field to User model in Prisma schema
 * 2. Add role to session in auth.ts callbacks
 * 
 * See ADMIN.md for full implementation guide.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Must be authenticated
  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  // Must have admin role
  // TODO: Uncomment after adding role to User model
  // if (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN") {
  //   redirect("/dashboard?error=unauthorized");
  // }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-white">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="text-xl font-bold">
            Admin Portal
          </Link>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                href="/admin/audit"
                className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Audit Logs
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 border-t p-4">
          <Link
            href="/dashboard"
            className="block text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to App
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1">
        <header className="flex h-16 items-center justify-between border-b bg-white px-8">
          <h1 className="text-lg font-semibold">Admin</h1>
          <div className="text-sm text-gray-500">
            {session.user.email}
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
