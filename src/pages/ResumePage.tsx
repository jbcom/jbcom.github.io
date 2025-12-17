/**
 * ResumePage - Full professional resume with download and share options
 */

import {
  CloudDownload,
  Description,
  Email,
  GitHub,
  LinkedIn,
  Share,
  Twitter,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'

interface Experience {
  title: string
  company: string
  period: string
  description: string[]
}

const experience: Experience[] = [
  {
    title: 'Head of Information Technology and Security',
    company: 'Flipside Crypto',
    period: 'June 2021 – Present',
    description: [
      'Lead globally distributed IT and security strategy with emphasis on compliance, resilience, and operational efficiency',
      'Architect Terraform-driven cloud orchestration and unified identity access across AWS, GCP, and Azure',
      'Build and manage security-first infrastructure including VPNs, secrets management, and compliance logging',
      'Lead incident response, disaster recovery planning, and security awareness training',
    ],
  },
  {
    title: 'Senior Site Reliability Engineer',
    company: 'GoHealth',
    period: 'August 2020 – June 2021',
    description: [
      'Led site reliability initiatives improving scalability, availability, and operational visibility',
      'Implemented cloud infrastructure optimizations reducing costs and improving performance',
      'Developed automation and monitoring solutions for critical healthcare systems',
    ],
  },
  {
    title: 'Senior Development Operations Engineer',
    company: 'Symbiont',
    period: 'November 2017 – August 2020',
    description: [
      'Owned and scaled a large internal CI/CD platform supporting blockchain infrastructure',
      'Built automation using Python, Ansible, Terraform, and Packer across AWS, GCP, and Azure',
      'Developed deployment strategies for distributed ledger technology systems',
    ],
  },
  {
    title: 'Cloud Engineer',
    company: 'Namely',
    period: 'April 2016 – November 2017',
    description: [
      'Managed AWS infrastructure for HR SaaS platform serving enterprise customers',
      'Implemented infrastructure as code practices and automated deployment pipelines',
      'Collaborated with development teams on reliability and performance improvements',
    ],
  },
]

const openSourceProjects = [
  {
    name: 'agentic-control',
    description:
      'AI agent orchestration framework for building reliable, observable multi-agent systems',
  },
  {
    name: 'strata',
    description:
      'Procedural 3D graphics library for React Three Fiber with terrain, water, and atmosphere',
  },
  {
    name: 'vendor-connectors',
    description: 'Unified interface for 50+ enterprise SaaS integrations with consistent patterns',
  },
  {
    name: 'py-terraform-utils',
    description: 'Python utilities for Terraform state management, drift detection, and automation',
  },
]

const skills: Record<string, string[]> = {
  'Cloud Platforms': ['AWS', 'Google Cloud', 'Azure'],
  'Infrastructure & DevOps': ['Terraform', 'Packer', 'Ansible', 'Docker', 'Kubernetes', 'CI/CD'],
  Programming: ['TypeScript', 'Python', 'Go', 'Rust', 'Ruby', 'JavaScript', 'SQL'],
  'Frontend & 3D': ['React', 'React Three Fiber', 'Material UI', 'Vite', 'WebGL'],
  'Backend & Data': ['Node.js', 'FastAPI', 'AWS Lambda', 'PostgreSQL'],
  'AI & Agents': ['LangChain', 'CrewAI', 'OpenAI', 'Anthropic', 'AWS Bedrock'],
  Security: ['IAM', 'Secrets Management', 'VPNs', 'Compliance & Logging'],
}

export default function ResumePage() {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://jbcom.github.io'
  const shareTitle = 'Jon Bogaty - Head of IT & Security | Resume'
  const shareText =
    "Check out Jon Bogaty's resume - Head of IT & Security with 15+ years of experience in cloud infrastructure, DevOps, and enterprise security."

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        })
      } catch {
        // User cancelled or error
      }
    }
  }

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`

  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={3}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  mb: 1,
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                }}
              >
                Jon Bogaty
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Head of Information Technology and Security
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  label="15+ Years Experience"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Chip label="Lincoln, NE" size="small" variant="outlined" />
              </Stack>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                startIcon={<CloudDownload />}
                href="/Jon_Bogaty_Resume_2025.pdf"
                download="Jon_Bogaty_Resume_2025.pdf"
              >
                Download PDF
              </Button>
              <Button
                variant="outlined"
                startIcon={<Description />}
                href="/Jon_Bogaty_Resume_2025.docx"
                download="Jon_Bogaty_Resume_2025.docx"
              >
                Download DOCX
              </Button>
            </Stack>
          </Stack>

          {/* Social Links */}
          <Divider sx={{ my: 3 }} />
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Connect:
            </Typography>
            <Tooltip title="Share on LinkedIn">
              <IconButton
                component="a"
                href={linkedInShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{ color: '#0A66C2' }}
              >
                <LinkedIn />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share on X">
              <IconButton
                component="a"
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
              >
                <Twitter />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share via Email">
              <IconButton component="a" href={emailShareUrl} size="small">
                <Email />
              </IconButton>
            </Tooltip>
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <Tooltip title="Share...">
                <IconButton onClick={handleShare} size="small">
                  <Share />
                </IconButton>
              </Tooltip>
            )}
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <IconButton
              component="a"
              href="https://github.com/jbcom"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              aria-label="GitHub profile"
            >
              <GitHub />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com/in/jonbogaty"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              aria-label="LinkedIn profile"
            >
              <LinkedIn />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Professional Summary
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Senior IT, Security, and Platform leader with 15+ years of experience spanning DevOps,
            cloud infrastructure, site reliability engineering, and enterprise security. Expertise
            in designing and operating globally distributed systems, building automation-first
            platforms, and leading security-conscious infrastructure strategy. Active open source
            maintainer with 20+ packages across AI orchestration, procedural graphics, and
            enterprise infrastructure.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Professional Experience */}
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Professional Experience
          </Typography>
          <Stack spacing={3} sx={{ mb: 4 }}>
            {experience.map((exp) => (
              <Card key={exp.company}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h6" fontWeight={600}>
                    {exp.title}
                  </Typography>
                  <Typography color="primary.main" gutterBottom>
                    {exp.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {exp.period}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    {exp.description.map((desc) => (
                      <Typography
                        component="li"
                        key={desc}
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, lineHeight: 1.7 }}
                      >
                        {desc}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Open Source Projects */}
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Open Source & Public Projects
          </Typography>
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack spacing={2} divider={<Divider />}>
                {openSourceProjects.map((project) => (
                  <Box key={project.name}>
                    <Typography
                      fontWeight={600}
                      fontFamily='"JetBrains Mono", monospace'
                      color="primary.main"
                    >
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {project.description}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              <Button
                component="a"
                href="/ecosystem"
                sx={{ mt: 3 }}
                variant="outlined"
                size="small"
              >
                View All 20+ Packages →
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Skills */}
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Skills
          </Typography>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Stack spacing={3}>
              {Object.entries(skills).map(([category, items]) => (
                <Box key={category}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    color="text.secondary"
                    gutterBottom
                    sx={{ textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1 }}
                  >
                    {category}
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={0.75}>
                    {items.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.75rem' }}
                      />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Paper>

          {/* Education */}
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Education
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600}>
                Associate of Applied Science (AAS)
              </Typography>
              <Typography color="primary.main" gutterBottom>
                Computer Information Technology
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ivy Tech Community College
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Chip label="Honors Graduate" size="small" color="success" variant="outlined" />
                <Chip label="Dean's List" size="small" variant="outlined" />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
