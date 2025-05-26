import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, Typography, Paper } from '@mui/material';

interface AuthLayoutProps {
  children?: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Container 
        component="main" 
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box 
          component={Paper} 
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2,
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontWeight: 700,
              color: 'primary.main'
            }}
          >
            Sentivox
          </Typography>
          
          {children || <Outlet />}
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
