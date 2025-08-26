import React, { useState, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import type { Square } from 'react-chessboard/dist/chessboard/types';
import { Box, Paper, Typography, CircularProgress, Alert, Chip } from '@mui/material';
import { useGameStore } from '../stores/gameStore';

interface ChessBoardProps {
  width?: number;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ width = 400 }) => {
  const {
    chessInstance,
    userColor,
    isLoading,
    error,
    lastMove,
    makeMove,
    clearError
  } = useGameStore();

  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [rightClickedSquares, setRightClickedSquares] = useState<{ [key: string]: any }>({});
  const [optionSquares, setOptionSquares] = useState<{ [key: string]: any }>({});


  const getMoveOptions = useCallback((square: Square) => {
    if (!chessInstance) return {};
    
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
  }, [chessInstance]);

  const onSquareClick = useCallback((square: Square) => {
    if (!chessInstance || isLoading) return;

    // Clear any previous error
    if (error) clearError();

    setRightClickedSquares({});

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
    const moveData = {
      from: moveFrom,
      to: square,
      promotion: foundMove.promotion || undefined
    };

    makeMove(moveData);
    
    setMoveFrom(null);
    setOptionSquares({});
  }, [chessInstance, moveFrom, isLoading, error, clearError, getMoveOptions, makeMove]);

  const onSquareRightClick = useCallback((square: Square) => {
    const color = 'rgba(0, 0, 255, 0.4)';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]: rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === color
        ? undefined
        : { backgroundColor: color }
    });
  }, [rightClickedSquares]);

  if (!chessInstance) {
    return (
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No active game
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Create a new game to start playing
        </Typography>
      </Paper>
    );
  }

  const boardOrientation = userColor === 'black' ? 'black' : 'white';
  const currentPlayer = chessInstance.turn() === 'w' ? 'white' : 'black';
  const isUserTurn = currentPlayer === userColor;

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
            Chess Game
          </Typography>
          <Box display="flex" gap={1}>
            <Chip
              label={`AI Level ${useGameStore.getState().aiLevel}`}
              size="small"
              color="primary"
            />
            <Chip
              label={`You: ${userColor}`}
              size="small"
              color="secondary"
            />
          </Box>
        </Box>
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" color={isUserTurn ? 'primary' : 'text.secondary'}>
            {isUserTurn ? "Your turn" : "AI thinking..."}
          </Typography>
          
          {isLoading && (
            <Box display="flex" alignItems="center" gap={1}>
              <CircularProgress size={16} />
              <Typography variant="body2" color="text.secondary">
                Processing move...
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 1, display: 'inline-block' }}>
        <Chessboard
          position={chessInstance.fen()}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          boardOrientation={boardOrientation}
          boardWidth={width}
          customBoardStyle={{
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
          }}
          customSquareStyles={{
            ...optionSquares,
            ...rightClickedSquares,
            ...(lastMove && {
              [lastMove.from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
              [lastMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
            })
          }}
          areArrowsAllowed={true}
          arePiecesDraggable={false} // Disable drag for POC, use click-to-move
        />
      </Paper>

      {chessInstance.isGameOver() && (
        <Paper elevation={3} sx={{ p: 2, mt: 2, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Game Over
          </Typography>
          <Typography variant="body1">
            {chessInstance.isCheckmate()
              ? `${chessInstance.turn() === 'w' ? 'Black' : 'White'} wins by checkmate!`
              : chessInstance.isDraw()
              ? 'Game drawn'
              : 'Game ended'}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ChessBoard;