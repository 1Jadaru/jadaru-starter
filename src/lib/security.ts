import { z } from "zod";

/**
 * Security utilities for input validation and sanitization
 */

/**
 * Common validation schemas for user input
 */
export const validators = {
  // Email with proper format
  email: z.string().email().toLowerCase().trim(),

  // Password with strength requirements
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number"),

  // Strong password (for enterprise)
  strongPassword: z
    .string()
    .min(12, "Password must be at least 12 characters")
    .max(128, "Password must be less than 128 characters")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain a special character"),

  // UUID format
  uuid: z.string().uuid(),

  // CUID format (Prisma default)
  cuid: z.string().cuid(),

  // Safe string (no HTML/script injection)
  safeString: z
    .string()
    .trim()
    .transform((val: string) => sanitizeHtml(val)),

  // URL with protocol
  url: z.string().url(),

  // Phone number (basic)
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),

  // Postal code (US)
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),

  // Date in ISO format
  isoDate: z.string().datetime(),

  // Positive integer
  positiveInt: z.number().int().positive(),

  // Currency amount (2 decimal places)
  currency: z.number().multipleOf(0.01).nonnegative(),
};

/**
 * Sanitize HTML to prevent XSS
 * Removes all HTML tags and entities
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&[^;]+;/g, "") // Remove HTML entities
    .trim();
}

/**
 * Escape string for safe inclusion in HTML
 */
export function escapeHtml(input: string): string {
  const escapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return input.replace(/[&<>"']/g, (char) => escapeMap[char] || char);
}

/**
 * Check if a string contains potential SQL injection patterns
 * Note: Prisma already protects against SQL injection, this is defense in depth
 */
export function hasSqlInjectionPatterns(input: string): boolean {
  const patterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b)/i,
    /(--)/, // SQL comment
    /(;)/, // Statement terminator
    /(\bOR\b.*=.*)/i, // OR-based injection
    /(\bAND\b.*=.*)/i, // AND-based injection
  ];

  return patterns.some((pattern) => pattern.test(input));
}

/**
 * Validate and sanitize file upload
 */
export interface FileValidationOptions {
  maxSizeBytes: number;
  allowedMimeTypes: string[];
  allowedExtensions: string[];
}

export function validateFileUpload(
  file: { name: string; type: string; size: number },
  options: FileValidationOptions
): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > options.maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds maximum of ${options.maxSizeBytes / 1024 / 1024}MB`,
    };
  }

  // Check MIME type
  if (!options.allowedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed`,
    };
  }

  // Check extension
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!extension || !options.allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `File extension .${extension} is not allowed`,
    };
  }

  return { valid: true };
}

/**
 * Default file upload options
 */
export const FILE_UPLOAD_DEFAULTS: FileValidationOptions = {
  maxSizeBytes: 10 * 1024 * 1024, // 10MB
  allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf"],
  allowedExtensions: ["jpg", "jpeg", "png", "gif", "webp", "pdf"],
};

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
export function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}
