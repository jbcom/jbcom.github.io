/**
 * AboutPage - Professional bio and skills overview
 */

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  alpha,
  useTheme,
  Link,
  Avatar,
} from '@mui/material'
import {
  Email,
  GitHub,
  LinkedIn,
  Code,
  Cloud,
  SmartToy,
  Storage,
} from '@mui/icons-material'

const skills = {
  languages: ['TypeScript', 'Python', 'Go', 'Rust', 'Terraform', 'SQL'],
  frontend: ['React', 'React Three Fiber', 'Material UI', 'Vite', 'WebGL'],
  backend: ['Node.js', 'FastAPI', 'AWS Lambda', 'PostgreSQL', 'Redis'],
  ai: ['LangChain', 'CrewAI', 'OpenAI', 'Anthropic', 'AWS Bedrock'],
  infrastructure: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'GitHub Actions'],
  tools: ['Git', 'Cursor', 'Neovim', 'Vault', 'Datadog'],
}

const experience = [
  {
    role: 'Software Engineer',
    company: 'FlipsideCrypto',
    period: 'Current',
    description: 'Enterprise infrastructure, AI automation, data pipelines',
  },
  {
    role: 'Open Source',
    company: 'jbcom',
    period: 'Ongoing',
    description: 'Maintaining 20+ packages across AI, games, and infrastructure',
  },
]

function SkillSection({ 
  title, 
  items, 
  icon,
  color,
}: { 
  title: string
  items: string[]
  icon: React.ReactNode
  color: string
}) {
  const theme = useTheme()
  
  return (
    <Card
      sx={{
        height: '100%',
        background: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(color, 0.3)}`,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Box sx={{ color }}>{icon}</Box>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {items.map((item) => (
            <Chip
              key={item}
              label={item}
              size="small"
              sx={{
                backgroundColor: alpha(color, 0.1),
                borderColor: alpha(color, 0.3),
                fontSize: '0.8rem',
                mb: 0.5,
              }}
              variant="outlined"
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default function AboutPage() {
  const theme = useTheme()
  
  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, md: 4 }}
          alignItems={{ xs: 'center', sm: 'flex-start' }}
        >
          <Avatar
            sx={{
              width: { xs: 100, md: 140 },
              height: { xs: 100, md: 140 },
              bgcolor: 'primary.main',
              fontSize: { xs: '2rem', md: '3rem' },
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
            }}
          >
            JB
          </Avatar>
          
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 1,
              }}
            >
              Jon Bogaty
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              Software Engineer
            </Typography>
            
            <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
              <Link href="https://github.com/jbcom" target="_blank" color="inherit">
                <GitHub />
              </Link>
              <Link href="https://linkedin.com/in/jonbogaty" target="_blank" color="inherit">
                <LinkedIn />
              </Link>
              <Link href="mailto:jon@jonbogaty.com" color="inherit">
                <Email />
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Bio */}
      <Card
        sx={{
          mb: { xs: 4, md: 6 },
          background: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: 'blur(10px)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h5" fontFamily='"Space Grotesk", sans-serif' fontWeight={600} mb={2}>
            About
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            I'm a software engineer focused on building tools that make complex systems 
            accessible. My work spans AI agent orchestration, procedural graphics, and 
            enterprise infrastructure—always with an emphasis on developer experience 
            and clean abstractions.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mt: 2 }}>
            I believe in open source as a way to share knowledge and build better tools 
            together. The jbcom ecosystem represents years of work on problems I've 
            encountered in production—from managing secrets across clouds to rendering 
            procedural terrain in the browser.
          </Typography>
        </CardContent>
      </Card>

      {/* Skills Grid */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 600,
          mb: 3,
        }}
      >
        Skills
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: { xs: 4, md: 6 } }}>
        <Grid item xs={12} md={6}>
          <SkillSection
            title="Languages"
            items={skills.languages}
            icon={<Code />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SkillSection
            title="AI & ML"
            items={skills.ai}
            icon={<SmartToy />}
            color="#7c3aed"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SkillSection
            title="Frontend"
            items={skills.frontend}
            icon={<Code />}
            color="#06b6d4"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SkillSection
            title="Backend"
            items={skills.backend}
            icon={<Storage />}
            color="#10b981"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SkillSection
            title="Infrastructure"
            items={skills.infrastructure}
            icon={<Cloud />}
            color="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SkillSection
            title="Tools"
            items={skills.tools}
            icon={<Code />}
            color="#ec4899"
          />
        </Grid>
      </Grid>

      {/* Experience */}
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 600,
          mb: 3,
        }}
      >
        Experience
      </Typography>
      
      <Stack spacing={2}>
        {experience.map((exp) => (
          <Card
            key={exp.company}
            sx={{
              background: alpha(theme.palette.background.paper, 0.6),
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={1}
              >
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {exp.role}
                  </Typography>
                  <Typography variant="subtitle2" color="primary.main">
                    {exp.company}
                  </Typography>
                </Box>
                <Chip label={exp.period} size="small" />
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {exp.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}
