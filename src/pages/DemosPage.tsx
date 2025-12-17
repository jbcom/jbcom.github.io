/**
 * DemosPage - Live Game Demos
 *
 * Showcases playable games deployed to GitHub Pages.
 * Pure Material UI - no 3D dependencies. Individual repos maintain their own demos.
 */

import { GitHub, OpenInNew, SportsEsports } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'

interface LiveGame {
  id: string
  name: string
  description: string
  url: string
  repo: string
  tags: string[]
  instructions: string
}

// Live games deployed to GitHub Pages
const liveGames: LiveGame[] = [
  {
    id: 'otter-river-rush',
    name: 'Otter River Rush',
    description: 'Fast-paced river racing with procedurally generated levels.',
    url: 'https://jbcom.github.io/otter-river-rush/',
    repo: 'https://github.com/jbcom/nodejs-otter-river-rush',
    tags: ['Racing', 'Procedural', 'WebGL'],
    instructions: 'Arrow keys or WASD to navigate. Collect power-ups and avoid obstacles!',
  },
]

function GameCard({
  game,
  active,
  onClick,
}: {
  game: LiveGame
  active: boolean
  onClick: () => void
}) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        borderColor: active ? 'primary.main' : 'divider',
        borderWidth: active ? 2 : 1,
        borderStyle: 'solid',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          transform: 'translateY(-2px)',
        },
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: 2,
        },
      }}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <SportsEsports fontSize="small" color={active ? 'primary' : 'action'} />
          <Typography fontWeight={600}>{game.name}</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {game.description}
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {game.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

function GameViewer({ game }: { game: LiveGame }) {
  const [loading, setLoading] = useState(true)

  return (
    <Card sx={{ height: { xs: 400, md: 500 } }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" py={1.5}>
          <Stack direction="row" spacing={1} alignItems="center">
            <SportsEsports color="primary" />
            <Typography fontWeight={600}>{game.name}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              startIcon={<OpenInNew />}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Fullscreen
            </Button>
            <Button
              size="small"
              startIcon={<GitHub />}
              href={game.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ height: 'calc(100% - 57px)', position: 'relative' }}>
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.paper',
              gap: 2,
            }}
          >
            <CircularProgress />
            <Typography variant="body2" color="text.secondary">
              Loading game...
            </Typography>
          </Box>
        )}
        <Box
          component="iframe"
          src={game.url}
          title={game.name}
          sandbox="allow-scripts allow-same-origin allow-popups"
          onLoad={() => setLoading(false)}
          sx={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: 1,
          }}
        />
      </Box>
    </Card>
  )
}

export default function DemosPage() {
  const [activeGame, setActiveGame] = useState<LiveGame | null>(liveGames[0] || null)

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 1 }}
      >
        Live Demos
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
        Play games built with the jbcom ecosystem. All games run entirely in your browser - click
        "Fullscreen" for the best experience.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            {liveGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                active={activeGame ? game.id === activeGame.id : false}
                onClick={() => setActiveGame(game)}
              />
            ))}

            {/* Instructions card */}
            {activeGame && (
              <Card sx={{ bgcolor: 'action.hover' }}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    How to Play
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activeGame.instructions}
                  </Typography>
                </CardContent>
              </Card>
            )}

            {/* Coming soon placeholder */}
            <Card
              sx={{
                borderStyle: 'dashed',
                borderColor: 'divider',
                borderWidth: 1,
                opacity: 0.7,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                  More games coming soon...
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} md={8}>
          {activeGame && <GameViewer key={activeGame.id} game={activeGame} />}
        </Grid>
      </Grid>
    </Box>
  )
}
