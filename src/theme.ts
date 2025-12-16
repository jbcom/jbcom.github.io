/**
 * jbcom Theme
 *
 * Based on docs/DESIGN-SYSTEM.md
 * Deep blues, cyan accents, professional and technical.
 */

import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// Color tokens from design system
const colors = {
  // Backgrounds
  bgDefault: '#0a0f1a',
  bgPaper: '#111827',
  bgElevated: '#1e293b',

  // Primary (Cyan)
  primaryMain: '#06b6d4',
  primaryLight: '#22d3ee',
  primaryDark: '#0891b2',

  // Secondary (Blue)
  secondaryMain: '#3b82f6',
  secondaryLight: '#60a5fa',
  secondaryDark: '#2563eb',

  // Text
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
  textDisabled: '#475569',

  // Dividers
  divider: '#1e293b',

  // Semantic
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
}

let theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: colors.bgDefault,
      paper: colors.bgPaper,
    },
    primary: {
      main: colors.primaryMain,
      light: colors.primaryLight,
      dark: colors.primaryDark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondaryMain,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
      contrastText: '#ffffff',
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
      disabled: colors.textDisabled,
    },
    divider: colors.divider,
    success: { main: colors.success },
    warning: { main: colors.warning },
    error: { main: colors.error },
    info: { main: colors.info },
  },

  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
    body2: {
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: `${colors.textDisabled} ${colors.bgPaper}`,
          '&::-webkit-scrollbar': { width: 8 },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.textDisabled,
            borderRadius: 4,
          },
        },
        'code, pre': {
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        },
      },
    },

    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${colors.divider}`,
          backgroundImage: 'none',
        },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },

    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: colors.bgPaper,
          borderBottom: `1px solid ${colors.divider}`,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.bgPaper,
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: `${colors.primaryMain}15`,
            '&:hover': {
              backgroundColor: `${colors.primaryMain}25`,
            },
          },
        },
      },
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
