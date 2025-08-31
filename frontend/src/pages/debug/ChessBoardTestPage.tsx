import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { ChessBoard } from "../../components/chess/ChessBoard";
import { ChessBoardContainer } from "../../components/chess/ChessBoardContainer";
import { useChessGame } from "../../hooks/useChessGame";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import type { ChessMove, GameSetup } from "../../types/chess";

const ChessBoardTestPage: React.FC = () => {
  // Use actual chess game hook for backend integration
  const {
    gameState,
    isPlayerTurn,
    createGame,
    makeMove,
  } = useChessGame();

  // Auto-start game on page load
  useEffect(() => {
    const startGame = async () => {
      const gameSetup: GameSetup = {
        playerColor: 'white',
        difficulty: 2,
        timeControl: '10+0'
      };
      await createGame(gameSetup);
    };
    startGame();
  }, [createGame]);

  const handleMove = async (move: ChessMove) => {
    await makeMove(move);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Chess Board Drag & Drop Test</h1>
        <p className="text-gray-400">Drag pieces to play against AI</p>
      </div>

      {gameState.chess && (
        <div className="flex justify-center">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-lg">
            <CardContent className="p-4">
              <div className="w-full aspect-square">
                <ChessBoardContainer
                  chessInstance={gameState.chess}
                  onMove={handleMove}
                  playerColor={gameState.playerColor}
                  disabled={!isPlayerTurn || gameState.status !== 'active'}
                  arePiecesDraggable={true}
                  showCoordinates={true}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChessBoardTestPage;
