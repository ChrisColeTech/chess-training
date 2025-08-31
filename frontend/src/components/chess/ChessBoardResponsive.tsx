import React from 'react'
import { ChessBoard } from 'responsive-chessboard'
import { useResponsiveSize } from '../../hooks/useResponsiveSize'
import type { ChessBoardResponsiveProps } from '../../types/components'

export const ChessBoardResponsive: React.FC<ChessBoardResponsiveProps> = ({
  position,
  playerColor = 'white',
  boardSize = 400,
  disabled = false,
  reversed = false,
  onMove,
  onGameEnd,
  customConfig = {},
  className
}) => {
  const responsiveSize = useResponsiveSize({
    baseSize: boardSize,
    minSize: 300,
    maxSize: 800,
    breakpoints: {
      mobile: 320,
      tablet: 768,
      desktop: 1024
    }
  })

  return (
    <div className={`w-full h-full ${className || ''}`}>
      <ChessBoard
        FEN={position}
        playerColor={playerColor}
        reversed={reversed}
        onChange={(moveData: any) => {
          if (onMove) {
            onMove({
              from: moveData.from,
              to: moveData.to,
              promotion: moveData.promotion
            })
          }
        }}
        onEndGame={(result: any) => {
          if (onGameEnd) {
            onGameEnd(result)
          }
        }}
        config={customConfig}
        boardSize={responsiveSize}
        responsive={true}
      />
    </div>
  )
}