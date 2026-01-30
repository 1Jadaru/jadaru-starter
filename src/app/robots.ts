import { MetadataRoute } from "next";

/**
 * Robots.txt Configuration
 * 
 * Controls which pages search engines can crawl.
 * See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://example.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",        // API routes
          "/admin/",      // Admin pages
          "/dashboard/",  // User dashboard (private)
          "/_next/",      // Next.js internals
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
