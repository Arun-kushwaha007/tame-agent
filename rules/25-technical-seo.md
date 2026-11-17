# Rule 25: Technical SEO Development & Deployment SOP

> **Authority**: Technical SEO Standard Operating Procedure (SOP)  
> **Status**: MANDATORY & STRICTLY ENFORCED  
> **Scope**: All website development, redesigns, migrations, landing pages, blogs, dynamic routes, URL modifications, route handlers, middleware, and server-side configurations.

---

## 1. Executive Purpose & Governance

Organic search is a primary customer acquisition channel. Search engine visibility depends on clean URL structure, strict canonicalization, crawl budget efficiency, complete metadata, and schema integrity.

Every engineer, autonomous AI agent, and pair programmer must adhere to this Standard Operating Procedure (SOP). **Zero non-canonical URLs, soft 404s, redirect loops, unrequested schemas, or broken internal links are tolerated.**

---

## 2. The 7 Core Architectural Sections

### 2.1 URL Structure & Canonicalization

1. **One Preferred URL**: Every page must have exactly one authoritative URL.
2. **Single Preferred Hostname**: The website must strictly enforce a single preferred origin (e.g. `[CUSTOMIZE: canonical_origin, e.g. https://www.example.com]`). Naked domains or secondary hostnames must permanently redirect via HTTP `301` or `308`.
3. **Self-Referencing Canonicals**: Every indexable page must declare a self-referencing canonical tag (`<link rel="canonical" href="...">`).
4. **Absolute Canonical URLs**: Canonical URLs must use absolute URLs with HTTPS and the preferred hostname.
5. **No Toxic Canonical Targets**: Canonical tags must NEVER point to unrelated pages, redirected URLs, 404 error pages, or staging/dev environments.
6. **Consistent Trailing Slash Convention**: Trailing slashes must be consistent across all routes (e.g. omitted via `trailingSlash: false` in `next.config.ts`, except the root path `/`).
7. **Clean Canonical Paths**: Query parameters (`?utm=...`, `?ref=...`) and hash fragments (`#faq`) must be completely stripped from canonical tags to prevent duplicate indexation.

### 2.2 HTTP Status Code Management

Ensure every URL returns the appropriate HTTP response code:

| Status Code              | Semantics & Mandatory Usage                                                               |
| :----------------------- | :---------------------------------------------------------------------------------------- |
| **`200 OK`**             | Valid, accessible, indexable content page.                                                |
| **`301 / 308`**          | Permanent URL migration or canonical normalization.                                       |
| **`302`**                | Temporary redirect only (NEVER use for permanent URL migrations).                         |
| **`307`**                | Temporary redirect preserving HTTP request method.                                        |
| **`404 Not Found`**      | Page genuinely does not exist. Must render standard `not-found.tsx` with true 404 status. |
| **`410 Gone`**           | Page permanently removed with no replacement.                                             |
| **`500 Internal Error`** | Uncaught server error (must be caught and alerted; never shown to crawlers).              |
| **`503 Unavailable`**    | Temporary service downtime or planned maintenance window.                                 |

**Mandatory Rules**:

1. Never use `302` for permanent URL migrations.
2. Do not execute blanket redirects of deleted pages to the homepage (which creates soft 404s).
3. Do not allow internal links to point to 404 URLs.
4. Redirect old or deprecated URLs strictly to their closest relevant replacement.
5. Avoid redirect chains and redirect loops.
6. Every redirect destination must return an HTTP `200` response.
7. A valid, indexed page must not accidentally return a `404` or `5xx` response.
8. Custom 404 pages must return an actual HTTP `404` status, NEVER an HTTP `200` (zero soft 404s).

### 2.3 XML Sitemap Management

1. **Strict 200 OK Indexable Inclusions**: Only canonical, indexable, live URLs returning HTTP `200` may be listed in sitemaps.
2. **Strict Exclusions**: Exclude all redirected, `404`, `410`, `noindex`, authenticated, checkout/funnel, and non-canonical URLs.
3. **Dynamic Updates**: Sitemaps must update automatically whenever URLs are added, modified, or removed.
4. **Host Consistency**: All sitemap `<loc>` entries must use the exact preferred HTTPS origin.
5. **Accurate `lastmod`**: Update `<lastmod>` timestamps ONLY when meaningful page content or significant page information changes.
6. **Valid XML Syntax**: Maintain valid XML syntax compliant with the Sitemap 0.9 protocol.

### 2.4 Robots.txt & Indexability

1. **Preserve Core Acquisition Routes**: Never block important landing pages, blogs, or product pages.
2. **Preserve Rendering Resources**: Do not block CSS, JavaScript, fonts, or images required by search engine bots for page rendering.
3. **Environment Protection**: Staging, testing, and development environments must be protected from public indexing (`noindex, nofollow` headers or password gating).
4. **Targeted `noindex`**: `noindex` directives must only be applied to explicitly approved exclusion routes (authenticated dashboard, multi-step checkout funnels, callback handlers).
5. **No `robots.txt` Substitution for `noindex`**: Robots.txt disallow directives must NOT be used as a replacement for `noindex` meta tags. Both must be coordinated in tandem.
6. **Pre-Deployment Verification**: Verify `robots.txt` changes before every production deployment.

### 2.5 Internal Linking

1. **Direct Destination Links**: Internal links in navigation, footers, breadcrumbs, and content must point directly to the final destination URL.
2. **Zero Links to Redirects or 404s**: Never link to a URL that returns a 301/308 redirect or a 404 error.
3. **Uniform Conventions**: Maintain consistent hostname, HTTPS, and lowercase without trailing slashes.
4. **Crawlable Navigation**: Important pages must be accessible through crawlable semantic HTML links (`<a href="...">` or Next.js `<Link>`).
5. **Zero Redirect Chains**: Avoid redirect hops within navigation bars, mega-menus, breadcrumbs, and footer links.
6. **Synchronous Link Updates**: Update internal links immediately whenever any target URL changes.

### 2.6 Page Rendering & Metadata

1. **Initial HTML Accessibility**: Important SEO content must be fully rendered server-side (Server Components) and immediately accessible to search engines on the initial response.
2. **Unique Metadata**: Every indexable page must have an appropriate, unique, and compelling `<title>` and `<meta name="description">`.
3. **Single Semantic H1**: Each page must contain exactly one relevant semantic `<h1>` element matching the core search intent.
4. **Head Directives**: Canonical link and robots directives must be present in the initial rendered HTML `<head>`.
5. **No JS Stripping**: JavaScript hydration must never remove or replace critical SEO elements rendered on the server.
6. **Structured Data Parity**: Structured data must accurately reflect visible content on the page.
7. **Zero Duplicate Brand Repetition**: Avoid duplicate metadata caused by layout templates. Child routes must provide only the clean semantic title segment when root layout uses a template (`%s | Brand`).

### 2.7 Structured Data & Schema Governance

1. **Never Add Schemas Autonomously**: AI agents and engineers must **NEVER** add, inject, or invent any Schema.org structured data (JSON-LD) unless explicitly instructed by the user in the prompt.
2. **Relevant Schemas Only**: When requested, implement only schema types explicitly relevant to the page (`Article`, `BreadcrumbList`, `FAQPage`, `Product`, `Organization`).
3. **Visible Content Parity**: Schema properties must accurately reflect user-visible content.
4. **Zero Fabricated Data**: Do NOT publish fabricated ratings, fake reviews, imaginary prices, placeholder phone numbers, or dummy office addresses.
5. **Valid JSON-LD Syntax**: Validate JSON-LD syntax prior to deployment.
6. **Content Synchronization**: Update schema markup whenever the corresponding page information changes.

---

## 3. Mandatory SEO Compliance Policy

Going forward, every website development activity, redesign, deployment, URL modification, or technical change must follow this SOP:

1. **No URL Modification Without Review**: No existing URL should be modified, deleted, or redirected without evaluating its SEO impact.
2. **Mandatory Correct Canonical**: Every indexable page must have the correct canonical URL pointing to `[CUSTOMIZE: canonical_origin]`.
3. **Consistent Hostname**: The preferred hostname must remain consistent throughout the website.
4. **Strict Permanent Status Codes**: Permanent redirects must strictly use `301` or `308` status codes.
5. **Zero Accidental 404s or Noindexes**: Important pages must not accidentally return `404`, `5xx`, or `noindex` responses.
6. **Clean XML Sitemaps**: XML sitemaps must contain only valid, canonical, and indexable URLs returning HTTP `200`.
7. **Direct Internal Links**: Internal links must always point directly to their final destination.
8. **Pre-Deployment Validation**: Every deployment must undergo technical SEO validation before production release.
9. **Post-Deployment Validation**: Post-deployment validation is mandatory to verify live status codes, canonical headers, and schema integrity.

---

## 4. Codebase Enforcement Architecture

- **Metadata Factory**: `[CUSTOMIZE: metadata_factory_path, e.g., lib/seo/metadata.ts]`
- **Canonical Normalizer**: `[CUSTOMIZE: canonical_normalizer_path, e.g., lib/seo/url.ts]`
- **Dynamic Sitemaps**: `[CUSTOMIZE: sitemap_path, e.g., app/sitemap.ts]`
- **Robots Directives**: `[CUSTOMIZE: robots_path, e.g., app/robots.ts]`
- **Automated Regression Suites**: `[CUSTOMIZE: test_suite_path, e.g., tests/unit/seo-compliance.test.ts]`
