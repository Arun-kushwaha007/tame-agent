# Automated SEO Regression Testing Suites

Automated tests prevent accidental SEO regressions (e.g. broken canonical URLs, temporary 302 redirects, missing metadata, or soft 404s).

---

### Vitest SEO SOP Compliance Test (`tests/unit/seo-compliance.test.ts`)

```typescript
import { describe, it, expect } from "vitest";
import nextConfig from "../../next.config";
import { normalizePath, getCanonicalUrl } from "@/lib/seo/url";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("Technical SEO Regression Defense", () => {
  describe("1. Canonical URL Normalization", () => {
    it("strips trailing slashes, query parameters, and hashes", () => {
      expect(normalizePath("/products/")).toBe("/products");
      expect(normalizePath("/pricing?plan=pro&ref=twitter")).toBe("/pricing");
      expect(normalizePath("/features#specs")).toBe("/features");
      expect(normalizePath("/")).toBe("/");
    });

    it("constructs absolute HTTPS canonical URLs", () => {
      const canonical = getCanonicalUrl("/pricing");
      expect(canonical.startsWith("https://")).toBe(true);
      expect(canonical.endsWith("/pricing")).toBe(true);
    });

    it("enforces trailingSlash: false in next.config", () => {
      expect((nextConfig as { trailingSlash?: boolean }).trailingSlash).toBe(false);
    });
  });

  describe("2. Redirects & Status Codes", () => {
    it("ensures all configured redirects are permanent (never 302)", async () => {
      if (typeof nextConfig.redirects === "function") {
        const redirects = await nextConfig.redirects();
        expect(redirects.length).toBeGreaterThan(0);
        for (const r of redirects) {
          expect(r.permanent).toBe(true);
        }
      }
    });
  });

  describe("3. XML Sitemap & Robots Directives", () => {
    it("sitemap entries use absolute HTTPS canonical URLs without trailing slashes", async () => {
      const entries = await sitemap();
      expect(entries.length).toBeGreaterThan(0);
      for (const entry of entries) {
        expect(entry.url.startsWith("https://")).toBe(true);
        if (new URL(entry.url).pathname !== "/") {
          expect(entry.url.endsWith("/")).toBe(false);
        }
      }
    });

    it("robots.txt references sitemap and protects private routes", () => {
      const robotsConfig = robots();
      expect(robotsConfig.sitemap).toBeDefined();
      if (Array.isArray(robotsConfig.rules)) {
        const globalRule = robotsConfig.rules.find((r) => r.userAgent === "*");
        expect(globalRule?.disallow).toContain("/api/");
      }
    });
  });
});
```
