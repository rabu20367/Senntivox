import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  Button, 
  Chip,
  TextField,
  InputAdornment,
  Divider,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Grid
} from '@mui/material';
import { Search, FilterList, Article, PlayCircle, Headphones, FitnessCenter } from '@mui/icons-material';

// Types
type ResourceType = 'all' | 'articles' | 'videos' | 'audio' | 'exercises';
type Resource = {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'audio' | 'exercise';
  duration: string;
  category: string;
  image: string;
  popular: boolean;
};

// Mock data
const resources: Resource[] = [
  {
    id: '1',
    title: 'Mindfulness for Beginners',
    description: 'A comprehensive guide to starting your mindfulness journey with simple exercises.',
    type: 'article',
    duration: '10 min read',
    category: 'Mindfulness',
    image: '/images/mindfulness.jpg',
    popular: true,
  },
  {
    id: '2',
    title: 'Deep Breathing Techniques',
    description: 'Learn various breathing exercises to reduce stress and anxiety in minutes.',
    type: 'video',
    duration: '5 min',
    category: 'Breathing',
    image: '/images/breathing.jpg',
    popular: true,
  },
  {
    id: '3',
    title: 'Guided Meditation for Sleep',
    description: 'A calming audio guide to help you fall asleep faster and sleep more soundly.',
    type: 'audio',
    duration: '20 min',
    category: 'Sleep',
    image: '/images/sleep.jpg',
    popular: false,
  },
  {
    id: '4',
    title: 'Morning Yoga Flow',
    description: 'Gentle yoga sequence to start your day with energy and focus.',
    type: 'exercise',
    duration: '15 min',
    category: 'Exercise',
    image: '/images/yoga.jpg',
    popular: true,
  },
  {
    id: '5',
    title: 'Understanding Anxiety',
    description: 'Learn about the causes of anxiety and evidence-based strategies to manage it.',
    type: 'article',
    duration: '12 min read',
    category: 'Mental Health',
    image: '/images/anxiety.jpg',
    popular: false,
  },
  {
    id: '6',
    title: '5-Minute Stress Relief',
    description: 'Quick techniques to relieve stress anytime, anywhere.',
    type: 'video',
    duration: '5 min',
    category: 'Stress',
    image: '/images/stress-relief.jpg',
    popular: true,
  },
];

const ResourcesPage: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState<ResourceType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const handleTabChange = (event: React.SyntheticEvent, newValue: ResourceType) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'article':
        return <Article color="primary" />;
      case 'video':
        return <PlayCircle color="primary" />;
      case 'audio':
        return <Headphones color="primary" />;
      case 'exercise':
        return <FitnessCenter color="primary" />;
      default:
        return <Article color="primary" />;
    }
  };

  // Filter resources based on tab, search query, and filter
  const filteredResources = resources.filter(resource => {
    const matchesTab = tabValue === 'all' || resource.type === tabValue.slice(0, -1) as Resource['type'];
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || resource.category.toLowerCase() === filter.toLowerCase();
    
    return matchesTab && matchesSearch && matchesFilter;
  });

  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(resources.map(r => r.category))];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={6}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Well-being Resources
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Explore a variety of resources to support your emotional well-being.
        </Typography>
        
        {/* Tabs */}
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All" value="all" />
          <Tab label="Articles" value="articles" icon={<Article />} iconPosition="start" />
          <Tab label="Videos" value="videos" icon={<PlayCircle />} iconPosition="start" />
          <Tab label="Audio" value="audio" icon={<Headphones />} iconPosition="start" />
          <Tab label="Exercises" value="exercises" icon={<FitnessCenter />} iconPosition="start" />
        </Tabs>
        
        {/* Search and Filter */}
        <Box display="flex" flexWrap="wrap" gap={2} mb={4}>
          <TextField
            placeholder="Search resources..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1, maxWidth: 500 }}
          />
          
          <Box display="flex" alignItems="center" gap={1}>
            <FilterList color="action" />
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filter}
                onChange={handleFilterChange}
                label="Category"
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      
      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <Grid container spacing={3} sx={{ mb: 4 }} component="div">
          {filteredResources.map((resource) => (
            <Grid item xs={12} sm={6} md={4} key={resource.id} component="div">
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: '56.25%', // 16:9
                    position: 'relative',
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'grey.500',
                    fontSize: '3rem',
                  }}
                >
                  {getIconByType(resource.type)}
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Chip 
                      label={resource.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    {resource.popular && (
                      <Chip 
                        label="Popular" 
                        size="small" 
                        color="secondary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Typography gutterBottom variant="h6" component="h3">
                    {resource.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                    {resource.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {resource.duration}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => navigate(`/resources/${resource.id}`)}
                    sx={{ textTransform: 'none' }}
                  >
                    {resource.type === 'article' ? 'Read More' : 
                     resource.type === 'video' ? 'Watch Now' : 
                     resource.type === 'audio' ? 'Listen Now' : 'Start Exercise'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No resources found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ResourcesPage;
