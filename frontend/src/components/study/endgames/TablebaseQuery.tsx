import React, { useState, useCallback } from 'react'
import { Search, Database, Clock, TrendingUp, TrendingDown, Minus, HelpCircle, AlertTriangle, ArrowRight, Copy, History } from 'lucide-react'
import type { TablebaseQueryProps, TablebaseResult } from '@/types/endgameLibrary'

/**
 * TablebaseQuery Component
 * Interface for querying endgame tablebases with fortress-themed gaming aesthetic
 * Provides comprehensive tablebase analysis and move evaluation
 */
export const TablebaseQuery: React.FC<TablebaseQueryProps> = ({
  position,
  onQuery,
  result,
  isLoading,
  history,
  theme
}) => {
  const [queryFen, setQueryFen] = useState(position)
  const [showHistory, setShowHistory] = useState(false)

  /**
   * Handle query submission
   */
  const handleQuery = useCallback(async () => {
    if (!queryFen.trim()) return
    await onQuery(queryFen.trim())
  }, [queryFen, onQuery])

  /**
   * Handle Enter key press
   */
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleQuery()
    }
  }, [handleQuery, isLoading])

  /**
   * Copy FEN to clipboard
   */
  const copyFen = useCallback(async (fen: string) => {
    try {
      await navigator.clipboard.writeText(fen)
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy FEN:', err)
    }
  }, [])

  /**
   * Load FEN from history
   */
  const loadFromHistory = useCallback((fen: string) => {
    setQueryFen(fen)
  }, [])

  /**
   * Get result color and icon
   */
  const getResultDisplay = (result: TablebaseResult) => {
    switch (result) {
      case 'Win':
        return { 
          color: 'text-green-400', 
          bgColor: 'bg-green-900/30 border-green-500/30',
          icon: <TrendingUp size={16} />,
          label: 'WIN'
        }
      case 'Loss':
        return { 
          color: 'text-red-400', 
          bgColor: 'bg-red-900/30 border-red-500/30',
          icon: <TrendingDown size={16} />,
          label: 'LOSS'
        }
      case 'Draw':
        return { 
          color: 'text-yellow-400', 
          bgColor: 'bg-yellow-900/30 border-yellow-500/30',
          icon: <Minus size={16} />,
          label: 'DRAW'
        }
      default:
        return { 
          color: 'text-gray-400', 
          bgColor: 'bg-gray-900/30 border-gray-500/30',
          icon: <HelpCircle size={16} />,
          label: 'UNKNOWN'
        }
    }
  }

  /**
   * Format distance to mate/zeroing
   */
  const formatDistance = (dtm?: number, dtz?: number, result?: TablebaseResult) => {
    if (result === 'Draw') {
      return dtz ? `DTZ: ${dtz}` : 'Drawn position'
    }
    if (dtm) {
      return `DTM: ${dtm}`
    }
    if (dtz) {
      return `DTZ: ${dtz}`
    }
    return null
  }

  return (
    <div className="space-y-4">
      {/* Query Header */}
      <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4`}>
        <div className="flex items-center gap-2 mb-4">
          <Database size={24} className={theme.text} />
          <h3 className={`text-xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            🏰 TABLEBASE ORACLE
          </h3>
        </div>

        {/* Query Input */}
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={queryFen}
              onChange={(e) => setQueryFen(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter FEN position to query tablebase..."
              className={`
                w-full px-4 py-3 pr-12
                bg-slate-700/50 backdrop-blur-sm 
                border border-slate-600/50 
                rounded-xl text-white placeholder-slate-400 
                focus:outline-none focus:border-purple-500/50 
                focus:ring-2 focus:ring-purple-500/20
                transition-all duration-200
                font-mono text-sm
              `}
              disabled={isLoading}
            />
            <button
              onClick={() => copyFen(queryFen)}
              className={`
                absolute right-3 top-1/2 -translate-y-1/2
                p-1 rounded hover:bg-slate-600/50 transition-colors
                ${theme.text} opacity-70 hover:opacity-100
              `}
              title="Copy FEN"
            >
              <Copy size={16} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQuery}
              disabled={isLoading || !queryFen.trim()}
              className={`
                flex items-center gap-2 px-6 py-3 
                bg-gradient-to-r ${theme.primary}
                hover:opacity-90 disabled:opacity-50
                text-white font-semibold rounded-xl 
                transition-all duration-200
                hover:scale-105 active:scale-95
                disabled:cursor-not-allowed disabled:hover:scale-100
              `}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Querying Oracle...</span>
                </>
              ) : (
                <>
                  <Search size={18} />
                  <span>Query Tablebase</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`
                p-3 rounded-xl transition-all duration-200
                ${showHistory 
                  ? `bg-gradient-to-r ${theme.primary} text-white` 
                  : `bg-slate-700/50 hover:bg-slate-600/50 ${theme.text}`
                }
                hover:scale-105 active:scale-95
              `}
              title="Query History"
            >
              <History size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Query History */}
      {showHistory && history.length > 0 && (
        <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4`}>
          <h4 className={`font-semibold ${theme.text} mb-3 flex items-center gap-2`}>
            <History size={18} />
            Recent Queries
          </h4>
          <div className="space-y-2">
            {history.slice(0, 5).map((entry, index) => {
              const display = getResultDisplay(entry.result)
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`p-1 rounded ${display.bgColor} border`}>
                      <span className={`${display.color} font-bold text-xs`}>
                        {display.label}
                      </span>
                    </div>
                    <span className="font-mono text-sm text-slate-300 truncate">
                      {entry.fen.slice(0, 30)}...
                    </span>
                  </div>
                  <button
                    onClick={() => loadFromHistory(entry.fen)}
                    className={`
                      px-3 py-1 text-sm rounded
                      bg-slate-600/50 hover:bg-slate-500/50
                      ${theme.text} transition-colors
                    `}
                  >
                    Load
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Query Result */}
      {result && (
        <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4`}>
          {result.error ? (
            /* Error Display */
            <div className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <AlertTriangle size={24} className="text-red-400 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-400 mb-1">Query Failed</h4>
                <p className="text-red-300 text-sm">{result.error}</p>
              </div>
            </div>
          ) : (
            /* Success Display */
            <div className="space-y-4">
              {/* Result Header */}
              <div className="flex items-center justify-between">
                <h4 className={`font-semibold ${theme.text} text-lg`}>Oracle Response</h4>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock size={16} />
                  <span>{new Date(result.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Main Result */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`${getResultDisplay(result.result).bgColor} border rounded-lg p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getResultDisplay(result.result).icon}
                    <span className={`font-bold ${getResultDisplay(result.result).color}`}>
                      POSITION: {getResultDisplay(result.result).label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    {formatDistance(result.dtm, result.dtz, result.result) || 'Perfect play evaluation'}
                  </p>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Database size={16} className={theme.text} />
                    <span className={`font-bold ${theme.text}`}>TABLEBASE INFO</span>
                  </div>
                  <p className="text-sm text-slate-300">
                    {result.is7man ? '7-man tablebase' : '6-man tablebase'}
                  </p>
                  {result.bestMove && (
                    <p className="text-sm text-slate-400 mt-1">
                      Best move: <span className="font-mono text-white">{result.bestMove}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Move Analysis */}
              {result.moves && result.moves.length > 0 && (
                <div className="space-y-3">
                  <h5 className={`font-semibold ${theme.text} flex items-center gap-2`}>
                    <ArrowRight size={18} />
                    Move Analysis ({result.moves.length} legal moves)
                  </h5>
                  
                  <div className="space-y-2">
                    {result.moves.slice(0, 8).map((move, index) => {
                      const moveDisplay = getResultDisplay(move.result)
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-600/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-white font-bold w-16">
                              {move.move}
                            </span>
                            <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${moveDisplay.bgColor} border`}>
                              {moveDisplay.icon}
                              <span className={moveDisplay.color}>{moveDisplay.label}</span>
                            </div>
                          </div>
                          
                          <div className="text-right text-sm">
                            {formatDistance(move.dtm, move.dtz, move.result) && (
                              <div className="text-slate-400">
                                {formatDistance(move.dtm, move.dtz, move.result)}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                    
                    {result.moves.length > 8 && (
                      <div className="text-center text-sm text-slate-400 py-2">
                        +{result.moves.length - 8} more moves available
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Oracle Wisdom */}
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
                    <Database size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h6 className="font-semibold text-purple-300 mb-1">🔮 Oracle Wisdom</h6>
                    <p className="text-sm text-purple-200 leading-relaxed">
                      {result.result === 'Win' 
                        ? 'The fortress gates shall open with perfect play. Victory awaits those who calculate precisely.'
                        : result.result === 'Loss'
                        ? 'The fortress walls hold strong against this assault. Defense requires unwavering focus.'
                        : result.result === 'Draw'
                        ? 'Neither side can claim victory in this balanced position. Honor lies in the perfect defense.'
                        : 'The oracle\'s vision is clouded. This position lies beyond the realm of perfect knowledge.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Result Placeholder */}
      {!result && !isLoading && (
        <div className="text-center py-12">
          <Database size={48} className={`${theme.text} opacity-30 mx-auto mb-4`} />
          <h4 className={`${theme.text} opacity-70 text-lg font-medium mb-2`}>
            Awaiting Oracle Query
          </h4>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Enter a FEN position above to consult the fortress tablebase oracle for perfect endgame analysis
          </p>
        </div>
      )}
    </div>
  )
}