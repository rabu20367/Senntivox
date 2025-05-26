import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { SentimentVeryDissatisfied as NotFoundIcon, Home as HomeIcon } from '@mui/icons-material';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper 
        elevation={0}
        sx={{
          p: { xs: 3, md: 6 },
          textAlign: 'center',
          borderRadius: 4,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(145deg, #1E1E1E 0%, #2C2C2E 100%)' 
            : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '"404"',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '30vw',
            fontWeight: 900,
            color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            zIndex: 0,
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }
        }}
      >
        <Box 
          sx={{ 
            position: 'relative',
            zIndex: 1,
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              bgcolor: 'primary.light',
              color: 'primary.contrastText',
              width: 100,
              height: 100,
              borderRadius: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              '& svg': {
                fontSize: 60
              }
            }}
          >
            <NotFoundIcon fontSize="inherit" />
          </Box>
          
          <Typography 
            variant={isMobile ? 'h4' : 'h3'} 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              mb: 2,
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(90deg, #fff 0%, #aaa 100%)' 
                : 'linear-gradient(90deg, #1976d2 0%, #5e35b1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            Page Not Found
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary" 
            paragraph
            sx={{ mb: 3, lineHeight: 1.7 }}
          >
            Oops! The page you're looking for doesn't exist or has been moved.
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            paragraph
            sx={{ mb: 4, maxWidth: '80%', mx: 'auto' }}
          >
            Don't worry, you can return to our homepage or contact us if you think this is a mistake.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{
                borderRadius: 50,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)'
                }
              }}
            >
              Back to Homepage
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 50,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                }
              }}
            >
              Go Back
            </Button>
          </Box>
          
          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button 
              variant="text" 
              size="small" 
              onClick={() => navigate('/contact')}
              sx={{ textTransform: 'none' }}
            >
              Contact Support
            </Button>
            <Button 
              variant="text" 
              size="small" 
              onClick={() => navigate('/faq')}
              sx={{ textTransform: 'none' }}
            >
              FAQ
            </Button>
            <Button 
              variant="text" 
              size="small" 
              onClick={() => navigate('/terms')}
              sx={{ textTransform: 'none' }}
            >
              Terms of Service
            </Button>
          </Box>
        </Box>
      </Paper>
      
      <Box textAlign="center" mt={4}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Sentivox. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
