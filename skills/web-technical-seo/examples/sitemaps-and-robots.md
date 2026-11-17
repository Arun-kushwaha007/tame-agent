# XML Sitemap & Robots.txt Management

## XML Sitemap Generation in Next.js

Next.js App Router provides built-in file conventions for sitemaps (`app/sitemap.ts`) or dynamic route handlers (`app/sitemap.xml/route.ts`).

### Strict Inclusion Rules
1. Only return `200 OK` indexable pages.
2. Exclude `noindex` routes (e.g. `/dashboard`, `/checkout`, `/admin`).
3. Exclude redirected routes (301/308).
4. Exclude 404 dead pages.
5. All `<loc>` URLs must use the authoritative HTTPS canonical domain.

---

### Implementation (`app/sitemap.ts`)

```typescript
// app/sitemap.ts
import type { MetadataRoute } from "next";

const CANONICAL_ORIGIN = process.env.NEXT_PUBLIC_APP_URL || "https://www.example.com";

// Static routes
const STATIC_ROUTES = [
  "",
  "/about-us",
  "/pricing",
  "/features",
  "/contact",
  "/blog",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${CANONICAL_ORIGIN}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic published articles from CMS/DB
  // Note: Only fetch published items; ignore drafts
  const articles = await getPublishedArticles();
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${CANONICAL_ORIGIN}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}

async function getPublishedArticles() {
  // Replace with actual database or CMS query
  return [];
}
```

---

## Robots.txt Directives (`app/robots.ts`)

```typescript
// app/robots.ts
import type { MetadataRoute } from "next";

const CANONICAL_ORIGIN = process.env.NEXT_PUBLIC_APP_URL || "https://www.example.com";
const IS_PRODUCTION = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  // Disallow all crawling on staging, preview, and development environments
  if (!IS_PRODUCTION) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
        "/checkout/",
        "/admin/",
        "/auth/",
        "/_next/",
      ],
    },
    sitemap: `${CANONICAL_ORIGIN}/sitemap.xml`,
  };
}
```
