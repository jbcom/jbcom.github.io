/**
 * AboutPage - Professional bio and skills
 */

import { Email, GitHub, LinkedIn } from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'

const skills = {
  languages: ['TypeScript', 'Python', 'Go', 'Rust', 'Terraform', 'SQL'],
  frontend: ['React', 'React Three Fiber', 'Material UI', 'Vite'],
  backend: ['Node.js', 'FastAPI', 'AWS Lambda', 'PostgreSQL'],
  ai: ['LangChain', 'CrewAI', 'OpenAI', 'Anthropic', 'AWS Bedrock'],
  infrastructure: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions'],
}

export default function AboutPage() {
  return (
    <div>
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
            sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 1 }}
          >
            Jon Bogaty
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Software Engineer
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton component="a" href="https://github.com/jbcom" target="_blank" size="small">
              <GitHub />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com/in/jonbogaty"
              target="_blank"
              size="small"
            >
              <LinkedIn />
            </IconButton>
            <IconButton component="a" href="mailto:jon@jonbogaty.com" size="small">
              <Email />
            </IconButton>
          </Stack>
        </div>
      </Stack>

      {/* Bio */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            About
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
            I build tools that make complex systems accessible. My work spans AI agent
            orchestration, procedural graphics, and enterprise infrastructure—always with an
            emphasis on developer experience and clean abstractions.
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.8, mt: 2 }}>
            The jbcom ecosystem represents years of work on problems I've encountered in
            production—from managing secrets across clouds to rendering procedural terrain in the
            browser. Everything is open source.
          </Typography>
        </CardContent>
      </Card>

      {/* Skills */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Skills
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {Object.entries(skills).map(([category, items]) => (
          <Grid item xs={12} sm={6} md={4} key={category}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ textTransform: 'capitalize' }}>
                  {category}
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {items.map((skill) => (
                    <Chip key={skill} label={skill} size="small" variant="outlined" />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Experience */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Experience
      </Typography>
      <Stack spacing={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              Software Engineer
            </Typography>
            <Typography color="primary.main" gutterBottom>
              FlipsideCrypto
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enterprise infrastructure, AI automation, data pipelines
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>
              Open Source Maintainer
            </Typography>
            <Typography color="primary.main" gutterBottom>
              jbcom
            </Typography>
            <Typography variant="body2" color="text.secondary">
              20+ packages across AI, games, and infrastructure
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </div>
  )
}
