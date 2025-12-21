# Sentinel Journal

This journal records CRITICAL security learnings, vulnerabilities found, and important security decisions.

## 2025-05-20 - Static Site CSP and Inline Handlers
**Vulnerability:** Found inline JavaScript event handlers (`onmouseover`, `onmouseout`) in `resume.html` and missing Content Security Policy (CSP) headers across all static HTML files.
**Learning:** Static sites often rely on inline styles and scripts for simple interactivity, which prevents the use of strict CSP. Moving interactivity to CSS allows for a much stricter security posture (`script-src 'none'`).
**Prevention:** Enforce strict CSP in all HTML entry points. Use CSS pseudo-classes for visual effects instead of JS.
