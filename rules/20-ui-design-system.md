# Rule 20: UI Architecture, Design System & Radix Standards

## Purpose

Enforces brand design tokens, standardized headless primitives, CSS styling rules, responsive card stacking, fluid typography clamping, smooth scrolling, desktop scroll animations, Figma asset management, and modal background scroll locks.

## When It Applies

Applies to all UI components, layouts, typography, color styling, dialogs, drawers, sheets, form elements, buttons, cards, and animations across the project.

## Non-Negotiable Rules

1. **Centralized Design Token Architecture**:
   - All styling must leverage official brand tokens defined in a single source of truth (`[CUSTOMIZE: css_globals_path, e.g., globals.css]`).
   - Hardcoded hex codes (e.g. `bg-[#FFFFFF]`, `text-[#000000]`) are **strictly forbidden** in component JSX. Changing a token in the globals file must cascade across all routes instantly.

2. **Mandatory Reuse of UI Components & 100% Individual Override Flexibility**:
   - Every feature page, form, modal, and marketing section MUST reuse the established UI primitives.
   - **Strictly Prohibited**: Never create duplicate one-off buttons, custom inputs, raw HTML elements with inline styles, custom card wrappers, or bespoke modal implementations.
   - **100% Component Override Contract**: Primitives define semantic tokens as default variants. Every calling instance can override colors, padding, corner radius, and sizing locally via `className` and standard variant props. Use a class merge utility (`cn()` or `twMerge`) to cleanly resolve class conflicts.

3. **Window-Width Card Stacking Rule (Mobile View `< md`)**:
   - For any window-width card or feature banner that has a 2-3 column layout in desktop view:
     - When converted to mobile view (`< md`), the card MUST split into vertical sections appropriately ordered (e.g., Header, Media, Body).

4. **Responsive Clamping & Zoom Adaptation**:
   - All typography and key container padding must use fluid responsive clamping (`clamp()`) to adapt cleanly across screen widths and browser zoom levels without abrupt layout jumps.
   - Avoid fixed pixel sizes for large text that break when browser zoom is changed.

5. **Screen-Edge Horizontal Padding & Container Alignment**:
   - All pages, tabs, modals, cards, and container layouts across the application must strictly adhere to the unified responsive spacing and rounding hierarchy.
   - Ensure a maximum container width (e.g., 1232px) centered on the screen for large monitors.

6. **Card Surface and Background Standards**:
   - Ensure explicit flat surfaces without unnecessary outer borders or drop shadows unless specified by the design language.
   - Preserve corner radius standards (e.g., `rounded-[20px]` on desktop, `rounded-[12px]` on mobile).

7. **Anti-AI Design & Cliché Defense**:
   - Do not produce generic "AI-generated website" designs.
   - **Visual Clichés to Avoid**:
     - Do not use generic gradients across random panels.
     - Do not use floating cards without clear visual hierarchy.
     - Do not add random glassmorphism or background blur unless specified in design tokens.
     - Do not create text-heavy hero sections that overwhelm the user.
     - Do not add decorative vector blobs or floating shapes that serve no function.

8. **Typography Hierarchy**:
   - Adhere to the official font hierarchy for the project.
   - Define specific font families and weights for:
     - **Display & Hero Headings**
     - **Section Headings, Titles, Badges & Navigation**
     - **Body Text, Form Controls, Bullet Copy & Data Tables**
