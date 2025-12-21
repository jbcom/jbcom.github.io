## 2025-12-18 - Interactive Cards Accessibility
**Learning:** Using `div` or `Card` with `onClick` creates a keyboard trap. MUI's `CardActionArea` solves this by adding button role, focus states, and ripple effects without complex custom CSS.
**Action:** Always wrap interactive Cards in `CardActionArea` or `<button>` instead of adding `onClick` directly to the container.

## 2025-12-19 - Clearable Search Inputs
**Learning:** MUI TextField lacks a built-in clear button. Users expect to easily clear search filters without backspacing.
**Action:** Implement `endAdornment` with an `IconButton` (aria-label="Clear search") that conditionally appears when input has value.
