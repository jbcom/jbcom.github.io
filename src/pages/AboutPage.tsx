/**
 * AboutPage - Professional bio, experience, and skills
 */

import { ArrowForward, Email, GitHub, LinkedIn } from '@mui/icons-material'
import type { SxProps, Theme } from '@mui/material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

// Typed sx props to avoid TS2590 complex union type errors
const containerSx: SxProps<Theme> = { py: { xs: 2, md: 4 } }

const skills = {
  'Cloud Platforms': ['AWS', 'Google Cloud', 'Azure'],
  'Infrastructure & DevOps': ['Terraform', 'Packer', 'Ansible', 'Docker', 'Kubernetes', 'CI/CD'],
  Programming: ['TypeScript', 'Python', 'Go', 'Rust', 'Ruby', 'JavaScript', 'SQL'],
  'Frontend & 3D': ['React', 'React Three Fiber', 'Material UI', 'Vite', 'WebGL'],
  'Backend & Data': ['Node.js', 'FastAPI', 'AWS Lambda', 'PostgreSQL'],
  'AI & Agents': ['LangChain', 'CrewAI', 'OpenAI', 'Anthropic', 'AWS Bedrock'],
  Security: ['IAM', 'Secrets Management', 'VPNs', 'Compliance & Logging'],
}

const experience = [
  {
    title: 'Head of Information Technology and Security',
    company: 'Flipside Crypto',
    period: 'June 2021 – Present',
    description:
      'Lead globally distributed IT and security strategy with emphasis on compliance, resilience, and operational efficiency. Architect Terraform-driven cloud orchestration and unified identity access.',
  },
  {
    title: 'Senior Site Reliability Engineer',
    company: 'GoHealth',
    period: 'August 2020 – June 2021',
    description:
      'Led site reliability initiatives improving scalability, availability, and operational visibility. Implemented cloud infrastructure optimizations.',
  },
  {
    title: 'Senior Development Operations Engineer',
    company: 'Symbiont',
    period: 'November 2017 – August 2020',
    description:
      'Owned and scaled a large internal CI/CD platform. Built automation using Python, Ansible, Terraform, and Packer across AWS, GCP, and Azure.',
  },
]

export default function AboutPage() {
  return (
    <Box sx={containerSx}>
      {/* Header */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="center" mb={6}>
        <Avatar
          sx={{
            width: 120,
            height: 120,
            bgcolor: 'primary.main',
            fontSize: '2.5rem',
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
          }}
        >
          JB
        </Avatar>
        <div>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Jon Bogaty
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Head of IT & Security | 15+ Years Experience
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Lincoln, Nebraska, United States
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
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
            <IconButton
              component="a"
              href="mailto:jon@jonbogaty.com"
              size="small"
              aria-label="Send email"
            >
              <Email />
            </IconButton>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Button
              component={Link}
              to="/resume"
              variant="outlined"
              size="small"
              endIcon={<ArrowForward />}
            >
              Full Resume
            </Button>
          </Stack>
        </div>
      </Stack>

      {/* Bio */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            About
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Senior IT, Security, and Platform leader with 15+ years of experience spanning DevOps,
            cloud infrastructure, site reliability engineering, and enterprise security. I
            specialize in designing and operating globally distributed systems, building
            automation-first platforms, and leading security-conscious infrastructure strategy.
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8, mt: 2 }}>
            My work spans AI agent orchestration, procedural 3D graphics, and enterprise
            infrastructure—always with an emphasis on developer experience and clean abstractions.
            The jbcom ecosystem represents years of work on problems I've encountered in
            production—from managing secrets across clouds to rendering procedural terrain in the
            browser. Everything is open source.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Experience */}
        <Grid item xs={12} lg={8}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Experience
          </Typography>
          <Stack spacing={2} sx={{ mb: 4 }}>
            {experience.map((exp) => (
              <Card key={exp.company}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {exp.title}
                  </Typography>
                  <Typography color="primary.main" gutterBottom>
                    {exp.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {exp.period}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {exp.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  Open Source Maintainer
                </Typography>
                <Typography color="primary.main" gutterBottom>
                  jbcom
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Maintain 20+ packages across AI agent orchestration, procedural graphics, and
                  enterprise infrastructure. Primary author of agentic-control, strata, and
                  vendor-connectors.
                </Typography>
              </CardContent>
            </Card>
          </Stack>

          {/* Education */}
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Education
          </Typography>
          <Card sx={{ mb: 4 }}>
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

        {/* Skills */}
        <Grid item xs={12} lg={4}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Skills
          </Typography>
          <Stack spacing={2}>
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category}>
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    gutterBottom
                    sx={{ textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: 1 }}
                    color="text.secondary"
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
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* CTA */}
      <Card sx={{ mt: 4, textAlign: 'center', p: 4 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Want the full details?
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          View or download my complete resume with full work history and project details.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            component={Link}
            to="/resume"
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
          >
            View Full Resume
          </Button>
          <Button
            component="a"
            href="/Jon_Bogaty_Resume_2025.pdf"
            download
            variant="outlined"
            size="large"
          >
            Download PDF
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}
