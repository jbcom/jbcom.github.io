# Resume Redesign: Astro Migration + Content Optimization

**Date:** 2026-02-24
**Status:** Approved

## Problem

The resume exists in 3 diverged sources (resume.md, ResumePage.tsx, resume.html), PDF/DOCX are manually generated static files, the content is generic/duty-focused rather than accomplishment-driven, and the site uses Vite/React when there's no actual need for client-side JavaScript.

## Decision

Migrate the portfolio site to pure Astro (zero JS), establish a single JSON data source for the resume, and generate PDF/DOCX at build time.

## Architecture

### Framework
- Pure Astro, no React, no client-side JavaScript
- Interactive project demos live at their own domains (strata.game, extended-data.dev, agentic.coach)
- Ecosystem page links out to those external sites

### Resume Data Pipeline
```
src/content/resume.json          <- Single source of truth
    |
    +-- src/pages/resume.astro   -> Static HTML (web view with design system styling)
    |
    +-- src/pages/resume-print.astro -> Print-optimized HTML (PDF source)
    |       |
    |       +-- astro-pdf        -> dist/Jon_Bogaty_Resume.pdf
    |
    +-- src/pages/resume.docx.ts -> dist/Jon_Bogaty_Resume.docx
```

### Project Structure
```
src/
  content/
    resume.json              # Extended JSON Resume schema
    ecosystem.yml            # Ecosystem catalog
  content.config.ts          # Zod schemas + loaders
  components/
    resume/
      Header.astro
      Summary.astro
      Experience.astro
      Skills.astro
      Innovation.astro
      Projects.astro
      Education.astro
    Nav.astro
    Footer.astro
  layouts/
    BaseLayout.astro         # Nav + footer + head meta
    PrintLayout.astro        # Minimal for PDF source
  pages/
    index.astro
    about.astro
    resume.astro
    resume-print.astro
    resume.docx.ts
    ecosystem.astro
  styles/
    global.css
    print.css
  lib/
    docx-builder.ts
```

### Dependencies
- astro
- astro-pdf (build-time PDF via Puppeteer)
- docx (build-time DOCX, pure JS)

### PDF vs DOCX Strategy
- PDF: Visual fidelity, design system fonts/colors, print stylesheet
- DOCX: Deliberately plain (Calibri, no colors, standard headings) for maximum ATS compatibility
- Both generated from same resume.json

## Content Strategy

### Target Role
Principal/Staff SRE / Platform Engineering Lead

### Resume Sections (F-pattern optimized)
1. Header (name, title, contact)
2. Professional Summary (keyword-dense, natural voice)
3. Core Competencies (ATS keyword grid)
4. Professional Experience (full detail for recent, condensed for older)
5. Innovation & Technology Leadership (timeline)
6. Open Source & AI Projects
7. Technical Skills (categorized, acronyms + full names)
8. Education

### Key Narrative Threads
- Innovation arc: Early Docker/Terraform adopter -> Multi-cloud IaC pioneer -> AI operations inventor -> OSS AI framework author
- AI team management: 2+ years running fully AI-staffed operations before agentic frameworks existed
- Full-spectrum DevOps/SecOps/SRE: Not just one discipline, spans the entire space
- Quantified impact: $100K+/month AWS savings, hundreds of Lambdas, multi-DC K8s, Fireblocks secure enclaves

### FSC End Date
January 2026 (not "Present")

### Older Roles
Full detail: FSC, GoHealth, Symbiont
Moderate detail: Jump Ramp, Qualia Media, ClassPass, Magnetic
Single-line "Earlier Career": Digital First Media, EachScape, Totsy, Social Cubix, RentShare, freelance

## ATS Optimization Rules
- Single-column layout for PDF/DOCX
- Standard section headings
- Both acronym and full term on first use: "Infrastructure as Code (IaC)"
- Keywords placed in summary, skills section, AND experience bullets
- Clean filename: Jon_Bogaty_Resume.pdf
- Selectable text in PDF (not images)
