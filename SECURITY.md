# Security Documentation

This document outlines the security measures implemented in this application.

## Security Features

### 1. Environment Validation

All environment variables are validated at startup using Zod schemas. The application will fail to start if required variables are missing or malformed.

```typescript
import { env } from "@/lib/env";
```

### 2. Security Headers

The following security headers are set on all responses:

| Header | Value | Purpose |
|--------|-------|---------|
| X-Frame-Options | DENY | Prevent clickjacking |
| X-Content-Type-Options | nosniff | Prevent MIME sniffing |
| X-XSS-Protection | 1; mode=block | Enable XSS filter |
| Referrer-Policy | strict-origin-when-cross-origin | Control referrer info |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Restrict features |
| Strict-Transport-Security | max-age=31536000; includeSubDomains | Enforce HTTPS |

### 3. Rate Limiting

API routes are protected by rate limiting to prevent abuse:

```typescript
import { rateLimit, getClientIp, RATE_LIMITS } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { success } = rateLimit(ip, RATE_LIMITS.auth);
  
  if (!success) {
    return rateLimitResponse(resetTime);
  }
  // ... handler
}
```

Default limits:
- Auth endpoints: 5 requests/minute
- Registration: 3 requests/hour
- API endpoints: 60 requests/minute
- Report generation: 5 requests/minute

### 4. Input Validation

All user input is validated using Zod schemas:

```typescript
import { validators } from "@/lib/security";

const schema = z.object({
  email: validators.email,
  password: validators.password,
  name: validators.safeString,
});
```

### 5. Audit Logging

All significant actions are logged for security monitoring:

```typescript
import { auditLog } from "@/lib/audit";

await auditLog({
  action: "user.login",
  userId: user.id,
  ipAddress: getClientIp(req),
  success: true,
});
```

### 6. Error Handling

Errors are handled safely to prevent information leakage:

- Development: Full error details shown
- Production: Generic error messages only
- All errors logged server-side

```typescript
import { handleApiError } from "@/lib/errors";

try {
  // ... logic
} catch (error) {
  return handleApiError(error);
}
```

### 7. Database Security

- **SSL connections**: Enforced via connection string
- **Row-level security**: Users can only access their own data
- **Soft deletes**: Records are never permanently deleted (audit trail)
- **Connection pooling**: Limits prevent exhaustion attacks

```typescript
import { ownershipFilter, notDeleted } from "@/lib/db";

const records = await db.record.findMany({
  where: {
    ...ownershipFilter(userId),
    ...notDeleted(),
  },
});
```

### 8. Authentication Security

NextAuth.js provides:
- CSRF protection (automatic)
- Secure session cookies (HttpOnly, Secure, SameSite)
- Password hashing (bcrypt)
- JWT-based middleware (lightweight, Edge-compatible)

## Security Checklist

Before deploying, verify:

- [ ] `NEXTAUTH_SECRET` is a strong random value (32+ chars)
- [ ] `DATABASE_URL` uses SSL (`?sslmode=require`)
- [ ] Environment variables are not committed to git
- [ ] Rate limiting is enabled on auth endpoints
- [ ] Input validation on all user-submitted data
- [ ] Error messages don't expose sensitive info
- [ ] Audit logging is enabled for sensitive actions
- [ ] Dependencies are up to date (`npm audit`)

## Incident Response

If you discover a security vulnerability:

1. Do not open a public issue
2. Email security@yourdomain.com
3. Include steps to reproduce
4. Allow 90 days for a fix before disclosure

## Compliance

This template is designed to support:

- **SOC 2 Type II**: Audit logging, access controls, encryption
- **GDPR**: Data export, deletion, consent tracking
- **OWASP Top 10**: Protection against common vulnerabilities

## Dependencies

Security-relevant dependencies:
- `bcryptjs`: Password hashing
- `next-auth`: Authentication framework
- `zod`: Input validation
- `prisma`: SQL injection prevention
