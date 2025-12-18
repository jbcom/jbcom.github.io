# jbcom.github.io

> Jon Bogaty's professional portfolio and jbcom organization control center

## 🎯 Purpose

This repository serves **dual purposes**:

### 1. Professional Portfolio Site
- **Resume** - Professional background and experience
- **Ecosystem Directory** - All jbcom packages with links to repos
- **Static Site** - Fast, accessible, zero JavaScript required

### 2. Organization Control Center
- **Settings Sync** - [Probot Settings App](https://probot.github.io/apps/settings/) propagates `.github/settings.yml` to all org repos
- **AI Agent Instructions** - Centralized guidance for Claude, Copilot, Cursor, and other AI agents
- **Standardized Labels** - Consistent labeling across all repositories
- **Branch Protection** - Org-wide rulesets for main and PR branches

> 📖 **See [docs/ORGANIZATION-HUB.md](docs/ORGANIZATION-HUB.md) for full documentation on organization settings and propagation.**

## 🏗️ Architecture: Static-First

This is a **pure static site** built for GitHub Pages. No React, no build tools, just HTML/CSS.

```
/
├── content/              # Content as source (markdown/YAML)
│   ├── resume.md        # Resume source
│   ├── about.md         # About page content
│   ├── vision.md        # Ecosystem vision
│   └── ecosystem.yml    # 20+ packages with metadata
├── templates/           # Pandoc templates for resume generation
│   └── resume-pdf.html  # PDF generation template
├── assets/
│   └── css/
│       └── style.css    # Complete design system implementation
├── *.html               # Static HTML pages
└── .github/workflows/
    └── deploy.yml       # Build & deploy (generates PDF/DOCX)
```

### Build Process

1. **Content** - All content stored as markdown or YAML
2. **Generation** - GitHub Actions generates PDF/DOCX from markdown via pandoc
3. **Deployment** - Static HTML/CSS deployed to GitHub Pages

**No JavaScript required** for core functionality. Fast page loads (<1s).

## 🎨 Design System

### Colors
- **Background**: Deep slate (#020617)
- **Surface**: Slate panels with glassmorphism (#0f172a)
- **Primary**: Cyan/Teal (#0ea5e9)
- **Secondary**: Deep blue (#3170aa)
- **Accent**: Purple (#7c3aed)

### Typography
- **Headings**: Space Grotesk - bold, technical, modern
- **Body**: Inter - clean, readable, professional
- **Code**: JetBrains Mono - monospace, developer-friendly

### Components
- Glassmorphic cards with backdrop blur
- Gradient accents on hover states
- Responsive grid layouts
- Mobile bottom navigation

## 📱 Responsive Design

| Breakpoint | Layout |
|------------|--------|
| xs (0-599px) | Bottom nav, single column |
| sm (600-899px) | Collapsible drawer, 2 columns |
| md (900-1199px) | Persistent sidebar, 2-3 columns |
| lg (1200px+) | Full sidebar, 3+ columns |

## 🚀 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## 📁 Structure

```
src/
├── components/
│   ├── Layout.tsx           # Main layout with responsive sidebar
│   └── StrataBackground.tsx # The 3D layered background
├── data/
│   └── ecosystem.ts         # Package catalog
├── pages/
│   ├── HomePage.tsx         # Landing with hero
│   ├── AboutPage.tsx        # Bio and skills
│   ├── EcosystemPage.tsx    # Package directory
│   ├── ProjectPage.tsx      # Individual package
│   └── DemosPage.tsx        # Interactive strata demos
├── theme.ts                 # Material UI theme
├── main.tsx                 # Entry point
└── App.tsx                  # Router and layer composition
```

## 🐕 Dogfooding

This site demonstrates what strata can do:
- The animated background uses strata components
- The demos page showcases interactive scenes
- All 3D is powered by React Three Fiber

The best way to show what a library can do is to use it.

## 📦 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Material UI 5** - Component library
- **React Router 6** - Navigation
- **React Three Fiber** - 3D rendering
- **React Three Drei** - R3F helpers

## 📄 License

MIT © Jon Bogaty
