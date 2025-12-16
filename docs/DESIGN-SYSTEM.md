# jbcom Design System

## Brand Identity

**jbcom** is a collection of production-grade open source tools for builders. The visual identity should communicate:

- **Professionalism** - Enterprise-ready, not experimental
- **Technical depth** - For developers who care about quality
- **Clarity** - Clean, focused, no distractions

---

## Color Palette

### Deep Blues Theme

The palette is built on deep, rich blues that convey trust and technical sophistication.

#### Background Colors
| Name | Hex | Usage |
|------|-----|-------|
| `background.default` | `#0a0f1a` | Page background |
| `background.paper` | `#111827` | Cards, elevated surfaces |
| `background.elevated` | `#1e293b` | Hover states, highlighted areas |

#### Primary Accent (Cyan)
| Name | Hex | Usage |
|------|-----|-------|
| `primary.main` | `#06b6d4` | Primary actions, links |
| `primary.light` | `#22d3ee` | Hover states |
| `primary.dark` | `#0891b2` | Active/pressed states |

#### Secondary (Deep Blue)
| Name | Hex | Usage |
|------|-----|-------|
| `secondary.main` | `#3b82f6` | Secondary actions |
| `secondary.light` | `#60a5fa` | Hover states |
| `secondary.dark` | `#2563eb` | Active states |

#### Text Colors
| Name | Hex | Usage |
|------|-----|-------|
| `text.primary` | `#f1f5f9` | Headings, primary text |
| `text.secondary` | `#94a3b8` | Body text, descriptions |
| `text.disabled` | `#475569` | Disabled elements |

#### Semantic Colors
| Name | Hex | Usage |
|------|-----|-------|
| `success` | `#10b981` | Success states |
| `warning` | `#f59e0b` | Warnings |
| `error` | `#ef4444` | Errors |
| `info` | `#06b6d4` | Informational |

#### Category Colors
| Category | Hex | Meaning |
|----------|-----|---------|
| AI & Agents | `#8b5cf6` | Purple - intelligence |
| Games | `#06b6d4` | Cyan - creativity |
| Infrastructure | `#10b981` | Green - stability |
| Libraries | `#f59e0b` | Amber - utility |

---

## Typography

### Font Stack

```css
--font-heading: 'Space Grotesk', -apple-system, sans-serif;
--font-body: 'Inter', -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Element | Size | Weight | Font |
|---------|------|--------|------|
| H1 | 2.5rem / 40px | 700 | Space Grotesk |
| H2 | 2rem / 32px | 700 | Space Grotesk |
| H3 | 1.5rem / 24px | 600 | Space Grotesk |
| H4 | 1.25rem / 20px | 600 | Space Grotesk |
| Body 1 | 1rem / 16px | 400 | Inter |
| Body 2 | 0.875rem / 14px | 400 | Inter |
| Code | 0.875rem / 14px | 400 | JetBrains Mono |
| Caption | 0.75rem / 12px | 400 | Inter |

### Line Heights
- Headings: 1.2
- Body: 1.6
- Code: 1.5

---

## Spacing

8px base grid:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

---

## Components

### Cards
- Background: `background.paper`
- Border: 1px solid `divider` (#1e293b)
- Border radius: 12px
- Padding: 24px
- Hover: Subtle border color change to primary

### Buttons
- Primary: Filled with `primary.main`, white text
- Outlined: Border `primary.main`, transparent background
- Border radius: 8px
- Padding: 8px 20px

### Navigation
- Sidebar width: 240px (desktop)
- Active item: Left border accent + subtle background
- Mobile: Bottom sheet or hamburger menu

---

## Responsive Breakpoints

| Name | Width | Layout |
|------|-------|--------|
| xs | 0-599px | Single column, bottom nav |
| sm | 600-899px | Single column, hamburger |
| md | 900-1199px | Sidebar + content |
| lg | 1200-1535px | Sidebar + wide content |
| xl | 1536px+ | Sidebar + max-width content |

---

## Accessibility

- Minimum contrast ratio: 4.5:1 (WCAG AA)
- Focus indicators: Visible outline
- Motion: Respect `prefers-reduced-motion`
- Font sizes: Minimum 14px for body text

---

## Implementation Notes

### Material UI Theme

```typescript
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0f1a',
      paper: '#111827',
    },
    primary: {
      main: '#06b6d4',
    },
    secondary: {
      main: '#3b82f6',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif' },
    // ...
  },
});
```
