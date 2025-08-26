import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Link,
  CircularProgress
} from '@mui/material';
import { useAuthStore } from '../stores/authStore';
import type { RegisterRequest } from '../types/api';

interface RegisterFormProps {
  onToggleMode: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleMode }) => {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { register, isLoading, error, clearError } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
      if (value && value !== formData.password) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'password') {
        if (confirmPassword && value !== confirmPassword) {
          setPasswordError('Passwords do not match');
        } else {
          setPasswordError('');
        }
      }
    }
    
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    await register(formData);
  };

  const isFormValid = 
    formData.username && 
    formData.email && 
    formData.password && 
    confirmPassword && 
    formData.password === confirmPassword &&
    formData.password.length >= 6;

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        maxWidth: 400, 
        mx: 'auto', 
        mt: 8,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          textAlign="center"
          sx={{ mb: 3, fontWeight: 'bold', color: '#2c3e50' }}
        >
          ♔ Chess Training
        </Typography>
        
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          textAlign="center"
          sx={{ mb: 3, color: '#34495e' }}
        >
          Create Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          required
          autoComplete="username"
          autoFocus
          helperText="3-20 characters, letters, numbers, and underscores only"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          autoComplete="email"
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          autoComplete="new-password"
          helperText="Minimum 6 characters"
        />

        <TextField
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleChange}
          margin="normal"
          required
          autoComplete="new-password"
          error={!!passwordError}
          helperText={passwordError}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
          disabled={!isFormValid || isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </Button>

        <Box textAlign="center" sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link 
              component="button" 
              variant="body2" 
              onClick={onToggleMode}
              type="button"
              sx={{ textDecoration: 'none', fontWeight: 'bold' }}
            >
              Sign in here
            </Link>
          </Typography>
        </Box>

        <Box textAlign="center" sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            POC Version 1.0 • Desktop Chess Training
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default RegisterForm;