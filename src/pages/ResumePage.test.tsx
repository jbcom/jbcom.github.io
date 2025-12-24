import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ResumePage from './ResumePage'

describe('ResumePage', () => {
  const originalShare = global.navigator.share

  afterEach(() => {
    vi.restoreAllMocks()
    if (originalShare) {
      Object.defineProperty(global.navigator, 'share', {
        value: originalShare,
        configurable: true,
      })
    } else {
      // @ts-expect-error - deleting from navigator
      delete global.navigator.share
    }
  })

  const renderResumePage = () => {
    return render(
      <MemoryRouter>
        <ResumePage />
      </MemoryRouter>
    )
  }

  it('renders correctly', () => {
    renderResumePage()
    expect(screen.getByText('Jon Bogaty')).toBeInTheDocument()
    expect(screen.getAllByText('Head of Information Technology and Security').length).toBeGreaterThan(0)
    expect(screen.getByText('Professional Summary')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Education')).toBeInTheDocument()
  })

  it('renders social sharing links correctly', () => {
    renderResumePage()
    const linkedInLink = screen.getByLabelText('Share on LinkedIn')
    const twitterLink = screen.getByLabelText('Share on X')
    const emailLink = screen.getByLabelText('Share via Email')

    expect(linkedInLink).toHaveAttribute('href')
    expect(linkedInLink.getAttribute('href')).toContain('linkedin.com/sharing/share-offsite')
    
    expect(twitterLink).toHaveAttribute('href')
    expect(twitterLink.getAttribute('href')).toContain('twitter.com/intent/tweet')
    
    expect(emailLink).toHaveAttribute('href')
    expect(emailLink.getAttribute('href')).toContain('mailto:')
  })

  describe('Share functionality', () => {
    it('shows the general share button when navigator.share is available', () => {
      // Mock navigator.share
      const shareMock = vi.fn().mockResolvedValue(undefined)
      Object.defineProperty(global.navigator, 'share', {
        value: shareMock,
        configurable: true,
      })

      renderResumePage()
      const shareButton = screen.getByLabelText('Share this page')
      expect(shareButton).toBeInTheDocument()

      fireEvent.click(shareButton)
      expect(shareMock).toHaveBeenCalled()
    })

    it('hides the general share button when navigator.share is not available', () => {
      // Ensure navigator.share is not present
      if ('share' in global.navigator) {
        // @ts-expect-error - deleting from navigator
        delete global.navigator.share
      }

      renderResumePage()
      const shareButton = screen.queryByLabelText('Share this page')
      expect(shareButton).not.toBeInTheDocument()
    })
  })
})
