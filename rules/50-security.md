# Rule 50: Security Architecture & Guardrails

## Purpose

Enforces strict security protocols for data protection, authentication, environment configuration, input validation, and attack mitigation.

## When It Applies

Applies to all network requests, authentication flows, API routes, environment configurations, forms, and state management.

## Non-Negotiable Rules

1. **Zero Tokens in Web Storage**:
   - Never store JWT access tokens, refresh tokens, or customer PII in `localStorage` or `sessionStorage`.
   - Manage sessions exclusively via encrypted **`httpOnly`, `secure`, `sameSite: "lax"` cookies**.

2. **Strict Secret Partitioning**:
   - Never prefix private API keys, client secrets, or webhook secrets with `NEXT_PUBLIC_` or equivalent client-side exposure prefixes.
   - Enforce build-time environment variable validation (e.g., using Zod and env-validation libraries). Builds must fail if a private secret is exposed.

3. **Zero Hardcoded Test Credentials in Production**:
   - Dummy credentials, test phone numbers, mock IDs, or dummy data must never exist in production code or form `defaultValues`.

4. **Rate Limiting Patterns for Sensitive Endpoints**:
   - All sensitive operations (authentication triggers, OTPs, lead submissions) must be throttled to prevent abuse (e.g., max requests per IP/user per window).
   - Use bot protection or CAPTCHA mechanisms where necessary.

5. **Redirect URL Whitelisting**:
   - Partner redirect URLs and OAuth callbacks must be validated against a strict internal allowlist before redirection to prevent open redirect vulnerabilities.

6. **Content Security Policy (CSP)**:
   - Strong CSP headers must be configured, restricting script execution to approved nonces, domains, and trusted third parties.

7. **Input Validation and Sanitization**:
   - All user inputs must be validated against strict schemas (e.g., Zod) on both the client and server.
   - Never trust client-side validation alone. Always re-validate inputs on API route handlers.
