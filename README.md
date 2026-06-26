# jonbogaty.com

Static portfolio for Jon Bogaty.

This repo is intentionally no-build:

- No Node.js package manager
- No Astro, React, TypeScript, or generated resume pipeline
- No tool is allowed to rewrite `public/Jon_Bogaty_Resume.docx`
- No runtime CDN dependencies
- GitHub Pages deploys `public/` directly
- Readable site source lives in `source/`; minified deploy files are committed
  under `public/`

## Files

```text
source/index.html                    Readable source HTML
source/assets/styles.css             Readable source CSS
source/assets/script.js              Readable source JavaScript
.pre-commit-config.yaml              Pinned minifier hook for committed deploy files
public/index.html                    Portfolio site
public/404.html                      Static fallback page
public/Jon_Bogaty_Resume.docx        Canonical resume artifact
public/assets/styles.min.css         Minified site CSS
public/assets/script.min.js          Minified progressive enhancement
public/assets/fonts/                 Local IBM Plex font files
public/assets/vendor/alpinejs-3.15.12.min.js  Vendored Alpine.js v3.15.12
public/assets/vendor/lenis.min.js    Vendored Lenis v1.0.42
public/assets/vendor/modern-normalize.min.css  Vendored modern-normalize v3.0.1
```

The DOCX in `public/` is the resume. Update it manually by replacing that file;
do not generate it from site data.

Third-party runtime code is pinned, minified, and checked in under
`public/assets/vendor/`. Do not load browser dependencies from external CDNs.

## Local Minification

Edit `source/` files, then regenerate committed deploy assets:

```bash
pre-commit run minify-site --all-files
```

The hook uses pre-commit's managed Node environment with pinned
`clean-css-cli`, `terser`, and `html-minifier-terser` versions. It does not
create `package.json`, `node_modules`, or a deployment build step. If the hook
updates `public/`, stage the regenerated files before committing.

## Local Preview

```bash
python3 -m http.server 4173 --directory public
```

Open `http://localhost:4173`.

## Deployment

GitHub Pages publishes `public/` through `.github/workflows/cd.yml`. There is
no build step.
