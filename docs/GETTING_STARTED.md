# Getting Started with tame-agent

Welcome to `tame-agent`! This guide will help you set up governance rules, 24 modular skills, and specialist agent personas for your AI agents and development team.

## Prerequisites

- Node.js >= 18.0.0
- A modern frontend project (e.g., Next.js 15+, React 19)

## Installation

You don't need to install `tame-agent` globally. Simply run `npx` at the root of your project:

```bash
npx tame-agent init
```

## What Happens During Init?

1. **`.agents/rules/` created**: 14 modular engineering rules including architecture, security, accessibility, and the Technical SEO SOP.
2. **`AGENTS.md` generated**: A central governance blueprint you can link your agents to.
3. **`.agents/skills/` created**: 24 production-ready modular skills (Next.js App Router, React 19, Tailwind CSS v4, Technical SEO, Vitest, Playwright, etc.).
4. **`.agents/agents/` created**: Specialist agent personas (`seo-specialist.md`, `code-reviewer.md`, `accessibility-auditor.md`).
5. **`eslint-rules/` copied**: Flat-config compatible ESLint plugin enforcing SVG accessibility and Technical SEO canonical domain defense.

## Next Steps

1. Review the generated `.agents/rules/` to ensure they match your team's workflow.
2. Update your ESLint configuration (`eslint.config.mjs`) to point to local `eslint-rules/index.mjs`.
3. Add `AGENTS.md` to your repository and instruct your AI coding assistants to reference it before making changes.
4. Try out the specialist agents, e.g. invoke `@seo-specialist` for pre-PR SEO audits.
