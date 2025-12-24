import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import DependencyFlowPage from './DependencyFlowPage'

describe('DependencyFlowPage', () => {
  const renderPage = () => {
    return render(
      <MemoryRouter>
        <DependencyFlowPage />
      </MemoryRouter>
    )
  }

  it('renders correctly', () => {
    renderPage()
    expect(screen.getByText('Dependency Flow')).toBeInTheDocument()
    expect(screen.getByText('Select a package to view its dependency flow')).toBeInTheDocument()
  })

  it('lists packages in the ecosystem', () => {
    renderPage()
    // Check for some known packages from ecosystem data
    expect(screen.getByText('agentic-control')).toBeInTheDocument()
    expect(screen.getByText('strata')).toBeInTheDocument()
    expect(screen.getByText('vendor-connectors')).toBeInTheDocument()
  })

  it('shows details when a package is selected', () => {
    renderPage()
    const packageCard = screen.getByText('agentic-crew')
    fireEvent.click(packageCard)

    // Should show description
    expect(screen.getByText(/Define crews once, deploy anywhere/i)).toBeInTheDocument()
    
    // Should show "Depends On" and "Used By" sections
    expect(screen.getByRole('heading', { name: /depends on/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /used by/i })).toBeInTheDocument()
  })

  it('navigates between packages by clicking on dependencies', () => {
    renderPage()
    // Select agentic-crew which depends on vendor-connectors
    fireEvent.click(screen.getByText('agentic-crew'))
    
    // Find the "Depends On" section
    const dependsOnHeading = screen.getByRole('heading', { name: /depends on/i })
    const dependsOnSection = dependsOnHeading.closest('.MuiGrid-item')
    
    if (dependsOnSection) {
      const dependencyItem = within(dependsOnSection as HTMLElement).getByText('vendor-connectors')
      fireEvent.click(dependencyItem)
      
      // Now agentic-crew should be in the "Used By" list of vendor-connectors
      const usedByHeading = screen.getByRole('heading', { name: /used by/i })
      const usedBySection = usedByHeading.closest('.MuiGrid-item')
      
      if (usedBySection) {
        expect(within(usedBySection as HTMLElement).getByText('agentic-crew')).toBeInTheDocument()
      }
    }
  })
})
