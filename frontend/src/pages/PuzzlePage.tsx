import React, { useEffect } from 'react';
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
  LinearProgress,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import {
  ArrowBack,
  Lightbulb,
  Refresh,
  PlayArrow,
  CheckCircle,
  BarChart
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { usePuzzleStore } from '../stores/puzzleStore';
import { useAuthStore } from '../stores/authStore';
import PuzzleBoard from '../components/PuzzleBoard';

const PuzzlePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const {
    currentPuzzle,
    userMoves,
    isSolved,
    isCorrect,
    hint,
    stats,
    startTime,
    endTime,
    isLoading,
    error,
    loadNextPuzzle,
    submitSolution,
    getHint,
    resetPuzzle,
    loadStats
  } = usePuzzleStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    // Load initial puzzle and stats only once
    if (!currentPuzzle) {
      loadNextPuzzle();
      loadStats();
    }
  }, [isAuthenticated, navigate]);

  // Load stats only once when authenticated
  useEffect(() => {
    if (isAuthenticated && !stats) {
      loadStats();
    }
  }, [isAuthenticated]);

  const handleSubmitSolution = () => {
    if (userMoves.length === 0) {
      return;
    }
    submitSolution();
  };

  const handleNextPuzzle = () => {
    loadNextPuzzle();
  };

  const handleGetHint = () => {
    getHint();
  };

  const handleResetPuzzle = () => {
    resetPuzzle();
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const getCurrentTime = () => {
    if (!startTime) return 0;
    const now = endTime || Date.now();
    return Math.floor((now - startTime) / 1000);
  };

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBackToDashboard}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Puzzle Training
          </Typography>
          <Button
            color="inherit"
            startIcon={<Refresh />}
            onClick={handleNextPuzzle}
            disabled={isLoading}
          >
            Next Puzzle
          </Button>
        </Toolbar>
      </AppBar>

      {isLoading && <LinearProgress />}

      <Container maxWidth="xl" sx={{ mt: 3, pb: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Puzzle Board */}
          <Grid item xs={12} md={8}>
            <PuzzleBoard width={500} />
            
            {/* Control Buttons */}
            <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<CheckCircle />}
                    onClick={handleSubmitSolution}
                    disabled={userMoves.length === 0 || isSolved || isLoading}
                  >
                    Submit
                  </Button>
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Lightbulb />}
                    onClick={handleGetHint}
                    disabled={isSolved || isLoading}
                  >
                    Hint
                  </Button>
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={handleResetPuzzle}
                    disabled={!currentPuzzle || isLoading}
                  >
                    Reset
                  </Button>
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PlayArrow />}
                    onClick={handleNextPuzzle}
                    disabled={isLoading}
                  >
                    Skip
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Timer and Progress */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Timer
                </Typography>
                <Typography variant="h3" color="primary" sx={{ mb: 1 }}>
                  {getCurrentTime()}s
                </Typography>
                
                {currentPuzzle && (
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Moves made: {userMoves.length}
                    </Typography>
                    {isSolved && (
                      <Typography variant="body2" color={isCorrect ? 'success.main' : 'error.main'}>
                        Result: {isCorrect ? 'Correct!' : 'Try again'}
                      </Typography>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Hint */}
            {hint && (
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Lightbulb color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Hint
                    </Typography>
                  </Box>
                  <Typography variant="body1">
                    {hint}
                  </Typography>
                </CardContent>
              </Card>
            )}

            {/* Statistics */}
            {stats && (
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <BarChart color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Your Statistics
                    </Typography>
                  </Box>
                  
                  <Box mb={2}>
                    <Typography variant="h4" color="primary" gutterBottom>
                      {stats.currentRating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Current Rating
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h6" color="success.main">
                        {Math.round(stats.accuracy)}%
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Accuracy
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="h6">
                        {stats.correctAttempts}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Solved
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="h6">
                        {stats.totalAttempts}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Attempted
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="h6">
                        {stats.avgTimeSeconds}s
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Avg Time
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PuzzlePage;