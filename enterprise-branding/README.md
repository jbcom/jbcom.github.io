# Enterprise Branding Assets

This directory contains the shared branding assets for all jbcom enterprise documentation sites.

## 🚀 Usage in Starlight (Astro)

To apply the enterprise branding to a division documentation site (e.g., Agentic, Strata), follow these steps:

### 1. Link the Base CSS
Import the `starlight-base.css` in your project's `src/styles/custom.css`:

```css
@import 'https://raw.githubusercontent.com/jbcom/jbcom.github.io/main/enterprise-branding/starlight-base.css';
```

### 2. Apply Org Override
Import your organization's specific override AFTER the base CSS:

```css
/* For Agentic Division */
@import 'https://raw.githubusercontent.com/jbcom/jbcom.github.io/main/enterprise-branding/org-themes/agentic.css';
```

### 3. Add Enterprise Navigation
In your `astro.config.mjs`, add the following to the `starlight` integration:

```javascript
starlight({
  // ...
  sidebar: [
    // ... your sidebar items
  ],
  social: {
    github: 'https://github.com/jbcom',
  },
  // Add Enterprise Links via custom components or manual links
})
```

## 🎨 Theme Colors

| Division | Primary Color | CSS Override |
|----------|---------------|--------------|
| **jbcom** | `#06b6d4` | (Default) |
| **Agentic** | `#8b5cf6` | `org-themes/agentic.css` |
| **Strata** | `#06b6d4` | `org-themes/strata.css` |
| **Extended Data** | `#f59e0b` | `org-themes/extended-data.css` |
