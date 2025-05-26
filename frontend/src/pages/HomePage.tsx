import React from 'react';
import { Box, Button, Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          mb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Your Intelligent Emotional Well-being Companion
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Track your mood, gain insights, and improve your emotional health with Sentivox.
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large"
            onClick={() => navigate('/auth/signup')}
            sx={{ 
              borderRadius: 6,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 600, mb: 6 }}>
          Key Features
        </Typography>
        
        <Grid container spacing={3} sx={{ py: 4 }}>
          {[
            {
              title: 'Daily Mood Check-ins',
              description: 'Track your emotional well-being with simple daily check-ins and mood logging.',
              icon: '😊',
            },
            {
              title: 'Biometric Insights',
              description: 'Gain valuable insights into your emotional patterns with advanced biometric analysis.',
              icon: '📊',
            },
            {
              title: 'Personalized Coaching',
              description: 'Receive tailored recommendations and coaching based on your emotional data.',
              icon: '🎯',
            },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 4, textAlign: 'center' }}>
                  <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{
          bgcolor: 'background.paper',
          py: 8,
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Ready to take control of your emotional well-being?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
            Join thousands of users who have improved their emotional health with Sentivox.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/auth/signup')}
            sx={{ 
              borderRadius: 6,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Sign Up Free
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
