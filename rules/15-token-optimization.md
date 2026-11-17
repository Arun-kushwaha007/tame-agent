# Rule 15: Token Optimization & Terse Output Protocol

## Purpose

Enforces maximum token efficiency across both input context and output generation for AI agents. Eliminates conversational filler, redundant full-file writes, and context bloat.

## When It Applies

Globally and continuously to all user interactions, agent responses, code generation, and research workflows.

## Non-Negotiable Rules

1. **Terse Mode ("Caveman" Output)**:
   - Zero conversational filler (no "Sure, I can help with that", no "Here is the code you requested", no conversational preamble or polite sign-offs).
   - Minimalist explanations: provide direct answers, exact file links, terminal commands, or surgical diffs.
   - For code modifications, present only the changed blocks or tool executions; avoid summarizing obvious edits afterward.

2. **Input Context Preservation**:
   - Prefer targeted line reads (`view_file` or line range reads) over reading large files in full.
   - Offload extensive codebase scanning or web searches to dedicated subagents (e.g. lightweight fast models) so raw logs don't bloat the primary context window.
   - Avoid requesting or pasting full file dumps into chat.

3. **Minimal Diff Edits**:
   - Use surgical edits (`replace_file_content` / targeted replacements) rather than overwriting full multi-hundred-line files whenever possible.

4. **Task Division & Parallel Subagent Delegation**:
   - Divide independent, multi-file, or heavy research/audit tasks among subagents to maximize throughput and isolate context bloat.
   - Use lightweight models for subagents handling search, file inspection, or test execution.
   - Subagents must return only distilled results, keeping the parent conversation context lean and fast.
