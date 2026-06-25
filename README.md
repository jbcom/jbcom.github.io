# jonbogaty.com

Static portfolio for Jon Bogaty.

This repo is intentionally no-build:

- No Node.js package manager
- No Astro, React, TypeScript, or generated resume pipeline
- No tool is allowed to rewrite `public/Jon_Bogaty_Resume.docx`
- GitHub Pages deploys the committed static files

## Files

```text
index.html                  Portfolio site
styles.css                  Hand-authored CSS
script.js                   Progressive enhancement only
404.html                    Static fallback page
public/Jon_Bogaty_Resume.docx  Canonical resume artifact
```

The DOCX in `public/` is the resume. Update it manually by replacing that file;
do not generate it from site data.

## Local Preview

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Deployment

GitHub Pages publishes the committed static files through `.github/workflows/cd.yml`.
There is no build step.
