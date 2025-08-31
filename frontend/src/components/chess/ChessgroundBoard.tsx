import React, { useRef, useEffect } from 'react'
import Chessground from '@react-chess/chessground'
import { Chess } from 'chess.js'
import { ChessMove } from '../../types/chess'
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'

interface ChessgroundBoardProps {
  chessInstance: Chess
  onMove?: (move: ChessMove) => void
  playerColor?: 'white' | 'black'
  disabled?: boolean
  contained?: boolean
}

/**
 * ChessgroundBoard - Test implementation using Chessground
 * Evaluating responsive sizing with the 'contained' prop
 */
export const ChessgroundBoard: React.FC<ChessgroundBoardProps> = ({
  chessInstance,
  onMove,
  playerColor = 'white',
  disabled = false,
  contained = true
}) => {
  const boardRef = useRef<any>(null)

  useEffect(() => {
    if (!chessInstance) return

    // Get valid moves for current position
    const moves = chessInstance.moves({ verbose: true })
    const dests = new Map()
    
    moves.forEach((move: any) => {
      if (!dests.has(move.from)) {
        dests.set(move.from, [])
      }
      dests.get(move.from).push(move.to)
    })

    // Update board configuration
    if (boardRef.current) {
      boardRef.current.setConfig({
        fen: chessInstance.fen(),
        orientation: playerColor,
        turnColor: chessInstance.turn() === 'w' ? 'white' : 'black',
        movable: {
          free: false,
          dests: dests,
          showDests: true
        },
        events: {
          move: (orig: string, dest: string) => {
            if (!onMove || disabled) return
            
            try {
              const move = chessInstance.move({ from: orig, to: dest })
              if (move) {
                // Convert chess.js Move to our ChessMove format
                const chessMove: ChessMove = {
                  from: move.from,
                  to: move.to,
                  promotion: move.promotion as 'r' | 'b' | 'q' | 'n' | undefined
                }
                onMove(chessMove)
              }
            } catch (error) {
              console.warn('Invalid move attempted:', { from: orig, to: dest })
            }
          }
        }
      })
    }
  }, [chessInstance, onMove, playerColor, disabled])

  const config = {
    fen: chessInstance?.fen() || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    orientation: playerColor,
    turnColor: (chessInstance?.turn() === 'w' ? 'white' : 'black') as 'white' | 'black',
    movable: {
      free: false,
      showDests: true
    },
    events: {
      move: (orig: string, dest: string) => {
        if (!onMove || disabled || !chessInstance) return
        
        try {
          const move = chessInstance.move({ from: orig, to: dest })
          if (move) {
            // Convert chess.js Move to our ChessMove format
            const chessMove: ChessMove = {
              from: move.from,
              to: move.to,
              promotion: move.promotion as 'r' | 'b' | 'q' | 'n' | undefined
            }
            onMove(chessMove)
          }
        } catch (error) {
          console.warn('Invalid move attempted:', { from: orig, to: dest })
        }
      }
    }
  }

  return (
    <div className="w-full h-full" style={{ aspectRatio: '1 / 1', maxWidth: '100%', maxHeight: '100%' }}>
      <Chessground
        config={config}
        contained={true}
        width={800}
        height={800}
      />
    </div>
  )
}

export default ChessgroundBoard