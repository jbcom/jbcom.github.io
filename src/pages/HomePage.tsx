/**
 * HomePage - Mission, vision, and ecosystem overview
 */

import { ArrowForward, GitHub, PlayCircle } from '@mui/icons-material'
import {
  alpha,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
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

export default function HomePage() {
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
              <CardActionArea
                component={Link}
                to={`/ecosystem?category=${key}`}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {cat.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cat.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Live Demos */}
      <Card
        sx={{
          mb: 6,
          background: `linear-gradient(135deg, ${alpha('#06b6d4', 0.1)}, ${alpha('#3b82f6', 0.05)})`,
          border: `1px solid ${alpha('#06b6d4', 0.2)}`,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            spacing={3}
          >
            <Box>
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
                <Typography variant="h5" fontWeight={600}>
                  Live Demos
                </Typography>
              </Stack>
              <Typography color="text.secondary" sx={{ maxWidth: 500 }}>
                Play games built with the jbcom ecosystem. All games run entirely in your browser.
              </Typography>
            </Box>
            <Button component={Link} to="/demos" variant="contained" endIcon={<ArrowForward />}>
              View Demos
            </Button>
          </Stack>
        </CardContent>
      </Card>

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
                  aria-label={`View ${pkg.displayName} source code`}
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
