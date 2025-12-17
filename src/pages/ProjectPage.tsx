/**
 * ProjectPage - Individual package detail view
 *
 * Shows package details including dependencies and dependents
 */

import { AccountTree, ArrowBack, GitHub, Hub, Layers, OpenInNew } from '@mui/icons-material'
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { useMemo } from 'react'
import { Navigate, Link as RouterLink, useParams } from 'react-router-dom'
import {
  type PackageTier,
  categories,
  getPackageById,
  languages,
  packages,
} from '../data/ecosystem'

// Tier icons and colors - using ReactElement for Chip icon compatibility
const tierConfig: Record<PackageTier, { icon: React.ReactElement; color: string }> = {
  primitive: { icon: <Layers fontSize="small" />, color: '#f59e0b' },
  core: { icon: <Hub fontSize="small" />, color: '#06b6d4' },
  application: { icon: <AccountTree fontSize="small" />, color: '#8b5cf6' },
}

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const theme = useTheme()

  const pkg = projectId ? getPackageById(projectId) : null

  // Get packages that depend on this one
  const dependents = useMemo(() => {
    if (!pkg) return []
    return packages.filter((p) => p.dependsOn?.includes(pkg.id))
  }, [pkg])

  // Get resolved dependencies
  const dependencies = useMemo(() => {
    if (!pkg?.dependsOn) return []
    return pkg.dependsOn.map((id) => getPackageById(id)).filter(Boolean)
  }, [pkg])

  if (!pkg) {
    return <Navigate to="/ecosystem" replace />
  }

  const lang = languages[pkg.language]
  const cat = categories[pkg.category]
  const tier = pkg.tier || 'application'
  const tierInfo = tierConfig[tier]

  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component={RouterLink}
          to="/ecosystem"
          underline="hover"
          color="text.secondary"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <ArrowBack sx={{ mr: 0.5, fontSize: '1rem' }} />
          Ecosystem
        </Link>
        <Typography color="text.primary">{pkg.displayName}</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={2} flexWrap="wrap">
          <Chip
            label={lang.icon}
            sx={{
              backgroundColor: alpha(lang.color, 0.2),
              color: lang.color,
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 600,
            }}
          />
          <Chip
            label={cat.name}
            sx={{
              backgroundColor: alpha(cat.color, 0.15),
              color: cat.color,
            }}
          />
          <Chip
            icon={tierInfo.icon}
            label={tier.charAt(0).toUpperCase() + tier.slice(1)}
            sx={{
              backgroundColor: alpha(tierInfo.color, 0.15),
              color: tierInfo.color,
              '& .MuiChip-icon': { color: tierInfo.color },
            }}
          />
          {pkg.status !== 'stable' && (
            <Chip
              label={pkg.status.toUpperCase()}
              color={pkg.status === 'beta' ? 'warning' : 'error'}
            />
          )}
        </Stack>

        <Typography
          variant="h2"
          sx={{
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 700,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            mb: 2,
          }}
        >
          {pkg.displayName}
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontWeight: 400,
            maxWidth: 700,
          }}
        >
          {pkg.description}
        </Typography>
      </Box>

      {/* Actions */}
      <Stack direction="row" spacing={2} mb={4} flexWrap="wrap" useFlexGap>
        <Button
          variant="contained"
          startIcon={<GitHub />}
          href={pkg.repo}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </Button>
        {pkg.npm && (
          <Button
            variant="outlined"
            endIcon={<OpenInNew />}
            href={`https://npmjs.com/package/${pkg.npm}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            npm: {pkg.npm}
          </Button>
        )}
        {pkg.pypi && (
          <Button
            variant="outlined"
            endIcon={<OpenInNew />}
            href={`https://pypi.org/project/${pkg.pypi}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            PyPI: {pkg.pypi}
          </Button>
        )}
        {pkg.demo && (
          <Button
            variant="outlined"
            color="secondary"
            href={pkg.demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </Button>
        )}
      </Stack>

      <Grid container spacing={3}>
        {/* Description */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              background: alpha(theme.palette.background.paper, 0.6),
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h5" fontWeight={600} mb={3}>
                About
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  whiteSpace: 'pre-line',
                  lineHeight: 1.8,
                }}
              >
                {pkg.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Info Card */}
            <Card
              sx={{
                background: alpha(theme.palette.background.paper, 0.6),
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                  Language
                </Typography>
                <Chip
                  label={lang.name}
                  sx={{
                    backgroundColor: alpha(lang.color, 0.2),
                    color: lang.color,
                    mb: 2,
                  }}
                />

                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                  Category
                </Typography>
                <Chip
                  label={cat.name}
                  sx={{
                    backgroundColor: alpha(cat.color, 0.15),
                    color: cat.color,
                    mb: 2,
                  }}
                />

                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                  Status
                </Typography>
                <Chip
                  label={pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                  color={
                    pkg.status === 'stable'
                      ? 'success'
                      : pkg.status === 'beta'
                        ? 'warning'
                        : 'error'
                  }
                />
              </CardContent>
            </Card>

            {/* Dependencies */}
            {(dependencies.length > 0 || dependents.length > 0) && (
              <Card
                sx={{
                  background: alpha(theme.palette.background.paper, 0.6),
                  backdropFilter: 'blur(10px)',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {dependencies.length > 0 && (
                    <>
                      <Typography variant="subtitle2" color="text.secondary" mb={1}>
                        Depends On
                      </Typography>
                      <Stack spacing={1} sx={{ mb: dependents.length > 0 ? 2 : 0 }}>
                        {dependencies.map((dep) => {
                          if (!dep) return null
                          const depTier = dep.tier || 'application'
                          const depTierInfo = tierConfig[depTier]
                          return (
                            <Chip
                              key={dep.id}
                              component={RouterLink}
                              to={`/ecosystem/${dep.id}`}
                              label={dep.displayName}
                              size="small"
                              icon={depTierInfo.icon}
                              clickable
                              sx={{
                                backgroundColor: alpha(depTierInfo.color, 0.1),
                                borderColor: depTierInfo.color,
                                '& .MuiChip-icon': { color: depTierInfo.color },
                              }}
                              variant="outlined"
                            />
                          )
                        })}
                      </Stack>
                    </>
                  )}

                  {dependencies.length > 0 && dependents.length > 0 && <Divider sx={{ my: 2 }} />}

                  {dependents.length > 0 && (
                    <>
                      <Typography variant="subtitle2" color="text.secondary" mb={1}>
                        Used By
                      </Typography>
                      <Stack spacing={1}>
                        {dependents.map((dep) => {
                          const depTier = dep.tier || 'application'
                          const depTierInfo = tierConfig[depTier]
                          return (
                            <Chip
                              key={dep.id}
                              component={RouterLink}
                              to={`/ecosystem/${dep.id}`}
                              label={dep.displayName}
                              size="small"
                              icon={depTierInfo.icon}
                              clickable
                              sx={{
                                backgroundColor: alpha(depTierInfo.color, 0.1),
                                borderColor: depTierInfo.color,
                                '& .MuiChip-icon': { color: depTierInfo.color },
                              }}
                              variant="outlined"
                            />
                          )
                        })}
                      </Stack>
                    </>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            <Card
              sx={{
                background: alpha(theme.palette.background.paper, 0.6),
                backdropFilter: 'blur(10px)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  Tags
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {pkg.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ mb: 0.5 }} />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Architecture Link */}
      <Alert
        severity="info"
        sx={{ mt: 4 }}
        action={
          <Button component={RouterLink} to="/architecture" color="inherit" size="small">
            View Architecture
          </Button>
        }
      >
        See how this package fits into the overall jbcom ecosystem architecture.
      </Alert>
    </Box>
  )
}
