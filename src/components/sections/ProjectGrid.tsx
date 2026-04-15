import { ExternalLink, Globe, Package } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type resume from '@/content/resume.json'

const ACCENTS = [
  'var(--brand-amber)',
  'var(--brand-steel)',
  'var(--brand-success)',
  'var(--brand-purple)',
  'var(--brand-pink)',
]

function accentFor(slug: string): string {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0
  return ACCENTS[h % ACCENTS.length]
}

export function ProjectGrid({ items }: { items: typeof resume.projects }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {items.map((project) => {
        const accent = accentFor(project.name)
        return (
          <Card
            key={project.name}
            className="border-border hover:border-[var(--project-accent)]/40 transition-all duration-300 overflow-hidden relative flex flex-col"
            style={{ '--project-accent': accent } as React.CSSProperties}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accent }} />
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                {project.domain && (
                  <Badge
                    variant="outline"
                    className="border-[var(--project-accent)]/30 text-[var(--project-accent)] text-xs"
                  >
                    <Globe className="size-3 mr-1" />
                    {project.domain}
                  </Badge>
                )}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`${project.name} on GitHub`}
                >
                  <ExternalLink className="size-4" />
                </a>
              </div>
              <CardTitle className="font-heading text-2xl font-normal mt-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--project-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--project-accent)] rounded"
                >
                  {project.name}
                </a>
              </CardTitle>
              {project.tagline && (
                <CardDescription
                  className="font-mono text-xs uppercase tracking-wider"
                  style={{ color: accent }}
                >
                  {project.tagline}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4 pt-0 flex-1 flex flex-col">
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              {project.tech && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
              {project.packages && (
                <div className="mt-auto">
                  <Separator />
                  <div className="space-y-2 pt-3">
                    <h4 className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Package className="size-3" />
                      Packages
                    </h4>
                    <div className="space-y-1.5">
                      {project.packages.map((pkg) => (
                        <div key={pkg.name} className="flex items-baseline gap-2">
                          <code className="font-mono text-xs text-foreground shrink-0">
                            {pkg.name}
                          </code>
                          <span className="text-xs text-muted-foreground leading-tight">
                            {pkg.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
