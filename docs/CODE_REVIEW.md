# Code review summary

## Overview
A review of the current jbcom portfolio and ecosystem documentation site built with React, Vite, and Material UI. The app highlights multiple jbcom packages, provides filtering and detail views, and includes WebGL demos powered by React Three Fiber.

## Strengths
- **Cohesive visual system** – The custom MUI theme defines consistent color tokens, typography families, rounded shapes, and component overrides that align with the design-system brief, giving the site a unified visual language out of the box.【F:src/theme.ts†L1-L195】
- **Structured ecosystem data** – Package metadata is modeled with clear TypeScript types and a single source of truth array that feeds list and detail experiences, keeping the catalog maintainable and testable.【F:src/data/ecosystem.ts†L1-L200】
- **Engaging demos** – The demos page showcases multiple 3D scenarios (geometry distortion, particles, floating objects) with tabbed preview/code and navigation between demos, illustrating the capabilities of the strata stack.【F:src/pages/DemosPage.tsx†L1-L200】

## Issues & recommendations
1. **Duplicated app providers and routers** – `BrowserRouter`, `ThemeProvider`, and `CssBaseline` are rendered in both `src/main.tsx` and `src/App.tsx`, creating nested routers and duplicate theme/reset contexts. This increases bundle work and can lead to unexpected routing behavior. Move the providers to a single entry point (typically `main.tsx`) and render `App` inside them once.【F:src/main.tsx†L1-L16】【F:src/App.tsx†L8-L35】
2. **Full-page reload in breadcrumbs** – The project detail breadcrumb uses the MUI `Link` with an `href`, which triggers a hard navigation and resets SPA state. Use `react-router-dom`'s `Link`/`RouterLink` (e.g., `component={RouterLink}` with `to="/ecosystem"`) to keep client-side navigation and preserve history state.【F:src/pages/ProjectPage.tsx†L36-L50】
3. **Missing accessible labels on icon buttons** – Several icon-only buttons (drawer close, hamburger menu, GitHub link) lack `aria-label`, making navigation harder for screen readers. Add descriptive labels such as `aria-label="Open navigation"`, `aria-label="Close navigation"`, and `aria-label="jbcom GitHub"` to the `IconButton` components.【F:src/components/Layout.tsx†L109-L167】
4. **Blank state while loading demos** – Inside the demo viewer, the `<Suspense>` around the canvas renders `null` while assets load, so users may see an empty area even though the outer page shows a spinner only during initial page-level load. Consider showing a lightweight fallback within the canvas (e.g., a small loading overlay) so demo swaps provide immediate feedback.【F:src/pages/DemosPage.tsx†L168-L200】

## Next steps
Address the items above to stabilize routing, improve accessibility, and polish perceived performance. After fixes, run the site in a screen reader and on throttled networks to validate the improvements.
