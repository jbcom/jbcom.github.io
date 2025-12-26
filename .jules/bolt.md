## 2025-12-18 - Static HTML Shadowing React App
**Learning:** The project root contains static HTML files (`index.html`, `ecosystem.html`) which shadow the React application routes during development and likely production. The Vite development server serves these static files instead of the SPA entry point, effectively disabling the React app for these routes.
**Action:** When working on React features, check for conflicting static HTML files in the root. For verification, temporarily rename these files and create a proper Vite entry point.
