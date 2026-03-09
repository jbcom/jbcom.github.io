/**
 * Generate PNG screenshots of the resume for visual verification.
 *
 * Renders the shared HTML template in Playwright and captures
 * full-page screenshots, useful for reviewing layout without
 * opening the PDF/DOCX manually.
 *
 * Usage: npx tsx scripts/generate-resume-screenshots.ts
 * Output: public/resume-preview.png
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

import { resumeHtml } from './resume-html.ts'

const browser = await chromium.launch()
try {
  const page = await browser.newPage()

  // Set viewport to letter-width proportions (8.5in at 96dpi = 816px, minus margins)
  await page.setViewportSize({ width: 816, height: 1056 })
  await page.setContent(resumeHtml, { waitUntil: 'load', timeout: 15000 })

  // Add padding matching print margins
  await page.addStyleTag({ content: 'body { padding: 48px; }' })

  const screenshot = await page.screenshot({ fullPage: true, type: 'png' })

  const outPath = resolve(import.meta.dirname!, '../public/resume-preview.png')
  writeFileSync(outPath, screenshot)
  console.log(`Screenshot generated: ${outPath} (${(screenshot.length / 1024).toFixed(1)} KB)`)
} finally {
  await browser.close()
}
