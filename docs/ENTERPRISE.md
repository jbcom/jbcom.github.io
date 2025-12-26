# Enterprise Documentation Strategy

This document outlines the strategy for a coherent, multi-organization documentation ecosystem within the jbcom enterprise.

## 🏢 Organizations & Visual Identity

All organizations in the enterprise derive their branding from the core **jbcom** design system but maintain unique visual identities through specific color accents.

| Organization | Division | Primary Color | Theme Basis |
|--------------|----------|---------------|-------------|
| **jbcom** | Progenitor / Core | `#06b6d4` (Cyan) | Original |
| **agentic-dev-library** | AI & Agents | `#8b5cf6` (Purple) | Intelligence |
| **strata-game-library** | Games & Procedural | `#06b6d4` (Cyan/Teal) | Creativity |
| **extended-data-library** | Infrastructure & Libs | `#f59e0b` (Amber) | Utility |

## 🎨 Branding Universe

### Shared Foundations
- **Headings**: `Space Grotesk` (Weight 600-700)
- **Body**: `Inter` (Weight 400-500)
- **Code**: `JetBrains Mono`
- **Theme**: Dark Mode by default (`#0a0f1a` background)

### CSS Variables Scaffolding
Each organization site should implement these overrides in their `custom.css`:

```css
:root {
  /* jbcom Core Constants */
  --font-heading: 'Space Grotesk';
  --font-body: 'Inter';

  /* Org-Specific Overrides */
  --primary-accent: [ORG_COLOR];
  --sl-color-accent: var(--primary-accent);
  --sl-color-text-accent: var(--primary-accent);
}
```

## 🔗 Interconnections

To create a "coherent documentation package", all sites must include:

1. **Enterprise Header**: A shared top navigation bar (or links) to sibling organizations.
2. **Cross-Linking**:
   - `jbcom` documentation acts as the "Registry" and "Hub".
   - Division sites (`agentic`, `strata`, `extended-data`) link back to `jbcom` for "Core Principles" and "Enterprise Standards".
3. **Unified Search**: (Future) Implement a cross-organization search using Algolia or a similar service.

## 📁 Documentation Package Structure

Each division repo should follow this documentation structure:

```
docs/
├── getting-started/     # Quick starts and installation
├── architecture/        # High-level design and diagrams
├── guides/              # Feature-specific deep dives
├── api/                 # Generated API reference
└── contributing.md      # Division-specific contribution rules
```

## 🛠️ Triaging Status

| Org | Doc Repo | Status | Action Needed |
|-----|----------|--------|---------------|
| jbcom | `jbcom.github.io` | ✅ Progenitor | Establish central hub links (Completed) |
| agentic | `agentic-dev-library.github.io` | 🟠 Astro/Starlight | Apply Purple theme overrides |
| strata | `strata-game-library.github.io` | 🟠 Astro/Starlight | Apply Teal theme overrides |
| extended | `extended-data-library.github.io` | 🟠 Astro/Starlight | Apply Amber theme overrides |

## 🚀 Execution Steps

1. **Main Hub Updates**:
   - [x] Add `division` and `docsUrl` metadata to ecosystem data.
   - [x] Add division labels to home page category cards.
   - [x] Add "Docs" links to package cards and project pages.
   - [x] Support deep linking via query parameters.

2. **Shared Assets**:
   - [x] Create `enterprise-branding/starlight-base.css`.
   - [x] Create division-specific theme overrides.
   - [x] Create interconnection metadata JSON.

3. **Division Site Triage**:
   - [x] Apply shared assets to `agentic-dev-library.github.io`.
   - [x] Apply shared assets to `strata-game-library.github.io`.
   - [x] Apply shared assets to `extended-data-library.github.io`.
