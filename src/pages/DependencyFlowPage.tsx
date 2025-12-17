/**
 * DependencyFlowPage - Visual representation of how packages build on each other
 *
 * Organized by LANGUAGE - each language has its own dependency ecosystem:
 * - Python: extended-data-types → directed-inputs-class → vendor-connectors → agentic-crew
 * - TypeScript: strata → games, agentic-control → agentic-triage
 * - Go: secretsync → vault-secret-sync
 * - Terraform: terraform-github-markdown → terraform-repository-automation
 */

import { AccountTree, ArrowForward, ExpandMore, Hub, Layers } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
  alpha,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  type Language,
  type Package,
  type PackageTier,
  getPackageById,
  languages,
  packages,
} from '../data/ecosystem'
import { tierColors } from '../theme'

// Tier configuration
const tierConfig: Record<PackageTier, { label: string; color: string; icon: React.ReactNode }> = {
  primitive: {
    label: 'Primitives',
    color: tierColors.primitive,
    icon: <Layers fontSize="small" />,
  },
  core: {
    label: 'Core',
    color: tierColors.core,
    icon: <Hub fontSize="small" />,
  },
  application: {
    label: 'Applications',
    color: tierColors.application,
    icon: <AccountTree fontSize="small" />,
  },
}

interface PackageNodeProps {
  pkg: Package
  isHighlighted: boolean
  onHover: (id: string | null) => void
  highlightedDeps: string[]
  compact?: boolean
}

function PackageNode({ pkg, isHighlighted, onHover, highlightedDeps, compact }: PackageNodeProps) {
  const tier = pkg.tier ? tierConfig[pkg.tier] : tierConfig.application
  const isDependency = highlightedDeps.includes(pkg.id)
  const isActive = isHighlighted || isDependency

  return (
    <Card
      component={Link}
      to={`/ecosystem/${pkg.id}`}
      onMouseEnter={() => onHover(pkg.id)}
      onMouseLeave={() => onHover(null)}
      sx={{
        textDecoration: 'none',
        height: '100%',
        transition: 'all 0.2s ease',
        transform: isActive ? 'scale(1.02)' : 'scale(1)',
        borderColor: isActive ? tier.color : 'divider',
        borderWidth: isActive ? 2 : 1,
        boxShadow: isActive ? `0 4px 20px ${alpha(tier.color, 0.25)}` : 'none',
        backgroundColor: isDependency ? alpha(tier.color, 0.05) : 'background.paper',
      }}
    >
      <CardContent sx={{ p: compact ? 1.5 : 2 }}>
        <Stack direction="row" spacing={0.5} alignItems="center" mb={0.5}>
          <Box sx={{ color: tier.color, display: 'flex' }}>{tier.icon}</Box>
          <Chip
            label={tier.label}
            size="small"
            sx={{
              height: 18,
              fontSize: '0.6rem',
              backgroundColor: alpha(tier.color, 0.15),
              color: tier.color,
            }}
          />
          {pkg.status !== 'stable' && (
            <Chip
              label={pkg.status}
              size="small"
              color={pkg.status === 'beta' ? 'warning' : 'error'}
              sx={{ height: 16, fontSize: '0.55rem', textTransform: 'capitalize' }}
            />
          )}
        </Stack>

        <Typography
          variant={compact ? 'body2' : 'subtitle2'}
          sx={{
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 600,
            color: 'text.primary',
            mb: 0.5,
          }}
        >
          {pkg.displayName}
        </Typography>

        {!compact && (
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
        )}

        {pkg.dependsOn && pkg.dependsOn.length > 0 && (
          <Stack direction="row" spacing={0.5} mt={1} flexWrap="wrap" useFlexGap>
            <Typography variant="caption" color="text.disabled">
              ←
            </Typography>
            {pkg.dependsOn.map((depId) => {
              const dep = getPackageById(depId)
              if (!dep) return null
              const depTier = dep.tier ? tierConfig[dep.tier] : tierConfig.application
              return (
                <Chip
                  key={depId}
                  label={dep.displayName}
                  size="small"
                  sx={{
                    height: 16,
                    fontSize: '0.55rem',
                    borderColor: highlightedDeps.includes(depId) ? depTier.color : 'divider',
                    color: highlightedDeps.includes(depId) ? depTier.color : 'text.secondary',
                    backgroundColor: highlightedDeps.includes(depId)
                      ? alpha(depTier.color, 0.1)
                      : 'transparent',
                  }}
                  variant="outlined"
                />
              )
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}

interface LanguageEcosystemProps {
  language: Language
  packages: Package[]
  defaultExpanded?: boolean
}

function LanguageEcosystem({
  language,
  packages: langPackages,
  defaultExpanded,
}: LanguageEcosystemProps) {
  const lang = languages[language]
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null)

  // Group by tier
  const byTier = useMemo(() => {
    const grouped: Record<PackageTier, Package[]> = {
      primitive: [],
      core: [],
      application: [],
    }
    for (const pkg of langPackages) {
      const tier = pkg.tier || 'application'
      grouped[tier].push(pkg)
    }
    return grouped
  }, [langPackages])

  // Get all dependencies of hovered package (recursive, within same language)
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
          const dep = getPackageById(depId)
          // Only include deps in the same language
          if (dep && dep.language === language) {
            deps.push(depId)
            collectDeps(depId)
          }
        }
      }
    }

    collectDeps(hoveredPackage)
    return deps
  }, [hoveredPackage, language])

  // Count connections within this language
  const connectionCount = useMemo(() => {
    let count = 0
    for (const pkg of langPackages) {
      if (pkg.dependsOn) {
        for (const depId of pkg.dependsOn) {
          const dep = getPackageById(depId)
          if (dep && dep.language === language) count++
        }
      }
    }
    return count
  }, [langPackages, language])

  const hasTiers = byTier.primitive.length > 0 || byTier.core.length > 0

  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      sx={{
        backgroundColor: 'background.paper',
        '&:before': { display: 'none' },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '12px !important',
        mb: 2,
        overflow: 'hidden',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          '&.Mui-expanded': {
            borderBottom: `2px solid ${lang.color}`,
          },
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ width: '100%', pr: 2 }}>
          <Chip
            label={lang.icon}
            sx={{
              backgroundColor: alpha(lang.color, 0.2),
              color: lang.color,
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 700,
              fontSize: '0.875rem',
              minWidth: 48,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {lang.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {langPackages.length} package{langPackages.length !== 1 ? 's' : ''}
              {connectionCount > 0 &&
                ` • ${connectionCount} internal dependenc${connectionCount !== 1 ? 'ies' : 'y'}`}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            {byTier.primitive.length > 0 && (
              <Chip
                icon={<Layers sx={{ fontSize: '0.875rem !important' }} />}
                label={byTier.primitive.length}
                size="small"
                sx={{ backgroundColor: alpha(tierConfig.primitive.color, 0.15) }}
              />
            )}
            {byTier.core.length > 0 && (
              <Chip
                icon={<Hub sx={{ fontSize: '0.875rem !important' }} />}
                label={byTier.core.length}
                size="small"
                sx={{ backgroundColor: alpha(tierConfig.core.color, 0.15) }}
              />
            )}
            {byTier.application.length > 0 && (
              <Chip
                icon={<AccountTree sx={{ fontSize: '0.875rem !important' }} />}
                label={byTier.application.length}
                size="small"
                sx={{ backgroundColor: alpha(tierConfig.application.color, 0.15) }}
              />
            )}
          </Stack>
        </Stack>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 3 }}>
        {hasTiers ? (
          <Stack spacing={3}>
            {/* Primitives */}
            {byTier.primitive.length > 0 && (
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <Box sx={{ color: tierConfig.primitive.color }}>{tierConfig.primitive.icon}</Box>
                  <Typography variant="subtitle2" sx={{ color: tierConfig.primitive.color }}>
                    Primitives
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    — Foundation libraries with zero internal dependencies
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  {byTier.primitive.map((pkg) => (
                    <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                      <PackageNode
                        pkg={pkg}
                        isHighlighted={hoveredPackage === pkg.id}
                        onHover={setHoveredPackage}
                        highlightedDeps={highlightedDeps}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Arrow */}
            {byTier.primitive.length > 0 &&
              (byTier.core.length > 0 || byTier.application.length > 0) && (
                <Box sx={{ display: 'flex', justifyContent: 'center', color: 'text.disabled' }}>
                  <ArrowForward sx={{ transform: 'rotate(90deg)' }} />
                </Box>
              )}

            {/* Core */}
            {byTier.core.length > 0 && (
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <Box sx={{ color: tierConfig.core.color }}>{tierConfig.core.icon}</Box>
                  <Typography variant="subtitle2" sx={{ color: tierConfig.core.color }}>
                    Core
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    — Powerful abstractions built on primitives
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  {byTier.core.map((pkg) => (
                    <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                      <PackageNode
                        pkg={pkg}
                        isHighlighted={hoveredPackage === pkg.id}
                        onHover={setHoveredPackage}
                        highlightedDeps={highlightedDeps}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Arrow */}
            {byTier.core.length > 0 && byTier.application.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', color: 'text.disabled' }}>
                <ArrowForward sx={{ transform: 'rotate(90deg)' }} />
              </Box>
            )}

            {/* Applications */}
            {byTier.application.length > 0 && (
              <Box>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <Box sx={{ color: tierConfig.application.color }}>
                    {tierConfig.application.icon}
                  </Box>
                  <Typography variant="subtitle2" sx={{ color: tierConfig.application.color }}>
                    Applications
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    — End-user tools and experiences
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  {byTier.application.map((pkg) => (
                    <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                      <PackageNode
                        pkg={pkg}
                        isHighlighted={hoveredPackage === pkg.id}
                        onHover={setHoveredPackage}
                        highlightedDeps={highlightedDeps}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Stack>
        ) : (
          // No tier hierarchy - just show all packages
          <Grid container spacing={2}>
            {langPackages.map((pkg) => (
              <Grid item xs={12} sm={6} md={4} key={pkg.id}>
                <PackageNode
                  pkg={pkg}
                  isHighlighted={hoveredPackage === pkg.id}
                  onHover={setHoveredPackage}
                  highlightedDeps={highlightedDeps}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default function DependencyFlowPage() {
  // Group packages by language
  const packagesByLanguage = useMemo(() => {
    const grouped: Record<Language, Package[]> = {
      python: [],
      typescript: [],
      go: [],
      terraform: [],
    }

    for (const pkg of packages) {
      grouped[pkg.language].push(pkg)
    }

    return grouped
  }, [])

  // Order languages by package count (most first)
  const languageOrder = useMemo(() => {
    return (Object.keys(packagesByLanguage) as Language[]).sort(
      (a, b) => packagesByLanguage[b].length - packagesByLanguage[a].length
    )
  }, [packagesByLanguage])

  // Overall stats
  const stats = useMemo(() => {
    let totalDeps = 0
    const langStats: Record<Language, number> = { python: 0, typescript: 0, go: 0, terraform: 0 }

    for (const pkg of packages) {
      if (pkg.dependsOn) {
        for (const depId of pkg.dependsOn) {
          const dep = getPackageById(depId)
          if (dep && dep.language === pkg.language) {
            totalDeps++
            langStats[pkg.language]++
          }
        }
      }
    }

    return { totalDeps, langStats }
  }, [])

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
          The jbcom ecosystem spans multiple languages. Each language ecosystem has its own
          dependency chain where primitive libraries power core packages, which enable sophisticated
          applications.
        </Typography>
      </Box>

      {/* Overall Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {languageOrder.map((lang) => {
          const langConfig = languages[lang]
          const count = packagesByLanguage[lang].length
          const deps = stats.langStats[lang]
          return (
            <Grid item xs={6} sm={3} key={lang}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: 'center',
                  borderTop: `3px solid ${langConfig.color}`,
                }}
              >
                <Chip
                  label={langConfig.icon}
                  sx={{
                    backgroundColor: alpha(langConfig.color, 0.2),
                    color: langConfig.color,
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: 700,
                    mb: 1,
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif' }}
                >
                  {count}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {langConfig.name}
                </Typography>
                {deps > 0 && (
                  <Typography variant="caption" color="text.disabled">
                    {deps} dep{deps !== 1 ? 's' : ''}
                  </Typography>
                )}
              </Paper>
            </Grid>
          )
        })}
      </Grid>

      {/* Interaction Hint */}
      <Alert severity="info" sx={{ mb: 4 }} icon={<Hub />}>
        <Typography variant="body2">
          <strong>Interactive:</strong> Hover over any package to see its dependencies highlighted.
          Dependencies are tracked within each language ecosystem.
        </Typography>
      </Alert>

      {/* Language Ecosystems */}
      {languageOrder.map((lang, index) => (
        <LanguageEcosystem
          key={lang}
          language={lang}
          packages={packagesByLanguage[lang]}
          defaultExpanded={index === 0}
        />
      ))}

      {/* Legend */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Understanding the Architecture
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
                  Zero-dependency foundation. Data types, logging, configuration utilities.
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
                  Combine primitives into powerful abstractions. Connectors, engines, bridges.
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
                  End-user tools. AI orchestration, games, automation workflows.
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
