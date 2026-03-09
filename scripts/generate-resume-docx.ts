/**
 * Generate Jon_Bogaty_Resume.docx from resume.json
 *
 * Uses @turbodocx/html-to-docx to convert the shared HTML template
 * into a Word document, ensuring consistent formatting with the PDF.
 *
 * Usage: npx tsx scripts/generate-resume-docx.ts
 * Output: public/Jon_Bogaty_Resume.docx
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import HTMLtoDOCX from '@turbodocx/html-to-docx'

import { resumeHtml } from './resume-html.ts'

const outPath = resolve(import.meta.dirname!, '../public/Jon_Bogaty_Resume.docx')

const buffer = await HTMLtoDOCX(resumeHtml, undefined, {
  table: { row: { cantSplit: true } },
  font: 'Calibri',
  fontSize: 19, // half-points (9.5pt)
  margins: {
    top: 720,
    right: 720,
    bottom: 720,
    left: 720,
  },
  title: 'Jon Bogaty - Resume',
  creator: 'Jon Bogaty',
})

const output = Buffer.from(buffer as ArrayBuffer)
writeFileSync(outPath, output)
console.log(`DOCX generated: ${outPath} (${(output.length / 1024).toFixed(1)} KB)`)
