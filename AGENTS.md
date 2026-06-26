# AGENTS.md

Instructions for AI agents working in `/Users/jbogaty/src/jbcom/jbcom.github.io`.

## Repository Shape

This is a no-build static portfolio website for Jon Bogaty.

- Runtime: browser-native HTML5, CSS3, and JavaScript.
- Deployment: GitHub Pages.
- Deploy artifact root: `public/`.
- Readable source root: `source/`.
- Canonical resume artifact: `public/assets/resume.pdf`.
- There is no Node.js project here. Do not add `package.json`, `node_modules`,
  Astro, React, TypeScript, Vite, Tailwind, or resume-generation tooling.
- Third-party browser libraries must be pinned, minified, checked in under
  `public/assets/vendor/`, and loaded locally. Do not add runtime CDN imports.
- Edit readable files in `source/`, then regenerate committed deploy files with
  `pre-commit run --all-files`.

## Hard Rule: Resume

`public/assets/resume.pdf` is user-supplied and immutable from the website
tooling perspective. The site should point to it, not derive or rewrite it.

- Do not regenerate it.
- Do not run a build step that rewrites it.
- Do not create a source-of-truth resume data file.
- If the resume changes, the user replaces the PDF directly.

## Local Work

Use simple static-server checks:

```bash
pre-commit run --all-files
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
- Keep the current resume PDF as the main conversion goal. The website is a
  concise, high-signal front door, not a duplicated resume.

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

- `public/assets/vendor/modern-normalize.min.css`: modern-normalize v3.0.1 for
  cross-browser baseline consistency.
- `public/assets/fonts/`: local IBM Plex font files.
