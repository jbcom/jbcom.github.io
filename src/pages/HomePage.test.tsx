import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    expect(screen.getByText(/Production-grade tools/i)).toBeInTheDocument()
  })

  it('renders category cards with links', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    // Check if categories are rendered
    expect(screen.getByText(/AI & Agents/i)).toBeInTheDocument()
    
    // Check if the link exists
    const aiLink = screen.getByRole('link', { name: /AI & Agents/i })
    expect(aiLink).toBeInTheDocument()
    expect(aiLink).toHaveAttribute('href', '/ecosystem?category=ai')
  })
})
