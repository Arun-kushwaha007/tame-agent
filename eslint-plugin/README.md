# eslint-plugin-tame-agent-svg

ESLint rules enforcing SVG-as-Component patterns and SVG accessibility, designed for the `tame-agent` package.

These rules improve accessibility, maintainability, and reusability of SVG components.

## Rules

### 1. `no-raw-inline-svg` (Warning)
Enforces extracting `<svg>` elements into reusable React components in a designated icons directory (default: `src/components/ui/icons/`). This improves maintainability by ensuring that SVGs are not duplicated throughout the codebase.

Exceptions: Files ending in `-graphic.tsx`, `-graphic.jsx`, `-chart.tsx`, or `-chart.jsx` (which often contain complex animation canvases tightly coupled to a single component).

**Configuration:**
```js
"tame-agent-svg/no-raw-inline-svg": ["warn", { "iconsDir": "src/components/ui/icons/" }]
```

### 2. `svg-aria-required` (Error)
Ensures every `<svg>` element has explicitly declared accessibility intent. An `<svg>` must have EITHER:
- `aria-hidden="true"` (for decorative SVGs)
- `role="img"` AND `aria-label="..."` (for semantic SVGs)

## Installation & Usage

Add the plugin to your `eslint.config.js` or `eslint.config.mjs` (Flat Config):

```js
import tameAgentSvgPlugin from "eslint-plugin-tame-agent-svg";

export default [
  {
    plugins: {
      "tame-agent-svg": tameAgentSvgPlugin
    },
    rules: {
      "tame-agent-svg/no-raw-inline-svg": ["warn", { "iconsDir": "src/components/ui/icons/" }],
      "tame-agent-svg/svg-aria-required": "error"
    }
  }
];
```
