/**
 * HomePage - Mission, vision, and ecosystem overview
 */

import { ArrowForward, GitHub } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { categories, getFeaturedPackages, getPackageCount, languages } from '../data/ecosystem'

export default function HomePage() {
  const featured = getFeaturedPackages()
  const packageCount = getPackageCount()

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
          Tools for builders
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mb: 4 }}>
          Production-grade libraries for AI orchestration, procedural graphics, and enterprise
          infrastructure. {packageCount} packages. All open source.
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
            variant="outlined"
            size="large"
            startIcon={<GitHub />}
          >
            GitHub
          </Button>
        </Stack>
      </Box>

      {/* Mission */}
      <Card sx={{ mb: 6, bgcolor: 'background.paper' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Mission
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 800, lineHeight: 1.8 }}>
            Build composable, well-documented tools that solve real problems. Every package in the
            jbcom ecosystem is extracted from production systems—battle-tested code shared with the
            community. No toy examples. No abandoned experiments. Just working software.
          </Typography>
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
                '&:hover': { borderColor: cat.color },
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
