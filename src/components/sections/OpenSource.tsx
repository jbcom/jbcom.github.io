import { ExternalLink } from 'lucide-react'
import type { Project, ProjectCategory } from '@/content/resume'

/** Color is category, never decoration. */
const CATEGORY_ACCENT: Record<ProjectCategory, string> = {
  security: 'var(--brand-amber)',
  agents: 'var(--brand-steel)',
  data: 'var(--brand-success)',
  '3d': 'var(--brand-purple)',
}

function ProjectPanel({ project }: { project: Project }) {
  const accent = CATEGORY_ACCENT[project.category]
  return (
    <article className="border-l-2 pl-5 sm:pl-6 py-1 flex flex-col" style={{ borderColor: accent }}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-heading text-2xl text-foreground">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            {project.name}
          </a>
        </h3>
        {project.domain && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.65rem] text-muted-foreground hover:text-primary transition-colors shrink-0 inline-flex items-center gap-1"
          >
            {project.domain}
            <ExternalLink className="size-3" />
          </a>
        )}
      </div>

      <p className="font-mono text-xs uppercase tracking-wider mt-1" style={{ color: accent }}>
        {project.tagline}
      </p>

      <p className="text-sm text-muted-foreground leading-relaxed mt-3">{project.description}</p>

      {project.packages && (
        <dl className="mt-4">
          {project.packages.map((pkg) => (
            <div key={pkg.name} className="py-1.5 border-b border-border/50 last:border-0">
              <dt>
                <code className="font-mono text-xs text-foreground">{pkg.name}</code>
              </dt>
              <dd className="text-xs text-muted-foreground mt-0.5">{pkg.description}</dd>
            </div>
          ))}
        </dl>
      )}

      {project.tech && (
        <p className="font-mono text-[0.7rem] text-muted-foreground/80 mt-auto pt-4">
          {project.tech.join(' · ')}
        </p>
      )}
    </article>
  )
}

export function OpenSource({ items, lead }: { items: Project[]; lead: string }) {
  return (
    <div className="space-y-10">
      <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{lead}</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-10">
        {items.map((project) => (
          <ProjectPanel key={project.name} project={project} />
        ))}
      </div>
    </div>
  )
}
