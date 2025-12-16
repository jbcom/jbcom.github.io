/**
 * ProjectPage - Individual package detail view
 */

import { ArrowBack, GitHub, OpenInNew } from '@mui/icons-material'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Link,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { Navigate, Link as RouterLink, useParams } from 'react-router-dom'
import { categories, getPackageById, languages } from '../data/ecosystem'

export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const theme = useTheme()

  const pkg = projectId ? getPackageById(projectId) : null

  if (!pkg) {
    return <Navigate to="/ecosystem" replace />
  }

  const lang = languages[pkg.language]
  const cat = categories[pkg.category]

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
    </Box>
  )
}
