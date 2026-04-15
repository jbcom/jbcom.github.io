/**
 * Generate resume PDF from pre-built dist/resume/index.html.
 * Used by CI after pnpm build. Output: dist/Jon_Bogaty_Resume.pdf
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

const root = resolve(import.meta.dirname!, '..')
const htmlPath = resolve(root, 'dist/resume/index.html')
const outPath = resolve(root, 'dist/Jon_Bogaty_Resume.pdf')

if (!existsSync(htmlPath)) {
  console.error(`Missing ${htmlPath} — run pnpm build first`)
  process.exit(1)
}

const html = readFileSync(htmlPath, 'utf-8')
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'load', timeout: 15000 })
  const pdf = await page.pdf({
    format: 'Letter',
    margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
    printBackground: true,
  })
  writeFileSync(outPath, pdf)
  console.log(`PDF generated: ${outPath} (${(pdf.length / 1024).toFixed(1)} KB)`)
} finally {
  await browser.close()
}
