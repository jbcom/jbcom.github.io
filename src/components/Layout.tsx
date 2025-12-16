/**
 * Layout - The foreground UI layer
 * 
 * Responsive design using Material UI breakpoints:
 * - xs (0px+): Mobile - bottom navigation, full-width content
 * - sm (600px+): Large mobile - collapsible sidebar
 * - md (900px+): Tablet - persistent sidebar, 2-column grid
 * - lg (1200px+): Desktop - full sidebar, 3-column grid
 * - xl (1536px+): Large desktop - max-width container
 */

import { useState, useCallback } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  alpha,
  Fade,
  Container,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Hub as EcosystemIcon,
  PlayCircle as DemoIcon,
  GitHub as GitHubIcon,
  Close as CloseIcon,
} from '@mui/icons-material'

const DRAWER_WIDTH = 260

const navItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'About', path: '/about', icon: <PersonIcon /> },
  { label: 'Ecosystem', path: '/ecosystem', icon: <EcosystemIcon /> },
  { label: 'Demos', path: '/demos', icon: <DemoIcon /> },
]

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const location = useLocation()
  const navigate = useNavigate()

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  const handleNavigate = useCallback((path: string) => {
    navigate(path)
    if (isMobile) setMobileOpen(false)
  }, [navigate, isMobile])

  // Get current nav index for bottom navigation
  const currentNavIndex = navItems.findIndex(
    (item) => location.pathname === item.path || 
              (item.path !== '/' && location.pathname.startsWith(item.path))
  )

  const drawerContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            cursor: 'pointer',
          }}
          onClick={() => handleNavigate('/')}
        >
          <Box
            sx={{
              width: { xs: 36, md: 44 },
              height: { xs: 36, md: 44 },
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: { xs: '1rem', md: '1.25rem' },
              color: 'white',
            }}
          >
            jb
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                lineHeight: 1.2,
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              jbcom
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Jon Bogaty
            </Typography>
          </Box>
        </Box>
        
        {isMobile && (
          <IconButton onClick={handleDrawerToggle} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Navigation */}
      <List sx={{ px: 2, py: 2, flexGrow: 1 }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path))
          
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  position: 'relative',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 44,
                    color: isActive ? 'primary.main' : 'text.secondary',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.9375rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <IconButton
          href="https://github.com/jbcom"
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          <GitHubIcon />
        </IconButton>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 1 }}
        >
          © 2025 Jon Bogaty
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Mobile App Bar */}
      <Fade in={isMobile}>
        <AppBar
          position="fixed"
          sx={{
            display: { md: 'none' },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 600,
              }}
            >
              jbcom
            </Typography>
          </Toolbar>
        </AppBar>
      </Fade>

      {/* Sidebar - Desktop: permanent, Mobile: temporary */}
      <Box
        component="nav"
        sx={{
          width: { md: DRAWER_WIDTH },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              border: 'none',
              backgroundColor: 'transparent',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          ml: { md: `${DRAWER_WIDTH}px` },
          pt: { xs: 7, md: 0 },
          pb: { xs: 8, md: 0 }, // Space for bottom nav on mobile
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            flexGrow: 1,
            py: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Outlet />
        </Container>
      </Box>

      {/* Mobile Bottom Navigation */}
      {isSmall && (
        <Paper
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.appBar,
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(20px)',
          }}
          elevation={0}
        >
          <BottomNavigation
            value={currentNavIndex >= 0 ? currentNavIndex : 0}
            onChange={(_, newValue) => {
              handleNavigate(navItems[newValue].path)
            }}
            sx={{
              backgroundColor: 'transparent',
              '& .MuiBottomNavigationAction-root': {
                minWidth: 'auto',
                py: 1,
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                },
              },
            }}
          >
            {navItems.map((item) => (
              <BottomNavigationAction
                key={item.path}
                label={item.label}
                icon={item.icon}
              />
            ))}
          </BottomNavigation>
        </Paper>
      )}
    </Box>
  )
}
