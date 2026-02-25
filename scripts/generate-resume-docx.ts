/**
 * Generate Jon_Bogaty_Resume.docx from resume.json
 *
 * Uses the `docx` npm package to produce a professional Word document
 * directly from the canonical resume data source.
 *
 * Usage: npx tsx scripts/generate-resume-docx.ts
 * Output: public/Jon_Bogaty_Resume.docx
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from 'docx'

// Import resume data
import resume from '../src/content/resume.json' with { type: 'json' }
import { formatDateRange } from '../src/lib/dates.ts'

const PRIMARY_COLOR = '0B0D14'
const ACCENT_COLOR = '996B1D'
const LINK_COLOR = '6B8BAD'

// --- Header ---
const headerParagraphs: Paragraph[] = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [
      new TextRun({
        text: resume.basics.name,
        bold: true,
        size: 36,
        color: PRIMARY_COLOR,
        font: 'Calibri',
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: resume.basics.label,
        size: 20,
        color: ACCENT_COLOR,
        font: 'Calibri',
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [
      new TextRun({
        text: `${resume.basics.location.city}, ${resume.basics.location.region}`,
        size: 18,
        font: 'Calibri',
      }),
      new TextRun({ text: '  |  ', size: 18, font: 'Calibri' }),
      new TextRun({ text: resume.basics.email, size: 18, font: 'Calibri', color: LINK_COLOR }),
      new TextRun({ text: '  |  ', size: 18, font: 'Calibri' }),
      new TextRun({ text: resume.basics.url, size: 18, font: 'Calibri', color: LINK_COLOR }),
      ...resume.basics.profiles.flatMap((p) => [
        new TextRun({ text: '  |  ', size: 18, font: 'Calibri' }),
        new TextRun({ text: p.url, size: 18, font: 'Calibri', color: LINK_COLOR }),
      ]),
    ],
  }),
]

// --- Summary ---
const summaryParagraphs: Paragraph[] = [
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    border: { bottom: { color: ACCENT_COLOR, size: 6, space: 4, style: 'single' as const } },
    children: [
      new TextRun({
        text: 'PROFESSIONAL SUMMARY',
        bold: true,
        size: 22,
        color: PRIMARY_COLOR,
        font: 'Calibri',
      }),
    ],
  }),
  new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({
        text: resume.basics.about,
        size: 19,
        font: 'Calibri',
      }),
    ],
  }),
]

// --- Competencies ---
const competencyParagraphs: Paragraph[] = [
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    border: { bottom: { color: ACCENT_COLOR, size: 6, space: 4, style: 'single' as const } },
    children: [
      new TextRun({
        text: 'CORE COMPETENCIES',
        bold: true,
        size: 22,
        color: PRIMARY_COLOR,
        font: 'Calibri',
      }),
    ],
  }),
  // Three-column layout via tab stops
  ...chunkArray(resume.competencies, 3).map(
    (row) =>
      new Paragraph({
        spacing: { after: 40 },
        tabStops: [
          { type: TabStopType.LEFT, position: TabStopPosition.MAX / 3 },
          { type: TabStopType.LEFT, position: (TabStopPosition.MAX * 2) / 3 },
        ],
        children: row.flatMap((item, i) => [
          ...(i > 0 ? [new TextRun({ text: '\t', size: 18, font: 'Calibri' })] : []),
          new TextRun({ text: `• ${item}`, size: 18, font: 'Calibri' }),
        ]),
      })
  ),
]

// --- Work Experience ---
const experienceParagraphs: Paragraph[] = [
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    border: { bottom: { color: ACCENT_COLOR, size: 6, space: 4, style: 'single' as const } },
    children: [
      new TextRun({
        text: 'PROFESSIONAL EXPERIENCE',
        bold: true,
        size: 22,
        color: PRIMARY_COLOR,
        font: 'Calibri',
      }),
    ],
  }),
  ...resume.work.flatMap((job) => [
    new Paragraph({
      spacing: { before: 160, after: 40 },
      tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
      children: [
        new TextRun({
          text: job.position,
          bold: true,
          size: 21,
          font: 'Calibri',
          color: PRIMARY_COLOR,
        }),
        new TextRun({ text: '\t', font: 'Calibri' }),
        new TextRun({
          text: formatDateRange(job.startDate, job.endDate),
          size: 19,
          font: 'Calibri',
          color: ACCENT_COLOR,
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [
        new TextRun({
          text: job.name,
          italics: true,
          size: 19,
          font: 'Calibri',
        }),
      ],
    }),
    ...(job.summary
      ? [
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: job.summary,
                size: 18,
                font: 'Calibri',
              }),
            ],
          }),
        ]
      : []),
    ...(job.highlights ?? []).map(
      (h) =>
        new Paragraph({
          spacing: { after: 40 },
          indent: { left: 360 },
          bullet: { level: 0 },
          children: [new TextRun({ text: h, size: 18, font: 'Calibri' })],
        })
    ),
  ]),
]

// --- Earlier Career ---
const earlierParagraphs: Paragraph[] = [
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    border: { bottom: { color: ACCENT_COLOR, size: 6, space: 4, style: 'single' as const } },
    children: [
      new TextRun({
        text: 'EARLIER CAREER',
        bold: true,
        size: 22,
        color: PRIMARY_COLOR,
        font: 'Calibri',
      }),
    ],
  }),
  new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: resume.earlierCareer.summary,
        size: 18,
        font: 'Calibri',
      }),
    ],
  }),
  ...resume.earlierCareer.positions.map(
    (pos) =>
      new Paragraph({
        spacing: { after: 30 },
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
          new TextRun({ text: `${pos.position}`, bold: true, size: 18, font: 'Calibri' }),
          new TextRun({ text: ` — ${pos.name}`, size: 18, font: 'Calibri' }),
          new TextRun({ text: '\t', font: 'Calibri' }),
          new TextRun({ text: pos.year, size: 18, font: 'Calibri', color: ACCENT_COLOR }),
        ],
      })
  ),
]

// --- Skills ---
const skillsParagraphs: Paragraph[] = [
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    border: { bottom: { color: ACCENT_COLOR, size: 6, space: 4, style: 'single' as const } },
    children: [
      new TextRun({
        text: 'TECHNICAL SKILLS',
        bold: true,
        size: 22,
        color: PRIMARY_COLOR,
        font: 'Calibri',
      }),
    ],
  }),
  ...resume.skills.map(
    (cat) =>
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: `${cat.name}: `,
            bold: true,
            size: 18,
            font: 'Calibri',
          }),
          new TextRun({
            text: cat.keywords.join(', '),
            size: 18,
            font: 'Calibri',
          }),
        ],
      })
  ),
]

// --- Education ---
const educationParagraphs: Paragraph[] = [
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100 },
    border: { bottom: { color: ACCENT_COLOR, size: 6, space: 4, style: 'single' as const } },
    children: [
      new TextRun({
        text: 'EDUCATION',
        bold: true,
        size: 22,
        color: PRIMARY_COLOR,
        font: 'Calibri',
      }),
    ],
  }),
  ...resume.education.map(
    (edu) =>
      new Paragraph({
        spacing: { after: 60 },
        children: [
          new TextRun({
            text: `${edu.studyType} — ${edu.area}`,
            bold: true,
            size: 19,
            font: 'Calibri',
          }),
          new TextRun({ text: '\n', font: 'Calibri' }),
          new TextRun({
            text: `${edu.institution} | ${edu.startDate}–${edu.endDate}`,
            size: 18,
            font: 'Calibri',
          }),
          ...(edu.honors
            ? [
                new TextRun({ text: '\n', font: 'Calibri' }),
                new TextRun({
                  text: edu.honors.join(' • '),
                  italics: true,
                  size: 18,
                  font: 'Calibri',
                  color: ACCENT_COLOR,
                }),
              ]
            : []),
        ],
      })
  ),
]

// --- Assemble Document ---
const doc = new Document({
  creator: 'Jon Bogaty',
  title: 'Jon Bogaty - Resume',
  description: resume.basics.label,
  sections: [
    {
      properties: {
        page: {
          margin: { top: 720, right: 720, bottom: 720, left: 720 },
        },
      },
      children: [
        ...headerParagraphs,
        ...summaryParagraphs,
        ...competencyParagraphs,
        ...experienceParagraphs,
        ...earlierParagraphs,
        ...skillsParagraphs,
        ...educationParagraphs,
      ],
    },
  ],
})

// Generate and write
const outPath = resolve(import.meta.dirname!, '../public/Jon_Bogaty_Resume.docx')
const buffer = await Packer.toBuffer(doc)
writeFileSync(outPath, buffer)
console.log(`DOCX generated: ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`)

// --- Utility ---
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}
