# Rule 80: Documentation Standards (ASD-STE100)

## Purpose

Ensures that all internal engineering documentation, Architecture Decision Records (ADRs), and agent instructions are clear, concise, and unambiguous.

## When It Applies

Applies to all `README.md` files, pull request descriptions, architecture documents, PRDs, API specifications, and inline code documentation.

## Non-Negotiable Rules

1. **Simplified Technical English (ASD-STE100)**:
   - Apply ASD-STE100 principles at 70% to 80% strength to all internal engineering documents.
   - **Keep sentences short**: Do not exceed 25 words per sentence.
   - **Use active voice**: State the command clearly (e.g., "Write unit tests before code", not "Unit tests should be written").
   - **One instruction per sentence**: Do not combine multiple technical instructions.
   - **Use simple words**: Avoid technical jargon, double negatives, and conversational filler.

2. **Strict Prohibition on Public Copy**:
   - **Do NOT apply ASD-STE100 to public marketing copy, landing pages, educational articles, or SEO pages.**
   - Public copy must remain natural, warm, conversational, and culturally native to the target audience.

3. **Architecture Decision Records (ADRs)**:
   - Record all major architectural decisions in `[CUSTOMIZE: adr_folder, e.g., docs/DECISIONS.md]`.
   - Follow the standard format: Title, Context, Decision, and Consequences.
   - Never make breaking changes to established ADRs without explicit authorization.

4. **Code File Size Limits**:
   - Maintain strict constraints on file sizes to ensure readability.
   - Standard code files and components must not exceed **500 lines**.
   - Custom React hooks must not exceed **200 lines**.
