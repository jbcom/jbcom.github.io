/**
 * DemosPage - Interactive strata demonstrations
 *
 * Dedicated showcase for procedural 3D graphics.
 */

import { Code, GitHub, PlayArrow } from '@mui/icons-material'
import type { SxProps, Theme } from '@mui/material'
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
import {
  Environment,
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  Sparkles,
  Stars,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { SyntheticEvent } from 'react'
import { Suspense, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Demo: Distortion geometry
function DistortionDemo() {
  return (
    <>
      <color attach="background" args={['#0a0a0a']} />
      <Stars radius={50} depth={30} count={1000} factor={3} fade />
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        <mesh>
          <icosahedronGeometry args={[1.5, 4]} />
          <MeshDistortMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={3}
          />
        </mesh>
      </Float>
      <Sparkles count={50} size={2} scale={8} speed={0.3} color="#06b6d4" />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableZoom enablePan={false} />
      <Environment preset="night" />
    </>
  )
}

// Demo: Wobble effect
function WobbleDemo() {
  return (
    <>
      <color attach="background" args={['#0f172a']} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <MeshWobbleMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.15}
            metalness={0.8}
            roughness={0.2}
            factor={1}
            speed={2}
          />
        </mesh>
      </Float>
      <Sparkles count={80} size={2} scale={12} speed={0.4} color="#8b5cf6" />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#8b5cf6" />
      <OrbitControls enableZoom enablePan={false} />
    </>
  )
}

// Demo: Multi-layer particles
function ParticleDemo() {
  return (
    <>
      <color attach="background" args={['#020617']} />
      <Sparkles count={300} size={3} scale={20} speed={0.5} opacity={0.8} color="#06b6d4" />
      <Sparkles count={200} size={2} scale={15} speed={0.3} opacity={0.6} color="#8b5cf6" />
      <Sparkles count={100} size={4} scale={10} speed={0.8} opacity={0.4} color="#10b981" />
      <OrbitControls enableZoom enablePan />
    </>
  )
}

// Demo: Floating formations
function FloatDemo() {
  const colors = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899']
  return (
    <>
      <color attach="background" args={['#0a0f1a']} />
      <Stars radius={80} count={500} fade />
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

// Demo: Layered composition
function LayeredDemo() {
  return (
    <>
      <color attach="background" args={['#020617']} />
      {/* Background layer */}
      <Stars radius={100} depth={50} count={2000} factor={4} fade />
      {/* Midground layer */}
      <Sparkles
        count={100}
        size={2}
        scale={[30, 20, 20]}
        position={[0, 0, -10]}
        color="#3b82f6"
        opacity={0.3}
      />
      {/* Foreground layer */}
      <Float speed={1} floatIntensity={0.5}>
        <mesh position={[-2, 0, 0]}>
          <dodecahedronGeometry args={[0.8]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.2}
            wireframe
          />
        </mesh>
      </Float>
      <Float speed={1.2} floatIntensity={0.6}>
        <mesh position={[0, 0.5, 0]}>
          <icosahedronGeometry args={[1]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} />
        </mesh>
      </Float>
      <Float speed={0.8} floatIntensity={0.4}>
        <mesh position={[2, -0.3, 0]}>
          <octahedronGeometry args={[0.7]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.2}
            wireframe
          />
        </mesh>
      </Float>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <OrbitControls enableZoom enablePan />
      <Environment preset="night" />
    </>
  )
}

const demos = [
  {
    id: 'distortion',
    name: 'Distortion',
    description: 'MeshDistortMaterial with procedural vertex displacement',
    component: DistortionDemo,
    code: `<Float speed={1.5} rotationIntensity={1}>
  <mesh>
    <icosahedronGeometry args={[1.5, 4]} />
    <MeshDistortMaterial
      color="#06b6d4"
      distort={0.4}
      speed={3}
    />
  </mesh>
</Float>`,
  },
  {
    id: 'wobble',
    name: 'Wobble',
    description: 'MeshWobbleMaterial on complex geometry',
    component: WobbleDemo,
    code: `<Float speed={2} rotationIntensity={0.5}>
  <mesh>
    <torusKnotGeometry args={[1, 0.3, 128, 32]} />
    <MeshWobbleMaterial
      color="#8b5cf6"
      factor={1}
      speed={2}
    />
  </mesh>
</Float>`,
  },
  {
    id: 'particles',
    name: 'Particles',
    description: 'Layered Sparkles with varying parameters',
    component: ParticleDemo,
    code: `<Sparkles count={300} size={3} scale={20} color="#06b6d4" />
<Sparkles count={200} size={2} scale={15} color="#8b5cf6" />
<Sparkles count={100} size={4} scale={10} color="#10b981" />`,
  },
  {
    id: 'float',
    name: 'Formations',
    description: 'Float animation with geometric shapes',
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
  {
    id: 'layered',
    name: 'Layered',
    description: 'Background, midground, foreground composition',
    component: LayeredDemo,
    code: `{/* Background */}
<Stars radius={100} count={2000} fade />

{/* Midground */}
<Sparkles count={100} position={[0, 0, -10]} />

{/* Foreground */}
<Float speed={1}>
  <mesh>
    <dodecahedronGeometry />
    <meshStandardMaterial wireframe />
  </mesh>
</Float>`,
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
        transition: 'border-color 0.2s',
        '&:hover': { borderColor: 'primary.main' },
      }}
    >
      <CardContent sx={{ py: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
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

// Typed sx props to avoid TS2590 complex union type errors
const tabsContainerSx: SxProps<Theme> = { borderBottom: 1, borderColor: 'divider', px: 2 }
const codeBlockSx: SxProps<Theme> = {
  m: 0,
  p: 3,
  height: '100%',
  overflow: 'auto',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '0.875rem',
  bgcolor: 'grey.900',
  color: 'grey.100',
}

function DemoViewer({ demo }: { demo: (typeof demos)[0] }): JSX.Element {
  const [tab, setTab] = useState(0)

  return (
    <Card sx={{ height: 500, display: 'flex', flexDirection: 'column' }}>
      {/* @ts-expect-error - TS2590: MUI + R3F creates overly complex union types */}
      <Box sx={tabsContainerSx}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Tabs value={tab} onChange={(_: SyntheticEvent, v: number) => setTab(v)}>
            <Tab label="Preview" icon={<PlayArrow />} iconPosition="start" />
            <Tab label="Code" icon={<Code />} iconPosition="start" />
          </Tabs>
          <Button
            size="small"
            startIcon={<GitHub />}
            href="https://github.com/jbcom/nodejs-strata"
            target="_blank"
            rel="noopener noreferrer"
          >
            strata
          </Button>
        </Stack>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {tab === 0 ? (
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <demo.component />
            </Suspense>
          </Canvas>
        ) : (
          <Box component="pre" sx={codeBlockSx}>
            {demo.code}
          </Box>
        )}
      </Box>
    </Card>
  )
}

export default function DemosPage(): JSX.Element {
  const { demoId } = useParams()
  const navigate = useNavigate()
  const activeDemo = demos.find((d) => d.id === demoId) || demos[0]

  return (
    // @ts-expect-error - TS2590: MUI + R3F creates overly complex union types
    <Box>
      <Typography
        variant="h3"
        sx={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, mb: 1 }}
      >
        Strata Demos
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Interactive demonstrations of procedural 3D graphics. Drag to orbit, scroll to zoom.
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
        <Chip label="React Three Fiber" size="small" />
        <Chip label="@react-three/drei" size="small" />
        <Chip label="WebGL" size="small" />
      </Stack>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack spacing={1.5}>
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
              <Box display="flex" justifyContent="center" alignItems="center" height={450}>
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
