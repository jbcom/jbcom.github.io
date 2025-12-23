# Sentinel Journal 🛡️

## 2025-05-15 - Missing CSP on Static Site

**Vulnerability:** The static HTML pages (`index.html`, `ecosystem.html`, etc.) which serve as the main entry points were completely missing `Content-Security-Policy` headers, despite documentation claiming strict enforcement.

**Learning:** "Documentation as code" is not "Security as code". Just because security controls are documented in memory or comments doesn't mean they are active. Static sites hosted on platforms like GitHub Pages need meta tags for CSP since we don't control the server headers directly.

**Prevention:** Added strict CSP meta tags to all static HTML files restricting scripts to 'none' (since these are static pages) and locking down other resources to 'self' and trusted CDNs (Google Fonts, Shields.io).
