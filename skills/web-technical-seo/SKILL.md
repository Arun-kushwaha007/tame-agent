---
name: web-technical-seo
description: Technical SEO engineering patterns - canonical URL governance, metadata factory, multi-layer canonical defense, dynamic XML sitemaps, robots.txt directives, 301/308 redirects, HTTP status codes, structured data JSON-LD schema governance
---

# Technical SEO Engineering Patterns

> **Quick Guide:** Organic search traffic requires strict technical engineering discipline. SEO is product architecture, not an afterthought. Every indexable page must have one authoritative canonical URL, return true HTTP 200 status codes, provide complete metadata pre-rendered on the server (Server Components), use direct crawlable internal links, and adhere to strict Schema.org / JSON-LD governance (never add speculative schemas without explicit user authorization).

**Detailed Resources:**

- [examples/canonical-defense.md](examples/canonical-defense.md) — canonical URL normalization, preferred hostname defense, and link helpers
- [examples/metadata-factory.md](examples/metadata-factory.md) — centralized `constructMetadata` utility, title template deduplication, and OpenGraph/Twitter cards
- [examples/sitemaps-and-robots.md](examples/sitemaps-and-robots.md) — dynamic XML sitemaps, category indexation, robots.txt directives, and staging protection
- [examples/schema-governance.md](examples/schema-governance.md) — structured data rules, JSON-LD sanitization, and no-speculative-schema policy
- [examples/status-codes-and-redirects.md](examples/status-codes-and-redirects.md) — permanent 301/308 vs temporary redirects, handling 404 with `notFound()`, soft-404 defense
- [examples/seo-testing.md](examples/seo-testing.md) — automated Vitest regression suites for canonical URLs, metadata completeness, and sitemap integrity
- [reference.md](reference.md) — HTTP status code matrix, SEO checklist, and architectural contracts

---

## The 7 Core Architectural Pillars

### 1. URL Canonicalization & Preferred Hostname
- **One Authoritative URL**: Every page must have exactly one preferred canonical URL.
- **Consistent Hostname**: The site must enforce a single canonical origin (e.g. `https://www.example.com` or `https://example.com`). All secondary hostnames must permanently redirect via 301/308.
- **Trailing Slash Consistency**: Pick one convention (`trailingSlash: false` or `true`) and enforce it globally across router configuration, metadata, and internal links.
- **Clean Canonical Paths**: Strip marketing query parameters (`?utm_source=...`) and hash fragments (`#faq`) from `<link rel="canonical">` to prevent duplicate indexation.
- **Absolute URLs**: Canonical tags and OpenGraph URLs must always use absolute HTTPS URLs.

### 2. HTTP Status Code Discipline
- **`200 OK`**: Only valid, indexable pages.
- **`301 / 308`**: Permanent migrations or canonical normalization. Never use `302` for permanent moves.
- **`404 Not Found`**: Page genuinely does not exist. Must render standard `not-found.tsx` with true 404 HTTP status code. **Zero soft 404s** (pages that display "Not Found" but return HTTP 200).
- **`410 Gone`**: Content intentionally and permanently removed without replacement.
- **Redirect Loops & Chains**: Every internal link must point directly to the final 200 OK destination. Eliminate hops in navigation, footer, and breadcrumb links.

### 3. XML Sitemap Management
- **Strict 200 OK Only**: Include only canonical, live, public URLs returning HTTP 200.
- **Exclude Non-Indexable Paths**: Exclude redirected, `404`, `noindex`, authenticated, checkout/funnel, and utility URLs.
- **Consistent Hostname**: Every `<loc>` entry must use the exact preferred origin with HTTPS.
- **Accurate `<lastmod>`**: Update only when substantive page content changes.

### 4. Robots.txt & Indexability
- **Preserve Rendering Resources**: Never disallow CSS, JavaScript, fonts, or image assets needed by search engine crawlers (Googlebot) to render the DOM.
- **Protect Non-Production**: Staging and preview environments must be protected via `noindex, nofollow` headers or password gates.
- **Targeted `noindex`**: Reserve `noindex` for authenticated pages, search result filters, and private workflows. Do not substitute `robots.txt` disallow for `noindex`.

### 5. Internal Linking Integrity
- **Semantic HTML Links**: Use standard `<a href="...">` or Next.js `<Link href="...">`. Never use click handlers on `<div>` or `<span>` for navigation.
- **Direct Destinations**: Never point internal links to URLs that trigger a redirect or 404.
- **Descriptive Anchor Text**: Use meaningful, context-rich anchor text; avoid generic "click here" or "learn more".

### 6. Server-Side Page Rendering & Metadata Factory
- **Server Components (RSC) for Content**: Pre-render all public SEO content on the server. Crawlers must receive complete HTML on the first byte with zero client-side JavaScript waterfalls.
- **Unique Metadata**: Every indexable page must export a strongly typed `metadata` object or `generateMetadata` function with unique `title`, `description`, and OpenGraph tags.
- **Single Semantic `<h1>`**: Every page must have exactly one relevant `<h1>` heading aligned with the page's primary search intent.
- **Title Template Deduplication**: Structure the root layout template (e.g. `%s | Brand`) so child pages provide clean titles without accidental brand name duplication.

### 7. Structured Data & Schema Governance
- **Never Add Schemas Autonomously**: Agents and developers must **never inject or invent Schema.org JSON-LD structured data** without explicit instruction from the user.
- **Zero Fabricated Data**: Never invent fake ratings, reviews, dummy addresses, or placeholder services in schemas.
- **Visible Parity**: Any schema data must match user-visible content on the page 1:1.
- **Deep URL Sanitization**: All `@id`, `url`, and `publisher.url` fields in JSON-LD must use the canonical origin.
