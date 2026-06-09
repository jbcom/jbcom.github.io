import { describe, expect, it } from 'vitest'
import resume from '../../src/content/resume'

describe('resume data integrity', () => {
  it('has the correct name', () => {
    expect(resume.about.name).toBe('Jon Bogaty')
  })

  it('headline is a single title, not a pipe-stacked keyword list', () => {
    expect(resume.about.label).not.toContain('|')
  })

  it('all work entries have non-empty highlights arrays', () => {
    for (const job of resume.work) {
      expect(job.highlights.length, `${job.name} should have highlights`).toBeGreaterThan(0)
    }
  })

  it('all work entries have valid date formats (YYYY-MM or YYYY)', () => {
    const datePattern = /^\d{4}(-\d{2})?$/

    for (const job of resume.work) {
      expect(job.startDate, `${job.name} startDate "${job.startDate}"`).toMatch(datePattern)
      if (job.endDate) {
        expect(job.endDate, `${job.name} endDate "${job.endDate}"`).toMatch(datePattern)
      }
    }
  })

  it('skills array has at least 5 categories', () => {
    expect(resume.skills.length).toBeGreaterThanOrEqual(5)
  })

  it('no work entry has "Present" as endDate (FSC ended Jan 2026)', () => {
    for (const job of resume.work) {
      expect(job.endDate, `${job.name} should not have "Present" as endDate`).not.toBe('Present')
    }
  })

  it('education has honors array', () => {
    for (const edu of resume.education) {
      expect(Array.isArray(edu.honors), `${edu.institution} should have honors array`).toBe(true)
      expect(edu.honors.length, `${edu.institution} honors should not be empty`).toBeGreaterThan(0)
    }
  })

  it('all skill categories have keywords', () => {
    for (const cat of resume.skills) {
      expect(cat.keywords.length, `${cat.name} should have keywords`).toBeGreaterThan(0)
    }
  })

  it('contains no LLM-tell phrases in user-facing copy', () => {
    const tells = [
      /battle-tested/i,
      /production-ready/i,
      /track record of/i,
      /cutting[- ]edge/i,
      /spearheaded/i,
      /industry-wide adoption/i,
    ]
    const corpus = JSON.stringify(resume)
    for (const tell of tells) {
      expect(corpus, `copy should not contain "${tell.source}"`).not.toMatch(tell)
    }
  })

  it('does not explain the Flipside departure anywhere (cover-letter material)', () => {
    const corpus = JSON.stringify(resume).toLowerCase()
    expect(corpus).not.toContain('departure')
    expect(corpus).not.toContain('workforce reduction')
    expect(corpus).not.toContain('role eliminated')
  })

  it('at least one project is resume-worthy and Strata stays site-only', () => {
    const onResume = resume.projects.filter((p) => p.onResume !== false)
    expect(onResume.length).toBeGreaterThanOrEqual(3)
    const strata = resume.projects.find((p) => p.name.includes('Strata'))
    expect(strata?.onResume).toBe(false)
  })
})
