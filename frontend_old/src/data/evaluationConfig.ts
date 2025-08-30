/**
 * Chess position evaluation thresholds and display configurations
 * Extracted from EvaluationBar.tsx and GameAnalysis.tsx components
 */

/**
 * Evaluation thresholds for determining position assessment
 */
export const evaluationThresholds = {
  // Basic evaluation categories
  equal: 0.3,
  slight: 0.7,
  clear: 1.5,
  winning: 3.0,
  
  // Detailed thresholds for descriptions
  descriptions: {
    completelyWinning: 3.0,
    winning: 1.5,
    clearAdvantage: 0.7,
    slightAdvantage: 0.3,
    equal: 0.3
  },
  
  // Time display color thresholds
  timeColors: {
    critical: 30000,  // 30 seconds - red
    warning: 60000,   // 1 minute - yellow
  }
} as const

/**
 * Evaluation color mappings for different ranges
 */
export const evaluationColors = {
  completelyWinning: 'text-green-400',
  winning: 'text-green-400',
  clearAdvantage: 'text-green-400',
  slightAdvantage: 'text-green-300',
  equal: 'text-yellow-400',
  slightDisadvantage: 'text-orange-400',
  clearDisadvantage: 'text-red-400',
  losing: 'text-red-400',
  completelyLosing: 'text-red-400'
} as const

/**
 * Get evaluation color based on score
 */
export const getEvaluationColor = (evaluation: number): string => {
  const abs = Math.abs(evaluation)
  
  if (abs >= evaluationThresholds.descriptions.completelyWinning) {
    return evaluation > 0 ? evaluationColors.completelyWinning : evaluationColors.completelyLosing
  }
  if (abs >= evaluationThresholds.descriptions.winning) {
    return evaluation > 0 ? evaluationColors.winning : evaluationColors.losing
  }
  if (abs >= evaluationThresholds.descriptions.clearAdvantage) {
    return evaluation > 0 ? evaluationColors.clearAdvantage : evaluationColors.clearDisadvantage
  }
  if (abs >= evaluationThresholds.descriptions.slightAdvantage) {
    return evaluation > 0 ? evaluationColors.slightAdvantage : evaluationColors.slightDisadvantage
  }
  
  return evaluationColors.equal
}

/**
 * Get evaluation description based on score
 */
export const getEvaluationDescription = (evaluation: number): string => {
  const abs = Math.abs(evaluation)
  
  if (abs < evaluationThresholds.descriptions.equal) return 'Equal'
  
  const isPositive = evaluation > 0
  
  if (abs < evaluationThresholds.descriptions.slightAdvantage) {
    return isPositive ? 'Slight advantage' : 'Slight disadvantage'
  }
  if (abs < evaluationThresholds.descriptions.clearAdvantage) {
    return isPositive ? 'Clear advantage' : 'Clear disadvantage'
  }
  if (abs < evaluationThresholds.descriptions.winning) {
    return isPositive ? 'Winning' : 'Losing'
  }
  
  return isPositive ? 'Completely winning' : 'Completely losing'
}

/**
 * Evaluation bar visual configuration
 */
export const evaluationBarConfig = {
  height: 6, // height in Tailwind classes (h-6)
  centerLineWidth: 1, // width in px
  animationDuration: 700, // milliseconds
  gradient: {
    white: 'from-green-400 to-emerald-500',
    black: 'from-red-400 to-orange-500'
  }
} as const

/**
 * Evaluation trend indicators configuration
 */
export const evaluationTrendIndicators = [
  {
    range: '-2.0+',
    label: 'Losing',
    color: 'text-red-400'
  },
  {
    range: '±0.5',
    label: 'Equal',
    color: 'text-yellow-400'
  },
  {
    range: '+2.0+',
    label: 'Winning',
    color: 'text-green-400'
  }
] as const

/**
 * Convert evaluation to percentage for progress bar (0-100)
 */
export const evaluationToPercentage = (evaluation: number): number => {
  return Math.max(0, Math.min(100, 50 + (evaluation * 20)))
}

/**
 * Move evaluation symbols for compact display
 */
export const evaluationSymbols = {
  excellent: '+++',
  great: '++',
  good: '+',
  equal: '=',
  inaccuracy: '−',
  mistake: '−−',
  blunder: '−−−'
} as const

/**
 * Get evaluation symbol based on score
 */
export const getEvaluationSymbol = (score: number): string => {
  if (score > 1.5) return evaluationSymbols.excellent
  if (score > 1) return evaluationSymbols.great
  if (score > 0.5) return evaluationSymbols.good
  if (score > -0.5) return evaluationSymbols.equal
  if (score > -1) return evaluationSymbols.inaccuracy
  if (score > -1.5) return evaluationSymbols.mistake
  return evaluationSymbols.blunder
}