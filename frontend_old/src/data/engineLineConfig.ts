/**
 * Engine analysis line display configurations
 * Extracted from EngineLines.tsx component
 */

import { Zap, Sparkles, Crown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Engine line display configuration
 */
export const engineLineConfig = {
  // Maximum moves to show in principal variation
  maxPvMoves: 8,
  
  // Animation and UI settings
  animation: {
    depthProgressDuration: 1000, // milliseconds
    glowEffect: true
  },
  
  // Color schemes for different line types
  colors: {
    bestLine: {
      gradient: 'from-yellow-400 to-orange-500',
      background: 'bg-yellow-400/10'
    },
    alternativeLine: {
      gradient: 'from-blue-400 to-purple-500',
      background: 'bg-blue-400/10'
    }
  },
  
  // Evaluation thresholds for line icons
  iconThresholds: {
    bigAdvantage: 2.0,
    tactical: 1.0
  }
} as const

/**
 * Get appropriate icon for analysis line based on evaluation and position
 */
export const getLineIcon = (index: number, evaluation: number): LucideIcon => {
  // Best line with big advantage gets crown
  if (index === 0 && Math.abs(evaluation) > engineLineConfig.iconThresholds.bigAdvantage) {
    return Crown
  }
  
  // Tactical lines get sparkles
  if (Math.abs(evaluation) > engineLineConfig.iconThresholds.tactical) {
    return Sparkles
  }
  
  // Normal lines get zap
  return Zap
}

/**
 * Format large numbers for display (nodes, nps)
 */
export const formatNodes = (nodes: number): string => {
  if (nodes >= 1000000) return `${(nodes / 1000000).toFixed(1)}M`
  if (nodes >= 1000) return `${(nodes / 1000).toFixed(0)}k`
  return nodes.toString()
}

/**
 * Engine analysis statistics display configuration
 */
export const analysisStatsConfig = {
  stats: [
    {
      key: 'depth',
      label: 'Depth',
      format: (value: number) => `D${value}`,
      description: 'Search depth in plies'
    },
    {
      key: 'nodes',
      label: 'Nodes',
      format: formatNodes,
      description: 'Positions evaluated'
    },
    {
      key: 'nps',
      label: 'NPS',
      format: (value: number) => `${(value / 1000000).toFixed(1)}M`,
      description: 'Nodes per second'
    },
    {
      key: 'time',
      label: 'Time',
      format: (value: number) => `${value.toFixed(1)}s`,
      description: 'Analysis time'
    }
  ]
} as const

/**
 * Principal variation move display configuration
 */
export const pvMoveConfig = {
  // Maximum moves to display inline
  maxInlineDisplay: 8,
  
  // Move formatting
  formatting: {
    showMoveNumbers: true,
    highlightOnHover: true,
    clickableMove: true
  },
  
  // Styling classes
  classes: {
    moveContainer: 'text-sm font-mono leading-relaxed bg-black/30 p-2 rounded border',
    move: 'mr-2 hover:bg-white/10 px-1 rounded cursor-pointer transition-colors',
    moveNumber: 'mr-1',
    continuation: 'opacity-60'
  }
} as const

/**
 * Engine line badge configuration
 */
export const engineLineBadgeConfig = {
  bestLine: {
    text: 'Best',
    className: 'text-xs border-green-400 text-green-400'
  },
  lineNumber: {
    className: (isBest: boolean) => 
      isBest ? 'text-xs font-bold border-yellow-400 text-yellow-400' : 'text-xs font-bold'
  }
} as const

/**
 * Mate evaluation display configuration
 */
export const mateDisplayConfig = {
  icon: '👑', // Crown icon for mate
  prefix: 'M',
  color: 'text-yellow-400'
} as const

/**
 * Analysis summary configuration
 */
export const analysisSummaryConfig = {
  display: {
    showTotalLines: true,
    showMaxDepth: true,
    showTotalNodes: true
  },
  
  formatting: {
    totalNodes: formatNodes,
    maxDepth: (depths: number[]) => Math.max(...depths),
    lineCount: (lines: any[]) => lines.length
  }
} as const