import { defineConfig } from 'astro/config'
import pdf from 'astro-pdf'

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
})
