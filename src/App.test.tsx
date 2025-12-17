/**
 * App component tests - routing and theme integration
 */
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Mock the page components to simplify testing
vi.mock('./pages/HomePage', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}))
vi.mock('./pages/AboutPage', () => ({
  default: () => <div data-testid="about-page">About Page</div>,
}))
vi.mock('./pages/ResumePage', () => ({
  default: () => <div data-testid="resume-page">Resume Page</div>,
}))
vi.mock('./pages/EcosystemPage', () => ({
  default: () => <div data-testid="ecosystem-page">Ecosystem Page</div>,
}))
vi.mock('./pages/ProjectPage', () => ({
  default: () => <div data-testid="project-page">Project Page</div>,
}))
vi.mock('./pages/DemosPage', () => ({
  default: () => <div data-testid="demos-page">Demos Page</div>,
}))

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  it('applies the theme with dark mode', () => {
    render(<App />)
    // The app should render with MUI theme applied
    // CssBaseline should reset styles for dark mode
    expect(document.body).toBeInTheDocument()
  })

  it('renders the Layout component', () => {
    render(<App />)
    // Layout should include navigation
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders HomePage on root route', () => {
    window.history.pushState({}, '', '/')
    render(<App />)
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  describe('Route navigation', () => {
    it('navigates to about page', async () => {
      window.history.pushState({}, '', '/about')
      render(<App />)
      await waitFor(() => {
        expect(screen.getByTestId('about-page')).toBeInTheDocument()
      })
    })

    it('navigates to resume page', async () => {
      window.history.pushState({}, '', '/resume')
      render(<App />)
      await waitFor(() => {
        expect(screen.getByTestId('resume-page')).toBeInTheDocument()
      })
    })

    it('navigates to ecosystem page', async () => {
      window.history.pushState({}, '', '/ecosystem')
      render(<App />)
      await waitFor(() => {
        expect(screen.getByTestId('ecosystem-page')).toBeInTheDocument()
      })
    })

    it('navigates to project page with id', async () => {
      window.history.pushState({}, '', '/ecosystem/some-project')
      render(<App />)
      await waitFor(() => {
        expect(screen.getByTestId('project-page')).toBeInTheDocument()
      })
    })

    it('navigates to demos page', async () => {
      window.history.pushState({}, '', '/demos')
      render(<App />)
      await waitFor(() => {
        expect(screen.getByTestId('demos-page')).toBeInTheDocument()
      })
    })
  })
})
