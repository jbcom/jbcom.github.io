import { ExternalLink, Globe, Package } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface Project {
  name: string
  domain: string
  repo: string
  accent: string
  tagline: string
  description: string
  tech: string[]
  packages: { name: string; description: string }[]
}

const projects: Project[] = [
  {
    name: 'Agentic',
    domain: 'agentic.coach',
    repo: 'https://github.com/jbcom/agentic-control',
    accent: '#E8A849',
    tagline: 'Polyglot AI Agent Orchestration',
    description:
      'Production-ready framework for building intelligent agent fleets across TypeScript, Python, and Rust. Fleet management, AI-powered triage, framework-agnostic crew orchestration, sandbox execution, and 4 GitHub Marketplace Actions.',
    tech: [
      'TypeScript',
      'Python',
      'Rust',
      'Vercel AI SDK',
      'CrewAI',
      'LangGraph',
      'Bevy',
      'Docker',
    ],
    packages: [
      { name: '@jbcom/agentic', description: 'Fleet management & multi-agent routing' },
      { name: '@jbcom/agentic-triage', description: 'AI-powered issue triage & PR review' },
      { name: 'agentic-crew', description: 'Framework-agnostic crew orchestration' },
      { name: 'game-generator', description: 'Visual-first vintage game generator (Rust/Bevy)' },
    ],
  },
  {
    name: 'Extended Data Library',
    domain: 'extended-data.dev',
    repo: 'https://github.com/jbcom/extended-data-types',
    accent: '#6B8BAD',
    tagline: 'Production Python Data Toolkit',
    description:
      'Battle-tested Python monorepo for data serialization, configuration management, structured logging, and cloud integrations. 5 independently-installable PyPI packages with strict typing, 75%+ test coverage, and MCP server support.',
    tech: ['Python', 'Go', 'FastAPI', 'Pydantic', 'boto3', 'Vault', 'Anthropic SDK'],
    packages: [
      {
        name: 'extended-data-types',
        description: 'Multi-format serialization (YAML, JSON, TOML, HCL)',
      },
      {
        name: 'lifecyclelogging',
        description: 'Lifecycle-aware structured logging with rich output',
      },
      { name: 'vendor-connectors', description: 'Universal cloud & AI service connectors' },
      { name: 'secretssync', description: 'Enterprise secret sync pipeline (Go)' },
    ],
  },
  {
    name: 'Strata Game Library',
    domain: 'strata.game',
    repo: 'https://github.com/jbcom/strata-game-library',
    accent: '#4ADE80',
    tagline: 'React Three Fiber Game Framework',
    description:
      'Complete game framework for building procedural 3D worlds. Terrain generation, advanced water, GPU vegetation, volumetric effects, ECS architecture, physics, AI pathfinding, and character animation — all in a declarative React API.',
    tech: ['React Three Fiber', 'Three.js', 'TypeScript', 'GLSL', 'Rapier', 'Tone.js', 'Nx'],
    packages: [
      {
        name: '@strata-game-library/core',
        description: 'R3F components, ECS, physics, AI, animation',
      },
      { name: '@strata-game-library/shaders', description: 'Standalone GLSL shaders for Three.js' },
      { name: '@strata-game-library/presets', description: '30+ production configurations' },
      {
        name: '@strata-game-library/audio-synth',
        description: 'Procedural audio synthesis (Tone.js)',
      },
    ],
  },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="border-border hover:border-[var(--project-accent)]/30 transition-all duration-300 group overflow-hidden relative">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: project.accent }} />

      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="border-[var(--project-accent)]/25 text-[var(--project-accent)] text-[0.65rem]"
            style={{ '--project-accent': project.accent } as React.CSSProperties}
          >
            <Globe className="size-3 mr-1" />
            {project.domain}
          </Badge>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`${project.name} on GitHub`}
          >
            <ExternalLink className="size-4" />
          </a>
        </div>
        <CardTitle className="font-heading text-2xl font-normal mt-2">{project.name}</CardTitle>
        <CardDescription
          className="font-mono text-xs uppercase tracking-wider"
          style={{ color: project.accent }}
        >
          {project.tagline}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge key={t} variant="secondary" className="text-[0.65rem] font-normal">
              {t}
            </Badge>
          ))}
        </div>

        <Separator />

        {/* Package list */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Package className="size-3" />
            Packages
          </h4>
          <div className="space-y-1.5">
            {project.packages.map((pkg) => (
              <div key={pkg.name} className="flex items-baseline gap-2">
                <code className="font-mono text-xs text-foreground shrink-0">{pkg.name}</code>
                <span className="text-[0.65rem] text-muted-foreground leading-tight">
                  {pkg.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProjectsPanel() {
  return (
    <div className="space-y-0">
      {/* Intro */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-8">
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
          Three monorepo ecosystems spanning AI orchestration, data infrastructure, and game
          development. Each is independently published, fully tested, and documented with its own
          domain.
        </p>
      </section>

      {/* Project Cards */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>

      <Separator />

      {/* GitHub CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-10 text-center">
        <p className="text-sm text-muted-foreground mb-2">All repositories and contributions</p>
        <a
          href="https://github.com/jbcom"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          github.com/jbcom &rarr;
        </a>
      </section>
    </div>
  )
}
