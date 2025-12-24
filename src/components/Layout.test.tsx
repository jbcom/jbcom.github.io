import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
/**
 * Layout component tests
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Layout from './Layout'

// Mock useMediaQuery for mobile/desktop testing
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material')
  return {
    ...actual,
    useMediaQuery: vi.fn(() => false), // Default to desktop
  }
})

const theme = createTheme({
  palette: { mode: 'dark' },
})

const TestWrapper = ({ initialRoute = '/' }: { initialRoute?: string }) => (
  <ThemeProvider theme={theme}>
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div data-testid="home">Home Page</div>} />
          <Route path="about" element={<div data-testid="about">About Page</div>} />
          <Route path="resume" element={<div data-testid="resume">Resume Page</div>} />
          <Route path="ecosystem" element={<div data-testid="ecosystem">Ecosystem Page</div>} />
          <Route
            path="ecosystem/:projectId"
            element={<div data-testid="project">Project Page</div>}
          />
          <Route path="demos" element={<div data-testid="demos">Demos Page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  </ThemeProvider>
)

describe('Layout', () => {
  beforeEach(() => {
    vi.mocked(useMediaQuery).mockReturnValue(false) // Desktop by default
  })

  describe('Desktop Navigation', () => {
    it('renders the logo with jbcom text', () => {
      render(<TestWrapper />)
      expect(screen.getByText('jbcom')).toBeInTheDocument()
      expect(screen.getByText('jb')).toBeInTheDocument()
    })

    it('renders all navigation items', () => {
      render(<TestWrapper />)
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Resume')).toBeInTheDocument()
      expect(screen.getByText('Ecosystem')).toBeInTheDocument()
      expect(screen.getByText('Demos')).toBeInTheDocument()
    })

    it('renders GitHub link', () => {
      render(<TestWrapper />)
      const githubLink = screen.getByRole('link', { name: /github profile/i })
      expect(githubLink).toHaveAttribute('href', 'https://github.com/jbcom')
      expect(githubLink).toHaveAttribute('target', '_blank')
    })

    it('displays Home as active on root route', () => {
      render(<TestWrapper initialRoute="/" />)
      const homeLink = screen.getByRole('link', { name: /home/i })
      expect(homeLink).toHaveClass('Mui-selected')
    })

    it('displays About as active on about route', () => {
      render(<TestWrapper initialRoute="/about" />)
      const aboutLink = screen.getByRole('link', { name: /about/i })
      expect(aboutLink).toHaveClass('Mui-selected')
    })

    it('displays Ecosystem as active on ecosystem sub-route', () => {
      render(<TestWrapper initialRoute="/ecosystem/some-project" />)
      const ecosystemLink = screen.getByRole('link', { name: /ecosystem/i })
      expect(ecosystemLink).toHaveClass('Mui-selected')
    })

    it('renders the main content outlet', () => {
      render(<TestWrapper initialRoute="/" />)
      expect(screen.getByTestId('home')).toBeInTheDocument()
    })

    it('navigates to different pages when clicking nav items', async () => {
      render(<TestWrapper initialRoute="/" />)

      const aboutLink = screen.getByRole('link', { name: /about/i })
      fireEvent.click(aboutLink)

      await waitFor(() => {
        expect(screen.getByTestId('about')).toBeInTheDocument()
      })
    })
  })

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      vi.mocked(useMediaQuery).mockReturnValue(true) // Mobile
    })

    it('renders mobile app bar with menu button', () => {
      render(<TestWrapper />)
      const menuButton = screen.getByRole('button', { name: /open navigation/i })
      expect(menuButton).toBeInTheDocument()
    })

    it('opens mobile drawer when menu button is clicked', async () => {
      render(<TestWrapper />)

      const menuButton = screen.getByRole('button', { name: /open navigation/i })
      fireEvent.click(menuButton)

      await waitFor(() => {
        // Should have close button visible
        expect(screen.getByRole('button', { name: /close navigation/i })).toBeInTheDocument()
      })
    })

    it('closes mobile drawer when close button is clicked', async () => {
      render(<TestWrapper />)

      // Open drawer
      const menuButton = screen.getByRole('button', { name: /open navigation/i })
      fireEvent.click(menuButton)

      // Close drawer
      const closeButton = screen.getByRole('button', { name: /close navigation/i })
      fireEvent.click(closeButton)

      // The drawer should close (close button should not be visible)
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /close navigation/i })).not.toBeInTheDocument()
      })
    })

    it('closes mobile drawer when a nav item is clicked', async () => {
      render(<TestWrapper />)

      // Open drawer
      const menuButton = screen.getByRole('button', { name: /open navigation/i })
      fireEvent.click(menuButton)

      // Click a nav item
      const aboutLink = screen.getByRole('link', { name: /about/i })
      fireEvent.click(aboutLink)

      // Drawer should close
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /close navigation/i })).not.toBeInTheDocument()
      })
    })

    it('closes mobile drawer when logo is clicked', async () => {
      render(<TestWrapper initialRoute="/about" />)

      // Open drawer
      const menuButton = screen.getByRole('button', { name: /open navigation/i })
      fireEvent.click(menuButton)

      // Find and click the logo link inside the drawer
      const logoLinks = screen.getAllByRole('link')
      const drawerLogoLink = logoLinks.find((link) => link.getAttribute('href') === '/')
      if (drawerLogoLink) {
        fireEvent.click(drawerLogoLink)
      }

      // Navigation should occur
      await waitFor(() => {
        expect(screen.getByTestId('home')).toBeInTheDocument()
      })
    })
  })

  describe('Navigation Active States', () => {
    it('correctly identifies active state for nested routes', () => {
      render(<TestWrapper initialRoute="/ecosystem/test-package" />)
      const ecosystemLink = screen.getByRole('link', { name: /ecosystem/i })
      expect(ecosystemLink).toHaveClass('Mui-selected')
    })

    it('home is not active on other routes', () => {
      render(<TestWrapper initialRoute="/about" />)
      const homeLink = screen.getByRole('link', { name: /home/i })
      expect(homeLink).not.toHaveClass('Mui-selected')
    })
  })

  describe('Accessibility Features', () => {
    it('renders a skip to content link', () => {
      render(<TestWrapper />)
      const skipLink = screen.getByText(/skip to content/i)
      expect(skipLink).toBeInTheDocument()
      expect(skipLink).toHaveAttribute('href', '#main-content')
    })

    it('skip link is initially hidden off-screen', () => {
      render(<TestWrapper />)
      const skipLink = screen.getByText(/skip to content/i)
      expect(skipLink).toHaveStyle({ position: 'absolute', top: '-9999px' })
    })

    it('main content area has correct id and tabindex', () => {
      render(<TestWrapper />)
      const mainContent = document.getElementById('main-content')
      expect(mainContent).toBeInTheDocument()
      expect(mainContent).toHaveAttribute('tabIndex', '-1')
    })
  })
})
