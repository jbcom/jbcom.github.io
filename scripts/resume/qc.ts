/**
 * Visual quality control for the compiled DOCX resume.
 *
 * Renders the actual .docx through LibreOffice (the closest local proxy for
 * how Word lays it out) and emits one PNG per page so a human — or an agent
 * with vision — can READ the real artifact instead of trusting the HTML
 * source. This is the gate that was missing when unstyled pandoc output
 * shipped unnoticed.
 *
 * Pipeline: build DOCX → soffice --headless → PDF (QC intermediate only,
 * never shipped) → pdftoppm → artifacts/resume-qc/page-N.png
 *
 * Requires: LibreOffice (brew install --cask libreoffice)
 *           poppler    (brew install poppler)
 * Usage: pnpm resume:qc
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

import { buildResumeDocx } from './build-docx.ts'

const root = resolve(import.meta.dirname!, '../..')
const artifactsDir = resolve(root, 'artifacts/resume-qc')
const docxPath = resolve(root, 'public/Jon_Bogaty_Resume.docx')

function findSoffice(): string {
  const candidates = [
    '/Applications/LibreOffice.app/Contents/MacOS/soffice',
    '/usr/bin/soffice',
    '/usr/local/bin/soffice',
    '/opt/homebrew/bin/soffice',
  ]
  const found = candidates.find((p) => existsSync(p))
  if (found) return found
  try {
    return execFileSync('which', ['soffice'], { encoding: 'utf-8' }).trim()
  } catch {
    console.error('LibreOffice not found. Install with: brew install --cask libreoffice')
    process.exit(1)
  }
}

await buildResumeDocx(docxPath)

rmSync(artifactsDir, { recursive: true, force: true })
mkdirSync(artifactsDir, { recursive: true })

console.log('Rendering DOCX via LibreOffice...')
execFileSync(
  findSoffice(),
  ['--headless', '--convert-to', 'pdf', '--outdir', artifactsDir, docxPath],
  { stdio: 'pipe', timeout: 120_000 }
)

const qcPdf = resolve(artifactsDir, 'Jon_Bogaty_Resume.pdf')
if (!existsSync(qcPdf)) {
  console.error('LibreOffice did not produce a PDF — check the DOCX for corruption.')
  process.exit(1)
}

console.log('Rasterizing pages...')
try {
  execFileSync('pdftoppm', ['-png', '-r', '120', qcPdf, resolve(artifactsDir, 'page')], {
    stdio: 'pipe',
    timeout: 60_000,
  })
} catch {
  console.error('pdftoppm failed or is not installed. Install poppler with: brew install poppler')
  process.exit(1)
}
rmSync(qcPdf) // QC intermediate only — no PDF artifact survives

const pages = readdirSync(artifactsDir)
  .filter((f) => f.endsWith('.png'))
  .sort()
console.log(`\n${pages.length} page(s) rendered:`)
for (const page of pages) console.log(`  ${resolve(artifactsDir, page)}`)
console.log('\nReview each page before shipping. Spec drift is a code bug.')
