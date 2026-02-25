/**
 * Generate Jon_Bogaty_Resume.pdf from resume.json
 *
 * Uses Playwright to render a print-optimized HTML page built from
 * the canonical resume data, then prints it to PDF.
 *
 * Requires: npx playwright install chromium
 * Usage: npx tsx scripts/generate-resume-pdf.ts
 * Output: public/Jon_Bogaty_Resume.pdf
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

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

// Build a print-optimized HTML page from resume data
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(resume.basics.name)} - Resume</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif;
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
    margin-top: 12pt;
    margin-bottom: 6pt;
  }

  .summary { font-size: 9pt; line-height: 1.45; margin-bottom: 4pt; }

  .competencies {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1pt 8pt;
    font-size: 8.5pt;
    margin-bottom: 4pt;
  }
  .competencies span::before { content: "\\2022  "; color: #996B1D; }

  .job { margin-bottom: 8pt; }
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
  <h1>${escapeHtml(resume.basics.name)}</h1>
  <div class="label">${escapeHtml(resume.basics.label)}</div>
  <div class="contact">
    ${escapeHtml(resume.basics.location.city)}, ${escapeHtml(resume.basics.location.region)} &nbsp;|&nbsp;
    <a href="mailto:${escapeHtml(resume.basics.email)}">${escapeHtml(resume.basics.email)}</a> &nbsp;|&nbsp;
    <a href="${escapeHtml(resume.basics.url)}">${escapeHtml(resume.basics.url)}</a>
    ${resume.basics.profiles.map((p) => `&nbsp;|&nbsp; <a href="${escapeHtml(p.url)}">${escapeHtml(p.url)}</a>`).join('')}
  </div>
</div>

<h2>Professional Summary</h2>
<p class="summary">${escapeHtml(resume.basics.summary)}</p>

<h2>Core Competencies</h2>
<div class="competencies">
${resume.competencies.map((c) => `  <span>${escapeHtml(c)}</span>`).join('\n')}
</div>

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

// Render to PDF with Playwright
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'load', timeout: 15000 })

  const pdfBuffer = await page.pdf({
    format: 'Letter',
    margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
    printBackground: true,
  })

  const outPath = resolve(import.meta.dirname!, '../public/Jon_Bogaty_Resume.pdf')
  writeFileSync(outPath, pdfBuffer)
  console.log(`PDF generated: ${outPath} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`)
} finally {
  await browser.close()
}
