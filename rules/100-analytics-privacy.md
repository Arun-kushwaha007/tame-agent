# Rule 100: Analytics & Privacy Guardrails

## Purpose

Ensures analytics tracking is effective while strictly adhering to privacy-by-design principles and protecting user data.

## When It Applies

Applies to all analytics integrations, event tracking, logging systems, and URL parameter handling.

## Non-Negotiable Rules

1. **Privacy-by-Design Analytics**:
   - Collect only the minimum data necessary for product and marketing insights.
   - Prioritize aggregated, anonymized metrics over granular user tracking where possible.

2. **Allowed Analytics Events**:
   - Track generic user actions (e.g., `lead_started`, `offer_selected`, `calculator_used`, `feature_clicked`).
   - Use categorical brackets rather than exact numbers where appropriate.

3. **Strictly Prohibited Data**:
   - Never send Personally Identifiable Information (PII) to external analytics services or browser logs.
   - Prohibited data includes: full names, exact addresses, phone numbers, email addresses, national IDs, and exact financial figures.

4. **Zero PII in URL Parameters**:
   - Never include customer identifiers, authentication tokens, or financial numbers in URL query parameters.
   - Use server-side session state or encrypted cookies to persist sensitive context across navigation.

5. **User Data Classification Matrix**:
   - Maintain a clear classification of what data is public, internal, confidential, and restricted. Ensure engineers know exactly what can be logged.
