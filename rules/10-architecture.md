# Rule 10: System Architecture & Component Boundary Standards

## Purpose

Defines the architectural foundation of the project rebuild: Next.js App Router, React conventions, strict Server Component vs Client Component boundaries, decoupled state management, the scoped API client architecture, and modular hook constraints.

## When It Applies

Applies to all application structuring, page scaffolding, component creation, hook authoring, state management, and file organization across the frontend codebase.

## Non-Negotiable Rules

1. **Server Components by Default**:
   - Every component is a Server Component unless explicitly designated with `"use client"`.
   - Keep `"use client"` strictly at the leaf nodes of the component tree (e.g. interactive buttons, sliders, input fields, modal triggers).
   - Data fetching for static or marketing content must occur in Server Components or during static generation.

2. **Server-Only Module Protection**:
   - Any file importing secrets, upstream microservice tokens, or executing backend-only tasks must import `"server-only"` at the top of the file:
     ```typescript
     import "server-only";
     ```
   - This ensures the build fails immediately if the module is inadvertently imported into a client bundle.

3. **Zero Global Runtime Monkey-Patching**:
   - Overwriting browser primitives (e.g. `window.fetch = ...`, `window.XMLHttpRequest = ...`, `window.history.pushState = ...`) is **strictly prohibited**.
   - All network calls, error normalization, authorization header injection, and cookie forwarding must be handled by an isolated, scoped client (`lib/api/client.ts`).

4. **Strict Backend-For-Frontend (BFF)**:
   - Zero direct browser-to-backend calls. Client components must never execute cross-origin fetch calls to external backends. All network traffic routes through same-origin Next.js Route Handlers (`app/api/*`).

5. **Standardized URL Construction**:
   - Never concatenate API URLs via string interpolation (`${baseUrl}${path}`). Always resolve URLs using the standard `new URL(path, baseUrl)` constructor or a validated URL helper to prevent missing slash bugs.

6. **Clear State Management Partitioning**:
   - **Server State**: Managed exclusively via **[CUSTOMIZE: server_state_lib, e.g., TanStack Query v5]** for caching, deduplication, retry logic, and background polling.
   - **Client UI State**: Managed via **[CUSTOMIZE: client_state_lib, e.g., Zustand v5]**. Store files must be small, typed, and modular.
   - **Form State**: Managed via **[CUSTOMIZE: form_state_lib, e.g., React Hook Form with Zod]** schema resolvers. Never sync form state to global context or localStorage on every keystroke.
   - **Zero Credentials in State**: Auth tokens must never be persisted in client state stores; they reside in `httpOnly` cookies.

7. **Modular React Hooks (< 200 Lines)**:
   - No custom hook may exceed **200 lines of code**.
   - Conflated responsibilities (e.g. network polling, mathematical calculations, UI modal state, analytics dispatch) must be broken into separate, single-purpose hooks.
