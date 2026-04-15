/**
 * Generate Jon_Bogaty_Resume.pdf and Jon_Bogaty_Resume.docx
 *
 * Builds the Astro resume page to static HTML, then uses pandoc
 * to convert it to both PDF and DOCX formats.
 *
 * Requires: pandoc installed (brew install pandoc)
 * Usage: npx tsx scripts/generate-resume.ts
 * Output: public/Jon_Bogaty_Resume.{pdf,docx}
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname!, '..')
const publicDir = resolve(root, 'public')
const distDir = resolve(root, 'dist')

// Ensure public dir exists
if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true })

// Build just the resume page with Astro
console.log('Building resume page with Astro...')
execFileSync('npx', ['astro', 'build'], { cwd: root, stdio: 'inherit' })

// Find the rendered resume HTML
const resumeHtmlPath = resolve(distDir, 'resume/index.html')
const resumeHtmlAlt = resolve(distDir, 'resume.html')
const htmlPath = existsSync(resumeHtmlPath) ? resumeHtmlPath : resumeHtmlAlt

if (!existsSync(htmlPath)) {
  console.error('Could not find rendered resume HTML at:', resumeHtmlPath, 'or', resumeHtmlAlt)
  process.exit(1)
}

console.log(`Using resume HTML: ${htmlPath}`)

// Generate PDF with pandoc
const pdfPath = resolve(publicDir, 'Jon_Bogaty_Resume.pdf')
console.log('Generating PDF...')
try {
  execFileSync(
    'pandoc',
    [htmlPath, '-f', 'html', '-t', 'pdf', '--pdf-engine=weasyprint', '-o', pdfPath],
    {
      cwd: root,
      stdio: 'inherit',
    }
  )
  const pdfSize = readFileSync(pdfPath).length
  console.log(`PDF generated: ${pdfPath} (${(pdfSize / 1024).toFixed(1)} KB)`)
} catch {
  // Fallback: use pandoc with default LaTeX engine
  console.log('weasyprint not available, trying LaTeX...')
  try {
    execFileSync('pandoc', [htmlPath, '-f', 'html', '-o', pdfPath, '-V', 'geometry:margin=0.5in'], {
      cwd: root,
      stdio: 'inherit',
    })
    const pdfSize = readFileSync(pdfPath).length
    console.log(`PDF generated (LaTeX): ${pdfPath} (${(pdfSize / 1024).toFixed(1)} KB)`)
  } catch {
    // Final fallback: use Playwright for PDF
    console.log('pandoc PDF failed, falling back to Playwright...')
    const html = readFileSync(htmlPath, 'utf-8')
    const { chromium } = await import('playwright')
    const browser = await chromium.launch()
    try {
      const page = await browser.newPage()
      await page.setContent(html, { waitUntil: 'load', timeout: 15000 })
      const pdfBuffer = await page.pdf({
        format: 'Letter',
        margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
        printBackground: true,
      })
      writeFileSync(pdfPath, pdfBuffer)
      console.log(
        `PDF generated (Playwright): ${pdfPath} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`
      )
    } finally {
      await browser.close()
    }
  }
}

// Generate DOCX with pandoc
const docxPath = resolve(publicDir, 'Jon_Bogaty_Resume.docx')
console.log('Generating DOCX...')
execFileSync('pandoc', [htmlPath, '-f', 'html', '-t', 'docx', '-o', docxPath], {
  cwd: root,
  stdio: 'inherit',
})
const docxSize = readFileSync(docxPath).length
console.log(`DOCX generated: ${docxPath} (${(docxSize / 1024).toFixed(1)} KB)`)
