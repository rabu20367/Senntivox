import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using Sentivox, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our services.'
    },
    {
      title: '2. Description of Service',
      content: 'Sentivox provides emotional well-being support through various tools and resources. The service is not a substitute for professional medical advice, diagnosis, or treatment.'
    },
    {
      title: '3. User Responsibilities',
      content: 'You agree to use the service responsibly and in accordance with all applicable laws. You are responsible for maintaining the confidentiality of your account information.',
      items: [
        'Provide accurate and complete information when creating an account',
        'Maintain the security of your account credentials',
        'Immediately notify us of any unauthorized use of your account',
        'Use the service only for lawful purposes'
      ]
    },
    {
      title: '4. Privacy Policy',
      content: 'Your use of Sentivox is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.'
    },
    {
      title: '5. Intellectual Property',
      content: 'All content and materials available on Sentivox, including but not limited to text, graphics, logos, and software, are the property of Sentivox and are protected by applicable intellectual property laws.'
    },
    {
      title: '6. Limitation of Liability',
      content: 'Sentivox shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.'
    },
    {
      title: '7. Modifications to Terms',
      content: 'We reserve the right to modify these terms at any time. Your continued use of the service after such modifications constitutes your acceptance of the new terms.'
    },
    {
      title: '8. Contact Information',
      content: 'If you have any questions about these Terms of Service, please contact us at support@sentivox.com.'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>
      
      <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, mb: 4, borderRadius: 2 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            mb: 4,
            color: 'primary.main'
          }}
        >
          Terms of Service
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.6 }}
        >
          Last updated: May 22, 2025
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
        
        <Box sx={{ '& > section': { mb: 4 } }}>
          {sections.map((section, index) => (
            <section key={index}>
              <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom
                sx={{ 
                  fontWeight: 600,
                  mt: index > 0 ? 4 : 0,
                  mb: 2,
                  color: 'text.primary'
                }}
              >
                {section.title}
              </Typography>
              
              <Typography 
                variant="body1" 
                paragraph
                sx={{ 
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  '& a': { color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }
                }}
              >
                {section.content}
              </Typography>
              
              {section.items && (
                <List dense sx={{ pl: 2, '& li': { pl: 1 } }}>
                  {section.items.map((item, itemIndex) => (
                    <ListItem key={itemIndex} sx={{ display: 'list-item', listStyleType: 'disc', pl: 1, py: 0.5 }}>
                      <ListItemText 
                        primary={item} 
                        primaryTypographyProps={{ variant: 'body1', color: 'text.secondary' }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </section>
          ))}
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            If you do not agree to these terms, please discontinue use of Sentivox immediately.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/')}
            sx={{ 
              borderRadius: 50,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
              }
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
      
      <Box textAlign="center" mt={2}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Sentivox. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsPage;
