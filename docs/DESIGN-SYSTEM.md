# jbcom Design System

> **This is the definitive branding guide.** Any site rebuild MUST preserve these specifications.

## Brand Identity

**jbcom** is a collection of production-grade open source tools for builders. The visual identity communicates:

- **Professionalism** - Enterprise-ready, not experimental
- **Technical depth** - For developers who care about quality
- **Clarity** - Clean, focused, no distractions

---

## Logo & Brand Mark

### Primary Logo

```
┌──────────┐
│   jb     │  ← Gradient background: linear-gradient(135deg, #06b6d4, #3b82f6)
└──────────┘    Text: white (#ffffff), Space Grotesk 700
                Size: 36x36px (standard), 32x32px (mobile)
                Border radius: 8px
```

### Wordmark

- **Text**: "jbcom"
- **Font**: Space Grotesk, weight 700
- **Usage**: Paired with logo mark, never standalone

### Logo Usage

```html
<!-- HTML Implementation -->
<div class="logo-mark">jb</div>
<span class="wordmark">jbcom</span>
```

```css
.logo-mark {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 0.875rem;
  color: #fff;
}

.wordmark {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
}
```

---

## Color Palette

### CSS Custom Properties

```css
:root {
  /* ═══════════════════════════════════════════════════════════════════════
     BACKGROUNDS
     ═══════════════════════════════════════════════════════════════════════ */
  --bg-default: #0a0f1a;      /* Page background - deep navy */
  --bg-paper: #111827;        /* Cards, elevated surfaces */
  --bg-elevated: #1e293b;     /* Hover states, highlighted areas */
  
  /* ═══════════════════════════════════════════════════════════════════════
     PRIMARY - CYAN
     ═══════════════════════════════════════════════════════════════════════ */
  --primary: #06b6d4;         /* Primary actions, links, accents */
  --primary-light: #22d3ee;   /* Hover states */
  --primary-dark: #0891b2;    /* Active/pressed states */
  
  /* ═══════════════════════════════════════════════════════════════════════
     SECONDARY - BLUE
     ═══════════════════════════════════════════════════════════════════════ */
  --secondary: #3b82f6;       /* Secondary actions */
  --secondary-light: #60a5fa; /* Hover states */
  --secondary-dark: #2563eb;  /* Active states */
  
  /* ═══════════════════════════════════════════════════════════════════════
     TEXT
     ═══════════════════════════════════════════════════════════════════════ */
  --text-primary: #f1f5f9;    /* Headings, primary text - near white */
  --text-secondary: #94a3b8;  /* Body text, descriptions - gray */
  --text-disabled: #475569;   /* Disabled elements - dark gray */
  
  /* ═══════════════════════════════════════════════════════════════════════
     DIVIDERS & BORDERS
     ═══════════════════════════════════════════════════════════════════════ */
  --divider: #1e293b;
  --border: #1e293b;
  
  /* ═══════════════════════════════════════════════════════════════════════
     SEMANTIC COLORS
     ═══════════════════════════════════════════════════════════════════════ */
  --success: #10b981;         /* Success states - green */
  --warning: #f59e0b;         /* Warnings - amber */
  --error: #ef4444;           /* Errors - red */
  --info: #06b6d4;            /* Info - cyan (same as primary) */
  
  /* ═══════════════════════════════════════════════════════════════════════
     CATEGORY COLORS (for ecosystem)
     ═══════════════════════════════════════════════════════════════════════ */
  --cat-ai: #8b5cf6;          /* AI & Agents - purple */
  --cat-games: #06b6d4;       /* Game Development - cyan */
  --cat-infra: #10b981;       /* Infrastructure - green */
  --cat-libs: #f59e0b;        /* Libraries - amber */
  
  /* ═══════════════════════════════════════════════════════════════════════
     LANGUAGE COLORS (for ecosystem)
     ═══════════════════════════════════════════════════════════════════════ */
  --lang-typescript: #3178c6;
  --lang-python: #3776ab;
  --lang-go: #00add8;
  --lang-terraform: #7b42bc;
}
```

### Color Table Reference

#### Background Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-default` | `#0a0f1a` | Page background |
| `--bg-paper` | `#111827` | Cards, elevated surfaces |
| `--bg-elevated` | `#1e293b` | Hover states, highlighted areas |

#### Primary Accent (Cyan)
| Token | Hex | Usage |
|-------|-----|-------|
| `--primary` | `#06b6d4` | Primary actions, links |
| `--primary-light` | `#22d3ee` | Hover states |
| `--primary-dark` | `#0891b2` | Active/pressed states |

#### Secondary (Blue)
| Token | Hex | Usage |
|-------|-----|-------|
| `--secondary` | `#3b82f6` | Secondary actions |
| `--secondary-light` | `#60a5fa` | Hover states |
| `--secondary-dark` | `#2563eb` | Active states |

#### Text Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#f1f5f9` | Headings, primary text |
| `--text-secondary` | `#94a3b8` | Body text, descriptions |
| `--text-disabled` | `#475569` | Disabled elements |

#### Semantic Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--success` | `#10b981` | Success states |
| `--warning` | `#f59e0b` | Warnings |
| `--error` | `#ef4444` | Errors |
| `--info` | `#06b6d4` | Informational |

#### Category Colors
| Category | Token | Hex | Meaning |
|----------|-------|-----|---------|
| AI & Agents | `--cat-ai` | `#8b5cf6` | Purple - intelligence |
| Games | `--cat-games` | `#06b6d4` | Cyan - creativity |
| Infrastructure | `--cat-infra` | `#10b981` | Green - stability |
| Libraries | `--cat-libs` | `#f59e0b` | Amber - utility |

#### Language Colors
| Language | Token | Hex |
|----------|-------|-----|
| TypeScript | `--lang-typescript` | `#3178c6` |
| Python | `--lang-python` | `#3776ab` |
| Go | `--lang-go` | `#00add8` |
| Terraform | `--lang-terraform` | `#7b42bc` |

---

## Typography

### Font Stack

```css
:root {
  --font-heading: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
```

### Loading Fonts

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Font Family | Size | Weight | Line Height | Letter Spacing |
|---------|-------------|------|--------|-------------|----------------|
| H1 | Space Grotesk | 2.5rem (40px) | 700 | 1.2 | -0.02em |
| H2 | Space Grotesk | 2rem (32px) | 700 | 1.2 | -0.01em |
| H3 | Space Grotesk | 1.5rem (24px) | 600 | 1.3 | 0 |
| H4 | Space Grotesk | 1.25rem (20px) | 600 | 1.3 | 0 |
| H5 | Space Grotesk | 1.125rem (18px) | 600 | 1.4 | 0 |
| H6 | Space Grotesk | 1rem (16px) | 600 | 1.4 | 0 |
| Body 1 | Inter | 1rem (16px) | 400 | 1.6 | 0 |
| Body 2 | Inter | 0.875rem (14px) | 400 | 1.6 | 0 |
| Caption | Inter | 0.75rem (12px) | 400 | 1.4 | 0 |
| Overline | Inter | 0.75rem (12px) | 600 | 1.4 | 0.1em |
| Code | JetBrains Mono | 0.875rem (14px) | 400 | 1.5 | 0 |
| Button | Inter | 0.875rem (14px) | 600 | 1.4 | 0 |

### Typography CSS

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  color: var(--text-primary);
  margin: 0 0 0.5em;
}

h1 { font-size: 2.5rem; font-weight: 700; letter-spacing: -0.02em; }
h2 { font-size: 2rem; font-weight: 700; letter-spacing: -0.01em; }
h3 { font-size: 1.5rem; font-weight: 600; }
h4 { font-size: 1.25rem; font-weight: 600; }
h5 { font-size: 1.125rem; font-weight: 600; }
h6 { font-size: 1rem; font-weight: 600; }

body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

code, pre {
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.overline {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--primary);
}
```

---

## Spacing

8px base grid system:

| Token | Size | Usage |
|-------|------|-------|
| `--space-xs` | 4px | Tight spacing, icon gaps |
| `--space-sm` | 8px | Small gaps, compact lists |
| `--space-md` | 16px | Default spacing |
| `--space-lg` | 24px | Section spacing |
| `--space-xl` | 32px | Large sections |
| `--space-2xl` | 48px | Page sections |
| `--space-3xl` | 64px | Hero spacing |

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
}
```

---

## Border Radius

| Token | Size | Usage |
|-------|------|-------|
| `--radius-sm` | 4px | Small elements, chips |
| `--radius-md` | 8px | Buttons, inputs, logo |
| `--radius-lg` | 12px | Cards |
| `--radius-full` | 9999px | Pills, avatars |

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

---

## Components

### Cards

```css
.card {
  background: var(--bg-paper);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}
```

### Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background: var(--primary-light);
}

.btn-outlined {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.btn-outlined:hover {
  background: rgba(6, 182, 212, 0.1);
}
```

### Chips/Tags

```css
.chip {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
}

.chip-outlined {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
}

.chip-filled {
  background: rgba(6, 182, 212, 0.15);
  color: var(--primary);
}
```

### Navigation

```css
.nav-sidebar {
  width: 240px;
  background: var(--bg-paper);
  border-right: 1px solid var(--border);
  padding: var(--space-md);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}

.nav-item.active {
  background: rgba(6, 182, 212, 0.1);
  color: var(--primary);
}

.nav-item.active .nav-icon {
  color: var(--primary);
}
```

---

## Responsive Breakpoints

| Name | Width | Layout |
|------|-------|--------|
| xs | 0-599px | Single column, hamburger nav |
| sm | 600-899px | Single column, hamburger nav |
| md | 900-1199px | Sidebar (240px) + content |
| lg | 1200-1535px | Sidebar + wide content |
| xl | 1536px+ | Sidebar + max-width content (1200px) |

```css
/* Mobile first */
@media (min-width: 600px) { /* sm */ }
@media (min-width: 900px) { /* md - sidebar appears */ }
@media (min-width: 1200px) { /* lg */ }
@media (min-width: 1536px) { /* xl */ }
```

### Mobile Navigation

On mobile (< 900px):
- Hamburger menu in top app bar
- Slide-out drawer from left
- Close button in drawer header
- Clicking nav item closes drawer

---

## Accessibility

### Contrast Ratios

All text/background combinations meet WCAG AA (4.5:1):

| Foreground | Background | Ratio |
|------------|------------|-------|
| `#f1f5f9` | `#0a0f1a` | 15.2:1 ✓ |
| `#94a3b8` | `#0a0f1a` | 7.1:1 ✓ |
| `#06b6d4` | `#0a0f1a` | 8.4:1 ✓ |
| `#f1f5f9` | `#111827` | 13.8:1 ✓ |

### Focus States

```css
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

### Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Minimum Sizes

- Touch targets: 44x44px minimum
- Body text: 14px minimum (16px preferred)
- Line height: 1.5 minimum for body text

---

## Scrollbar Styling

```css
/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-paper);
}

::-webkit-scrollbar-thumb {
  background: var(--text-disabled);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--text-disabled) var(--bg-paper);
}
```

---

## Full CSS Template

A complete `style.css` implementing this design system:

```css
/* ═══════════════════════════════════════════════════════════════════════════
   jbcom Design System - CSS Implementation
   ═══════════════════════════════════════════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap');

:root {
  /* Colors */
  --bg-default: #0a0f1a;
  --bg-paper: #111827;
  --bg-elevated: #1e293b;
  --primary: #06b6d4;
  --primary-light: #22d3ee;
  --primary-dark: #0891b2;
  --secondary: #3b82f6;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-disabled: #475569;
  --border: #1e293b;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  
  /* Typography */
  --font-heading: 'Space Grotesk', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: var(--font-body);
  background: var(--bg-default);
  color: var(--text-secondary);
  line-height: 1.6;
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  color: var(--text-primary);
  line-height: 1.2;
}

a {
  color: var(--primary);
  text-decoration: none;
}

a:hover {
  color: var(--primary-light);
}

code, pre {
  font-family: var(--font-mono);
}
```

---

## Implementation Checklist

When building the static site, verify:

- [ ] All CSS custom properties defined
- [ ] Fonts loading correctly (Space Grotesk, Inter, JetBrains Mono)
- [ ] Background color is `#0a0f1a`
- [ ] Cards have `#111827` background with `#1e293b` border
- [ ] Primary accent is cyan `#06b6d4`
- [ ] Logo gradient renders correctly
- [ ] Typography scale matches specification
- [ ] Mobile navigation works as specified
- [ ] Focus states visible for accessibility
- [ ] Contrast ratios meet WCAG AA
- [ ] Reduced motion respected
