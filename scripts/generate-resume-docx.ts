/**
 * Generate Jon_Bogaty_Resume.docx from resume.json
 *
 * Uses the `docx` npm package with borderless fixed-layout tables
 * for reliable two-column alignment (title | date) that renders
 * correctly in Word, Apple Pages, and Google Docs.
 *
 * Usage: npx tsx scripts/generate-resume-docx.ts
 * Output: public/Jon_Bogaty_Resume.docx
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  WidthType,
} from 'docx'

import resume from '../src/content/resume.json' with { type: 'json' }
import { formatDateRange } from '../src/lib/dates.ts'

const PRIMARY = '0B0D14'
const ACCENT = '996B1D'
const LINK = '6B8BAD'
const FONT = 'Calibri'

// Letter page (12240 twips) minus 720 left + 720 right margins = 10800
const PAGE_WIDTH = 10800
const TITLE_WIDTH = 8000
const DATE_WIDTH = PAGE_WIDTH - TITLE_WIDTH

const NONE_BORDER = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }
const NO_BORDERS = {
  top: NONE_BORDER,
  bottom: NONE_BORDER,
  left: NONE_BORDER,
  right: NONE_BORDER,
}

/** Borderless fixed-width two-column row: left content | right content */
function twoColumnRow(left: TextRun[], right: TextRun[]): Table {
  return new Table({
    width: { size: PAGE_WIDTH, type: WidthType.DXA },
    layout: TableLayoutType.FIXED,
    columnWidths: [TITLE_WIDTH, DATE_WIDTH],
    borders: {
      ...NO_BORDERS,
      insideHorizontal: NONE_BORDER,
      insideVertical: NONE_BORDER,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: TITLE_WIDTH, type: WidthType.DXA },
            borders: NO_BORDERS,
            children: [
              new Paragraph({
                spacing: { after: 0 },
                children: left,
              }),
            ],
          }),
          new TableCell({
            width: { size: DATE_WIDTH, type: WidthType.DXA },
            borders: NO_BORDERS,
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { after: 0 },
                children: right,
              }),
            ],
          }),
        ],
      }),
    ],
  })
}

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 360, after: 200 },
    border: {
      bottom: { color: ACCENT, size: 6, space: 4, style: 'single' as const },
    },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22,
        color: PRIMARY,
        font: FONT,
      }),
    ],
  })
}

function textRun(
  text: string,
  opts: { bold?: boolean; italics?: boolean; size?: number; color?: string } = {}
): TextRun {
  return new TextRun({
    text,
    font: FONT,
    size: opts.size ?? 18,
    bold: opts.bold,
    italics: opts.italics,
    color: opts.color,
  })
}

// --- Header ---
const headerParagraphs: Paragraph[] = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [textRun(resume.about.name, { bold: true, size: 36, color: PRIMARY })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [textRun(resume.about.label, { size: 20, color: ACCENT })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
    children: [
      textRun(`${resume.about.location.city}, ${resume.about.location.region}`),
      textRun('  |  '),
      textRun(resume.about.email, { color: LINK }),
      textRun('  |  '),
      textRun(resume.about.url, { color: LINK }),
      ...resume.about.profiles.flatMap((p) => [textRun('  |  '), textRun(p.url, { color: LINK })]),
    ],
  }),
]

// --- Summary ---
const summaryParagraphs = [
  sectionHeading('PROFESSIONAL SUMMARY'),
  ...(Array.isArray(resume.about.summary) ? resume.about.summary : [resume.about.summary]).map(
    (text) =>
      new Paragraph({
        spacing: { after: 200 },
        children: [textRun(text, { size: 19 })],
      })
  ),
]

// --- Work Experience ---
const experienceChildren: (Paragraph | Table)[] = [sectionHeading('PROFESSIONAL EXPERIENCE')]
for (const job of resume.work) {
  experienceChildren.push(
    twoColumnRow(
      [textRun(job.position, { bold: true, size: 21, color: PRIMARY })],
      [textRun(formatDateRange(job.startDate, job.endDate), { size: 19, color: ACCENT })]
    )
  )
  experienceChildren.push(
    new Paragraph({
      spacing: { after: 100 },
      children: [textRun(job.name, { italics: true, size: 19 })],
    })
  )
  if (job.summary) {
    experienceChildren.push(
      new Paragraph({
        spacing: { after: 160 },
        children: [textRun(job.summary)],
      })
    )
  }
  for (const h of job.highlights ?? []) {
    experienceChildren.push(
      new Paragraph({
        spacing: { after: 60 },
        indent: { left: 360 },
        bullet: { level: 0 },
        children: [textRun(h)],
      })
    )
  }
}

// --- Earlier Career ---
const earlierChildren: (Paragraph | Table)[] = [
  sectionHeading('EARLIER CAREER'),
  new Paragraph({
    spacing: { after: 160 },
    children: [textRun(resume.earlierCareer.summary)],
  }),
]
for (const pos of resume.earlierCareer.positions) {
  earlierChildren.push(
    twoColumnRow(
      [textRun(pos.position, { bold: true }), textRun(` — ${pos.name}`)],
      [textRun(pos.year, { color: ACCENT })]
    )
  )
}

// --- Skills ---
const skillsParagraphs = [
  sectionHeading('TECHNICAL SKILLS'),
  ...resume.skills.map(
    (cat) =>
      new Paragraph({
        spacing: { after: 100 },
        children: [textRun(`${cat.name}: `, { bold: true }), textRun(cat.keywords.join(', '))],
      })
  ),
]

// --- Education ---
const educationParagraphs = [
  sectionHeading('EDUCATION'),
  ...resume.education.map(
    (edu) =>
      new Paragraph({
        spacing: { after: 100 },
        children: [
          textRun(`${edu.studyType} — ${edu.area}`, { bold: true, size: 19 }),
          new TextRun({ text: '\n', font: FONT }),
          textRun(`${edu.institution} | ${edu.startDate}–${edu.endDate}`),
          ...(edu.honors
            ? [
                new TextRun({ text: '\n', font: FONT }),
                textRun(edu.honors.join(' • '), { italics: true, color: ACCENT }),
              ]
            : []),
        ],
      })
  ),
]

// --- Assemble ---
const doc = new Document({
  creator: 'Jon Bogaty',
  title: 'Jon Bogaty - Resume',
  description: resume.about.label,
  sections: [
    {
      properties: {
        page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } },
      },
      children: [
        ...headerParagraphs,
        ...summaryParagraphs,
        ...experienceChildren,
        ...earlierChildren,
        ...skillsParagraphs,
        ...educationParagraphs,
      ],
    },
  ],
})

const outPath = resolve(import.meta.dirname!, '../public/Jon_Bogaty_Resume.docx')
const buffer = await Packer.toBuffer(doc)
writeFileSync(outPath, buffer)
console.log(`DOCX generated: ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`)
