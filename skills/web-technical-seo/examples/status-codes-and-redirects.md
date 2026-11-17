# Status Code Management & Redirect Patterns

## Handling HTTP Status Codes in Next.js

Search engines classify websites by the HTTP response status codes returned by each route. Mismatched status codes destroy crawl efficiency.

---

### 1. Permanent vs Temporary Redirects

- **Use `301` or `308`** for permanent moves, legacy path migrations, and canonical domain enforcement.
- **Never use `302`** for permanent moves; `302` tells search engines to keep indexing the old URL.

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      // 1. Host Redirection (naked to www or www to naked)
      {
        source: "/:path*",
        has: [{ type: "host", value: "example.com" }],
        destination: "https://www.example.com/:path*",
        permanent: true, // HTTP 308 permanent redirect
      },
      // 2. Legacy URL migration
      {
        source: "/old-products/:slug",
        destination: "/products/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

---

### 2. Handling Missing Resources (Real 404 vs Soft 404)

- **Soft 404 Bug**: A page displays "Sorry, item not found" but the HTTP response status is `200 OK`. Google flags this as a quality defect.
- **Fix**: Always call Next.js `notFound()` from `next/navigation` when a requested entity does not exist in dynamic routes or in `generateMetadata`.

```tsx
// app/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound(); // Emits true 404 status in head
  }

  return constructMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${slug}`,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound(); // Renders app/not-found.tsx with HTTP 404 status
  }

  return <div>{product.name}</div>;
}
```

---

### 3. Avoiding Blanket Homepage Redirects

- **Prohibited**: Redirecting all retired or 404 URLs to `/`. Google treats mass redirects to the homepage as soft 404s.
- **Correct**: Redirect to the most closely related category page, or return an explicit HTTP 404 (or 410 if permanently removed).
