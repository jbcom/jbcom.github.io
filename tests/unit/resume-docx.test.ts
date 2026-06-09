/**
 * Structural QC for the compiled DOCX — the assertions that would have
 * caught unstyled pandoc output (and its embedded site-nav text) shipping
 * unnoticed. Visual QC is `pnpm resume:qc`; this suite is the fast gate.
 */

import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { buildResumeDocx } from '../../scripts/resume/build-docx'
import { resumeDocxHtml } from '../../scripts/resume/template'
import resume from '../../src/content/resume'

let dir: string
let documentXml: string
let documentText: string

beforeAll(async () => {
  dir = mkdtempSync(join(tmpdir(), 'resume-docx-'))
  const docxPath = join(dir, 'resume.docx')
  await buildResumeDocx(docxPath)
  documentXml = execFileSync('unzip', ['-p', docxPath, 'word/document.xml'], {
    encoding: 'utf-8',
    maxBuffer: 32 * 1024 * 1024,
  })
  documentText = documentXml
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
}, 60_000)

afterAll(() => {
  rmSync(dir, { recursive: true, force: true })
})

describe('compiled DOCX structure', () => {
  it('contains the name and headline', () => {
    expect(documentText).toContain(resume.about.name)
    expect(documentText).toContain(resume.about.label)
  })

  it('contains no site-navigation text (the pandoc regression)', () => {
    expect(documentText).not.toContain('Download PDF')
    expect(documentText).not.toContain('Download DOCX')
    expect(documentText).not.toContain('← jonbogaty.com')
  })

  it('contains every resume work position and company, and no site-only roles', () => {
    for (const job of resume.work.filter((j) => j.onResume !== false)) {
      expect(documentText, `missing position: ${job.position}`).toContain(job.position)
      expect(documentText, `missing company: ${job.name}`).toContain(job.name)
    }
    // Site-only entries must not appear as positions (companies may be
    // referenced in the Earlier Career paragraph).
    expect(documentText).not.toContain('Open-Source Infrastructure & Supply-Chain Security')
    expect(documentText).not.toContain('Senior Systems Operations Engineer')
  })

  it('contains every section heading', () => {
    for (const heading of [
      'PROFESSIONAL SUMMARY',
      'PROFESSIONAL EXPERIENCE',
      'OPEN SOURCE',
      'EARLIER CAREER',
      'TECHNICAL SKILLS',
      'EDUCATION',
    ]) {
      expect(documentText).toContain(heading)
    }
  })

  it('excludes site-only projects and site-flavor copy', () => {
    expect(documentText).not.toContain('Strata Game Library')
    expect(documentText).not.toContain('immortal, savage') // site-flavor copy stays off the resume
    expect(documentText).toContain('jonbogaty.com') // the OSS section points at the site
  })

  it('carries the styled fonts (not converter defaults only)', () => {
    expect(documentXml).toContain('Georgia')
    expect(documentXml).toContain('Calibri')
  })

  it('has no template artifacts', () => {
    for (const artifact of ['undefined', '[object Object]', '[object', 'NaN']) {
      expect(documentText, `template artifact "${artifact}" leaked`).not.toContain(artifact)
    }
    expect(documentXml, 'double-encoded entities leaked').not.toContain('&amp;amp;')
  })

  it('renders dates for resume jobs in the HTML source', () => {
    const html = resumeDocxHtml()
    expect(html).toContain('Jun 2021 – Jan 2026')
    expect(html).toContain('Aug 2020 – Jun 2021')
  })
})
