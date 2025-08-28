/**
 * Detailed Statistics Types
 * Contains all TypeScript interfaces and types for advanced analytics and detailed statistics
 */

/**
 * Time period options for analytics
 */
export type AnalyticsTimePeriod = '7d' | '30d' | '90d' | '1y' | 'all'

/**
 * Chart type options for visualizations
 */
export type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'scatter' | 'heatmap'

/**
 * Performance rating categories
 */
export type PerformanceRating = 'excellent' | 'good' | 'average' | 'below_average' | 'needs_improvement'

/**
 * Chess game phases
 */
export type GamePhase = 'opening' | 'middlegame' | 'endgame'

/**
 * Tactical pattern types
 */
export type TacticalPattern = 
  | 'pin' | 'fork' | 'skewer' | 'discovered_attack' | 'double_attack'
  | 'deflection' | 'decoy' | 'clearance' | 'interference' | 'zugzwang'
  | 'sacrifice' | 'back_rank' | 'smothered_mate' | 'x_ray'

/**
 * Opening classification system
 */
export type OpeningSystem = 
  | 'e4_open' | 'e4_semi_open' | 'd4_queens_gambit' | 'd4_indian'
  | 'english' | 'reti' | 'bird' | 'larsen' | 'nimzowitsch'

/**
 * Performance metrics for different aspects of chess
 */
export interface PerformanceMetrics {
  /** Overall performance rating */
  overallRating: PerformanceRating
  
  /** Overall accuracy percentage */
  accuracy: number
  
  /** Rating progression data */
  ratingProgression: {
    current: number
    peak: number
    change7d: number
    change30d: number
    predicted: number
    confidenceInterval: number
  }
  
  /** Performance by game phase */
  phasePerformance: Record<GamePhase, {
    accuracy: number
    rating: PerformanceRating
    gamesPlayed: number
    improvement: number
  }>
  
  /** Tactical performance */
  tacticalPerformance: {
    puzzleRating: number
    solvingAccuracy: number
    avgSolveTime: number
    bestStreak: number
    currentStreak: number
    patternStrengths: Record<TacticalPattern, {
      accuracy: number
      count: number
      avgTime: number
    }>
  }
  
  /** Time management statistics */
  timeManagement: {
    avgThinkingTime: number
    timePerMove: number
    blundersByTimeSpent: Array<{
      timeRange: string
      blunderRate: number
    }>
    timeDistribution: {
      opening: number
      middlegame: number
      endgame: number
    }
  }
  
  /** Position evaluation accuracy */
  evaluationAccuracy: {
    positionAssessment: number
    calculateVariations: number
    findTactics: number
    endgameTechnique: number
  }
}

/**
 * Trend analysis data for various metrics
 */
export interface TrendAnalysis {
  /** Rating trends over time */
  ratingTrends: Array<{
    date: string
    rating: number
    gameType: 'classical' | 'rapid' | 'blitz' | 'puzzle'
    confidence: number
  }>
  
  /** Performance trends by category */
  performanceTrends: Array<{
    date: string
    category: string
    value: number
    benchmark: number
  }>
  
  /** Activity patterns */
  activityPatterns: {
    dailyActivity: Array<{
      day: string
      games: number
      puzzles: number
      studyTime: number
    }>
    weeklyPattern: Record<string, number>
    monthlyPattern: Record<string, number>
  }
  
  /** Learning curve analysis */
  learningCurve: {
    improvementRate: number
    plateauPeriods: Array<{
      start: string
      end: string
      duration: number
    }>
    breakthroughPoints: Array<{
      date: string
      improvement: number
      catalyst: string
    }>
  }
  
  /** Prediction models */
  predictions: {
    ratingProjection: Array<{
      date: string
      predicted: number
      lower: number
      upper: number
    }>
    skillDevelopment: Record<string, {
      current: number
      projected3m: number
      projected6m: number
      projected1y: number
    }>
  }
}

/**
 * Opening repertoire statistics and analysis
 */
export interface OpeningRepertoire {
  /** Opening statistics by system */
  repertoireStats: Record<OpeningSystem, {
    gamesPlayed: number
    winRate: number
    drawRate: number
    lossRate: number
    avgRatingOpponent: number
    performance: number
  }>
  
  /** Most played openings */
  topOpenings: Array<{
    name: string
    eco: string
    frequency: number
    winRate: number
    lastPlayed: string
    trend: 'improving' | 'declining' | 'stable'
  }>
  
  /** Opening preparation level */
  preparation: {
    depthKnown: Record<string, number>
    theoryGaps: Array<{
      opening: string
      line: string
      priority: 'high' | 'medium' | 'low'
      studyTime: number
    }>
    novelties: Array<{
      position: string
      move: string
      date: string
      success: boolean
    }>
  }
  
  /** Color-specific statistics */
  byColor: {
    white: {
      mainSystems: string[]
      winRate: number
      avgGameLength: number
    }
    black: {
      defenses: string[]
      winRate: number
      avgGameLength: number
    }
  }
}

/**
 * Weakness identification and improvement recommendations
 */
export interface WeaknessAnalysis {
  /** Identified weaknesses with severity */
  identifiedWeaknesses: Array<{
    category: string
    description: string
    severity: 'critical' | 'high' | 'medium' | 'low'
    frequency: number
    impactOnRating: number
    examples: Array<{
      gameId: string
      position: string
      description: string
    }>
  }>
  
  /** Improvement recommendations */
  recommendations: Array<{
    weakness: string
    priority: number
    studyPlan: Array<{
      activity: string
      duration: string
      resources: string[]
    }>
    expectedImprovement: {
      timeframe: string
      ratingGain: number
      confidence: number
    }
  }>
  
  /** Progress tracking for weaknesses */
  improvementTracking: Record<string, {
    identified: string
    currentSeverity: number
    initialSeverity: number
    lastReview: string
    improvements: Array<{
      date: string
      progress: number
      notes: string
    }>
  }>
  
  /** Pattern recognition weaknesses */
  patternWeaknesses: Array<{
    pattern: TacticalPattern
    missRate: number
    avgTimeToRecognize: number
    commonMistakes: string[]
    trainingNeeded: number
  }>
}

/**
 * Heat map data for board position analysis
 */
export interface PositionHeatMaps {
  /** Piece activity heat maps */
  pieceActivity: Record<'white' | 'black', Record<string, Array<Array<number>>>>
  
  /** Square control analysis */
  squareControl: {
    opening: Array<Array<number>>
    middlegame: Array<Array<number>>
    endgame: Array<Array<number>>
  }
  
  /** Blunder hot spots */
  blunderSpots: Array<Array<number>>
  
  /** Time spent per square */
  timeDistribution: Array<Array<number>>
  
  /** Success rate by square */
  successRates: {
    attacks: Array<Array<number>>
    defenses: Array<Array<number>>
    positional: Array<Array<number>>
  }
}

/**
 * Comparative analysis vs peers
 */
export interface ComparativeAnalysis {
  /** Peer group definition */
  peerGroup: {
    ratingRange: [number, number]
    sampleSize: number
    timeControl: string[]
  }
  
  /** Performance comparison */
  comparison: {
    ratingPercentile: number
    accuracyPercentile: number
    improvementRate: number
    activenessPercentile: number
  }
  
  /** Strengths vs peers */
  relativeStrengths: Array<{
    skill: string
    yourLevel: number
    peerAverage: number
    percentile: number
  }>
  
  /** Areas for improvement vs peers */
  improvementAreas: Array<{
    skill: string
    gap: number
    priority: number
    catchUpTime: string
  }>
  
  /** Similar players analysis */
  similarPlayers: Array<{
    playerId: string
    username: string
    similarity: number
    commonStrengths: string[]
    commonWeaknesses: string[]
    ratingDifference: number
  }>
}

/**
 * Comprehensive game phase analysis
 */
export interface GamePhaseAnalysis {
  /** Opening phase statistics */
  opening: {
    accuracy: number
    bookMoves: number
    noveltySuccess: number
    timeSpent: number
    advantageGained: number
    commonMistakes: Array<{
      position: string
      mistake: string
      frequency: number
    }>
  }
  
  /** Middlegame phase statistics */
  middlegame: {
    tacticalAccuracy: number
    positionalUnderstanding: number
    planExecution: number
    timeManagement: number
    complexityHandling: number
    mostDifficultPhase: boolean
  }
  
  /** Endgame phase statistics */
  endgame: {
    technique: number
    calculation: number
    conversion: number
    defense: number
    knownPositions: number
    tablebaseAccuracy: number
  }
  
  /** Transition analysis */
  transitions: {
    openingToMiddlegame: {
      smoothness: number
      advantageMaintained: number
    }
    middlegameToEndgame: {
      simplification: number
      preparation: number
    }
  }
}

/**
 * Main detailed statistics interface
 */
export interface DetailedStatistics {
  /** User identification */
  userId: string
  
  /** Last updated timestamp */
  lastUpdated: string
  
  /** Analysis period */
  analysisPeriod: AnalyticsTimePeriod
  
  /** Performance metrics */
  performance: PerformanceMetrics
  
  /** Trend analysis */
  trends: TrendAnalysis
  
  /** Opening repertoire */
  openings: OpeningRepertoire
  
  /** Weakness analysis */
  weaknesses: WeaknessAnalysis
  
  /** Position heat maps */
  heatMaps: PositionHeatMaps
  
  /** Comparative analysis */
  comparative: ComparativeAnalysis
  
  /** Game phase analysis */
  gamePhases: GamePhaseAnalysis
  
  /** Summary statistics */
  summary: {
    totalGames: number
    totalPuzzles: number
    studyHours: number
    ratingChange: number
    majorMilestones: Array<{
      date: string
      milestone: string
      description: string
    }>
  }
}

/**
 * Component props interfaces
 */
export interface PerformanceMetricsProps {
  metrics: PerformanceMetrics
  isLoading: boolean
  timePeriod: AnalyticsTimePeriod
  theme: any
}

export interface TrendAnalysisProps {
  trends: TrendAnalysis
  isLoading: boolean
  timePeriod: AnalyticsTimePeriod
  chartType: ChartType
  onChartTypeChange: (type: ChartType) => void
  theme: any
}

export interface WeaknessAnalysisProps {
  weaknesses: WeaknessAnalysis
  isLoading: boolean
  onRecommendationClick: (recommendation: any) => void
  theme: any
}

export interface PositionHeatMapProps {
  heatMaps: PositionHeatMaps
  selectedMap: keyof PositionHeatMaps
  onMapChange: (map: keyof PositionHeatMaps) => void
  isLoading: boolean
  theme: any
}

export interface ComparativeAnalysisProps {
  comparative: ComparativeAnalysis
  isLoading: boolean
  theme: any
}

export interface GamePhaseAnalysisProps {
  gamePhases: GamePhaseAnalysis
  selectedPhase: GamePhase
  onPhaseChange: (phase: GamePhase) => void
  isLoading: boolean
  theme: any
}

/**
 * Hook return type for useDetailedStats
 */
export interface DetailedStatsHookReturn {
  // Data
  statistics: DetailedStatistics | null
  isLoading: boolean
  error: string | null
  
  // UI State
  selectedTimePeriod: AnalyticsTimePeriod
  selectedChartType: ChartType
  selectedGamePhase: GamePhase
  selectedHeatMap: keyof PositionHeatMaps
  
  // Actions
  setTimePeriod: (period: AnalyticsTimePeriod) => void
  setChartType: (type: ChartType) => void
  setGamePhase: (phase: GamePhase) => void
  setHeatMap: (map: keyof PositionHeatMaps) => void
  refreshData: () => Promise<void>
  exportData: (format: 'json' | 'csv' | 'pdf') => void
  
  // Error handling
  clearError: () => void
  
  // Computed values
  hasData: boolean
  dataQuality: 'excellent' | 'good' | 'limited' | 'insufficient'
}