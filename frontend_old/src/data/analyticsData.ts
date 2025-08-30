/**
 * Mock Analytics Data
 * Contains realistic mock data for detailed statistics and analytics
 */

import type { 
  DetailedStatistics,
  PerformanceMetrics,
  TrendAnalysis,
  OpeningRepertoire,
  WeaknessAnalysis,
  PositionHeatMaps,
  ComparativeAnalysis,
  GamePhaseAnalysis,
  AnalyticsTimePeriod
} from '@/types/detailedStats'

/**
 * Generate mock performance metrics
 */
export const generatePerformanceMetrics = (): PerformanceMetrics => ({
  overallRating: 'good',
  accuracy: 84.2,
  
  ratingProgression: {
    current: 1847,
    peak: 1932,
    change7d: +12,
    change30d: -23,
    predicted: 1890,
    confidenceInterval: 0.78
  },
  
  phasePerformance: {
    opening: {
      accuracy: 89.1,
      rating: 'excellent',
      gamesPlayed: 245,
      improvement: +5.2
    },
    middlegame: {
      accuracy: 81.7,
      rating: 'good',
      gamesPlayed: 245,
      improvement: +2.1
    },
    endgame: {
      accuracy: 76.3,
      rating: 'average',
      gamesPlayed: 189,
      improvement: -1.3
    }
  },
  
  tacticalPerformance: {
    puzzleRating: 2134,
    solvingAccuracy: 87.6,
    avgSolveTime: 42.3,
    bestStreak: 23,
    currentStreak: 7,
    patternStrengths: {
      pin: { accuracy: 91.2, count: 45, avgTime: 28.1 },
      fork: { accuracy: 88.7, count: 67, avgTime: 35.4 },
      skewer: { accuracy: 85.1, count: 23, avgTime: 31.2 },
      discovered_attack: { accuracy: 79.3, count: 34, avgTime: 48.7 },
      double_attack: { accuracy: 86.9, count: 56, avgTime: 38.2 },
      deflection: { accuracy: 82.4, count: 41, avgTime: 44.1 },
      decoy: { accuracy: 77.8, count: 29, avgTime: 52.3 },
      clearance: { accuracy: 74.2, count: 18, avgTime: 58.9 },
      interference: { accuracy: 71.5, count: 12, avgTime: 61.4 },
      zugzwang: { accuracy: 68.9, count: 8, avgTime: 72.1 },
      sacrifice: { accuracy: 75.6, count: 22, avgTime: 67.8 },
      back_rank: { accuracy: 92.3, count: 31, avgTime: 24.7 },
      smothered_mate: { accuracy: 94.1, count: 17, avgTime: 19.3 },
      x_ray: { accuracy: 81.7, count: 26, avgTime: 41.2 }
    }
  },
  
  timeManagement: {
    avgThinkingTime: 47.3,
    timePerMove: 23.1,
    blundersByTimeSpent: [
      { timeRange: '0-10s', blunderRate: 8.7 },
      { timeRange: '10-30s', blunderRate: 4.2 },
      { timeRange: '30-60s', blunderRate: 2.8 },
      { timeRange: '60s+', blunderRate: 1.9 }
    ],
    timeDistribution: {
      opening: 18.2,
      middlegame: 58.4,
      endgame: 23.4
    }
  },
  
  evaluationAccuracy: {
    positionAssessment: 78.9,
    calculateVariations: 71.4,
    findTactics: 85.2,
    endgameTechnique: 69.7
  }
})

/**
 * Generate mock trend analysis data
 */
export const generateTrendAnalysis = (): TrendAnalysis => {
  const generateRatingHistory = () => {
    const data = []
    let baseRating = 1650
    const today = new Date()
    
    for (let i = 90; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      // Add some realistic variance
      baseRating += (Math.random() - 0.5) * 20
      baseRating = Math.max(1400, Math.min(2000, baseRating))
      
      data.push({
        date: date.toISOString().split('T')[0],
        rating: Math.round(baseRating),
        gameType: ['classical', 'rapid', 'blitz', 'puzzle'][Math.floor(Math.random() * 4)] as any,
        confidence: 0.8 + Math.random() * 0.2
      })
    }
    
    return data
  }

  return {
    ratingTrends: generateRatingHistory(),
    
    performanceTrends: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      category: ['Tactics', 'Openings', 'Endgames', 'Time Management'][i % 4],
      value: 70 + Math.random() * 30,
      benchmark: 75
    })),
    
    activityPatterns: {
      dailyActivity: Array.from({ length: 14 }, (_, i) => ({
        day: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        games: Math.floor(Math.random() * 8),
        puzzles: Math.floor(Math.random() * 25),
        studyTime: Math.floor(Math.random() * 120)
      })),
      weeklyPattern: {
        Monday: 85,
        Tuesday: 92,
        Wednesday: 78,
        Thursday: 88,
        Friday: 95,
        Saturday: 110,
        Sunday: 105
      },
      monthlyPattern: {
        Week1: 87,
        Week2: 94,
        Week3: 89,
        Week4: 82
      }
    },
    
    learningCurve: {
      improvementRate: 2.3,
      plateauPeriods: [
        { start: '2024-06-15', end: '2024-07-22', duration: 37 },
        { start: '2024-04-10', end: '2024-05-02', duration: 22 }
      ],
      breakthroughPoints: [
        { date: '2024-07-23', improvement: 45, catalyst: 'Endgame study focus' },
        { date: '2024-05-03', improvement: 32, catalyst: 'Tactical pattern recognition' }
      ]
    },
    
    predictions: {
      ratingProjection: Array.from({ length: 12 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() + i)
        return {
          date: date.toISOString().split('T')[0],
          predicted: 1847 + i * 8 + Math.random() * 10,
          lower: 1847 + i * 5,
          upper: 1847 + i * 12
        }
      }),
      skillDevelopment: {
        tactics: { current: 85.2, projected3m: 87.8, projected6m: 89.5, projected1y: 92.1 },
        openings: { current: 78.6, projected3m: 81.2, projected6m: 84.1, projected1y: 87.9 },
        endgames: { current: 72.1, projected3m: 75.8, projected6m: 79.4, projected1y: 83.7 },
        positional: { current: 79.3, projected3m: 81.7, projected6m: 83.9, projected1y: 86.8 }
      }
    }
  }
}

/**
 * Generate mock opening repertoire data
 */
export const generateOpeningRepertoire = (): OpeningRepertoire => ({
  repertoireStats: {
    e4_open: {
      gamesPlayed: 89,
      winRate: 64.0,
      drawRate: 22.5,
      lossRate: 13.5,
      avgRatingOpponent: 1834,
      performance: 1912
    },
    e4_semi_open: {
      gamesPlayed: 67,
      winRate: 58.2,
      drawRate: 25.4,
      lossRate: 16.4,
      avgRatingOpponent: 1851,
      performance: 1876
    },
    d4_queens_gambit: {
      gamesPlayed: 45,
      winRate: 62.2,
      drawRate: 24.4,
      lossRate: 13.3,
      avgRatingOpponent: 1823,
      performance: 1889
    },
    d4_indian: {
      gamesPlayed: 34,
      winRate: 55.9,
      drawRate: 29.4,
      lossRate: 14.7,
      avgRatingOpponent: 1867,
      performance: 1854
    },
    english: {
      gamesPlayed: 28,
      winRate: 60.7,
      drawRate: 21.4,
      lossRate: 17.9,
      avgRatingOpponent: 1845,
      performance: 1881
    },
    reti: {
      gamesPlayed: 15,
      winRate: 66.7,
      drawRate: 20.0,
      lossRate: 13.3,
      avgRatingOpponent: 1812,
      performance: 1924
    },
    bird: {
      gamesPlayed: 8,
      winRate: 62.5,
      drawRate: 25.0,
      lossRate: 12.5,
      avgRatingOpponent: 1798,
      performance: 1887
    },
    larsen: {
      gamesPlayed: 3,
      winRate: 33.3,
      drawRate: 33.3,
      lossRate: 33.3,
      avgRatingOpponent: 1889,
      performance: 1789
    },
    nimzowitsch: {
      gamesPlayed: 2,
      winRate: 50.0,
      drawRate: 50.0,
      lossRate: 0.0,
      avgRatingOpponent: 1845,
      performance: 1870
    }
  },
  
  topOpenings: [
    {
      name: 'Ruy Lopez, Berlin Defense',
      eco: 'C65',
      frequency: 23.4,
      winRate: 71.2,
      lastPlayed: '2024-08-25',
      trend: 'improving'
    },
    {
      name: 'Queen\'s Gambit Declined',
      eco: 'D37',
      frequency: 18.7,
      winRate: 65.8,
      lastPlayed: '2024-08-24',
      trend: 'stable'
    },
    {
      name: 'Sicilian Defense, Najdorf',
      eco: 'B90',
      frequency: 15.2,
      winRate: 58.3,
      lastPlayed: '2024-08-23',
      trend: 'declining'
    },
    {
      name: 'King\'s Indian Defense',
      eco: 'E97',
      frequency: 12.9,
      winRate: 54.1,
      lastPlayed: '2024-08-22',
      trend: 'stable'
    },
    {
      name: 'English Opening',
      eco: 'A20',
      frequency: 9.8,
      winRate: 67.4,
      lastPlayed: '2024-08-21',
      trend: 'improving'
    }
  ],
  
  preparation: {
    depthKnown: {
      'Ruy Lopez Main Lines': 15,
      'Queen\'s Gambit Declined': 12,
      'Sicilian Najdorf': 18,
      'King\'s Indian Attack': 10,
      'English Opening': 8
    },
    theoryGaps: [
      {
        opening: 'Ruy Lopez',
        line: 'Berlin Defense, l\'Hermet Variation',
        priority: 'high',
        studyTime: 180
      },
      {
        opening: 'Queen\'s Gambit',
        line: 'Semi-Slav Defense',
        priority: 'medium',
        studyTime: 120
      },
      {
        opening: 'Sicilian Defense',
        line: 'Najdorf, English Attack',
        priority: 'high',
        studyTime: 240
      }
    ],
    novelties: [
      {
        position: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R',
        move: 'Bc4',
        date: '2024-08-15',
        success: true
      },
      {
        position: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR',
        move: 'Nf3',
        date: '2024-08-10',
        success: false
      }
    ]
  },
  
  byColor: {
    white: {
      mainSystems: ['1.e4', '1.d4', '1.Nf3', '1.c4'],
      winRate: 58.7,
      avgGameLength: 42.3
    },
    black: {
      defenses: ['Sicilian Defense', 'French Defense', 'Queen\'s Gambit Declined', 'King\'s Indian Defense'],
      winRate: 45.2,
      avgGameLength: 38.9
    }
  }
})

/**
 * Generate mock weakness analysis
 */
export const generateWeaknessAnalysis = (): WeaknessAnalysis => ({
  identifiedWeaknesses: [
    {
      category: 'Endgame Technique',
      description: 'Struggles with basic rook endgames and pawn promotion timing',
      severity: 'high',
      frequency: 23,
      impactOnRating: -45,
      examples: [
        {
          gameId: 'game_123',
          position: '8/8/8/8/8/3k4/8/3K3R w - - 0 1',
          description: 'Missed winning technique in Lucena position'
        }
      ]
    },
    {
      category: 'Time Management',
      description: 'Spends too much time on routine positional moves',
      severity: 'medium',
      frequency: 18,
      impactOnRating: -28,
      examples: []
    },
    {
      category: 'Opening Theory',
      description: 'Limited knowledge in sharp theoretical lines',
      severity: 'medium',
      frequency: 15,
      impactOnRating: -32,
      examples: []
    }
  ],
  
  recommendations: [
    {
      weakness: 'Endgame Technique',
      priority: 1,
      studyPlan: [
        {
          activity: 'Study basic rook endgames',
          duration: '2 weeks',
          resources: ['Dvoretsky\'s Endgame Manual', 'ChessKing Endgame Course']
        },
        {
          activity: 'Practice endgame puzzles daily',
          duration: 'Ongoing',
          resources: ['Chess.com Endgame Puzzles', 'Lichess Practice']
        }
      ],
      expectedImprovement: {
        timeframe: '3 months',
        ratingGain: 35,
        confidence: 0.82
      }
    }
  ],
  
  improvementTracking: {
    'Endgame Technique': {
      identified: '2024-06-15',
      currentSeverity: 6.2,
      initialSeverity: 8.1,
      lastReview: '2024-08-20',
      improvements: [
        {
          date: '2024-07-01',
          progress: 1.2,
          notes: 'Completed basic rook endgame course'
        },
        {
          date: '2024-08-01',
          progress: 0.7,
          notes: 'Improved conversion rate in practice games'
        }
      ]
    }
  },
  
  patternWeaknesses: [
    {
      pattern: 'zugzwang',
      missRate: 31.1,
      avgTimeToRecognize: 72.1,
      commonMistakes: ['Moving too quickly', 'Not recognizing stalemate tricks'],
      trainingNeeded: 40
    },
    {
      pattern: 'interference',
      missRate: 28.5,
      avgTimeToRecognize: 61.4,
      commonMistakes: ['Overlooking defender interference', 'Wrong piece choice'],
      trainingNeeded: 35
    }
  ]
})

/**
 * Generate mock position heat maps
 */
export const generatePositionHeatMaps = (): PositionHeatMaps => {
  const generateHeatMap = () => 
    Array.from({ length: 8 }, () => 
      Array.from({ length: 8 }, () => Math.floor(Math.random() * 100))
    )

  return {
    pieceActivity: {
      white: {
        'queen': generateHeatMap(),
        'rook': generateHeatMap(),
        'bishop': generateHeatMap(),
        'knight': generateHeatMap(),
        'king': generateHeatMap(),
        'pawn': generateHeatMap()
      },
      black: {
        'queen': generateHeatMap(),
        'rook': generateHeatMap(),
        'bishop': generateHeatMap(),
        'knight': generateHeatMap(),
        'king': generateHeatMap(),
        'pawn': generateHeatMap()
      }
    },
    
    squareControl: {
      opening: generateHeatMap(),
      middlegame: generateHeatMap(),
      endgame: generateHeatMap()
    },
    
    blunderSpots: generateHeatMap(),
    timeDistribution: generateHeatMap(),
    
    successRates: {
      attacks: generateHeatMap(),
      defenses: generateHeatMap(),
      positional: generateHeatMap()
    }
  }
}

/**
 * Generate mock comparative analysis
 */
export const generateComparativeAnalysis = (): ComparativeAnalysis => ({
  peerGroup: {
    ratingRange: [1750, 1950],
    sampleSize: 15420,
    timeControl: ['classical', 'rapid']
  },
  
  comparison: {
    ratingPercentile: 67,
    accuracyPercentile: 73,
    improvementRate: 1.8,
    activenessPercentile: 89
  },
  
  relativeStrengths: [
    { skill: 'Tactical Vision', yourLevel: 87, peerAverage: 78, percentile: 84 },
    { skill: 'Opening Knowledge', yourLevel: 82, peerAverage: 79, percentile: 71 },
    { skill: 'Time Management', yourLevel: 76, peerAverage: 81, percentile: 42 },
    { skill: 'Endgame Technique', yourLevel: 71, peerAverage: 77, percentile: 35 }
  ],
  
  improvementAreas: [
    { skill: 'Endgame Technique', gap: -6, priority: 1, catchUpTime: '2-3 months' },
    { skill: 'Time Management', gap: -5, priority: 2, catchUpTime: '1-2 months' },
    { skill: 'Positional Understanding', gap: -3, priority: 3, catchUpTime: '3-4 months' }
  ],
  
  similarPlayers: [
    {
      playerId: 'player_456',
      username: 'TacticalMaster2024',
      similarity: 0.89,
      commonStrengths: ['Tactical Vision', 'Opening Preparation'],
      commonWeaknesses: ['Endgame Technique', 'Time Management'],
      ratingDifference: +23
    },
    {
      playerId: 'player_789',
      username: 'PositionalPlayer',
      similarity: 0.84,
      commonStrengths: ['Opening Knowledge', 'Calculation'],
      commonWeaknesses: ['Endgame Conversion'],
      ratingDifference: -15
    }
  ]
})

/**
 * Generate mock game phase analysis
 */
export const generateGamePhaseAnalysis = (): GamePhaseAnalysis => ({
  opening: {
    accuracy: 89.1,
    bookMoves: 12.4,
    noveltySuccess: 0.67,
    timeSpent: 18.2,
    advantageGained: 0.23,
    commonMistakes: [
      {
        position: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR',
        mistake: 'Playing too fast without considering opponent\'s setup',
        frequency: 12
      },
      {
        position: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R',
        mistake: 'Missing tactical shots in Italian Game',
        frequency: 8
      }
    ]
  },
  
  middlegame: {
    tacticalAccuracy: 81.7,
    positionalUnderstanding: 76.4,
    planExecution: 78.9,
    timeManagement: 72.1,
    complexityHandling: 74.8,
    mostDifficultPhase: true
  },
  
  endgame: {
    technique: 69.7,
    calculation: 75.3,
    conversion: 71.2,
    defense: 78.6,
    knownPositions: 82.4,
    tablebaseAccuracy: 94.1
  },
  
  transitions: {
    openingToMiddlegame: {
      smoothness: 84.2,
      advantageMaintained: 76.8
    },
    middlegameToEndgame: {
      simplification: 79.3,
      preparation: 73.7
    }
  }
})

/**
 * Main function to generate complete detailed statistics
 */
export const generateDetailedStatistics = (
  userId: string = 'demo-user',
  timePeriod: AnalyticsTimePeriod = '30d'
): DetailedStatistics => ({
  userId,
  lastUpdated: new Date().toISOString(),
  analysisPeriod: timePeriod,
  
  performance: generatePerformanceMetrics(),
  trends: generateTrendAnalysis(),
  openings: generateOpeningRepertoire(),
  weaknesses: generateWeaknessAnalysis(),
  heatMaps: generatePositionHeatMaps(),
  comparative: generateComparativeAnalysis(),
  gamePhases: generateGamePhaseAnalysis(),
  
  summary: {
    totalGames: 291,
    totalPuzzles: 1847,
    studyHours: 127.5,
    ratingChange: +97,
    majorMilestones: [
      {
        date: '2024-08-15',
        milestone: 'Rating Peak',
        description: 'Reached personal best rating of 1932'
      },
      {
        date: '2024-07-20',
        milestone: 'Study Milestone',
        description: 'Completed 100 hours of focused study'
      },
      {
        date: '2024-06-30',
        milestone: 'Puzzle Achievement',
        description: 'Solved 1000th tactical puzzle'
      }
    ]
  }
})

/**
 * Mock data for different time periods
 */
export const mockAnalyticsData = {
  '7d': generateDetailedStatistics('demo-user', '7d'),
  '30d': generateDetailedStatistics('demo-user', '30d'),
  '90d': generateDetailedStatistics('demo-user', '90d'),
  '1y': generateDetailedStatistics('demo-user', '1y'),
  'all': generateDetailedStatistics('demo-user', 'all')
}

/**
 * Chart color schemes for different themes
 */
export const chartColorSchemes = {
  'cyber-neon': {
    primary: '#4ade80',
    secondary: '#3b82f6',
    accent: '#f59e0b',
    gradient: ['#4ade80', '#3b82f6', '#8b5cf6', '#f59e0b'],
    background: 'rgba(30, 41, 59, 0.8)'
  },
  'dragon-gold': {
    primary: '#fbbf24',
    secondary: '#ef4444',
    accent: '#f97316',
    gradient: ['#fbbf24', '#f97316', '#ef4444', '#dc2626'],
    background: 'rgba(41, 37, 36, 0.8)'
  },
  'shadow-knight': {
    primary: '#9ca3af',
    secondary: '#6366f1',
    accent: '#8b5cf6',
    gradient: ['#9ca3af', '#6b7280', '#6366f1', '#8b5cf6'],
    background: 'rgba(31, 41, 55, 0.8)'
  },
  'emerald-matrix': {
    primary: '#10b981',
    secondary: '#14b8a6',
    accent: '#84cc16',
    gradient: ['#10b981', '#14b8a6', '#06b6d4', '#84cc16'],
    background: 'rgba(20, 83, 45, 0.8)'
  },
  'crimson-war': {
    primary: '#ef4444',
    secondary: '#f97316',
    accent: '#ec4899',
    gradient: ['#ef4444', '#dc2626', '#f97316', '#ec4899'],
    background: 'rgba(69, 26, 3, 0.8)'
  }
}