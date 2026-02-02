import { Metadata } from "next";

/**
 * SEO Utilities
 *
 * Helpers for generating metadata, OpenGraph tags, and structured data.
 */

// Site configuration - update these values
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "App",
  description: "Your app description",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://example.com",
  ogImage: "/og-image.png",
  twitterHandle: "@yourhandle",
  locale: "en_US",
};

/**
 * Generate metadata for a page
 *
 * Usage:
 * ```ts
 * export const metadata = generateMetadata({
 *   title: "Dashboard",
 *   description: "View your dashboard",
 *   path: "/dashboard",
 * });
 * ```
 */
export function generateMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const fullDescription = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  return {
    title: fullTitle,
    description: fullDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/**
 * JSON-LD Structured Data for Organization
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      // Add social media URLs
      // "https://twitter.com/yourhandle",
      // "https://linkedin.com/company/yourcompany",
    ],
  };
}

/**
 * JSON-LD Structured Data for WebSite (for search box)
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * JSON-LD Structured Data for a Page/Article
 */
export function articleJsonLd({
  title,
  description,
  publishedAt,
  updatedAt,
  author,
  path,
}: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: {
      "@type": "Person",
      name: author,
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    url: `${siteConfig.url}${path}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };
}

/**
 * Component to inject JSON-LD into the page
 *
 * Usage:
 * ```tsx
 * <JsonLd data={organizationJsonLd()} />
 * ```
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
