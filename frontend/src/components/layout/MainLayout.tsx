import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Notifications, AccountCircle } from '@mui/icons-material';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={0} sx={{ bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="div"
              sx={{ 
                flexGrow: 1, 
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none'
              }}
            >
              Sentivox
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button color="inherit">Home</Button>
              <Button color="inherit">Community</Button>
              <Button color="inherit">Resources</Button>
              <Button color="inherit">About</Button>
              
              <Button color="inherit">
                <Notifications />
              </Button>
              
              <Button color="inherit">
                <AccountCircle />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Container maxWidth="lg">
          {children || <Outlet />}
        </Container>
      </Box>
      
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 4, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Sentivox. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button size="small" color="inherit">Privacy Policy</Button>
              <Button size="small" color="inherit">Terms of Service</Button>
              <Button size="small" color="inherit">Contact Us</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
