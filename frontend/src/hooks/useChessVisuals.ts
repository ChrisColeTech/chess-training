import { useState, useCallback, useEffect, useRef } from 'react'
import { Chess } from 'chess.js'
import type { ChessMove, ChessSoundEvent } from '../types/chess'

interface UseChessVisualsProps {
  chessInstance: Chess | null
  premiumEffects?: boolean
  enableSounds?: boolean
  animationSpeed?: 'slow' | 'normal' | 'fast'
  highlightLastMove?: boolean
  highlightCheck?: boolean
  lastMove?: ChessMove | null
}

interface UseChessVisualsReturn {
  // Visual state
  isAnimating: boolean
  customSquareStyles: { [key: string]: React.CSSProperties }
  
  // Visual effects
  startAnimation: () => void
  playSound: (sound: ChessSoundEvent) => void
  
  // GPU optimization
  boardRef: React.RefObject<HTMLDivElement | null>
}

/**
 * useChessVisuals - SRP Hook for Visual Effects Only
 * Single Responsibility: Handle animations, sounds, and visual styling
 * No move logic, no UI structure, no API calls
 * Pure visual enhancement logic
 */
export const useChessVisuals = ({
  chessInstance,
  premiumEffects = true,
  enableSounds = true,
  animationSpeed = 'normal',
  highlightLastMove = true,
  highlightCheck = true,
  lastMove = null
}: UseChessVisualsProps): UseChessVisualsReturn => {
  
  // Visual state
  const [isAnimating, setIsAnimating] = useState(false)
  const boardRef = useRef<HTMLDivElement>(null)

  // Performance: GPU acceleration setup - stable positioning
  useEffect(() => {
    if (boardRef.current && premiumEffects) {
      const boardElement = boardRef.current
      // Stable GPU acceleration without layout shifts
      boardElement.style.willChange = 'auto'
      boardElement.style.backfaceVisibility = 'hidden'
      boardElement.style.transform = 'translate3d(0, 0, 0)' // Stable GPU layer
    }
  }, [premiumEffects])

  // Animation speed mapping
  const animationDuration = {
    slow: 500,
    normal: 300,
    fast: 150
  }[animationSpeed]

  // Sound effect helper
  const playSound = useCallback((sound: ChessSoundEvent) => {
    if (!enableSounds) return
    // TODO: Integrate with AudioService in Phase 3
    console.log(`Playing sound: ${sound}`)
  }, [enableSounds])

  // Animation control
  const startAnimation = useCallback(() => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), animationDuration)
  }, [animationDuration])

  // Generate enhanced square styles with premium effects
  const customSquareStyles = useCallback(() => {
    if (!chessInstance) return {}

    const styles: { [key: string]: React.CSSProperties } = {}

    // Last move highlighting
    if (lastMove && highlightLastMove) {
      styles[lastMove.from] = { 
        backgroundColor: 'rgba(255, 206, 84, 0.4)',
        boxShadow: premiumEffects ? '0 0 12px rgba(255, 206, 84, 0.6)' : undefined,
        border: '2px solid rgba(255, 206, 84, 0.8)'
      }
      styles[lastMove.to] = { 
        backgroundColor: 'rgba(255, 206, 84, 0.4)',
        boxShadow: premiumEffects ? '0 0 12px rgba(255, 206, 84, 0.6)' : undefined,
        border: '2px solid rgba(255, 206, 84, 0.8)'
      }
    }

    // Check highlighting with animation
    if (chessInstance.inCheck() && highlightCheck) {
      const kingSquare = (() => {
        const board = chessInstance.board()
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            const piece = board[i][j]
            if (piece && piece.type === 'k' && piece.color === chessInstance.turn()) {
              return String.fromCharCode(97 + j) + (8 - i)
            }
          }
        }
        return null
      })()
      
      if (kingSquare) {
        styles[kingSquare] = {
          backgroundColor: 'rgba(239, 68, 68, 0.6)',
          boxShadow: premiumEffects ? '0 0 20px rgba(239, 68, 68, 0.8)' : undefined,
          border: '3px solid rgba(239, 68, 68, 0.9)',
          animation: premiumEffects ? 'pulse 1s infinite' : undefined
        }
      }
    }

    return styles
  }, [chessInstance, lastMove, highlightLastMove, highlightCheck, premiumEffects])()

  return {
    // Visual state
    isAnimating,
    customSquareStyles,
    
    // Visual effects
    startAnimation,
    playSound,
    
    // GPU optimization
    boardRef
  }
}