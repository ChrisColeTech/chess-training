import React, { useState } from 'react'
import { Chess } from 'chess.js'
import { ChessBoardUIContainer } from '../../components/chess/ChessBoardUIContainer'
import { MoveHintsPanel } from '../../components/chess/MoveHintsPanel'
import { PlayerInfo } from '../../components/chess/PlayerInfo'
import { GameControls } from '../../components/chess/GameControls'
import { ResponsiveGameLayout } from '../../components/chess/ResponsiveGameLayout'
import { useGameHints } from '../../hooks/chess/useGameHints'
import type { ChessMove } from '../../types/chess'

/**
 * ChessGameLayoutTest - Test the actual Document 25 layout plan
 * Tests full-sized board + player cards + hints integration
 */
const ChessGameLayoutTest: React.FC = () => {
  const [chess] = useState(() => new Chess())
  const [gameId] = useState('test-layout-game')
  const [playerColor] = useState<'white' | 'black'>('white')
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)

  // Mock hints for testing layout without real game
  const mockHints = {
    bestMoves: [
      {
        move: { from: 'e2', to: 'e4' },
        san: 'e4',
        evaluation: 0.2,
        explanation: 'Opens up the center and develops pieces',
        rank: 1
      },
      {
        move: { from: 'g1', to: 'f3' },
        san: 'Nf3',
        evaluation: 0.1,
        explanation: 'Develops knight and controls center',
        rank: 2
      }
    ],
    currentEvaluation: 0.0,
    suggestion: 'Consider controlling the center with pawn moves',
    position: {
      phase: 'opening' as const,
      material: { white: 39, black: 39 }
    }
  }
  
  const hints = mockHints
  const isLoading = false
  const error = null
  const refresh = () => console.log('Refresh hints in test mode')

  const handleMove = (move: ChessMove) => {
    try {
      const result = chess.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion
      })
      if (result) {
        setIsPlayerTurn(!isPlayerTurn)
        refresh()
      }
    } catch (err) {
      console.error('Invalid move:', err)
    }
  }

  const mockGameState = {
    gameId,
    status: 'active' as const,
    chess,
    playerColor,
    aiLevel: 3 as const,
    isLoading: false,
    error: null,
    lastMove: undefined,
    timeControl: 'blitz' as const,
    moves: [],
    timeRemaining: {
      white: 512000,
      black: 585000
    }
  }

  return (
    <ResponsiveGameLayout
      chessBoard={
        <ChessBoardUIContainer
          chessInstance={chess}
          boardWidth={600}
          onMove={handleMove}
          playerColor={playerColor}
          disabled={false}
          showCoordinates={true}
          customConfig={{
            moveSpeed: 'fast',
            showHints: false,
            restrictMoves: true
          }}
        />
      }
      playerInfo={
        <div className="space-y-4">
          <PlayerInfo
            playerColor={playerColor === 'white' ? 'black' : 'white'}
            aiLevel={3}
            timeRemaining={{
              white: 512000,
              black: 585000
            }}
            timeControl="blitz"
            currentTurn={chess.turn()}
            gameState={mockGameState}
            isPlayerTurn={!isPlayerTurn}
            moveNumber={chess.moveNumber()}
            premiumEffects={true}
          />
          <PlayerInfo
            playerColor={playerColor}
            aiLevel={3}
            timeRemaining={{
              white: 512000,
              black: 585000
            }}
            timeControl="blitz"
            currentTurn={chess.turn()}
            gameState={mockGameState}
            isPlayerTurn={isPlayerTurn}
            moveNumber={chess.moveNumber()}
            premiumEffects={true}
          />
          <GameControls
            gameState={mockGameState}
            onResign={() => console.log('resign')}
            onOfferDraw={() => console.log('offer draw')}
            onPause={() => console.log('pause')}
            onNewGame={() => chess.reset()}
            disabled={false}
          />
        </div>
      }
      moveHints={
        <MoveHintsPanel
          hints={hints}
          isLoading={isLoading}
          error={error}
          onRefresh={refresh}
          disabled={!isPlayerTurn}
          difficulty="intermediate"
        />
      }
      sidePreference="right"
    />
  )
}

export default ChessGameLayoutTest