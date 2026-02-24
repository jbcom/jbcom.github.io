import { Briefcase, Code, Github, Linkedin, MessageCircle } from 'lucide-react'
import type { CareerEntry } from '@/components/CareerTimeline'
import { CareerTimeline } from '@/components/CareerTimeline'
import { ProjectsPanel } from '@/components/ProjectsPanel'
import { SiteFooter } from '@/components/SiteFooter'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import resume from '@/content/resume.json'
import { formatDateRange } from '@/lib/dates'

const { work, earlierCareer, skills } = resume

// Build career timeline entries from resume data, newest first
// Split Flipside Crypto into three phases per actual career trajectory
const timelineEntries: CareerEntry[] = [
  {
    company: 'Flipside Crypto',
    role: 'Head of IT & Security',
    period: '2025 – 2026',
    phase: 'IT & Security Leadership',
    description:
      'Full transition to IT and Security leadership while continuing to support data engineering teams. Directed enterprise security posture, compliance frameworks, and incident response.',
    skills: [
      'Zero-Trust',
      'Fireblocks',
      'Google Workspace',
      'Cloudflare',
      'Compliance',
      'Incident Response',
    ],
    highlights: [
      'Managed Fireblocks co-signer architecture in AWS secure enclaves; led migration to Fireblocks-native solution on GCP',
      'Directed Google Workspace, Cloudflare/Route53 DNS, compliance frameworks for insurance audits',
      'Continued supporting data platform teams throughout IT/Security transition',
    ],
  },
  {
    company: 'Flipside Crypto',
    role: 'Head of DevOps & AI Operations',
    period: '2023 – 2025',
    phase: 'AI Operations Pioneer',
    description:
      'Pioneered AI-driven IT operations 2+ years before agentic AI frameworks existed. Built and directed a fully autonomous AI engineering team.',
    skills: ['Agentic AI', 'Prompt Engineering', 'AWS Lambda', 'Serverless', 'Cost Optimization'],
    highlights: [
      'Invented agentic orchestration patterns and human-in-the-loop review cycles before CrewAI, AutoGen, or LangGraph existed',
      'Drove AWS costs from ~$150K/month to ~$40-50K/month — over $100K/month in sustained savings',
      'Oversaw evolution to 99% serverless AWS (Lambda, managed services)',
    ],
    milestone: 'AI Operations Inventor',
  },
  {
    company: 'Flipside Crypto',
    role: 'Head of DevOps',
    period: '2021 – 2023',
    phase: 'Building DevOps Culture',
    description:
      'First DevOps hire. Spent two years building DevOps as a culture. Identified the need for orthogonal SRE placements within product and data teams.',
    skills: ['Terraform', 'Terragrunt', 'Kubernetes', 'Docker', 'CI/CD', 'Mentoring'],
    highlights: [
      'Built DevOps culture from the ground up at a blockchain analytics company',
      'Identified need for and placed orthogonal SRE engineers within product and data teams',
      'Built self-maintaining pipeline of Terraform/Terragrunt repository factories',
      'Mentored DC infrastructure SRE through multi-datacenter Kubernetes deployment',
    ],
  },
  {
    company: work[1].name,
    role: work[1].position,
    period: formatDateRange(work[1].startDate, work[1].endDate),
    description:
      'Spearheaded SRE initiatives for a high-traffic health insurance marketplace during peak enrollment periods.',
    skills: ['SRE', 'Monitoring', 'Alerting', 'MTTR', 'Scalability'],
    highlights: work[1].highlights?.slice(0, 2),
  },
  {
    company: work[2].name,
    role: work[2].position,
    period: formatDateRange(work[2].startDate, work[2].endDate),
    description:
      'Owned enterprise CI/CD platform. Designed multi-cloud deployment architecture across AWS, GCP, and Azure for blockchain product engineering.',
    skills: ['AWS', 'GCP', 'Azure', 'Terraform', 'Ansible', 'Packer'],
    highlights: work[2].highlights?.slice(0, 2),
    milestone: 'Multi-Cloud IaC Pioneer',
  },
  {
    company: work[3].name,
    role: work[3].position,
    period: formatDateRange(work[3].startDate, work[3].endDate),
    description:
      'Modernized deployment with Docker containerization, restructured CI/CD, and overhauled network security with automated VPN bridging.',
    skills: ['Docker', 'CI/CD', 'VPN', 'Network Security'],
  },
  {
    company: work[4].name,
    role: work[4].position,
    period: formatDateRange(work[4].startDate, work[4].endDate),
    description:
      'Automated cloud infrastructure with Terraform and custom Ruby tooling. Built CI/CD systems and a metrics-based auto-scaler for Google Cloud.',
    skills: ['Terraform', 'Ruby', 'GCP', 'Pub/Sub', 'Auto-Scaling'],
  },
  {
    company: work[5].name,
    role: work[5].position,
    period: formatDateRange(work[5].startDate, work[5].endDate),
    description:
      'Early Docker and Terraform champion — containerized production services and built IaC pipelines before mainstream adoption.',
    skills: ['Docker', 'Terraform', 'Packer', 'Vagrant', 'AWS'],
    highlights: work[5].highlights?.slice(0, 2),
    milestone: 'Early Docker & Terraform Adopter',
  },
  {
    company: work[6].name,
    role: work[6].position,
    period: formatDateRange(work[6].startDate, work[6].endDate),
    description:
      'Managed 300+ machine infrastructure for a multinational ad-tech firm. Designed Chef cookbook overhauls and integrated Rundeck with PAM.',
    skills: ['Chef', 'Rundeck', 'Linux', '300+ Servers'],
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

      {/* Tab Content */}
      <main className="flex-1">
        <TabsContent value="career" className="mt-0">
          <CareerTimeline
            entries={timelineEntries}
            foundationRoles={foundationRoles}
            skills={skills}
            summary={resume.basics.summary}
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
