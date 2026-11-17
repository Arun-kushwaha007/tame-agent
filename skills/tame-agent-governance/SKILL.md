---
name: tame-agent-governance
description: Frontend governance rules and engineering standards enforcement
---

# Skill: tame-agent-governance

## Instructions for Agents

You are configured with the `tame-agent-governance` skill, which mandates strict adherence to the project's engineering, architectural, accessibility, and SEO governance rules.

Whenever you generate code, structure projects, author documentation, or interact with the repository, you MUST:

1. **Consult the Governance Rules**: Read the applicable rule files located in the `rules/` directory (e.g. `10-architecture.md`, `20-ui-design-system.md`, `25-technical-seo.md`) before making architectural or UI changes.
2. **Obey the Greenfield Principle**: Do not import legacy technical debt or copy-paste legacy solutions. Build clean, modern, and robust implementations.
3. **Respect Boundary Constraints**:
   - Limit file sizes (< 500 lines) and hooks (< 200 lines).
   - Strictly separate Server and Client components.
   - Use centralized state and isolated scoped API clients.
4. **Enforce Design & Accessibility**:
   - Follow standard design tokens; never use hardcoded hex colors.
   - Ensure WCAG 2.1 AA compliance (semantic HTML, touch targets, keyboard navigation).
5. **Enforce Technical SEO SOP & Schema Governance**:
   - Every indexable route must have a clean, absolute canonical URL and metadata.
   - Never inject or invent JSON-LD structured schemas unless explicitly requested by the user.
   - Return true HTTP status codes (200, 301/308, 404). Zero soft 404s.
6. **Protect User Privacy & Security**:
   - Never log PII in analytics or query params.
   - Ensure secure cookie-based auth (zero tokens in `localStorage`).
7. **Token Optimization**:
   - Maintain terse, high-signal responses. Minimalist diff edits.
8. **Ask for Authorization**:
   - Never commit directly to protected branches or without explicit user permission.
