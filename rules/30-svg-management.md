# Rule 30: SVG & Vector Asset Management

## Purpose

Enforces strict standards for managing SVG assets, ensuring they are scalable, accessible, optimized, and consistently implemented across the UI.

## When It Applies

Applies to all SVG icons, illustrations, logos, background watermarks, and vector decorations within the project.

## Non-Negotiable Rules

1. **SVG-as-Component Standard (No Loose Inline SVGs)**:
   - Every reusable SVG — icons, illustrations, decorations, watermarks, brand marks — must be authored as a named React component in the dedicated SVG module directory (`[CUSTOMIZE: icon_components_path, e.g., src/components/ui/icons/]`), never inlined as a raw `<svg>` block directly inside a page or feature component's JSX.
   - The folder must be organized by category (e.g., `feature-icons.tsx`, `product-icons.tsx`, `brand-logos.tsx`, `decorations.tsx`, `watermarks.tsx`, `trust-icons.tsx`, `journey-icons.tsx`, `illustrations/`).

2. **`IconProps` Type Contract**:
   - Every SVG component must accept `React.SVGProps<SVGSVGElement>` (e.g., aliased as `IconProps`) so callers can pass `className`, `style`, `aria-label`, and all standard SVG attributes uniformly.

3. **Barrel Export Pattern**:
   - All SVG components must be re-exported via an `index.ts` file so consumers import from a central location (`[CUSTOMIZE: icon_import_alias, e.g., @/components/ui/icons]`) — never from deep file paths.

4. **Accessibility on SVG Components**:
   - **Decorative SVGs** (ambient blobs, dividers, background flourishes): Must carry `aria-hidden="true"` on the `<svg>` element. No `role`, no `aria-label`.
   - **Meaningful/Semantic SVGs** (icons that convey meaning without adjacent text): Must carry `role="img"` and `aria-label="..."` describing the icon purpose. No `aria-hidden`.

5. **Inline SVGs Used as Animation Canvases**:
   - SVGs may remain co-located **only** when the SVG is a complex stateful animation (`<animate>`, `<animateMotion>`, Recharts, etc.) that cannot be meaningfully extracted. In that case, the parent component file name must end in `-graphic.tsx` or `-chart.tsx` to signal the exception.

6. **ESLint Enforcement**:
   - A custom ESLint rule (e.g., `no-raw-inline-svg`) should warn whenever a raw `<svg>` element appears outside the designated icon directory.
   - An additional rule (e.g., `svg-aria-required`) should error when an `<svg>` element lacks both `aria-hidden` and `role="img"` simultaneously.

7. **Vector Purity**:
   - Zero embedded base64 raster data in `.svg` files. Pure SVGO-optimized vectors only.
