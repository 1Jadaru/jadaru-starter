# Auth.js v5 Setup Guide

**Lessons learned from HomeTrace 2026-01-30**

This guide covers Auth.js v5 (NextAuth v5) setup for Next.js 15 App Router projects.

---

## Required Environment Variables

### Development (`.env.local`)
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_TRUST_HOST="true"
```

### Production (Vercel)
Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Environments |
|----------|-------|--------------|
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Production |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` | All |
| `AUTH_TRUST_HOST` | `true` | Production |

**Critical:** `AUTH_TRUST_HOST=true` is required for Auth.js v5 in production!

---

## SessionProvider Setup

Auth.js client-side functions (`signIn`, `signOut`, `useSession`) require `SessionProvider`.

### 1. Create providers component
```tsx
// src/components/providers.tsx
"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

### 2. Wrap in root layout
```tsx
// src/app/layout.tsx
import { Providers } from "@/components/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## Middleware (Protected Routes)

### ⚠️ Edge Runtime Limitations

**DO NOT** import your auth config directly in middleware:
```tsx
// ❌ BAD - This pulls in Prisma, bcrypt, etc. (>1MB, exceeds Edge limit)
import { auth } from "@/lib/auth";
export default auth((req) => { ... });
```

### ✅ Correct Approach: Cookie Check

```tsx
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Auth.js v5 cookie names
  const sessionToken = req.cookies.get("authjs.session-token")?.value 
    || req.cookies.get("__Secure-authjs.session-token")?.value;
  
  const isLoggedIn = !!sessionToken;
  
  const protectedPaths = ["/dashboard", "/properties", "/records"];
  const isProtected = protectedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

---

## Login Page Pattern

```tsx
// src/app/(auth)/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      // Hard redirect (more reliable than router.push)
      window.location.href = "/dashboard";
    } catch {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

**Note:** Use `window.location.href` instead of `router.push()` for login redirects - more reliable.

---

## Build Script

Add `prisma generate` to your build script for Vercel:

```json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}
```

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Sign in button does nothing | Missing SessionProvider | Wrap app in SessionProvider |
| "UntrustedHost" error | Missing AUTH_TRUST_HOST | Add `AUTH_TRUST_HOST=true` to env |
| Login works but redirects back to /login | Middleware not reading session | Use cookie check pattern (not auth import) |
| Edge Function >1MB error | Importing auth in middleware | Use lightweight cookie check |
| Session exists but middleware rejects | Wrong cookie name | Check for both `authjs.session-token` and `__Secure-authjs.session-token` |
| `router.push()` doesn't redirect | React state timing | Use `window.location.href` instead |

---

## Checklist for New Projects

- [ ] SessionProvider wraps the app
- [ ] NEXTAUTH_URL set in Vercel (production URL)
- [ ] NEXTAUTH_SECRET set in Vercel
- [ ] AUTH_TRUST_HOST=true in Vercel
- [ ] Middleware uses cookie check (not auth import)
- [ ] Build script includes `prisma generate`
- [ ] Login uses `window.location.href` for redirect

---

*Last updated: 2026-01-30*
