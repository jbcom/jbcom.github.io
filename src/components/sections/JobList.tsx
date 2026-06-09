import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import type { Resume, WorkEntry } from '@/content/resume'
import { formatDateRange } from '@/lib/dates'
import { cn } from '@/lib/utils'

const CLOUD_TECH = new Set(['AWS', 'GCP', 'Azure'])

export function JobList({
  jobs,
  earlierCareer,
}: {
  jobs: WorkEntry[]
  earlierCareer: Resume['earlierCareer']
}) {
  const [selected, setSelected] = useState(0)
  const active = jobs[selected]
  const cloud = (active.tech ?? []).filter((t) => CLOUD_TECH.has(t))
  const rest = (active.tech ?? []).filter((t) => !CLOUD_TECH.has(t))

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <nav className="flex md:flex-col gap-1 md:w-56 shrink-0 overflow-x-auto md:overflow-x-visible scrollbar-hide scroll-fade-x md:[mask-image:none] pb-2 md:pb-0">
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

        <div className="flex-1 border-l-2 border-border pl-6 sm:pl-8 py-1">
          <h3 className="font-heading text-2xl text-foreground">{active.name}</h3>
          <p className="font-mono text-xs text-primary uppercase tracking-wider mt-1">
            {active.position} · {formatDateRange(active.startDate, active.endDate)}
          </p>

          {(cloud.length > 0 || rest.length > 0) && (
            <div className="flex items-center gap-2 flex-wrap mt-4">
              {cloud.map((t) => (
                <Badge
                  key={t}
                  className="text-xs font-normal bg-primary/15 text-primary hover:bg-primary/20"
                >
                  {t}
                </Badge>
              ))}
              {rest.length > 0 && (
                <span className="font-mono text-xs text-muted-foreground">
                  {rest.join(', ').toLowerCase()}
                </span>
              )}
            </div>
          )}

          {active.summary && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">{active.summary}</p>
          )}

          {active.highlights.length > 0 && (
            <ul className="space-y-2.5 mt-4">
              {active.highlights.map((h, i) => (
                <li
                  key={h}
                  className={cn(
                    'flex gap-2.5 leading-relaxed',
                    i < 2 ? 'text-sm text-foreground/90' : 'text-sm text-muted-foreground'
                  )}
                >
                  <span className="text-primary shrink-0 mt-0.5">{i < 2 ? '▸' : '•'}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="max-w-3xl">
        <h3 className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Before 2017
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{earlierCareer.summary}</p>
      </div>
    </div>
  )
}
