import {
  Award,
  Cloud,
  Code2,
  Cpu,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Server,
  TrendingDown,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type resume from '@/content/resume.json'

type Skills = typeof resume.skills
type Education = typeof resume.education

interface AboutProps {
  summary: string
  skills: Skills
  education: Education
  email: string
  location: { city: string; region: string }
  profiles: { network: string; url: string }[]
}

const stats = [
  { value: '15+', label: 'Years Experience', icon: Award },
  { value: '$100K+', label: 'Monthly Savings Driven', icon: TrendingDown },
  { value: '3', label: 'OSS Ecosystems', icon: Code2 },
  { value: '300+', label: 'Servers Managed', icon: Server },
]

export function AboutSection({
  summary,
  skills,
  education,
  email,
  location,
  profiles,
}: AboutProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-8">
      {/* Row 1: Bio (2/3) + Stats (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bio */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-heading text-2xl text-foreground">About Me</h2>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>{summary}</p>
            <p>
              Beyond enterprise work, I publish production-grade open-source tooling across three
              monorepo ecosystems: <strong className="text-foreground">Agentic</strong> (AI agent
              fleet orchestration in TypeScript, Python, and Rust), the{' '}
              <strong className="text-foreground">Extended Data Library</strong> (Python data
              serialization, structured logging, and cloud integrations), and the{' '}
              <strong className="text-foreground">Strata Game Library</strong> (React Three Fiber
              game framework with procedural terrain, GPU vegetation, and ECS architecture).
            </p>
            <p>
              I believe the best infrastructure is invisible — it should accelerate teams, not slow
              them down. Whether building self-maintaining Terraform factories, pioneering AI-driven
              operations before the frameworks existed, or shipping cost optimizations that save six
              figures monthly, I focus on outcomes that compound over time.
            </p>
          </div>
        </div>

        {/* Stats card */}
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center space-y-1">
                  <s.icon className="size-4 text-primary mx-auto mb-2" />
                  <p className="font-heading text-2xl text-foreground">{s.value}</p>
                  <p className="font-mono text-[0.6rem] text-muted-foreground uppercase tracking-wider leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Skills — divided grid (Features 4 pattern) */}
      <Card className="border-border overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {skills.map((cat, i) => {
            const icons = [Cloud, Cpu, Server, Code2, Award, Cloud, Code2, Cpu, Server]
            const Icon = icons[i % icons.length]
            return (
              <div
                key={cat.name}
                className="p-5 sm:[&:nth-child(n+3)]:border-t sm:lg:[&:nth-child(n+3)]:border-t-0 lg:[&:nth-child(n+4)]:border-t"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="size-3.5 text-primary" />
                  <h4 className="font-mono text-xs font-medium text-foreground uppercase tracking-wider">
                    {cat.name}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.keywords.map((kw) => (
                    <Badge key={kw} variant="secondary" className="text-[0.6rem] font-normal">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Row 3: Education + Contact + Resume — three equal columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Education */}
        <Card className="border-border">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="size-4 text-primary" />
              <h3 className="font-heading text-lg text-foreground">Education</h3>
            </div>
            {education.map((edu) => (
              <div key={edu.institution}>
                <p className="text-sm font-medium text-foreground">
                  {edu.studyType} &mdash; {edu.area}
                </p>
                <p className="text-xs text-muted-foreground">
                  {edu.institution} | {edu.startDate}&ndash;{edu.endDate}
                </p>
                {edu.honors && (
                  <p className="text-xs text-primary/80 italic mt-1">{edu.honors.join(' · ')}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border-border">
          <CardContent className="p-6 space-y-3">
            <h3 className="font-heading text-lg text-foreground mb-1">Contact</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" />
              {location.city}, {location.region} · Open to remote
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="size-3.5 shrink-0 text-muted-foreground" />
              <a
                href={`mailto:${email}`}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                {email}
              </a>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-2">
              {profiles.map((p) => {
                const Icon =
                  p.network === 'GitHub'
                    ? Github
                    : p.network === 'LinkedIn'
                      ? Linkedin
                      : MessageCircle
                return (
                  <Button key={p.network} variant="outline" size="sm" className="gap-2" asChild>
                    <a href={p.url} target="_blank" rel="noopener noreferrer">
                      <Icon className="size-3.5" />
                      {p.network}
                    </a>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Resume downloads */}
        <Card className="border-border">
          <CardContent className="p-6 space-y-3">
            <h3 className="font-heading text-lg text-foreground mb-1">Resume</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Download the latest version of my resume in your preferred format.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-primary/30 hover:border-primary/60 w-full justify-start"
                asChild
              >
                <a href="/Jon_Bogaty_Resume.pdf" download>
                  <Download className="size-3.5" />
                  Download PDF
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground w-full justify-start"
                asChild
              >
                <a href="/Jon_Bogaty_Resume.docx" download>
                  <Download className="size-3.5" />
                  Download DOCX
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
