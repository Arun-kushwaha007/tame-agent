# Customizing tame-agent

While `tame-agent` provides battle-tested defaults derived from high-traffic production platforms, you can tailor every rule and skill to your specific project needs.

## Modifying Agent Rules

The rules are copied to `.agents/rules/` in your project. These are plain markdown files:
- Search for `[CUSTOMIZE` across the rules to replace placeholders with your project's specific conventions, folder paths, and brand names.
- Rule 25 (`25-technical-seo.md`): Customize your preferred canonical domain (e.g. `https://www.yourdomain.com`).
- Rule 20 (`20-ui-design-system.md`): Customize your screen-edge paddings, theme tokens, and card background surfaces.

## Updating AGENTS.md

The generated `AGENTS.md` is your project's master governance manual. You should update it with:
- Project-specific missions (acquisition vs conversion funnels).
- Preferred technology stack (Next.js version, CSS framework, state management).
- Links to internal documentation and decision records (ADRs).

## Utilizing Specialist Agents

Personas located in `.agents/agents/` can be invoked as subagents or specialized review prompts:
- `seo-specialist.md`: Pre-PR and pre-deployment SEO checklist (canonical tags, status codes, sitemap integrity, and schema governance).
- `code-reviewer.md`: Structural integrity, boundary isolation, file size ceilings (< 500 lines), and hook modularity (< 200 lines).
- `accessibility-auditor.md`: WCAG 2.1 AA compliance, keyboard navigation, and touch targets.

## Customizing ESLint Rules

The ESLint plugin is copied locally to `eslint-rules/index.mjs`:
- Configure your canonical domain:
  ```js
  "tame-agent/canonical-domain": [
    "error",
    { "canonicalDomain": "https://www.yourdomain.com" }
  ]
  ```
- Adjust allowed icons directory:
  ```js
  "tame-agent/no-raw-inline-svg": ["warn", { "iconsDir": "src/components/ui/icons/" }]
  ```

## Opting Out of Updates

Once you run `npx tame-agent init`, the files belong to your project. Running `init` again with the `--force` flag will overwrite your customizations, so be careful! Always use version control to track your changes.
