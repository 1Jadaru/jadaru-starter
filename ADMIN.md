# Admin Portal Guide

This document outlines the admin portal architecture for enterprise applications.

## Overview

The admin portal provides tools for:

- User management and support
- Audit log viewing
- Analytics and metrics
- System configuration

## Architecture

```
src/app/
├── (admin)/
│   ├── layout.tsx              # Admin layout with sidebar, role check
│   ├── admin/
│   │   ├── page.tsx            # Dashboard overview
│   │   ├── users/
│   │   │   ├── page.tsx        # User list
│   │   │   └── [id]/page.tsx   # User detail
│   │   ├── audit/
│   │   │   └── page.tsx        # Audit log viewer
│   │   ├── analytics/
│   │   │   └── page.tsx        # Analytics dashboard
│   │   └── settings/
│   │       └── page.tsx        # System settings
```

## Role-Based Access

Add to your Prisma schema:

```prisma
enum Role {
  USER
  ADMIN
  SUPERADMIN
}

model User {
  // ... existing fields
  role Role @default(USER)
}
```

## Admin Middleware

Protect admin routes in `src/app/(admin)/layout.tsx`:

```typescript
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Check for admin role
  if (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN") {
    redirect("/dashboard?error=unauthorized");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
```

## Features to Implement

### 1. User Management

| Feature                       | Priority | Complexity |
| ----------------------------- | -------- | ---------- |
| List users with search/filter | High     | Low        |
| View user details             | High     | Low        |
| Suspend/unsuspend account     | High     | Low        |
| Delete account (soft)         | High     | Low        |
| Impersonate user              | Medium   | Medium     |
| Reset password                | Medium   | Low        |
| Bulk actions                  | Low      | Medium     |

### 2. Audit Log Viewer

| Feature                    | Priority | Complexity |
| -------------------------- | -------- | ---------- |
| List audit events          | High     | Low        |
| Filter by user/action/date | High     | Medium     |
| Export to CSV              | Medium   | Low        |
| Real-time updates          | Low      | High       |

### 3. Analytics Dashboard

| Feature                | Priority | Complexity |
| ---------------------- | -------- | ---------- |
| User signup chart      | High     | Medium     |
| Active users (DAU/MAU) | High     | Medium     |
| Feature usage          | Medium   | Medium     |
| Error rate trends      | Medium   | High       |

### 4. System Settings

| Feature           | Priority | Complexity |
| ----------------- | -------- | ---------- |
| Feature flags     | Medium   | Medium     |
| Rate limit config | Low      | Low        |
| Maintenance mode  | Medium   | Low        |
| Email templates   | Low      | High       |

## API Routes

```
/api/admin/users          GET     List users
/api/admin/users/[id]     GET     Get user details
/api/admin/users/[id]     PATCH   Update user (suspend, role)
/api/admin/users/[id]     DELETE  Soft delete user
/api/admin/audit          GET     List audit logs
/api/admin/audit/export   GET     Export audit logs
/api/admin/analytics      GET     Get analytics data
/api/admin/settings       GET     Get settings
/api/admin/settings       PATCH   Update settings
```

## Security Considerations

1. **Always verify admin role** in API routes, not just layout
2. **Audit all admin actions** - who did what, when
3. **Rate limit admin endpoints** - prevent abuse
4. **Require re-authentication** for sensitive actions
5. **IP allowlisting** (optional) - restrict admin access by IP
6. **Two-factor authentication** - require for admin accounts

## Impersonation

For support purposes, admins may need to see what a user sees:

```typescript
// Store original admin ID in session
// Switch session to target user
// Add banner: "Viewing as [user] - Click to exit"
// Log all impersonation sessions
```

**Important:** Always log impersonation start/end and restrict to SUPERADMIN only.

## Database Queries

Common admin queries to implement:

```typescript
// User stats
const userCount = await db.user.count();
const activeUsers = await db.user.count({
  where: { lastActiveAt: { gte: thirtyDaysAgo } },
});

// Audit log query with pagination
const auditLogs = await db.auditLog.findMany({
  where: { userId, action, createdAt: { gte: startDate, lte: endDate } },
  orderBy: { createdAt: "desc" },
  take: limit,
  skip: offset,
});

// User search
const users = await db.user.findMany({
  where: {
    OR: [
      { email: { contains: search, mode: "insensitive" } },
      { name: { contains: search, mode: "insensitive" } },
    ],
  },
});
```

## UI Components Needed

- `AdminSidebar` - Navigation sidebar
- `AdminHeader` - Top bar with user info
- `DataTable` - Sortable, filterable table
- `SearchInput` - Search with debounce
- `DateRangePicker` - For filtering by date
- `StatsCard` - Display metrics
- `Chart` - For analytics (recharts or chart.js)
- `ActionDropdown` - User actions menu
- `ConfirmDialog` - Confirm destructive actions

## Implementation Order

1. **Phase 1: Foundation**
   - Admin layout and sidebar
   - Role-based middleware
   - User list page

2. **Phase 2: User Management**
   - User detail page
   - Suspend/delete actions
   - Search and filters

3. **Phase 3: Audit & Analytics**
   - Audit log viewer
   - Basic analytics dashboard

4. **Phase 4: Advanced**
   - Impersonation
   - Feature flags
   - Email templates

---

_This is a planning document. Implementation should be done per-project based on specific needs._
