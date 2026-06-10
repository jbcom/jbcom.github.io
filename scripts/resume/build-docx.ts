/**
 * Compile Jon_Bogaty_Resume.docx from src/content/resume.ts.
 *
 * The DOCX is the canonical distributable resume. No PDF is produced.
 * Fast local loop: no Astro build required — template.ts renders straight
 * from the resume data module. The turbodocx output is post-processed at
 * the OOXML level (see postprocess.ts) to fix layout defects the converter
 * hardcodes.
 *
 * Usage: pnpm resume:build  (or: npx tsx scripts/resume/build-docx.ts [outPath])
 * Output: public/Jon_Bogaty_Resume.docx
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import HTMLtoDOCX from '@turbodocx/html-to-docx'
import JSZip from 'jszip'

import { postprocessDocumentXml } from './postprocess.ts'
import { resumeDocxHtml } from './template.ts'

export async function buildResumeDocx(outPath: string): Promise<void> {
  const buffer = await HTMLtoDOCX(resumeDocxHtml(), undefined, {
    table: { row: { cantSplit: true } },
    font: 'Calibri',
    fontSize: 19, // half-points → 9.5pt default body
    margins: { top: 720, right: 720, bottom: 720, left: 720 }, // 0.5in
    title: 'Jon Bogaty - Resume',
    creator: 'Jon Bogaty',
    pageSize: { width: 12240, height: 15840 }, // US Letter in twips
  })

  const zip = await JSZip.loadAsync(Buffer.from(buffer as ArrayBuffer))
  const documentXml = await zip.file('word/document.xml')?.async('string')
  if (!documentXml) throw new Error('turbodocx output is missing word/document.xml')
  zip.file('word/document.xml', postprocessDocumentXml(documentXml))
  const output = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })

  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, output)
  console.log(`DOCX generated: ${outPath} (${(output.length / 1024).toFixed(1)} KB)`)
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename!)
if (isMain) {
  const outPath = process.argv[2]
    ? resolve(process.argv[2])
    : resolve(import.meta.dirname!, '../../public/Jon_Bogaty_Resume.docx')
  await buildResumeDocx(outPath)
}
