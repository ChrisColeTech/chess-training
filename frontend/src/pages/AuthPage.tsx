import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isAuthenticated, loadUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Try to load user from stored token
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        {isLoginMode ? (
          <LoginForm onToggleMode={toggleMode} />
        ) : (
          <RegisterForm onToggleMode={toggleMode} />
        )}
      </Container>
    </Box>
  );
};

export default AuthPage;