"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

/**
 * Global Error Boundary
 * 
 * Catches unhandled errors in the app and reports them to Sentry.
 * Shows a user-friendly error page.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
            <p className="mb-8 text-gray-600">
              We&apos;ve been notified and are working to fix the issue.
            </p>
            <button
              onClick={reset}
              className="rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
