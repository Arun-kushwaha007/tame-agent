<div align="center">
  <h1>🤖 tame-agent</h1>
  <p><strong>Tame your AI coding agents with battle-tested frontend governance rules, 24+ modular skills, Technical SEO SOP, specialist agent personas & ESLint plugins for modern React/Next.js projects.</strong></p>

  [![npm version](https://img.shields.io/npm/v/tame-agent.svg)](https://npmjs.com/package/tame-agent)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![GitHub stars](https://img.shields.io/github/stars/Arun-kushwaha007/tame-agent.svg?style=social)](https://github.com/Arun-kushwaha007/tame-agent)
</div>

---

## 🤔 Why tame-agent?

As engineering teams integrate autonomous AI coding agents (Claude Code, Gemini CLI, Cursor, Antigravity, GitHub Copilot) into their workflows, a critical problem emerges: **AI agents produce inconsistent patterns, generic AI templates, broken canonical links, and technical debt without strict governance.**

Unconstrained AI agents frequently:
- ❌ Import messy legacy debt or copy-paste anti-patterns.
- ❌ Overlook accessibility (WCAG 2.1 AA) and touch targets.
- ❌ Invent speculative abstractions or monolithic 2,000-line "God hooks".
- ❌ Break SEO equity with naked non-canonical URLs, soft 404s, or temporary 302 redirects.
- ❌ Autonomously inject hallucinated Schema.org JSON-LD schemas with fake ratings and addresses.
- ❌ Store authentication tokens in `localStorage`.

`tame-agent` provides an authoritative, production-grade engineering manual, 24 modular agent skills, an SEO POV specialist setup, and custom ESLint guardrails to tame AI agents and keep them executing at senior staff-engineer quality.

---

## 🚀 Quick Start

Initialize `tame-agent` in any Next.js or React project in seconds:

```bash
npx tame-agent init
```

This will set up:
1. `.agents/rules/` — 14 focused governance rule files.
2. `.agents/skills/` — 24 production-ready modular agent skills.
3. `.agents/agents/` — Specialist agent personas (SEO Specialist, Code Reviewer, Accessibility Auditor).
4. `AGENTS.md` — Master governance blueprint customized for your project.
5. `eslint-rules/` — Local ESLint plugin enforcing SVG accessibility and SEO canonical domains.

> **Zero impact on your existing code.** The `init` command only creates markdown/config files in `.agents/`, a root `AGENTS.md`, and a local `eslint-rules/` folder. It does **not** modify your `package.json`, `tsconfig.json`, source files, or build pipeline. The ESLint rules only activate after you explicitly register them in your `eslint.config.mjs`.

Or clone the repo directly and copy just what you need:

```bash
git clone https://github.com/Arun-kushwaha007/tame-agent.git
cp -r tame-agent/rules/ .agents/rules/
cp -r tame-agent/skills/ .agents/skills/
```

---

## 🏗️ How It Works — Package vs Your Project

```
tame-agent (npm package / repo)          Your Project (after `npx tame-agent init`)
─────────────────────────────            ────────────────────────────────────────
📁 rules/            ──(copies to)──►    📁 .agents/rules/
📁 skills/           ──(copies to)──►    📁 .agents/skills/
📁 templates/agents/ ──(copies to)──►    📁 .agents/agents/
📁 templates/AGENTS.md ─(copies to)──►   📄 AGENTS.md
📁 eslint-plugin/    ──(copies to)──►    📁 eslint-rules/
📁 cli/              (runs locally)      (nothing installed)
📁 docs/             (reference only)    (nothing copied)
```

Once copied, all files **belong to your project**. Edit them freely. Running `init` again skips existing files (use `--force` to overwrite). No runtime dependency — tame-agent is never imported into your application code.

---

## 📦 What's Included

| Category | Description |
|---|---|
| **Master Blueprint** | Standardized `AGENTS.md` defining project boundaries, Greenfield rules, and verification gates. |
| **Agent Rules** | 14 focused engineering rules (`.agents/rules/`) covering architecture, security, a11y, and Technical SEO. |
| **24 Modular Skills** | Battle-tested reference implementations, examples, and instructions for modern web development. |
| **Specialist Personas** | Dedicated agent blueprints for **SEO Specialist (SEO POV)**, **Code Reviewer**, and **a11y Auditor**. |
| **ESLint Plugin** | Flat-config compatible linter rules enforcing SVG accessibility and canonical domain defense. |

---

## 🛠️ CLI Commands

```bash
npx tame-agent init          # Initialize all rules, skills, agents, and eslint plugins
npx tame-agent add-rules     # Copy only the engineering rules (.agents/rules/)
npx tame-agent add-skills    # Copy all 24 modular skills (.agents/skills/)
npx tame-agent add-agents    # Copy specialist agent personas (.agents/agents/)
npx tame-agent add-eslint    # Copy the ESLint plugin (eslint-rules/)
npx tame-agent help          # View all available CLI options
```

Options:
- `--force`: Overwrite existing files without prompting.

---

## 🧠 The 24 Modular Agent Skills

Every skill contains structured instructions (`SKILL.md`), metadata (`metadata.yaml`), reference tables (`reference.md`), and real-world copy-paste examples (`examples/`):

| Skill Name | Domain | Focus & Key Capabilities |
|---|---|---|
| `web-technical-seo` | **SEO & Search** | Canonical URL defense, metadata factory, XML dynamic sitemaps, robots.txt, 301/308 redirects, and Schema.org governance. |
| `web-meta-framework-nextjs` | **Framework** | Next.js 15+ App Router, Server Components (RSC), Suspense streaming, parallel routes, Server Actions, and Cache Components. |
| `web-framework-react` | **Framework** | React 19 patterns, compiler compatibility, custom hooks, transition hooks (`useTransition`, `useOptimistic`). |
| `web-styling-tailwind` | **Styling** | Tailwind CSS v4 CSS-first `@theme inline` configuration, dynamic tokens, fluid typography, and responsive edge padding. |
| `web-styling-cva` | **Styling** | Class Variance Authority (CVA) type-safe variant styling, compound variants, and polymorphic props. |
| `web-ui-shadcn-ui` | **UI Library** | Radix UI headless primitives, accessible dialogs, dropdowns, and polymorphic `asChild` composition. |
| `web-animation-framer-motion` | **Animation** | Motion / Framer Motion spring physics, squash-and-stretch jelly transitions, layout animations, and reduced-motion handling. |
| `web-forms-react-hook-form` | **Forms** | React Hook Form v7 patterns, performant uncontrolled inputs, field arrays, and async validation. |
| `web-forms-zod-validation` | **Validation** | Zod schema definitions, type inference, refinements, transforms, and discriminated unions. |
| `web-server-state-react-query`| **State** | TanStack Query v5 caching policy, query keys, background polling, mutations, and optimistic updates. |
| `web-state-zustand` | **State** | Lightweight client UI state stores, selective subscription, and decoupling UI state from server cache. |
| `web-accessibility-web-accessibility` | **a11y** | WCAG 2.1 AA compliance, keyboard navigation, focus trap in dialogs, ARIA roles, and 44x44px touch targets. |
| `web-performance-web-performance` | **Performance** | Core Web Vitals (LCP, INP, CLS), bundle size budgets (< 180 MB), tree shaking, and dynamic imports. |
| `api-performance-api-performance` | **Backend/API** | Query optimization, connection pooling, caching strategies, and async fetch patterns. |
| `web-files-image-handling` | **Assets** | Next.js `<Image>` optimization, Canvas resizing, image compression, and memory leak prevention. |
| `web-testing-vitest` | **Testing** | Vitest test runner, mock factories, spy assertions, and regression test suites. |
| `web-testing-react-testing-library` | **Testing** | Accessible queries (`getByRole`), user-event simulations, and component behavioral testing. |
| `web-testing-playwright-e2e` | **Testing** | Playwright end-to-end testing, Page Object Model (POM), network interception, and cross-browser CI. |
| `shared-security-auth-security` | **Security** | `httpOnly` secure cookies, secret partitioning, XSS/CSRF defense, DOMPurify sanitization, and CSP headers. |
| `shared-tooling-eslint-prettier` | **Tooling** | ESLint 9+ flat config, Prettier v3 integration, and typescript-eslint project service. |
| `shared-tooling-git-hooks` | **Tooling** | Husky v9, lint-staged, commitlint conventional commits, and branch protection hooks. |
| `infra-ci-cd-github-actions` | **DevOps** | GitHub Actions workflows, build-size enforcement checks, caching, and automated deployment pipelines. |
| `meta-reviewing-reviewing` | **Code Review** | Review frameworks, severity classifications ([BLOCKER], [WARNING], [NOTE]), and feedback principles. |
| `tame-agent-governance` | **Governance** | Meta-skill enforcing compliance with the project's engineering rules and verification workflows. |

---

## 🔍 Technical SEO SOP & SEO POV Agent Setup

Organic search is often the primary user acquisition channel. `tame-agent` provides a dedicated **Technical SEO Standard Operating Procedure (Rule 25)** and an autonomous **SEO Specialist Agent Persona** (`.agents/agents/seo-specialist.md`).

### Key SEO Governance Rules
1. **One Authoritative Canonical URL**: Every indexable page must declare a self-referencing canonical tag pointing to the exact preferred origin (e.g. `https://www.example.com`).
2. **Canonical Domain Defense**: Naked domains and secondary hostnames must permanently redirect via HTTP `301` or `308`. Query parameters (`?utm=...`) and hash fragments are strictly stripped from canonical tags.
3. **HTTP Status Code Discipline**:
   - `200 OK` for live pages.
   - `301/308` for permanent moves (never use `302`).
   - Dynamic non-existent slugs must call `notFound()` returning a true `404 Not Found` response (**zero soft 404s**).
4. **Server Components for SEO**: Search engine crawlers must receive complete HTML on the first byte without client-side JavaScript waterfalls.
5. **Strict Schema.org & JSON-LD Governance**:
   - AI agents must **NEVER inject or invent structured data schemas autonomously**.
   - Zero speculative schemas without explicit user prompt instruction.
   - Zero fake ratings, dummy reviews, or placeholder addresses.
   - 100% visible content parity on every schema property.
6. **Dynamic XML Sitemaps**: Only canonical, indexable, live 200 OK URLs are included. Exclude private, authenticated, or funnel routes.

---

## 🔧 Custom ESLint Plugin

The package includes a flat-config compatible ESLint plugin (`eslint-rules/index.mjs`) to enforce governance mechanically:

```js
import { tameAgentPlugin } from "./eslint-rules/index.mjs";

export default [
  {
    plugins: {
      "tame-agent": tameAgentPlugin,
    },
    rules: {
      // 1. Disallow raw <svg> elements outside the icons directory
      "tame-agent/no-raw-inline-svg": ["warn", { "iconsDir": "src/components/ui/icons/" }],
      
      // 2. Enforce explicit accessibility intent on SVGs
      "tame-agent/svg-aria-required": "error",
      
      // 3. Catch naked domains and non-canonical URLs (with autofix!)
      "tame-agent/canonical-domain": [
        "error",
        { "canonicalDomain": "https://www.example.com" }
      ],
    },
  },
];
```

---

## 📖 Rule Files Summary (`.agents/rules/`)

- `00-project-governance.md` — Project mission, greenfield guardrails, and explicit commit authorization.
- `10-architecture.md` — Server Components, BFF architecture, state partitioning, and 500-line ceilings.
- `15-token-optimization.md` — Terse mode ("caveman" output), context preservation, and subagent delegation.
- `20-ui-design-system.md` — Centralized tokens, responsive screen-edge padding, and card surface standards.
- `25-technical-seo.md` — The 7-section Technical SEO SOP, canonicalization, and schema governance.
- `30-svg-management.md` — SVG-as-Component standard and vector accessibility.
- `40-accessibility.md` — WCAG 2.1 AA standards, keyboard navigation, and touch targets.
- `50-security.md` — HttpOnly cookies, secret partitioning, and XSS/CSRF defense.
- `60-performance.md` — Image optimization, build budgets, and Web Vitals.
- `70-testing.md` — Vitest unit tests, RTL component tests, and Playwright E2E suites.
- `80-documentation-standards.md` — ASD-STE100 technical writing standards.
- `90-content-governance.md` — Multi-gate content verification and anti-thin-content rules.
- `100-analytics-privacy.md` — Privacy-by-design and zero PII logging.
- `110-dependency-management.md` — Third-party package vetting and supply chain hygiene.

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, author new skills, and expand rules.

---

## 📝 License

[MIT License](LICENSE) © 2026 Arun Kushwaha
