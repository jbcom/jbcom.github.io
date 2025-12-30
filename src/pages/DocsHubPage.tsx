/**
 * DocsHubPage - Unified Documentation Portal
 *
 * Embeds all organization documentation portals with seamless navigation.
 */

import { OpenInNew as OpenInNewIcon, Refresh as RefreshIcon } from '@mui/icons-material'
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CircularProgress,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { useCallback, useState } from 'react'

const ORG_PORTALS = [
  {
    id: 'strata',
    name: 'Strata',
    description: 'Procedural 3D graphics for React Three Fiber',
    url: 'https://strata.game',
    color: '#14b8a6',
    icon: 'S',
  },
  {
    id: 'agentic',
    name: 'Agentic',
    description: 'AI agent orchestration primitives',
    url: 'https://agentic-dev-library.github.io',
    color: '#8b5cf6',
    icon: 'A',
  },
  {
    id: 'extended-data',
    name: 'Extended Data',
    description: 'Enterprise data utilities and connectors',
    url: 'https://extended-data.dev',
    color: '#3b82f6',
    icon: 'E',
  },
  {
    id: 'arcade-cabinet',
    name: 'Arcade Cabinet',
    description: 'Retro game development platform',
    url: 'https://arcade-cabinet.github.io',
    color: '#ec4899',
    icon: 'AC',
  },
] as const

type PortalId = (typeof ORG_PORTALS)[number]['id']

export default function DocsHubPage() {
  const theme = useTheme()
  const [activePortal, setActivePortal] = useState<PortalId>('strata')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const activeConfig = ORG_PORTALS.find((p) => p.id === activePortal)!

  const handleTabChange = (_: React.SyntheticEvent, newValue: PortalId) => {
    setActivePortal(newValue)
    setLoading(true)
    setError(false)
  }

  const handleLoad = useCallback(() => {
    setLoading(false)
    setError(false)
  }, [])

  const handleError = useCallback(() => {
    setLoading(false)
    setError(true)
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    setError(false)
    const iframe = document.getElementById('docs-iframe') as HTMLIFrameElement
    if (iframe) iframe.src = activeConfig.url
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Documentation Hub
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
          Unified access to all jbcom organization documentation portals.
        </Typography>
      </Box>

      {/* Quick Access Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {ORG_PORTALS.map((portal) => (
          <Grid item xs={6} sm={3} key={portal.id}>
            <Card
              sx={{
                border: activePortal === portal.id ? `2px solid ${portal.color}` : undefined,
                transition: 'all 0.2s',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.shadows[8] },
              }}
            >
              <CardActionArea
                onClick={() => handleTabChange({} as React.SyntheticEvent, portal.id)}
                sx={{ p: 2 }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: portal.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: 'white',
                    }}
                  >
                    {portal.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {portal.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {portal.description}
                    </Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Tabs value={activePortal} onChange={handleTabChange} variant="scrollable">
          {ORG_PORTALS.map((portal) => (
            <Tab
              key={portal.id}
              value={portal.id}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: portal.color }} />
                  {portal.name}
                </Box>
              }
              sx={{ textTransform: 'none', '&.Mui-selected': { color: portal.color } }}
            />
          ))}
        </Tabs>
        <Box sx={{ display: 'flex', gap: 1, pr: 1 }}>
          <Tooltip title="Refresh">
            <IconButton size="small" onClick={handleRefresh}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open in new tab">
            <IconButton
              size="small"
              component="a"
              href={activeConfig.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <OpenInNewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Iframe */}
      <Box
        sx={{
          position: 'relative',
          height: 'calc(100vh - 380px)',
          minHeight: 500,
          mt: 2,
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.paper',
            }}
          >
            <CircularProgress sx={{ color: activeConfig.color }} />
          </Box>
        )}
        {error && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Alert severity="info">Unable to embed. Click below to open directly.</Alert>
            <Typography
              component="a"
              href={activeConfig.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                px: 3,
                py: 1.5,
                bgcolor: activeConfig.color,
                color: 'white',
                borderRadius: 1,
                textDecoration: 'none',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              Open {activeConfig.name} <OpenInNewIcon fontSize="small" />
            </Typography>
          </Box>
        )}
        <Box
          component="iframe"
          id="docs-iframe"
          src={activeConfig.url}
          title={`${activeConfig.name} Documentation`}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          onLoad={handleLoad}
          onError={handleError}
          sx={{ width: '100%', height: '100%', border: 'none', display: error ? 'none' : 'block' }}
        />
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', textAlign: 'center', mt: 3 }}
      >
        All portals are part of the jbcom enterprise ecosystem. © 2025 Jon Bogaty.
      </Typography>
    </Box>
  )
}
