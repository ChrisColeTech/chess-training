// Engine Lines Component - Following SRP for engine analysis display only
import React from 'react'
import { Zap, Play, Sparkles, Crown } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { EngineAnalysis } from '@/types/analysisBoard'
import { soundFX } from '@/utils/soundEffects'

interface EngineLinesProps {
  analysisLines: EngineAnalysis[]
  isAnalyzing: boolean
  onPlayLine?: (moves: string[]) => void
  className?: string
}

export const EngineLines: React.FC<EngineLinesProps> = ({
  analysisLines,
  isAnalyzing,
  onPlayLine,
  className = ''
}) => {

  // Single responsibility: Format analysis data for display
  const formatNodes = (nodes: number) => {
    if (nodes >= 1000000) return `${(nodes / 1000000).toFixed(1)}M`
    if (nodes >= 1000) return `${(nodes / 1000).toFixed(0)}k`
    return nodes.toString()
  }

  const getEvalColor = (evaluation: number) => {
    if (evaluation > 0.5) return 'text-green-400'
    if (evaluation < -0.5) return 'text-red-400'
    return 'text-yellow-400'
  }

  const getLineIcon = (index: number, evaluation: number) => {
    if (index === 0 && Math.abs(evaluation) > 2) return Crown // Best line with big advantage
    if (Math.abs(evaluation) > 1) return Sparkles // Tactical line
    return Zap // Normal line
  }

  const handlePlayLine = (moves: string[]) => {
    soundFX.playClick()
    onPlayLine?.(moves)
  }

  return (
    <div className={`backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6 ${className}`}>
      <h3 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
        <Zap className="w-5 h-5" />
        Engine Analysis
        {isAnalyzing && (
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs opacity-75">Computing...</span>
          </div>
        )}
      </h3>
      
      {analysisLines.length === 0 ? (
        <div className="text-center py-8 opacity-60">
          <Zap className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Start analysis to see engine lines</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {analysisLines.map((line, index) => {
            const LineIcon = getLineIcon(index, line.eval)
            
            return (
              <div 
                key={index} 
                className="group p-4 backdrop-blur-xl bg-black/20 border-white/10 rounded-lg border hover:bg-black/30 hover:border-white/20 transition-all duration-300"
              >
                {/* Line header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs font-bold ${index === 0 ? 'border-yellow-400 text-yellow-400' : ''}`}
                    >
                      <LineIcon className="w-3 h-3 mr-1" />
                      #{index + 1}
                    </Badge>
                    {line.multipv === 1 && (
                      <Badge variant="outline" className="text-xs border-green-400 text-green-400">
                        Best
                      </Badge>
                    )}
                  </div>
                  
                  <div className={`text-lg font-bold ${getEvalColor(line.eval)}`}>
                    {line.mate ? (
                      <span className="flex items-center gap-1">
                        <FaCrown className="w-4 h-4" />
                        M{Math.abs(line.mate)}
                      </span>
                    ) : (
                      <>
                        {line.eval > 0 ? '+' : ''}{line.eval.toFixed(2)}
                      </>
                    )}
                  </div>
                </div>

                {/* Principal variation */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs opacity-75 uppercase tracking-wider">Principal Variation</span>
                    {onPlayLine && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handlePlayLine(line.pv)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  <div className="text-sm font-mono leading-relaxed bg-black/30 p-2 rounded border">
                    {line.pv.slice(0, 8).map((move, moveIndex) => (
                      <span key={moveIndex} className="mr-2 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors">
                        {moveIndex % 2 === 0 && moveIndex > 0 && ' '}
                        {moveIndex % 2 === 0 ? `${Math.floor(moveIndex / 2) + 1}.` : ''} {move}
                      </span>
                    ))}
                    {line.pv.length > 8 && (
                      <span className="opacity-60">... +{line.pv.length - 8} moves</span>
                    )}
                  </div>
                </div>

                {/* Analysis stats */}
                <div className="grid grid-cols-4 gap-4 text-xs">
                  <div className="text-center">
                    <div className="font-bold opacity-90">D{line.depth}</div>
                    <div className="opacity-60">Depth</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold opacity-90">{formatNodes(line.nodes)}</div>
                    <div className="opacity-60">Nodes</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold opacity-90">{(line.nps / 1000000).toFixed(1)}M</div>
                    <div className="opacity-60">NPS</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold opacity-90">{line.time.toFixed(1)}s</div>
                    <div className="opacity-60">Time</div>
                  </div>
                </div>

                {/* Visual depth indicator */}
                <div className="mt-3">
                  <div className="h-1 bg-black/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 bg-gradient-to-r ${
                        index === 0 ? 'from-yellow-400 to-orange-500' : 'from-blue-400 to-purple-500'
                      }`}
                      style={{ width: `${(line.depth / 25) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Analysis summary */}
      {analysisLines.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex justify-between items-center text-xs opacity-75">
            <span>Lines: {analysisLines.length}</span>
            <span>Max Depth: {Math.max(...analysisLines.map(l => l.depth))}</span>
            <span>Total Nodes: {formatNodes(analysisLines.reduce((sum, l) => sum + l.nodes, 0))}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default EngineLines