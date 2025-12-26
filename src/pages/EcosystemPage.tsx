/**
 * EcosystemPage - Full catalog of jbcom packages
 */

import { Close, FilterList, OpenInNew, Search } from '@mui/icons-material'
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { memo, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  type Category,
  categories,
  type Language,
  languages,
  type Package,
  packages,
} from '../data/ecosystem'
import { useDebounce } from '../hooks/useDebounce'

// Pre-compute lowercase values for search to avoid repeated calculations
const searchablePackages = packages.map((pkg) => ({
  ...pkg,
  searchText: `${pkg.displayName} ${pkg.description} ${pkg.tags.join(' ')}`.toLowerCase(),
}))

const PackageCard = memo(function PackageCard({ pkg }: { pkg: Package }) {
  const theme = useTheme()
  const lang = languages[pkg.language]
  const cat = categories[pkg.category]

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
          boxShadow: `0 12px 40px ${alpha(cat.color, 0.15)}`,
          borderColor: cat.color,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
        {/* Header */}
        <Stack direction="row" spacing={1} alignItems="center" mb={2} flexWrap="wrap">
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
          <Chip
            label={cat.name}
            size="small"
            sx={{
              backgroundColor: alpha(cat.color, 0.15),
              color: cat.color,
              fontSize: '0.7rem',
            }}
          />
          {pkg.status === 'beta' && (
            <Chip
              label="Beta"
              size="small"
              color="warning"
              sx={{ fontSize: '0.65rem', height: 20 }}
            />
          )}
          {pkg.status === 'alpha' && (
            <Chip
              label="Alpha"
              size="small"
              color="error"
              sx={{ fontSize: '0.65rem', height: 20 }}
            />
          )}
        </Stack>

        {/* Title */}
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

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {pkg.description}
        </Typography>

        {/* Tags */}
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          {pkg.tags.slice(0, 4).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{
                fontSize: '0.65rem',
                height: 20,
                mb: 0.5,
              }}
            />
          ))}
        </Stack>
      </CardContent>

      {/* Actions */}
      <Box
        sx={{
          px: { xs: 2, md: 3 },
          pb: { xs: 2, md: 3 },
          pt: 0,
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
        }}
      >
        <Button
          size="small"
          endIcon={<OpenInNew sx={{ fontSize: '0.875rem' }} />}
          href={pkg.repo}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ textTransform: 'none', fontSize: '0.8rem' }}
          aria-label={`View ${pkg.displayName} source on GitHub`}
        >
          GitHub
        </Button>
        {pkg.npm && (
          <Button
            size="small"
            href={`https://npmjs.com/package/${pkg.npm}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textTransform: 'none', fontSize: '0.8rem' }}
            aria-label={`View ${pkg.displayName} on npm`}
          >
            npm
          </Button>
        )}
        {pkg.pypi && (
          <Button
            size="small"
            href={`https://pypi.org/project/${pkg.pypi}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textTransform: 'none', fontSize: '0.8rem' }}
            aria-label={`View ${pkg.displayName} on PyPI`}
          >
            PyPI
          </Button>
        )}
        {pkg.demo && (
          <Button
            size="small"
            color="primary"
            variant="outlined"
            href={pkg.demo}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textTransform: 'none', fontSize: '0.8rem' }}
            aria-label={`View ${pkg.displayName} demo`}
          >
            Demo
          </Button>
        )}
      </Box>
    </Card>
  )
})

export default function EcosystemPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  // Initialize filters from search params or default to 'all'
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>(
    (searchParams.get('category') as Category) || 'all'
  )
  const [languageFilter, setLanguageFilter] = useState<Language | 'all'>(
    (searchParams.get('language') as Language) || 'all'
  )

  // Update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams)

    if (categoryFilter !== 'all') {
      newParams.set('category', categoryFilter)
    } else {
      newParams.delete('category')
    }

    if (languageFilter !== 'all') {
      newParams.set('language', languageFilter)
    } else {
      newParams.delete('language')
    }

    // Only update if params actually changed to avoid infinite loops
    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams, { replace: true })
    }
  }, [categoryFilter, languageFilter, searchParams, setSearchParams])

  const filteredPackages = useMemo(() => {
    let result = searchablePackages

    // Search filter
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase()
      result = result.filter((pkg) => pkg.searchText.includes(searchLower))
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((pkg) => pkg.category === categoryFilter)
    }

    // Language filter
    if (languageFilter !== 'all') {
      result = result.filter((pkg) => pkg.language === languageFilter)
    }

    return result
  }, [debouncedSearch, categoryFilter, languageFilter])

  return (
    <Box sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            mb: 1,
          }}
        >
          Ecosystem
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {packages.length} packages across AI, games, infrastructure, and utilities
        </Typography>
      </Box>

      {/* Filters */}
      <Card
        sx={{
          mb: 4,
          p: { xs: 2, md: 3 },
          background: alpha(theme.palette.background.paper, 0.6),
          backdropFilter: 'blur(10px)',
        }}
      >
        <Stack spacing={2}>
          {/* Search */}
          <TextField
            fullWidth
            placeholder="Search packages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Clear search"
                    onClick={() => setSearch('')}
                    edge="end"
                    size="small"
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{
              'aria-label': 'Search packages',
              maxLength: 100,
            }}
            size="small"
          />

          {/* Category Filter */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <FilterList fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Category
              </Typography>
            </Stack>
            <ToggleButtonGroup
              value={categoryFilter}
              exclusive
              onChange={(_, value) => value && setCategoryFilter(value)}
              size="small"
              aria-label="Filter by category"
              sx={{
                flexWrap: 'wrap',
                '& .MuiToggleButton-root': {
                  textTransform: 'none',
                  px: { xs: 1.5, sm: 2 },
                  py: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                },
              }}
            >
              <ToggleButton value="all">All</ToggleButton>
              {(Object.entries(categories) as [Category, typeof categories.ai][]).map(
                ([key, cat]) => (
                  <ToggleButton key={key} value={key}>
                    {isMobile ? key.toUpperCase() : cat.name}
                  </ToggleButton>
                )
              )}
            </ToggleButtonGroup>
          </Box>

          {/* Language Filter */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <FilterList fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Language
              </Typography>
            </Stack>
            <ToggleButtonGroup
              value={languageFilter}
              exclusive
              onChange={(_, value) => value && setLanguageFilter(value)}
              size="small"
              aria-label="Filter by language"
              sx={{
                flexWrap: 'wrap',
                '& .MuiToggleButton-root': {
                  textTransform: 'none',
                  px: { xs: 1.5, sm: 2 },
                  py: 0.5,
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                },
              }}
            >
              <ToggleButton value="all">All</ToggleButton>
              {(Object.entries(languages) as [Language, typeof languages.typescript][]).map(
                ([key, lang]) => (
                  <ToggleButton
                    key={key}
                    value={key}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: alpha(lang.color, 0.2),
                        borderColor: lang.color,
                      },
                    }}
                  >
                    {lang.name}
                  </ToggleButton>
                )
              )}
            </ToggleButtonGroup>
          </Box>
        </Stack>
      </Card>

      {/* Results */}
      <Typography variant="body2" color="text.secondary" mb={2}>
        {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''} found
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {filteredPackages.map((pkg) => (
          <Grid item xs={12} sm={6} lg={4} key={pkg.id}>
            <PackageCard pkg={pkg} />
          </Grid>
        ))}
      </Grid>

      {filteredPackages.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            color: 'text.secondary',
          }}
        >
          <Typography variant="h6" mb={1}>
            No packages found
          </Typography>
          <Typography variant="body2">Try adjusting your search or filters</Typography>
        </Box>
      )}
    </Box>
  )
}
