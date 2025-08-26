import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Card,
  CardContent,
  CardActions,
  Chip
} from '@mui/material';
import {
  AccountCircle,
  ExitToApp,
  PlayArrow,
  Extension,
  TrendingUp,
  EmojiEvents
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import apiService from '../services/api';
import type { DashboardStats } from '../types/api';

const Dashboard: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    // Load dashboard stats
    loadDashboardStats();
  }, [isAuthenticated, navigate]);

  const loadDashboardStats = async () => {
    try {
      const response = await apiService.getDashboardStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
    navigate('/auth');
  };

  const handleNewGame = () => {
    navigate('/game');
  };

  const handlePuzzles = () => {
    navigate('/puzzles');
  };

  if (!user || !stats) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ♔ Chess Training
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user.username}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <AccountCircle sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome back, {user.username}!
        </Typography>
        
        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PlayArrow />}
                    onClick={handleNewGame}
                    sx={{ py: 1.5 }}
                  >
                    New Game
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Extension />}
                    onClick={handlePuzzles}
                    sx={{ py: 1.5 }}
                  >
                    Solve Puzzles
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Stats Overview */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Your Progress
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {stats.chessRating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Chess Rating
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="secondary">
                      {stats.puzzleRating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Puzzle Rating
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Today's Activity */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <TrendingUp color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Today's Activity
                  </Typography>
                </Box>
                <Typography variant="h3" color="primary" gutterBottom>
                  {stats.todayGames}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Games Played
                </Typography>
                <Typography variant="h3" color="secondary" gutterBottom>
                  {stats.todayPuzzles}
                </Typography>
                <Typography color="text.secondary">
                  Puzzles Solved
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Current Streak */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <EmojiEvents color="warning" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Current Streak
                  </Typography>
                </Box>
                <Typography variant="h3" color="warning.main" gutterBottom>
                  {stats.currentStreak}
                </Typography>
                <Typography color="text.secondary">
                  Days Active
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handlePuzzles}>
                  Keep It Going!
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Recent Games */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Results
                </Typography>
                {stats.recentGames.length > 0 ? (
                  stats.recentGames.slice(0, 3).map((game, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Box display="flex" alignItems="center">
                        <Chip
                          label={game.result}
                          size="small"
                          color={
                            game.result === '1-0' ? 'success' : 
                            game.result === '0-1' ? 'error' : 'default'
                          }
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2">
                          AI Level {game.aiLevel}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        color={game.eloChange >= 0 ? 'success.main' : 'error.main'}
                      >
                        {game.eloChange >= 0 ? '+' : ''}{game.eloChange}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography color="text.secondary">
                    No recent games
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleNewGame}>
                  Play Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;