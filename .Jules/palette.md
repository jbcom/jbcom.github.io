## 2025-12-18 - Interactive Cards Accessibility
**Learning:** Using `div` or `Card` with `onClick` creates a keyboard trap. MUI's `CardActionArea` solves this by adding button role, focus states, and ripple effects without complex custom CSS.
**Action:** Always wrap interactive Cards in `CardActionArea` or `<button>` instead of adding `onClick` directly to the container.
