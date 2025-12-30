# Enterprise Branding Assets

This directory contains the shared branding assets for all jbcom enterprise documentation sites.

## 🎯 Purpose

All organization documentation portals (Strata, Agentic, Extended Data, Arcade Cabinet) must inherit their styling from these enterprise assets to ensure:

1. **Consistent branding** across the jbcom ecosystem
2. **Jon Bogaty's role as owner** is never lost
3. **Common messaging and ethos** across all properties
4. **Unique voice per org** while maintaining cohesion

## 📁 Structure

```
enterprise-branding/
├── starlight-base.css          # Base theme (fonts, core colors, layout)
├── starlight-enterprise-links.json  # Shared navigation links
├── org-themes/
│   ├── agentic.css             # Purple - AI/Agents
│   ├── strata.css              # Teal - 3D Graphics  
│   ├── extended-data.css       # Amber - Data Libraries
│   └── arcade.css              # Pink - Games
└── templates/
    ├── custom.css.template     # Portal CSS template
    └── astro.config.template   # Portal config template
```

## 🚀 Setup for Org Portals

### 1. Custom CSS (REQUIRED)

Your portal's `src/styles/custom.css` MUST import enterprise styles:

```css
/* Layer 1: Enterprise Base */
@import url('https://raw.githubusercontent.com/jbcom/jbcom.github.io/main/enterprise-branding/starlight-base.css');

/* Layer 2: Org Theme */
@import url('https://raw.githubusercontent.com/jbcom/jbcom.github.io/main/enterprise-branding/org-themes/YOUR_ORG.css');

/* Layer 3: Org-specific customizations ONLY */
/* Do NOT duplicate enterprise styles */
```

### 2. Astro Config

Include enterprise sidebar links:

```javascript
const enterpriseSidebarLinks = {
  label: 'jbcom Enterprise',
  items: [
    { label: 'jbcom Hub', link: 'https://jbcom.github.io', attrs: { target: '_blank' } },
    { label: 'Agentic', link: 'https://agentic.dev', attrs: { target: '_blank' } },
    { label: 'Strata', link: 'https://strata.game', attrs: { target: '_blank' } },
    { label: 'Extended Data', link: 'https://extendeddata.dev', attrs: { target: '_blank' } },
  ],
};
```

### 3. Required Meta Tags

```javascript
head: [
  { tag: 'meta', attrs: { property: 'og:site_name', content: 'jbcom Enterprise' } },
  { tag: 'meta', attrs: { name: 'author', content: 'Jon Bogaty' } },
],
```

## 🎨 Org Theme Colors

| Org | Primary | Use Case |
|-----|---------|----------|
| jbcom | `#06b6d4` Cyan | Enterprise hub |
| Agentic | `#8b5cf6` Purple | AI/Agent tools |
| Strata | `#06b6d4` Teal | 3D graphics |
| Extended Data | `#f59e0b` Amber | Data libraries |
| Arcade | `#ec4899` Pink | Games |

## ⚠️ Rules

1. **DO** import enterprise base CSS first
2. **DO** import org theme CSS second  
3. **DO** add enterprise sidebar links
4. **DO** include author meta tag
5. **DON'T** duplicate enterprise styles
6. **DON'T** override core branding without approval
7. **DON'T** remove enterprise navigation links

