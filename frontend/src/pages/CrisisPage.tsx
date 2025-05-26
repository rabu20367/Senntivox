import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import {
  Chat as ChatIcon,
  LocalHospital as HospitalIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

import { SvgIconComponent } from '@mui/icons-material';

interface CrisisResource {
  name: string;
  description: string;
  phone: string;
  actionText: string;
  icon: React.ReactElement;
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const crisisResources: CrisisResource[] = [
  {
    name: 'Emergency Services',
    description: 'Call 911 for immediate assistance',
    phone: '911',
    actionText: 'Call 911',
    icon: <HospitalIcon />,
    color: 'error',
  },
  {
    name: 'Suicide Prevention',
    description: 'National Suicide Prevention Lifeline',
    phone: '988',
    actionText: 'Call 988',
    icon: <PhoneIcon />,
    color: 'primary',
  },
  {
    name: 'Crisis Text Line',
    description: 'Text HOME to 741741',
    phone: '741741',
    actionText: 'Text HOME',
    icon: <ChatIcon />,
    color: 'secondary',
  },
];

const navigationItems = [
  { text: 'Home', path: '/' },
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Resources', path: '/resources' },
  { text: 'Settings', path: '/settings' },
];

const CrisisPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const cardSx: SxProps<Theme> = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 3,
    },
  };

  const iconContainerSx: SxProps<Theme> = (theme) => ({
    width: 80,
    height: 80,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 3,
  });

  const numberBadgeSx: SxProps<Theme> = {
    width: 24,
    height: 24,
    borderRadius: '50%',
    bgcolor: 'primary.main',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '0.875rem',
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom>
          Crisis Support
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Immediate help is available. You're not alone.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          mb: 6,
        }}
      >
        {crisisResources.map((resource, index) => (
          <Box key={index}>
            <Card sx={cardSx}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box
                  sx={{
                    ...iconContainerSx,
                    bgcolor: `${resource.color}.light`,
                    color: `${resource.color}.contrastText`,
                    fontSize: 40,
                  }}
                >
                  {resource.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {resource.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {resource.description}
                </Typography>
                <Button
                  variant="contained"
                  color={resource.color}
                  startIcon={<PhoneIcon />}
                  fullWidth
                  onClick={() => handleCall(resource.phone)}
                  size="large"
                >
                  {resource.actionText}
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>


      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            What to Expect When You Call
          </Typography>
          <List>
            {[
              'Your call is confidential',
              'Trained crisis counselors are available 24/7',
              'You can talk about anything that\'s on your mind',
              'Interpreters are available for non-English speakers',
            ].map((text, index) => (
              <ListItem key={index} disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Box sx={numberBadgeSx}>{index + 1}</Box>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Additional Resources
          </Typography>
          <List>
            {navigationItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{ py: 1.5 }}
                >
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      variant: 'body1',
                      sx: { '&:hover': { textDecoration: 'underline' } },
                    }}
                  />
                </ListItemButton>
                {index < navigationItems.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CrisisPage;
