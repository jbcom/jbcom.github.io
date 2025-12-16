/**
 * DemosPage - Interactive strata demonstrations
 *
 * This is where strata shines - dedicated demos showing procedural generation.
 */

import { Code, GitHub, PlayArrow } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { Environment, Float, MeshDistortMaterial, OrbitControls, Sparkles, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Demo: Floating geometry with distortion
function GeometryDemo() {
  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      <Stars radius={50} depth={30} count={1000} factor={3} fade />

      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[1.5, 4]} />
          <MeshDistortMaterial
            color="#0ea5e9"
            emissive="#0ea5e9"
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={3}
          />
        </mesh>
      </Float>

      <Sparkles count={50} size={2} scale={8} speed={0.3} color="#0ea5e9" />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableZoom enablePan={false} />
      <Environment preset="night" />
    </>
  )
}

// Demo: Particle systems
function ParticleDemo() {
  return (
    <>
      <color attach="background" args={['#020617']} />
      <Sparkles count={300} size={3} scale={20} speed={0.5} opacity={0.8} color="#0ea5e9" />
      <Sparkles count={200} size={2} scale={15} speed={0.3} opacity={0.6} color="#7c3aed" />
      <Sparkles count={100} size={4} scale={10} speed={0.8} opacity={0.4} color="#10b981" />
      <OrbitControls enableZoom enablePan />
    </>
  )
}

// Demo: Multiple floating objects
function FloatDemo() {
  const colors = ['#0ea5e9', '#7c3aed', '#10b981', '#f59e0b', '#ec4899']
  return (
    <>
      <color attach="background" args={['#0f172a']} />
      {colors.map((color, i) => (
        <Float key={color} speed={1 + i * 0.2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[(i - 2) * 2, Math.sin(i) * 0.5, 0]}>
            <octahedronGeometry args={[0.6]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
          </mesh>
        </Float>
      ))}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} />
      <OrbitControls enableZoom enablePan />
    </>
  )
}

const demos = [
  {
    id: 'geometry',
    name: 'Distortion Geometry',
    description: 'MeshDistortMaterial with procedural deformation',
    component: GeometryDemo,
    code: `<Float speed={1.5} rotationIntensity={1}>
  <mesh>
    <icosahedronGeometry args={[1.5, 4]} />
    <MeshDistortMaterial
      color="#0ea5e9"
      distort={0.4}
      speed={3}
    />
  </mesh>
</Float>`,
  },
  {
    id: 'particles',
    name: 'Particle Systems',
    description: 'Layered Sparkles with varying parameters',
    component: ParticleDemo,
    code: `<Sparkles count={300} size={3} scale={20} color="#0ea5e9" />
<Sparkles count={200} size={2} scale={15} color="#7c3aed" />
<Sparkles count={100} size={4} scale={10} color="#10b981" />`,
  },
  {
    id: 'float',
    name: 'Floating Objects',
    description: 'Float animation with multiple elements',
    component: FloatDemo,
    code: `{colors.map((color, i) => (
  <Float speed={1 + i * 0.2} floatIntensity={1}>
    <mesh position={[(i - 2) * 2, 0, 0]}>
      <octahedronGeometry args={[0.6]} />
      <meshStandardMaterial color={color} />
    </mesh>
  </Float>
))}`,
  },
]

function DemoCard({
  demo,
  active,
  onClick,
}: {
  demo: (typeof demos)[0]
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
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <PlayArrow fontSize="small" color={active ? 'primary' : 'action'} />
          <Typography fontWeight={600}>{demo.name}</Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {demo.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

function DemoViewer({ demo }: { demo: (typeof demos)[0] }) {
  const [tab, setTab] = useState(0)

  return (
    <Card sx={{ height: 500 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
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
      <Box sx={{ height: 'calc(100% - 49px)' }}>
        {tab === 0 ? (
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <demo.component />
            </Suspense>
          </Canvas>
        ) : (
          <Box
            component="pre"
            sx={{
              m: 0,
              p: 3,
              height: '100%',
              overflow: 'auto',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '0.875rem',
              bgcolor: 'grey.900',
              color: 'grey.100',
            }}
          >
            {demo.code}
          </Box>
        )}
      </Box>
    </Card>
  )
}

export default function DemosPage() {
  const { demoId } = useParams()
  const navigate = useNavigate()
  const activeDemo = demos.find((d) => d.id === demoId) || demos[0]

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 1 }}
      >
        Strata Demos
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Interactive demonstrations of procedural 3D graphics. Drag to orbit, scroll to zoom.
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
        <Chip label="React Three Fiber" />
        <Chip label="@react-three/drei" />
        <Chip label="WebGL" />
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            {demos.map((demo) => (
              <DemoCard
                key={demo.id}
                demo={demo}
                active={demo.id === activeDemo.id}
                onClick={() => navigate(`/demos/${demo.id}`)}
              />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Suspense
            fallback={
              <Box display="flex" justifyContent="center" alignItems="center" height={500}>
                <CircularProgress />
              </Box>
            }
          >
            <DemoViewer demo={activeDemo} />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  )
}
