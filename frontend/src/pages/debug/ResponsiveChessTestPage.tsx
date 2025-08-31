import React, { useState } from 'react'
import { ChessBoard } from 'responsive-chessboard'
import type { MoveData } from 'responsive-chessboard'

export const ResponsiveChessTestPage: React.FC = () => {
  const [position] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const [boardSize, setBoardSize] = useState(400)

  const handleMove = (moveData: MoveData) => {
    console.log('Move:', moveData)
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Responsive Chess Board Test</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Board Size: {boardSize}px
          </label>
          <input
            type="range"
            min="300"
            max="600"
            value={boardSize}
            onChange={(e) => setBoardSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex justify-center">
          <ChessBoard
            FEN={position}
            boardSize={boardSize}
            minSize={300}
            maxSize={600}
            responsive={true}
            onChange={handleMove}
            onEndGame={() => {}}
          />
        </div>
      </div>
    </div>
  )
}