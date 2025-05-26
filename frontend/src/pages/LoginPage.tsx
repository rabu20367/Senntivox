import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  IconButton, 
  InputAdornment,
  Link,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login form submitted:', formData);
    navigate('/dashboard'); // Redirect to dashboard after successful login
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
        Welcome Back
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Sign in to continue to Sentivox
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          sx={{ mb: 2 }}
        />
        
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          sx={{ mb: 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3 
        }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rememberMe}
                onChange={handleChange}
                name="rememberMe"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Link 
            component={RouterLink} 
            to="/forgot-password" 
            variant="body2"
            color="primary"
          >
            Forgot password?
          </Link>
        </Box>
        
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          sx={{
            py: 1.5,
            mb: 2,
            borderRadius: 6,
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          Sign In
        </Button>
        
        <Button
          fullWidth
          variant="outlined"
          size="large"
          sx={{
            py: 1.5,
            mb: 3,
            borderRadius: 6,
            textTransform: 'none',
            fontSize: '1rem',
          }}
        >
          Sign in with Social
        </Button>
        
        <Typography variant="body2" color="text.secondary" align="center">
          Don't have an account?{' '}
          <Link component={RouterLink} to="/auth/signup" color="primary">
            Sign up
          </Link>
        </Typography>
      </form>
      
      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'space-between' }}>
        <Link href="#" variant="body2" color="text.secondary">
          Terms of Service
        </Link>
        <Link href="#" variant="body2" color="text.secondary">
          Privacy Policy
        </Link>
      </Box>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
        © {new Date().getFullYear()} Sentivox. All rights reserved.
      </Typography>
    </Box>
  );
};

export default LoginPage;
