# jbcom.github.io - Portfolio & Ecosystem Hub

## 🎯 Site Purpose

This is **Jon Bogaty's personal portfolio site** hosted on GitHub Pages. It serves as:

1. **Introduction to the developer** - Professional background, vision, contact
2. **Ecosystem overview** - Links (not embeds) to jbcom open source packages
3. **Resume** - Stored as markdown, generated to PDF/DOCX at build time
4. **Vision statement** - The philosophy behind the jbcom agent-fueled ecosystem

### What This Site Is NOT

- ❌ A React single-page application
- ❌ A place to embed or recreate demos (repos have their own demo sites)
- ❌ A documentation site for individual packages (each repo has its own docs)
- ❌ A place to commit static PDF/DOCX files

## 🏗️ Architecture Principles

### Static-First

This is a **static site** for GitHub Pages. Use:
- Jekyll (GitHub Pages native) OR
- Astro/Hugo with static HTML output
- Minimal or zero JavaScript
- Markdown for all content

### Content as Source

All content should be in editable, versionable formats:

```
content/
├── resume.md          # Resume in markdown
├── about.md           # About/bio content  
├── vision.md          # Ecosystem vision statement
└── ecosystem.yml      # Package metadata (name, repo URL, one-liner)
```

### Generated Artifacts

PDFs and DOCXs are **build artifacts**, not source files:

```bash
# Build process generates:
# resume.md → public/Jon_Bogaty_Resume_2025.pdf
# resume.md → public/Jon_Bogaty_Resume_2025.docx
```

Use tools like:
- `pandoc` for markdown → DOCX/PDF
- `weasyprint` for HTML → PDF
- GitHub Actions for automated generation

### Links, Not Embeds

Individual packages have their own GitHub Pages sites with:
- Full documentation
- Live demos
- API references

This portfolio site should **link to them**, not recreate their content:

```yaml
# ecosystem.yml
packages:
  - name: agentic-control
    repo: https://github.com/jbcom/agentic-control
    site: https://jbcom.github.io/agentic-control
    description: AI agent orchestration framework
    
  - name: strata
    repo: https://github.com/jbcom/nodejs-strata  
    site: https://jbcom.github.io/nodejs-strata
    demo: https://jbcom.github.io/nodejs-strata/demo
    description: Procedural 3D graphics for React Three Fiber
```

## 📁 Target File Structure

```
/
├── .github/
│   ├── workflows/
│   │   └── build.yml        # Build static site + generate resume artifacts
│   └── copilot-instructions.md
├── content/
│   ├── resume.md            # Resume source (markdown)
│   ├── about.md             # About page content
│   ├── vision.md            # Ecosystem vision
│   └── ecosystem.yml        # Package list with links
├── templates/
│   ├── resume-pdf.html      # Template for PDF generation
│   └── resume-docx.md       # Template for DOCX generation
├── _layouts/                 # Jekyll layouts (if using Jekyll)
├── _includes/                # Jekyll partials
├── assets/
│   ├── css/
│   │   └── style.css        # Site styles (can use a CSS framework)
│   └── images/
├── index.html               # Home page
├── about.html               # About page
├── resume.html              # Resume page (with download links)
├── ecosystem.html           # Links to all packages
├── _config.yml              # Jekyll config (if using Jekyll)
└── README.md
```

## 🔧 Development Commands

### If Using Jekyll (GitHub Pages Native)

```bash
# Install dependencies
bundle install

# Local development
bundle exec jekyll serve

# Build
bundle exec jekyll build
```

### If Using Astro/Hugo

```bash
# Install
pnpm install  # or npm install

# Development
pnpm dev

# Build static output
pnpm build

# Preview build
pnpm preview
```

### Resume Generation

```bash
# Generate PDF from markdown
pandoc content/resume.md -o public/Jon_Bogaty_Resume_2025.pdf \
  --pdf-engine=weasyprint \
  --template=templates/resume-pdf.html

# Generate DOCX from markdown  
pandoc content/resume.md -o public/Jon_Bogaty_Resume_2025.docx \
  --reference-doc=templates/reference.docx
```

## 📝 Content Guidelines

### Resume (content/resume.md)

```markdown
---
name: Jon Bogaty
title: Head of Information Technology and Security
location: Lincoln, Nebraska
email: jon@jonbogaty.com
github: jbcom
linkedin: jonbogaty
---

## Professional Summary

Senior IT, Security, and Platform leader with 15+ years...

## Experience

### Head of Information Technology and Security
**Flipside Crypto** | June 2021 – Present

- Lead globally distributed IT and security strategy...

## Skills

- **Cloud Platforms**: AWS, Google Cloud, Azure
- **Infrastructure**: Terraform, Kubernetes, Docker...

## Education

### Associate of Applied Science (AAS)
**Ivy Tech Community College** | Computer Information Technology
- Honors Graduate, Dean's List
```

### Ecosystem Data (content/ecosystem.yml)

```yaml
categories:
  - id: ai
    name: AI & Agents
    description: Agent orchestration and AI tooling
    
  - id: graphics  
    name: 3D Graphics
    description: Procedural graphics and visualization

packages:
  - id: agentic-control
    name: agentic-control
    category: ai
    language: python
    description: AI agent orchestration framework
    repo: https://github.com/jbcom/agentic-control
    docs: https://jbcom.github.io/agentic-control
    
  - id: strata
    name: strata
    category: graphics
    language: typescript
    description: Procedural 3D graphics for React Three Fiber
    repo: https://github.com/jbcom/nodejs-strata
    demo: https://jbcom.github.io/nodejs-strata/demo
```

## 🚀 Deployment

### GitHub Pages (Automatic)

For Jekyll sites, GitHub Pages builds automatically on push to `main`.

For other static generators, use GitHub Actions:

```yaml
# .github/workflows/build.yml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node (if using Astro/etc)
        uses: actions/setup-node@v4
        with:
          node-version: 20
          
      - name: Install pandoc
        run: sudo apt-get install -y pandoc weasyprint
        
      - name: Build site
        run: pnpm build
        
      - name: Generate resume artifacts
        run: |
          pandoc content/resume.md -o dist/Jon_Bogaty_Resume_2025.pdf --pdf-engine=weasyprint
          pandoc content/resume.md -o dist/Jon_Bogaty_Resume_2025.docx
          
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🎨 Design Guidelines

### Keep It Simple

- Clean, professional design
- Fast loading (minimal/no JS)
- Mobile responsive
- Accessible (semantic HTML, proper contrast)

### Suggested CSS Frameworks

- **Pico CSS** - Classless, minimal
- **Simple.css** - Classless, elegant
- **Tailwind** - Utility-first (if you need more control)
- **Water.css** - Classless, dark mode support

### No Heavy Dependencies

Avoid:
- React, Vue, Angular (not needed for static content)
- Material UI, Chakra, etc. (overkill for this use case)
- Three.js, WebGL (demos live in their own repos)

## ✅ Quality Checklist

Before merging:

- [ ] All content is in markdown or YAML (not hardcoded HTML)
- [ ] Resume generates correctly to PDF and DOCX
- [ ] Site builds to static HTML
- [ ] No JavaScript required for core functionality
- [ ] Links to package repos/sites work
- [ ] Mobile responsive
- [ ] Fast loading (<1s for static pages)
- [ ] No committed build artifacts (PDF/DOCX generated in CI)

## 🔗 Related Resources

- **jbcom GitHub**: https://github.com/jbcom
- **Package repos**: Each has its own documentation site
- **Design inspiration**: https://minimal.gallery, https://brutalistwebsites.com
