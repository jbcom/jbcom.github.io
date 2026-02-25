import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import resume from '@/content/resume.json'
import { formatDateRange } from '@/lib/dates'
import { cn } from '@/lib/utils'

const { work, earlierCareer } = resume

interface CompanyEntry {
  id: string
  company: string
  years: string
  position: string
  summary: string | null
  highlights: string[]
}

// Build entries from resume data, newest first
const companies: CompanyEntry[] = work.map((job) => ({
  id: job.name.toLowerCase().replace(/\s+/g, '-'),
  company: job.name,
  years: formatDateRange(job.startDate, job.endDate),
  position: job.position,
  summary: job.summary,
  highlights: job.highlights ?? [],
}))

export function CareerPanel() {
  const [selected, setSelected] = useState(companies[0].id)
  const active = companies.find((c) => c.id === selected) ?? companies[0]

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-8">
      {/* Two-column: company list + detail */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left — Company list */}
        {/* Desktop: vertical sidebar. Mobile: horizontal scroll row */}
        <nav
          className="flex md:flex-col gap-1 md:w-64 shrink-0 overflow-x-auto md:overflow-x-visible scrollbar-hide pb-2 md:pb-0"
          aria-label="Career history"
        >
          {companies.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c.id)}
              className={cn(
                'flex items-baseline gap-2 px-3 py-2.5 rounded-md text-left whitespace-nowrap md:whitespace-normal transition-colors',
                'hover:bg-secondary/60',
                selected === c.id
                  ? 'bg-secondary text-foreground border-l-2 border-primary'
                  : 'text-muted-foreground border-l-2 border-transparent'
              )}
            >
              <span className="text-sm font-medium truncate md:truncate-none">{c.company}</span>
              <span className="text-xs text-muted-foreground shrink-0">({c.years})</span>
            </button>
          ))}
        </nav>

        {/* Right — Detail area */}
        <Card className="flex-1 border-border min-h-[300px]">
          <CardContent className="p-6 space-y-4">
            {/* Company + Role header */}
            <div>
              <h3 className="font-heading text-2xl text-foreground">{active.company}</h3>
              <p className="font-mono text-xs text-primary uppercase tracking-wider mt-1">
                {active.position}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{active.years}</p>
            </div>

            {/* Summary */}
            {active.summary && (
              <p className="text-sm text-muted-foreground leading-relaxed">{active.summary}</p>
            )}

            {/* Highlights */}
            {active.highlights.length > 0 && (
              <ul className="space-y-2">
                {active.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary shrink-0 mt-1">&#8226;</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Earlier Career */}
      <Card className="border-border">
        <CardContent className="p-6">
          <h3 className="font-heading text-lg text-foreground mb-3">Earlier Career</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {earlierCareer.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {earlierCareer.positions.map((pos) => (
              <Badge key={pos.name} variant="secondary" className="text-xs font-normal gap-1.5">
                <span className="font-medium">{pos.position}</span>
                <span className="text-muted-foreground">
                  @ {pos.name} ({pos.year})
                </span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
