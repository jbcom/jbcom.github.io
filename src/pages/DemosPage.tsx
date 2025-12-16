/**
 * DemosPage - Interactive strata demonstrations
 * 
 * This page is the ultimate dogfooding showcase:
 * - Each demo uses strata components directly
 * - Users can interact with the 3D scenes
 * - The code is visible and documented
 * 
 * Strata's layer system is on full display here.
 */

import { Suspense, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Chip,
  Button,
  alpha,
  useTheme,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material'
import { Canvas } from '@react-three/fiber'
import {
  Stars,
  Cloud,
  Float,
  Environment,
  OrbitControls,
  Sparkles,
  Sky,
  MeshDistortMaterial,
} from '@react-three/drei'
import { PlayArrow, Code, GitHub } from '@mui/icons-material'

// ═══════════════════════════════════════════════════════════════════════════
// DEMO SCENES - Each demonstrates strata's layer capabilities
// ═══════════════════════════════════════════════════════════════════════════

function LayeredSkyDemo() {
  return (
    <>
      {/* Background Layer */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Midground Layer */}
      <Cloud position={[-4, 2, -10]} opacity={0.3} speed={0.2} width={10} depth={3} />
      <Cloud position={[4, -1, -8]} opacity={0.2} speed={0.15} width={8} depth={2} />
      <Sparkles count={50} size={3} scale={[10, 10, 10]} speed={0.3} opacity={0.5} color="#0ea5e9" />
      
      {/* Foreground - Interactive object */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#0ea5e9"
            emissive="#0ea5e9"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            distort={0.3}
            speed={2}
          />
        </mesh>
      </Float>
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  )
}

function VolumetricFogDemo() {
  return (
    <>
      {/* Deep background */}
      <color attach="background" args={['#020617']} />
      <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade />
      
      {/* Volumetric fog layers */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Cloud
          key={i}
          position={[(i - 3) * 3, Math.sin(i) * 2, -15 + i * 2]}
          opacity={0.15}
          speed={0.05 + i * 0.02}
          width={12}
          depth={4}
          segments={40}
          color={i % 2 === 0 ? '#0ea5e9' : '#7c3aed'}
        />
      ))}
      
      <Sparkles count={200} size={2} scale={[20, 10, 20]} speed={0.2} opacity={0.4} color="#0ea5e9" />
      
      {/* Floating orbs */}
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={0.5 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh position={[(i - 2) * 2.5, Math.sin(i * 1.5), -5]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#0ea5e9' : '#7c3aed'}
              emissive={i % 2 === 0 ? '#0ea5e9' : '#7c3aed'}
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
      
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 0]} intensity={1} color="#0ea5e9" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#7c3aed" />
      <OrbitControls enableZoom={true} enablePan={true} />
    </>
  )
}

function GeometricWorldDemo() {
  return (
    <>
      <color attach="background" args={['#0c1929']} />
      
      {/* Background stars */}
      <Stars radius={150} depth={60} count={2000} factor={5} fade />
      
      {/* Floating geometric shapes */}
      {[
        { pos: [-3, 2, -5], geo: 'octahedron', color: '#0ea5e9' },
        { pos: [3, -1, -4], geo: 'dodecahedron', color: '#7c3aed' },
        { pos: [0, 1, -6], geo: 'icosahedron', color: '#10b981' },
        { pos: [-2, -2, -3], geo: 'tetrahedron', color: '#f59e0b' },
        { pos: [2, 2, -7], geo: 'octahedron', color: '#ec4899' },
      ].map((shape, i) => (
        <Float key={i} speed={0.8} rotationIntensity={1} floatIntensity={0.5}>
          <mesh position={shape.pos as [number, number, number]}>
            {shape.geo === 'octahedron' && <octahedronGeometry args={[0.8]} />}
            {shape.geo === 'dodecahedron' && <dodecahedronGeometry args={[0.7]} />}
            {shape.geo === 'icosahedron' && <icosahedronGeometry args={[0.9, 1]} />}
            {shape.geo === 'tetrahedron' && <tetrahedronGeometry args={[0.8]} />}
            <meshStandardMaterial
              color={shape.color}
              emissive={shape.color}
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.3}
              wireframe={i % 2 === 0}
            />
          </mesh>
        </Float>
      ))}
      
      <Sparkles count={100} size={2} scale={15} speed={0.3} opacity={0.3} color="#0ea5e9" />
      
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />
      <Environment preset="night" />
      <OrbitControls enableZoom={true} enablePan={true} />
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// DEMO REGISTRY
// ═══════════════════════════════════════════════════════════════════════════

const demos = [
  {
    id: 'layered-sky',
    name: 'Layered Sky',
    description: 'Background, midground, and foreground layers with procedural sky',
    tags: ['Sky', 'Clouds', 'Stars', 'Layers'],
    component: LayeredSkyDemo,
    code: `<Sky sunPosition={[0, 1, 0]} />
<Stars count={5000} fade />
<Cloud position={[-4, 2, -10]} opacity={0.3} />
<Float speed={1}>
  <mesh>
    <icosahedronGeometry args={[1, 2]} />
    <MeshDistortMaterial color="#0ea5e9" distort={0.3} />
  </mesh>
</Float>`,
  },
  {
    id: 'volumetric-fog',
    name: 'Volumetric Fog',
    description: 'Multiple cloud layers creating depth and atmosphere',
    tags: ['Fog', 'Volumetrics', 'Atmosphere', 'Particles'],
    component: VolumetricFogDemo,
    code: `{Array.from({ length: 6 }).map((_, i) => (
  <Cloud
    position={[(i - 3) * 3, Math.sin(i) * 2, -15 + i * 2]}
    opacity={0.15}
    color={i % 2 === 0 ? '#0ea5e9' : '#7c3aed'}
  />
))}
<Sparkles count={200} scale={[20, 10, 20]} />`,
  },
  {
    id: 'geometric-world',
    name: 'Geometric World',
    description: 'Floating platonic solids with dynamic lighting',
    tags: ['Geometry', 'Lighting', 'Animation', 'Wireframe'],
    component: GeometricWorldDemo,
    code: `<Float speed={0.8} rotationIntensity={1}>
  <mesh position={[-3, 2, -5]}>
    <octahedronGeometry args={[0.8]} />
    <meshStandardMaterial
      color="#0ea5e9"
      emissive="#0ea5e9"
      emissiveIntensity={0.3}
      wireframe
    />
  </mesh>
</Float>`,
  },
]

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

function DemoCard({ 
  demo, 
  isActive, 
  onClick 
}: { 
  demo: typeof demos[0]
  isActive: boolean
  onClick: () => void 
}) {
  const theme = useTheme()
  
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        background: isActive 
          ? alpha(theme.palette.primary.main, 0.15)
          : alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isActive ? theme.palette.primary.main : theme.palette.divider}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <PlayArrow fontSize="small" color={isActive ? 'primary' : 'action'} />
          <Typography variant="subtitle1" fontWeight={600}>
            {demo.name}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {demo.description}
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap">
          {demo.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.65rem', height: 20 }} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

function DemoViewer({ demo }: { demo: typeof demos[0] }) {
  const theme = useTheme()
  const [tab, setTab] = useState(0)
  
  return (
    <Card
      sx={{
        height: { xs: 400, md: 500 },
        display: 'flex',
        flexDirection: 'column',
        background: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Preview" icon={<PlayArrow />} iconPosition="start" />
            <Tab label="Code" icon={<Code />} iconPosition="start" />
          </Tabs>
          <Button
            size="small"
            startIcon={<GitHub />}
            href="https://github.com/jbcom/nodejs-strata"
            target="_blank"
          >
            Source
          </Button>
        </Stack>
      </Box>
      
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        {tab === 0 ? (
          <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <demo.component />
            </Suspense>
          </Canvas>
        ) : (
          <Box
            sx={{
              height: '100%',
              overflow: 'auto',
              p: 3,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              color: 'text.secondary',
              whiteSpace: 'pre-wrap',
              backgroundColor: alpha(theme.palette.background.default, 0.5),
            }}
          >
            {demo.code}
          </Box>
        )}
      </Box>
    </Card>
  )
}

function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
      }}
    >
      <CircularProgress />
    </Box>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════

export default function DemosPage() {
  const { demoId } = useParams<{ demoId: string }>()
  const navigate = useNavigate()
  
  const activeDemo = demos.find((d) => d.id === demoId) || demos[0]
  
  const handleDemoClick = (id: string) => {
    navigate(`/demos/${id}`)
  }
  
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
          Strata Demos
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Interactive demonstrations of strata's layered 3D graphics system.
          Drag to orbit, scroll to zoom.
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="React Three Fiber" size="small" />
          <Chip label="WebGL" size="small" />
          <Chip label="Procedural" size="small" />
        </Stack>
      </Box>
      
      <Grid container spacing={3}>
        {/* Demo List */}
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            {demos.map((demo) => (
              <DemoCard
                key={demo.id}
                demo={demo}
                isActive={demo.id === activeDemo.id}
                onClick={() => handleDemoClick(demo.id)}
              />
            ))}
          </Stack>
        </Grid>
        
        {/* Demo Viewer */}
        <Grid item xs={12} md={8}>
          <Suspense fallback={<LoadingSpinner />}>
            <DemoViewer demo={activeDemo} />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  )
}
