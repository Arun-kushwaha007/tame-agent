# Centralized Metadata Factory Pattern

## Why a Metadata Factory?

Directly writing Next.js `metadata` objects in every `page.tsx` causes:
1. **Title duplication**: Layout templates like `%s | Brand` create bugs like `Personal Loans | Brand | Brand`.
2. **Missing Canonical Tags**: Inconsistent or forgotten `alternates.canonical`.
3. **Broken OpenGraph / Twitter Cards**: Missing dimensions, missing absolute URLs for social crawlers.

Using a single `constructMetadata()` helper enforces complete, valid metadata across every route.

---

### Implementation (`lib/seo/metadata.ts`)

```typescript
// lib/seo/metadata.ts
import type { Metadata } from "next";
import { getCanonicalUrl, normalizePath } from "./url";

interface ConstructMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
}

const BRAND_NAME = "YourBrand";
const CANONICAL_ORIGIN = process.env.NEXT_PUBLIC_APP_URL || "https://www.example.com";
const DEFAULT_OG_IMAGE = "/images/og/default.png";

/**
 * Strips brand suffix if inadvertently passed by caller.
 */
function cleanTitle(rawTitle: string): string {
  return rawTitle.replace(new RegExp(`\\s*\\|\\s*${BRAND_NAME}$`, "i"), "").trim();
}

/**
 * Centralized Metadata Builder for Next.js App Router.
 */
export function constructMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  absoluteTitle = false,
}: ConstructMetadataOptions): Metadata {
  const clean = cleanTitle(title);
  const fullTitle = `${clean} | ${BRAND_NAME}`;
  const canonicalUrl = getCanonicalUrl(path);
  const isRoot = normalizePath(path) === "/";

  // Child routes supply clean segment (root layout adds template); root supplies absolute
  const pageTitle = absoluteTitle || isRoot ? { absolute: fullTitle } : clean;

  const absoluteOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${CANONICAL_ORIGIN}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: BRAND_NAME,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: absoluteOgImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteOgImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
```

---

### Usage in Route Pages

```tsx
// app/pricing/page.tsx
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Simple, Transparent Pricing",
  description: "Explore our flexible pricing tiers designed for startups and enterprises.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main>
      <h1>Simple, Transparent Pricing</h1>
      {/* Content */}
    </main>
  );
}
```
