// Custom hook for PuzzleSelectionPage state management following architecture guide
import { useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import type { 
  PuzzleCategory, 
  PuzzleStats, 
  RecentPuzzle, 
  Achievement, 
  PuzzleSelectionFilters 
} from '../types/puzzleSelection'
import { PuzzleSelectionService } from '../services/puzzleSelectionService'
import { soundFX } from '../utils/soundEffects'

export const usePuzzleSelection = (
  categories: PuzzleCategory[],
  stats: PuzzleStats,
  recentPuzzles: RecentPuzzle[],
  achievements: Achievement[]
) => {
  const navigate = useNavigate()
  
  // State management
  const [filters, setFilters] = useState<PuzzleSelectionFilters>({
    difficulty: [],
    categories: [],
    showCompleted: true,
    sortBy: 'recent'
  })
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filtered data using service layer
  const filteredCategories = useMemo(() => 
    PuzzleSelectionService.filterCategories(categories, filters),
    [categories, filters]
  )

  // Computed statistics using service layer
  const overallProgress = useMemo(() => 
    PuzzleSelectionService.calculateOverallProgress(categories),
    [categories]
  )

  const recommendedCategory = useMemo(() => 
    PuzzleSelectionService.getRecommendedCategory(categories),
    [categories]
  )

  const formattedStats = useMemo(() => 
    PuzzleSelectionService.formatStatsForDisplay(stats),
    [stats]
  )

  const achievementSummary = useMemo(() => 
    PuzzleSelectionService.getAchievementSummary(achievements),
    [achievements]
  )

  const timeRecommendations = useMemo(() => 
    PuzzleSelectionService.getTimeBasedRecommendations(recentPuzzles),
    [recentPuzzles]
  )

  const dailyGoals = useMemo(() => 
    PuzzleSelectionService.generateDailyGoals(stats, categories),
    [stats, categories]
  )

  // Event handlers
  const handleCategoryClick = useCallback((route: string) => {
    soundFX.playClick()
    navigate(route)
  }, [navigate])

  const handleRecentPuzzleClick = useCallback((puzzle: RecentPuzzle) => {
    soundFX.playClick()
    // Navigate to specific puzzle (would need puzzle ID routing)
    navigate(`/puzzles/${puzzle.category.toLowerCase()}?puzzle=${puzzle.id}`)
  }, [navigate])

  const handleFilterChange = useCallback((newFilters: Partial<PuzzleSelectionFilters>) => {
    soundFX.playClick()
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  const handleCategoryHover = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId)
  }, [])

  const handleCategoryLeave = useCallback(() => {
    setSelectedCategory(null)
  }, [])

  const handleQuickStart = useCallback(() => {
    soundFX.playSuccess()
    if (recommendedCategory) {
      navigate(recommendedCategory.route)
    } else {
      navigate('/puzzles/tactical') // fallback
    }
  }, [navigate, recommendedCategory])

  const handleContinueRecent = useCallback(() => {
    soundFX.playClick()
    const unfinishedPuzzle = recentPuzzles.find(p => !p.completed)
    if (unfinishedPuzzle) {
      navigate(`/puzzles/${unfinishedPuzzle.category.toLowerCase()}?puzzle=${unfinishedPuzzle.id}`)
    } else if (recentPuzzles.length > 0) {
      handleRecentPuzzleClick(recentPuzzles[0])
    } else {
      handleQuickStart()
    }
  }, [recentPuzzles, navigate, handleRecentPuzzleClick, handleQuickStart])

  // Helper functions for UI
  const getCategoryRecommendation = useCallback((category: PuzzleCategory): string => {
    return PuzzleSelectionService.getNextDifficultyRecommendation(category)
  }, [])

  const resetFilters = useCallback(() => {
    soundFX.playClick()
    setFilters({
      difficulty: [],
      categories: [],
      showCompleted: true,
      sortBy: 'recent'
    })
  }, [])

  return {
    // State
    filters,
    selectedCategory,
    
    // Computed data
    filteredCategories,
    overallProgress,
    recommendedCategory,
    formattedStats,
    achievementSummary,
    timeRecommendations,
    dailyGoals,
    
    // Event handlers
    handleCategoryClick,
    handleRecentPuzzleClick,
    handleFilterChange,
    handleCategoryHover,
    handleCategoryLeave,
    handleQuickStart,
    handleContinueRecent,
    
    // Helper functions
    getCategoryRecommendation,
    resetFilters
  }
}