import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Divider, 
  IconButton, 
  InputAdornment,
  Link,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
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
    // Handle signup logic here
    console.log('Signup form submitted:', formData);
    navigate('/dashboard'); // Redirect to dashboard after successful signup
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
        Create your account
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Sign up with your email or social account to get started.
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
          sx={{ mb: 2 }}
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
        
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.agreeTerms}
              onChange={handleChange}
              name="agreeTerms"
              color="primary"
              required
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{' '}
              <Link component={RouterLink} to="/terms" color="primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link component={RouterLink} to="/privacy" color="primary">
                Privacy Policy
              </Link>
            </Typography>
          }
          sx={{ mb: 3 }}
        />
        
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
          Continue
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
          Sign up with Social
        </Button>
        
        <Typography variant="body2" color="text.secondary" align="center">
          Already have an account?{' '}
          <Link component={RouterLink} to="/auth/login" color="primary">
            Sign in
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

export default SignupPage;
