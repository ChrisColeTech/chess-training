import { useState, useCallback, useEffect } from 'react'
import { Chess } from 'chess.js'
import { gameApiClient, type CreateGameRequest, type GameState, type MoveRequest, type MoveResponse } from '../services/api/GameApiClient'
import type { ChessMove, ChessGameState, GameSetup } from '../types/chess'

/**
 * useChessGame - Following Document 2 architecture patterns
 * Single Responsibility: Chess game state management and API integration
 * DRY: Centralized game logic for all chess components
 * Separates business logic from UI components
 */
export const useChessGame = () => {
  // Chess game state following SRP
  const [gameState, setGameState] = useState<ChessGameState>({
    status: 'setup',
    gameId: null,
    chess: new Chess(),
    playerColor: 'white',
    aiLevel: 3,
    timeControl: '10+0',
    moves: [],
    timeRemaining: { white: 600000, black: 600000 },
    isLoading: false,
    error: null
  })

  // SRP: Game creation with API integration
  const createGame = useCallback(async (setup: GameSetup) => {
    try {
      setGameState(prev => ({ 
        ...prev, 
        status: 'creating', 
        isLoading: true, 
        error: null 
      }))
      
      // Map setup to API request format
      const gameRequest: CreateGameRequest = {
        aiLevel: setup.difficulty,
        color: setup.playerColor,
        timeControl: setup.timeControl
      }
      
      // API Call following Document 20 pattern
      const response = await gameApiClient.createGame(gameRequest)
      
      // Handle actual backend response format  
      const gameId = (response as any).gameId || response.id
      const currentFen = (response as any).initialFen || response.currentFen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
      
      // Initialize chess instance with server response
      const chessInstance = new Chess(currentFen)
      
      setGameState(prev => ({
        ...prev,
        status: 'active',
        gameId: gameId,
        playerColor: setup.playerColor === 'random' 
          ? (Math.random() > 0.5 ? 'white' : 'black')
          : setup.playerColor,
        chess: chessInstance,
        timeControl: setup.timeControl,
        aiLevel: setup.difficulty,
        moves: [], // Start with empty moves array
        isLoading: false
      }))
      
    } catch (error) {
      setGameState(prev => ({ 
        ...prev, 
        status: 'setup', 
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create game'
      }))
      throw error
    }
  }, [])

  // SRP: Move processing with optimistic updates and API integration
  const makeMove = useCallback(async (move: ChessMove) => {
    if (gameState.status !== 'active' || !gameState.gameId) return

    const startTime = Date.now()

    try {
      // Optimistic UI update for responsive feel
      const newChess = new Chess(gameState.chess.fen())
      const moveResult = newChess.move(move)
      
      if (!moveResult) {
        throw new Error('Invalid move')
      }

      // Update UI immediately
      setGameState(prev => ({
        ...prev,
        chess: newChess,
        moves: [...prev.moves, {
          ...move,
          san: moveResult.san,
          piece: moveResult.piece,
          color: moveResult.color,
          captured: moveResult.captured
        }],
        lastMove: { from: move.from, to: move.to },
        inCheck: newChess.inCheck(),
        isCheckmate: newChess.isCheckmate(),
        isStalemate: newChess.isStalemate(),
        isDraw: newChess.isDraw()
      }))

      // API call for server validation and AI response
      const moveRequest: MoveRequest = {
        move: {
          from: move.from,
          to: move.to,
          promotion: move.promotion
        },
        timeSpent: Date.now() - startTime
      }

      const response = await gameApiClient.makeMove(gameState.gameId, moveRequest)

      // Handle AI response if game is still active
      if (response.success && response.aiMove) {
        setTimeout(() => {
          const aiChess = new Chess(response.gameState.fen)
          
          setGameState(prev => ({
            ...prev,
            chess: aiChess,
            moves: [...prev.moves, {
              from: response.aiMove!.from,
              to: response.aiMove!.to,
              san: response.aiMove!.san,
              piece: '',
              color: aiChess.turn() === 'w' ? 'b' : 'w'
            }],
            lastMove: { 
              from: response.aiMove!.from, 
              to: response.aiMove!.to 
            },
            inCheck: aiChess.inCheck(),
            isCheckmate: aiChess.isCheckmate(),
            isStalemate: aiChess.isStalemate(),
            isDraw: aiChess.isDraw(),
            lastMoveTime: Date.now()
          }))
        }, 500) // Realistic AI thinking delay
      }

      // Handle game completion  
      if (response.gameState?.gameOver) {
        setGameState(prev => ({
          ...prev,
          status: 'completed',
          result: response.gameResult ? {
            result: response.gameResult.result === 'win' ? 'white_wins' : 
                   response.gameResult.result === 'loss' ? 'black_wins' : 'draw',
            reason: response.gameResult.reason || 'game_over',
            eloChange: response.gameResult.ratingChange || 0
          } : undefined
        }))
      }

    } catch (error) {
      // Revert optimistic update on error
      setGameState(prev => ({
        ...prev,
        chess: new Chess(gameState.chess.fen()),
        error: error instanceof Error ? error.message : 'Move failed'
      }))
      throw error
    }
  }, [gameState])


  // SRP: Game resignation
  const resignGame = useCallback(async () => {
    if (!gameState.gameId || gameState.status !== 'active') return

    try {
      await gameApiClient.resignGame(gameState.gameId)
      setGameState(prev => ({
        ...prev,
        status: 'completed',
        result: { 
          result: gameState.playerColor === 'white' ? 'black_wins' : 'white_wins',
          reason: 'resignation',
          eloChange: -20 // Estimated rating loss
        }
      }))
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to resign'
      }))
      throw error
    }
  }, [gameState.gameId, gameState.playerColor, gameState.status])

  // SRP: Offer draw
  const offerDraw = useCallback(async () => {
    if (!gameState.gameId || gameState.status !== 'active') return

    try {
      await gameApiClient.offerDraw(gameState.gameId)
      // Note: In vs AI, draw offers might be automatically accepted/rejected
      setGameState(prev => ({
        ...prev,
        status: 'completed',
        result: { 
          result: 'draw',
          reason: 'agreement',
          eloChange: 0
        }
      }))
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to offer draw'
      }))
      throw error
    }
  }, [gameState.gameId, gameState.status])

  // SRP: Pause game
  const pauseGame = useCallback(async () => {
    if (!gameState.gameId || gameState.status !== 'active') return

    try {
      await gameApiClient.pauseGame(gameState.gameId)
      setGameState(prev => ({
        ...prev,
        status: 'paused'
      }))
    } catch (error) {
      setGameState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to pause game'
      }))
      throw error
    }
  }, [gameState.gameId, gameState.status])

  // SRP: Reset game state (for new game)
  const resetGame = useCallback(() => {
    setGameState({
      status: 'setup',
      gameId: null,
      chess: new Chess(),
      playerColor: 'white',
      aiLevel: 3,
      timeControl: '10+0',
      moves: [],
      timeRemaining: { white: 600000, black: 600000 },
      isLoading: false,
      error: null
    })
  }, [])

  // Clear error state
  const clearError = useCallback(() => {
    setGameState(prev => ({ ...prev, error: null }))
  }, [])

  // Game state derived values
  const isPlayerTurn = gameState.chess.turn() === gameState.playerColor.charAt(0)
  const moveNumber = Math.ceil(gameState.moves.length / 2)
  const currentPlayer = gameState.chess.turn() === 'w' ? 'white' : 'black'

  return {
    // Game state
    gameState,
    
    // Derived values
    isPlayerTurn,
    moveNumber,
    currentPlayer,
    
    // Actions
    createGame,
    makeMove,
    resignGame,
    offerDraw,
    pauseGame,
    resetGame,
    clearError
  }
}