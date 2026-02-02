import * as Sentry from "@sentry/nextjs";

/**
 * Sentry Server Configuration
 *
 * This configures error tracking for the server side (API routes, SSR).
 */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Only enable in production
  enabled: process.env.NODE_ENV === "production",

  // Filter out expected errors
  ignoreErrors: [
    // Auth errors (expected)
    "NEXT_NOT_FOUND",
    "NEXT_REDIRECT",
  ],
});
