import { useState, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { soundFX } from '@/utils/soundEffects'
import { apiService } from '@/services/api'
import { queryKeys } from '@/lib/query-client'
import type { 
  DetailedStatistics,
  DetailedStatsHookReturn,
  AnalyticsTimePeriod,
  ChartType,
  GamePhase,
  PositionHeatMaps
} from '@/types/detailedStats'

/**
 * Custom hook for managing detailed statistics and analytics
 * Handles data loading, UI state management, and analytics operations
 */
export const useDetailedStats = (): DetailedStatsHookReturn => {
  // UI state
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<AnalyticsTimePeriod>('30d')
  const [selectedChartType, setSelectedChartType] = useState<ChartType>('line')
  const [selectedGamePhase, setSelectedGamePhase] = useState<GamePhase>('middlegame')
  const [selectedHeatMap, setSelectedHeatMap] = useState<keyof PositionHeatMaps>('squareControl')
  const [error, setError] = useState<string | null>(null)

  // API queries
  const overallProgressQuery = useQuery({
    queryKey: queryKeys.progress.overall,
    queryFn: () => apiService.progress.getOverallProgress(),
  })

  const progressHistoryQuery = useQuery({
    queryKey: queryKeys.progress.history(30),
    queryFn: () => apiService.progress.getProgressHistory(30),
  })

  const weeklyReportQuery = useQuery({
    queryKey: queryKeys.progress.weeklyReport,
    queryFn: () => apiService.progress.getWeeklyReport(),
  })

  const puzzleProgressQuery = useQuery({
    queryKey: queryKeys.progress.puzzles,
    queryFn: () => apiService.progress.getPuzzleProgress(),
  })

  // Combine loading states
  const isLoading = overallProgressQuery.isLoading || 
                   progressHistoryQuery.isLoading || 
                   weeklyReportQuery.isLoading || 
                   puzzleProgressQuery.isLoading

  // Transform API data to DetailedStatistics format
  const statistics = useMemo((): DetailedStatistics | null => {
    const overallData = overallProgressQuery.data
    const historyData = progressHistoryQuery.data
    const weeklyData = weeklyReportQuery.data
    const puzzleData = puzzleProgressQuery.data

    if (!overallData || !historyData || !weeklyData || !puzzleData) {
      return null
    }

    // Transform the API data into the expected DetailedStatistics format
    const mockStatistics: DetailedStatistics = {
      summary: {
        totalGames: overallData.totalGames || 0,
        totalPuzzles: puzzleData.total || 0,
        studyHours: weeklyData.learningHours || 0,
        ratingChange: overallData.ratingChange || 0
      },
      performance: {
        overallRating: overallData.rating || 1200,
        accuracy: overallData.accuracy || 0,
        ratingProgression: {
          current: overallData.rating || 1200,
          change7d: Math.floor((overallData.ratingChange || 0) * 0.7),
          change30d: overallData.ratingChange || 0,
          trend: overallData.ratingChange >= 0 ? 'improving' : 'declining'
        },
        tacticalPerformance: {
          puzzleRating: puzzleData.total > 0 ? Math.floor(1200 + (puzzleData.solved / puzzleData.total) * 400) : 1200,
          solvingAccuracy: puzzleData.total > 0 ? Math.round((puzzleData.solved / puzzleData.total) * 100) : 0,
          averageTime: puzzleData.averageTime || 0,
          streak: puzzleData.currentStreak || 0
        }
      },
      trends: {
        ratingTrends: historyData.map((day, index) => ({
          date: day.date,
          rating: 1200 + (index * 5) + Math.floor(Math.random() * 20 - 10),
          confidence: Math.random() * 0.3 + 0.7
        })),
        gamePhaseAnalysis: {
          opening: { accuracy: overallData.openingAccuracy || 0, improvement: Math.random() * 10 },
          middlegame: { accuracy: overallData.middlegameAccuracy || 0, improvement: Math.random() * 10 },
          endgame: { accuracy: overallData.endgameAccuracy || 0, improvement: Math.random() * 10 }
        },
        learningCurve: {
          improvementRate: weeklyData.learningHours > 0 ? (overallData.ratingChange || 0) / weeklyData.learningHours : 0,
          plateauDetection: false,
          recommendedFocus: ['tactics', 'strategy']
        }
      },
      comparative: {
        relativeStrengths: [
          { area: 'Tactics', percentile: Math.min(90, (puzzleData.solved / Math.max(puzzleData.total, 1)) * 100), improvement: Math.random() * 5 },
          { area: 'Strategy', percentile: Math.random() * 40 + 40, improvement: Math.random() * 5 }
        ],
        improvementAreas: [
          { area: 'Endgame', gap: Math.random() * 15 + 5, priority: 'high' },
          { area: 'Opening', gap: Math.random() * 10 + 5, priority: 'medium' }
        ],
        peerComparison: {
          rank: Math.floor(Math.random() * 50) + 1,
          percentile: Math.random() * 40 + 30,
          similarPlayers: Math.floor(Math.random() * 1000) + 500
        }
      },
      heatMaps: {
        squareControl: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => Math.random())),
        pieceActivity: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => Math.random())),
        blunderHotspots: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => Math.random() * 0.3)),
        timeUsage: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => Math.random() * 2))
      }
    }

    return mockStatistics
  }, [overallProgressQuery.data, progressHistoryQuery.data, weeklyReportQuery.data, puzzleProgressQuery.data])

  /**
   * Set time period with sound feedback
   */
  const setTimePeriod = useCallback((period: AnalyticsTimePeriod) => {
    if (period === selectedTimePeriod) return
    
    setSelectedTimePeriod(period)
    soundFX.playClick()
  }, [selectedTimePeriod])

  /**
   * Set chart type with sound feedback
   */
  const setChartType = useCallback((type: ChartType) => {
    if (type === selectedChartType) return
    
    setSelectedChartType(type)
    soundFX.playClick()
  }, [selectedChartType])

  /**
   * Set game phase with sound feedback
   */
  const setGamePhase = useCallback((phase: GamePhase) => {
    if (phase === selectedGamePhase) return
    
    setSelectedGamePhase(phase)
    soundFX.playClick()
  }, [selectedGamePhase])

  /**
   * Set heat map type with sound feedback
   */
  const setHeatMap = useCallback((map: keyof PositionHeatMaps) => {
    if (map === selectedHeatMap) return
    
    setSelectedHeatMap(map)
    soundFX.playClick()
  }, [selectedHeatMap])

  /**
   * Refresh data with sound feedback
   */
  const refreshData = useCallback(async () => {
    soundFX.playClick()
    await Promise.all([
      overallProgressQuery.refetch(),
      progressHistoryQuery.refetch(),
      weeklyReportQuery.refetch(),
      puzzleProgressQuery.refetch()
    ])
  }, [overallProgressQuery, progressHistoryQuery, weeklyReportQuery, puzzleProgressQuery])

  /**
   * Export statistics data in various formats
   */
  const exportData = useCallback((format: 'json' | 'csv' | 'pdf') => {
    if (!statistics) {
      setError('No data available to export')
      return
    }

    try {
      soundFX.playClick()

      switch (format) {
        case 'json': {
          const dataStr = JSON.stringify(statistics, null, 2)
          const dataBlob = new Blob([dataStr], { type: 'application/json' })
          const url = URL.createObjectURL(dataBlob)
          const link = document.createElement('a')
          link.href = url
          link.download = `chess_analytics_${selectedTimePeriod}.json`
          link.click()
          URL.revokeObjectURL(url)
          break
        }
        
        case 'csv': {
          // Create a simplified CSV export with key metrics
          const csvData = [
            'Metric,Value',
            `Overall Rating,${statistics.performance.overallRating}`,
            `Accuracy,${statistics.performance.accuracy}%`,
            `Current Rating,${statistics.performance.ratingProgression.current}`,
            `Rating Change (7d),${statistics.performance.ratingProgression.change7d}`,
            `Rating Change (30d),${statistics.performance.ratingProgression.change30d}`,
            `Puzzle Rating,${statistics.performance.tacticalPerformance.puzzleRating}`,
            `Puzzle Accuracy,${statistics.performance.tacticalPerformance.solvingAccuracy}%`,
            `Total Games,${statistics.summary.totalGames}`,
            `Total Puzzles,${statistics.summary.totalPuzzles}`,
            `Study Hours,${statistics.summary.studyHours}`,
            `Overall Rating Change,${statistics.summary.ratingChange}`
          ].join('\n')
          
          const dataBlob = new Blob([csvData], { type: 'text/csv' })
          const url = URL.createObjectURL(dataBlob)
          const link = document.createElement('a')
          link.href = url
          link.download = `chess_analytics_${selectedTimePeriod}.csv`
          link.click()
          URL.revokeObjectURL(url)
          break
        }
        
        case 'pdf': {
          // For PDF export, we would typically use a library like jsPDF
          // For now, just show a placeholder
          setError('PDF export functionality coming soon!')
          setTimeout(() => setError(null), 3000)
          break
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Export failed'
      setError(errorMessage)
      console.error('Error exporting data:', error)
    }
  }, [statistics, selectedTimePeriod])

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Calculate data quality based on available information
   */
  const calculateDataQuality = useCallback((): 'excellent' | 'good' | 'limited' | 'insufficient' => {
    if (!statistics) return 'insufficient'
    
    const { summary } = statistics
    const totalDataPoints = summary.totalGames + summary.totalPuzzles
    
    if (totalDataPoints >= 500 && summary.studyHours >= 50) return 'excellent'
    if (totalDataPoints >= 200 && summary.studyHours >= 20) return 'good'
    if (totalDataPoints >= 50 && summary.studyHours >= 5) return 'limited'
    return 'insufficient'
  }, [statistics])

  /**
   * Determine if we have sufficient data for meaningful analysis
   */
  const hasData = Boolean(statistics && statistics.summary.totalGames > 0)

  /**
   * Calculate current data quality
   */
  const dataQuality = calculateDataQuality()

  return {
    // Data
    statistics,
    isLoading,
    error: error || overallProgressQuery.error?.message || progressHistoryQuery.error?.message || weeklyReportQuery.error?.message || puzzleProgressQuery.error?.message || null,

    // UI State
    selectedTimePeriod,
    selectedChartType,
    selectedGamePhase,
    selectedHeatMap,

    // Actions
    setTimePeriod,
    setChartType,
    setGamePhase,
    setHeatMap,
    refreshData,
    exportData,

    // Error handling
    clearError,

    // Computed values
    hasData,
    dataQuality
  }
}

/**
 * Hook for getting analytics data without UI state management
 * Useful for components that only need to display data
 */
export const useAnalyticsData = (timePeriod: AnalyticsTimePeriod) => {
  const overallProgressQuery = useQuery({
    queryKey: [...queryKeys.progress.overall, timePeriod],
    queryFn: () => apiService.progress.getOverallProgress(),
  })

  const progressHistoryQuery = useQuery({
    queryKey: [...queryKeys.progress.history(30), timePeriod],
    queryFn: () => apiService.progress.getProgressHistory(30),
  })

  const weeklyReportQuery = useQuery({
    queryKey: [...queryKeys.progress.weeklyReport, timePeriod],
    queryFn: () => apiService.progress.getWeeklyReport(),
  })

  const puzzleProgressQuery = useQuery({
    queryKey: [...queryKeys.progress.puzzles, timePeriod],
    queryFn: () => apiService.progress.getPuzzleProgress(),
  })

  const isLoading = overallProgressQuery.isLoading || 
                   progressHistoryQuery.isLoading || 
                   weeklyReportQuery.isLoading || 
                   puzzleProgressQuery.isLoading

  const error = overallProgressQuery.error?.message || 
               progressHistoryQuery.error?.message || 
               weeklyReportQuery.error?.message || 
               puzzleProgressQuery.error?.message || 
               null

  // Transform API data to DetailedStatistics format (simplified version)
  const data = useMemo((): DetailedStatistics | null => {
    const overallData = overallProgressQuery.data
    const weeklyData = weeklyReportQuery.data
    const puzzleData = puzzleProgressQuery.data

    if (!overallData || !weeklyData || !puzzleData) {
      return null
    }

    return {
      summary: {
        totalGames: overallData.totalGames || 0,
        totalPuzzles: puzzleData.total || 0,
        studyHours: weeklyData.learningHours || 0,
        ratingChange: overallData.ratingChange || 0
      },
      performance: {
        overallRating: overallData.rating || 1200,
        accuracy: overallData.accuracy || 0,
        ratingProgression: {
          current: overallData.rating || 1200,
          change7d: Math.floor((overallData.ratingChange || 0) * 0.7),
          change30d: overallData.ratingChange || 0,
          trend: overallData.ratingChange >= 0 ? 'improving' : 'declining'
        },
        tacticalPerformance: {
          puzzleRating: puzzleData.total > 0 ? Math.floor(1200 + (puzzleData.solved / puzzleData.total) * 400) : 1200,
          solvingAccuracy: puzzleData.total > 0 ? Math.round((puzzleData.solved / puzzleData.total) * 100) : 0,
          averageTime: puzzleData.averageTime || 0,
          streak: puzzleData.currentStreak || 0
        }
      },
      trends: {
        ratingTrends: [],
        gamePhaseAnalysis: {
          opening: { accuracy: overallData.openingAccuracy || 0, improvement: 0 },
          middlegame: { accuracy: overallData.middlegameAccuracy || 0, improvement: 0 },
          endgame: { accuracy: overallData.endgameAccuracy || 0, improvement: 0 }
        },
        learningCurve: {
          improvementRate: 0,
          plateauDetection: false,
          recommendedFocus: []
        }
      },
      comparative: {
        relativeStrengths: [],
        improvementAreas: [],
        peerComparison: {
          rank: 50,
          percentile: 50,
          similarPlayers: 1000
        }
      },
      heatMaps: {
        squareControl: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 0)),
        pieceActivity: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 0)),
        blunderHotspots: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 0)),
        timeUsage: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => 0))
      }
    }
  }, [overallProgressQuery.data, weeklyReportQuery.data, puzzleProgressQuery.data])

  return { data, isLoading, error }
}

/**
 * Hook for calculating derived analytics metrics
 */
export const useAnalyticsCalculations = (statistics: DetailedStatistics | null) => {
  const calculateImprovementTrend = useCallback(() => {
    if (!statistics) return null

    const { ratingTrends } = statistics.trends
    if (ratingTrends.length < 2) return null

    // Calculate trend over recent data points
    const recentData = ratingTrends.slice(-10)
    const firstRating = recentData[0]?.rating || 0
    const lastRating = recentData[recentData.length - 1]?.rating || 0
    
    const change = lastRating - firstRating
    const changePercentage = firstRating > 0 ? (change / firstRating) * 100 : 0

    return {
      change,
      changePercentage,
      direction: change > 0 ? 'improving' : change < 0 ? 'declining' : 'stable',
      confidence: Math.min(recentData.reduce((sum, point) => sum + point.confidence, 0) / recentData.length, 1)
    }
  }, [statistics])

  const calculateStrengthWeaknessBalance = useCallback(() => {
    if (!statistics) return null

    const { relativeStrengths, improvementAreas } = statistics.comparative
    
    const avgStrengthPercentile = relativeStrengths.reduce((sum, strength) => 
      sum + strength.percentile, 0) / relativeStrengths.length

    const totalGap = improvementAreas.reduce((sum, area) => sum + Math.abs(area.gap), 0)
    
    return {
      strengthScore: avgStrengthPercentile,
      weaknessImpact: totalGap,
      balance: avgStrengthPercentile - (totalGap * 5), // Weighted balance score
      recommendation: avgStrengthPercentile > 70 ? 'focus_on_weaknesses' : 'develop_strengths'
    }
  }, [statistics])

  const calculateLearningEfficiency = useCallback(() => {
    if (!statistics) return null

    const { studyHours, ratingChange } = statistics.summary
    const { improvementRate } = statistics.trends.learningCurve
    
    if (studyHours === 0) return null

    return {
      ratingPerHour: ratingChange / studyHours,
      efficiency: improvementRate,
      recommendation: improvementRate > 2 ? 'excellent' : improvementRate > 1 ? 'good' : 'needs_improvement'
    }
  }, [statistics])

  return {
    improvementTrend: calculateImprovementTrend(),
    strengthWeaknessBalance: calculateStrengthWeaknessBalance(),
    learningEfficiency: calculateLearningEfficiency()
  }
}