/**
 * DOCX-targeted HTML template for the resume.
 *
 * This template is consumed by @turbodocx/html-to-docx, NOT by a browser.
 * Constraints that shape it:
 *  - Inline styles only: stylesheet/class support in HTML→DOCX conversion is
 *    unreliable, inline `style` attributes map deterministically to run/paragraph
 *    properties.
 *  - No flexbox/grid: left/right alignment on one line is done with a
 *    borderless two-cell table, the Word-native way.
 *  - Word-stock fonts only (recipients won't have web fonts): Georgia echoes
 *    the site's Instrument Serif headings; Calibri matches Inter's role.
 *  - Print accent color #996B1D (site amber #E8A849 is too light on white).
 */

import resume from '../../src/content/resume.ts'
import { formatDateRange } from '../../src/lib/dates.ts'

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = 'Calibri, Arial, sans-serif'
const INK = '#1A1A1A'
const HEAD = '#0B0D14'
const ACCENT = '#996B1D'
const MUTED = '#555555'

const body = (size = '9.5pt', extra = '') =>
  `font-family: ${SANS}; font-size: ${size}; color: ${INK}; line-height: 1.4; ${extra}`

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function sectionHeading(title: string): string {
  // A one-row table is the only construct that reliably renders the amber
  // rule (paragraph border-bottom and <hr> are both dropped in conversion).
  return `<table style="width: 100%; border-collapse: collapse; margin-top: 8pt; margin-bottom: 2pt;">
  <tr>
    <td style="border-bottom: 1.5pt solid ${ACCENT}; padding: 0;">
      <p style="margin: 0; font-family: ${SERIF}; font-size: 11pt; font-weight: bold; color: ${HEAD}; letter-spacing: 1pt;">${escapeHtml(title.toUpperCase())}</p>
    </td>
  </tr>
</table>`
}

/** Borderless two-cell table row: left text, accent right-aligned text. */
function splitCells(left: string, right: string, leftStyle: string, rightStyle: string): string {
  return `<tr>
    <td style="padding: 0; vertical-align: bottom;"><p style="margin: 0; ${leftStyle}">${left}</p></td>
    <td style="padding: 0; text-align: right; vertical-align: bottom; white-space: nowrap;"><p style="margin: 0; ${rightStyle}">${right}</p></td>
  </tr>`
}

/** One borderless table holding many left/right rows — avoids the per-table
 * paragraph spacing Word inserts after every table. */
function splitTable(rows: string[]): string {
  return `<table style="width: 100%; border-collapse: collapse;">${rows.join('\n')}</table>`
}

function header(): string {
  const { about } = resume
  const contactParts = [
    `${escapeHtml(about.location.city)}, ${escapeHtml(about.location.region)}`,
    `<a href="mailto:${escapeHtml(about.email)}" style="color: ${ACCENT}; text-decoration: none;">${escapeHtml(about.email)}</a>`,
    `<a href="${escapeHtml(about.url)}" style="color: ${ACCENT}; text-decoration: none;">${escapeHtml(about.url.replace(/^https?:\/\//, ''))}</a>`,
    ...about.profiles.map(
      (p) =>
        `<a href="${escapeHtml(p.url)}" style="color: ${ACCENT}; text-decoration: none;">${escapeHtml(p.url.replace(/^https?:\/\//, ''))}</a>`
    ),
  ]
  return `<p style="text-align: center; font-family: ${SERIF}; font-size: 22pt; color: ${HEAD}; margin: 0 0 2pt 0;">${escapeHtml(about.name)}</p>
<p style="text-align: center; ${body('10pt', `color: ${ACCENT}; font-weight: bold;`)} margin: 0 0 3pt 0;">${escapeHtml(about.label)}</p>
<p style="text-align: center; ${body('8.5pt', `color: ${MUTED};`)} margin: 0 0 10pt 0;">${contactParts.join(' &nbsp;·&nbsp; ')}</p>`
}

function summarySection(): string {
  const paragraphs = resume.about.summary
  return (
    sectionHeading('Professional Summary') +
    paragraphs.map((p) => `<p style="${body()} margin: 0 0 5pt 0;">${escapeHtml(p)}</p>`).join('\n')
  )
}

function experienceSection(): string {
  const jobs = resume.work
    .filter((job) => job.onResume !== false)
    .map((job) => {
      const dates = formatDateRange(job.startDate, job.endDate)
      const highlights = (job.highlights ?? [])
        .map(
          (h) =>
            `<li style="${body('9pt', 'line-height: 1.35;')} margin: 0 0 2pt 0;">${escapeHtml(h)}</li>`
        )
        .join('\n')
      // Per-job stack lines are site-only: the DOCX keeps keywords in Skills
      // and the bullets themselves, and the page budget is two pages.
      const headerRows = [
        splitCells(
          escapeHtml(job.position),
          escapeHtml(dates),
          `font-family: ${SANS}; font-size: 10.5pt; font-weight: bold; color: ${HEAD};`,
          `font-family: ${SANS}; font-size: 9pt; color: ${ACCENT};`
        ),
        `<tr><td colspan="2" style="padding: 0;"><p style="margin: 0; ${body('9.5pt')}"><em>${escapeHtml(job.name)}</em></p></td></tr>`,
      ]
      return `${splitTable(headerRows)}
${job.summary ? `<p style="${body('9pt')} margin: 0 0 2pt 0;">${escapeHtml(job.summary)}</p>` : ''}
${highlights ? `<ul style="margin: 0 0 8pt 0; padding-left: 14pt;">${highlights}</ul>` : ''}`
    })
    .join('\n')
  return sectionHeading('Professional Experience') + jobs
}

function openSourceSection(): string {
  // Compact by design: one line per flagship project, full detail lives on
  // the site. The resume sells the employment record; the site sells the OSS.
  const projects = resume.projects
    .filter((project) => project.onResume !== false)
    .map(
      (project) =>
        `<p style="${body('9pt')} margin: 0 0 2pt 0;"><span style="font-weight: bold; color: ${HEAD};">${escapeHtml(project.name)}</span> — ${escapeHtml(project.tagline)}${project.domain ? ` &nbsp;·&nbsp; <span style="color: ${ACCENT};">${escapeHtml(project.domain)}</span>` : ''}</p>`
    )
    .join('\n')
  return (
    sectionHeading('Open Source') +
    `<p style="${body('9pt')} margin: 0 0 3pt 0;">Five published frameworks across Python, Go, TypeScript, and Rust — full portfolio, packages, and write-ups at <a href="https://www.jonbogaty.com" style="color: ${ACCENT}; text-decoration: none;">jonbogaty.com</a>.</p>` +
    projects
  )
}

function earlierCareerSection(): string {
  // Deliberately a single paragraph, not a position list: a decade of short
  // early roles reads as a consulting-style arc in prose, but as job-hopping
  // in a list.
  return (
    sectionHeading('Earlier Career') +
    `<p style="${body('9pt')} margin: 0 0 4pt 0;">${escapeHtml(resume.earlierCareer.summary)}</p>`
  )
}

function skillsSection(): string {
  const categories = resume.skills
    .map(
      (cat) =>
        `<p style="${body('9pt')} margin: 0 0 2pt 0;"><span style="font-weight: bold; color: ${HEAD};">${escapeHtml(cat.name)}:</span> ${escapeHtml(cat.keywords.join(', '))}</p>`
    )
    .join('\n')
  return sectionHeading('Technical Skills') + categories
}

function educationSection(): string {
  const entries = resume.education
    .map(
      (
        edu
      ) => `<p style="${body('9.5pt', `font-weight: bold; color: ${HEAD};`)} margin: 0;">${escapeHtml(edu.studyType)} — ${escapeHtml(edu.area)}</p>
<p style="${body('9pt', `color: ${MUTED};`)} margin: 0;">${escapeHtml(edu.institution)} · ${escapeHtml(edu.startDate)}–${escapeHtml(edu.endDate)}</p>
${edu.honors ? `<p style="${body('9pt', `color: ${ACCENT}; font-style: italic;`)} margin: 0 0 4pt 0;">${edu.honors.map((h) => escapeHtml(h)).join(' · ')}</p>` : ''}`
    )
    .join('\n')
  return sectionHeading('Education') + entries
}

export function resumeDocxHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(resume.about.name)} - Resume</title>
</head>
<body>
${header()}
${summarySection()}
${experienceSection()}
${openSourceSection()}
${earlierCareerSection()}
${skillsSection()}
${educationSection()}
</body>
</html>`
}
