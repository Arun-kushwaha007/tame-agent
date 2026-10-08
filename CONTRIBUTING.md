# Contributing to tame-agent

First off, thank you for considering contributing to `tame-agent`! It's people like you that make open-source a great community.

## 🐛 Reporting Issues

- Use the GitHub issue tracker.
- Describe the bug/feature clearly.
- Include steps to reproduce for bugs.
- Specify your environment (Node version, OS).

## 🚀 Submitting Pull Requests

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/amazing-feature`).
3. Make your changes.
4. Run tests and linting (if applicable).
5. Commit your changes (`git commit -m 'Add some amazing feature'`).
6. Push to the branch (`git push origin feature/amazing-feature`).
7. Open a Pull Request.

## 🧑‍💻 Code Style

- Use standard JavaScript style (ES Modules).
- Keep the CLI free of external dependencies (use only Node.js stdlib).
- Write descriptive comments.

## 📏 Rule Authoring Guidelines

When adding new rules for AI agents:
- Be declarative and explicit.
- Provide clear 'Do' and 'Don't' examples.
- Categorize the rule logically.

## 🧪 Testing

Ensure that new CLI features or rules do not break the `init` process. Test locally by running:

```bash
node ./cli/index.mjs init
```
