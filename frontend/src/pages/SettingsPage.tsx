import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  Switch,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Avatar,
  InputLabel,
  SelectChangeEvent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  FormGroup,
  Checkbox,
  ListItemButton
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  TextFields as TextFieldsIcon,
  Contrast as ContrastIcon,
  VolumeUp as VolumeUpIcon,
  Vibration as VibrationIcon,
  AccountCircle as AccountCircleIcon,
  WbSunny as LightModeIcon,
  DarkMode as DarkModeIcon,
  SettingsBrightness as SystemModeIcon,
  Check as CheckIcon
} from '@mui/icons-material';

type ThemeMode = 'light' | 'dark' | 'system';
type FontSize = 'small' | 'medium' | 'large';
type ColorScheme = 'default' | 'blue' | 'green' | 'yellow';

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('default');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [volume, setVolume] = useState(70);
  const [vibration, setVibration] = useState(true);

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeMode(event.target.value as ThemeMode);
  };

  const handleFontSizeChange = (event: SelectChangeEvent<FontSize>) => {
    setFontSize(event.target.value as FontSize);
  };

  const handleColorSchemeChange = (scheme: ColorScheme) => {
    setColorScheme(scheme);
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const getThemeModeIcon = () => {
    switch (themeMode) {
      case 'light':
        return <LightModeIcon />;
      case 'dark':
        return <DarkModeIcon />;
      default:
        return <SystemModeIcon />;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1">
          Settings
        </Typography>
      </Box>

      {/* Account Settings */}
      <Card sx={{ mb: 3 }}>
        <CardHeader 
          title="Account" 
          titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
        />
        <Divider />
        <List>
          <ListItemButton 
            onClick={() => navigate('/settings/profile')}
            component="div"
          >
            <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
              <AccountCircleIcon />
            </Avatar>
            <ListItemText 
              primary="Profile Information" 
              secondary="Update your name, email, and profile picture" 
            />
          </ListItemButton>
          <Divider component="li" />
          <ListItemButton 
            onClick={() => navigate('/settings/password')}
            component="div"
          >
            <ListItemText 
              primary="Change Password" 
              secondary="Update your account password" 
            />
          </ListItemButton>
          <Divider component="li" />
          <ListItemButton 
            onClick={() => navigate('/settings/privacy')}
            component="div"
          >
            <ListItemText 
              primary="Privacy Settings" 
              secondary="Manage your data and privacy" 
            />
          </ListItemButton>
        </List>
      </Card>

      {/* Notification Settings */}
      <Card sx={{ mb: 3 }}>
        <CardHeader 
          title="Notifications" 
          avatar={<NotificationsIcon color="primary" />}
          titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
        />
        <Divider />
        <List>
          <ListItem>
            <ListItemText 
              primary="Enable Notifications" 
              secondary="Receive app notifications" 
            />
            <ListItemSecondaryAction>
              <Switch 
                edge="end" 
                checked={notificationsEnabled} 
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
              />
            </ListItemSecondaryAction>
          </ListItem>
          
          {notificationsEnabled && (
            <>
              <Divider component="li" />
              <ListItem>
                <ListItemText 
                  primary="Email Notifications" 
                  secondary="Receive notifications via email" 
                  sx={{ pl: 4 }}
                />
                <ListItemSecondaryAction>
                  <Switch 
                    edge="end" 
                    checked={emailNotifications} 
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    disabled={!notificationsEnabled}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
              <Divider component="li" />
              <ListItem>
                <ListItemText 
                  primary="Push Notifications" 
                  secondary="Receive push notifications on your device" 
                  sx={{ pl: 4 }}
                />
                <ListItemSecondaryAction>
                  <Switch 
                    edge="end" 
                    checked={pushNotifications} 
                    onChange={(e) => setPushNotifications(e.target.checked)}
                    disabled={!notificationsEnabled}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
              <Divider component="li" />
              <ListItem>
                <ListItemText 
                  primary="Notification Sound" 
                  secondary="Play sound for notifications" 
                  sx={{ pl: 4 }}
                />
                <Box sx={{ width: 150, mr: 2 }}>
                  <Slider 
                    value={volume} 
                    onChange={handleVolumeChange} 
                    aria-labelledby="volume-slider"
                    disabled={!notificationsEnabled}
                  />
                </Box>
                <VolumeUpIcon color={notificationsEnabled ? 'primary' : 'disabled'} />
              </ListItem>
              
              <Divider component="li" />
              <ListItem>
                <ListItemText 
                  primary="Vibration" 
                  secondary="Enable vibration for notifications" 
                  sx={{ pl: 4 }}
                />
                <VibrationIcon color={vibration && notificationsEnabled ? 'primary' : 'disabled'} sx={{ mr: 1 }} />
                <Switch 
                  edge="end" 
                  checked={vibration} 
                  onChange={(e) => setVibration(e.target.checked)}
                  disabled={!notificationsEnabled}
                />
              </ListItem>
            </>
          )}
        </List>
      </Card>

      {/* Display Settings */}
      <Card sx={{ mb: 3 }}>
        <CardHeader 
          title="Display" 
          titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
        />
        <Divider />
        <List>
          <ListItem>
            <ListItemText 
              primary="Theme" 
              secondary="Choose between light and dark mode" 
            />
            <RadioGroup
              row
              aria-label="theme"
              name="theme-mode"
              value={themeMode}
              onChange={handleThemeChange}
            >
              <FormControlLabel 
                value="light" 
                control={<Radio />} 
                labelPlacement="top"
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 1 }}>
                    <LightModeIcon />
                    <span>Light</span>
                  </Box>
                } 
              />
              <FormControlLabel 
                value="dark" 
                control={<Radio />} 
                labelPlacement="top"
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 1 }}>
                    <DarkModeIcon />
                    <span>Dark</span>
                  </Box>
                } 
              />
              <FormControlLabel 
                value="system" 
                control={<Radio />} 
                labelPlacement="top"
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 1 }}>
                    <SystemModeIcon />
                    <span>System</span>
                  </Box>
                } 
              />
            </RadioGroup>
          </ListItem>
          
          <Divider component="li" />
          <ListItem>
            <ListItemText 
              primary="Font Size" 
              secondary="Adjust the text size throughout the app" 
            />
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Size</InputLabel>
              <Select
                value={fontSize}
                onChange={handleFontSizeChange}
                label="Size"
              >
                <MenuItem value="small">Small</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="large">Large</MenuItem>
              </Select>
            </FormControl>
          </ListItem>
          
          <Divider component="li" />
          <ListItem>
            <ListItemText 
              primary="Color Scheme" 
              secondary="Choose a color theme for the app" 
            />
            <Box display="flex" gap={1}>
              {['default', 'blue', 'green', 'yellow'].map((color) => (
                <Box 
                  key={color}
                  onClick={() => handleColorSchemeChange(color as ColorScheme)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 
                      color === 'default' ? 'primary.main' :
                      color === 'blue' ? '#1976d2' :
                      color === 'green' ? '#2e7d32' : '#ed6c02',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: colorScheme === color ? '2px solid #000' : '2px solid transparent',
                    '&:hover': {
                      opacity: 0.9,
                    },
                  }}
                >
                  {colorScheme === color && <CheckIcon sx={{ color: '#fff' }} />}
                </Box>
              ))}
            </Box>
          </ListItem>
        </List>
      </Card>

      {/* Accessibility Settings */}
      <Card sx={{ mb: 3 }}>
        <CardHeader 
          title="Accessibility" 
          titleTypographyProps={{ variant: 'h6', fontWeight: 600 }}
        />
        <Divider />
        <List>
          <ListItem>
            <ListItemText 
              primary="Reduced Motion" 
              secondary="Reduce animations and motion effects" 
            />
            <Switch 
              edge="end" 
              checked={reducedMotion} 
              onChange={(e) => setReducedMotion(e.target.checked)}
            />
          </ListItem>
          
          <Divider component="li" />
          <ListItem>
            <ListItemText 
              primary="Screen Reader" 
              secondary="Enable screen reader compatibility" 
            />
            <Switch 
              edge="end" 
              checked={screenReader} 
              onChange={(e) => setScreenReader(e.target.checked)}
            />
          </ListItem>
        </List>
      </Card>

      {/* App Version and Support */}
      <Box textAlign="center" mt={4} mb={2}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Sentivox v1.0.0
        </Typography>
        <Button 
          variant="text" 
          color="primary"
          onClick={() => navigate('/support')}
          sx={{ textTransform: 'none' }}
        >
          Help & Support
        </Button>
        <Button 
          variant="text" 
          color="error"
          onClick={() => {}}
          sx={{ textTransform: 'none' }}
        >
          Sign Out
        </Button>
      </Box>
    </Container>
  );
};

export default SettingsPage;
