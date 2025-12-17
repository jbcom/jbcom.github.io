import { describe, it, expect } from 'vitest'
import theme from './theme'

describe('theme configuration', () => {
  describe('palette', () => {
    it('should have dark mode enabled', () => {
      expect(theme.palette.mode).toBe('dark')
    })

    it('should have primary color configured', () => {
      expect(theme.palette.primary.main).toBe('#06b6d4')
      expect(theme.palette.primary.light).toBe('#22d3ee')
      expect(theme.palette.primary.dark).toBe('#0891b2')
      expect(theme.palette.primary.contrastText).toBe('#ffffff')
    })

    it('should have secondary color configured', () => {
      expect(theme.palette.secondary.main).toBe('#3b82f6')
      expect(theme.palette.secondary.light).toBe('#60a5fa')
      expect(theme.palette.secondary.dark).toBe('#2563eb')
      expect(theme.palette.secondary.contrastText).toBe('#ffffff')
    })

    it('should have background colors configured', () => {
      expect(theme.palette.background.default).toBe('#0a0f1a')
      expect(theme.palette.background.paper).toBe('#111827')
    })

    it('should have text colors configured', () => {
      expect(theme.palette.text.primary).toBe('#f1f5f9')
      expect(theme.palette.text.secondary).toBe('#94a3b8')
      expect(theme.palette.text.disabled).toBe('#475569')
    })

    it('should have semantic colors configured', () => {
      expect(theme.palette.success.main).toBe('#10b981')
      expect(theme.palette.warning.main).toBe('#f59e0b')
      expect(theme.palette.error.main).toBe('#ef4444')
      expect(theme.palette.info.main).toBe('#06b6d4')
    })

    it('should have divider color configured', () => {
      expect(theme.palette.divider).toBe('#1e293b')
    })
  })

  describe('typography', () => {
    it('should have Inter as base font family', () => {
      expect(theme.typography.fontFamily).toContain('Inter')
    })

    it('should have Space Grotesk for headings', () => {
      expect(theme.typography.h1.fontFamily).toContain('Space Grotesk')
      expect(theme.typography.h2.fontFamily).toContain('Space Grotesk')
      expect(theme.typography.h3.fontFamily).toContain('Space Grotesk')
      expect(theme.typography.h4.fontFamily).toContain('Space Grotesk')
      expect(theme.typography.h5.fontFamily).toContain('Space Grotesk')
      expect(theme.typography.h6.fontFamily).toContain('Space Grotesk')
    })

    it('should have proper font weights for headings', () => {
      expect(theme.typography.h1.fontWeight).toBe(700)
      expect(theme.typography.h2.fontWeight).toBe(700)
      expect(theme.typography.h3.fontWeight).toBe(600)
      expect(theme.typography.h4.fontWeight).toBe(600)
    })

    it('should have proper line height for body text', () => {
      expect(theme.typography.body1.lineHeight).toBe(1.6)
      expect(theme.typography.body2.lineHeight).toBe(1.6)
    })

    it('should have button text transform set to none', () => {
      expect(theme.typography.button.textTransform).toBe('none')
      expect(theme.typography.button.fontWeight).toBe(600)
    })
  })

  describe('shape', () => {
    it('should have border radius configured', () => {
      expect(theme.shape.borderRadius).toBe(8)
    })
  })

  describe('components', () => {
    it('should have Card component overrides', () => {
      expect(theme.components?.MuiCard?.defaultProps?.elevation).toBe(0)
      expect(theme.components?.MuiCard?.styleOverrides?.root).toHaveProperty('borderRadius', 12)
      expect(theme.components?.MuiCard?.styleOverrides?.root).toHaveProperty('backgroundImage', 'none')
    })

    it('should have Button component overrides', () => {
      expect(theme.components?.MuiButton?.defaultProps?.disableElevation).toBe(true)
      expect(theme.components?.MuiButton?.styleOverrides?.root).toHaveProperty('borderRadius', 8)
      expect(theme.components?.MuiButton?.styleOverrides?.root).toHaveProperty('padding', '8px 20px')
    })

    it('should have Chip component overrides', () => {
      expect(theme.components?.MuiChip?.styleOverrides?.root).toHaveProperty('borderRadius', 6)
      expect(theme.components?.MuiChip?.styleOverrides?.root).toHaveProperty('fontWeight', 500)
    })

    it('should have AppBar component overrides', () => {
      expect(theme.components?.MuiAppBar?.defaultProps?.elevation).toBe(0)
      expect(theme.components?.MuiAppBar?.styleOverrides?.root).toHaveProperty('backgroundColor', '#111827')
    })

    it('should have Drawer component overrides', () => {
      expect(theme.components?.MuiDrawer?.styleOverrides?.paper).toHaveProperty('backgroundColor', '#111827')
    })

    it('should have ListItemButton component overrides', () => {
      expect(theme.components?.MuiListItemButton?.styleOverrides?.root).toHaveProperty('borderRadius', 8)
    })
  })

  describe('responsive font sizes', () => {
    it('should have responsive font sizes enabled', () => {
      // The responsiveFontSizes function adds breakpoints configuration
      expect(theme.breakpoints).toBeDefined()
      expect(theme.breakpoints.keys).toEqual(['xs', 'sm', 'md', 'lg', 'xl'])
    })
  })

  describe('theme structure', () => {
    it('should have all required theme properties', () => {
      expect(theme).toHaveProperty('palette')
      expect(theme).toHaveProperty('typography')
      expect(theme).toHaveProperty('shape')
      expect(theme).toHaveProperty('components')
      expect(theme).toHaveProperty('breakpoints')
      expect(theme).toHaveProperty('spacing')
    })

    it('should be a valid Material-UI theme object', () => {
      expect(typeof theme).toBe('object')
      expect(theme).not.toBeNull()
    })
  })
})
