/**
 * HomePage - Landing page with hero and ecosystem overview
 * 
 * The UI content floats as the foreground layer above the
 * strata-powered background.
 */

import { Box, Typography, Button, Grid, Card, CardContent, Stack, Chip, alpha, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ArrowForward, GitHub, OpenInNew } from '@mui/icons-material'
import { 
  getFeaturedPackages, 
  getCategoryStats, 
  getPackageCount,
  languages,
  type Package 
} from '../data/ecosystem'

function HeroSection() {
  const theme = useTheme()
  const navigate = useNavigate()
  
  return (
    <Box
      sx={{
        minHeight: { xs: '70vh', md: '80vh' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        py: { xs: 4, md: 8 },
      }}
    >
      {/* Subtle gradient overlay for text readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 30% 50%, ${alpha(theme.palette.background.default, 0.3)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="overline"
          sx={{
            color: 'primary.main',
            letterSpacing: 3,
            mb: 2,
            display: 'block',
          }}
        >
          Jon Bogaty
        </Typography>
        
        <Typography
          variant="h1"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
            lineHeight: 1.1,
            mb: 3,
            background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Building the
          <br />
          future in layers
        </Typography>
        
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            maxWidth: 600,
            mb: 4,
            fontWeight: 400,
            fontSize: { xs: '1rem', md: '1.25rem' },
            lineHeight: 1.7,
          }}
        >
          Software engineer specializing in AI orchestration, procedural graphics,
          and enterprise infrastructure. {getPackageCount()} open source packages
          and counting.
        </Typography>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/ecosystem')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1rem',
            }}
          >
            Explore Ecosystem
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<GitHub />}
            href="https://github.com/jbcom"
            target="_blank"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1rem',
            }}
          >
            GitHub
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

function StatsSection() {
  const stats = getCategoryStats()
  const theme = useTheme()
  
  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 600,
          mb: 4,
        }}
      >
        The Ecosystem
      </Typography>
      
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={6} md={3} key={stat.category}>
            <Card
              sx={{
                height: '100%',
                background: alpha(theme.palette.background.paper, 0.6),
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha(stat.color, 0.3)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: stat.color,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 30px ${alpha(stat.color, 0.2)}`,
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 700,
                    color: stat.color,
                    fontSize: { xs: '2rem', md: '3rem' },
                  }}
                >
                  {stat.count}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  {stat.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    fontSize: '0.8125rem',
                  }}
                >
                  {stat.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

function PackageCard({ pkg }: { pkg: Package }) {
  const theme = useTheme()
  const lang = languages[pkg.language]
  
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: alpha(theme.palette.background.paper, 0.7),
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Chip
            label={lang.icon}
            size="small"
            sx={{
              backgroundColor: alpha(lang.color, 0.2),
              color: lang.color,
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 600,
              fontSize: '0.7rem',
            }}
          />
          {pkg.npm && (
            <Chip
              label="npm"
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
          )}
          {pkg.pypi && (
            <Chip
              label="PyPI"
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
          )}
        </Stack>
        
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 600,
            mb: 1,
            fontSize: { xs: '0.9375rem', md: '1.0625rem' },
          }}
        >
          {pkg.displayName}
        </Typography>
        
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.6,
          }}
        >
          {pkg.description}
        </Typography>
        
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {pkg.tags.slice(0, 3).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                fontSize: '0.6875rem',
                height: 22,
              }}
            />
          ))}
        </Stack>
      </CardContent>
      
      <Box
        sx={{
          px: { xs: 2, md: 3 },
          pb: { xs: 2, md: 3 },
          pt: 0,
        }}
      >
        <Button
          size="small"
          endIcon={<OpenInNew sx={{ fontSize: '0.875rem' }} />}
          href={pkg.repo}
          target="_blank"
          sx={{ textTransform: 'none' }}
        >
          View on GitHub
        </Button>
      </Box>
    </Card>
  )
}

function FeaturedSection() {
  const featured = getFeaturedPackages()
  
  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        mb={4}
        spacing={2}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 600,
          }}
        >
          Featured Packages
        </Typography>
        <Button
          endIcon={<ArrowForward />}
          href="/ecosystem"
          sx={{ textTransform: 'none' }}
        >
          View all packages
        </Button>
      </Stack>
      
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {featured.map((pkg) => (
          <Grid item xs={12} sm={6} lg={4} key={pkg.id}>
            <PackageCard pkg={pkg} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

function StrataCallout() {
  const theme = useTheme()
  
  return (
    <Box
      sx={{
        py: { xs: 4, md: 6 },
        px: { xs: 3, md: 6 },
        my: { xs: 4, md: 8 },
        borderRadius: 4,
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: 'primary.main',
          letterSpacing: 2,
          mb: 2,
          display: 'block',
        }}
      >
        Powered by
      </Typography>
      
      <Typography
        variant="h3"
        sx={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: '2rem', md: '2.5rem' },
        }}
      >
        strata
      </Typography>
      
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 600,
          mx: 'auto',
          mb: 3,
        }}
      >
        The animated background you're seeing is built with strata—our procedural 
        3D graphics library. Sky, particles, floating geometry—all layers working together.
      </Typography>
      
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="contained"
          href="/demos/strata"
        >
          Explore Demos
        </Button>
        <Button
          variant="outlined"
          href="https://github.com/jbcom/nodejs-strata"
          target="_blank"
        >
          View Source
        </Button>
      </Stack>
    </Box>
  )
}

export default function HomePage() {
  return (
    <Box>
      <HeroSection />
      <StatsSection />
      <FeaturedSection />
      <StrataCallout />
    </Box>
  )
}
