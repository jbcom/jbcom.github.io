import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { packages } from '../data/ecosystem'
import EcosystemPage from './EcosystemPage'

describe('EcosystemPage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const renderEcosystemPage = (initialEntries = ['/ecosystem']) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <EcosystemPage />
      </MemoryRouter>
    )
  }

  it('renders correctly', () => {
    renderEcosystemPage()
    expect(screen.getByText('Ecosystem')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search packages...')).toBeInTheDocument()
    // Should show all packages initially
    expect(screen.getByText(`${packages.length} packages found`)).toBeInTheDocument()
  })

  it('filters packages by search text', async () => {
    renderEcosystemPage()

    const searchInput = screen.getByPlaceholderText('Search packages...')

    // Search for "agentic"
    fireEvent.change(searchInput, { target: { value: 'agentic' } })

    // Fast-forward debounce time
    act(() => {
      vi.advanceTimersByTime(300)
    })

    // Should show only packages containing "agentic"
    const agenticPackages = packages.filter(
      (p) =>
        p.displayName.toLowerCase().includes('agentic') ||
        p.description.toLowerCase().includes('agentic') ||
        p.tags.some((t) => t.toLowerCase().includes('agentic'))
    )

    expect(screen.getByText(`${agenticPackages.length} packages found`)).toBeInTheDocument()

    // Search for something non-existent
    fireEvent.change(searchInput, { target: { value: 'non-existent-package-name' } })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(screen.getByText('0 packages found')).toBeInTheDocument()
    expect(screen.getByText('No packages found')).toBeInTheDocument()
  })

  it('clears search when clear button is clicked', () => {
    renderEcosystemPage()

    const searchInput = screen.getByPlaceholderText('Search packages...')
    fireEvent.change(searchInput, { target: { value: 'test' } })

    const clearButton = screen.getByLabelText('Clear search')
    fireEvent.click(clearButton)

    expect(searchInput).toHaveValue('')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(screen.getByText(`${packages.length} packages found`)).toBeInTheDocument()
  })

  it('filters packages by category', () => {
    renderEcosystemPage()

    // Find AI category button
    const aiButton = screen.getByRole('button', { name: /AI & Agents/i })
    fireEvent.click(aiButton)

    const aiPackages = packages.filter((p) => p.category === 'ai')
    expect(
      screen.getByText(`${aiPackages.length} package${aiPackages.length !== 1 ? 's' : ''} found`)
    ).toBeInTheDocument()
  })

  it('filters packages by language', () => {
    renderEcosystemPage()

    // Find TypeScript language button
    const tsButton = screen.getByRole('button', { name: /TypeScript/i })
    fireEvent.click(tsButton)

    const tsPackages = packages.filter((p) => p.language === 'typescript')
    expect(
      screen.getByText(`${tsPackages.length} package${tsPackages.length !== 1 ? 's' : ''} found`)
    ).toBeInTheDocument()
  })

  it('initializes filters from query parameters', () => {
    renderEcosystemPage(['/ecosystem?category=ai&language=python'])

    const aiPackages = packages.filter((p) => p.category === 'ai' && p.language === 'python')
    expect(
      screen.getByText(`${aiPackages.length} package${aiPackages.length !== 1 ? 's' : ''} found`)
    ).toBeInTheDocument()
  })
})
