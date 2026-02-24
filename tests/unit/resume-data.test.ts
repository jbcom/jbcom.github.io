import { describe, expect, it } from 'vitest'
import resume from '../../src/content/resume.json'

describe('resume.json data integrity', () => {
  it('has the correct name', () => {
    expect(resume.basics.name).toBe('Jon Bogaty')
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

  it('competencies has at least 10 items', () => {
    expect(resume.competencies.length).toBeGreaterThanOrEqual(10)
  })
})
