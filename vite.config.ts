import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // GitHub Pages deployment
  base: '/',

  build: {
    outDir: 'dist',
    sourcemap: true,

    // Optimize for production
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        ecosystem: resolve(__dirname, 'ecosystem.html'),
        resume: resolve(__dirname, 'resume.html'),
      },
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
          ],
        },
      },
    },

    // Target modern browsers
    target: 'esnext',

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },

  // Dev server
  server: {
    port: 3000,
    open: true,
  },

  // Preview server (for testing builds)
  preview: {
    port: 4000,
  },

  // Optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@mui/material'],
  },
})
