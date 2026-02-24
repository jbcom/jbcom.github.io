import { Briefcase, Code, Github, Linkedin, MessageCircle } from 'lucide-react'
import type { CareerEntry } from '@/components/CareerTimeline'
import { CareerTimeline } from '@/components/CareerTimeline'
import { HeroSection } from '@/components/HeroSection'
import { ProjectsPanel } from '@/components/ProjectsPanel'
import { SiteFooter } from '@/components/SiteFooter'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import resume from '@/content/resume.json'
import { formatDateRange } from '@/lib/dates'

const { work, earlierCareer, skills } = resume

function findWork(name: string) {
  const entry = work.find((w) => w.name === name)
  if (!entry) throw new Error(`Work entry "${name}" not found in resume.json`)
  return entry
}

// Build career timeline entries from resume data, oldest first
// User scrolls right = forward in time, defaulting to the most recent (FSC)
const gohealth = findWork('GoHealth')
const symbiont = findWork('Symbiont')
const jumpRamp = findWork('Jump Ramp')
const qualia = findWork('Qualia Media')
const classpass = findWork('ClassPass')
const magnetic = findWork('Magnetic')

const timelineEntries: CareerEntry[] = [
  {
    company: magnetic.name,
    role: magnetic.position,
    period: formatDateRange(magnetic.startDate, magnetic.endDate),
    description:
      'Managed 300+ machine infrastructure for a multinational ad-tech firm. Designed Chef cookbook overhauls and integrated Rundeck with PAM.',
    skills: ['Chef', 'Rundeck', 'Linux', '300+ Servers'],
  },
  {
    company: classpass.name,
    role: classpass.position,
    period: formatDateRange(classpass.startDate, classpass.endDate),
    description:
      'Early Docker and Terraform champion — containerized production services and built IaC pipelines before mainstream adoption.',
    skills: ['Docker', 'Terraform', 'Packer', 'Vagrant', 'AWS'],
    highlights: classpass.highlights?.slice(0, 2),
    milestone: 'Early Docker & Terraform Adopter',
  },
  {
    company: qualia.name,
    role: qualia.position,
    period: formatDateRange(qualia.startDate, qualia.endDate),
    description:
      'Automated cloud infrastructure with Terraform and custom Ruby tooling. Built CI/CD systems and a metrics-based auto-scaler for Google Cloud.',
    skills: ['Terraform', 'Ruby', 'GCP', 'Pub/Sub', 'Auto-Scaling'],
  },
  {
    company: jumpRamp.name,
    role: jumpRamp.position,
    period: formatDateRange(jumpRamp.startDate, jumpRamp.endDate),
    description:
      'Modernized deployment with Docker containerization, restructured CI/CD, and overhauled network security with automated VPN bridging.',
    skills: ['Docker', 'CI/CD', 'VPN', 'Network Security'],
  },
  {
    company: symbiont.name,
    role: symbiont.position,
    period: formatDateRange(symbiont.startDate, symbiont.endDate),
    description:
      'Owned enterprise CI/CD platform. Designed multi-cloud deployment architecture across AWS, GCP, and Azure for blockchain product engineering.',
    skills: ['AWS', 'GCP', 'Azure', 'Terraform', 'Ansible', 'Packer'],
    highlights: symbiont.highlights?.slice(0, 2),
    milestone: 'Multi-Cloud IaC Pioneer',
  },
  {
    company: gohealth.name,
    role: gohealth.position,
    period: formatDateRange(gohealth.startDate, gohealth.endDate),
    description:
      'Spearheaded SRE initiatives for a high-traffic health insurance marketplace during peak enrollment periods.',
    skills: ['SRE', 'Monitoring', 'Alerting', 'MTTR', 'Scalability'],
    highlights: gohealth.highlights?.slice(0, 2),
  },
  {
    company: 'Flipside Crypto',
    role: 'Head of DevOps → Head of IT & Security',
    period: '2021 – 2026',
    phase: 'DevOps to IT & Security Leadership',
    description:
      'First DevOps hire at a blockchain analytics company. Built DevOps as a culture, pioneered AI-driven operations, drove $100K+/month AWS savings, then transitioned to lead IT and enterprise security.',
    roles: [
      { title: 'Head of DevOps', period: '2021 – 2023' },
      { title: 'Head of IT & Security', period: '2023 – 2026' },
    ],
    skills: [
      'Terraform',
      'Kubernetes',
      'AWS',
      'Agentic AI',
      'Zero-Trust',
      'Fireblocks',
      'Cost Optimization',
    ],
    highlights: [
      'Built DevOps culture from the ground up; placed orthogonal SRE engineers within product and data teams',
      'Built self-maintaining pipeline of Terraform/Terragrunt repository factories',
      'Pioneered agentic AI orchestration patterns before CrewAI, AutoGen, or LangGraph existed',
      'Drove AWS costs from ~$150K/month to ~$40-50K/month — over $100K/month in sustained savings',
      'Managed Fireblocks co-signer architecture in AWS secure enclaves; led migration to Fireblocks-native solution on GCP',
      'Directed Google Workspace, Cloudflare/Route53 DNS, compliance frameworks for insurance audits',
    ],
    milestone: 'AI Operations Inventor',
  },
]

const foundationRoles = earlierCareer.positions.map((pos) => ({
  company: pos.name,
  role: pos.position,
  year: pos.year,
}))

export default function App() {
  return (
    <Tabs defaultValue="career" className="min-h-screen flex flex-col">
      {/* Header + Tab Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between h-14">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="font-heading text-primary text-2xl leading-none">JB</span>
            <span className="font-heading text-foreground text-lg leading-none hidden sm:block">
              Jon Bogaty
            </span>
          </div>

          {/* Tab Triggers */}
          <TabsList variant="line" className="bg-transparent border-0 h-14 gap-0">
            <TabsTrigger
              value="career"
              className="text-sm font-medium gap-1.5 h-14 rounded-none data-[state=active]:after:bg-primary"
            >
              <Briefcase className="size-4" />
              <span className="hidden sm:inline">Career Timeline</span>
              <span className="sm:hidden">Career</span>
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="text-sm font-medium gap-1.5 h-14 rounded-none data-[state=active]:after:bg-primary"
            >
              <Code className="size-4" />
              <span className="hidden sm:inline">Open-Source Projects</span>
              <span className="sm:hidden">Projects</span>
            </TabsTrigger>
          </TabsList>

          {/* Social links (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/jbcom"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="size-4" />
            </a>
            <a
              href="https://linkedin.com/in/jonbogaty"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href="https://t.me/jbpersonaldev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <HeroSection
        name={resume.basics.name}
        label={resume.basics.label}
        summary={resume.basics.summary}
      />

      {/* Tab Content */}
      <main className="flex-1">
        <TabsContent value="career" className="mt-0">
          <CareerTimeline
            entries={timelineEntries}
            foundationRoles={foundationRoles}
            skills={skills}
            education={resume.education}
            innovation={resume.innovation}
          />
        </TabsContent>

        <TabsContent value="projects" className="mt-0">
          <ProjectsPanel />
        </TabsContent>
      </main>

      {/* Footer */}
      <SiteFooter />
    </Tabs>
  )
}
