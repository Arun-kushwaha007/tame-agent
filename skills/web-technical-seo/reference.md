# Technical SEO Reference & Decision Tables

## HTTP Status Codes Matrix for SEO

| Status Code | Type | Meaning | Permitted Use Cases | Prohibited Patterns |
|---|---|---|---|---|
| `200 OK` | Success | Valid, indexable content | Canonical live routes, blog posts, calculators, products | Soft 404s (serving "Not Found" with 200) |
| `301 Moved Permanently` | Redirect | Resource permanently migrated | Legacy URL migrations, canonical hostname redirects (non-www to www or vice versa) | Temporary campaigns, redirect chains |
| `308 Permanent Redirect` | Redirect | Permanent redirect preserving HTTP method | API endpoints, form migrations | Using for temporary redirects |
| `302 Found` | Redirect | Temporary resource location | A/B testing, temporary maintenance redirects | Permanent URL migrations |
| `307 Temporary Redirect`| Redirect | Temporary redirect preserving HTTP method | Post-login redirects | Permanent domain moves |
| `404 Not Found` | Client Error | Resource does not exist | Genuinely non-existent slugs | Blanket redirecting dead URLs to homepage |
| `410 Gone` | Client Error | Resource permanently deleted with no replacement | Discontinued products or retired articles | Valid live pages returning 410 |
| `500 Internal Error` | Server Error| Unhandled server crash | None (must be caught and alerted) | Exposing stack traces to crawlers |
| `503 Unavailable` | Server Error| Maintenance window or temporary outage | Planned downtime with `Retry-After` header | Long-term outages without notice |

---

## Canonical Normalization Decision Flow

```
Input Path / URL
  │
  ├── 1. Strip query parameters (?utm=..., ?ref=...)
  │
  ├── 2. Strip hash fragments (#reviews, #faq)
  │
  ├── 3. Enforce trailing slash policy (remove trailing slash unless root '/')
  │
  ├── 4. Convert path to lowercase
  │
  ├── 5. Ensure absolute URL with preferred origin (e.g. https://www.yourdomain.com)
  │
  └── Output: Immutable Canonical URL
```

---

## Technical SEO Pre-Launch Checklist

| # | Check Area | Requirement | Pass Criteria |
|---|---|---|---|
| 1 | Canonical URL | Self-referencing tag present on every indexable route | Matches exact preferred origin, no query params |
| 2 | Hostname Redirection | Non-preferred hostnames redirect via 301/308 | Host redirect returns 301/308 to canonical host |
| 3 | Metadata Completeness | Unique title, description, OpenGraph, Twitter tags | Title template adds site name without repetition |
| 4 | Heading Hierarchy | Single semantic `<h1>` element per page | Aligns with primary search intent |
| 5 | XML Sitemap | Listed in `sitemap.xml` | Returns 200 OK, valid XML, excludes private/funnel paths |
| 6 | Robots.txt | Valid rules, sitemap reference included | Googlebot allowed, render assets accessible |
| 7 | Schema Governance | JSON-LD present only if explicitly requested | Zero fake ratings or dummy data, valid syntax |
| 8 | 404 Handling | Dynamic slug lookups call `notFound()` | Returns true HTTP 404 response |
| 9 | Internal Links | Semantic `<Link>` tags with direct destination | Zero links pointing to redirects or 404s |
| 10| Mobile Readiness | Responsive viewport, WCAG AA touch targets | Min 44x44px touch targets, no horizontal overflow |
