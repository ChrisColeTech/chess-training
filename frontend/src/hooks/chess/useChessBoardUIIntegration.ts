import { useCallback } from 'react'
import { gameApiClient, type MoveRequest } from '../../services/api/GameApiClient'
import type { ChessGameState } from '../../types/chess'

interface UseChessBoardUIIntegrationProps {
  gameState: ChessGameState
  setGameState: React.Dispatch<React.SetStateAction<ChessGameState>>
}

/**
 * useChessBoardUIIntegration - SRP Hook for react-chessboard-ui
 * Single Responsibility: Convert react-chessboard-ui events to game actions
 * Separates UI library specifics from core game logic
 */
export const useChessBoardUIIntegration = ({ 
  gameState, 
  setGameState 
}: UseChessBoardUIIntegrationProps) => {
  
  // Convert react-chessboard-ui move format to API call
  const handleChessboardUIMove = useCallback(async (moveData: any) => {
    if (gameState.status !== 'active' || !gameState.gameId) return

    try {
      setGameState(prev => ({ ...prev, isLoading: true }))
      
      // Convert react-chessboard-ui format to API format
      const moveRequest: MoveRequest = {
        move: {
          from: moveData.from,
          to: moveData.to,
          promotion: moveData.promotion as 'q' | 'r' | 'b' | 'n' | undefined
        },
        timeSpent: moveData.timeSpent || 0
      }
      
      // Use existing API client
      const response = await gameApiClient.makeMove(gameState.gameId, moveRequest)
      
      if (response.success && response.legal) {
        // Update game state with move
        const result = gameState.chess.move(moveData)
        if (result) {
          setGameState(prev => ({
            ...prev,
            moves: [...prev.moves, result],
            isLoading: false
          }))
          
          // Handle AI response
          if (response.aiMove) {
            setTimeout(() => {
              const aiResult = gameState.chess.move(response.aiMove)
              if (aiResult) {
                setGameState(prev => ({
                  ...prev,
                  moves: [...prev.moves, aiResult]
                }))
              }
            }, 500)
          }
          
          // Check for game end
          if (response.gameResult) {
            setGameState(prev => ({
              ...prev,
              status: 'completed',
              result: response.gameResult
            }))
          }
        }
      } else {
        setGameState(prev => ({ 
          ...prev, 
          isLoading: false,
          error: 'Invalid move'
        }))
      }
    } catch (error) {
      setGameState(prev => ({ 
        ...prev, 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Move failed'
      }))
    }
  }, [gameState, setGameState])

  // Handle react-chessboard-ui game end events
  const handleGameEnd = useCallback((result: any) => {
    console.log('Game ended via react-chessboard-ui:', result)
    setGameState(prev => ({
      ...prev,
      status: 'completed',
      result: {
        result: result.winner === 'white' ? 'white_wins' : 
               result.winner === 'black' ? 'black_wins' : 'draw',
        reason: result.reason || 'game_over',
        eloChange: 0 // Would be updated from server
      }
    }))
  }, [setGameState])

  return {
    handleChessboardUIMove,
    handleGameEnd
  }
}