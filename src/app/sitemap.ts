import { MetadataRoute } from "next";

/**
 * Sitemap Configuration
 * 
 * Generates a sitemap.xml for search engines.
 * Add dynamic pages (blog posts, products, etc.) here.
 * 
 * See: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://example.com";

  // Static pages
  const staticPages = [
    "",           // Home
    "/login",
    "/register",
    "/privacy",
    "/terms",
  ];

  const staticEntries = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  // Dynamic pages - fetch from database
  // Example:
  // const posts = await db.post.findMany({ where: { published: true } });
  // const postEntries = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: "weekly" as const,
  //   priority: 0.6,
  // }));

  return [
    ...staticEntries,
    // ...postEntries,
  ];
}
