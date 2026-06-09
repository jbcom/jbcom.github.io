# Site Redesign Spec — "The Engineer Who Runs Your Entire Platform Alone"

**Date:** 2026-06-09
**Inputs:** `.ui-design/reviews/ai-look-diagnosis_20260609.md` (what reads as AI-generated and why), `docs/resume-review/recruiter-review-2026-06-09.md` (positioning), `src/content/resume.ts` (facts — nothing invented).
**Thesis:** a recruiter lands and within 6 seconds reads *who* (Staff Platform & DevOps engineer), *what proof* (sole operator at Flipside 5yr, ~$100K/mo cut, 10K-line codegen platform), *what action* (resume + contact). OSS users get package detail one scroll down.

## A. Information architecture — single opinionated scroll

The six-tab shell dies. Tabs hid the proof-bearing material (Work, Open Source) behind clicks and forced every section into one identical wrapper — the structural "generated IA" tell. Replacement: one vertical narrative with four sticky anchor links (`Work · Open Source · Skills · Contact`), name left, Résumé button right, scroll-spy underline.

Section roster:

| Was | Becomes |
|---|---|
| About tab | Folded: summary ¶1 → hero proof line; ¶2 → Open Source lead |
| Work tab | **Section 1.** Keeps master-detail sidebar (the one already-human section) |
| Projects tab | **Section 2: "Open Source."** Featured-vs-rest hierarchy, package tables promoted |
| Skills tab | **Section 3.** Prose lead + spec-sheet rows, zero badges |
| Earlier Career tab | Folded into Work as a quiet `Before 2017` prose block |
| Education tab | One line in the footer/contact band |

Scroll-depth contract: depth 0 = who + proof + action (above fold); depth 1 = Work receipts (Flipside selected, cost cut + tm_cli leading); depth 2 = Open Source with the featured package table.

## B. Hero

- **Mesh shader killed** (v0/Paper-design signature; drops `@paper-design/shaders-react` from the bundle). One static low-opacity amber radial glow, bottom-left, replaces the entire 4-layer ambient stack (`body::before` dot grid, `body::after` orbs, hero dot grid all die).
- **Name static** — Instrument Serif at display size in `--foreground`; `.hero-name` animated gradient deleted.
- **Left-aligned editorial column**, not centered-over-ambient (centered is itself the template look).
- **Eyebrow above the name**: `STAFF PLATFORM & DEVOPS ENGINEER` (mono, amber, tracked) — the role is what recruiters scan first.
- **Hero proof line** (new `about.heroLine`, assembled from existing facts): "The sole infrastructure engineer at Flipside Crypto for five years — modernized AWS to ~99% serverless, built a 10,000-line Python platform generating 146 Terraform modules, and cut cloud spend by ~$100K/month."
- **Stats: borderless typographic band** — serif number, mono label, hairline vertical rules. `15` (drop the `+`), `~70%`, `5`, `5`. No cards, no backdrop-blur.
- **Status: quiet mono line**, no pill, no pulse.
- **Motion: one wrapper fade-up** (0.5s), replacing five staggered child entrances. Bottom gradient-fade strip deleted.

## C. Sections

**Work** — keep sidebar/detail; de-card the detail pane (left rule + padding instead of stock Card chrome). Cloud providers (AWS/GCP/Azure) stay as small amber chips; remaining tech renders as one mono comma list. First two highlights of the selected role get lead emphasis. `Before 2017` prose block (from `earlierCareer.summary`) closes the section; `EarlierCareer.tsx` badge cloud deleted.

**Open Source** — lead with summary ¶2. **Featured project full-width** (paranoid-passwd: the supply-chain stack reads most senior) with its real package list as an aligned two-column table — the single best anti-AI signal gets the most room. Remaining four in a compact 2-col list: name, tagline, one-liner, package names inline as code, tech as a short mono list. Hash-rotated accent bars (`accentFor`) die; left rules are colored **by category** (security=amber, agents=steel, data=green, 3D=purple) so color means something.

**Skills** — prose lead: "Day to day: AWS and GCP, Terraform and Terragrunt, Kubernetes across EKS/GKE/AKS, Python and Go, and the CI/CD and secrets plumbing that ties them together." Then label/comma-list spec-sheet rows (mono uppercase labels, hairline separators). Zero Badge components.

**Footer/Contact** — one compact band: `Let's talk.` + email, inline social links, résumé buttons, location + one-line education, `© 2026 Jon Bogaty · v… · updated …` (version stamp kept — good human touch). The 3-column grid, the `DevOps · SRE · …` middot chain, and "All rights reserved" die.

## D. Copy (chrome strings)

Nav: `Work / Open Source / Skills / Contact`. Section heading `Projects` → `Open Source`. `Earlier Career` → `Before 2017`. CTAs: `Download Résumé` / `View Résumé`. Footer heading → `Let's talk.` No middot chains (single connective use allowed), no triadic rhythm, no stacked descriptors.

## E. Motion budget

One hero fade-up. Hover/focus transitions and the sidebar active state are interaction feedback and stay. Everything else static. `gradientShift`, `pulseDot` keyframes deleted. `prefers-reduced-motion` still honored.

## F. Build order

1. `index.css` de-slop (delete ambient layers, hero-name, pulse; add static glow)
2. `HeroSection.tsx` rewrite (shader out, band in, one motion)
3. `resume.ts`: add `heroLine`, `15+` → `15`
4. `App.tsx`: tabs → sections
5. `SectionTabs.tsx` → `SiteNav.tsx` (scroll-spy anchors)
6. `JobList.tsx` refine + absorb Earlier Career
7. `ProjectGrid.tsx` → `OpenSource.tsx` (featured/rest)
8. `SkillGrid.tsx` → `SkillSheet.tsx` (spec sheet)
9. `SiteFooter.tsx` compact
10. Delete `AboutSection.tsx` / `EarlierCareer.tsx` / `EducationList.tsx`; `pnpm rm @paper-design/shaders-react`
11. Screenshot every section at 1440px + 390px, read each, compare against this spec
