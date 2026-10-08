# Rule 70: Testing & Quality Assurance

## Purpose

Establishes a rigorous testing methodology ensuring component reliability, functional correctness, and accessibility conformance.

## When It Applies

Applies to all new feature development, bug fixes, component refactoring, and CI/CD pipelines.

## Non-Negotiable Rules

1. **Unit Testing**:
   - Use **[CUSTOMIZE: unit_test_runner, e.g., Vitest or Jest]** for unit tests.
   - Ensure 100% test coverage for complex logic, mathematical formulas, and data transformations.
   - Write unit tests for all validation schemas, utility functions, and URL builders.

2. **Component Testing**:
   - Use **[CUSTOMIZE: component_test_lib, e.g., React Testing Library]** to test component behavior, form validation states, error messages, and user interactions.
   - Test accessibility markers and labels natively via DOM querying.
   - **Test behavior, not implementation.** Avoid asserting on internal state or specific CSS classes unless necessary.

3. **End-to-End (E2E) Testing**:
   - Use **[CUSTOMIZE: e2e_test_runner, e.g., Playwright or Cypress]** for testing complete user journeys, multi-step funnels, and critical integration points.

4. **Automated Accessibility Testing**:
   - Integrate automated a11y checks (e.g., `axe-core`) within E2E tests and CI workflows.
   - Ensure zero violations for standard UI components.

5. **Route Health Verification**:
   - Maintain an automated crawler or route tester to verify that all user-facing routes respond with HTTP 200 and possess valid SEO canonical tags and metadata.
