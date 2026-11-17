# Canonical Defense & URL Normalization

## The Multi-Layer Canonical Defense Pattern

To guarantee search engines never see duplicated URLs, split domain authority, or query string clutter, implement a multi-layer defense:

1. **Edge Proxy / Middleware**: Enforce canonical hostname redirect (e.g. `non-www` -> `www` or vice versa) via HTTP 301/308.
2. **Centralized URL Helper (`lib/seo/url.ts`)**: Normalize all rendered paths and links.
3. **Canonical Link Component (`components/ui/canonical-link.tsx`)**: Safe link wrapper ensuring clean paths.
4. **Build-Time Linter**: Custom ESLint rule preventing naked domain string literals in source code.

---

### Centralized Canonical URL Helper (`lib/seo/url.ts`)

```typescript
// lib/seo/url.ts

const CANONICAL_ORIGIN = process.env.NEXT_PUBLIC_APP_URL || "https://www.example.com";

/**
 * Normalizes an internal path by:
 * 1. Stripping query parameters
 * 2. Stripping hash fragments
 * 3. Removing trailing slashes (except root "/")
 * 4. Lowercasing path
 */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";

  // Strip query string and hash
  let clean = path.split("?")[0].split("#")[0];

  // Ensure leading slash
  if (!clean.startsWith("/")) {
    clean = `/${clean}`;
  }

  // Remove trailing slashes
  clean = clean.replace(/\/+$/, "");

  return clean.toLowerCase() || "/";
}

/**
 * Constructs an absolute, authoritative canonical URL.
 */
export function getCanonicalUrl(path: string): string {
  const normalized = normalizePath(path);
  return normalized === "/" ? CANONICAL_ORIGIN : `${CANONICAL_ORIGIN}${normalized}`;
}

/**
 * Normalizes an href before passing to Next.js <Link> or <a>.
 * Rewrites any external non-canonical domain occurrences back to relative or canonical.
 */
export function toCanonicalHref(href: string): string {
  if (!href) return "/";

  // If already relative, normalize clean path
  if (href.startsWith("/")) {
    return normalizePath(href);
  }

  // Handle absolute URL pointing to our domain
  try {
    const url = new URL(href);
    if (url.hostname.includes("example.com")) {
      return normalizePath(url.pathname);
    }
  } catch {
    // Return as-is if invalid URL
  }

  return href;
}
```

---

### Canonical Link Component (`components/ui/canonical-link.tsx`)

```tsx
// components/ui/canonical-link.tsx
import React from "react";
import Link, { type LinkProps } from "next/link";
import { toCanonicalHref } from "@/lib/seo/url";

interface CanonicalLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
}

/**
 * Safe drop-in replacement for Next.js <Link> that guarantees clean canonical paths.
 */
export const CanonicalLink = React.forwardRef<HTMLAnchorElement, CanonicalLinkProps>(
  ({ href, children, ...props }, ref) => {
    const normalizedHref = typeof href === "string" ? toCanonicalHref(href) : href;
    return (
      <Link ref={ref} href={normalizedHref} {...props}>
        {children}
      </Link>
    );
  }
);

CanonicalLink.displayName = "CanonicalLink";
```
