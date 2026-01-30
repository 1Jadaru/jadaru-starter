import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma client with security configurations
 * 
 * Security features:
 * - Query logging in development only
 * - Error logging in production
 * - Connection pooling limits
 * - Singleton pattern to prevent connection exhaustion
 */
export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" 
      ? ["query", "error", "warn"] 
      : ["error"],
    // Note: Connection limits are set via DATABASE_URL params:
    // ?connection_limit=5&pool_timeout=10
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

/**
 * Ensure user can only access their own resources
 * Use this in API routes to enforce data isolation
 * 
 * Usage:
 * ```ts
 * const property = await db.property.findFirst({
 *   where: {
 *     id: propertyId,
 *     ...ownershipFilter(session.user.id),
 *   },
 * });
 * ```
 */
export function ownershipFilter(userId: string) {
  return { userId };
}

/**
 * Soft delete filter - exclude deleted records by default
 * 
 * Usage:
 * ```ts
 * const records = await db.record.findMany({
 *   where: {
 *     ...notDeleted(),
 *   },
 * });
 * ```
 */
export function notDeleted() {
  return { deletedAt: null };
}

/**
 * Perform a soft delete instead of hard delete
 * 
 * Usage:
 * ```ts
 * await softDelete(db.record, recordId);
 * ```
 */
export async function softDelete<T extends { update: (args: { where: { id: string }; data: { deletedAt: Date } }) => Promise<unknown> }>(
  model: T,
  id: string
): Promise<void> {
  await model.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

/**
 * Transaction helper with automatic rollback on error
 * 
 * Usage:
 * ```ts
 * await transaction(async (tx) => {
 *   await tx.property.create({ ... });
 *   await tx.record.create({ ... });
 * });
 * ```
 */
export async function transaction<T>(
  fn: (tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">) => Promise<T>
): Promise<T> {
  return db.$transaction(fn, {
    maxWait: 5000, // 5 seconds max wait for transaction slot
    timeout: 10000, // 10 seconds max transaction duration
  });
}

/**
 * Health check for database connection
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
