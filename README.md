# jbcom.github.io

> Jon Bogaty's professional portfolio and jbcom ecosystem showcase

## 🎯 Purpose

This site serves as:
1. **Professional Portfolio** - Resume, skills, experience
2. **Ecosystem Directory** - All jbcom packages with docs links
3. **Living Demo** - The site IS the strata demo

## 🏗️ Architecture: Layers All The Way Down

The entire site embodies strata's core philosophy: **layered composition**.

```
┌─────────────────────────────────────────────────────────────┐
│  FOREGROUND LAYER - Material UI Components                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Navigation, Cards, Text, Buttons                       │ │
│  │  React Router, MUI Theme                                │ │
│  └────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  MIDGROUND LAYER - Atmospheric Effects                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Volumetric clouds, particles, floating geometry        │ │
│  │  React Three Drei helpers                               │ │
│  └────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  BACKGROUND LAYER - Procedural Sky & Stars                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Gradient shader, star field, ambient animation         │ │
│  │  React Three Fiber canvas                               │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

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
