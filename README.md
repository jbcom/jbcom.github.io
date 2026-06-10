# jbcom.github.io

> Jon Bogaty's professional portfolio — [jonbogaty.com](https://www.jonbogaty.com)

## Purpose

1. **Professional portfolio** — career history, skills, open-source projects
2. **Resume distribution** — a compiled, QC'd DOCX as the single distributable
3. **Ecosystem showcase** — the jbcom open-source frameworks

## Architecture

Astro 6 static site, Tailwind CSS v4, **zero JavaScript shipped** — the only
client script is a dozen inline lines of nav scroll-spy. No React, no
component framework.

```
src/
├── content/resume.ts        # CANONICAL resume data — single source of truth
├── content/writing/         # Markdown posts (see content.config.ts for frontmatter)
├── pages/
│   ├── index.astro          # The lobby: hero → Open Source → contact
│   ├── resume.astro         # Print-optimized HTML resume view
│   ├── writing/             # Post index + pages — nav link appears with the first post
│   └── rss.xml.ts           # RSS feed for writing
├── components/              # Astro components (SiteNav, Hero, OpenSourceSection, Footer)
└── layouts/Layout.astro     # Meta, JSON-LD, OG tags

scripts/resume/
├── template.ts              # resume.ts → Word-semantics HTML
├── build-docx.ts            # HTML → DOCX (turbodocx) → OOXML postprocess
├── postprocess.ts           # fixes turbodocx's hardcoded layout defects
└── qc.ts                    # renders the DOCX via LibreOffice AND Apple Pages → PNGs
```

### Resume pipeline (DOCX-first, no PDF)

The DOCX is the resume. There is deliberately no PDF target.

```bash
pnpm resume:build   # compile public/Jon_Bogaty_Resume.docx from resume.ts
pnpm resume:qc      # render the actual DOCX to PNGs (artifacts/resume-qc/)
                    # via BOTH engines — read them at full size before shipping;
                    # requires LibreOffice + poppler (Pages used when available)
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
