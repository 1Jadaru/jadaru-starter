import { NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  limit: number; // Max requests per interval
}

// In-memory store (use Redis in production for multi-instance)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple rate limiter for API routes
 *
 * Usage in API route:
 * ```ts
 * import { rateLimit, getClientIp } from "@/lib/rate-limit";
 *
 * export async function POST(req: NextRequest) {
 *   const ip = getClientIp(req);
 *   const { success, remaining } = rateLimit(ip, { limit: 5, interval: 60000 });
 *
 *   if (!success) {
 *     return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 *   }
 *   // ... handle request
 * }
 * ```
 */
export function rateLimit(
  key: string,
  config: RateLimitConfig = { interval: 60000, limit: 10 }
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  // Clean up expired entries periodically
  if (Math.random() < 0.01) {
    cleanupExpiredEntries();
  }

  if (!record || now > record.resetTime) {
    // First request or window expired
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + config.interval,
    });
    return { success: true, remaining: config.limit - 1, resetTime: now + config.interval };
  }

  if (record.count >= config.limit) {
    // Rate limit exceeded
    return { success: false, remaining: 0, resetTime: record.resetTime };
  }

  // Increment count
  record.count++;
  rateLimitStore.set(key, record);
  return { success: true, remaining: config.limit - record.count, resetTime: record.resetTime };
}

/**
 * Get client IP from request headers
 */
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");

  if (forwarded) {
    const firstIp = forwarded.split(",")[0];
    return firstIp ? firstIp.trim() : "unknown";
  }

  if (realIp) {
    return realIp;
  }

  return "unknown";
}

/**
 * Create rate limit response with proper headers
 */
export function rateLimitResponse(resetTime: number): NextResponse {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": String(resetTime),
      },
    }
  );
}

/**
 * Clean up expired rate limit entries
 */
function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // Auth endpoints - stricter limits
  auth: { interval: 60000, limit: 5 }, // 5 per minute
  register: { interval: 3600000, limit: 3 }, // 3 per hour

  // API endpoints - standard limits
  api: { interval: 60000, limit: 60 }, // 60 per minute

  // Report generation - expensive operation
  report: { interval: 60000, limit: 5 }, // 5 per minute
} as const;
