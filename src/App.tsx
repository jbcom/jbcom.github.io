import { ExternalLink, Globe, Package } from 'lucide-react'
import { useState } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { SiteFooter } from '@/components/SiteFooter'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import resume from '@/content/resume.json'
import { formatDateRange } from '@/lib/dates'
import { cn } from '@/lib/utils'

// Every top-level key in resume.json is a tab. "about" goes first.
const sectionKeys = Object.keys(resume).sort((a, b) => (a === 'about' ? -1 : b === 'about' ? 1 : 0))

// camelCase → Title Case
function labelFromKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

const PROJECT_ACCENTS = ['#E8A849', '#6B8BAD', '#4ADE80']

// Generic renderer — inspects the shape of each resume.json section and renders it
function SectionRenderer({ data }: { data: unknown }) {
  // Plain string → paragraph (e.g. basics.about)
  if (typeof data === 'string') {
    return <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{data}</p>
  }

  // Array of strings → bullet grid
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'string') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
        {(data as string[]).map((item) => (
          <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-primary">&#8226;</span>
            {item}
          </div>
        ))}
      </div>
    )
  }

  // Array of objects — inspect the first item's shape to decide rendering
  if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
    const sample = data[0] as Record<string, unknown>

    // Work experience: has position + startDate + highlights
    if ('position' in sample && 'startDate' in sample && 'highlights' in sample) {
      return <JobList jobs={data as typeof resume.work} />
    }

    // Skills: has name + keywords
    if ('name' in sample && 'keywords' in sample) {
      return <SkillGrid categories={data as typeof resume.skills} />
    }

    // Projects: has name + description + url + tech
    if ('url' in sample && 'tech' in sample) {
      return <ProjectGrid items={data as typeof resume.projects} />
    }

    // Education: has institution + studyType
    if ('institution' in sample && 'studyType' in sample) {
      return <EducationList items={data as typeof resume.education} />
    }

    // Fallback for unknown object arrays: render as JSON-like cards
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(data as Record<string, unknown>[]).map((item) => (
          <Card key={JSON.stringify(item)} className="border-border">
            <CardContent className="p-4">
              {Object.entries(item).map(([k, v]) => (
                <p key={k} className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{labelFromKey(k)}:</span>{' '}
                  {String(v)}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // About object: has name, summary, email, location, profiles
  if (
    typeof data === 'object' &&
    data !== null &&
    'summary' in (data as Record<string, unknown>) &&
    'email' in (data as Record<string, unknown>) &&
    'profiles' in (data as Record<string, unknown>)
  ) {
    const info = data as typeof resume.about
    return (
      <div className="space-y-6 max-w-3xl">
        {(Array.isArray(info.summary) ? info.summary : [info.summary]).map((p) => (
          <p key={p} className="text-sm text-muted-foreground leading-relaxed">
            {p}
          </p>
        ))}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>
            {info.location.city}, {info.location.region}
          </span>
          <span>·</span>
          <a
            href={`mailto:${info.email}`}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            {info.email}
          </a>
        </div>
        <div className="flex flex-wrap gap-2">
          {info.profiles.map((p) => (
            <a
              key={p.network}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {p.network}
            </a>
          ))}
        </div>
      </div>
    )
  }

  // Object with summary + positions (earlierCareer shape)
  if (
    typeof data === 'object' &&
    data !== null &&
    'summary' in (data as Record<string, unknown>) &&
    'positions' in (data as Record<string, unknown>)
  ) {
    const ec = data as typeof resume.earlierCareer
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{ec.summary}</p>
        <div className="flex flex-wrap gap-2">
          {ec.positions.map((pos) => (
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

  // Fallback: stringify
  return <pre className="text-sm text-muted-foreground">{JSON.stringify(data, null, 2)}</pre>
}

// --- Sub-renderers for specific data shapes ---

function JobList({ jobs }: { jobs: typeof resume.work }) {
  const [selected, setSelected] = useState(0)
  const active = jobs[selected]
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <nav className="flex md:flex-col gap-1 md:w-64 shrink-0 overflow-x-auto md:overflow-x-visible scrollbar-hide pb-2 md:pb-0">
        {jobs.map((job, i) => (
          <button
            key={job.name}
            type="button"
            onClick={() => setSelected(i)}
            className={cn(
              'flex items-baseline gap-2 px-3 py-2.5 rounded-md text-left whitespace-nowrap md:whitespace-normal transition-colors hover:bg-secondary/60',
              selected === i
                ? 'bg-secondary text-foreground border-l-2 border-primary'
                : 'text-muted-foreground border-l-2 border-transparent'
            )}
          >
            <span className="text-sm font-medium truncate md:truncate-none">{job.name}</span>
            <span className="text-xs text-muted-foreground shrink-0">
              ({formatDateRange(job.startDate, job.endDate)})
            </span>
          </button>
        ))}
      </nav>
      <Card className="flex-1 border-border min-h-[300px]">
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
        </CardContent>
      </Card>
    </div>
  )
}

function SkillGrid({ categories }: { categories: typeof resume.skills }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => (
        <Card key={cat.name} className="border-border">
          <CardContent className="p-4">
            <h3 className="font-mono text-xs font-medium text-primary uppercase tracking-wider mb-2">
              {cat.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.keywords.map((kw) => (
                <Badge key={kw} variant="secondary" className="text-[0.6rem] font-normal">
                  {kw}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ProjectGrid({ items }: { items: typeof resume.projects }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {items.map((project, i) => {
        const accent = PROJECT_ACCENTS[i % PROJECT_ACCENTS.length]
        return (
          <Card
            key={project.name}
            className="border-border hover:border-[var(--project-accent)]/30 transition-all duration-300 overflow-hidden relative"
            style={{ '--project-accent': accent } as React.CSSProperties}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: accent }} />
            <CardHeader>
              <div className="flex items-center justify-between">
                {project.domain && (
                  <Badge
                    variant="outline"
                    className="border-[var(--project-accent)]/25 text-[var(--project-accent)] text-[0.65rem]"
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
                {project.name}
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
            <CardContent className="space-y-4 pt-0">
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              {project.tech && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-[0.65rem] font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
              {project.packages && (
                <>
                  <Separator />
                  <div className="space-y-2">
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
                          <span className="text-[0.65rem] text-muted-foreground leading-tight">
                            {pkg.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function EducationList({ items }: { items: typeof resume.education }) {
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

// --- App: hero from basics, tabs auto-generated from every other key ---

export default function App() {
  return (
    <Tabs defaultValue={sectionKeys[0]} className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-center h-14">
          <TabsList
            variant="line"
            className="bg-transparent border-0 h-14 gap-0 overflow-x-auto scrollbar-hide"
          >
            {sectionKeys.map((key) => (
              <TabsTrigger
                key={key}
                value={key}
                className="text-sm font-medium h-14 rounded-none data-[state=active]:after:bg-primary whitespace-nowrap"
              >
                {labelFromKey(key)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </header>

      <HeroSection
        name={resume.about.name}
        label={resume.about.label}
        summary={
          Array.isArray(resume.about.summary) ? resume.about.summary[0] : resume.about.summary
        }
      />

      <main className="flex-1">
        {sectionKeys.map((key) => (
          <TabsContent key={key} value={key} className="mt-0">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
              <h2 className="font-heading text-2xl text-foreground mb-6">{labelFromKey(key)}</h2>
              <SectionRenderer data={(resume as Record<string, unknown>)[key]} />
            </div>
          </TabsContent>
        ))}
      </main>

      <SiteFooter />
    </Tabs>
  )
}
