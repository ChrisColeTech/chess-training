import React from 'react'
import { GitBranch, ChevronRight, ChevronDown } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import type { VariationTreeProps } from '@/types/openingExplorer'

/**
 * Variation tree component for exploring move sequences
 * Displays available moves with statistics and evaluation
 */
const VariationTree: React.FC<VariationTreeProps> = ({
  variations,
  onVariationSelect,
  expandedNodes,
  onNodeToggle
}) => {
  const getMoveQualityColor = (category: string) => {
    switch (category) {
      case 'excellent': return 'text-green-400'
      case 'good': return 'text-blue-400'
      case 'inaccuracy': return 'text-yellow-400'
      case 'mistake': return 'text-orange-400'
      case 'blunder': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getEvaluationDisplay = (evaluation: number) => {
    if (evaluation > 0) return `+${evaluation.toFixed(2)}`
    if (evaluation < 0) return evaluation.toFixed(2)
    return '0.00'
  }

  if (variations.length === 0) {
    return (
      <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6">
        <h4 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
          <GitBranch className="w-5 h-5" />
          Move Tree
        </h4>
        <div className="text-center py-8 opacity-75">
          <div className="text-lg mb-2">No variations available</div>
          <div className="text-sm">This position is not in the database</div>
        </div>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6 h-full">
      <h4 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
        <GitBranch className="w-5 h-5" />
        Next Moves
      </h4>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {variations.map((variation, i) => {
          const nodeId = `variation-${i}`
          const isExpanded = expandedNodes.has(nodeId)
          const moveQualityColor = getMoveQualityColor(variation.category)
          
          return (
            <div key={i} className="space-y-1">
              {/* Main variation */}
              <div
                className="p-3 backdrop-blur-xl bg-black/20 border-white/10 rounded-lg border cursor-pointer hover:bg-black/30 transition-all group"
                onClick={() => onVariationSelect(variation)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`font-mono font-bold ${moveQualityColor} group-hover:scale-105 transition-transform`}>
                      {variation.san}
                    </div>
                    {variation.eco.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {variation.eco[0]}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {variation.frequency.toFixed(1)}%
                    </Badge>
                    {variation.eco.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onNodeToggle(nodeId)
                        }}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-1 text-xs text-center mb-2">
                  <div>
                    <div className="font-semibold text-green-400">
                      {variation.whiteWins.toFixed(0)}%
                    </div>
                    <div className="opacity-75">White</div>
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-400">
                      {variation.draws.toFixed(0)}%
                    </div>
                    <div className="opacity-75">Draw</div>
                  </div>
                  <div>
                    <div className="font-semibold text-red-400">
                      {variation.blackWins.toFixed(0)}%
                    </div>
                    <div className="opacity-75">Black</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs opacity-75">
                  <span>{variation.games.toLocaleString()} games</span>
                  <span className={moveQualityColor}>
                    Eval: {getEvaluationDisplay(variation.evaluation)}
                  </span>
                </div>
              </div>

              {/* Expanded ECO codes */}
              {isExpanded && variation.eco.length > 1 && (
                <div className="ml-4 space-y-1">
                  {variation.eco.slice(1).map((eco, ecoIndex) => (
                    <div
                      key={ecoIndex}
                      className="p-2 backdrop-blur-xl bg-black/10 border-white/5 rounded border text-xs cursor-pointer hover:bg-black/20 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono">{eco}</span>
                        <Badge variant="outline" className="text-xs">
                          Transposition
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Statistics summary */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs opacity-75 text-center">
          {variations.length} variations • {variations.reduce((sum, v) => sum + v.games, 0).toLocaleString()} total games
        </div>
      </div>
    </div>
  )
}

export default VariationTree