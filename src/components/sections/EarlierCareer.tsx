import { Badge } from '@/components/ui/badge'
import type resume from '@/content/resume.json'

export function EarlierCareer({ data }: { data: typeof resume.earlierCareer }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground leading-relaxed">{data.summary}</p>
      <div className="flex flex-wrap gap-2">
        {data.positions.map((pos) => (
          <Badge key={pos.name} variant="secondary" className="text-xs font-normal gap-1.5">
            <span className="font-medium">{pos.position}</span>
            <span className="text-muted-foreground">
              @ {pos.name} ({pos.year})
            </span>
          </Badge>
        ))}
      </div>
    </div>
  )
}
