<div align="center">
  <!-- Logo Placeholder -->
  <h1>🤖 tame-agent</h1>
  <p><strong>Tame your AI coding agents with battle-tested frontend governance rules, ESLint plugins & documentation standards for modern React/Next.js projects.</strong></p>

  [![npm version](https://img.shields.io/npm/v/tame-agent.svg)](https://npmjs.com/package/tame-agent)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![GitHub stars](https://img.shields.io/github/stars/Arun-kushwaha007/tame-agent.svg?style=social)](https://github.com/Arun-kushwaha007/tame-agent)
</div>

## 🤔 Why tame-agent?

As development teams integrate AI coding agents into their workflows, a new problem emerges: **Agents produce inconsistent code, generic AI templates, and technical debt without strict governance.** AI agents might choose sloppy patterns, overlook accessibility, invent speculative abstractions, or deviate from your design system if not explicitly restrained.

`tame-agent` provides a standardized, battle-tested set of rules, instructions, and linters to tame AI agents (and human developers) and keep them aligned with production-grade engineering discipline.

## 🚀 Quick Start

To initialize `tame-agent` in your Next.js or React project, run:

```bash
npx tame-agent init
```

This will set up the necessary agent rules, ESLint configurations, and templates in your project.

## 📦 What's Included

| Category | Description |
|---|---|
| **Agent Rules** | Strict guidelines for AI agents (`.agents/rules/`) covering React, Next.js, and TypeScript. |
| **ESLint Plugin** | Custom linting rules to enforce governance automatically. |
| **Skills** | Specialized agent instructions for tasks like accessibility audits. |
| **Templates** | Standardized `AGENTS.md` and documentation templates. |

## 🛠️ CLI Commands

- `npx tame-agent init` - Initialize all rules, skills, and plugins.
- `npx tame-agent add-rules` - Copy only the agent rules.
- `npx tame-agent add-eslint` - Copy only the ESLint plugin.
- `npx tame-agent add-skills` - Copy only the skills.
- `npx tame-agent help` - View all commands.

## 📖 Rule Categories

- **React/Next.js Best Practices:** Enforces Server Components by default, proper state management, and modern hooks.
- **Design System & Styling:** Strict Tailwind CSS usage, Radix UI primitive integration.
- **Accessibility (a11y):** Mandatory ARIA roles, keyboard navigation, and semantic HTML.
- **Performance:** Image optimization, dynamic imports, and bundle size checks.

## 🔧 ESLint Plugin

The package includes custom ESLint rules to prevent common AI hallucinations and enforce the governance guidelines mechanically.

## ⚙️ Configuration & Customization

Check out the [Customization Guide](docs/CUSTOMIZATION.md) for detailed instructions on tailoring `tame-agent` to your specific project needs.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and author new rules.

## 📝 License

[MIT License](LICENSE) © 2026 Arun Kushwaha

## 🙏 Credits

Created and maintained by [Arun Kushwaha](https://github.com/Arun-kushwaha007).
