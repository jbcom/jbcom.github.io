# AGENTS.md

Instructions for AI agents working in `/Users/jbogaty/src/jbcom/jbcom.github.io`.

## Repository Shape

This is a no-build static portfolio website for Jon Bogaty.

- Runtime: browser-native HTML5, CSS3, and JavaScript.
- Deployment: GitHub Pages.
- Deploy artifact root: `public/`.
- Canonical resume artifact: `public/Jon_Bogaty_Resume.docx`.
- There is no Node.js project here. Do not add `package.json`, `node_modules`,
  Astro, React, TypeScript, Vite, Tailwind, or resume-generation tooling.
- Third-party browser libraries must be pinned, minified, checked in under
  `public/assets/vendor/`, and loaded locally. Do not add runtime CDN imports.

## Hard Rule: Resume

`public/Jon_Bogaty_Resume.docx` is user-supplied and immutable from the website
tooling perspective.

- Do not regenerate it.
- Do not run a build step that rewrites it.
- Do not create a source-of-truth resume data file.
- If the resume changes, the user replaces the DOCX directly.

## Local Work

Use simple static-server checks:

```bash
python3 -m http.server 4173 --directory public
```

Then inspect `http://localhost:4173`.

## Design Direction

The site should sell Jon specifically:

- Platform engineering leader and hands-on Staff-level engineer.
- SRE, cloud infrastructure, developer platforms, security, observability, and
  automation.
- Concrete proof beats generic claims: ~$100K/month AWS savings, 146+ Terraform
  modules, 30-40% faster incident triage/MTTR, embedded SRE leadership, and a
  multi-year AI-agent engineering program.

Avoid LLM portfolio tropes:

- generic SaaS hero language
- purple/blue gradient sludge
- decorative orb backgrounds
- fake dashboards
- vague "I build scalable solutions" copy
- card soup with no hierarchy
- icons standing in for substance

Keep the implementation small, readable, accessible, and static.

Current vendored libraries:

- `public/assets/vendor/lenis.min.js`: Lenis v1.0.42 for smooth scrolling.
- `public/assets/vendor/modern-normalize.min.css`: modern-normalize v3.0.1 for
  cross-browser baseline consistency.
