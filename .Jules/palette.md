## 2025-12-18 - Interactive Cards Accessibility
**Learning:** Using `div` or `Card` with `onClick` creates a keyboard trap. MUI's `CardActionArea` solves this by adding button role, focus states, and ripple effects without complex custom CSS.
**Action:** Always wrap interactive Cards in `CardActionArea` or `<button>` instead of adding `onClick` directly to the container.

## 2025-05-23 - Repeated Link Text in Cards
**Learning:** Generic button labels like "GitHub" or "Demo" on list/grid pages fail WCAG "Link Purpose (In Context)" if they aren't distinguishable by screen readers.
**Action:** Always append dynamic content (e.g., package name) to `aria-label` for repeated action buttons (e.g., `aria-label="GitHub repo for strata"`).
