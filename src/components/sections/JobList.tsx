import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type resume from '@/content/resume.json'
import { formatDateRange } from '@/lib/dates'
import { cn } from '@/lib/utils'

const CLOUD_TECH = new Set(['AWS', 'GCP', 'Azure'])

export function JobList({ jobs }: { jobs: typeof resume.work }) {
  const [selected, setSelected] = useState(0)
  const active = jobs[selected]

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <nav className="flex md:flex-col gap-1 md:w-64 shrink-0 overflow-x-auto md:overflow-x-visible scrollbar-hide scroll-fade-x md:[mask-image:none] pb-2 md:pb-0">
        {jobs.map((job, i) => (
          <button
            key={job.name}
            type="button"
            onClick={() => setSelected(i)}
            className={cn(
              'flex flex-col items-start px-3 py-2.5 rounded-md text-left whitespace-nowrap md:whitespace-normal transition-colors hover:bg-secondary/60 min-w-fit',
              selected === i
                ? 'bg-secondary text-foreground border-l-2 border-primary'
                : 'text-muted-foreground border-l-2 border-transparent'
            )}
          >
            <span className="text-sm font-medium">{job.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatDateRange(job.startDate, job.endDate)}
            </span>
          </button>
        ))}
      </nav>

      <Card className="flex-1 border-border">
        <CardContent className="p-6 space-y-4">
          <div>
            <h3 className="font-heading text-2xl text-foreground">{active.name}</h3>
            <p className="font-mono text-xs text-primary uppercase tracking-wider mt-1">
              {active.position}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDateRange(active.startDate, active.endDate)}
            </p>
          </div>

          {'tech' in active && Array.isArray(active.tech) && active.tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {(active.tech as string[]).map((t) => (
                <Badge
                  key={t}
                  variant={CLOUD_TECH.has(t) ? 'default' : 'secondary'}
                  className={cn(
                    'text-xs font-normal',
                    CLOUD_TECH.has(t) && 'bg-primary/15 text-primary hover:bg-primary/20'
                  )}
                >
                  {t}
                </Badge>
              ))}
            </div>
          )}

          {active.summary && (
            <p className="text-sm text-muted-foreground leading-relaxed">{active.summary}</p>
          )}

          {(active.highlights ?? []).length > 0 && (
            <ul className="space-y-2">
              {(active.highlights ?? []).map((h) => (
                <li key={h} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary shrink-0 mt-1">&#8226;</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          {'departureContext' in active && active.departureContext && (
            <p className="text-xs italic text-muted-foreground/70 pt-2 border-t border-border/50">
              {active.departureContext as string}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
