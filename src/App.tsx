/**
 * jbcom.github.io - Professional Portfolio & Ecosystem Directory
 *
 * A world-class responsive Material UI site showcasing the jbcom open source ecosystem.
 * Individual repos maintain their own demos - this site embeds them via iframe.
 */

import { CssBaseline, ThemeProvider } from '@mui/material'
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import theme from './theme'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const DemosPage = lazy(() => import('./pages/DemosPage'))
const DependencyFlowPage = lazy(() => import('./pages/DependencyFlowPage'))
const EcosystemPage = lazy(() => import('./pages/EcosystemPage'))
const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const ResumePage = lazy(() => import('./pages/ResumePage'))

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="ecosystem" element={<EcosystemPage />} />
            <Route path="ecosystem/:projectId" element={<ProjectPage />} />
            <Route path="dependency-flow" element={<DependencyFlowPage />} />
            <Route path="demos" element={<DemosPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
