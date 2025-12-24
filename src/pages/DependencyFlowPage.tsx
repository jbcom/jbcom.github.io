import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { packages } from '../data/ecosystem'

export default function DependencyFlowPage() {
  const theme = useTheme()
  const [selectedPkgId, setSelectedPkgId] = useState<string | null>(null)

  const dependencyGraph = useMemo(() => {
    return packages.map((pkg) => ({
      ...pkg,
      dependents: packages.filter((p) => p.dependsOn?.includes(pkg.id)).map((p) => p.id),
    }))
  }, [packages])

  const selectedPkg = useMemo(
    () => dependencyGraph.find((p) => p.id === selectedPkgId),
    [dependencyGraph, selectedPkgId]
  )

  const dependencies = useMemo(() => {
    if (!selectedPkg) return []
    return dependencyGraph.filter((p) => selectedPkg.dependsOn?.includes(p.id))
  }, [dependencyGraph, selectedPkg])

  const dependents = useMemo(() => {
    if (!selectedPkg) return []
    return dependencyGraph.filter((p) => selectedPkg.dependents.includes(p.id))
  }, [dependencyGraph, selectedPkg])

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 1, fontWeight: 700, fontFamily: '"Space Grotesk", sans-serif' }}>
        Dependency Flow
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Explore how packages in the jbcom ecosystem depend on and power each other.
      </Typography>

      <Grid container spacing={4}>
        {/* Package List */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Packages
          </Typography>
          <Stack spacing={1} sx={{ maxHeight: '60vh', overflowY: 'auto', pr: 1 }}>
            {dependencyGraph.map((pkg) => (
              <Card
                key={pkg.id}
                onClick={() => setSelectedPkgId(pkg.id)}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: '1px solid',
                  borderColor: selectedPkgId === pkg.id ? 'primary.main' : 'divider',
                  bgcolor:
                    selectedPkgId === pkg.id
                      ? alpha(theme.palette.primary.main, 0.05)
                      : 'background.paper',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: alpha(theme.palette.primary.main, 0.02),
                  },
                }}
              >
                <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Typography variant="subtitle2" sx={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    {pkg.displayName}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 0.5 }}>
                    {pkg.dependsOn && pkg.dependsOn.length > 0 && (
                      <Chip label={`${pkg.dependsOn.length} deps`} size="small" variant="outlined" sx={{ height: 18, fontSize: '0.65rem' }} />
                    )}
                    {pkg.dependents.length > 0 && (
                      <Chip label={`${pkg.dependents.length} used by`} size="small" variant="outlined" sx={{ height: 18, fontSize: '0.65rem' }} />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>

        {/* Graph View / Details */}
        <Grid item xs={12} md={8}>
          {selectedPkg ? (
            <Card sx={{ height: '100%', minHeight: 400 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, fontFamily: '"JetBrains Mono", monospace' }}>
                  {selectedPkg.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {selectedPkg.description}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3}>
                  {/* Dependencies */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
                      Depends On
                    </Typography>
                    {dependencies.length > 0 ? (
                      <Stack spacing={1}>
                        {dependencies.map(dep => (
                          <Card 
                            key={dep.id} 
                            onClick={() => setSelectedPkgId(dep.id)}
                            sx={{ cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}
                          >
                            <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                              <Typography variant="body2" fontWeight={500}>{dep.displayName}</Typography>
                            </CardContent>
                          </Card>
                        ))}
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.disabled">No internal dependencies</Typography>
                    )}
                  </Grid>

                  {/* Dependents */}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
                      Used By
                    </Typography>
                    {dependents.length > 0 ? (
                      <Stack spacing={1}>
                        {dependents.map(dep => (
                          <Card 
                            key={dep.id} 
                            onClick={() => setSelectedPkgId(dep.id)}
                            sx={{ cursor: 'pointer', '&:hover': { borderColor: 'primary.main' } }}
                          >
                            <CardContent sx={{ py: 1, '&:last-child': { pb: 1 } }}>
                              <Typography variant="body2" fontWeight={500}>{dep.displayName}</Typography>
                            </CardContent>
                          </Card>
                        ))}
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.disabled">Not used by other internal packages</Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ) : (
            <Box sx={{ 
              height: '100%', 
              minHeight: 400, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2
            }}>
              <Typography color="text.disabled">Select a package to view its dependency flow</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
