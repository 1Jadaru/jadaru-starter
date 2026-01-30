import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

/**
 * Application error types
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = "INTERNAL_ERROR",
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public errors?: Record<string, string[]>) {
    super(message, 400, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, 401, "AUTHENTICATION_ERROR");
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = "Permission denied") {
    super(message, 403, "AUTHORIZATION_ERROR");
    this.name = "AuthorizationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class RateLimitError extends AppError {
  constructor(_retryAfter?: number) {
    super("Too many requests", 429, "RATE_LIMIT_EXCEEDED");
    this.name = "RateLimitError";
  }
}

/**
 * Safe error response that never exposes sensitive information
 * 
 * Usage:
 * ```ts
 * try {
 *   // ... your logic
 * } catch (error) {
 *   return handleApiError(error);
 * }
 * ```
 */
export function handleApiError(error: unknown): NextResponse {
  // Log the full error for debugging (server-side only)
  // eslint-disable-next-line no-console
  console.error("[API Error]", error);

  // Known application errors - safe to expose message
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        ...(error instanceof ValidationError && error.errors
          ? { errors: error.errors }
          : {}),
      },
      { status: error.statusCode }
    );
  }

  // Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        errors: error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // Prisma errors - don't expose internal details
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A record with this value already exists", code: "DUPLICATE" },
        { status: 409 }
      );
    }
    
    // Record not found
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Record not found", code: "NOT_FOUND" },
        { status: 404 }
      );
    }
    
    // Foreign key constraint
    if (error.code === "P2003") {
      return NextResponse.json(
        { error: "Related record not found", code: "INVALID_REFERENCE" },
        { status: 400 }
      );
    }
  }

  // Unknown errors - never expose details in production
  const isDev = process.env.NODE_ENV === "development";
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  const errorStack = error instanceof Error ? error.stack : undefined;
  
  return NextResponse.json(
    {
      error: isDev ? errorMessage : "An unexpected error occurred",
      code: "INTERNAL_ERROR",
      ...(isDev && errorStack ? { stack: errorStack } : {}),
    },
    { status: 500 }
  );
}

/**
 * Assert a condition and throw if false
 * 
 * Usage:
 * ```ts
 * assertAuth(session, "Must be logged in");
 * assertOwnership(resource.userId === session.user.id, "Not your resource");
 * ```
 */
export function assertAuth(
  condition: unknown,
  message?: string
): asserts condition {
  if (!condition) {
    throw new AuthenticationError(message);
  }
}

export function assertOwnership(
  condition: boolean,
  message?: string
): asserts condition {
  if (!condition) {
    throw new AuthorizationError(message);
  }
}

export function assertFound<T>(
  value: T | null | undefined,
  resource?: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new NotFoundError(resource);
  }
}
