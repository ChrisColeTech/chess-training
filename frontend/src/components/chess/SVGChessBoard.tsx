import React, { useState, useCallback } from 'react'
import { Chess } from 'chess.js'
import { ChessMove } from '../../types/chess'

interface SVGChessBoardProps {
  chessInstance: Chess
  onMove?: (move: ChessMove) => void
  playerColor?: 'white' | 'black'
  disabled?: boolean
}

// Chess piece Unicode symbols
const PIECES = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
}

export const SVGChessBoard: React.FC<SVGChessBoardProps> = ({
  chessInstance,
  onMove,
  playerColor = 'white',
  disabled = false
}) => {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null)
  const [draggedPiece, setDraggedPiece] = useState<{ square: string, piece: string } | null>(null)

  // Convert chess square to SVG coordinates
  const getSquareCoords = (square: string, isFlipped: boolean = false) => {
    const file = square.charCodeAt(0) - 97 // a=0, b=1, etc
    const rank = parseInt(square[1]) - 1    // 1=0, 2=1, etc
    
    const x = isFlipped ? (7 - file) * 100 : file * 100
    const y = isFlipped ? rank * 100 : (7 - rank) * 100
    
    return { x, y }
  }

  // Handle square click
  const handleSquareClick = useCallback((square: string) => {
    if (disabled || !chessInstance) return

    if (!selectedSquare) {
      // Select piece if there's one on this square
      const piece = chessInstance.get(square as any)
      if (piece && piece.color === chessInstance.turn()) {
        setSelectedSquare(square)
      }
    } else {
      // Try to make move
      if (selectedSquare === square) {
        // Deselect
        setSelectedSquare(null)
      } else {
        // Attempt move
        try {
          const move = chessInstance.move({ from: selectedSquare, to: square })
          if (move && onMove) {
            onMove({
              from: move.from,
              to: move.to,
              promotion: move.promotion as any
            })
          }
          setSelectedSquare(null)
        } catch (error) {
          // Invalid move, try selecting new piece
          const piece = chessInstance.get(square as any)
          if (piece && piece.color === chessInstance.turn()) {
            setSelectedSquare(square)
          } else {
            setSelectedSquare(null)
          }
        }
      }
    }
  }, [selectedSquare, chessInstance, onMove, disabled])

  // Get valid moves for highlighting
  const getValidMoves = (square: string) => {
    try {
      return chessInstance.moves({ square: square as any, verbose: true })
    } catch {
      return []
    }
  }

  // Render board squares
  const renderSquares = () => {
    const squares = []
    const isFlipped = playerColor === 'black'
    
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const squareName = String.fromCharCode(97 + file) + (rank + 1)
        const isLight = (rank + file) % 2 === 0
        const { x, y } = getSquareCoords(squareName, isFlipped)
        
        const isSelected = selectedSquare === squareName
        const validMoves = selectedSquare ? getValidMoves(selectedSquare) : []
        const isValidTarget = validMoves.some(move => move.to === squareName)
        
        squares.push(
          <rect
            key={squareName}
            x={x}
            y={y}
            width="100"
            height="100"
            fill={isLight ? '#f0d9b5' : '#b58863'}
            stroke={isSelected ? '#4ade80' : isValidTarget ? '#fbbf24' : 'none'}
            strokeWidth={isSelected ? '3' : isValidTarget ? '2' : '0'}
            className="cursor-pointer transition-all duration-150"
            style={{ 
              filter: isSelected ? 'brightness(1.1)' : 'none'
            }}
            onClick={() => handleSquareClick(squareName)}
          />
        )
      }
    }
    
    return squares
  }

  // Render chess pieces
  const renderPieces = () => {
    const pieces = []
    const board = chessInstance.board()
    const isFlipped = playerColor === 'black'
    
    for (let rank = 0; rank < 8; rank++) {
      for (let file = 0; file < 8; file++) {
        const piece = board[rank][file]
        if (piece) {
          const squareName = String.fromCharCode(97 + file) + (8 - rank)
          const { x, y } = getSquareCoords(squareName, isFlipped)
          const pieceKey = piece.type.toUpperCase() + (piece.color === 'w' ? '' : piece.type.toLowerCase())
          const symbol = PIECES[pieceKey as keyof typeof PIECES]
          
          pieces.push(
            <text
              key={`${squareName}-${piece.type}-${piece.color}`}
              x={x + 50}
              y={y + 70}
              fontSize="65"
              textAnchor="middle"
              className="cursor-pointer select-none transition-all duration-150 hover:scale-110"
              fill={piece.color === 'w' ? '#ffffff' : '#2c2c2c'}
              stroke={piece.color === 'w' ? '#2c2c2c' : '#ffffff'}
              strokeWidth="0.5"
              style={{
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                fontWeight: 'bold'
              }}
              onClick={() => handleSquareClick(squareName)}
            >
              {symbol}
            </text>
          )
        }
      }
    }
    
    return pieces
  }

  // Render coordinate labels
  const renderCoordinates = () => {
    const coords = []
    const isFlipped = playerColor === 'black'
    
    // File labels (a-h)
    for (let file = 0; file < 8; file++) {
      const letter = String.fromCharCode(97 + file)
      const x = isFlipped ? (7 - file) * 100 + 50 : file * 100 + 50
      
      coords.push(
        <text key={`file-${letter}`} x={x} y="795" fontSize="12" textAnchor="middle" fill="#666">
          {letter}
        </text>
      )
    }
    
    // Rank labels (1-8)
    for (let rank = 1; rank <= 8; rank++) {
      const y = isFlipped ? (rank - 1) * 100 + 50 : (8 - rank) * 100 + 50
      
      coords.push(
        <text key={`rank-${rank}`} x="5" y={y + 4} fontSize="12" textAnchor="start" fill="#666">
          {rank}
        </text>
      )
    }
    
    return coords
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 shadow-2xl">
      <svg 
        viewBox="0 0 800 800" 
        className="w-full h-full max-w-full max-h-full rounded-xl shadow-lg"
        style={{ aspectRatio: '1 / 1', background: 'linear-gradient(45deg, #8b7355, #f0d9b5)' }}
      >
        <defs>
          <filter id="boardShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>
        <rect x="0" y="0" width="800" height="800" fill="transparent" stroke="#8b7355" strokeWidth="4" rx="8"/>
        {renderSquares()}
        {renderPieces()}
        {renderCoordinates()}
      </svg>
    </div>
  )
}

export default SVGChessBoard