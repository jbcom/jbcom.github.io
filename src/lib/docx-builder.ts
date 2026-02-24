import {
  AlignmentType,
  BorderStyle,
  convertInchesToTwip,
  Document,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from 'docx'
import resume from '../content/resume.json'
import { formatDateRange } from './dates'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FONT = 'Calibri'
const FONT_SIZE_BODY = 22 // 11pt in half-points
const FONT_SIZE_NAME = 56 // 28pt in half-points
const FONT_SIZE_SECTION = 24 // 12pt in half-points
const SECTION_COLOR = '0f172a'
const MARGIN = convertInchesToTwip(0.75)
const BULLET_REFERENCE = 'resume-bullets'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create a section heading paragraph with HEADING_2, dark color, bottom border. */
function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 120 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 1, color: SECTION_COLOR },
    },
    children: [
      new TextRun({
        text,
        font: FONT,
        size: FONT_SIZE_SECTION,
        bold: true,
        color: SECTION_COLOR,
      }),
    ],
  })
}

/** Create a body-text paragraph. */
function bodyParagraph(
  children: TextRun[],
  options?: {
    spacing?: { before?: number; after?: number }
    alignment?: (typeof AlignmentType)[keyof typeof AlignmentType]
  }
): Paragraph {
  return new Paragraph({
    spacing: options?.spacing ?? { after: 80 },
    alignment: options?.alignment,
    children,
  })
}

/** Create a standard body TextRun. */
function bodyRun(text: string, opts?: { bold?: boolean; italics?: boolean }): TextRun {
  return new TextRun({
    text,
    font: FONT,
    size: FONT_SIZE_BODY,
    bold: opts?.bold,
    italics: opts?.italics,
  })
}

/** Create a bullet paragraph for highlights. */
function bulletParagraph(text: string): Paragraph {
  return new Paragraph({
    numbering: { reference: BULLET_REFERENCE, level: 0 },
    spacing: { after: 40 },
    children: [bodyRun(text)],
  })
}

// ---------------------------------------------------------------------------
// Section builders
// ---------------------------------------------------------------------------

function buildHeader(): Paragraph[] {
  const { name, label, email, location, profiles } = resume.basics
  const linkedin = profiles.find((p) => p.network === 'LinkedIn')
  const github = profiles.find((p) => p.network === 'GitHub')

  const contactParts: string[] = []
  if (location) contactParts.push(`${location.city}, ${location.region}`)
  if (email) contactParts.push(email)
  if (linkedin) contactParts.push(linkedin.url)
  if (github) contactParts.push(github.url)

  return [
    // Name
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [
        new TextRun({
          text: name,
          font: FONT,
          size: FONT_SIZE_NAME,
          bold: true,
        }),
      ],
    }),
    // Label
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [bodyRun(label)],
    }),
    // Contact line
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [bodyRun(contactParts.join('  |  '))],
    }),
  ]
}

function buildSummary(): Paragraph[] {
  return [sectionHeading('Professional Summary'), bodyParagraph([bodyRun(resume.basics.summary)])]
}

function buildCompetencies(): Paragraph[] {
  return [
    sectionHeading('Core Competencies'),
    bodyParagraph([bodyRun(resume.competencies.join(', '))]),
  ]
}

function buildExperience(): Paragraph[] {
  const paragraphs: Paragraph[] = [sectionHeading('Professional Experience')]

  for (const job of resume.work) {
    const dateRange = formatDateRange(job.startDate, job.endDate)

    // Position + Company  ...  Date range (right-aligned via tab stop)
    paragraphs.push(
      new Paragraph({
        spacing: { before: 160, after: 40 },
        tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
        children: [
          bodyRun(job.position, { bold: true }),
          bodyRun(' at '),
          bodyRun(job.name, { bold: true }),
          new TextRun({
            text: `\t${dateRange}`,
            font: FONT,
            size: FONT_SIZE_BODY,
            italics: true,
          }),
        ],
      })
    )

    // Optional summary
    if (job.summary) {
      paragraphs.push(
        bodyParagraph([bodyRun(job.summary, { italics: true })], {
          spacing: { after: 40 },
        })
      )
    }

    // Highlights as bullets
    for (const highlight of job.highlights) {
      paragraphs.push(bulletParagraph(highlight))
    }
  }

  return paragraphs
}

function buildEarlierCareer(): Paragraph[] {
  const { positions, summary } = resume.earlierCareer

  const positionLine = positions.map((p) => `${p.name} ${p.position} (${p.year})`).join('  |  ')

  return [
    sectionHeading('Earlier Career'),
    bodyParagraph([bodyRun(positionLine, { bold: true })], { spacing: { after: 80 } }),
    bodyParagraph([bodyRun(summary)]),
  ]
}

function buildInnovation(): Paragraph[] {
  const paragraphs: Paragraph[] = [sectionHeading('Innovation & Technology Leadership')]

  for (const item of resume.innovation) {
    paragraphs.push(
      bodyParagraph([
        bodyRun(`${item.year}: `, { bold: true }),
        bodyRun(`${item.title} — ${item.description}`),
      ])
    )
  }

  return paragraphs
}

function buildProjects(): Paragraph[] {
  const paragraphs: Paragraph[] = [
    sectionHeading('Open Source & AI Projects'),
    bodyParagraph([
      bodyRun('Selected open-source contributions and personal projects:', { italics: true }),
    ]),
  ]

  for (const project of resume.projects) {
    paragraphs.push(
      bodyParagraph([bodyRun(`${project.name}: `, { bold: true }), bodyRun(project.description)])
    )
  }

  return paragraphs
}

function buildSkills(): Paragraph[] {
  const paragraphs: Paragraph[] = [sectionHeading('Technical Skills')]

  for (const category of resume.skills) {
    paragraphs.push(
      bodyParagraph([
        bodyRun(`${category.name}: `, { bold: true }),
        bodyRun(category.keywords.join(', ')),
      ])
    )
  }

  return paragraphs
}

function buildEducation(): Paragraph[] {
  const paragraphs: Paragraph[] = [sectionHeading('Education')]

  for (const edu of resume.education) {
    const year = edu.endDate ?? edu.startDate
    paragraphs.push(
      bodyParagraph([
        bodyRun(`${edu.studyType}, ${edu.area}`, { bold: true }),
        bodyRun(` — ${edu.institution}  |  ${year}`),
      ])
    )

    if (edu.honors && edu.honors.length > 0) {
      paragraphs.push(bodyParagraph([bodyRun(edu.honors.join('  |  '), { italics: true })]))
    }
  }

  return paragraphs
}

// ---------------------------------------------------------------------------
// Document assembly
// ---------------------------------------------------------------------------

export async function buildResumeDocx(): Promise<Buffer> {
  const doc = new Document({
    numbering: {
      config: [
        {
          reference: BULLET_REFERENCE,
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '\u2022',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) },
                },
              },
            },
          ],
        },
      ],
    },
    styles: {
      default: {
        document: {
          run: {
            font: FONT,
            size: FONT_SIZE_BODY,
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: MARGIN,
              right: MARGIN,
              bottom: MARGIN,
              left: MARGIN,
            },
          },
        },
        children: [
          ...buildHeader(),
          ...buildSummary(),
          ...buildCompetencies(),
          ...buildExperience(),
          ...buildEarlierCareer(),
          ...buildInnovation(),
          ...buildProjects(),
          ...buildSkills(),
          ...buildEducation(),
        ],
      },
    ],
  })

  return Buffer.from(await Packer.toBuffer(doc))
}
