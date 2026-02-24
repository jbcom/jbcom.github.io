# Brand Overhaul: Design System & Visual Identity

**Date:** 2026-02-24
**Status:** Approved

## Problem

The current site looks like a generic dark developer portfolio. Cyan `#06b6d4` is the default SaaS color. Space Grotesk headings are "friendly and playful" (per its designers) — wrong personality for a senior engineering leader. The homepage leads with the open source ecosystem, not the person. The site needs to sell Jon Bogaty as a brand.

## Design Decisions

### Color Palette

All contrast ratios verified computationally against WCAG 2.1.

| Token | Hex | Purpose | Contrast vs bg | WCAG |
|-------|-----|---------|----------------|------|
| `--bg-default` | `#0B0D14` | Page background | — | — |
| `--bg-surface` | `#14161F` | Cards, elevated | 1.07:1 vs bg | — |
| `--bg-elevated` | `#1E2030` | Hover, active | — | — |
| `--brand` | `#E8A849` | Primary accent | 9.36:1 | AAA |
| `--brand-light` | `#F0B866` | Hover states | 10.86:1 | AAA |
| `--brand-dim` | `rgba(232,168,73,0.15)` | Tinted backgrounds | — | — |
| `--text-primary` | `#F0EDE8` | Headings, primary | 16.62:1 | AAA |
| `--text-secondary` | `#9A9690` | Body, descriptions | 6.60:1 | AA |
| `--text-disabled` | `#5A5750` | Muted elements | 3.18:1 | AA-large |
| `--accent-tech` | `#6B8BAD` | Code, tags, badges | 5.47:1 | AA |
| `--border` | `#1E2030` | Dividers, borders | — | — |
| `--success` | `#4ADE80` | Positive states | — | — |
| `--warning` | `#F59E0B` | Caution states | — | — |
| `--error` | `#EF4444` | Error states | — | — |

**Reasoning:**
- Amber/gold signals achievement, wisdom, premium quality (color psychology research)
- Warm colors advance spatially, creating intimacy for a personal brand
- Split-complementary scheme: amber primary + steel blue secondary for technical credibility
- Warm-tinted whites and grays harmonize with amber (no blue-white fighting)

### Typography

| Role | Font | Weight(s) | Reasoning |
|------|------|-----------|-----------|
| Headings | Instrument Serif | 400 (regular + italic) | Modern serif conquering tech branding. Signals refined expertise with contemporary edge. Authority without stuffiness. |
| Body | Inter | 400, 500, 600, 700 | Purpose-built for screen readability. Tall x-height, variable font. Best-in-class — no change needed. |
| Mono | JetBrains Mono | 400, 500 | Gold standard for technical content. Designed for reduced eye strain. |

**Key insight:** Serif headings + sans-serif body = "experienced authority who is also modern and accessible." Exactly this brand.

### Site Structure

```
/ (Home)          → Hero + stats + expertise bento + featured projects + CTA
/journey/         → Career timeline + innovation arc + narrative bio
/resume/          → Full detailed resume with PDF/DOCX downloads
/projects/        → Curated project highlights linking to external sites
/contact/         → Contact form/links + social profiles
/resume-print/    → (hidden) Print-optimized resume for PDF generation
```

### Interaction Patterns (Zero JS)

- **Tab systems:** `<input type="radio">` + CSS `:checked` sibling selectors
- **Expandable sections:** `<details>` / `<summary>` with styled markers
- **Modal dialogs:** CSS `:target` pseudo-class or `<dialog>` element
- **Hover reveals:** `group` pattern with `opacity`/`transform` transitions
- **Scroll indicators:** CSS `scroll-margin-top` for anchor navigation
- **Responsive nav:** Existing checkbox hamburger pattern (already works)

### Page Design Concepts

**Home (index.astro):**
- Full-viewport hero with subtle CSS grid background pattern
- Name in Instrument Serif, large, gradient text (amber → gold)
- Tagline: "15+ years spanning DevOps, SRE, Security, AI & Platform Engineering"
- Stats bar: 15+ Years | 40+ Packages | $100K+/mo Savings | 3 Cloud Platforms
- Bento grid showcasing expertise domains (AI, Infrastructure, Security, Platform)
- Featured projects strip
- CTA: "View Full Resume" + "Explore Projects"

**Journey (journey.astro):**
- Innovation timeline with visual progression (CSS-only)
- Career narrative sections using `<details>` for role expansions
- Key achievement callout cards
- Tab system for career phases (Early Career → Multi-Cloud → AI Pioneer → OSS Author)

**Resume (resume.astro):**
- Keep existing component structure (Header, Summary, Competencies, etc.)
- Update styling to new design tokens
- Download bar with PDF/DOCX links

**Projects (projects.astro):**
- Curated grid of 6-8 key projects from resume.json
- Each card links to external GitHub/docs
- Category chips, language indicators
- Not a full ecosystem catalog — that lives at dedicated docs sites

**Contact (contact.astro):**
- Social links (GitHub, LinkedIn, Telegram, Email)
- Optional: mailto form styled as a card
- Resume download CTA
- Location indicator
