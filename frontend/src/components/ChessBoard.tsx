import React, { useState, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import type { Square } from 'react-chessboard/dist/chessboard/types';
import { Chess } from 'chess.js';

interface ChessBoardProps {
  chessInstance: Chess | null;
  boardWidth?: number;
  onMove?: (move: { from: string, to: string, promotion?: string }) => void;
  playerColor?: 'white' | 'black';
  disabled?: boolean;
  showCoordinates?: boolean;
  customSquareStyles?: { [square: string]: React.CSSProperties };
  lastMove?: { from: string, to: string } | null;
  arePiecesDraggable?: boolean;
}

/**
 * Standardized chess board component based on working POC
 * Features proper move validation, visual indicators, and click-to-move
 */
const ChessBoard: React.FC<ChessBoardProps> = ({ 
  chessInstance,
  boardWidth = 400,
  onMove,
  playerColor = 'white',
  disabled = false,
  showCoordinates = true,
  customSquareStyles = {},
  lastMove = null,
  arePiecesDraggable = true
}) => {
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
    if (!chessInstance || disabled) return;

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

    if (onMove) {
      onMove(moveData);
    }
    
    setMoveFrom(null);
    setOptionSquares({});
  }, [chessInstance, moveFrom, disabled, getMoveOptions, onMove]);

  const onSquareRightClick = useCallback((square: Square) => {
    const color = 'rgba(0, 0, 255, 0.4)';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]: rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === color
        ? undefined
        : { backgroundColor: color }
    });
  }, [rightClickedSquares]);

  const onPieceDrop = useCallback((sourceSquare: Square, targetSquare: Square): boolean => {
    if (!chessInstance || disabled) return false;

    // Check if it's a valid move
    const moves = chessInstance.moves({
      square: sourceSquare,
      verbose: true,
    });
    
    const foundMove = moves.find((m: any) => m.from === sourceSquare && m.to === targetSquare);
    
    if (!foundMove) {
      return false; // Invalid move
    }

    // Make the move
    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      promotion: foundMove.promotion || undefined
    };

    if (onMove) {
      onMove(moveData);
    }
    
    return true;
  }, [chessInstance, disabled, onMove]);

  if (!chessInstance) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-700">
        <div className="text-center">
          <div className="text-gray-400 text-lg font-medium mb-2">No Chess Game</div>
          <div className="text-gray-500 text-sm">Initialize a game to start playing</div>
        </div>
      </div>
    );
  }

  const boardOrientation = playerColor === 'black' ? 'black' : 'white';

  // Combine all square styles
  const allSquareStyles = {
    ...optionSquares,
    ...rightClickedSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      [lastMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
    }),
    ...customSquareStyles
  };

  return (
    <div className="inline-block">
      <Chessboard
        position={chessInstance.fen()}
        onSquareClick={onSquareClick}
        onSquareRightClick={onSquareRightClick}
        boardOrientation={boardOrientation}
        boardWidth={boardWidth}
        customBoardStyle={{
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}
        customSquareStyles={allSquareStyles}
        areArrowsAllowed={true}
        arePiecesDraggable={!disabled && arePiecesDraggable}
        onPieceDrop={onPieceDrop}
        showBoardNotation={showCoordinates}
        customDarkSquareStyle={{
          backgroundColor: '#b58863'
        }}
        customLightSquareStyle={{
          backgroundColor: '#f0d9b5'
        }}
      />
    </div>
  );
};

export default ChessBoard;