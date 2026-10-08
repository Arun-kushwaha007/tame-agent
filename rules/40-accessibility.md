# Rule 40: Accessibility Standards (WCAG 2.1 AA)

## Purpose

Ensures the application is fully accessible to all users, conforming to WCAG 2.1 AA guidelines.

## When It Applies

Applies continuously to all UI components, HTML structure, interactive elements, forms, and navigation across the project.

## Non-Negotiable Rules

1. **Semantic HTML Elements**:
   - Semantic HTML only. No `<div>` or `<span>` for click actions.
   - Use native `<button type="button">`, `<button type="submit">`, or `<a href="...">` for interactive elements.

2. **Keyboard Navigation Requirements**:
   - Ensure full keyboard operability (Tab, Shift+Tab, Enter, Space, Esc).
   - Never remove focus rings without providing accessible alternatives (e.g., `focus-visible:ring-2`).

3. **Accessible Form Patterns**:
   - Every form control must have an associated `<label>` element (`htmlFor` linking to input `id`).
   - Form errors must be linked via `aria-describedby` and marked with `role="alert"`.

4. **Touch Target Minimums**:
   - All interactive elements (buttons, links, inputs) must have a minimum touch target of **44x44 CSS pixels**.

5. **Color Contrast Ratios**:
   - Color contrast ratio must meet or exceed **4.5:1** for normal body text.
   - Color contrast ratio must meet or exceed **3:1** for large text and essential UI elements.

6. **Screen Reader Heading Parity**:
   - Ensure semantic heading order (`H1` down to `H6`) without skipping levels.
   - When titles are visually split across multiple lines using `<br />` or styling spans, render the complete sentence in `<span className="sr-only">Full Title</span>` and wrap the visual layout in `<span aria-hidden="true">` to prevent screen readers from reading broken phrases.

7. **Modal Background Scroll Lock Mandate**:
   - Every modal, sheet, dialog, or fullscreen overlay must lock background scroll (e.g., `document.body.style.overflow = "hidden"`) upon opening.
   - Ensure the original overflow state is fully restored on unmount.
