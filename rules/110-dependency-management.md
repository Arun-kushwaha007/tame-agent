# Rule 110: Dependency Management Discipline

## Purpose

Prevents dependency bloat, reduces security risks from unvetted packages, and keeps the build size optimal.

## When It Applies

Applies every time a new library, SDK, tool, or package is proposed for inclusion in `package.json`.

## Non-Negotiable Rules

1. **Curated Dependency Stack**:
   - Only install approved packages from the target manifest.
   - Prefer native browser APIs and built-in framework features over adding third-party libraries.

2. **Package Addition Gate**:
   - Any new dependency requires:
     - Written justification.
     - Bundle size evaluation (e.g., `< 20 KB` gzipped).
     - Security review and Governance Architect approval.

3. **Zero Accidental Dependencies**:
   - Never install CLI tools globally into application runtime dependencies.
   - Keep development tools strict to `devDependencies`.

4. **Server SDK Isolation**:
   - Server-only SDKs (e.g., database clients, payment gateways) must never leak into client bundles.
   - Ensure strict separation of concerns and use `"server-only"` to guard these imports.

5. **Explicit Declarations**:
   - Every imported package must be explicitly listed in `package.json`.
   - Do not rely on transitive dependency hoisting.
