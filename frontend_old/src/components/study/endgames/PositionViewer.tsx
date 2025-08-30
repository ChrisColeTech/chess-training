import React, { useState, useCallback } from 'react'
import { Chessboard } from 'react-chessboard'
import { TrendingUp, Clock, Info, RotateCw, Star, Target } from 'lucide-react'
import type { PositionViewerProps } from '@/types/endgameLibrary'
import { GiSwordsPower } from 'react-icons/gi'

/**
 * PositionViewer Component
 * Interactive chess board for viewing and analyzing endgame positions
 * Features fortress-themed gaming aesthetic with analysis tools
 */
export const PositionViewer: React.FC<PositionViewerProps> = ({
  position,
  currentFen,
  allowMoves = false,
  onMove,
  highlightedSquares = [],
  arrows = [],
  orientation = 'white',
  showCoordinates = true,
  size = 400,
  theme
}) => {
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>(orientation)
  const [showHighlights, setShowHighlights] = useState(true)
  const [showArrows, setShowArrows] = useState(true)
  // const [isAnalyzing, setIsAnalyzing] = useState(false)

  /**
   * Handle piece moves
   */
  const handleMove = useCallback((sourceSquare: string, targetSquare: string) => {
    if (!allowMoves || !onMove) return false
    
    // Call parent move handler
    onMove(sourceSquare, targetSquare)
    return true
  }, [allowMoves, onMove])

  /**
   * Flip board orientation
   */
  const flipBoard = useCallback(() => {
    setBoardOrientation(prev => prev === 'white' ? 'black' : 'white')
  }, [])

  /**
   * Toggle highlights
   */
  const toggleHighlights = useCallback(() => {
    setShowHighlights(prev => !prev)
  }, [])

  /**
   * Toggle arrows
   */
  const toggleArrows = useCallback(() => {
    setShowArrows(prev => !prev)
  }, [])

  /**
   * Get difficulty color for UI
   */
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400'
      case 'Intermediate': return 'text-yellow-400'
      case 'Advanced': return 'text-orange-400'
      case 'Master': return 'text-red-400'
      case 'Grandmaster': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  /**
   * Create square highlights for react-chessboard
   */
  const squareStyles = showHighlights ? highlightedSquares.reduce((styles, square) => {
    styles[square] = {
      backgroundColor: 'rgba(147, 51, 234, 0.4)',
      border: '2px solid rgba(147, 51, 234, 0.8)',
      boxShadow: '0 0 10px rgba(147, 51, 234, 0.6)'
    }
    return styles
  }, {} as Record<string, any>) : {}

  /**
   * Create arrows for react-chessboard
   */
  const drawingShapes = showArrows ? arrows.map(arrow => [arrow.from, arrow.to, arrow.color] as [any, any, string]) : []

  return (
    <div className="space-y-4">
      {/* Position Header */}
      <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className={`text-xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              <GiSwordsPower className="w-4 h-4 inline" /> {position.title}
            </h3>
            {position.subtitle && (
              <p className="text-slate-400 text-sm mt-1">{position.subtitle}</p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getDifficultyColor(position.difficulty)} bg-slate-700/50`}>
              {position.difficulty}
            </span>
            {position.theoreticalResult && (
              <span className={`
                px-3 py-1 rounded-lg text-sm font-bold
                ${position.theoreticalResult === 'winning' 
                  ? 'text-green-400 bg-green-900/30' 
                  : position.theoreticalResult === 'drawn'
                  ? 'text-yellow-400 bg-yellow-900/30'
                  : 'text-red-400 bg-red-900/30'
                }
              `}>
                {position.theoreticalResult.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Position Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className={`text-lg font-bold ${theme.text}`}>{position.evaluation}</div>
            <div className="text-xs text-slate-400">Evaluation</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className={`text-lg font-bold ${theme.text}`}>{position.winRate}%</div>
            <div className="text-xs text-slate-400">Win Rate</div>
          </div>
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className={`text-lg font-bold ${theme.text}`}>{position.masterGames}</div>
            <div className="text-xs text-slate-400">Master Games</div>
          </div>
        </div>
      </div>

      {/* Chess Board Container */}
      <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 flex flex-col items-center`}>
        {/* Board Controls */}
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={flipBoard}
              className={`
                p-2 rounded-lg transition-all duration-200
                bg-slate-700/50 hover:bg-slate-600/50 ${theme.text}
                hover:scale-105 active:scale-95
              `}
              title="Flip Board"
            >
              <RotateCw size={18} />
            </button>
            
            <button
              onClick={toggleHighlights}
              className={`
                p-2 rounded-lg transition-all duration-200
                ${showHighlights 
                  ? `bg-gradient-to-r ${theme.primary} text-white` 
                  : `bg-slate-700/50 hover:bg-slate-600/50 ${theme.text}`
                }
                hover:scale-105 active:scale-95
              `}
              title="Toggle Highlights"
            >
              <Target size={18} />
            </button>
            
            <button
              onClick={toggleArrows}
              className={`
                p-2 rounded-lg transition-all duration-200
                ${showArrows 
                  ? `bg-gradient-to-r ${theme.primary} text-white` 
                  : `bg-slate-700/50 hover:bg-slate-600/50 ${theme.text}`
                }
                hover:scale-105 active:scale-95
              `}
              title="Toggle Arrows"
            >
              <TrendingUp size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              {boardOrientation === 'white' ? 'White' : 'Black'} to move
            </span>
            <div className={`w-3 h-3 rounded-full ${boardOrientation === 'white' ? 'bg-white' : 'bg-slate-800 border-2 border-white'}`} />
          </div>
        </div>

        {/* Chess Board */}
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-sm" />
          <div className="relative bg-slate-900/50 rounded-lg p-2">
            <Chessboard
              position={currentFen || position.fen}
              boardOrientation={boardOrientation}
              arePiecesDraggable={allowMoves}
              onPieceDrop={handleMove}
              boardWidth={size}
              customBoardStyle={{
                borderRadius: '8px',
                boxShadow: '0 0 30px rgba(147, 51, 234, 0.4)'
              }}
              customSquareStyles={squareStyles}
              customArrows={drawingShapes}
              showBoardNotation={showCoordinates}
            />
          </div>
        </div>

        {/* Board Info */}
        <div className="w-full mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-slate-400">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>Study time: {position.studyTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} />
              <span>Category: {position.category}</span>
            </div>
          </div>
          
          {allowMoves && (
            <div className="text-slate-400">
              <span>Interactive mode enabled</span>
            </div>
          )}
        </div>
      </div>

      {/* Position Description */}
      <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Info size={20} className={theme.text} />
          <h4 className={`font-semibold ${theme.text}`}>Position Overview</h4>
        </div>
        
        <p className={`${theme.text} opacity-90 leading-relaxed mb-4`}>
          {position.description}
        </p>

        {/* Key Points */}
        <div className="space-y-2">
          <h5 className={`font-medium ${theme.text} text-sm mb-2`}><Target className="w-4 h-4 inline" /> Key Learning Points:</h5>
          <ul className="space-y-1">
            {position.keyPoints.slice(0, 3).map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-300">{point}</span>
              </li>
            ))}
          </ul>
          
          {position.keyPoints.length > 3 && (
            <p className="text-xs text-slate-400 mt-2">
              +{position.keyPoints.length - 3} more learning points in detailed view
            </p>
          )}
        </div>

        {/* Tags */}
        {position.tags && position.tags.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-700/50">
            <div className="flex flex-wrap gap-2">
              {position.tags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
              {position.tags.length > 5 && (
                <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-md">
                  +{position.tags.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}