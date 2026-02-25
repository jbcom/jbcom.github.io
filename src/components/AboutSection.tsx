import {
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

export function AboutSection({
  summary,
  skills,
  education,
  email,
  location,
  profiles,
}: AboutProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-10">
      {/* Bio — expanded to sell career + OSS */}
      <section className="max-w-4xl">
        <h2 className="font-heading text-2xl text-foreground mb-4">About Me</h2>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>{summary}</p>
          <p>
            Beyond enterprise work, I publish production-grade open-source tooling across three
            monorepo ecosystems: <strong className="text-foreground">Agentic</strong> (AI agent
            fleet orchestration in TypeScript, Python, and Rust), the{' '}
            <strong className="text-foreground">Extended Data Library</strong> (Python data
            serialization, structured logging, and cloud integrations), and the{' '}
            <strong className="text-foreground">Strata Game Library</strong> (React Three Fiber game
            framework with procedural terrain, GPU vegetation, and ECS architecture). Each is
            independently published to package registries with strict typing and automated CI/CD.
          </p>
          <p>
            I believe the best infrastructure is invisible — it should accelerate teams, not slow
            them down. Whether building self-maintaining Terraform factories, pioneering AI-driven
            operations before the frameworks existed, or shipping cost optimizations that save six
            figures monthly, I focus on outcomes that compound over time.
          </p>
        </div>
      </section>

      {/* Skills + Education + Contact — multi-column */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Technical Skills */}
        <Card className="md:col-span-2 lg:col-span-2 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-lg font-normal">Technical Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((cat) => (
                <div key={cat.name}>
                  <h4 className="font-mono text-xs font-medium text-primary uppercase tracking-wider mb-2">
                    {cat.name}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.keywords.map((kw) => (
                      <Badge key={kw} variant="secondary" className="text-[0.65rem] font-normal">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Education + Contact stacked */}
        <div className="space-y-6">
          {/* Education */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="font-heading text-lg font-normal flex items-center gap-2">
                <GraduationCap className="size-4 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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
            <CardHeader className="pb-3">
              <CardTitle className="font-heading text-lg font-normal">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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

              <Separator />

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-primary/30 hover:border-primary/60"
                  asChild
                >
                  <a href="/Jon_Bogaty_Resume.pdf" download>
                    <Download className="size-3.5" />
                    Resume PDF
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
                  <a href="/Jon_Bogaty_Resume.docx" download>
                    <Download className="size-3.5" />
                    DOCX
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
