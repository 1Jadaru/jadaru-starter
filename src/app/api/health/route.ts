import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/db";

/**
 * Health check endpoint for monitoring and load balancers
 * 
 * Returns:
 * - 200 OK: All systems healthy
 * - 503 Service Unavailable: Database or other critical service down
 * 
 * Usage:
 * - Load balancer health checks
 * - Uptime monitoring (Pingdom, UptimeRobot, etc.)
 * - Kubernetes liveness/readiness probes
 */
export async function GET() {
  const startTime = Date.now();
  
  // Check database connectivity
  const dbHealthy = await checkDatabaseHealth();
  
  const responseTime = Date.now() - startTime;
  
  const health = {
    status: dbHealthy ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "unknown",
    uptime: process.uptime(),
    checks: {
      database: dbHealthy ? "connected" : "disconnected",
    },
    responseTimeMs: responseTime,
  };
  
  if (!dbHealthy) {
    return NextResponse.json(health, { status: 503 });
  }
  
  return NextResponse.json(health, { status: 200 });
}
