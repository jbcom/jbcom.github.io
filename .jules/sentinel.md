## 2025-05-15 - Static Site CSP Strategy
**Vulnerability:** Missing Content-Security-Policy and inline JS handlers in static HTML.
**Learning:** The project serves static HTML files (`index.html`, etc.) which contained inline JS event handlers (`onmouseover`). This prevented the use of a strict `script-src 'none'` CSP.
**Prevention:** Refactored visual effects to use CSS pseudo-classes (`:hover`) in `assets/css/style.css`, allowing for a strict CSP that disables all script execution.
