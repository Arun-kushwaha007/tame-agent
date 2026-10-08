# Frontend Governance Rules

This directory contains the universal, reusable engineering and governance rules provided by the `tame-agent` package. These rules are designed to be adopted by any modern frontend project (e.g., Next.js, React) to ensure consistent architecture, security, performance, and design quality.

## Rule Files Directory

- **[00-project-governance.md](./00-project-governance.md)**
  *When to use*: When setting up project boundaries, defining legacy code policies, and establishing commit protocols.

- **[10-architecture.md](./10-architecture.md)**
  *When to use*: When designing component trees, API clients, state management, and file constraints.

- **[20-ui-design-system.md](./20-ui-design-system.md)**
  *When to use*: When styling components, building responsive layouts, and establishing design token usage.

- **[30-svg-management.md](./30-svg-management.md)**
  *When to use*: When adding icons, vectors, and defining SVG accessibility.

- **[40-accessibility.md](./40-accessibility.md)**
  *When to use*: When building interactive elements, forms, and ensuring WCAG 2.1 AA compliance.

- **[50-security.md](./50-security.md)**
  *When to use*: When handling authentication, environment variables, APIs, and data validation.

- **[60-performance.md](./60-performance.md)**
  *When to use*: When optimizing images, managing build budgets, and analyzing web vitals.

- **[70-testing.md](./70-testing.md)**
  *When to use*: When writing unit, component, or E2E tests, and checking route health.

- **[80-documentation-standards.md](./80-documentation-standards.md)**
  *When to use*: When writing internal technical documentation or ADRs using ASD-STE100 guidelines.

- **[90-content-governance.md](./90-content-governance.md)**
  *When to use*: When creating SEO content, dynamic pages, and implementing verification workflows.

- **[100-analytics-privacy.md](./100-analytics-privacy.md)**
  *When to use*: When setting up telemetry, tracking user events, and preventing PII leakage.

- **[110-dependency-management.md](./110-dependency-management.md)**
  *When to use*: When proposing or evaluating new third-party packages or SDKs.

## Customization

Many of these rules contain `[CUSTOMIZE: ...]` markers. When adopting these rules for your project, do a global search for `[CUSTOMIZE` and replace the placeholders with your project's specific conventions, folder paths, and library choices.
