import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  AppBar,
  Toolbar,
  IconButton,
  Chip
} from '@mui/material';
import {
  ArrowBack,
  History,
  Refresh
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../stores/gameStore';
import { useAuthStore } from '../stores/authStore';
import ChessBoard from '../components/ChessBoard';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const {
    chessInstance,
    gameId,
    aiLevel,
    userColor,
    moveHistory,
    createGame,
    resetGame,
    isLoading
  } = useGameStore();

  const [showNewGameDialog, setShowNewGameDialog] = useState(false);
  const [newGameSettings, setNewGameSettings] = useState({
    aiLevel: 2,
    color: 'white' as 'white' | 'black' | 'random',
    timeControl: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    // Show new game dialog if no active game
    if (!gameId) {
      setShowNewGameDialog(true);
    }
  }, [isAuthenticated, gameId, navigate]);

  const handleCreateGame = async () => {
    await createGame(newGameSettings);
    setShowNewGameDialog(false);
  };

  const handleNewGame = () => {
    resetGame();
    setShowNewGameDialog(true);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
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
            Chess Game
          </Typography>
          <Button
            color="inherit"
            startIcon={<Refresh />}
            onClick={handleNewGame}
            disabled={isLoading}
          >
            New Game
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 3, pb: 4 }}>
        <Grid container spacing={3}>
          {/* Chess Board */}
          <Grid item xs={12} md={8}>
            <ChessBoard width={500} />
          </Grid>

          {/* Game Info */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Game Information
              </Typography>
              
              {gameId && (
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Game ID
                  </Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {gameId.substring(0, 8)}...
                  </Typography>
                </Box>
              )}

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Difficulty
                </Typography>
                <Chip label={`AI Level ${aiLevel}`} color="primary" size="small" />
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Your Color
                </Typography>
                <Chip 
                  label={userColor === 'white' ? '♔ White' : '♚ Black'} 
                  color="secondary" 
                  size="small" 
                />
              </Box>

              {chessInstance && (
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Game Status
                  </Typography>
                  <Typography variant="body1">
                    {chessInstance.isGameOver() 
                      ? chessInstance.isCheckmate()
                        ? `Checkmate - ${chessInstance.turn() === 'w' ? 'Black' : 'White'} wins`
                        : 'Draw'
                      : chessInstance.inCheck()
                        ? `${chessInstance.turn() === 'w' ? 'White' : 'Black'} in check`
                        : `${chessInstance.turn() === 'w' ? 'White' : 'Black'} to move`
                    }
                  </Typography>
                </Box>
              )}
            </Paper>

            {/* Move History */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <History sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Move History
                </Typography>
              </Box>
              
              <Box
                sx={{
                  maxHeight: 200,
                  overflowY: 'auto',
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  p: 1
                }}
              >
                {moveHistory.length > 0 ? (
                  <Box sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    {moveHistory.map((move, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'inline-block',
                          mr: 2,
                          mb: 0.5,
                          color: index === moveHistory.length - 1 ? 'primary.main' : 'inherit',
                          fontWeight: index === moveHistory.length - 1 ? 'bold' : 'normal'
                        }}
                      >
                        {Math.floor(index / 2) + 1}
                        {index % 2 === 0 ? '. ' : '... '}
                        {move}
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    No moves yet
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* New Game Dialog */}
      <Dialog open={showNewGameDialog} onClose={() => {}}>
        <DialogTitle>Create New Game</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <Box sx={{ pt: 1 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>AI Difficulty</InputLabel>
              <Select
                value={newGameSettings.aiLevel}
                label="AI Difficulty"
                onChange={(e) => setNewGameSettings({
                  ...newGameSettings,
                  aiLevel: Number(e.target.value)
                })}
              >
                <MenuItem value={1}>Level 1 - Beginner</MenuItem>
                <MenuItem value={2}>Level 2 - Easy</MenuItem>
                <MenuItem value={3}>Level 3 - Intermediate</MenuItem>
                <MenuItem value={4}>Level 4 - Advanced</MenuItem>
                <MenuItem value={5}>Level 5 - Expert</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
              Choose Your Color
            </Typography>
            <RadioGroup
              value={newGameSettings.color}
              onChange={(e) => setNewGameSettings({
                ...newGameSettings,
                color: e.target.value as 'white' | 'black' | 'random'
              })}
            >
              <FormControlLabel value="white" control={<Radio />} label="White (I play first)" />
              <FormControlLabel value="black" control={<Radio />} label="Black (AI plays first)" />
              <FormControlLabel value="random" control={<Radio />} label="Random" />
            </RadioGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCreateGame}
            variant="contained"
            disabled={isLoading}
            fullWidth
            sx={{ m: 2 }}
          >
            {isLoading ? 'Creating Game...' : 'Start Game'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GamePage;