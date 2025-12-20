## 2025-12-20 - Inline Event Handlers and Missing CSP
**Vulnerability:** Found inline JavaScript event handlers (`onmouseover`/`onmouseout`) in `resume.html` and a complete lack of Content Security Policy (CSP) headers across all static HTML files.
**Learning:** Static sites often neglect CSP because they are "just HTML", but this leaves them vulnerable to XSS if any injection occurs (e.g. via compromised third-party assets or reflected XSS in future dynamic additions). Moving visual logic to CSS allowed for a `script-src 'none'` policy, which is the gold standard for static content.
**Prevention:** Always implement strict CSP headers (`script-src 'none'` for static pages) from day one. Use CSS for visual interactions instead of JavaScript event handlers.
