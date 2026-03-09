/**
 * Visual verification tests for generated resume files.
 *
 * Renders the HTML template (PDF source) and the DOCX round-tripped
 * back to HTML via mammoth. Screenshots are saved to
 * test-results/resume-screenshots/ for inspection.
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { expect, test } from '@playwright/test'
import mammoth from 'mammoth'

const ROOT = resolve(import.meta.dirname!, '../..')
const SCREENSHOT_DIR = resolve(ROOT, 'test-results/resume-screenshots')

test.describe('Resume Visual Verification', () => {
  test('HTML template renders correctly (PDF source)', async ({ page }) => {
    const { resumeHtml } = await import('../../scripts/resume-html.ts')

    await page.setViewportSize({ width: 816, height: 1056 })
    await page.setContent(resumeHtml, { waitUntil: 'load' })
    await page.addStyleTag({ content: 'body { padding: 48px; }' })

    await page.screenshot({
      path: resolve(SCREENSHOT_DIR, 'resume-html-template.png'),
      fullPage: true,
    })

    // Basic content assertions
    await expect(page.locator('.header h1')).toHaveText('Jon Bogaty')
    await expect(page.locator('.job-header').first()).toBeVisible()

    // Verify dates are right-aligned (flex layout check)
    const headerBox = await page.locator('.job-header').first().boundingBox()
    const datesBox = await page.locator('.job-dates').first().boundingBox()
    expect(headerBox).toBeTruthy()
    expect(datesBox).toBeTruthy()
    expect(datesBox!.x + datesBox!.width).toBeGreaterThan(headerBox!.x + headerBox!.width * 0.7)
  })

  test('DOCX renders correctly (round-trip verification)', async ({ page }) => {
    // Convert the generated DOCX back to HTML via mammoth
    const docxPath = resolve(ROOT, 'public/Jon_Bogaty_Resume.docx')
    const docxBuffer = readFileSync(docxPath)
    const result = await mammoth.convertToHtml({ buffer: docxBuffer })

    const docxHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body { font-family: Calibri, sans-serif; font-size: 10pt; padding: 48px; max-width: 816px; margin: 0 auto; color: #1a1a1a; }
  h1 { font-size: 20pt; text-align: center; }
  h2 { font-size: 12pt; border-bottom: 2px solid #996B1D; padding-bottom: 4px; margin-top: 16px; }
  p { margin: 4px 0; line-height: 1.4; }
  ul { padding-left: 20px; }
  li { margin-bottom: 4px; }
  a { color: #6B8BAD; }
  table { width: 100%; border-collapse: collapse; }
  td { vertical-align: top; padding: 2px 0; }
</style></head>
<body>${result.value}</body></html>`

    await page.setViewportSize({ width: 816, height: 1056 })
    await page.setContent(docxHtml, { waitUntil: 'load' })

    await page.screenshot({
      path: resolve(SCREENSHOT_DIR, 'resume-docx-roundtrip.png'),
      fullPage: true,
    })

    // Verify key content survived the HTML→DOCX→HTML round-trip
    await expect(page.getByText('Jon Bogaty').first()).toBeVisible()
    await expect(page.getByText('Staff DevOps & Platform Engineer', { exact: true })).toBeVisible()
    await expect(page.getByText('Flipside Crypto').first()).toBeVisible()
    await expect(page.getByText('Professional Summary', { exact: false }).first()).toBeVisible()

    if (result.messages.length > 0) {
      console.log('Mammoth conversion warnings:', result.messages)
    }
  })

  test('PDF file exists and is valid', async () => {
    const pdfPath = resolve(ROOT, 'public/Jon_Bogaty_Resume.pdf')
    const pdfBuffer = readFileSync(pdfPath)
    // PDF files start with %PDF
    expect(pdfBuffer.toString('ascii', 0, 4)).toBe('%PDF')
    expect(pdfBuffer.length).toBeGreaterThan(10000)
  })

  test('DOCX file exists and is valid', async () => {
    const docxPath = resolve(ROOT, 'public/Jon_Bogaty_Resume.docx')
    const docxBuffer = readFileSync(docxPath)
    // DOCX files are ZIP archives starting with PK
    expect(docxBuffer.toString('ascii', 0, 2)).toBe('PK')
    expect(docxBuffer.length).toBeGreaterThan(10000)
  })
})
