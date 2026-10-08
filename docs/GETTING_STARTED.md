# Getting Started with tame-agent

Welcome to `tame-agent`! This guide will help you set up governance rules for your AI agents and development team.

## Prerequisites

- Node.js >= 18.0.0
- A modern frontend project (e.g., Next.js, React)

## Installation

You don't need to install `tame-agent` globally. Simply use `npx` at the root of your project:

```bash
npx tame-agent init
```

## What Happens During Init?

1. **`.agents/rules/` created**: Contains all the markdown rules for AI agents.
2. **`AGENTS.md` generated**: A central file you can link your agents to.
3. **`eslint-rules/` copied**: Custom ESLint plugins are copied to your project for local use.
4. **`.agents/skills/` created**: Contains specific operational skills for the agents.

## Next Steps

1. Review the generated `.agents/rules/` to ensure they match your team's workflow.
2. Update your ESLint configuration to point to the local `eslint-rules/`.
3. Add `AGENTS.md` to your repository and instruct your AI coding assistants to reference it before making changes.
