import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Administration dashboard",
};

/**
 * Admin Dashboard
 * 
 * TODO: Implement these features:
 * - User count stats
 * - Recent signups
 * - System health status
 * - Quick actions
 * 
 * See ADMIN.md for full implementation guide.
 */
export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Users" value="—" description="All registered users" />
        <StatsCard title="Active Users" value="—" description="Last 30 days" />
        <StatsCard title="New Today" value="—" description="Signups today" />
        <StatsCard title="System Health" value="✓" description="All systems operational" />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="flex gap-4">
          <Link
            href="/admin/users"
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Manage Users
          </Link>
          <Link
            href="/admin/audit"
            className="rounded-lg border px-4 py-2 hover:bg-gray-50"
          >
            View Audit Logs
          </Link>
        </div>
      </div>

      {/* Implementation Notice */}
      <div className="rounded-lg border bg-amber-50 p-6">
        <h3 className="mb-2 font-semibold text-amber-800">🚧 Implementation Required</h3>
        <p className="text-amber-700">
          This is a starter template. Implement the dashboard features based on your
          application needs. See <code className="rounded bg-amber-100 px-1">ADMIN.md</code> for
          the full implementation guide.
        </p>
      </div>
    </div>
  );
}

function StatsCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border bg-white p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-gray-400">{description}</p>
    </div>
  );
}
