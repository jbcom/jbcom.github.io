/**
 * Layout - Clean navigation structure
 */

import {
  Close as CloseIcon,
  PlayCircle as DemoIcon,
  Widgets as EcosystemIcon,
  GitHub as GitHubIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Description as ResumeIcon,
} from '@mui/icons-material'
import {
  AppBar,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const DRAWER_WIDTH = 240

const navItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'About', path: '/about', icon: <PersonIcon /> },
  { label: 'Resume', path: '/resume', icon: <ResumeIcon /> },
  { label: 'Ecosystem', path: '/ecosystem', icon: <EcosystemIcon /> },
  { label: 'Dependency Flow', path: '/dependency-flow', icon: <EcosystemIcon /> },
  { label: 'Demos', path: '/demos', icon: <DemoIcon /> },
]

const Root = styled('div')({
  display: 'flex',
  minHeight: '100vh',
})

const SkipLink = styled('a')(({ theme }) => ({
  position: 'absolute',
  top: -9999,
  left: theme.spacing(2),
  zIndex: 9999,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 700,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.primary.main}`,
  transition: 'top 0.3s ease-in-out',
  '&:focus': {
    top: theme.spacing(2),
    outline: 'none',
    boxShadow: theme.shadows[4],
  },
}))

const DrawerContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
}))

const LogoLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  textDecoration: 'none',
  color: 'inherit',
}))

const LogoMark = styled('div')(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: 8,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  fontSize: '0.875rem',
  color: '#fff',
}))

const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 24,
})

const Main = styled('main')<{ drawerWidth: number }>(({ theme, drawerWidth }) => ({
  flexGrow: 1,
  [theme.breakpoints.up('md')]: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
}))

const NavBox = styled('nav')<{ drawerWidth: number }>(({ theme, drawerWidth }) => ({
  [theme.breakpoints.up('md')]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}))

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()

  const drawer = (
    <DrawerContent>
      <Header>
        <LogoLink to="/" onClick={() => setMobileOpen(false)}>
          <LogoMark>jb</LogoMark>
          <Typography variant="h6" fontWeight={700} fontFamily='"Space Grotesk", sans-serif'>
            jbcom
          </Typography>
        </LogoLink>
        {isMobile && (
          <IconButton
            onClick={() => setMobileOpen(false)}
            size="small"
            aria-label="Close navigation"
          >
            <CloseIcon />
          </IconButton>
        )}
      </Header>

      <List>
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path))
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={isActive}
                onClick={() => setMobileOpen(false)}
                sx={{ borderRadius: 2, mb: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: isActive ? 'primary.main' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <div style={{ marginTop: 'auto', paddingTop: 32 }}>
        <IconButton
          component="a"
          href="https://github.com/jbcom"
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          aria-label="GitHub profile"
          sx={{ color: 'text.secondary' }}
        >
          <GitHubIcon />
        </IconButton>
      </div>
    </DrawerContent>
  )

  return (
    <Root>
      <SkipLink href="#main-content">Skip to content</SkipLink>
      {isMobile && (
        <AppBar position="fixed" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <MenuIcon />
            </IconButton>
            <LogoLink to="/" style={{ marginLeft: 8 }}>
              <LogoMark style={{ width: 32, height: 32, fontSize: '0.75rem' }}>jb</LogoMark>
              <Typography variant="h6" fontWeight={700} fontFamily='"Space Grotesk", sans-serif'>
                jbcom
              </Typography>
            </LogoLink>
          </Toolbar>
        </AppBar>
      )}

      <NavBox drawerWidth={DRAWER_WIDTH}>
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
      </NavBox>

      <Main
        id="main-content"
        tabIndex={-1}
        drawerWidth={DRAWER_WIDTH}
        sx={{ mt: { xs: 8, md: 0 }, outline: 'none' }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Main>
    </Root>
  )
}
