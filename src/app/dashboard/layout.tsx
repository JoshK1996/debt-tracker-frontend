'use client';

import { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, 
  IconButton, Typography, Avatar, Menu, MenuItem, Divider, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { 
  Dashboard, People, Assignment, Payments, QueryStats, Notifications, 
  Settings, Menu as MenuIcon, Person, Logout, DarkMode, LightMode, 
  ArrowCircleRight, Computer, Assessment, BusinessCenter
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/theme/ThemeProvider';

const DRAWER_WIDTH = 260;

const NAV_ITEMS = [
  { name: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { name: 'Debtors', icon: <People />, path: '/dashboard/debtors' },
  { name: 'Debts', icon: <Assignment />, path: '/dashboard/debts' },
  { name: 'Payments', icon: <Payments />, path: '/dashboard/payments' },
  { name: 'Reports', icon: <Assessment />, path: '/dashboard/reports' },
  { name: 'Users', icon: <Person />, path: '/dashboard/users' },
  { name: 'Companies', icon: <BusinessCenter />, path: '/dashboard/companies' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const muiTheme = useMuiTheme();
  const { mode, toggleColorMode } = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  // Auto close drawer on mobile
  if (isMobile && drawerOpen) {
    setDrawerOpen(false);
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear tokens and redirect to login
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  };

  const drawer = (
    <Box sx={{ position: 'relative', height: '100%', borderRight: 'none' }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        background: mode === 'light' 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))'
          : 'linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.7))',
        backdropFilter: 'blur(16px)',
        borderRight: `1px solid ${mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'}`,
      }}>
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Debt Tracker
          </Typography>
        </Box>
        <Divider />
        <List sx={{ flexGrow: 1, px: 1 }}>
          {NAV_ITEMS.map((item) => (
            <ListItem 
              key={item.path}
              component={Link}
              href={item.path}
              sx={{ 
                mb: 1,
                borderRadius: 2,
                background: pathname === item.path 
                  ? mode === 'light' 
                    ? 'linear-gradient(90deg, rgba(0, 120, 212, 0.1), rgba(56, 182, 255, 0.05))' 
                    : 'linear-gradient(90deg, rgba(56, 182, 255, 0.2), rgba(0, 120, 212, 0.05))'
                  : 'transparent',
                color: pathname === item.path ? 'primary.main' : 'text.primary',
                '&:hover': {
                  background: mode === 'light' 
                    ? 'rgba(0, 0, 0, 0.03)' 
                    : 'rgba(255, 255, 255, 0.05)',
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: pathname === item.path ? 'primary.main' : 'text.secondary',
                minWidth: '40px'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
              {pathname === item.path && (
                <Box sx={{ 
                  width: '4px', 
                  height: '100%', 
                  bgcolor: 'primary.main',
                  position: 'absolute',
                  right: 0,
                  borderRadius: '4px 0 0 4px'
                }} />
              )}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          width: { md: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' },
          ml: { md: drawerOpen ? `${DRAWER_WIDTH}px` : 0 },
          transition: 'all 0.3s ease',
          boxShadow: 'none',
          zIndex: (theme) => theme.zIndex.drawer - 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'none', md: 'block' } }}
          >
            {drawerOpen ? <ArrowCircleRight /> : <MenuIcon />}
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* Page title would go here */}
          </Typography>
          
          <IconButton color="inherit" onClick={toggleColorMode} sx={{ mr: 1 }}>
            {mode === 'light' ? <DarkMode /> : <LightMode />}
          </IconButton>
          
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Notifications />
          </IconButton>
          
          <IconButton 
            edge="end" 
            onClick={handleMenuOpen}
            sx={{ 
              border: '2px solid',
              borderColor: 'primary.main',
              p: 0.5
            }}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <Person />
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                mt: 1,
                background: mode === 'light' 
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))'
                  : 'linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.7))',
                backdropFilter: 'blur(16px)',
                border: `1px solid ${mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'}`,
              }
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            background: 'transparent',
            boxShadow: 'none',
            border: 'none'
          },
          display: { xs: drawerOpen ? 'block' : 'none', md: 'block' }
        }}
      >
        {drawer}
      </Drawer>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8,
          width: { md: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' },
          transition: 'all 0.3s ease',
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 3 },
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ height: '100%' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}