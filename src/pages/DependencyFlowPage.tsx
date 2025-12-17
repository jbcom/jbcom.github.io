/**
 * DependencyFlowPage - Visual representation of how packages build on each other
 *
 * Shows the layered architecture: Primitives → Core → Applications
 * Uses MUI components with custom CSS for connecting lines
 */

import { AccountTree, ArrowDownward, GitHub, Hub, Layers } from '@mui/icons-material'
import type { SxProps, Theme } from '@mui/material'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Fade,
  Grid,
  Paper,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  type Package,
  type PackageTier,
  categories,
  getPackageById,
  languages,
  packages,
} from '../data/ecosystem'

// Tier configuration with colors and icons
const tierConfig: Record<
  PackageTier,
  { label: string; description: string; color: string; icon: React.ReactNode }
> = {
  primitive: {
    label: 'Primitives',
    description: 'Foundation libraries providing core data types, logging, and configuration',
    color: '#f59e0b', // amber/warning
    icon: <Layers />,
  },
  core: {
    label: 'Core',
    description: 'Mid-level packages that combine primitives into powerful abstractions',
    color: '#06b6d4', // cyan/primary
    icon: <Hub />,
  },
  application: {
    label: 'Applications',
    description: 'End-user tools and applications built on core packages',
    color: '#8b5cf6', // violet
    icon: <AccountTree />,
  },
}

// Styled container for tier sections
const tierSectionSx: SxProps<Theme> = {
  position: 'relative',
  py: 4,
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'divider',
    transform: 'translateX(-50%)',
    zIndex: 0,
  },
}

interface PackageNodeProps {
  pkg: Package
  isHighlighted: boolean
  onHover: (id: string | null) => void
  highlightedDeps: string[]
}

function PackageNode({ pkg, isHighlighted, onHover, highlightedDeps }: PackageNodeProps) {
  const theme = useTheme()
  const lang = languages[pkg.language]
  const cat = categories[pkg.category]
  const tier = pkg.tier ? tierConfig[pkg.tier] : null

  const isDependency = highlightedDeps.includes(pkg.id)
  const isActive = isHighlighted || isDependency

  return (
    <Fade in timeout={300}>
      <Card
        component={Link}
        to={`/ecosystem/${pkg.id}`}
        onMouseEnter={() => onHover(pkg.id)}
        onMouseLeave={() => onHover(null)}
        sx={{
          textDecoration: 'none',
          position: 'relative',
          zIndex: isActive ? 10 : 1,
          transition: 'all 0.3s ease',
          transform: isActive ? 'scale(1.02)' : 'scale(1)',
          borderColor: isActive ? tier?.color || cat.color : 'divider',
          boxShadow: isActive
            ? `0 8px 32px ${alpha(tier?.color || cat.color, 0.3)}`
            : 'none',
          '&:hover': {
            borderColor: tier?.color || cat.color,
          },
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Chip
              label={lang.icon}
              size="small"
              sx={{
                backgroundColor: alpha(lang.color, 0.2),
                color: lang.color,
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
                fontSize: '0.65rem',
                height: 20,
              }}
            />
            {pkg.status !== 'stable' && (
              <Chip
                label={pkg.status}
                size="small"
                color={pkg.status === 'beta' ? 'warning' : 'error'}
                sx={{ fontSize: '0.6rem', height: 18, textTransform: 'capitalize' }}
              />
            )}
          </Stack>

          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 600,
              color: 'text.primary',
              mb: 0.5,
            }}
          >
            {pkg.displayName}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.4,
            }}
          >
            {pkg.description}
          </Typography>

          {pkg.dependsOn && pkg.dependsOn.length > 0 && (
            <Stack direction="row" spacing={0.5} mt={1.5} flexWrap="wrap" useFlexGap>
              <Typography variant="caption" color="text.disabled" sx={{ mr: 0.5 }}>
                Uses:
              </Typography>
              {pkg.dependsOn.map((depId) => {
                const dep = getPackageById(depId)
                return dep ? (
                  <Chip
                    key={depId}
                    label={dep.displayName}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: '0.6rem',
                      height: 18,
                      borderColor: highlightedDeps.includes(depId) ? 'primary.main' : 'divider',
                      color: highlightedDeps.includes(depId) ? 'primary.main' : 'text.secondary',
                    }}
                  />
                ) : null
              })}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Fade>
  )
}

function TierSection({
  tier,
  packages: tierPackages,
  hoveredPackage,
  onHover,
  highlightedDeps,
}: {
  tier: PackageTier
  packages: Package[]
  hoveredPackage: string | null
  onHover: (id: string | null) => void
  highlightedDeps: string[]
}) {
  const theme = useTheme()
  const config = tierConfig[tier]

  if (tierPackages.length === 0) return null

  return (
    <Box sx={{ mb: 6 }}>
      {/* Tier Header */}
      <Paper
        elevation={0}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.5,
          px: 3,
          py: 1.5,
          mb: 3,
          borderRadius: 2,
          backgroundColor: alpha(config.color, 0.1),
          border: `1px solid ${alpha(config.color, 0.3)}`,
        }}
      >
        <Box sx={{ color: config.color }}>{config.icon}</Box>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: config.color, lineHeight: 1.2 }}
          >
            {config.label}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {config.description}
          </Typography>
        </Box>
      </Paper>

      {/* Package Grid */}
      <Grid container spacing={2}>
        {tierPackages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pkg.id}>
            <PackageNode
              pkg={pkg}
              isHighlighted={hoveredPackage === pkg.id}
              onHover={onHover}
              highlightedDeps={highlightedDeps}
            />
          </Grid>
        ))}
      </Grid>

      {/* Flow Arrow */}
      {tier !== 'application' && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 3,
            color: 'text.disabled',
          }}
        >
          <ArrowDownward fontSize="large" />
        </Box>
      )}
    </Box>
  )
}

export default function DependencyFlowPage() {
  const theme = useTheme()
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)

  // Group packages by tier
  const packagesByTier = useMemo(() => {
    const grouped: Record<PackageTier, Package[]> = {
      primitive: [],
      core: [],
      application: [],
    }

    for (const pkg of packages) {
      const tier = pkg.tier || 'application'
      grouped[tier].push(pkg)
    }

    return grouped
  }, [])

  // Get all dependencies of hovered package (recursive)
  const highlightedDeps = useMemo(() => {
    if (!hoveredPackage) return []

    const deps: string[] = []
    const visited = new Set<string>()

    function collectDeps(pkgId: string) {
      if (visited.has(pkgId)) return
      visited.add(pkgId)

      const pkg = getPackageById(pkgId)
      if (pkg?.dependsOn) {
        for (const depId of pkg.dependsOn) {
          deps.push(depId)
          collectDeps(depId)
        }
      }
    }

    collectDeps(hoveredPackage)
    return deps
  }, [hoveredPackage])

  // Stats
  const stats = useMemo(() => {
    let totalDeps = 0
    for (const pkg of packages) {
      totalDeps += pkg.dependsOn?.length || 0
    }
    return {
      primitives: packagesByTier.primitive.length,
      core: packagesByTier.core.length,
      applications: packagesByTier.application.length,
      totalConnections: totalDeps,
    }
  }, [packagesByTier])

  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            mb: 1,
          }}
        >
          Package Architecture
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
          The jbcom ecosystem follows a layered architecture. Primitive libraries provide
          foundational capabilities that power core packages, which in turn enable
          sophisticated applications.
        </Typography>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {[
          { label: 'Primitives', value: stats.primitives, color: tierConfig.primitive.color },
          { label: 'Core Packages', value: stats.core, color: tierConfig.core.color },
          { label: 'Applications', value: stats.applications, color: tierConfig.application.color },
          { label: 'Dependencies', value: stats.totalConnections, color: theme.palette.text.secondary },
        ].map((stat) => (
          <Grid item xs={6} sm={3} key={stat.label}>
            <Paper
              sx={{
                p: 2,
                textAlign: 'center',
                borderLeft: `3px solid ${stat.color}`,
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: stat.color, fontFamily: '"Space Grotesk", sans-serif' }}
              >
                {stat.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Interaction Hint */}
      <Alert severity="info" sx={{ mb: 4 }} icon={<Hub />}>
        <Typography variant="body2">
          <strong>Interactive:</strong> Hover over any package to see its dependencies highlighted
          throughout the architecture.
        </Typography>
      </Alert>

      {/* Dependency Flow */}
      <Box>
        <TierSection
          tier="primitive"
          packages={packagesByTier.primitive}
          hoveredPackage={hoveredPackage}
          onHover={setHoveredPackage}
          highlightedDeps={highlightedDeps}
        />

        <TierSection
          tier="core"
          packages={packagesByTier.core}
          hoveredPackage={hoveredPackage}
          onHover={setHoveredPackage}
          highlightedDeps={highlightedDeps}
        />

        <TierSection
          tier="application"
          packages={packagesByTier.application}
          hoveredPackage={hoveredPackage}
          onHover={setHoveredPackage}
          highlightedDeps={highlightedDeps}
        />
      </Box>

      {/* Legend */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          How to Read This
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Box sx={{ color: tierConfig.primitive.color, mt: 0.5 }}>
                <Layers />
              </Box>
              <Box>
                <Typography variant="subtitle2" color={tierConfig.primitive.color}>
                  Primitives
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Zero-dependency foundation libraries. Data types, logging, configuration.
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Box sx={{ color: tierConfig.core.color, mt: 0.5 }}>
                <Hub />
              </Box>
              <Box>
                <Typography variant="subtitle2" color={tierConfig.core.color}>
                  Core
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Combine primitives into powerful abstractions. Connectors, graphics engines.
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Box sx={{ color: tierConfig.application.color, mt: 0.5 }}>
                <AccountTree />
              </Box>
              <Box>
                <Typography variant="subtitle2" color={tierConfig.application.color}>
                  Applications
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  End-user tools and games. AI orchestration, procedural games, automation.
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
