/**
 * StrataBackground - The living, layered backdrop for the entire site
 * 
 * This component demonstrates strata's core value proposition:
 * composable 3D layers that create immersive environments.
 * 
 * Layers:
 * - Background: Procedural sky with time-of-day lighting
 * - Midground: Volumetric fog, subtle particle systems
 * - Foreground: (handled by the UI layer above)
 */

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Stars,
  Cloud,
  Float,
  Environment,
  Sparkles,
} from '@react-three/drei'
import * as THREE from 'three'

// Animated gradient plane for depth
function GradientPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorTop: { value: new THREE.Color('#0c1929') },
    uColorBottom: { value: new THREE.Color('#020617') },
    uColorAccent: { value: new THREE.Color('#0ea5e9') },
  }), [])
  
  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime * 0.1
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, -50]} scale={[200, 200, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying float vElevation;
          uniform float uTime;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Subtle wave distortion
            float elevation = sin(pos.x * 3.0 + uTime) * 0.02 
                            + sin(pos.y * 2.0 + uTime * 0.5) * 0.02;
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColorTop;
          uniform vec3 uColorBottom;
          uniform vec3 uColorAccent;
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            // Base gradient
            vec3 color = mix(uColorBottom, uColorTop, vUv.y);
            
            // Add subtle accent glow
            float glowStrength = sin(vUv.x * 10.0 + uTime * 2.0) * 0.5 + 0.5;
            glowStrength *= sin(vUv.y * 8.0 - uTime) * 0.5 + 0.5;
            glowStrength *= 0.05;
            
            color = mix(color, uColorAccent, glowStrength);
            
            // Elevation-based highlight
            color += uColorAccent * vElevation * 2.0;
            
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  )
}

// Floating geometric shapes for depth
function FloatingShapes() {
  const shapes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        -20 - Math.random() * 20
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 1.5,
      speed: 0.5 + Math.random() * 0.5,
      type: ['octahedron', 'icosahedron', 'dodecahedron'][i % 3],
    }))
  }, [])
  
  return (
    <>
      {shapes.map((shape, i) => (
        <Float
          key={i}
          speed={shape.speed}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={shape.position}
        >
          <mesh rotation={shape.rotation} scale={shape.scale}>
            {shape.type === 'octahedron' && <octahedronGeometry args={[1]} />}
            {shape.type === 'icosahedron' && <icosahedronGeometry args={[1]} />}
            {shape.type === 'dodecahedron' && <dodecahedronGeometry args={[1]} />}
            <meshStandardMaterial
              color="#0ea5e9"
              emissive="#0ea5e9"
              emissiveIntensity={0.1}
              transparent
              opacity={0.15}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

// Particle field for atmosphere
function ParticleField() {
  return (
    <Sparkles
      count={100}
      size={2}
      scale={[50, 30, 30]}
      position={[0, 0, -15]}
      speed={0.2}
      opacity={0.3}
      color="#0ea5e9"
    />
  )
}

// Subtle cloud layer
function CloudLayer() {
  return (
    <>
      <Cloud
        position={[-20, 10, -40]}
        opacity={0.1}
        speed={0.1}
        width={30}
        depth={5}
        segments={20}
        color="#1e3a5f"
      />
      <Cloud
        position={[20, -5, -35]}
        opacity={0.08}
        speed={0.15}
        width={25}
        depth={4}
        segments={15}
        color="#0c4a6e"
      />
    </>
  )
}

interface StrataBackgroundProps {
  intensity?: 'subtle' | 'medium' | 'full'
  interactive?: boolean
}

export default function StrataBackground({ 
  intensity = 'medium',
  interactive = false 
}: StrataBackgroundProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: interactive ? 'auto' : 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]} // Performance optimization
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          {/* Background Layer */}
          <GradientPlane />
          <Stars
            radius={100}
            depth={50}
            count={intensity === 'subtle' ? 1000 : 3000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          
          {/* Midground Layer */}
          {intensity !== 'subtle' && (
            <>
              <CloudLayer />
              <FloatingShapes />
            </>
          )}
          
          {intensity === 'full' && (
            <ParticleField />
          )}
          
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#0ea5e9" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7c3aed" />
          
          {/* Environment for reflections */}
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
