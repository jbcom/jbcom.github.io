/**
 * ResumePage - Full professional resume with download and share options
 *
 * Features:
 * - Tabbed sections for Experience, Open Source, Skills
 * - Snackbar feedback for share actions
 * - Download buttons for PDF/DOCX
 */

import {
  AccountTree,
  CloudDownload,
  Code,
  Description,
  Email,
  GitHub,
  LinkedIn,
  School,
  Share,
  Twitter,
  Work,
} from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

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

// Allowed hostnames for share functionality
const ALLOWED_SHARE_HOSTS = ['jbcom.github.io', 'localhost', '127.0.0.1'] as const

// Validate share URL to expected domains with improved security
const isValidShareUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url)
    // Only allow https (and http for localhost)
    const isSecureProtocol =
      parsed.protocol === 'https:' ||
      (parsed.protocol === 'http:' &&
        (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1'))

    if (!isSecureProtocol) return false

    return ALLOWED_SHARE_HOSTS.includes(parsed.hostname as (typeof ALLOWED_SHARE_HOSTS)[number])
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Invalid share URL:', url, error)
    }
    return false
  }
}

export default function ResumePage() {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  })

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
        setSnackbar({ open: true, message: 'Shared successfully!' })
      } catch (error) {
        // Only ignore AbortError (user cancelled)
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Share failed:', error)
          setSnackbar({ open: true, message: 'Share failed. Please try again.' })
        }
      }
    }
  }

  const handleSocialShare = (platform: string) => {
    setSnackbar({ open: true, message: `Opening ${platform}...` })
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
              aria-label="Download resume in PDF format"
            >
              Download PDF
            </Button>
            <Button
              variant="outlined"
              startIcon={<Description />}
              href="/Jon_Bogaty_Resume_2025.docx"
              download="Jon_Bogaty_Resume_2025.docx"
              aria-label="Download resume in DOCX format"
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
                onClick={() => handleSocialShare('LinkedIn')}
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
                onClick={() => handleSocialShare('X')}
              >
                <Twitter />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share via Email">
              <IconButton
                component="a"
                href={emailShareUrl}
                size="small"
                onClick={() => handleSocialShare('Email')}
              >
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

      {/* Tabbed Content */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              minHeight: 56,
            },
          }}
        >
          <Tab icon={<Work />} iconPosition="start" label="Experience" />
          <Tab icon={<Code />} iconPosition="start" label="Open Source" />
          <Tab icon={<AccountTree />} iconPosition="start" label="Skills" />
          <Tab icon={<School />} iconPosition="start" label="Education" />
        </Tabs>

        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {/* Experience Tab */}
          <TabPanel value={tabValue} index={0}>
            <Stack spacing={3}>
              {experience.map((exp) => (
                <Card key={exp.company} variant="outlined">
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
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
          </TabPanel>

          {/* Open Source Tab */}
          <TabPanel value={tabValue} index={1}>
            <Alert severity="info" sx={{ mb: 3 }}>
              Primary maintainer of 20+ open source packages across AI orchestration, procedural
              graphics, and enterprise infrastructure.
            </Alert>
            <Grid container spacing={2}>
              {openSourceProjects.map((project) => (
                <Grid item xs={12} md={6} key={project.name}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography
                        fontWeight={600}
                        fontFamily='"JetBrains Mono", monospace'
                        color="primary.main"
                        gutterBottom
                      >
                        {project.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {project.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button component={Link} to="/ecosystem" variant="outlined">
                View All Packages →
              </Button>
              <Button component={Link} to="/architecture" variant="text">
                See Architecture →
              </Button>
            </Stack>
          </TabPanel>

          {/* Skills Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={3}>
              {Object.entries(skills).map(([category, items]) => (
                <Grid item xs={12} sm={6} md={4} key={category}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
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
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Education Tab */}
          <TabPanel value={tabValue} index={3}>
            <Card variant="outlined" sx={{ maxWidth: 500 }}>
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.main',
                      flexShrink: 0,
                    }}
                  >
                    <School />
                  </Box>
                  <Box>
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
                      <Chip
                        label="Honors Graduate"
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                      <Chip label="Dean's List" size="small" variant="outlined" />
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </TabPanel>
        </Box>
      </Paper>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  )
}
