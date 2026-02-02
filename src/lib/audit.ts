/**
 * Audit logging for security and compliance
 *
 * Tracks user actions for:
 * - Security monitoring
 * - Compliance (SOC 2, GDPR)
 * - Debugging and support
 * - Analytics
 */

export type AuditAction =
  | "user.login"
  | "user.logout"
  | "user.register"
  | "user.password_change"
  | "user.delete"
  | "resource.create"
  | "resource.read"
  | "resource.update"
  | "resource.delete"
  | "export.generate"
  | "admin.action";

export interface AuditLogEntry {
  timestamp: string;
  action: AuditAction;
  userId: string | null;
  resourceType?: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  errorMessage?: string;
}

/**
 * Log an audit event
 *
 * In production, this should write to:
 * - A dedicated audit log table in the database
 * - An external logging service (Datadog, Splunk, etc.)
 * - Both for redundancy
 *
 * Usage:
 * ```ts
 * await auditLog({
 *   action: "resource.create",
 *   userId: session.user.id,
 *   resourceType: "Property",
 *   resourceId: property.id,
 *   metadata: { address: property.address },
 *   success: true,
 * });
 * ```
 */
export async function auditLog(entry: Omit<AuditLogEntry, "timestamp">): Promise<void> {
  const logEntry: AuditLogEntry = {
    timestamp: new Date().toISOString(),
    ...entry,
  };

  // In development, log to console
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("[AUDIT]", JSON.stringify(logEntry, null, 2));
    return;
  }

  // In production, persist to database
  // TODO: Implement database persistence
  // await db.auditLog.create({ data: logEntry });

  // Also log to structured logging service (intentional console use)
  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ type: "audit", ...logEntry }));
}

/**
 * Create an audit log middleware for API routes
 *
 * Usage:
 * ```ts
 * export async function POST(req: NextRequest) {
 *   return withAuditLog(req, "resource.create", async () => {
 *     // ... your handler logic
 *     return NextResponse.json(result);
 *   });
 * }
 * ```
 */
export async function withAuditLog<T>(
  req: Request,
  action: AuditAction,
  handler: () => Promise<T>,
  options?: {
    userId?: string;
    resourceType?: string;
    resourceId?: string;
    metadata?: Record<string, unknown>;
  }
): Promise<T> {
  const startTime = Date.now();

  try {
    const result = await handler();

    await auditLog({
      action,
      userId: options?.userId ?? null,
      resourceType: options?.resourceType,
      resourceId: options?.resourceId,
      metadata: {
        ...options?.metadata,
        durationMs: Date.now() - startTime,
      },
      ipAddress: req.headers.get("x-forwarded-for") ?? undefined,
      userAgent: req.headers.get("user-agent") ?? undefined,
      success: true,
    });

    return result;
  } catch (error) {
    await auditLog({
      action,
      userId: options?.userId ?? null,
      resourceType: options?.resourceType,
      resourceId: options?.resourceId,
      metadata: {
        ...options?.metadata,
        durationMs: Date.now() - startTime,
      },
      ipAddress: req.headers.get("x-forwarded-for") ?? undefined,
      userAgent: req.headers.get("user-agent") ?? undefined,
      success: false,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    });

    throw error;
  }
}

/**
 * Sanitize sensitive data before logging
 * Removes or masks PII and secrets
 */
export function sanitizeForLogging(data: Record<string, unknown>): Record<string, unknown> {
  const sensitiveKeys = ["password", "token", "secret", "apiKey", "creditCard", "ssn", "email"];

  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();

    if (sensitiveKeys.some((k) => lowerKey.includes(k))) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeForLogging(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}
