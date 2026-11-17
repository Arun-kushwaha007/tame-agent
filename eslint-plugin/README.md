# eslint-plugin-tame-agent

ESLint rules enforcing frontend design governance, SVG-as-Component patterns, and Technical SEO canonical domain standards, designed for the `tame-agent` package.

These rules improve accessibility, maintainability, search equity, and architectural consistency.

## Rules

### 1. `no-raw-inline-svg` (Warning)
Enforces extracting `<svg>` elements into reusable React components in a designated icons directory (default: `src/components/ui/icons/`). This improves maintainability by ensuring that SVGs are not duplicated throughout the codebase.

Exceptions: Files ending in `-graphic.tsx`, `-graphic.jsx`, `-chart.tsx`, or `-chart.jsx` (which often contain complex animation canvases tightly coupled to a single component).

**Configuration:**
```js
"tame-agent/no-raw-inline-svg": ["warn", { "iconsDir": "src/components/ui/icons/" }]
```

### 2. `svg-aria-required` (Error)
Ensures every `<svg>` element has explicitly declared accessibility intent. An `<svg>` must have EITHER:
- `aria-hidden="true"` (for decorative SVGs)
- `role="img"` AND `aria-label="..."` (for semantic SVGs)

**Configuration:**
```js
"tame-agent/svg-aria-required": "error"
```

### 3. `canonical-domain` (Problem / Fixable)
Enforces the Technical SEO Canonical Domain Mandate. Disallows naked non-canonical domain variants or protocol mismatches in string literals and template literals, preventing search equity dilution. Automatically fixes non-canonical URLs to the configured canonical domain.

**Configuration:**
```js
"tame-agent/canonical-domain": [
  "error",
  {
    "canonicalDomain": "https://www.example.com",
    "exemptPatterns": ["/tests/", "/eslint-rules/", "proxy.ts", "middleware.ts"]
  }
]
```

## Installation & Usage

Add the plugin to your `eslint.config.js` or `eslint.config.mjs` (Flat Config):

```js
import tameAgentPlugin from "./eslint-rules/index.mjs"; // or from npm package

export default [
  {
    plugins: {
      "tame-agent": tameAgentPlugin
    },
    rules: {
      "tame-agent/no-raw-inline-svg": ["warn", { "iconsDir": "src/components/ui/icons/" }],
      "tame-agent/svg-aria-required": "error",
      "tame-agent/canonical-domain": [
        "error",
        { "canonicalDomain": "https://www.example.com" }
      ]
    }
  }
];
```
