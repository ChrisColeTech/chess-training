import React, { useState, useCallback, useEffect } from 'react'
import { Chess } from 'chess.js'
import { ChessBoardResponsiveContainer } from '../../components/chess/ChessBoardResponsiveContainer'
import { PlayerCard } from '../../components/chess/PlayerCard'
import { MoveHintsPanel } from '../../components/chess/MoveHintsPanel'
import { gameApiClient } from '../../services/api/GameApiClient'
import { useToast } from '../../hooks/use-toast'
import type { GameHints, GameState } from '../../services/api/GameApiClient'

export const ResponsiveChessGamePage: React.FC = () => {
  const [chess] = useState(() => new Chess())
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [gameHints, setGameHints] = useState<GameHints | null>(null)
  const [hintsLoading, setHintsLoading] = useState(false)
  const [hintsError, setHintsError] = useState<string | null>(null)
  const { toast } = useToast()

  // Create new game
  const createNewGame = useCallback(async () => {
    setIsLoading(true)
    try {
      const newGame = await gameApiClient.createGame({
        aiLevel: 3,
        color: 'white',
        timeControl: '10+0'
      })
      setGameState(newGame)
      chess.load(newGame.currentFen)
      toast({
        title: "Game Created",
        description: "New game vs AI started!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create game. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [chess, toast])

  // Make move and get AI response
  const handleMove = useCallback(async (move: any) => {
    if (!gameState) return

    try {
      const response = await gameApiClient.makeMove(gameState.id, {
        move: {
          from: move.from,
          to: move.to,
          promotion: move.promotion
        }
      })

      if (response.success) {
        chess.load(response.gameState.fen)
        setGameState(prev => prev ? {
          ...prev,
          currentFen: response.gameState.fen,
          moves: [...prev.moves, `${move.from}${move.to}`]
        } : null)
      }
    } catch (error) {
      toast({
        title: "Move Failed",
        description: "Invalid move or network error",
        variant: "destructive",
      })
    }
  }, [gameState, chess, toast])

  // Get AI hints from backend
  const refreshHints = useCallback(async () => {
    if (!gameState) return
    
    setHintsLoading(true)
    setHintsError(null)
    
    try {
      const hints = await gameApiClient.getGameHints(gameState.id, 'intermediate')
      setGameHints(hints)
    } catch (error) {
      setHintsError('Failed to load hints')
    } finally {
      setHintsLoading(false)
    }
  }, [gameState])

  // Auto-refresh hints when game state changes
  useEffect(() => {
    if (gameState) {
      refreshHints()
    }
  }, [gameState?.currentFen, refreshHints])

  return (
    <div className="flex h-full">
      {/* Main Game Area - 75% */}
      <div className="w-3/4 h-full">
        <ChessBoardResponsiveContainer
          chessInstance={chess}
          boardSize={600}
          onMove={handleMove}
          playerColor="white"
          disabled={false}
          className="w-full h-full"
        />
      </div>

      {/* Player Info Sidebar - 25% */}
      <div className="w-1/4 flex flex-col gap-4 p-4">
          
          {/* Opponent Card - Top */}
          <div className="flex-none">
            <PlayerCard
              player={{
                name: 'Stockfish AI',
                color: 'black',
                rating: 1700,
                isAI: true,
                aiLevel: 3
              }}
              timer={{
                remaining: 600,
                format: '10:00',
                isActive: chess.turn() === 'b'
              }}
              gameStatus={{
                isPlayerTurn: chess.turn() === 'b',
                gameState: 'active',
                lastMove: chess.history().slice(-1)[0]
              }}
              position="top"
              compact={true}
            />
          </div>

          {/* Player Card - Bottom */}
          <div className="flex-none">
            <PlayerCard
              player={{
                name: 'You',
                color: 'white',
                rating: 1200,
                isAI: false
              }}
              timer={{
                remaining: 580,
                format: '09:40',
                isActive: chess.turn() === 'w'
              }}
              gameStatus={{
                isPlayerTurn: chess.turn() === 'w',
                gameState: 'active',
                lastMove: chess.history().slice(-2)[0]
              }}
              position="bottom"
              compact={true}
            />
          </div>

          {/* Move Hints - Expandable */}
          <div className="flex-1 min-h-0">
            <MoveHintsPanel
              hints={gameHints}
              isLoading={hintsLoading}
              error={hintsError}
              onRefresh={refreshHints}
              onToggleVisibility={(visible) => console.log('Hints visibility:', visible)}
              difficulty="intermediate"
              disabled={false}
              className="h-full"
            />
          </div>
        </div>
    </div>
  )
}