/**
 * Visual quality control for the compiled DOCX resume.
 *
 * A DOCX has no single true appearance — layout differs by engine — so QC
 * renders through BOTH engines available locally and emits one PNG per page
 * from each, at high DPI, so a human (or an agent with vision) reads the
 * real artifact:
 *  - LibreOffice (headless): the closest local proxy for Microsoft Word,
 *    and the engine available in CI.
 *  - Apple Pages (via AppleScript, macOS only, best-effort): a real
 *    renderer recruiters use, and historically the one that exposed DOCX
 *    layout bugs LibreOffice hid.
 *
 * Pipeline: build DOCX → engine → PDF (QC intermediate only, never
 * shipped) → pdftoppm → artifacts/resume-qc/<engine>-<page>.png
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
const DPI = '200'

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

function rasterize(pdfPath: string, prefix: string): void {
  try {
    execFileSync('pdftoppm', ['-png', '-r', DPI, pdfPath, resolve(artifactsDir, prefix)], {
      stdio: 'pipe',
      timeout: 60_000,
    })
  } catch {
    console.error('pdftoppm failed or is not installed. Install poppler with: brew install poppler')
    process.exit(1)
  }
  rmSync(pdfPath) // QC intermediate only — no PDF artifact survives
}

function renderLibreOffice(): void {
  console.log('Rendering via LibreOffice (Word proxy)...')
  execFileSync(
    findSoffice(),
    ['--headless', '--convert-to', 'pdf', '--outdir', artifactsDir, docxPath],
    { stdio: 'pipe', timeout: 120_000 }
  )
  const pdf = resolve(artifactsDir, 'Jon_Bogaty_Resume.pdf')
  if (!existsSync(pdf)) {
    console.error('LibreOffice did not produce a PDF — check the DOCX for corruption.')
    process.exit(1)
  }
  rasterize(pdf, 'libreoffice')
}

/** Best-effort: drives the real Pages app, which renders DOCX with its own
 * engine — the same one a recruiter on a Mac sees. */
function renderPages(): void {
  if (process.platform !== 'darwin' || !existsSync('/Applications/Pages.app')) {
    console.log('Apple Pages not available — skipping Pages render.')
    return
  }
  console.log('Rendering via Apple Pages...')
  const pdf = resolve(artifactsDir, 'pages-render.pdf')
  try {
    execFileSync('osascript', ['-e', `tell application "Pages" to open POSIX file "${docxPath}"`], {
      stdio: 'pipe',
      timeout: 30_000,
    })
    // Pages imports DOCX asynchronously; poll until the document exists.
    for (let attempt = 0; attempt < 20; attempt++) {
      const count = execFileSync(
        'osascript',
        ['-e', 'tell application "Pages" to count documents'],
        {
          encoding: 'utf-8',
          timeout: 10_000,
        }
      ).trim()
      if (count !== '0') break
      execFileSync('sleep', ['1'])
    }
    execFileSync(
      'osascript',
      [
        '-e',
        `tell application "Pages"
          export document 1 to POSIX file "${pdf}" as PDF
          close document 1 saving no
        end tell`,
      ],
      { stdio: 'pipe', timeout: 60_000 }
    )
    rasterize(pdf, 'pages')
  } catch (err) {
    console.warn(
      `Pages render failed (${(err as Error).message?.split('\n')[0]}) — continuing with LibreOffice only.`
    )
  }
}

await buildResumeDocx(docxPath)

rmSync(artifactsDir, { recursive: true, force: true })
mkdirSync(artifactsDir, { recursive: true })

renderLibreOffice()
renderPages()

const pages = readdirSync(artifactsDir)
  .filter((f) => f.endsWith('.png'))
  .sort()
console.log(`\n${pages.length} page(s) rendered:`)
for (const page of pages) console.log(`  ${resolve(artifactsDir, page)}`)
console.log('\nREAD every page from BOTH engines before shipping — at full size,')
console.log('not thumbnails. Spec drift is a code bug.')
