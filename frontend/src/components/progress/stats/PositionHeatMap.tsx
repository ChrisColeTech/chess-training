import React from 'react'
import { Grid3x3, Target, Clock, CheckCircle, AlertTriangle, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PositionHeatMapProps, PositionHeatMaps } from '@/types/detailedStats'

/**
 * PositionHeatMap Component
 * Displays chess board heat maps for various position analysis metrics
 */
export const PositionHeatMap: React.FC<PositionHeatMapProps> = ({
  heatMaps,
  selectedMap,
  onMapChange,
  isLoading,
  theme
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 animate-pulse">
          <div className="h-4 bg-slate-600/50 rounded w-1/3 mb-4"></div>
          <div className="h-80 bg-slate-600/50 rounded"></div>
        </div>
      </div>
    )
  }

  const mapOptions: Array<{
    key: keyof PositionHeatMaps
    label: string
    icon: React.ElementType
    description: string
  }> = [
    {
      key: 'squareControl',
      label: 'Square Control',
      icon: Grid3x3,
      description: 'Areas you control most effectively'
    },
    {
      key: 'blunderSpots',
      label: 'Blunder Analysis',
      icon: AlertTriangle,
      description: 'Squares where mistakes commonly occur'
    },
    {
      key: 'timeDistribution',
      label: 'Time Distribution',
      icon: Clock,
      description: 'Where you spend thinking time'
    }
  ]

  const getHeatMapData = () => {
    switch (selectedMap) {
      case 'squareControl':
        return heatMaps.squareControl.middlegame // Default to middlegame
      case 'blunderSpots':
        return heatMaps.blunderSpots
      case 'timeDistribution':
        return heatMaps.timeDistribution
      default:
        return heatMaps.squareControl.middlegame
    }
  }

  const getHeatColor = (value: number, maxValue: number) => {
    const intensity = value / maxValue
    if (selectedMap === 'blunderSpots') {
      // Red heat map for blunders
      return `rgba(239, 68, 68, ${intensity * 0.8})`
    } else if (selectedMap === 'timeDistribution') {
      // Blue heat map for time
      return `rgba(59, 130, 246, ${intensity * 0.8})`
    } else {
      // Green heat map for control
      return `rgba(34, 197, 94, ${intensity * 0.8})`
    }
  }

  const renderChessBoard = () => {
    const data = getHeatMapData()
    const maxValue = Math.max(...data.flat())
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1']

    return (
      <div className="relative bg-slate-900/50 rounded-lg p-4 inline-block">
        {/* Board */}
        <div className="grid grid-cols-8 gap-0 border-2 border-slate-600 rounded">
          {data.map((row, rankIndex) =>
            row.map((value, fileIndex) => {
              const isLight = (rankIndex + fileIndex) % 2 === 0
              const heatColor = getHeatColor(value, maxValue)
              
              return (
                <div
                  key={`${rankIndex}-${fileIndex}`}
                  className={`
                    w-12 h-12 flex items-center justify-center text-xs font-bold
                    relative border border-slate-700/30
                    ${isLight ? 'bg-amber-100/20' : 'bg-amber-800/20'}
                  `}
                  style={{
                    backgroundColor: value > 0 ? heatColor : undefined
                  }}
                  title={`${files[fileIndex]}${ranks[rankIndex]}: ${value.toFixed(1)}`}
                >
                  {/* Value display for high intensity squares */}
                  {value > maxValue * 0.7 && (
                    <span className="text-white text-xs font-bold drop-shadow">
                      {value.toFixed(0)}
                    </span>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Coordinates */}
        <div className="flex justify-around mt-2">
          {files.map(file => (
            <span key={file} className="text-xs text-slate-400 font-mono">
              {file}
            </span>
          ))}
        </div>
        
        <div className="absolute left-0 top-4 flex flex-col justify-around h-96 -ml-6">
          {ranks.map(rank => (
            <span key={rank} className="text-xs text-slate-400 font-mono">
              {rank}
            </span>
          ))}
        </div>
      </div>
    )
  }

  const renderLegend = () => {
    const data = getHeatMapData()
    const maxValue = Math.max(...data.flat())
    const minValue = Math.min(...data.flat())

    return (
      <div className="space-y-3">
        <div className="text-sm font-medium text-slate-300">Intensity Scale</div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Low</span>
          <div className="flex-1 h-4 rounded-full bg-gradient-to-r from-transparent via-current to-current opacity-60"
               style={{
                 color: selectedMap === 'blunderSpots' ? '#ef4444' :
                        selectedMap === 'timeDistribution' ? '#3b82f6' : '#22c55e'
               }} />
          <span className="text-xs text-slate-400">High</span>
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>{minValue.toFixed(0)}</span>
          <span>{maxValue.toFixed(0)}</span>
        </div>
      </div>
    )
  }

  const getMapStats = () => {
    const data = getHeatMapData()
    const flatData = data.flat()
    const maxValue = Math.max(...flatData)
    const avgValue = flatData.reduce((sum, val) => sum + val, 0) / flatData.length
    const hotSpots = flatData.filter(val => val > avgValue * 1.5).length

    return { maxValue, avgValue, hotSpots }
  }

  const stats = getMapStats()

  return (
    <div className="space-y-6">
      {/* Map Type Selector */}
      <div className={`
        bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
        command-panel
      `}>
        <div className="flex items-center gap-3 mb-6">
          <Grid3x3 size={20} className="text-cyan-400" />
          <h3 className="text-lg font-bold text-white uppercase tracking-wide">
            Position Heat Maps
          </h3>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
        </div>

        {/* Map Type Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {mapOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selectedMap === option.key
            
            return (
              <Button
                key={option.key}
                onClick={() => onMapChange(option.key)}
                variant={isSelected ? "default" : "outline"}
                className={`
                  p-4 h-auto flex flex-col items-center gap-2 transition-all duration-200
                  ${isSelected
                    ? `bg-gradient-to-r ${theme.primary} text-white border border-slate-500/50`
                    : 'bg-slate-800/30 text-slate-400 hover:text-white hover:bg-slate-700/30 border-slate-600/30'
                  }
                `}
              >
                <Icon size={24} />
                <div className="text-center">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs opacity-80 mt-1">{option.description}</div>
                </div>
              </Button>
            )
          })}
        </div>

        {/* Heat Map Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Chess Board Heat Map */}
          <div className="lg:col-span-2">
            {renderChessBoard()}
          </div>

          {/* Legend and Stats */}
          <div className="space-y-6">
            {renderLegend()}
            
            {/* Statistics */}
            <div className="space-y-4">
              <div className="text-sm font-medium text-slate-300">Analysis</div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Peak Value:</span>
                  <span className="text-white font-medium">{stats.maxValue.toFixed(1)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Average:</span>
                  <span className="text-white font-medium">{stats.avgValue.toFixed(1)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Hot Spots:</span>
                  <span className="text-white font-medium">{stats.hotSpots}</span>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="space-y-4">
              <div className="text-sm font-medium text-slate-300">Key Insights</div>
              <div className="space-y-2 text-sm">
                {selectedMap === 'squareControl' && (
                  <>
                    <div className="text-slate-400 flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-400" />
                      Strong central control in middlegame
                    </div>
                    <div className="text-slate-400 flex items-center gap-2">
                      <Target size={14} className="text-blue-400" />
                      Focus on kingside activity
                    </div>
                  </>
                )}
                
                {selectedMap === 'blunderSpots' && (
                  <>
                    <div className="text-slate-400 flex items-center gap-2">
                      <AlertTriangle size={14} className="text-red-400" />
                      High error rate on queenside
                    </div>
                    <div className="text-slate-400 flex items-center gap-2">
                      <Activity size={14} className="text-orange-400" />
                      Tactical vigilance needed in center
                    </div>
                  </>
                )}
                
                {selectedMap === 'timeDistribution' && (
                  <>
                    <div className="text-slate-400 flex items-center gap-2">
                      <Clock size={14} className="text-blue-400" />
                      Heavy thinking on complex squares
                    </div>
                    <div className="text-slate-400 flex items-center gap-2">
                      <Target size={14} className="text-cyan-400" />
                      Quick decisions on flank moves
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase-specific Analysis for Square Control */}
      {selectedMap === 'squareControl' && (
        <div className={`
          bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
          command-panel
        `}>
          <div className="flex items-center gap-3 mb-6">
            <Activity size={20} className="text-purple-400" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">
              Phase Analysis
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(heatMaps.squareControl).map(([phase, data]) => {
              const flatData = data.flat()
              const avgValue = flatData.reduce((sum, val) => sum + val, 0) / flatData.length
              
              return (
                <div key={phase} className="text-center space-y-3">
                  <h4 className="font-medium text-white capitalize">{phase}</h4>
                  
                  {/* Mini heat map preview */}
                  <div className="mx-auto w-16 h-16 grid grid-cols-8 gap-0 border border-slate-600 rounded overflow-hidden">
                    {data.map((row, rIndex) =>
                      row.map((value, cIndex) => {
                        const intensity = value / Math.max(...flatData)
                        return (
                          <div
                            key={`${rIndex}-${cIndex}`}
                            className="w-full h-full"
                            style={{
                              backgroundColor: `rgba(34, 197, 94, ${intensity * 0.6})`
                            }}
                          />
                        )
                      })
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-green-400">
                      {avgValue.toFixed(1)}
                    </div>
                    <div className="text-xs text-slate-400">avg control</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Success Rate Analysis */}
      {selectedMap !== 'blunderSpots' && (
        <div className={`
          bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6
          command-panel
        `}>
          <div className="flex items-center gap-3 mb-6">
            <Target size={20} className="text-green-400" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wide">
              Success Rate by Square Type
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(heatMaps.successRates).map(([type, data]) => {
              const flatData = data.flat()
              const avgSuccess = flatData.reduce((sum, val) => sum + val, 0) / flatData.length
              const highSuccess = flatData.filter(val => val > 80).length
              
              return (
                <div key={type} className="space-y-4">
                  <h4 className="font-medium text-white capitalize">{type}</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">Average Success:</span>
                      <span className="text-white font-medium">{avgSuccess.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-400">High Success Squares:</span>
                      <span className="text-green-400 font-medium">{highSuccess}</span>
                    </div>
                    
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div 
                        className={`h-full bg-gradient-to-r ${theme.primary} rounded-full transition-all duration-500`}
                        style={{ width: `${avgSuccess}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default PositionHeatMap