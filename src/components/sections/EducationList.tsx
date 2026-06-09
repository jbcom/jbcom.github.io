import type { Education } from '@/content/resume'

export function EducationList({ items }: { items: Education[] }) {
  return (
    <div className="space-y-4">
      {items.map((edu) => (
        <div key={edu.institution}>
          <p className="text-sm font-medium text-foreground">
            {edu.studyType} — {edu.area}
          </p>
          <p className="text-xs text-muted-foreground">
            {edu.institution} | {edu.startDate}–{edu.endDate}
          </p>
          {edu.honors && (
            <p className="text-xs text-primary/70 italic mt-1">{edu.honors.join(' · ')}</p>
          )}
        </div>
      ))}
    </div>
  )
}
