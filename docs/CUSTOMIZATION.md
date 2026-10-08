# Customizing tame-agent

While `tame-agent` provides battle-tested defaults, you will likely want to tailor the rules to your specific project needs.

## Modifying Agent Rules

The rules are copied to `.agents/rules/` in your project. These are plain markdown files.
- Feel free to edit, add, or delete files in this directory.
- Agents typically read the contents of this directory dynamically if instructed via `AGENTS.md`.

## Updating AGENTS.md

The generated `AGENTS.md` is a starting point. You should update it with:
- Project-specific architecture context.
- Links to internal documentation.
- specific prompts that your AI agents need to follow.

## Customizing ESLint Rules

The ESLint plugin is copied locally to `eslint-rules/`. Because it's local, you have full control:
- Modify the javascript files directly to change linting logic.
- Remove rules you don't agree with.
- Add your own custom AST linting rules.

## Opting Out of Updates

Once you run `npx tame-agent init`, the files belong to your project. Running `init` again with the `--force` flag will overwrite your customizations, so be careful! Use version control to track your changes.
