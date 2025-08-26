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
import type { LoginRequest } from '../types/api';

interface LoginFormProps {
  onToggleMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode }) => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const { login, isLoading, error, clearError } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  const isFormValid = formData.email && formData.password;

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
          Welcome Back
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

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
          autoFocus
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
          autoComplete="current-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
          disabled={!isFormValid || isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <Box textAlign="center" sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link 
              component="button" 
              variant="body2" 
              onClick={onToggleMode}
              type="button"
              sx={{ textDecoration: 'none', fontWeight: 'bold' }}
            >
              Sign up here
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

export default LoginForm;