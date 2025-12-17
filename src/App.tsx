/**
 * jbcom.github.io - Professional Portfolio & Ecosystem Directory
 *
 * A world-class responsive Material UI site showcasing the jbcom open source ecosystem.
 * Individual repos maintain their own demos - this site embeds them via iframe.
 */

import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AboutPage from './pages/AboutPage'
import DemosPage from './pages/DemosPage'
import EcosystemPage from './pages/EcosystemPage'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import theme from './theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="ecosystem" element={<EcosystemPage />} />
            <Route path="ecosystem/:projectId" element={<ProjectPage />} />
            <Route path="demos" element={<DemosPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
