# jbcom.github.io

> Jon Bogaty's professional portfolio — [jonbogaty.com](https://www.jonbogaty.com)

## Purpose

1. **Professional portfolio** — career history, skills, open-source projects
2. **Resume distribution** — a compiled, QC'd DOCX as the single distributable
3. **Ecosystem showcase** — the jbcom open-source frameworks

## Architecture

Astro 6 static site with React islands, shadcn/ui, and Tailwind CSS v4.

```
src/
├── content/resume.ts        # CANONICAL resume data — single source of truth
├── pages/
│   ├── index.astro          # Portfolio SPA shell (React island)
│   └── resume.astro         # Print-optimized HTML resume view
├── components/              # React components (hero, tabs, sections)
└── layouts/Layout.astro     # Meta, JSON-LD, OG tags

scripts/resume/
├── template.ts              # resume.ts → Word-semantics HTML
├── build-docx.ts            # HTML → Jon_Bogaty_Resume.docx (turbodocx)
└── qc.ts                    # DOCX → LibreOffice → PNG pages for visual review
```

### Resume pipeline (DOCX-first, no PDF)

The DOCX is the resume. There is deliberately no PDF target.

```bash
pnpm resume:build   # compile public/Jon_Bogaty_Resume.docx from resume.ts
pnpm resume:qc      # render the actual DOCX to PNGs (artifacts/resume-qc/)
                    # — read them before shipping; requires LibreOffice + poppler
```

`src/content/resume.ts` is typed and commented; positioning decisions are
documented inline and in `docs/resume-review/`. Hard rule: **every fact must
be real** — no invented metrics, titles, or dates. Site-only content (extra
projects, site-flavor copy) is controlled with `onResume: false` and
`resumeDescription` fields rather than forked data.

### Commands

```bash
pnpm dev            # dev server
pnpm build          # static build (dist/)
pnpm test           # vitest unit tests (includes DOCX structural QC)
pnpm test:e2e       # Playwright
pnpm check          # astro check + tsc
pnpm lint           # biome
```

### CI/CD

- `ci.yml` — lint, typecheck, tests on PRs
- `resume.yml` — regenerates the DOCX on PRs touching resume sources
- `cd.yml` / `release.yml` — release-please + GitHub Pages deploy

## Design system

Always dark. Amber `#E8A849` on rich black `#0B0D14`, steel blue `#6B8BAD`
secondary. Instrument Serif headings, Inter body, JetBrains Mono code.
Print/DOCX accent is `#996B1D` (dark goldenrod — site amber is too light on
white).
