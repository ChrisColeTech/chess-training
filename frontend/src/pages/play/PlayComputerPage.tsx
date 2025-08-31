import React from 'react'
import { ChessBoardContainer } from '../../components/chess/ChessBoardContainer'
import { GameSetupForm } from '../../components/chess/GameSetupForm'
import { GameControls } from '../../components/chess/GameControls'
import { PlayerInfo } from '../../components/chess/PlayerInfo'
import { GameLayout } from '../../components/chess/GameLayout'
import { MoveHintsPanel } from '../../components/chess/MoveHintsPanel'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { useChessGame } from '../../hooks/useChessGame'
import { useGameHints } from '../../hooks/chess/useGameHints'

/**
 * PlayComputerPage - Following Document 12 page structure and Document 2 SRP
 * Single Responsibility: Coordinate chess vs AI game interface
 * Uses proper architecture with hooks and separated components
 */
const PlayComputerPage: React.FC = () => {
  // Use proper architecture hook for game logic (SRP)
  const {
    gameState,
    isPlayerTurn,
    moveNumber,
    createGame,
    makeMove,
    resignGame,
    offerDraw,
    pauseGame,
    resetGame,
    clearError
  } = useChessGame()

  // Game hints hook - disabled during opponent's turn
  const {
    hints,
    isLoading: hintsLoading,
    error: hintsError,
    refresh: refreshHints,
    clearError: clearHintsError
  } = useGameHints({
    gameId: gameState.gameId,
    position: gameState.chess?.fen() || '',
    difficulty: 'intermediate',
    disabled: !isPlayerTurn || gameState.status !== 'active'
  })

  // Game setup phase - Using separated component (SRP)
  if (gameState.status === 'setup') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Chess vs Computer
            </h1>
            <p className="text-gray-400 text-lg">
              Test your skills against our AI opponents
            </p>
          </div>

          {/* Game Setup Form - Separated component following SRP */}
          <GameSetupForm 
            onStartGame={createGame}
            isLoading={gameState.isLoading}
            error={gameState.error}
            onClearError={clearError}
          />

        </div>
      </div>
    )
  }

  // Loading phase
  if (gameState.status === 'creating') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4 mx-auto"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Starting Your Game</h2>
            <p className="text-gray-400">Connecting to AI opponent...</p>
          </div>
        </div>
      </div>
    )
  }

  // Active game phase - Using GameLayout component (SRP compliance)
  return (
    <GameLayout
      chessBoard={
        <ChessBoardContainer
          chessInstance={gameState.chess}
          boardWidth={600}
          onMove={makeMove}
          playerColor={gameState.playerColor}
          disabled={gameState.status !== 'active' || gameState.chess.isGameOver()}
          showCoordinates={true}
          premiumEffects={true}
          showMoveHints={true}
          enableSounds={true}
          highlightLastMove={true}
          highlightCheck={true}
          lastMove={gameState.lastMove}
        />
      }
      playerInfo={
        <PlayerInfo
          playerColor={gameState.playerColor}
          aiLevel={gameState.aiLevel || 1}
          timeRemaining={{
            white: 900000,
            black: 900000
          }}
          timeControl="blitz"
          currentTurn={gameState.chess.turn()}
          gameState={gameState}
          isPlayerTurn={isPlayerTurn}
          moveNumber={moveNumber}
          premiumEffects={true}
        />
      }
      gameControls={
        <GameControls
          gameState={gameState}
          onResign={resignGame}
          onOfferDraw={offerDraw}
          onPause={pauseGame}
          onNewGame={resetGame}
          disabled={gameState.status !== 'active'}
        />
      }
      moveHints={
        <MoveHintsPanel
          hints={hints}
          isLoading={hintsLoading}
          error={hintsError}
          onRefresh={refreshHints}
          disabled={!isPlayerTurn || gameState.status !== 'active'}
          difficulty="intermediate"
        />
      }
    />
  )
}

export default PlayComputerPage