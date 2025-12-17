/**
 * HomePage - Mission, vision, and ecosystem overview
 *
 * Comprehensive overview with:
 * - Hero section
 * - Mission and principles
 * - Language breakdown
 * - Featured packages
 * - Architecture preview
 */

import {
  AccountTree,
  ArrowForward,
  GitHub,
  Hub,
  Layers,
  PlayCircle,
  SportsEsports,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  categories,
  getFeaturedPackages,
  getPackageCount,
  languages,
  packages,
} from '../data/ecosystem'

// Tier configuration for architecture preview
const tierConfig = {
  primitive: { label: 'Primitives', color: '#f59e0b', icon: <Layers fontSize="small" /> },
  core: { label: 'Core', color: '#06b6d4', icon: <Hub fontSize="small" /> },
  application: { label: 'Applications', color: '#8b5cf6', icon: <AccountTree fontSize="small" /> },
}

export default function HomePage() {
  const theme = useTheme()
  const featured = getFeaturedPackages()
  const packageCount = getPackageCount()

  // Language stats
  const languageStats = useMemo(() => {
    const stats: Record<string, number> = {}
    for (const pkg of packages) {
      stats[pkg.language] = (stats[pkg.language] || 0) + 1
    }
    return stats
  }, [])

  // Tier stats
  const tierStats = useMemo(() => {
    const stats = { primitive: 0, core: 0, application: 0 }
    for (const pkg of packages) {
      const tier = pkg.tier || 'application'
      stats[tier]++
    }
    return stats
  }, [])

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="overline" color="primary" sx={{ letterSpacing: 2 }}>
          Open Source Ecosystem
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          Production-grade tools
          <br />
          for serious builders
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mb: 4, fontWeight: 400 }}
        >
          {packageCount} open source packages for AI orchestration, procedural graphics, and
          enterprise infrastructure. Battle-tested in production. Shared with the community.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            component={Link}
            to="/ecosystem"
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
          >
            Explore Packages
          </Button>
          <Button
            component="a"
            href="https://github.com/jbcom"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="large"
            startIcon={<GitHub />}
          >
            GitHub
          </Button>
        </Stack>
      </Box>

      {/* Mission */}
      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Mission
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 800, lineHeight: 1.8, mb: 3 }}>
            Build composable, well-documented tools that solve real problems. Every package in the
            jbcom ecosystem is extracted from production systems—code that works, shared openly.
          </Typography>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Principles
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography fontWeight={600} color="primary.main">
                Production-First
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No toy examples. Every package solves problems encountered in real systems.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography fontWeight={600} color="primary.main">
                Composable
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Small, focused packages that work together. Use what you need.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography fontWeight={600} color="primary.main">
                Well-Documented
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Clear APIs, comprehensive examples, and honest limitations.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Language Ecosystems */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Multi-Language Ecosystem
      </Typography>
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {Object.entries(languages).map(([key, lang]) => {
          const count = languageStats[key] || 0
          return (
            <Grid item xs={6} sm={3} key={key}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderTop: `3px solid ${lang.color}`,
                  height: '100%',
                }}
              >
                <Chip
                  label={lang.icon}
                  sx={{
                    backgroundColor: alpha(lang.color, 0.2),
                    color: lang.color,
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: 700,
                    mb: 1,
                  }}
                />
                <Typography variant="h4" fontWeight={700} fontFamily='"Space Grotesk", sans-serif'>
                  {count}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {lang.name} packages
                </Typography>
              </Paper>
            </Grid>
          )
        })}
      </Grid>

      {/* Architecture Preview */}
      <Card sx={{ mb: 6, background: alpha(theme.palette.primary.main, 0.03) }}>
        <CardContent sx={{ p: 4 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={3}
          >
            <Box>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Layered Architecture
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 500, mb: 2 }}>
                The jbcom ecosystem follows a structured dependency flow. Primitive libraries
                provide foundational capabilities that power core packages, which in turn enable
                sophisticated applications.
              </Typography>
              <Button
                component={Link}
                to="/architecture"
                variant="contained"
                endIcon={<ArrowForward />}
              >
                Explore Architecture
              </Button>
            </Box>

            <Stack direction="row" spacing={2}>
              {Object.entries(tierStats).map(([tier, count]) => {
                const config = tierConfig[tier as keyof typeof tierConfig]
                return (
                  <Paper
                    key={tier}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      minWidth: 100,
                      borderBottom: `3px solid ${config.color}`,
                    }}
                  >
                    <Box sx={{ color: config.color, mb: 1 }}>{config.icon}</Box>
                    <Typography variant="h5" fontWeight={700}>
                      {count}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {config.label}
                    </Typography>
                  </Paper>
                )
              })}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Categories */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Categories
      </Typography>
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {Object.entries(categories).map(([key, cat]) => (
          <Grid item xs={6} md={3} key={key}>
            <Card
              sx={{
                height: '100%',
                borderLeft: `3px solid ${cat.color}`,
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  {cat.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cat.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Interactive Experiences */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Interactive Experiences
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%',
              background: `linear-gradient(135deg, ${alpha('#8b5cf6', 0.1)}, ${alpha('#06b6d4', 0.05)})`,
              border: `1px solid ${alpha('#8b5cf6', 0.2)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SportsEsports sx={{ color: '#fff' }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Arcade
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Games built with Strata
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Explore procedural games including exploration, racing, and educational experiences.
              </Typography>
              <Button component={Link} to="/arcade" variant="contained" endIcon={<ArrowForward />}>
                Play Games
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%',
              background: `linear-gradient(135deg, ${alpha('#06b6d4', 0.1)}, ${alpha('#3b82f6', 0.05)})`,
              border: `1px solid ${alpha('#06b6d4', 0.2)}`,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PlayCircle sx={{ color: '#fff' }} />
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    Technical Demos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Strata engine showcase
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Interactive demonstrations of procedural 3D graphics capabilities.
              </Typography>
              <Button component={Link} to="/demos" variant="outlined" endIcon={<ArrowForward />}>
                View Demos
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Featured */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Featured Packages
        </Typography>
        <Button component={Link} to="/ecosystem" endIcon={<ArrowForward />}>
          View all
        </Button>
      </Box>
      <Grid container spacing={3}>
        {featured.map((pkg) => (
          <Grid item xs={12} md={6} lg={4} key={pkg.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip
                    label={languages[pkg.language].icon}
                    size="small"
                    sx={{ bgcolor: `${languages[pkg.language].color}20`, fontWeight: 600 }}
                  />
                  {pkg.npm && <Chip label="npm" size="small" variant="outlined" />}
                  {pkg.pypi && <Chip label="PyPI" size="small" variant="outlined" />}
                </Stack>
                <Typography
                  variant="h6"
                  fontFamily='"JetBrains Mono", monospace'
                  fontWeight={600}
                  gutterBottom
                >
                  {pkg.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {pkg.description}
                </Typography>
                <Button
                  component="a"
                  href={pkg.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  endIcon={<GitHub />}
                >
                  Source
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
