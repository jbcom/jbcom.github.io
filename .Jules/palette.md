## 2025-12-18 - Interactive Cards Accessibility
**Learning:** Using `div` or `Card` with `onClick` creates a keyboard trap. MUI's `CardActionArea` solves this by adding button role, focus states, and ripple effects without complex custom CSS.
**Action:** Always wrap interactive Cards in `CardActionArea` or `<button>` instead of adding `onClick` directly to the container.

## 2025-05-21 - Skip to Content Navigation
**Learning:** SPAs with persistent navigation shells force keyboard users to tab through the entire menu on every page transition. A visual "Skip to Content" link that appears on focus dramatically improves navigation efficiency.
**Action:** Always verify `Layout` components include a skip link pointing to the main content area with `tabIndex="-1"`.
