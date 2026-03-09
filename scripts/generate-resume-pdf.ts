/**
 * Generate Jon_Bogaty_Resume.pdf from resume.json
 *
 * Uses Playwright to render the shared HTML template and print to PDF.
 *
 * Requires: npx playwright install chromium
 * Usage: npx tsx scripts/generate-resume-pdf.ts
 * Output: public/Jon_Bogaty_Resume.pdf
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

import { resumeHtml } from './resume-html.ts'

const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.setContent(resumeHtml, { waitUntil: 'load', timeout: 15000 })

  const pdfBuffer = await page.pdf({
    format: 'Letter',
    margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
    printBackground: true,
  })

  const outPath = resolve(import.meta.dirname!, '../public/Jon_Bogaty_Resume.pdf')
  writeFileSync(outPath, pdfBuffer)
  console.log(`PDF generated: ${outPath} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`)
} finally {
  await browser.close()
}
