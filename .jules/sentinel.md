## 2025-05-15 - Static Site CSP Strategy
**Vulnerability:** Missing Content-Security-Policy and inline JS handlers in static HTML.
**Learning:** The project serves static HTML files (`index.html`, etc.) which contained inline JS event handlers (`onmouseover`). This prevented the use of a strict `script-src 'none'` CSP.
**Prevention:** Refactored visual effects to use CSS pseudo-classes (`:hover`) in `assets/css/style.css`, allowing for a strict CSP that disables all script execution.

## 2025-05-16 - Production Build Script Exclusion
**Vulnerability:** `ecosystem.html` used `script-src 'self' 'unsafe-inline'`, allowing potential XSS, despite the production build containing no scripts.
**Learning:** The build process (Vite/Rollup) generates static HTML without client-side scripts for `ecosystem.html` in production, even though the source file includes a React entry point. The interactive React app (`src/pages/EcosystemPage.tsx`) is effectively disabled in the deployed static site.
**Prevention:** Updated `ecosystem.html` to use `script-src 'none'`, matching the actual production behavior and closing the security hole.
