import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import AboutPage from './AboutPage'

describe('AboutPage', () => {
  const renderAboutPage = () => {
    return render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    )
  }

  it('renders correctly', () => {
    renderAboutPage()
    expect(screen.getByText('Jon Bogaty')).toBeInTheDocument()
    expect(screen.getByText('Head of IT & Security | 15+ Years Experience')).toBeInTheDocument()
    expect(screen.getByText('Lincoln, Nebraska, United States')).toBeInTheDocument()
    expect(screen.getByText('JB')).toBeInTheDocument() // Avatar initials
  })

  it('renders skills section with categories', () => {
    renderAboutPage()
    expect(screen.getByText('Cloud Platforms')).toBeInTheDocument()
    expect(screen.getByText('Infrastructure & DevOps')).toBeInTheDocument()
    expect(screen.getByText('Programming')).toBeInTheDocument()
    expect(screen.getByText('Security')).toBeInTheDocument()
  })

  it('renders experience section correctly', () => {
    renderAboutPage()
    expect(screen.getByText('Experience')).toBeInTheDocument()
    expect(screen.getByText('Flipside Crypto')).toBeInTheDocument()
    expect(screen.getByText('Open Source Maintainer')).toBeInTheDocument()
  })

  it('renders call to action buttons', () => {
    renderAboutPage()
    const resumeLinks = screen.getAllByRole('link', { name: /resume/i })
    expect(resumeLinks.length).toBeGreaterThan(0)

    const downloadPdfLink = screen.getByRole('link', { name: /download pdf/i })
    expect(downloadPdfLink).toBeInTheDocument()
    expect(downloadPdfLink).toHaveAttribute('href', '/Jon_Bogaty_Resume_2025.pdf')
  })
})
