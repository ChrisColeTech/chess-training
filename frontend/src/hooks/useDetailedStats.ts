import { useState, useEffect, useCallback } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { mockAnalyticsData } from '@/data/analyticsData'
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
  // Core data state
  const [statistics, setStatistics] = useState<DetailedStatistics | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // UI state
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<AnalyticsTimePeriod>('30d')
  const [selectedChartType, setSelectedChartType] = useState<ChartType>('line')
  const [selectedGamePhase, setSelectedGamePhase] = useState<GamePhase>('middlegame')
  const [selectedHeatMap, setSelectedHeatMap] = useState<keyof PositionHeatMaps>('squareControl')

  /**
   * Load statistics data for the selected time period
   */
  const loadStatistics = useCallback(async (timePeriod: AnalyticsTimePeriod) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API delay for realistic loading experience
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400))
      
      // Get mock data for the selected time period
      const data = mockAnalyticsData[timePeriod]
      
      if (!data) {
        throw new Error(`No data available for time period: ${timePeriod}`)
      }

      setStatistics(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load statistics'
      setError(errorMessage)
      console.error('Error loading detailed statistics:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Initialize data on mount and when time period changes
   */
  useEffect(() => {
    loadStatistics(selectedTimePeriod)
  }, [selectedTimePeriod, loadStatistics])

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
    await loadStatistics(selectedTimePeriod)
  }, [selectedTimePeriod, loadStatistics])

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
    error,

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
  const [data, setData] = useState<DetailedStatistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const analyticsData = mockAnalyticsData[timePeriod]
        if (!analyticsData) {
          throw new Error(`No data available for period: ${timePeriod}`)
        }

        setData(analyticsData)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load data'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [timePeriod])

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