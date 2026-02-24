# Resume Redesign + Astro Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate portfolio site from Vite/React to pure Astro, create a single-source resume data pipeline that generates web, PDF, and DOCX outputs at build time, with content optimized for Principal/Staff SRE roles.

**Architecture:** Pure Astro (zero client-side JS). Resume data in `src/content/resume.json` (extended JSON Resume schema). `astro-pdf` generates PDF at build time via Puppeteer rendering a print-optimized page. `docx` npm package generates DOCX via a static Astro endpoint. Existing CSS design system (custom properties, dark theme) is preserved and adapted to Astro.

**Tech Stack:** Astro 5+, astro-pdf, docx (npm), CSS custom properties, Biome (lint/format)

**Design doc:** `docs/plans/2026-02-24-resume-redesign-design.md`

---

## Task 1: Initialize Astro project alongside existing code

**Files:**
- Create: `astro.config.mjs`
- Create: `src/env.d.ts`
- Modify: `package.json`
- Modify: `tsconfig.json`
- Delete: `vite.config.ts`
- Delete: `src/main.tsx`, `src/App.tsx`, `src/App.test.tsx`
- Delete: `src/theme.ts`, `src/theme.test.ts`
- Delete: `src/components/Layout.tsx`, `src/components/Layout.test.tsx`
- Delete: `src/hooks/useDebounce.ts`
- Delete: All `src/pages/*.tsx` files (replaced by .astro pages)

**Step 1: Install Astro and dependencies, remove React/MUI/Vite deps**

```bash
pnpm remove react react-dom react-router-dom @mui/material @mui/icons-material @emotion/react @emotion/styled @react-three/drei @react-three/fiber three @vitejs/plugin-react @types/react @types/react-dom @testing-library/react @testing-library/jest-dom @testing-library/user-event
pnpm add astro
pnpm add -D astro-pdf docx @types/node typescript
```

**Step 2: Create `astro.config.mjs`**

```javascript
import { defineConfig } from 'astro/config';
import pdf from 'astro-pdf';

export default defineConfig({
  site: 'https://jbcom.github.io',
  outDir: 'dist',
  integrations: [
    pdf({
      pages: {
        '/resume-print/': {
          path: 'Jon_Bogaty_Resume.pdf',
          screen: false,
          waitUntil: 'networkidle0',
          pdf: {
            format: 'Letter',
            printBackground: true,
            margin: {
              top: '0.4in',
              bottom: '0.4in',
              left: '0.5in',
              right: '0.5in',
            },
          },
        },
      },
    }),
  ],
  build: {
    format: 'directory',
  },
});
```

**Step 3: Create `src/env.d.ts`**

```typescript
/// <reference path="../.astro/types.d.ts" />
```

**Step 4: Update `tsconfig.json` for Astro**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

**Step 5: Update `package.json` scripts**

Replace the scripts section:
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "deploy": "pnpm build && gh-pages -d dist"
  }
}
```

**Step 6: Delete old Vite/React files**

Remove: `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/App.test.tsx`, `src/theme.ts`, `src/theme.test.ts`, `src/components/Layout.tsx`, `src/components/Layout.test.tsx`, `src/hooks/useDebounce.ts`, all `src/pages/*.tsx` files.

Also remove old static HTML files that will be replaced by Astro output: `index.html`, `about.html`, `ecosystem.html`, `resume.html`.

Keep: `src/data/ecosystem.ts` (will adapt), `content/ecosystem.yml`, `content/resume.md` (reference only), `assets/css/style.css`, `templates/` (reference), `public/` directory.

**Step 7: Verify Astro initializes**

Run: `pnpm dev`
Expected: Astro dev server starts (will show 404 since no pages exist yet — that's fine)

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: initialize Astro, remove Vite/React/MUI stack"
```

---

## Task 2: Create the resume.json data source

**Files:**
- Create: `src/content/resume.json`
- Create: `src/content.config.ts`

**Step 1: Create `src/content/resume.json`**

This is the single source of truth. It uses JSON Resume v1.0.0 schema extended with custom sections (`competencies`, `innovation`, `earlierCareer`). The content below is the final optimized version based on the approved design and the user's rough draft + FSC details.

```json
{
  "basics": {
    "name": "Jon Bogaty",
    "label": "DevOps & Platform Engineering Leader | AI Innovation Architect | Security & SRE Strategist",
    "email": "jon@jonbogaty.com",
    "url": "https://www.jonbogaty.com",
    "location": {
      "city": "Lincoln",
      "region": "NE",
      "countryCode": "US"
    },
    "profiles": [
      { "network": "LinkedIn", "username": "jonbogaty", "url": "https://linkedin.com/in/jonbogaty" },
      { "network": "GitHub", "username": "jbcom", "url": "https://github.com/jbcom" },
      { "network": "Telegram", "username": "jbpersonaldev", "url": "https://t.me/jbpersonaldev" }
    ],
    "summary": "Senior technology leader with 15+ years driving innovation across DevOps, Site Reliability Engineering (SRE), Security Operations (SecOps), and Cloud Platform Architecture. Early adopter and evangelist of transformative technologies — championed Docker containerization and Terraform Infrastructure as Code (IaC) before industry-wide adoption, and pioneered AI-driven operations by building and managing a fully autonomous AI engineering team two years before agentic AI frameworks were formalized. Proven record of architecting globally distributed systems, eliminating toil through automation, and leading security-first infrastructure strategies.",
    "yearsExperience": "15+"
  },
  "competencies": [
    "DevOps Strategy & Automation",
    "Site Reliability Engineering (SRE)",
    "Security Operations (SecOps)",
    "Cloud Architecture (AWS, GCP, Azure)",
    "Infrastructure as Code (IaC) — Terraform, Ansible",
    "Container Orchestration — Docker, Kubernetes",
    "CI/CD Pipeline Design",
    "AI/ML Operations & Agentic AI",
    "Platform Engineering",
    "Data Architecture & Pipelines",
    "IAM & Zero-Trust Security",
    "Compliance & Risk Management",
    "Incident Response & MTTR Optimization",
    "Team Leadership & Mentoring",
    "Open Source Development",
    "GitOps & ChatOps",
    "Cost Optimization & FinOps",
    "Observability & Monitoring"
  ],
  "work": [
    {
      "name": "Flipside Crypto",
      "position": "Head of Information Technology & Security",
      "startDate": "2021-06",
      "endDate": "2026-01",
      "summary": "Led all IT infrastructure, security, and data architecture for a leading blockchain analytics company. Managed globally distributed operations spanning DevOps, SecOps, SRE, and data engineering.",
      "highlights": [
        "Pioneered AI-driven IT operations 2+ years before agentic AI was formalized: built and directed a fully autonomous AI team executing data architecture, IT, and security tasks using custom prompt-scripted workflows — inventing agentic orchestration patterns and human-in-the-loop review cycles before CrewAI, AutoGen, or LangGraph existed",
        "Drove AWS cost reduction from ~$150K/month to ~$40-50K/month through migration to serverless architecture, right-sizing, and automated scaling policies — over $100K/month in sustained savings",
        "Oversaw 5-year infrastructure evolution: single-DC AWS with multi-cluster Kubernetes to Fly.io container deployments for product/frontend to 99% serverless AWS (Lambda, managed services) with RStudio/Posit Connect as the sole exception",
        "Architected deterministic secrets propagation system with automatic deep-merge and conflict resolution across HashiCorp Vault and AWS sources, serving hundreds of Lambda functions powering the data platform",
        "Managed Fireblocks co-signer architecture in AWS secure enclaves; led migration from Anjuna to Fireblocks-native solution on GCP with dedicated MDM-managed devices for all parties",
        "Built self-maintaining pipeline of Terraform/Terragrunt repository factories and comprehensive Python automation suite for all internal IT management processes",
        "Mentored DC infrastructure SRE through multi-datacenter Kubernetes deployment; co-managed physical DC colo and data platform SRE teams",
        "Directed enterprise security posture: managed Google Workspace directory, Cloudflare and Route53 DNS, designed compliance frameworks for yearly insurance audits, implemented third-party phishing/malware/spam vendor, and led incident response programs"
      ]
    },
    {
      "name": "GoHealth",
      "position": "Senior Site Reliability Engineer",
      "startDate": "2020-08",
      "endDate": "2021-06",
      "summary": null,
      "highlights": [
        "Spearheaded SRE initiatives for a high-traffic health insurance marketplace: improved system scalability, availability, and operational visibility across production environments",
        "Built production monitoring and alerting systems, reducing MTTR and improving uptime during peak open enrollment periods handling surge traffic"
      ]
    },
    {
      "name": "Symbiont",
      "position": "Senior Development Operations Engineer",
      "startDate": "2017-11",
      "endDate": "2020-08",
      "summary": null,
      "highlights": [
        "Owned enterprise CI/CD platform: built automation and infrastructure tooling in Python, Ansible, Terraform, and Packer across AWS, GCP, and Azure supporting blockchain product engineering",
        "Designed multi-cloud deployment architecture: enabled reproducible, version-controlled infrastructure across three cloud providers, reducing drift and accelerating onboarding"
      ]
    },
    {
      "name": "Jump Ramp",
      "position": "Senior Development Operations Engineer",
      "startDate": "2017-05",
      "endDate": "2017-11",
      "summary": null,
      "highlights": [
        "Modernized deployment: introduced Docker containerization, restructured CI/CD, and built ready-to-roll dev environments cutting onboarding time significantly",
        "Overhauled network security: implemented automated VPN bridging datacenter-to-office for multi-site wide-area LAN"
      ]
    },
    {
      "name": "Qualia Media",
      "position": "Senior Development Operations Engineer",
      "startDate": "2016-06",
      "endDate": "2017-05",
      "summary": null,
      "highlights": [
        "Automated cloud infrastructure with Terraform and custom Ruby tooling: built CI/CD systems and a metrics-based auto-scaler for Google Cloud workers using Pub/Sub"
      ]
    },
    {
      "name": "ClassPass",
      "position": "Senior Systems Operations Engineer",
      "startDate": "2015-04",
      "endDate": "2016-04",
      "summary": null,
      "highlights": [
        "Early Docker & Terraform champion: containerized services using Docker, Terraform, Packer, Atlas, and Vagrant — pioneering IaC before industry-wide adoption",
        "Managed 200-300 production AWS instances powering the ClassPass desktop and mobile experience for a major international fitness subscription platform",
        "Reduced cloud costs $20K/month by deploying Netflix OSS Janitor Monkey for automated resource lifecycle management"
      ]
    },
    {
      "name": "Magnetic",
      "position": "Senior DevOps Engineer",
      "startDate": "2014-03",
      "endDate": "2015-04",
      "summary": null,
      "highlights": [
        "Managed 300+ machine infrastructure for a multinational ad-tech firm: designed Chef 10 cookbook overhauls and integrated Rundeck with PAM for zero-downtime control"
      ]
    }
  ],
  "earlierCareer": {
    "summary": "Progressive DevOps and infrastructure roles spanning ad-tech, e-commerce, mobile platforms, publishing, and freelance consulting. Built expertise in Linux systems, cloud migration, configuration management (Chef, Puppet), CI/CD automation, and datacenter-to-cloud transitions.",
    "positions": [
      { "name": "Digital First Media", "position": "Sr. DevOps Engineer", "year": "2014" },
      { "name": "EachScape", "position": "DevOps Engineer", "year": "2013" },
      { "name": "Totsy", "position": "DevOps Engineer", "year": "2012-13" },
      { "name": "Social Cubix", "position": "Sr. Project Manager", "year": "2012" },
      { "name": "RentShare Inc", "position": "Developer", "year": "2011" },
      { "name": "jonbogaty.com", "position": "Freelance Systems Consultant", "year": "2005-13" }
    ]
  },
  "skills": [
    {
      "name": "Cloud Platforms",
      "keywords": ["AWS (EC2, ECS, EKS, Lambda, S3, IAM, CloudWatch, VPC)", "Google Cloud (GKE, Pub/Sub, BigQuery)", "Azure"]
    },
    {
      "name": "Infrastructure as Code",
      "keywords": ["Terraform", "Terragrunt", "Packer", "Ansible", "CloudFormation", "Vagrant"]
    },
    {
      "name": "Containers & Orchestration",
      "keywords": ["Docker", "Kubernetes", "ECS/EKS", "GKE", "Fly.io", "Docker Compose"]
    },
    {
      "name": "CI/CD & Automation",
      "keywords": ["GitHub Actions", "GitLab CI", "Jenkins", "CircleCI", "Rundeck", "ArgoCD", "GitOps", "ChatOps"]
    },
    {
      "name": "Security & Compliance",
      "keywords": ["Zero-Trust Architecture", "IAM/RBAC", "HashiCorp Vault", "Secrets Management", "VPN", "MDM", "Vulnerability Assessment", "Incident Response", "Fireblocks"]
    },
    {
      "name": "Observability",
      "keywords": ["Prometheus", "Grafana", "Datadog", "Nagios", "CloudWatch", "ELK Stack", "PagerDuty"]
    },
    {
      "name": "Programming",
      "keywords": ["Python", "TypeScript", "Go", "Ruby", "JavaScript", "Bash", "SQL"]
    },
    {
      "name": "AI & Automation",
      "keywords": ["Agentic AI Orchestration", "Prompt Engineering", "LLM-Driven Workflows", "ChatGPT/OpenAI", "Anthropic Claude", "CrewAI"]
    },
    {
      "name": "Data",
      "keywords": ["Pipeline Architecture", "ETL/ELT", "Snowflake", "BigQuery", "PostgreSQL", "MySQL", "Redis"]
    }
  ],
  "innovation": [
    {
      "year": "2015-2016",
      "title": "Early Docker & Terraform Adopter",
      "description": "Containerized production infrastructure at ClassPass and built IaC pipelines before mainstream adoption"
    },
    {
      "year": "2017-2020",
      "title": "Multi-Cloud IaC Pioneer",
      "description": "Designed cross-cloud Terraform architectures spanning AWS, GCP, and Azure at Symbiont"
    },
    {
      "year": "2023-2025",
      "title": "AI Operations Inventor",
      "description": "Built a fully AI-powered team at Flipside Crypto 2+ years before agentic AI frameworks existed"
    },
    {
      "year": "2025-Present",
      "title": "Open-Source AI Framework Author",
      "description": "Publishing Agentic-Control, Agentic-Crew, and Agentic-Interfaces to the OSS community"
    }
  ],
  "projects": [
    {
      "name": "Agentic-Control",
      "description": "AI agent fleet orchestration with token-aware GitHub integration and coordinated multi-agent execution",
      "url": "https://github.com/jbcom/agentic-control"
    },
    {
      "name": "Agentic-Crew",
      "description": "Generic CrewAI engine supporting agent discovery, runtime orchestration, and extensible patterns",
      "url": "https://github.com/jbcom/agentic-crew"
    },
    {
      "name": "Terraform Python Bridge",
      "description": "Python-to-Terraform bridge for programmatic infrastructure composition",
      "url": "https://github.com/jbcom/py-terraform-utils"
    },
    {
      "name": "SecretsSync",
      "description": "Deterministic secrets orchestration across multi-cloud CI/CD pipelines",
      "url": "https://github.com/jbcom/secrets-sync"
    },
    {
      "name": "Extended-Data-Types",
      "description": "Advanced structured data types and validation primitives for automation tooling",
      "url": "https://github.com/jbcom/extended-data-types"
    },
    {
      "name": "LifecycleLogging",
      "description": "Python logging framework for developer observability and structured diagnostics",
      "url": "https://github.com/jbcom/lifecycle-logging"
    }
  ],
  "education": [
    {
      "institution": "Ivy Tech Community College",
      "area": "Computer Information Technology",
      "studyType": "Associate of Applied Science (AAS)",
      "startDate": "2007",
      "endDate": "2009",
      "honors": ["Graduated with Honors", "Dean's List (All Semesters)"]
    }
  ]
}
```

**Step 2: Create `src/content.config.ts`**

```typescript
import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const resume = defineCollection({
  loader: file('src/content/resume.json'),
  schema: z.object({
    basics: z.object({
      name: z.string(),
      label: z.string(),
      email: z.string(),
      url: z.string(),
      location: z.object({
        city: z.string(),
        region: z.string(),
        countryCode: z.string(),
      }),
      profiles: z.array(z.object({
        network: z.string(),
        username: z.string(),
        url: z.string(),
      })),
      summary: z.string(),
      yearsExperience: z.string(),
    }),
    competencies: z.array(z.string()),
    work: z.array(z.object({
      name: z.string(),
      position: z.string(),
      startDate: z.string(),
      endDate: z.string().optional(),
      summary: z.string().nullable(),
      highlights: z.array(z.string()),
    })),
    earlierCareer: z.object({
      summary: z.string(),
      positions: z.array(z.object({
        name: z.string(),
        position: z.string(),
        year: z.string(),
      })),
    }),
    skills: z.array(z.object({
      name: z.string(),
      keywords: z.array(z.string()),
    })),
    innovation: z.array(z.object({
      year: z.string(),
      title: z.string(),
      description: z.string(),
    })),
    projects: z.array(z.object({
      name: z.string(),
      description: z.string(),
      url: z.string().optional(),
    })),
    education: z.array(z.object({
      institution: z.string(),
      area: z.string(),
      studyType: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      honors: z.array(z.string()).optional(),
    })),
  }),
});

export const collections = { resume };
```

Note: Astro's `file()` loader for single-object JSON requires the data to either be an array or have an `id` field. If it errors, we may need to import `resume.json` directly instead of using content collections. See fallback in Step 3.

**Step 3: Test that the schema validates**

Run: `pnpm dev`
Expected: No schema validation errors in terminal output

If content collections don't work for a single-object JSON (they expect arrays), fall back to direct import in pages:
```typescript
// In any .astro file:
import resume from '../content/resume.json';
```
And delete `src/content.config.ts`.

**Step 4: Commit**

```bash
git add src/content/resume.json src/content.config.ts
git commit -m "feat: add resume.json single source of truth with Zod schema"
```

---

## Task 3: Create Astro layouts and global styles

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/layouts/PrintLayout.astro`
- Move/adapt: `assets/css/style.css` -> `src/styles/global.css`
- Create: `src/styles/print.css`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`

**Step 1: Create `src/styles/global.css`**

Adapt the existing `assets/css/style.css` — keep all CSS custom properties (colors, fonts, spacing), remove React/MUI-specific overrides, ensure it works standalone. This file already exists and is well-structured; copy it to `src/styles/global.css` and add the Google Fonts import at top if not present.

**Step 2: Create `src/styles/print.css`**

```css
@media print {
  body {
    background: white;
    color: #1e293b;
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 10pt;
    line-height: 1.4;
    margin: 0;
    padding: 0;
  }

  nav, footer, .download-bar, .web-only, .no-print {
    display: none !important;
  }

  a {
    color: #1e293b;
    text-decoration: none;
  }

  h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22pt;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 4px;
  }

  h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13pt;
    font-weight: 700;
    color: #0f172a;
    border-bottom: 2px solid #06b6d4;
    padding-bottom: 2px;
    margin-top: 14px;
    margin-bottom: 6px;
  }

  h3 {
    font-size: 11pt;
    font-weight: 600;
    margin-top: 8px;
    margin-bottom: 2px;
  }

  .section { margin-bottom: 10px; }
  .job-period { color: #64748b; font-size: 9pt; font-style: italic; }
  .company-name { color: #06b6d4; font-weight: 600; }

  ul { margin: 3px 0 6px 16px; padding: 0; }
  li { margin-bottom: 2px; font-size: 9.5pt; line-height: 1.35; }

  .competencies-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 12px;
    font-size: 9pt;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    font-size: 9pt;
  }

  .skills-category { font-weight: 600; color: #0f172a; }

  @page {
    size: letter;
    margin: 0.4in 0.5in;
  }

  .page-break { page-break-before: always; }
}
```

**Step 3: Create `src/components/Nav.astro`**

```astro
---
const currentPath = Astro.url.pathname;
const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about/' },
  { label: 'Resume', path: '/resume/' },
  { label: 'Ecosystem', path: '/ecosystem/' },
];
---

<header class="site-header">
  <div class="header-content">
    <a href="/" class="logo">
      <div class="logo-mark">jb</div>
      <span class="wordmark">jbcom</span>
    </a>
    <nav>
      {navItems.map(item => (
        <a
          href={item.path}
          class:list={['nav-link', { active: currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path)) }]}
        >
          {item.label}
        </a>
      ))}
      <a href="https://github.com/jbcom" class="nav-link" target="_blank" rel="noopener noreferrer">GitHub</a>
    </nav>
  </div>
</header>
```

**Step 4: Create `src/components/Footer.astro`**

```astro
---
const year = new Date().getFullYear();
---

<footer>
  <div class="footer-content">
    <div class="footer-links" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
      <a href="https://github.com/jbcom" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://linkedin.com/in/jonbogaty" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="https://t.me/jbpersonaldev" target="_blank" rel="noopener noreferrer">Telegram</a>
      <a href="mailto:jon@jonbogaty.com">Email</a>
    </div>
    <p style="color: var(--text-disabled); font-size: 0.875rem;">
      &copy; {year} Jon Bogaty. Open source under MIT license.
    </p>
  </div>
</footer>
```

**Step 5: Create `src/layouts/BaseLayout.astro`**

```astro
---
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = "Jon Bogaty's professional portfolio and jbcom ecosystem showcase" } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content={description}>
  <title>{title} | jbcom</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to content</a>
  <Nav />
  <main id="main-content" tabindex="-1" class="container section" style="outline: none;">
    <slot />
  </main>
  <Footer />
</body>
</html>
```

**Step 6: Create `src/layouts/PrintLayout.astro`**

```astro
---
import '../styles/print.css';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
  <style>
    /* Print layout base styles — inlined for PDF generation reliability */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 10pt;
      line-height: 1.4;
      color: #1e293b;
      max-width: 100%;
    }
    h1 { font-family: 'Space Grotesk', sans-serif; font-size: 22pt; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
    h2 { font-family: 'Space Grotesk', sans-serif; font-size: 13pt; font-weight: 700; color: #0f172a; border-bottom: 2px solid #06b6d4; padding-bottom: 2px; margin-top: 14px; margin-bottom: 6px; }
    h3 { font-size: 11pt; font-weight: 600; margin-top: 8px; margin-bottom: 2px; }
    p { margin-bottom: 4px; }
    ul { margin: 3px 0 6px 16px; padding: 0; }
    li { margin-bottom: 2px; font-size: 9.5pt; line-height: 1.35; }
    a { color: #06b6d4; text-decoration: none; }
    .contact { font-size: 9pt; color: #64748b; text-align: center; margin-bottom: 10px; }
    .section { margin-bottom: 10px; }
    .job-header { display: flex; justify-content: space-between; align-items: baseline; }
    .company-name { color: #06b6d4; font-weight: 600; }
    .job-period { color: #64748b; font-size: 9pt; font-style: italic; }
    .job-summary { font-size: 9.5pt; color: #475569; font-style: italic; margin-bottom: 3px; }
    .competencies-grid { display: flex; flex-wrap: wrap; gap: 2px 10px; font-size: 9pt; color: #334155; }
    .competencies-grid span::before { content: "\\2022\\00a0"; color: #06b6d4; }
    .skills-row { margin-bottom: 3px; font-size: 9pt; }
    .skills-category { font-weight: 600; color: #0f172a; }
    .innovation-item { margin-bottom: 4px; font-size: 9pt; }
    .innovation-year { font-weight: 600; color: #06b6d4; }
    .earlier-positions { font-size: 9pt; color: #475569; }
    .project-item { margin-bottom: 3px; }
    .project-name { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 9.5pt; }
    .project-desc { font-size: 9pt; color: #475569; }
    .education-honors { font-size: 9pt; color: #475569; }
    .header-center { text-align: center; margin-bottom: 8px; }
    .subtitle { font-size: 11pt; color: #475569; margin-bottom: 4px; }
    @page { size: letter; margin: 0.4in 0.5in; }
  </style>
</head>
<body>
  <slot />
</body>
</html>
```

**Step 7: Verify layouts compile**

Run: `pnpm dev`
Expected: No errors (pages still empty)

**Step 8: Commit**

```bash
git add src/layouts/ src/styles/ src/components/Nav.astro src/components/Footer.astro
git commit -m "feat: add Astro layouts, global CSS, print styles, nav and footer"
```

---

## Task 4: Build resume Astro components

**Files:**
- Create: `src/components/resume/Header.astro`
- Create: `src/components/resume/Summary.astro`
- Create: `src/components/resume/Competencies.astro`
- Create: `src/components/resume/Experience.astro`
- Create: `src/components/resume/Innovation.astro`
- Create: `src/components/resume/Projects.astro`
- Create: `src/components/resume/Skills.astro`
- Create: `src/components/resume/Education.astro`
- Create: `src/components/resume/EarlierCareer.astro`
- Create: `src/components/resume/DownloadBar.astro`

Each component receives typed props from `resume.json`. Keep components simple and semantic — pure HTML + CSS classes. No client-side JS.

All components should use semantic HTML elements (`section`, `h2`, `h3`, `ul`, `li`) for ATS compatibility. Class names should work for both web and print views.

**Implementation note:** Each component is small (~20-50 lines). The components are "dumb" presentational components that receive data via Astro props. The page files (`resume.astro` and `resume-print.astro`) import `resume.json` and pass slices to each component.

**Helper for date formatting:**

Create `src/lib/dates.ts`:
```typescript
export function formatDateRange(startDate: string, endDate?: string): string {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} – ${end}`;
}

function formatDate(dateStr: string): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const parts = dateStr.split('-');
  if (parts.length === 1) return parts[0]; // just year
  const month = months[parseInt(parts[1], 10) - 1];
  return `${month} ${parts[0]}`;
}
```

Build all 10 components, then commit:

```bash
git add src/components/resume/ src/lib/dates.ts
git commit -m "feat: add resume Astro components"
```

---

## Task 5: Build the resume web page and print page

**Files:**
- Create: `src/pages/resume.astro`
- Create: `src/pages/resume-print.astro`

**Step 1: Create `src/pages/resume.astro`**

This is the web-facing resume page using `BaseLayout`. It imports `resume.json` and passes data to each component. Styled with the site's dark theme design system.

Key structure:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/resume/Header.astro';
import Summary from '../components/resume/Summary.astro';
import Competencies from '../components/resume/Competencies.astro';
import Experience from '../components/resume/Experience.astro';
import EarlierCareer from '../components/resume/EarlierCareer.astro';
import Innovation from '../components/resume/Innovation.astro';
import Projects from '../components/resume/Projects.astro';
import Skills from '../components/resume/Skills.astro';
import Education from '../components/resume/Education.astro';
import DownloadBar from '../components/resume/DownloadBar.astro';
import resume from '../content/resume.json';
---

<BaseLayout title="Resume" description="Jon Bogaty — DevOps & Platform Engineering Leader | Principal SRE | Resume">
  <DownloadBar />
  <Header basics={resume.basics} />
  <Summary summary={resume.basics.summary} />
  <Competencies competencies={resume.competencies} />
  <Experience work={resume.work} />
  <EarlierCareer earlierCareer={resume.earlierCareer} />
  <Innovation items={resume.innovation} />
  <Projects projects={resume.projects} />
  <Skills skills={resume.skills} />
  <Education education={resume.education} />
</BaseLayout>
```

**Step 2: Create `src/pages/resume-print.astro`**

Same data, `PrintLayout`, optimized for PDF rendering. No nav, no footer, no download buttons. Tighter spacing. White background with black text.

```astro
---
import PrintLayout from '../layouts/PrintLayout.astro';
import resume from '../content/resume.json';
import { formatDateRange } from '../lib/dates';
---

<PrintLayout title="Jon Bogaty - Resume">
  <!-- All resume content rendered inline for PDF, using print.css classes -->
  <div class="header-center">
    <h1>{resume.basics.name}</h1>
    <div class="subtitle">{resume.basics.label}</div>
    <div class="contact">
      {resume.basics.location.city}, {resume.basics.location.region} | {resume.basics.email} |
      {resume.basics.profiles.map(p => <a href={p.url}>{p.network.toLowerCase()}.com/in/{p.username}</a>).reduce((acc, el, i) => i === 0 ? [el] : [...acc, ' | ', el], [])}
    </div>
  </div>

  <!-- Professional Summary -->
  <div class="section">
    <h2>Professional Summary</h2>
    <p>{resume.basics.summary}</p>
  </div>

  <!-- Core Competencies -->
  <div class="section">
    <h2>Core Competencies</h2>
    <div class="competencies-grid">
      {resume.competencies.map(c => <span>{c}</span>)}
    </div>
  </div>

  <!-- Professional Experience -->
  <div class="section">
    <h2>Professional Experience</h2>
    {resume.work.map(job => (
      <div style="margin-bottom: 8px;">
        <div class="job-header">
          <h3><span class="company-name">{job.name}</span> — {job.position}</h3>
          <span class="job-period">{formatDateRange(job.startDate, job.endDate)}</span>
        </div>
        {job.summary && <p class="job-summary">{job.summary}</p>}
        <ul>
          {job.highlights.map(h => <li>{h}</li>)}
        </ul>
      </div>
    ))}
  </div>

  <!-- Earlier Career -->
  <div class="section">
    <h2>Earlier Career</h2>
    <p class="earlier-positions">
      {resume.earlierCareer.positions.map(p => `${p.name} ${p.position} (${p.year})`).join(' | ')}
    </p>
    <p style="font-size: 9pt; color: #475569;">{resume.earlierCareer.summary}</p>
  </div>

  <!-- Innovation & Technology Leadership -->
  <div class="section">
    <h2>Innovation & Technology Leadership</h2>
    {resume.innovation.map(item => (
      <div class="innovation-item">
        <span class="innovation-year">{item.year}:</span> <strong>{item.title}</strong> — {item.description}
      </div>
    ))}
  </div>

  <!-- Open Source & AI Projects -->
  <div class="section">
    <h2>Open Source & AI Projects</h2>
    <p style="font-size: 9pt; margin-bottom: 4px;">Author of 20+ open-source packages. Selected highlights:</p>
    {resume.projects.map(p => (
      <div class="project-item">
        <span class="project-name">{p.name}:</span> <span class="project-desc">{p.description}</span>
      </div>
    ))}
    <p style="font-size: 9pt; margin-top: 4px;">Full portfolio: <a href="https://github.com/jbcom">github.com/jbcom</a></p>
  </div>

  <!-- Technical Skills -->
  <div class="section">
    <h2>Technical Skills</h2>
    {resume.skills.map(cat => (
      <div class="skills-row">
        <span class="skills-category">{cat.name}:</span> {cat.keywords.join(', ')}
      </div>
    ))}
  </div>

  <!-- Education -->
  <div class="section">
    <h2>Education</h2>
    {resume.education.map(edu => (
      <div>
        <h3>{edu.studyType}, {edu.area} — {edu.institution} | {edu.startDate}-{edu.endDate}</h3>
        {edu.honors && <p class="education-honors">{edu.honors.join(' | ')}</p>}
      </div>
    ))}
  </div>
</PrintLayout>
```

**Step 3: Run dev server and verify both pages render**

Run: `pnpm dev`
Visit: `http://localhost:4321/resume/` — should show styled web resume
Visit: `http://localhost:4321/resume-print/` — should show clean print layout

**Step 4: Commit**

```bash
git add src/pages/resume.astro src/pages/resume-print.astro
git commit -m "feat: add resume web page and print-optimized page"
```

---

## Task 6: Build remaining site pages (Home, About, Ecosystem)

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/ecosystem.astro`

These pages are simplified from the React originals. No Material UI — use the existing CSS design system classes from `style.css`. The ecosystem page becomes a catalog that links out to external project sites.

Pages that are being **dropped**: `DemosPage` (demos live at strata.game), `DependencyFlowPage` (can be added back later if needed), `ProjectPage` (individual project detail — projects link to their own repos/sites).

Port the content and structure from the existing `.tsx` files, converting MUI components to semantic HTML + CSS classes. The ecosystem data comes from `content/ecosystem.yml` (or the existing `src/data/ecosystem.ts` adapted as a plain data file).

**Step 1: Create all three pages**

Each page uses `BaseLayout` and plain HTML/CSS.

**Step 2: Verify all pages render**

Run: `pnpm dev`
Visit all routes: `/`, `/about/`, `/resume/`, `/ecosystem/`

**Step 3: Commit**

```bash
git add src/pages/index.astro src/pages/about.astro src/pages/ecosystem.astro
git commit -m "feat: add home, about, and ecosystem pages"
```

---

## Task 7: Build DOCX generation endpoint

**Files:**
- Create: `src/lib/docx-builder.ts`
- Create: `src/pages/Jon_Bogaty_Resume.docx.ts`

**Step 1: Create `src/lib/docx-builder.ts`**

Build the DOCX using the `docx` npm package. Deliberately plain formatting — Calibri font, no colors except minimal use for section headings, standard bullet lists, single-column. This file reads `resume.json` and produces a `Document` object.

Key structure:
```typescript
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, TabStopPosition, TabStopType } from 'docx';
import resume from '../content/resume.json';
import { formatDateRange } from './dates';

export async function buildResumeDocx(): Promise<Buffer> {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: 'Calibri', size: 22 }, // 11pt
        },
      },
    },
    sections: [{
      children: [
        // Header
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: resume.basics.name, bold: true, size: 36, font: 'Calibri' })],
        }),
        // ... build all sections from resume data
      ],
    }],
  });

  return await Packer.toBuffer(doc);
}
```

Build all resume sections: header, summary, competencies, experience, earlier career, innovation, projects, skills, education.

**Step 2: Create `src/pages/Jon_Bogaty_Resume.docx.ts`**

```typescript
import type { APIRoute } from 'astro';
import { buildResumeDocx } from '../lib/docx-builder';

export const GET: APIRoute = async () => {
  const buffer = await buildResumeDocx();
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename="Jon_Bogaty_Resume.docx"',
    },
  });
};
```

**Step 3: Test the endpoint**

Run: `pnpm dev`
Visit: `http://localhost:4321/Jon_Bogaty_Resume.docx` — should download a .docx file
Open in Word/LibreOffice and verify formatting

**Step 4: Commit**

```bash
git add src/lib/docx-builder.ts src/pages/Jon_Bogaty_Resume.docx.ts
git commit -m "feat: add build-time DOCX generation from resume.json"
```

---

## Task 8: Configure astro-pdf and test full build

**Files:**
- Modify: `astro.config.mjs` (already has PDF config from Task 1)

**Step 1: Run a full production build**

```bash
pnpm build
```

Expected output:
- `dist/index.html`
- `dist/about/index.html`
- `dist/resume/index.html`
- `dist/resume-print/index.html`
- `dist/ecosystem/index.html`
- `dist/Jon_Bogaty_Resume.pdf` (generated by astro-pdf)
- `dist/Jon_Bogaty_Resume.docx` (generated by endpoint)

**Step 2: Verify the PDF**

Open `dist/Jon_Bogaty_Resume.pdf` — should be a clean, professional, print-formatted resume. Check:
- All sections present
- Fonts rendering correctly
- Fits on 2 pages (adjust print.css spacing if needed)
- Text is selectable (not images)

**Step 3: Verify the DOCX**

Open `dist/Jon_Bogaty_Resume.docx` — should be ATS-friendly plain formatting:
- Calibri font throughout
- Standard heading hierarchy
- Bullet points for highlights
- No images, no colors beyond black/dark gray

**Step 4: Preview the built site**

```bash
pnpm preview
```

Visit all pages, test download links point to generated files.

**Step 5: Adjust PDF layout if needed**

If the resume overflows 2 pages or has layout issues, adjust:
- `astro.config.mjs` margin values
- `PrintLayout.astro` font sizes and spacing
- `print.css` line-height and margins

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: verify full build pipeline — PDF and DOCX generation working"
```

---

## Task 9: Clean up old files and update deployment

**Files:**
- Delete: `content/resume.md` (replaced by resume.json)
- Delete: `templates/resume-pdf.html` (replaced by resume-print.astro)
- Delete: `public/Jon_Bogaty_Resume_2025.pdf` (replaced by generated file)
- Delete: `public/Jon_Bogaty_Resume_2025.docx` (replaced by generated file)
- Delete: `src/data/ecosystem.ts` (if fully replaced by ecosystem.yml imports)
- Delete: `src/test/` directory (tests need rewriting for Astro — separate task)
- Update: `.github/workflows/` if CI exists
- Update: `package.json` homepage and deploy script

**Step 1: Remove obsolete files**

```bash
rm content/resume.md templates/resume-pdf.html
rm public/Jon_Bogaty_Resume_2025.pdf public/Jon_Bogaty_Resume_2025.docx
```

**Step 2: Update deploy script if needed**

The existing `"deploy": "pnpm build && gh-pages -d dist"` should still work since Astro outputs to `dist/`.

**Step 3: Verify clean build**

```bash
rm -rf dist && pnpm build
```

**Step 4: Run preview and smoke test all pages + downloads**

```bash
pnpm preview
```

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove old Vite/React files, clean up obsolete resume sources"
```

---

## Task 10: Final verification and deployment

**Step 1: Full clean build**

```bash
rm -rf dist node_modules .astro && pnpm install && pnpm build
```

**Step 2: Verify all outputs exist**

```bash
ls -la dist/Jon_Bogaty_Resume.*
ls dist/resume/index.html
ls dist/resume-print/index.html
```

**Step 3: Preview and manually verify**

```bash
pnpm preview
```

Check:
- [ ] Home page loads and links work
- [ ] About page content is correct
- [ ] Resume page shows full resume with design system styling
- [ ] Download PDF link works and file opens correctly
- [ ] Download DOCX link works and file opens correctly
- [ ] PDF is 1-2 pages, text is selectable, fonts look right
- [ ] DOCX opens in Word, formatting is clean and ATS-friendly
- [ ] Ecosystem page shows catalog with external links
- [ ] All navigation works
- [ ] No console errors
- [ ] No client-side JavaScript loaded (check Network tab)

**Step 4: Commit any final adjustments**

```bash
git add -A
git commit -m "feat: complete Astro migration with resume generation pipeline"
```

**Step 5: Deploy (when ready)**

```bash
pnpm deploy
```

---

## Notes for the implementing engineer

1. **Content collections vs direct import:** Astro's `file()` loader expects array data or objects with `id` fields. Since `resume.json` is a single object, you may need to skip content collections and use a direct `import resume from '../content/resume.json'` instead. Try content collections first; fall back if it errors.

2. **astro-pdf quirks:** The integration launches Puppeteer after build. In CI (GitHub Actions), you may need to install Chromium dependencies. Add to your workflow: `npx puppeteer browsers install chrome`. If astro-pdf fails locally, ensure you have Chromium installed.

3. **PDF page count:** The resume is dense. If it exceeds 2 pages, reduce `font-size` in `PrintLayout.astro`, tighten `margin-bottom` on sections, or reduce the number of FSC highlights from 8 to 6.

4. **DOCX font embedding:** The `docx` package doesn't embed fonts — it references them by name. Calibri is available on most systems and in most ATS parsers. Don't use exotic fonts in the DOCX.

5. **Ecosystem data:** The existing `src/data/ecosystem.ts` is a rich TypeScript file with types and helper functions. For the Astro migration, you can either: (a) keep it as a `.ts` data file and import it directly, or (b) convert to YAML/JSON and use content collections. Option (a) is simpler for the initial migration.

6. **Static HTML files:** Delete the old `index.html`, `about.html`, `ecosystem.html`, `resume.html` from the project root — Astro generates these in `dist/`.

7. **GitHub Pages SPA routing:** The current Vite/React site uses client-side routing. Astro generates real HTML files for each route, so GitHub Pages will serve them natively without SPA fallback hacks. This is strictly better.
