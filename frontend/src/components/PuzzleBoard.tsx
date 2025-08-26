import React, { useState, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import type { Square } from 'react-chessboard/dist/chessboard/types';
import { Chess } from 'chess.js';
import { Box, Paper, Typography, Alert, Chip } from '@mui/material';
import { usePuzzleStore } from '../stores/puzzleStore';

interface PuzzleBoardProps {
  width?: number;
}

const PuzzleBoard: React.FC<PuzzleBoardProps> = ({ width = 400 }) => {
  const {
    chessInstance,
    currentPuzzle,
    userMoves,
    isSolved,
    isCorrect,
    error,
    makeMove,
    clearError
  } = usePuzzleStore();

  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<{ [key: string]: any }>({});

  const getMoveOptions = useCallback((square: Square) => {
    if (!chessInstance || isSolved) return {};
    
    const moves = chessInstance.moves({
      square,
      verbose: true,
    });
    
    if (moves.length === 0) {
      setOptionSquares({});
      return {};
    }

    const newSquares: { [key: string]: any } = {};
    moves.map((move: any) => {
      newSquares[move.to] = {
        background:
          chessInstance.get(move.to) && chessInstance.get(move.to)?.color !== chessInstance.get(square)?.color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%'
      };
      return move;
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)'
    };
    setOptionSquares(newSquares);
    return newSquares;
  }, [chessInstance, isSolved]);

  const onSquareClick = useCallback((square: Square) => {
    if (!chessInstance || isSolved) return;

    // Clear any previous error
    if (error) clearError();

    function resetFirstMove(square: Square) {
      const hasOptions = getMoveOptions(square);
      setMoveFrom(square);
      return Object.keys(hasOptions).length > 0;
    }

    if (!moveFrom) {
      resetFirstMove(square);
      return;
    }

    // Check if clicking the same square
    if (moveFrom === square) {
      setMoveFrom(null);
      setOptionSquares({});
      return;
    }

    // Check if it's a valid move
    const moves = chessInstance.moves({
      square: moveFrom,
      verbose: true,
    });
    
    const foundMove = moves.find((m: any) => m.from === moveFrom && m.to === square);
    
    if (!foundMove) {
      // Invalid move, try to select new piece
      resetFirstMove(square);
      return;
    }

    // Make the move
    makeMove(foundMove.san);
    
    setMoveFrom(null);
    setOptionSquares({});
  }, [chessInstance, moveFrom, isSolved, error, clearError, getMoveOptions, makeMove]);

  if (!chessInstance || !currentPuzzle) {
    return (
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No puzzle loaded
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Load a puzzle to start solving
        </Typography>
      </Paper>
    );
  }

  // Keep consistent board orientation - show from the perspective of the player to move in the starting position
  const boardOrientation = currentPuzzle && currentPuzzle.fen ? 
    (new Chess(currentPuzzle.fen).turn() === 'w' ? 'white' : 'black') : 'white';

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">
            Tactical Puzzle
          </Typography>
          <Box display="flex" gap={1}>
            <Chip
              label={`Rating: ${currentPuzzle.rating}`}
              size="small"
              color="primary"
            />
            <Chip
              label={`${chessInstance.turn() === 'w' ? 'White' : 'Black'} to move`}
              size="small"
              color="secondary"
            />
          </Box>
        </Box>
        
        {currentPuzzle.description && (
          <Typography variant="body1" sx={{ mb: 1 }}>
            {currentPuzzle.description}
          </Typography>
        )}

        <Box display="flex" gap={1} flexWrap="wrap">
          {currentPuzzle.themes.map((theme, index) => (
            <Chip
              key={index}
              label={theme}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 1, display: 'inline-block' }}>
        <Chessboard
          position={chessInstance.fen()}
          onSquareClick={onSquareClick}
          boardOrientation={boardOrientation}
          boardWidth={width}
          customBoardStyle={{
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
          }}
          customSquareStyles={{
            ...optionSquares
          }}
          areArrowsAllowed={true}
          arePiecesDraggable={false}
        />
      </Paper>

      {/* Show user moves */}
      {userMoves.length > 0 && (
        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Your moves:
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
            {userMoves.join(' ')}
          </Typography>
        </Paper>
      )}

      {/* Show result if puzzle is solved */}
      {isSolved && (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 2, 
            mt: 2, 
            textAlign: 'center',
            backgroundColor: isCorrect ? 'success.light' : 'error.light',
            color: isCorrect ? 'success.contrastText' : 'error.contrastText'
          }}
        >
          <Typography variant="h6" gutterBottom>
            {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
          </Typography>
          {usePuzzleStore.getState().feedback && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              {usePuzzleStore.getState().feedback}
            </Typography>
          )}
          {usePuzzleStore.getState().ratingChange !== null && (
            <Typography variant="body2">
              Rating change: {usePuzzleStore.getState().ratingChange! >= 0 ? '+' : ''}
              {usePuzzleStore.getState().ratingChange}
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default PuzzleBoard;