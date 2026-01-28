// Extend NextAuth types
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// App-specific types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
