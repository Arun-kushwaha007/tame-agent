# Rule 00: Project Governance, Mission & Greenfield Guardrails

## Purpose

Establishes the core mission of the project rebuild, sets the absolute boundary between legacy engineering references and greenfield code, defines the mandatory document inspection rule, and enforces strict terminology governance for user-facing text.

## When It Applies

This rule applies **globally and continuously** to every engineer, autonomous AI agent, subagent, pull request, code change, documentation update, and architectural decision across the entire repository.

## Non-Negotiable Rules

1. **Greenfield Rebuild Only**:
   - The repository is a pristine, greenfield build. No legacy code, files, or configurations may be dragged into this repository without complete re-engineering.
   - Zero tolerance for legacy architectural anti-patterns, technical debt, memory leaks, or temporary workarounds.

2. **Legacy Code is Read-Only Reference**:
   - The legacy codebase and audit documents in `[CUSTOMIZE: docs_folder]` are strictly informational references.
   - Use them exclusively to extract: business logic rules, external backend endpoints, payload contracts, and route inventory.
   - **Never copy-paste legacy JSX, CSS, hooks, or configurations**.

3. **Mandatory Document Inspection Before Architectural Work**:
   - Before implementing or altering any architecture, route handler, state store, or logic, agents **must inspect** the relevant active documentation in `[CUSTOMIZE: docs_folder]`.
   - Never make assumptions or invent business rules when authoritative documentation exists.

4. **Explicit Commit Authorization & Branch Safety Protocol**:
   - **Never Commit Without Explicit Permission**: Agents and pair programmers must **NEVER execute `git commit` without explicit permission from the user**. All code additions and modifications must remain available in the working directory for user review until the user explicitly directs a commit.
   - **WARNING: Direct Commits to `main` Are Guarded**: Direct commits to the `main` branch are strictly prohibited without prior authorization. A prominent warning must be displayed whenever any commit is attempted on `main`. Features, pages, and architectural changes should be isolated in dedicated feature branches or staged for review.

5. **Strict Terminology Standard**:
   - For compliance, consumer trust, and brand governance, prohibited words such as **[CUSTOMIZE: prohibited_words]** are **strictly prohibited** anywhere in user-facing website text, page metadata, OpenGraph tags, alt attributes, UI labels, or marketing copy.
   - **Mandatory Replacements**:
     - Instead of _"[CUSTOMIZE: bad_phrase]"_, use _"[CUSTOMIZE: good_phrase]"_.

6. **Document Integrity**:
   - All documentation in `[CUSTOMIZE: docs_folder]` and rules directories must be preserved and kept accurate. Changes to architecture must be accompanied by updates to the relevant documentation files.
