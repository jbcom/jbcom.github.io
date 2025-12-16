/**
 * jbcom Ecosystem Showcase
 * 
 * Architecture mirrors strata's layer system:
 * - Background: StrataBackground (3D scene)
 * - Midground: (within 3D scene)
 * - Foreground: Material UI content layer
 * 
 * The UI floats on top of a living, breathing strata-powered world.
 */

import { Routes, Route, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import { useMemo } from 'react'

import StrataBackground from './components/StrataBackground'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import EcosystemPage from './pages/EcosystemPage'
import ProjectPage from './pages/ProjectPage'
import DemosPage from './pages/DemosPage'

function App() {
  const location = useLocation()
  
  // Adjust background intensity based on page
  const backgroundIntensity = useMemo(() => {
    if (location.pathname === '/') return 'full'
    if (location.pathname.startsWith('/demos')) return 'full'
    return 'medium'
  }, [location.pathname])
  
  return (
    <>
      {/* Background Layer - Strata-powered 3D scene */}
      <StrataBackground 
        intensity={backgroundIntensity}
        interactive={location.pathname.startsWith('/demos')}
      />
      
      {/* Foreground Layer - UI content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="ecosystem" element={<EcosystemPage />} />
            <Route path="ecosystem/:projectId" element={<ProjectPage />} />
            <Route path="demos" element={<DemosPage />} />
            <Route path="demos/:demoId" element={<DemosPage />} />
          </Route>
        </Routes>
      </Box>
    </>
  )
}

export default App
