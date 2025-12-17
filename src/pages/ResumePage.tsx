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
  alpha,
  useTheme,
} from '@mui/material'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

interface Experience {
  title: string
  company: string
  period: string
  description: string[]
}

interface OpenSourceProject {
  name: string
  description: string
}

const experience: Experience[] = [
  {
    title: 'Head of Information Technology and Security',
    company: 'Flipside Crypto',
    period: 'June 2021 – Present',
    description: [
      'Directed a globally distributed IT and security strategy with emphasis on compliance, resilience, and operational efficiency.',
      'Architected Terraform-driven cloud orchestration, unified identity access, logging, and monitoring standards.',
      'Partnered with engineering and data teams to deliver secure, resilient data pipelines and internal platforms.',
    ],
  },
  {
    title: 'Senior Site Reliability Engineer',
    company: 'GoHealth',
    period: 'August 2020 – June 2021',
    description: [
      'Led site reliability initiatives improving scalability, availability, and operational visibility.',
      'Implemented cloud infrastructure optimizations and production monitoring systems.',
    ],
  },
  {
    title: 'Senior Development Operations Engineer',
    company: 'Symbiont',
    period: 'November 2017 – August 2020',
    description: [
      'Owned and scaled a large internal CI/CD platform supporting core product engineering teams.',
      'Built automation and tooling using Python, Ansible, Terraform, and Packer across AWS, GCP, and Azure.',
    ],
  },
]

const openSourceProjects: OpenSourceProject[] = [
  {
    name: 'Agentic-Control',
    description:
      'Primary author of an AI agent fleet orchestration framework, providing token-aware GitHub integration, agent triage workflows, and coordinated execution across autonomous agents.',
  },
  {
    name: 'Agentic-Crew',
    description:
      'Designed and implemented a generic CrewAI engine supporting agent discovery, runtime orchestration, and extensible execution patterns.',
  },
  {
    name: 'Strata',
    description:
      'Designed a foundational abstraction layer for structuring and composing procedural 3D graphics, terrain, and interactive experiences.',
  },
  {
    name: 'Vendor-Connectors',
    description:
      'Created reusable connector libraries for integrating external vendor APIs (AWS, GCP, GitHub, Slack, Vault, Zoom) into automation workflows.',
  },
  {
    name: 'LifecycleLogging',
    description:
      'Built an advanced Python logging framework enhancing developer observability, lifecycle awareness, and structured diagnostics.',
  },
  {
    name: 'Extended-Data-Types',
    description:
      'Authored a Python library providing advanced structured data types and validation primitives for automation and platform tooling.',
  },
]

const skills = {
  'Cloud Platforms': ['AWS', 'Google Cloud', 'Azure'],
  'Infrastructure & DevOps': ['Terraform', 'Packer', 'Ansible', 'Docker', 'Kubernetes', 'CI/CD'],
  Programming: ['Python', 'TypeScript', 'Go', 'Ruby', 'JavaScript'],
  Security: ['IAM', 'Secrets Management', 'VPNs', 'Compliance & Logging'],
  'Open Source': ['OSS Architecture', 'SDK Design', 'Developer Tooling'],
}

// Validate share URL to expected domains
const isValidShareUrl = (url: string) => {
  try {
    const parsed = new URL(url)
    return (
      parsed.hostname === 'jbcom.github.io' ||
      parsed.hostname === 'localhost' ||
      parsed.hostname === '127.0.0.1'
    )
  } catch {
    return false
  }
}

export default function ResumePage() {
  const theme = useTheme()

  // Use memoized feature detection for Web Share API
  const supportsWebShare = useMemo(
    () => typeof navigator !== 'undefined' && 'share' in navigator,
    []
  )

  const rawShareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareUrl = isValidShareUrl(rawShareUrl) ? rawShareUrl : 'https://jbcom.github.io/resume'
  const shareTitle = 'Jon Bogaty - Head of IT & Security | Resume'
  const shareText =
    'Check out the resume of Jon Bogaty - Senior IT, Security, and Platform leader with 15+ years of experience'

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        })
      } catch (error) {
        // Only ignore AbortError (user cancelled)
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Share failed:', error)
        }
      }
    }
  }

  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`

  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            mb: 1,
          }}
        >
          Jon Bogaty
        </Typography>
        <Typography variant="h5" color="primary.main" gutterBottom>
          Head of Information Technology and Security
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Lincoln, Nebraska, United States
        </Typography>

        {/* Download & Share Actions */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
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

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Share:
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
            <Tooltip title="Share on X (Twitter)">
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
            {supportsWebShare && (
              <Tooltip title="Share...">
                <IconButton onClick={handleShare} size="small">
                  <Share />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* Contact Info */}
      <Card sx={{ mb: 4, background: alpha(theme.palette.primary.main, 0.05) }}>
        <CardContent>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 4 }}
            flexWrap="wrap"
            useFlexGap
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Email fontSize="small" color="action" />
              <Typography
                component="a"
                href="mailto:jon@jonbogaty.com"
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                jon@jonbogaty.com
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LinkedIn fontSize="small" color="action" />
              <Typography
                component="a"
                href="https://linkedin.com/in/jonbogaty"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                linkedin.com/in/jonbogaty
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <GitHub fontSize="small" color="action" />
              <Typography
                component="a"
                href="https://github.com/jbcom"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                github.com/jbcom
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Professional Summary
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Senior IT, Security, and Platform leader with 15+ years of experience spanning DevOps,
            cloud infrastructure, site reliability engineering, and enterprise security. Proven
            track record of designing and operating globally distributed systems, building
            automation-first platforms, and leading security-conscious infrastructure strategy. Deep
            hands-on background in open-source software, cloud orchestration, and developer
            enablement.
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
                component={Link}
                to="/ecosystem"
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
