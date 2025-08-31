import React, { useState, useEffect } from 'react'
import { Chess } from 'chess.js'
import { ChessBoardContainer } from './ChessBoardContainer'
import { ChessBoardUIContainer } from './ChessBoardUIContainer'
import type { ChessMove } from '../../types/chess'
import { cn } from '../../lib/utils'

/**
 * ChessBoardComparison - SRP Component for Library Comparison
 * Single Responsibility: Display side-by-side comparison of chess board libraries
 */
export const ChessBoardComparison: React.FC = () => {
  const [chess] = useState(() => new Chess())
  const [position, setPosition] = useState(chess.fen())
  const [moveHistory, setMoveHistory] = useState<ChessMove[]>([])
  const [playerColor, setPlayerColor] = useState<'white' | 'black'>('white')
  const [boardSize, setBoardSize] = useState(400)

  // Responsive board sizing
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth
      if (width < 768) {
        setBoardSize(Math.min(300, width * 0.9))
      } else if (width < 1024) {
        setBoardSize(350)
      } else {
        setBoardSize(400)
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const handleMove = (move: ChessMove) => {
    try {
      const result = chess.move({
        from: move.from,
        to: move.to,
        promotion: move.promotion
      })
      if (result) {
        setPosition(chess.fen())
        setMoveHistory(prev => [...prev, move])
      }
    } catch (err) {
      console.error('Invalid move:', err)
    }
  }

  const resetGame = () => {
    chess.reset()
    setPosition(chess.fen())
    setMoveHistory([])
  }

  const flipBoard = () => {
    setPlayerColor(prev => prev === 'white' ? 'black' : 'white')
  }

  return (
    <div className={cn('chess-board-comparison')}>
      <div className="comparison-header">
        <h2>Chess Board Library Comparison</h2>
      </div>

      <div className="boards-container">
        <div className="board-section">
          <h3>Current: react-chessboard</h3>
          <div className="board-wrapper">
            <ChessBoardContainer
              chessInstance={chess}
              boardWidth={boardSize}
              onMove={handleMove}
              playerColor={playerColor}
              showCoordinates={true}
              disabled={false}
            />
          </div>
          <div className="board-info">
            <p><strong>Library:</strong> react-chessboard v4.6.0</p>
            <p><strong>Features:</strong> Drag & Drop, Click-to-move</p>
            <p><strong>Bundle Size:</strong> ~2MB</p>
            <p><strong>API:</strong> Prop-based configuration</p>
          </div>
        </div>

        <div className="board-section">
          <h3>New: react-chessboard-ui</h3>
          <div className="board-wrapper">
            <ChessBoardUIContainer
              chessInstance={chess}
              boardWidth={boardSize}
              onMove={handleMove}
              playerColor={playerColor}
              showCoordinates={true}
              disabled={false}
              customConfig={{
                moveSpeed: 'fast',
                showHints: false,
                restrictMoves: true
              }}
            />
          </div>
          <div className="board-info">
            <p><strong>Library:</strong> react-chessboard-ui v1.1.2+</p>
            <p><strong>Features:</strong> FEN-driven, Player restriction</p>
            <p><strong>Bundle Size:</strong> ~835KB</p>
            <p><strong>API:</strong> Configuration object</p>
          </div>
        </div>
      </div>

      <div className="comparison-data">
        <h3>Game State</h3>
        <div className="game-info">
          <div className="info-grid">
            <div className="info-item">
              <label>Position (FEN):</label>
              <code>{position}</code>
            </div>
            <div className="info-item">
              <label>Moves Played:</label>
              <span>{moveHistory.length}</span>
            </div>
            <div className="info-item">
              <label>Current Turn:</label>
              <span>{chess.turn() === 'w' ? 'White' : 'Black'}</span>
            </div>
            <div className="info-item">
              <label>In Check:</label>
              <span className={chess.inCheck() ? 'check-yes' : 'check-no'}>
                {chess.inCheck() ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="info-item">
              <label>Game Over:</label>
              <span className={chess.isGameOver() ? 'game-over-yes' : 'game-over-no'}>
                {chess.isGameOver() ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="info-item">
              <label>Legal Moves:</label>
              <span>{chess.moves().length}</span>
            </div>
          </div>
        </div>

        {moveHistory.length > 0 && (
          <div className="move-history">
            <h4>Move History</h4>
            <div className="moves-list">
              {moveHistory.map((move, index) => (
                <span key={index} className="move-item">
                  {index + 1}. {move.from}-{move.to}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .chess-board-comparison {
          width: 100%;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.02);
          min-height: 100vh;
        }

        .comparison-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .comparison-header h2 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 2rem;
          font-weight: 600;
        }


        .boards-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin: 2rem 0;
        }

        .board-section {
          text-align: center;
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .board-section h3 {
          color: #374151;
          margin-bottom: 1.5rem;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .board-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
          overflow: hidden;
          max-width: 100%;
        }

        .board-wrapper > div {
          max-width: 100% !important;
        }

        .board-info {
          text-align: left;
          background: rgba(243, 244, 246, 0.5);
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
        }

        .board-info p {
          margin: 0.5rem 0;
          color: #4b5563;
          font-size: 0.9rem;
        }

        .comparison-data {
          margin-top: 3rem;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .comparison-data h3 {
          color: #1f2937;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(243, 244, 246, 0.5);
          border-radius: 6px;
        }

        .info-item label {
          font-weight: 600;
          color: #374151;
          min-width: 120px;
        }

        .info-item code {
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
          background: rgba(0, 0, 0, 0.05);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          word-break: break-all;
        }

        .check-yes {
          color: #dc2626;
          font-weight: 600;
        }

        .check-no {
          color: #059669;
        }

        .game-over-yes {
          color: #dc2626;
          font-weight: 600;
        }

        .game-over-no {
          color: #059669;
        }

        .move-history {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        .move-history h4 {
          color: #1f2937;
          margin-bottom: 1rem;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .moves-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .move-item {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid #3b82f6;
          color: #1e40af;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.9rem;
          font-family: monospace;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .chess-board-comparison {
            padding: 1rem;
          }

          .boards-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .controls {
            flex-direction: column;
            gap: 0.5rem;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }

          .comparison-header h2 {
            font-size: 1.5rem;
          }
        }

        /* Tablet responsive */
        @media (min-width: 769px) and (max-width: 1024px) {
          .boards-container {
            gap: 2rem;
          }
          
          .board-wrapper {
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  )
}

export default ChessBoardComparison