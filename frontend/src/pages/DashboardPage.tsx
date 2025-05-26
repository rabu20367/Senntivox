import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CardActions,
  Divider,
  Avatar,
  IconButton,
  Grid
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  InsertEmoticon as MoodIcon,
  ShowChart as ChartIcon,
  Lightbulb as TipsIcon,
  People as CommunityIcon
} from '@mui/icons-material';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for the dashboard
  const moodData = [
    { day: 'Mon', value: 7 },
    { day: 'Tue', value: 8 },
    { day: 'Wed', value: 6 },
    { day: 'Thu', value: 9 },
    { day: 'Fri', value: 7 },
    { day: 'Sat', value: 8 },
    { day: 'Sun', value: 9 },
  ];

  const recentActivities = [
    { id: 1, text: 'Completed daily check-in', time: '2 hours ago' },
    { id: 2, text: 'Listened to a mindfulness exercise', time: '1 day ago' },
    { id: 3, text: 'Reached a 7-day streak!', time: '2 days ago' },
  ];

  const quickActions = [
    { 
      title: 'Mood Check-in', 
      icon: <MoodIcon fontSize="large" color="primary" />,
      path: '/mood-checkin'
    },
    { 
      title: 'View Insights', 
      icon: <ChartIcon fontSize="large" color="primary" />,
      path: '/insights'
    },
    { 
      title: 'Daily Tips', 
      icon: <TipsIcon fontSize="large" color="primary" />,
      path: '/tips'
    },
    { 
      title: 'Community', 
      icon: <CommunityIcon fontSize="large" color="primary" />,
      path: '/community'
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome back, User!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your emotional well-being today.
          </Typography>
        </Box>
        <Box>
          <IconButton sx={{ mr: 1 }}>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => navigate(action.path)}
            >
              <Box sx={{ mb: 2 }}>{action.icon}</Box>
              <Typography variant="h6" component="h3">
                {action.title}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mood Tracker */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2">
            Your Mood This Week
          </Typography>
          <Button 
            variant="outlined" 
            size="small"
            onClick={() => navigate('/mood-history')}
          >
            View History
          </Button>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: 200,
          mt: 4
        }}>
          {moodData.map((day, index) => (
            <Box key={index} sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
            }}>
              <Box 
                sx={{
                  width: '60%',
                  height: `${day.value * 10}%`,
                  bgcolor: 'primary.main',
                  borderRadius: 1,
                  mb: 1,
                  transition: 'height 0.5s ease-in-out',
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {day.day}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Recent Activities
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box>
              {recentActivities.map((activity) => (
                <Box key={activity.id} sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                  <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.light', mr: 2 }}>
                    <MoodIcon />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1">{activity.text}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Button 
              fullWidth 
              sx={{ mt: 2 }}
              onClick={() => navigate('/activities')}
            >
              View All Activities
            </Button>
          </Card>
        </Grid>

        {/* Daily Tip */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%', bgcolor: 'primary.light', color: 'white' }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Daily Well-being Tip
            </Typography>
            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', mb: 2 }} />
            <Typography variant="body1" paragraph>
              Take a moment to practice deep breathing. Inhale for 4 seconds, hold for 4 seconds, and exhale for 6 seconds. 
              Repeat this cycle 5 times to help reduce stress and increase focus.
            </Typography>
            <Button 
              variant="contained" 
              color="secondary"
              onClick={() => navigate('/breathing-exercise')}
              sx={{ mt: 2 }}
            >
              Start Breathing Exercise
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
