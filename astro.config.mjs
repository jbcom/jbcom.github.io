// @ts-check
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://jbcom.github.io',
  
  integrations: [
    // React for interactive components (Three.js, MUI)
    react(),
    // MDX for rich content
    mdx(),
    // Sitemap for SEO
    sitemap(),
  ],

  // Output static HTML
  output: 'static',

  build: {
    // Clean URLs (no .html extension)
    format: 'directory',
  },

  vite: {
    ssr: {
      // These packages need to be externalized for SSR
      noExternal: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'three'],
    },
  },
})
