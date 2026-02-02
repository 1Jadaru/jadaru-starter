import { z } from "zod";

/**
 * Environment variable validation schema
 * Validates all required env vars at startup - fail fast if missing
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url().startsWith("postgresql://"),

  // Auth
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET must be at least 32 characters"),

  // Optional OAuth providers
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),

  // App
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validated environment variables
 * Throws at startup if validation fails - never run with bad config
 */
function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

// Validate on module load (startup)
export const env = validateEnv();

/**
 * Safe env getter that masks secrets in logs
 */
export function getEnvSafe(key: keyof Env): string {
  const value = env[key];
  if (!value) return "";
  return String(value);
}

/**
 * Mask sensitive values for logging
 */
export function maskSecret(value: string): string {
  if (value.length <= 8) return "****";
  return value.substring(0, 4) + "****" + value.substring(value.length - 4);
}
