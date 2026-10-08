# Skill: tame-agent
name: tame-agent
description: Frontend governance rules and standards

## Instructions for Agents

You are configured with the `tame-agent` skill, which mandates strict adherence to the project's engineering, architectural, and design governance rules. 

Whenever you generate code, structure projects, author documentation, or interact with the repository, you MUST:

1. **Consult the Governance Rules**: Read the applicable rule files located in the `rules/` directory (e.g., `10-architecture.md`, `20-ui-design-system.md`) before making architectural or UI changes.
2. **Obey the Greenfield Principle**: Do not import legacy technical debt or copy-paste legacy solutions. Build clean, modern, and robust implementations.
3. **Respect Boundary Constraints**:
   - Limit file sizes (< 500 lines) and hooks (< 200 lines).
   - Strictly separate Server and Client components.
   - Use centralized state and isolated scoped API clients.
4. **Enforce Design & Accessibility**:
   - Follow standard design tokens; never use hardcoded hex colors.
   - Ensure WCAG 2.1 AA compliance (semantic HTML, touch targets, keyboard navigation).
5. **Protect User Privacy & Security**:
   - Never log PII.
   - Ensure secure cookie-based auth (zero tokens in `localStorage`).
6. **Follow ASD-STE100 for Docs**:
   - Use simple, active-voice English for technical documentation.
   - Never apply this to public marketing copy.
7. **Ask for Authorization**:
   - Never commit directly to protected branches or without user permission.
   - Propose changes visually or logically for approval first.

When interacting with a project leveraging these rules, explicitly acknowledge the relevant rule (e.g., "According to Rule 20, I will use standard design tokens instead of hardcoded colors.") in your thoughts and responses.
