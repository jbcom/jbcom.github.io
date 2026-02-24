import { describe, expect, it } from 'vitest'
import { formatDateRange } from '../../src/lib/dates'

describe('formatDateRange', () => {
  it('formats a full date range with month and year', () => {
    expect(formatDateRange('2021-06', '2026-01')).toBe('Jun 2021 \u2013 Jan 2026')
  })

  it('formats another full date range', () => {
    expect(formatDateRange('2020-08', '2021-06')).toBe('Aug 2020 \u2013 Jun 2021')
  })

  it('formats year-only date ranges', () => {
    expect(formatDateRange('2007', '2009')).toBe('2007 \u2013 2009')
  })

  it('shows "Present" when end date is undefined', () => {
    expect(formatDateRange('2021-06')).toBe('Jun 2021 \u2013 Present')
  })

  it('shows "Present" when end date is null', () => {
    expect(formatDateRange('2021-06', null)).toBe('Jun 2021 \u2013 Present')
  })
})
