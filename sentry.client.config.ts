import * as Sentry from "@sentry/nextjs";

/**
 * Sentry Client Configuration
 *
 * This configures error tracking for the browser/client side.
 *
 * Setup:
 * 1. Create a Sentry project at https://sentry.io
 * 2. Add NEXT_PUBLIC_SENTRY_DSN to your environment variables
 * 3. Errors will automatically be captured and reported
 */
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Session Replay (optional - captures user sessions for debugging)
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Only enable in production
  enabled: process.env.NODE_ENV === "production",

  // Filter out noisy errors
  ignoreErrors: [
    // Browser extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Network errors
    "Network request failed",
    "Failed to fetch",
    "Load failed",
    // User aborted
    "AbortError",
  ],

  // Add context to errors
  beforeSend(event) {
    // Don't send errors in development
    if (process.env.NODE_ENV !== "production") {
      return null;
    }
    return event;
  },
});
