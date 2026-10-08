# Rule 60: Performance Standards & Optimization

## Purpose

Ensures the application loads quickly, uses minimal bandwidth, and maintains excellent Core Web Vitals across all devices.

## When It Applies

Applies to build configurations, asset management, image optimization, API fetching, and general frontend performance tuning.

## Non-Negotiable Rules

1. **Build Size Budgets**:
   - Establish and enforce hard configurable thresholds for build sizes in CI.
   - The uncompressed production build output must remain strictly under the platform's hosting limits (e.g., `< 180MB`).
   - The local `public/` directory must not exceed its designated budget (e.g., `< 25MB`).

2. **Image Optimization**:
   - Use framework-native image components (e.g., Next.js `<Image>`) for all raster images.
   - Explicitly define `width`, `height`, `sizes`, and use `priority` for above-the-fold heroes.
   - Avoid responsive distortion by providing explicit inline style fallbacks if needed.

3. **Vector Asset Optimization**:
   - SVGs must contain pure vector paths optimized via SVGO.
   - **Zero embedded base64 raster data in SVGs**.

4. **Core Web Vitals Targets**:
   - **LCP** (Largest Contentful Paint) `< 2.5s`
   - **CLS** (Cumulative Layout Shift) `< 0.1`
   - **INP** (Interaction to Next Paint) `< 200ms`

5. **Asset Offloading Strategy**:
   - Any photographic asset or banner over a specific size threshold (e.g., 100 KB) must be compressed (WebP/AVIF) or served from a CDN rather than bundled locally.

6. **Bundle Analysis and Code Splitting**:
   - Regularly analyze client bundles to ensure third-party libraries and large dependencies are lazy-loaded or code-split effectively.
