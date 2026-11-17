# Structured Data & JSON-LD Schema Governance

## The Golden Rule of Schema Governance

> **Never Add Schemas Autonomously**: AI agents and engineers must **NEVER** inject or invent any Schema.org JSON-LD structured data (e.g. `Article`, `FAQPage`, `Product`, `Organization`) **unless and until explicitly requested by the user**.

### Why This Rule Exists:
- **Google Search Penalties**: Injecting fake reviews, unverified ratings, or inaccurate schema types can lead to manual actions or loss of rich snippet eligibility.
- **Maintenance Debt**: Speculatively added schemas frequently go out of sync with visible content, directly violating Google's structured data quality guidelines.
- **Code Bloat**: Bloating HTML payload with thousands of lines of unverified JSON-LD slows down page performance.

---

### Authorized Schema Implementation Pattern

When the user **explicitly requests** structured data for a page, adhere to these rules:

1. **Visible Parity**: Every piece of data in the schema must appear visibly to the human user on the screen.
2. **Deep URL Sanitization**: All `@id`, `url`, and `publisher.url` fields must pass through canonical URL normalization.
3. **Valid JSON-LD Syntax**: Use `next/script` or a `<script type="application/ld+json">` tag with properly serialized JSON.

```typescript
// lib/seo/schema.ts
import { getCanonicalUrl } from "./url";

interface ArticleSchemaProps {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  imageUrl: string;
}

/**
 * Builds an Article JSON-LD schema with guaranteed canonical URLs.
 * ONLY call this when explicitly instructed.
 */
export function buildArticleSchema({
  headline,
  description,
  slug,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
}: ArticleSchemaProps) {
  const canonicalUrl = getCanonicalUrl(`/blog/${slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline,
    description,
    image: imageUrl,
    datePublished,
    dateModified,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "YourBrand",
      url: getCanonicalUrl("/"),
    },
  };
}
```

### Component Rendering

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { buildArticleSchema } from "@/lib/seo/schema";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound(); // True 404, never render empty content
  }

  const jsonLd = buildArticleSchema({
    headline: post.title,
    description: post.summary,
    slug: post.slug,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    authorName: post.author,
    imageUrl: post.coverImage,
  });

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```
