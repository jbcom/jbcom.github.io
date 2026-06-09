# Design Review: Why the Site Reads as "AI-Generated"

**Review ID:** ai-look-diagnosis_20260609
**Target:** Entire site (Astro + React islands, shadcn/ui, Tailwind v4)
**Focus:** Comprehensive, with emphasis on diagnosing the "looks like an AI-generated website" feedback
**Evidence:** Live screenshots (desktop 1440px + mobile 390px, all tabs) in this directory; full source read; two independent reviewer passes (visual + copy)

## Summary

The feedback is accurate, and the cause is identifiable. The site stacks **nearly every signature element of the 2024–25 v0/Lovable/Claude-artifact template aesthetic simultaneously**, and the copy carries the strongest LLM writing tells ("battle-tested", "production-ready", "Track record of...", pipe-stacked headline). No single element is fatal — it's the *co-occurrence* of ~10 recognizable patterns that pattern-matches instantly for anyone who has seen AI-generated sites. The good news: the underlying design system (Instrument Serif + amber-on-black + JetBrains Mono) is genuinely distinctive and should be kept; the tells are mostly surface decoration and copy, all cheap to fix.

**Issues found:** 14 — Critical: 4 · Major: 6 · Minor: 4

---

## The Diagnosis: Co-occurring AI Tells, Ranked by Contribution

### Critical (these four carry ~70% of the impression)

#### 1. Animated gradient text on the hero name
**Location:** `src/index.css:157-164` (`.hero-name`)
**Category:** Visual

Amber→white→steel animated `background-clip: text` gradient, shimmering on an 8s loop, applied to your own name. This is the single most recognizable AI-portfolio tell — it's in the majority of v0/Lovable outputs. Human designers almost never animate gradient text, and never on the person's name.

**Fix:** Static `var(--foreground)` (or static amber). Instrument Serif at 7xl is already the visual interest. ~10 min.

#### 2. The full background-effect stack: mesh-gradient shader + dot grid (×2) + gradient orbs
**Location:** `HeroSection.tsx:24-66` (ShaderBg via `@paper-design/shaders-react` MeshGradient), `HeroSection.tsx:73-79` (hero dot grid), `index.css:105-114` (`body::before` page-wide dot grid), `index.css:117-127` (`body::after` corner orbs)
**Category:** Visual

Four ambient background treatments running at once. The dot grid is v0's default template background; corner gradient orbs are the default dark-mode treatment in multiple AI starters; mesh-gradient shaders are the Paper-design/v0 signature. Stacked together this is "maximum AI vibes."

**Fix:** Pick **one** treatment and delete the rest. The MeshGradient shader is the most distinctive of the four — if kept, delete both dot grids and `body::after`. Or delete everything and let the rich black breathe. ~15 min.

#### 3. The glassmorphism hero stat-card row
**Location:** `HeroSection.tsx:121-142`
**Category:** Visual

Four equal `rounded-lg border bg-card/40 backdrop-blur-sm` boxes — big number + mono-uppercase label ("15+ YEARS / $100K+/mo CLOUD SAVED / 5 PYPI PACKAGES / 5 OSS FRAMEWORKS"). This is the canonical AI "credibility metrics" module, and the `+` suffixes read as stat inflation. "5 PyPI packages" and "5 OSS frameworks" given equal billing with 15 years of career also reads as padding to fill the grid.

**Fix:** Kill the cards. Either weave the stats into the tagline prose, or render as a borderless horizontal typographic band (number in serif, label in mono, thin rules between). Drop the `+` where the number is already real. ~45 min.

#### 4. The copy — strongest tells of all
**Location:** `src/content/resume.ts`
**Category:** Content

Technical readers smell LLM copy faster than LLM layout:
- **Headline:** `"Staff DevOps & Platform Engineer | Multi-Cloud Infrastructure Architect | Python/Go Open-Source Builder"` — pipe-stacked LinkedIn-SEO keyword format, rendered in tracked-out uppercase mono so it dominates the hero.
- **Tagline:** `"Founding-DevOps operator who ships OSS frameworks."` — noun-phrase mashup nobody says aloud.
- **Summary:** `"Track record of..."` (top-flagged AI resume phrase), semicolon-chained parallel triads (`"builder of...; architect of...;"`), `"before industry-wide adoption"`, `"comprehensive internal automation platform"`.
- **Project descriptions:** `"Battle-tested Python monorepo..."`, `"Production-ready framework..."`, `"Complete game framework..."` — the three marquee LLM adjectives, one per card, in a row.
- **Highlights:** `"Spearheaded SRE initiatives..."`, `"pioneering IaC before industry-wide adoption"`, `"cutting onboarding time significantly"` (weasel adverb in place of a number).
- **Skills:** `"Agentic AI Orchestration"`, `"Prompt Engineering"`, `"LLM-Driven Workflows"` as badge text.
- Pervasive `·` middot chains and uniform triadic sentence rhythm ("X, Y, and Z" in nearly every sentence).

**Fix:** Rewrite in plain declarative voice using only facts already in resume.ts. One title, not three. Lead the summary with the concrete Flipside arc (sole DevOps engineer, the Python CLI, the cost reduction) instead of adjective stacks. Delete "battle-tested"/"production-ready"/"complete" outright — the feature lists after them already do the work. ⚠️ The reviewer-suggested rewrites in the appendix below contain *illustrative* numbers — verify every fact against resume.ts before adopting any of them; do not introduce new metrics.

### Major

#### 5. Pulsing status pill ("Available · Independent OSS")
**Location:** `HeroSection.tsx:88-97`, `index.css:167-173`
The rounded-full bordered pill with animated green pulse dot, centered above the name, is the most-copied single element from Framer/AI templates. Keep the information, lose the packaging: a quiet mono line without border or pulse. 

#### 6. Badge chip-cloud Skills tab
**Location:** `SkillGrid.tsx` (all of it)
~80 identical secondary-variant pill badges in flex-wrap clusters inside uniform cards. The "chip cloud" is the most-cloned AI portfolio section; every skill gets identical visual weight, which communicates that no human prioritized them. Fix: comma-separated prose lists for secondary categories; reserve badges (or any emphasis) for a deliberately curated short list.

#### 7. Staggered fade-up entrance on every hero element
**Location:** `HeroSection.tsx` (delays 0 / 0.3 / 0.5 / 0.6 / 0.7)
The uniform sequential y-offset reveal is the default Motion demo choreography AI tools emit. One considered entrance (the name) beats five mechanical ones.

#### 8. Hash-rotated accent bar on every project card
**Location:** `ProjectGrid.tsx:7-19, 32`
A 2px top color bar in one of 5 rotating brand colors assigned by string hash — color as arbitrary decoration rather than meaning. Either make color mean something (category) or drop it; a left border (as SkillGrid headline cards already use) reads as classification rather than template.

#### 9. Tab-based information architecture with near-empty tabs
**Location:** `App.tsx`
Six tabs, each wrapped in the identical `max-w-6xl py-10` + `font-heading text-2xl` h2 shell. "Education" is a 21-line component; "Earlier Career" 20 lines. Uniform scaffolding around thin content is a structural AI tell (generated IA fills slots). It also hides your best material — the projects — behind a click. Most strong personal sites are an opinionated single scroll with varied section treatments. At minimum: collapse Education + Earlier Career into Work, and let section layouts differ from each other.

#### 10. Everything is a shadcn Card with lucide icons
**Location:** ProjectGrid, SkillGrid, JobList, footer
Default-radius bordered cards + lucide icons at default sizes + `Badge variant="secondary"` everywhere is the unmistakable stock shadcn skin. The components are fine; the zero-customization defaults are the tell. The Work tab's sidebar/detail layout is the one section that escapes this — it reads designed. Use it as the quality bar.

### Minor

11. **`·` middot separator chains** in footer/status/about ("DevOps · SRE · Platform Engineering · AI") — LLM-formatting signature; use sentences or real layout.
12. **"All rights reserved" + version stamp footer** (`SiteFooter.tsx`) — boilerplate that adds genericness; the build-version stamp is a nice human touch though, keep that.
13. **Bottom gradient fade strip** on the hero (`HeroSection.tsx:205`) — template-y; unnecessary once the background stack is simplified.
14. **Footer "Connect/Resume" 3-column grid** — stock footer-template structure for what is four links and two buttons.

---

## What's Genuinely Good — Keep It

- **Instrument Serif at display size** — immediately differentiating; just don't animate it.
- **Amber #E8A849 on rich black #0B0D14** — a real palette decision, not a default.
- **JetBrains Mono micro-labels** — reads engineering-authentic.
- **Work tab sidebar/detail layout** — the most "designed by a human" section on the site.
- **Package sub-listings inside project cards** (`ralph (CLI)…`, `@jbcom/agentic-*`) — concrete, shipped-code detail an AI wouldn't fake. This is your best anti-AI signal; give it *more* room, not less.
- **`departureContext` italic notes, reduced-motion handling, a11y labels** — careful human touches.

The deeper point: **specificity is the antidote.** AI sites are generic because they decorate instead of show. Real terminal output from radioactive-ralph, a real architecture sketch, actual download counts pulled from PyPI, a screenshot of Strata's terrain — any one concrete artifact does more to read "human" than all the gradient removal combined.

---

## Prioritized Fix Plan

1. **Copy rewrite pass on resume.ts** (headline, tagline, summary, the three project-description adjectives, "Spearheaded"/"Track record" highlights). Highest impact, zero layout risk. Facts only from existing data.
2. **De-stack the backgrounds:** keep at most the shader; delete `body::before`, `body::after`, hero dot grid.
3. **Un-animate `.hero-name`**; reduce hero motion to a single entrance.
4. **Replace stat cards** with a typographic stat band (or fold into the tagline); drop `+` inflation; de-pill the status badge.
5. **De-chip the Skills tab** (prose lists for secondary categories) and swap project-card top bars for left borders or nothing.
6. **Structural pass (larger):** collapse 6 tabs → fewer, differentiated sections; consider single-scroll. Add one piece of real, concrete artifact per project (output, screenshot, live stat).

Items 1–5 are roughly an afternoon and remove the bulk of the impression. Item 6 is the difference between "not AI-looking" and "memorable."

---

## Appendix: Reviewer Copy Suggestions (UNVERIFIED — check facts before use)

Full agent transcripts produced rewrite candidates for every flagged string. Treat them as tone references, not drop-ins: several contain invented specifics (e.g. "~$150K to ~$45K", "first DevOps hire at two startups", "2015") that must be verified against real history or discarded.

| Flagged | Direction |
|---|---|
| `X \| Y \| Z` headline | One title: "Staff DevOps & Platform Engineer" + short clause |
| "Founding-DevOps operator who ships OSS frameworks" | Plain facts: years, role shape, what you build now |
| "Track record of modernizing..." | Say what happened at Flipside, concretely |
| "Battle-tested Python monorepo" | "Python monorepo with 5 independently-installable packages: ..." |
| "Production-ready framework for building intelligent agent fleets" | Name the actual capabilities, drop the adjectives |
| "Complete game framework" / "advanced water" | "React Three Fiber framework for procedural 3D worlds. Covers ..." |
| "Spearheaded SRE initiatives for a high-traffic..." | "Led SRE work at GoHealth: monitoring, alerting, reliability..." |
| "cutting onboarding time significantly" | Real outcome or cut the clause |
| "$100K+/mo" stat | "$100K/mo" if that's the real number — kill the `+` |

---

_Generated by design review, 2026-06-09. Screenshots: shot-desktop-hero.png, shot-desktop-projects.png, shot-desktop-work.png, shot-desktop-skills.png, shot-mobile-hero.png._
