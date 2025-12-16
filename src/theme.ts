/**
 * jbcom Theme
 * 
 * Design System:
 * - Colors: Deep blues, slate grays, cyan accents
 * - Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (code)
 * - Style: Dark, professional, technical, clean
 * 
 * The theme mirrors strata's layer philosophy:
 * - Background: Deep slate (#020617)
 * - Surface: Elevated panels with glassmorphism
 * - Foreground: Crisp text with proper contrast
 */

import { createTheme, alpha, responsiveFontSizes } from '@mui/material/styles'

// ═══════════════════════════════════════════════════════════════════════════
// COLOR PALETTE
// ═══════════════════════════════════════════════════════════════════════════

const palette = {
  // Primary: Cyan/Teal - Technical, modern
  primary: {
    main: '#0ea5e9',
    light: '#38bdf8',
    dark: '#0284c7',
    contrastText: '#ffffff',
  },
  
  // Secondary: Deep blue - Professional
  secondary: {
    main: '#3170aa',
    light: '#4c8bc4',
    dark: '#1e4976',
    contrastText: '#ffffff',
  },
  
  // Background: Deep slate
  background: {
    default: '#020617',  // slate-950
    paper: '#0f172a',    // slate-900
  },
  
  // Text
  text: {
    primary: '#f8fafc',   // slate-50
    secondary: '#94a3b8', // slate-400
    disabled: '#475569',  // slate-600
  },
  
  // Dividers
  divider: 'rgba(148, 163, 184, 0.12)', // slate-400 @ 12%
  
  // Semantic colors
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
  },
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
  },
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },
  info: {
    main: '#0ea5e9',
    light: '#38bdf8',
    dark: '#0284c7',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════════════════

const typography = {
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
    letterSpacing: '-0.01em',
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
  
  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.6,
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 1.5,
  },
  
  body1: {
    lineHeight: 1.7,
  },
  body2: {
    lineHeight: 1.6,
  },
  
  button: {
    fontWeight: 600,
    textTransform: 'none' as const,
    letterSpacing: '0.01em',
  },
  
  caption: {
    lineHeight: 1.5,
  },
  
  overline: {
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT OVERRIDES
// ═══════════════════════════════════════════════════════════════════════════

const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarColor: `${palette.text.disabled} ${palette.background.paper}`,
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          borderRadius: 8,
          backgroundColor: palette.text.disabled,
          border: '2px solid transparent',
          backgroundClip: 'content-box',
        },
        '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
      },
      // Code blocks
      'code, pre': {
        fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
      },
      code: {
        backgroundColor: alpha(palette.primary.main, 0.1),
        padding: '2px 6px',
        borderRadius: 4,
        fontSize: '0.875em',
        color: palette.primary.light,
      },
      pre: {
        backgroundColor: palette.background.paper,
        padding: 16,
        borderRadius: 8,
        overflow: 'auto',
        border: `1px solid ${palette.divider}`,
      },
    },
  },
  
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  
  MuiCard: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        borderRadius: 16,
        border: `1px solid ${palette.divider}`,
        transition: 'border-color 0.2s ease, box-shadow 0.3s ease, transform 0.3s ease',
      },
    },
  },
  
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 10,
        padding: '8px 20px',
        fontSize: '0.9375rem',
      },
      contained: {
        '&:hover': {
          transform: 'translateY(-1px)',
        },
      },
      outlined: {
        borderWidth: 1.5,
        '&:hover': {
          borderWidth: 1.5,
        },
      },
    },
  },
  
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        fontWeight: 500,
      },
    },
  },
  
  MuiTextField: {
    defaultProps: {
      variant: 'outlined' as const,
    },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 10,
          '& fieldset': {
            borderWidth: 1.5,
          },
          '&:hover fieldset': {
            borderWidth: 1.5,
          },
          '&.Mui-focused fieldset': {
            borderWidth: 2,
          },
        },
      },
    },
  },
  
  MuiAppBar: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundColor: alpha(palette.background.paper, 0.8),
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${palette.divider}`,
      },
    },
  },
  
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: palette.background.paper,
        borderRight: `1px solid ${palette.divider}`,
      },
    },
  },
  
  MuiToggleButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        border: `1px solid ${palette.divider}`,
        '&.Mui-selected': {
          backgroundColor: alpha(palette.primary.main, 0.15),
          borderColor: palette.primary.main,
          '&:hover': {
            backgroundColor: alpha(palette.primary.main, 0.25),
          },
        },
      },
    },
  },
  
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        '&.Mui-selected': {
          backgroundColor: alpha(palette.primary.main, 0.12),
          '&:hover': {
            backgroundColor: alpha(palette.primary.main, 0.18),
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 3,
            height: '60%',
            borderRadius: '0 3px 3px 0',
            backgroundColor: palette.primary.main,
          },
        },
      },
    },
  },
  
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.875rem',
        minHeight: 48,
      },
    },
  },
  
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: palette.background.paper,
        border: `1px solid ${palette.divider}`,
        borderRadius: 8,
        color: palette.text.primary,
        fontSize: '0.8125rem',
        boxShadow: `0 4px 20px ${alpha('#000', 0.3)}`,
      },
    },
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// THEME CREATION
// ═══════════════════════════════════════════════════════════════════════════

let theme = createTheme({
  palette: {
    mode: 'dark',
    ...palette,
  },
  typography,
  shape: {
    borderRadius: 12,
  },
  components,
  
  // Custom breakpoints for better responsive design
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})

// Apply responsive font sizes
theme = responsiveFontSizes(theme, {
  breakpoints: ['sm', 'md', 'lg'],
  factor: 2,
})

export default theme
