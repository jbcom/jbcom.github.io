const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return 'Present'
  const parts = dateStr.split('-')
  if (parts.length === 1) return parts[0]
  const month = months[Number.parseInt(parts[1], 10) - 1]
  return `${month} ${parts[0]}`
}

export function formatDateRange(startDate: string, endDate?: string | null): string {
  const start = formatDate(startDate)
  const end = endDate ? formatDate(endDate) : 'Present'
  return `${start} – ${end}`
}
