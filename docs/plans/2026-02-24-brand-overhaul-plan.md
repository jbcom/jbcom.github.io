# Brand Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the portfolio from a generic dark dev site into a distinctive personal brand for Jon Bogaty as a Principal/Staff SRE and Platform Engineering Leader, using a warm amber design system with Instrument Serif headings.

**Architecture:** Pure Astro SSG (zero client-side JS). All interactions via CSS-only patterns (checkbox tabs, details/summary, :target modals). Existing resume data pipeline (JSON → web/PDF/DOCX) preserved. New pages: Journey, Projects, Contact. Redesigned: Home, Nav, Footer. Updated: Resume, global styles.

**Tech Stack:** Astro 5+, astro-pdf, docx (npm), CSS custom properties, Biome (lint/format), Instrument Serif + Inter + JetBrains Mono via Google Fonts

**Design doc:** `docs/plans/2026-02-24-brand-overhaul-design.md`

---

## Task 1: Update design tokens and global stylesheet

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Replace the Google Fonts import**

Replace the existing `@import url(...)` line at the top of `global.css` with:

```css
@import url("https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap");
```

**Step 2: Replace all CSS custom properties in `:root`**

Replace the entire `:root` block with the new design tokens:

```css
:root {
  /* ── Backgrounds ─────────────────────────────────────────── */
  --bg-default: #0B0D14;
  --bg-surface: #14161F;
  --bg-elevated: #1E2030;

  /* ── Brand (Warm Amber) ──────────────────────────────────── */
  --brand: #E8A849;
  --brand-light: #F0B866;
  --brand-dark: #C4882E;
  --brand-dim: rgba(232, 168, 73, 0.15);

  /* ── Text ────────────────────────────────────────────────── */
  --text-primary: #F0EDE8;
  --text-secondary: #9A9690;
  --text-disabled: #5A5750;

  /* ── Technical Accent (Steel Blue) ───────────────────────── */
  --accent-tech: #6B8BAD;
  --accent-tech-dim: rgba(107, 139, 173, 0.15);

  /* ── Borders ─────────────────────────────────────────────── */
  --border: #1E2030;
  --border-hover: #2A2D3A;

  /* ── Semantic ────────────────────────────────────────────── */
  --success: #4ADE80;
  --warning: #F59E0B;
  --error: #EF4444;

  /* ── Typography ──────────────────────────────────────────── */
  --font-heading: "Instrument Serif", Georgia, "Times New Roman", serif;
  --font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", "Consolas", monospace;

  /* ── Spacing ─────────────────────────────────────────────── */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;

  /* ── Radii ───────────────────────────────────────────────── */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

**Step 3: Update all color references throughout global.css**

Find-and-replace the old token names to the new ones:
- `--primary` → `--brand`
- `--primary-light` → `--brand-light`
- `--primary-dark` → `--brand-dark`
- `--secondary` → `--accent-tech`
- `--secondary-light` → `--accent-tech`
- `--secondary-dark` → `--accent-tech`
- `--bg-paper` → `--bg-surface`
- `--divider` → `--border`
- `--info` → `--brand`

Remove category and language color tokens (will be defined inline where needed).

**Step 4: Update heading styles to use serif font**

The heading rule already uses `var(--font-heading)` — the variable change handles this. Verify that headings render in Instrument Serif.

**Step 5: Update the logo gradient in `.logo-mark`**

```css
.logo-mark {
  background: linear-gradient(135deg, #E8A849, #C4882E);
}
```

**Step 6: Update scrollbar and focus-visible colors**

Replace `var(--primary)` references in scrollbar and focus-visible rules with `var(--brand)`.

**Step 7: Build and verify**

Run: `pnpm build`
Expected: Build succeeds. All pages render.

**Step 8: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(design): replace design tokens — amber palette, Instrument Serif headings"
```

---

## Task 2: Update BaseLayout with new fonts and meta

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Update the Google Fonts link**

Replace the font stylesheet `<link>` with:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

**Step 2: Add Open Graph meta tags for brand**

After the description meta, add:

```html
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url.href} />
<meta name="theme-color" content="#E8A849" />
```

**Step 3: Build and verify**

Run: `pnpm build`

**Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat(layout): update fonts to Instrument Serif, add OG meta"
```

---

## Task 3: Update PrintLayout with new brand color

**Files:**
- Modify: `src/layouts/PrintLayout.astro`

**Step 1: Replace font import**

In the `<link>` for Google Fonts, replace Space Grotesk with Instrument Serif:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

**Step 2: Replace all `#06b6d4` with `#B8862B`**

In print context, use a darker amber (`#B8862B` — "dark goldenrod") instead of the screen amber, because print on white paper needs different contrast. Replace all instances of `#06b6d4` in the inline styles.

**Step 3: Update heading font-family references**

Replace `"Space Grotesk"` with `"Instrument Serif"` in the h1-h6 rule.

**Step 4: Build and verify PDF generates correctly**

Run: `pnpm build`
Check: `dist/Jon_Bogaty_Resume.pdf` exists and renders correctly.

**Step 5: Commit**

```bash
git add src/layouts/PrintLayout.astro
git commit -m "feat(print): update brand color and heading font for PDF"
```

---

## Task 4: Update resume-print.astro brand color

**Files:**
- Modify: `src/pages/resume-print.astro`

**Step 1: Replace `#06b6d4` with `#B8862B`**

In the `<style>` block, replace all instances of `#06b6d4` with `#B8862B`.

**Step 2: Build and verify**

Run: `pnpm build`

**Step 3: Commit**

```bash
git add src/pages/resume-print.astro
git commit -m "feat(resume-print): update accent color to amber"
```

---

## Task 5: Update DOCX builder brand color

**Files:**
- Modify: `src/lib/docx-builder.ts`

**Step 1: Find any cyan hex references and replace with amber**

Search for `06b6d4` or `06B6D4` and replace with `B8862B` (dark goldenrod for print/document context).

**Step 2: Build and verify DOCX generates**

Run: `pnpm build`
Check: `dist/Jon_Bogaty_Resume.docx` exists.

**Step 3: Commit**

```bash
git add src/lib/docx-builder.ts
git commit -m "feat(docx): update accent color to amber"
```

---

## Task 6: Redesign Nav component

**Files:**
- Modify: `src/components/Nav.astro`

**Step 1: Update nav links**

Replace the `navLinks` array with:

```typescript
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Journey', href: '/journey/' },
  { label: 'Resume', href: '/resume/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Contact', href: '/contact/' },
]
```

**Step 2: Update the logo mark**

Change `jb` text in the logo-mark to use the new gradient:

```html
<a href="/" class="logo" aria-label="Jon Bogaty — Home">
  <span class="logo-mark" aria-hidden="true">JB</span>
  <span class="wordmark">Jon Bogaty</span>
</a>
```

**Step 3: Add scoped styles for the new brand**

Add after existing styles:

```css
.logo-mark {
  background: linear-gradient(135deg, var(--brand), var(--brand-dark));
}

.wordmark {
  font-family: var(--font-heading);
  font-style: italic;
  letter-spacing: -0.01em;
}
```

**Step 4: Build and verify**

Run: `pnpm build`

**Step 5: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat(nav): rebrand to Jon Bogaty, update navigation links"
```

---

## Task 7: Redesign Footer component

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Add personal brand footer**

Replace the footer content with a branded version including social links, a tagline, and the copyright:

```astro
---
const currentYear = new Date().getFullYear()

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/jbcom', ariaLabel: 'GitHub profile' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jonbogaty', ariaLabel: 'LinkedIn profile' },
  { label: 'Telegram', href: 'https://t.me/jbpersonaldev', ariaLabel: 'Telegram' },
  { label: 'Email', href: 'mailto:jon@jonbogaty.com', ariaLabel: 'Send email' },
]
---

<footer>
  <div class="footer-content">
    <div class="footer-brand">
      <span class="footer-name">Jon Bogaty</span>
      <span class="footer-tagline">DevOps · SRE · Platform Engineering · AI</span>
    </div>
    <div class="footer-links">
      {socialLinks.map((link) => (
        <a
          href={link.href}
          aria-label={link.ariaLabel}
          {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {link.label}
        </a>
      ))}
    </div>
    <p class="footer-copyright">
      &copy; {currentYear} Jon Bogaty. All rights reserved.
    </p>
  </div>
</footer>
```

**Step 2: Add scoped footer styles**

```css
<style>
  .footer-brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    margin-bottom: 1.25rem;
  }

  .footer-name {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    color: var(--text-primary);
  }

  .footer-tagline {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-disabled);
    letter-spacing: 0.05em;
  }
</style>
```

**Step 3: Build and verify**

Run: `pnpm build`

**Step 4: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat(footer): rebrand with personal identity and tagline"
```

---

## Task 8: Redesign Home page (index.astro)

**Files:**
- Modify: `src/pages/index.astro`

This is the biggest single task — the hero and main landing page.

**Step 1: Rewrite the full page**

Replace the entire file. The new homepage has:
1. **Hero section** — Full-viewport with grid background, name in Instrument Serif, tagline, stats bar
2. **Expertise bento** — 4-card asymmetric grid (AI, Infrastructure, Security, Platform)
3. **Featured projects** — 3-card strip from resume.json projects
4. **CTA section** — Resume + Projects links

The hero uses a CSS grid background pattern (no JS), gradient text via `background-clip: text`, and the stats use plain HTML with CSS counters.

The bento grid uses CSS grid with `grid-template-columns` and `grid-template-rows` for asymmetric layout, with hover transitions.

**Step 2: Build and verify**

Run: `pnpm build && pnpm preview`
Verify: Homepage renders with new design.

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(home): redesign hero, bento grid, and CTA for personal brand"
```

---

## Task 9: Create Journey page

**Files:**
- Create: `src/pages/journey.astro`

**Step 1: Create the page**

The Journey page tells Jon's career story with:
1. **Page header** — "The Journey" in Instrument Serif
2. **Innovation timeline** — CSS-only vertical timeline using the `innovation` array from resume.json
3. **Career phases tab system** — CSS radio-button tabs for career phases
4. **Narrative bio section** — Expanded about content with details/summary for deeper dives

Uses `resume.json` data for the timeline and career details.

**Step 2: Build and verify**

Run: `pnpm build`

**Step 3: Commit**

```bash
git add src/pages/journey.astro
git commit -m "feat(journey): create career timeline page with CSS-only tabs"
```

---

## Task 10: Create Projects page

**Files:**
- Create: `src/pages/projects.astro`

**Step 1: Create the page**

Curated project showcase (not the full ecosystem catalog). Shows 6-8 key projects from `resume.json` projects array plus selected ecosystem packages. Each card has:
- Project name
- Description
- Language chip
- GitHub link
- External docs link (where applicable)

Uses CSS grid with hover transitions. No tab system needed — simple grid.

**Step 2: Build and verify**

Run: `pnpm build`

**Step 3: Commit**

```bash
git add src/pages/projects.astro
git commit -m "feat(projects): create curated project showcase page"
```

---

## Task 11: Create Contact page

**Files:**
- Create: `src/pages/contact.astro`

**Step 1: Create the page**

Simple contact page with:
- Heading: "Let's Connect"
- Social links as styled cards (GitHub, LinkedIn, Telegram, Email)
- Resume download CTA
- Location: Lincoln, NE

No form — just direct links. Clean, minimal.

**Step 2: Build and verify**

Run: `pnpm build`

**Step 3: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat(contact): create contact page with social links"
```

---

## Task 12: Update Resume page styling

**Files:**
- Modify: `src/pages/resume.astro`
- Modify: `src/components/resume/Header.astro`
- Modify: `src/components/resume/Summary.astro`
- Modify: `src/components/resume/Competencies.astro`
- Modify: `src/components/resume/Experience.astro`
- Modify: `src/components/resume/EarlierCareer.astro`
- Modify: `src/components/resume/Innovation.astro`
- Modify: `src/components/resume/Projects.astro`
- Modify: `src/components/resume/Skills.astro`
- Modify: `src/components/resume/Education.astro`
- Modify: `src/components/resume/DownloadBar.astro`

**Step 1: Update resume.astro root variables**

Replace the `--resume-accent: #06b6d4` with `--resume-accent: #E8A849` and update all resume-specific CSS variables to match the new palette.

**Step 2: Update each resume component**

In each component, replace any hardcoded color references:
- `#06b6d4` → `var(--brand)` or `var(--resume-accent)`
- Update any `--resume-*` variables to use the new warm palette

**Step 3: Build and verify**

Run: `pnpm build`
Check: Resume page renders, PDF generates, DOCX generates.

**Step 4: Commit**

```bash
git add src/pages/resume.astro src/components/resume/
git commit -m "feat(resume): update all resume components to amber design system"
```

---

## Task 13: Remove old ecosystem page, update About redirect

**Files:**
- Delete: `src/pages/ecosystem.astro`
- Delete: `src/pages/about.astro`

**Step 1: Remove ecosystem.astro**

The full ecosystem catalog is being replaced by the curated Projects page. The dedicated ecosystem docs sites handle the deep catalog.

**Step 2: Remove about.astro**

The about content is now split between the Home hero/bio and the Journey page.

**Step 3: Build and verify**

Run: `pnpm build`
Expected: 4 pages build (index, journey, resume, projects, contact, resume-print) + DOCX endpoint.

**Step 4: Commit**

```bash
git add -u src/pages/ecosystem.astro src/pages/about.astro
git commit -m "chore: remove ecosystem and about pages (replaced by projects and journey)"
```

---

## Task 14: Update favicon to amber brand

**Files:**
- Modify: `public/favicon.svg`

**Step 1: Update SVG colors**

Replace cyan/blue gradient references with amber gradient (`#E8A849` → `#C4882E`).

**Step 2: Build and verify**

Run: `pnpm build`

**Step 3: Commit**

```bash
git add public/favicon.svg
git commit -m "feat(brand): update favicon to amber palette"
```

---

## Task 15: Final build verification and cleanup

**Step 1: Full build**

Run: `pnpm build`
Verify: All pages generate, PDF generates, DOCX generates, no errors.

**Step 2: Preview**

Run: `pnpm preview`
Manually check each page in browser.

**Step 3: Run linter**

Run: `pnpm lint`
Fix any issues.

**Step 4: Final commit with any cleanup**

```bash
git add -A
git commit -m "chore: final cleanup and lint fixes for brand overhaul"
```
