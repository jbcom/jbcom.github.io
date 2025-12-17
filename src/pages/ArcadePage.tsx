/**
 * ArcadePage - Showcase for all jbcom games
 *
 * Displays playable games and "Coming Soon" cards for games in development.
 * Separate from the Strata technical demos.
 */

import {
  Construction,
  GitHub,
  PlayArrow,
  RocketLaunch,
  SportsEsports,
  Widgets,
} from '@mui/icons-material'
import {
  Alert,
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
  keyframes,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { type Package, getPackagesByCategory, languages } from '../data/ecosystem'

// Pulsing animation for coming soon badge
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`

// Gradient shift animation
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

interface GameCardProps {
  game: Package
}

function GameCard({ game }: GameCardProps) {
  const lang = languages[game.language]
  const isComingSoon = game.comingSoon || !game.demo

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: isComingSoon ? 'none' : 'translateY(-4px)',
          boxShadow: isComingSoon ? 'none' : `0 12px 40px ${alpha('#06b6d4', 0.2)}`,
        },
        // Coming soon overlay effect
        ...(isComingSoon && {
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${alpha('#1e293b', 0.7)}, ${alpha('#0a0f1a', 0.9)})`,
            zIndex: 1,
            pointerEvents: 'none',
          },
        }),
      }}
    >
      {/* Coming Soon Badge */}
      {isComingSoon && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: -32,
            transform: 'rotate(45deg)',
            background: 'linear-gradient(90deg, #f59e0b, #d97706)',
            backgroundSize: '200% 200%',
            animation: `${gradientShift} 3s ease infinite`,
            px: 5,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#000',
              fontWeight: 700,
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Coming Soon
          </Typography>
        </Box>
      )}

      <CardContent
        sx={{
          flexGrow: 1,
          p: 3,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Game Icon/Status */}
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              background: isComingSoon
                ? `linear-gradient(135deg, ${alpha('#f59e0b', 0.2)}, ${alpha('#d97706', 0.1)})`
                : `linear-gradient(135deg, ${alpha('#06b6d4', 0.2)}, ${alpha('#3b82f6', 0.1)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isComingSoon ? '#f59e0b' : '#06b6d4',
            }}
          >
            {isComingSoon ? <Construction /> : <SportsEsports />}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Chip
              label={lang.icon}
              size="small"
              sx={{
                backgroundColor: alpha(lang.color, 0.2),
                color: lang.color,
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
                fontSize: '0.65rem',
              }}
            />
          </Box>
          <Chip
            label={game.status.toUpperCase()}
            size="small"
            color={
              game.status === 'stable' ? 'success' : game.status === 'beta' ? 'warning' : 'error'
            }
            sx={{ fontSize: '0.6rem' }}
          />
        </Stack>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            mb: 1,
            color: isComingSoon ? 'text.secondary' : 'text.primary',
          }}
        >
          {game.displayName}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, lineHeight: 1.7, minHeight: 60 }}
        >
          {game.description}
        </Typography>

        {/* Coming Soon Text */}
        {isComingSoon && game.comingSoonText && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2,
              p: 1.5,
              borderRadius: 1,
              backgroundColor: alpha('#f59e0b', 0.1),
              border: `1px solid ${alpha('#f59e0b', 0.3)}`,
            }}
          >
            <RocketLaunch sx={{ color: '#f59e0b', fontSize: '1rem' }} />
            <Typography
              variant="caption"
              sx={{
                color: '#f59e0b',
                fontWeight: 600,
                animation: `${pulse} 2s ease-in-out infinite`,
              }}
            >
              {game.comingSoonText}
            </Typography>
          </Box>
        )}

        {/* Tags */}
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          {game.tags.slice(0, 4).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                fontSize: '0.65rem',
                height: 20,
                opacity: isComingSoon ? 0.6 : 1,
              }}
            />
          ))}
        </Stack>
      </CardContent>

      {/* Actions */}
      <Box sx={{ px: 3, pb: 3, position: 'relative', zIndex: 2 }}>
        <Stack direction="row" spacing={1}>
          {!isComingSoon && game.demo && (
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              component={Link}
              to={game.demo}
              fullWidth
            >
              Play Now
            </Button>
          )}
          <Button
            variant={isComingSoon ? 'contained' : 'outlined'}
            startIcon={<GitHub />}
            href={game.repo}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth={isComingSoon}
            sx={
              isComingSoon
                ? {
                    backgroundColor: alpha('#06b6d4', 0.1),
                    borderColor: '#06b6d4',
                    color: '#06b6d4',
                    '&:hover': {
                      backgroundColor: alpha('#06b6d4', 0.2),
                    },
                  }
                : {}
            }
          >
            {isComingSoon ? 'View Source' : 'Source'}
          </Button>
        </Stack>
      </Box>
    </Card>
  )
}

export default function ArcadePage() {
  // Get all games from the ecosystem
  const allGames = getPackagesByCategory('games')

  // Separate strata (it's a library, not a game) and actual games
  const games = allGames.filter((g) => g.id !== 'strata')
  const playableGames = games.filter((g) => g.demo && !g.comingSoon)
  const comingSoonGames = games.filter((g) => g.comingSoon || !g.demo)

  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SportsEsports sx={{ fontSize: 32, color: '#fff' }} />
          </Box>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
              }}
            >
              Arcade
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Games built with the jbcom ecosystem
            </Typography>
          </Box>
        </Stack>

        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
          A collection of games showcasing procedural generation, 3D graphics, and interactive
          experiences. All built with{' '}
          <Typography
            component={Link}
            to="/ecosystem/strata"
            sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}
          >
            Strata
          </Typography>{' '}
          and the jbcom package ecosystem.
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center', borderTop: '3px solid #06b6d4' }}>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {games.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Total Games
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center', borderTop: '3px solid #10b981' }}>
            <Typography variant="h4" fontWeight={700} color="success.main">
              {playableGames.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Playable Now
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center', borderTop: '3px solid #f59e0b' }}>
            <Typography variant="h4" fontWeight={700} color="warning.main">
              {comingSoonGames.length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Coming Soon
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center', borderTop: '3px solid #8b5cf6' }}>
            <Typography variant="h4" fontWeight={700} sx={{ color: '#8b5cf6' }}>
              100%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Open Source
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Playable Games */}
      {playableGames.length > 0 && (
        <>
          <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
            <PlayArrow sx={{ mr: 1, verticalAlign: 'middle' }} />
            Play Now
          </Typography>
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {playableGames.map((game) => (
              <Grid item xs={12} sm={6} lg={4} key={game.id}>
                <GameCard game={game} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Coming Soon Games */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        <Construction sx={{ mr: 1, verticalAlign: 'middle', color: '#f59e0b' }} />
        Coming Soon
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }} icon={<RocketLaunch />}>
        <Typography variant="body2">
          These games are in active development. Star the repos on GitHub to get notified when they
          launch!
        </Typography>
      </Alert>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {comingSoonGames.map((game) => (
          <Grid item xs={12} sm={6} lg={4} key={game.id}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>

      {/* Strata Demos Link */}
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          background: `linear-gradient(135deg, ${alpha('#06b6d4', 0.05)}, ${alpha('#3b82f6', 0.05)})`,
          border: `1px solid ${alpha('#06b6d4', 0.2)}`,
        }}
      >
        <Widgets sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Explore the Engine
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
          All games are built with Strata, our procedural 3D graphics engine for React Three Fiber.
          Check out the technical demos to see what powers these games.
        </Typography>
        <Button
          component={Link}
          to="/demos"
          variant="contained"
          size="large"
          startIcon={<PlayArrow />}
        >
          View Strata Demos
        </Button>
      </Paper>
    </Box>
  )
}
