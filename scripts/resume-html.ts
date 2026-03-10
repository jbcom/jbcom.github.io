/**
 * Shared HTML template for resume generation (PDF + DOCX).
 *
 * Single source of truth for resume layout and styling.
 * Used by generate-resume-pdf.ts (Playwright) and generate-resume-docx.ts (html-to-docx).
 */

import resume from '../src/content/resume.json' with { type: 'json' }
import { formatDateRange } from '../src/lib/dates.ts'

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export const resumeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(resume.about.name)} - Resume</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: Calibri, 'Inter', -apple-system, 'Segoe UI', sans-serif;
    font-size: 9.5pt;
    line-height: 1.4;
    color: #1a1a1a;
    padding: 0;
  }

  .header { text-align: center; margin-bottom: 12pt; }
  .header h1 { font-size: 20pt; font-weight: 700; color: #0B0D14; margin-bottom: 2pt; }
  .header .label { font-size: 9pt; color: #996B1D; margin-bottom: 4pt; }
  .header .contact { font-size: 8pt; color: #555; }
  .header .contact a { color: #6B8BAD; text-decoration: none; }

  h2 {
    font-size: 10.5pt;
    font-weight: 700;
    color: #0B0D14;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    border-bottom: 1.5pt solid #996B1D;
    padding-bottom: 3pt;
    margin-top: 14pt;
    margin-bottom: 6pt;
  }

  .summary { font-size: 9pt; line-height: 1.45; margin-bottom: 6pt; }

  .job { margin-bottom: 10pt; }
  .job-header { display: flex; justify-content: space-between; align-items: baseline; }
  .job-title { font-weight: 700; font-size: 10pt; color: #0B0D14; }
  .job-dates { font-size: 8.5pt; color: #996B1D; white-space: nowrap; }
  .job-company { font-style: italic; font-size: 9pt; color: #444; margin-bottom: 3pt; }
  .job-summary { font-size: 8.5pt; color: #333; margin-bottom: 3pt; }

  ul { padding-left: 14pt; margin-bottom: 2pt; }
  li { font-size: 8.5pt; line-height: 1.35; margin-bottom: 2pt; }
  li::marker { color: #996B1D; }

  .earlier-pos { display: flex; justify-content: space-between; font-size: 8.5pt; margin-bottom: 1pt; }
  .earlier-pos .role { font-weight: 600; }
  .earlier-pos .year { color: #996B1D; }

  .skills-cat { margin-bottom: 3pt; font-size: 8.5pt; }
  .skills-cat strong { color: #0B0D14; }

  .education .degree { font-weight: 700; font-size: 9.5pt; }
  .education .school { font-size: 8.5pt; color: #444; }
  .education .honors { font-style: italic; font-size: 8.5pt; color: #996B1D; }

  @media print {
    body { padding: 0; }
    @page { margin: 0.5in; size: letter; }
  }
</style>
</head>
<body>

<div class="header">
  <h1>${escapeHtml(resume.about.name)}</h1>
  <div class="label">${escapeHtml(resume.about.label)}</div>
  <div class="contact">
    ${escapeHtml(resume.about.location.city)}, ${escapeHtml(resume.about.location.region)} &nbsp;|&nbsp;
    <a href="mailto:${escapeHtml(resume.about.email)}">${escapeHtml(resume.about.email)}</a> &nbsp;|&nbsp;
    <a href="${escapeHtml(resume.about.url)}">${escapeHtml(resume.about.url)}</a>
    ${resume.about.profiles.map((p) => `&nbsp;|&nbsp; <a href="${escapeHtml(p.url)}">${escapeHtml(p.url)}</a>`).join('')}
  </div>
</div>

<h2>Professional Summary</h2>
${(Array.isArray(resume.about.summary) ? resume.about.summary : [resume.about.summary]).map((p) => `<p class="summary">${escapeHtml(p)}</p>`).join('\n')}

<h2>Professional Experience</h2>
${resume.work
  .map(
    (job) => `
<div class="job">
  <div class="job-header">
    <span class="job-title">${escapeHtml(job.position)}</span>
    <span class="job-dates">${escapeHtml(formatDateRange(job.startDate, job.endDate))}</span>
  </div>
  <div class="job-company">${escapeHtml(job.name)}</div>
  ${job.summary ? `<div class="job-summary">${escapeHtml(job.summary)}</div>` : ''}
  ${
    job.highlights?.length
      ? `<ul>${job.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}</ul>`
      : ''
  }
</div>`
  )
  .join('')}

<h2>Earlier Career</h2>
<p class="summary" style="margin-bottom:4pt">${escapeHtml(resume.earlierCareer.summary)}</p>
${resume.earlierCareer.positions
  .map(
    (pos) => `
<div class="earlier-pos">
  <span><span class="role">${escapeHtml(pos.position)}</span> &#8212; ${escapeHtml(pos.name)}</span>
  <span class="year">${escapeHtml(pos.year)}</span>
</div>`
  )
  .join('')}

<h2>Technical Skills</h2>
${resume.skills
  .map(
    (cat) =>
      `<div class="skills-cat"><strong>${escapeHtml(cat.name)}:</strong> ${escapeHtml(cat.keywords.join(', '))}</div>`
  )
  .join('')}

<h2>Education</h2>
${resume.education
  .map(
    (edu) => `
<div class="education">
  <div class="degree">${escapeHtml(edu.studyType)} &#8212; ${escapeHtml(edu.area)}</div>
  <div class="school">${escapeHtml(edu.institution)} | ${escapeHtml(edu.startDate)}&#8211;${escapeHtml(edu.endDate)}</div>
  ${edu.honors ? `<div class="honors">${edu.honors.map((h) => escapeHtml(h)).join(' &#8226; ')}</div>` : ''}
</div>`
  )
  .join('')}

</body>
</html>`
