// Service layer for PuzzleSelectionPage business logic following architecture guide
import type { PuzzleCategory, PuzzleStats, RecentPuzzle, Achievement, PuzzleSelectionFilters } from '../types/puzzleSelection'
import { getCategoryProgress, formatTime } from '../data/puzzleCategories'

export class PuzzleSelectionService {
  
  // Calculate overall progress statistics
  static calculateOverallProgress(categories: PuzzleCategory[]): {
    totalPuzzles: number
    totalCompleted: number
    overallProgress: number
  } {
    const totalPuzzles = categories.reduce((sum, cat) => sum + cat.totalPuzzles, 0)
    const totalCompleted = categories.reduce((sum, cat) => sum + cat.completedPuzzles, 0)
    const overallProgress = totalPuzzles > 0 ? Math.round((totalCompleted / totalPuzzles) * 100) : 0
    
    return { totalPuzzles, totalCompleted, overallProgress }
  }

  // Get recommended category based on progress and performance
  static getRecommendedCategory(categories: PuzzleCategory[]): PuzzleCategory | null {
    // Find category with lowest progress but some activity
    const activeCategories = categories.filter(cat => cat.completedPuzzles > 0)
    
    if (activeCategories.length === 0) {
      return categories.find(cat => cat.id === 'tactical') || categories[0]
    }
    
    return activeCategories.reduce((lowest, current) => 
      getCategoryProgress(current) < getCategoryProgress(lowest) ? current : lowest
    )
  }

  // Filter categories based on criteria
  static filterCategories(categories: PuzzleCategory[], filters: PuzzleSelectionFilters): PuzzleCategory[] {
    let filtered = [...categories]

    // Filter by category selection
    if (filters.categories.length > 0) {
      filtered = filtered.filter(cat => filters.categories.includes(cat.id))
    }

    // Filter completed/incomplete
    if (!filters.showCompleted) {
      filtered = filtered.filter(cat => getCategoryProgress(cat) < 100)
    }

    // Sort by criteria
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'progress':
        filtered.sort((a, b) => getCategoryProgress(b) - getCategoryProgress(a))
        break
      case 'difficulty':
        filtered.sort((a, b) => a.averageRating - b.averageRating)
        break
      case 'recent':
        filtered.sort((a, b) => {
          const aTime = a.lastPlayed?.getTime() || 0
          const bTime = b.lastPlayed?.getTime() || 0
          return bTime - aTime
        })
        break
    }

    return filtered
  }

  // Calculate next difficulty recommendation
  static getNextDifficultyRecommendation(category: PuzzleCategory): string {
    const difficulties = category.difficulty
    
    // Find highest difficulty with >70% accuracy and >5 completed
    for (let i = difficulties.length - 1; i >= 0; i--) {
      const diff = difficulties[i]
      if (diff.completed >= 5 && diff.accuracy >= 70) {
        // Recommend next level if available
        if (i < difficulties.length - 1) {
          return difficulties[i + 1].level
        } else {
          return `Continue ${diff.level}`
        }
      }
    }
    
    // Default to beginner
    return difficulties[0]?.level || 'Beginner'
  }

  // Format statistics for display
  static formatStatsForDisplay(stats: PuzzleStats): {
    formattedTimeSpent: string
    progressText: string
    accuracyText: string
    ratingChange: string
  } {
    return {
      formattedTimeSpent: formatTime(stats.timeSpent),
      progressText: `+${stats.weeklyProgress} this week`,
      accuracyText: `${stats.averageAccuracy.toFixed(1)}% average`,
      ratingChange: stats.weeklyProgress > 0 ? `+${Math.round(stats.weeklyProgress / 10)}` : '0'
    }
  }

  // Get achievement progress summary
  static getAchievementSummary(achievements: Achievement[]): {
    unlockedCount: number
    totalCount: number
    recentUnlocks: Achievement[]
    nextToUnlock: Achievement[]
  } {
    const unlocked = achievements.filter(a => a.unlocked)
    const locked = achievements.filter(a => !a.unlocked)
    
    const recentUnlocks = unlocked
      .filter(a => a.unlockedDate)
      .sort((a, b) => (b.unlockedDate!.getTime()) - (a.unlockedDate!.getTime()))
      .slice(0, 3)
    
    const nextToUnlock = locked
      .filter(a => a.progress !== undefined)
      .sort((a, b) => (b.progress! / b.maxProgress!) - (a.progress! / a.maxProgress!))
      .slice(0, 3)

    return {
      unlockedCount: unlocked.length,
      totalCount: achievements.length,
      recentUnlocks,
      nextToUnlock
    }
  }

  // Calculate time-based recommendations
  static getTimeBasedRecommendations(recentPuzzles: RecentPuzzle[]): {
    suggestedSessionLength: number
    bestTimeOfDay: string
    streakRecommendation: string
  } {
    const avgTimePerPuzzle = recentPuzzles.length > 0 
      ? recentPuzzles.reduce((sum, p) => sum + (p.timeSpent || 0), 0) / recentPuzzles.length 
      : 60

    const hourCounts: { [hour: number]: number } = {}
    recentPuzzles.forEach(puzzle => {
      const hour = puzzle.date.getHours()
      hourCounts[hour] = (hourCounts[hour] || 0) + 1
    })
    
    const bestHour = Object.keys(hourCounts).reduce((a, b) => 
      hourCounts[Number(a)] > hourCounts[Number(b)] ? a : b, '14'
    )
    
    const bestTimeOfDay = Number(bestHour) < 12 ? 'Morning' : 
                         Number(bestHour) < 17 ? 'Afternoon' : 'Evening'

    return {
      suggestedSessionLength: Math.round(avgTimePerPuzzle * 5), // 5 puzzles
      bestTimeOfDay,
      streakRecommendation: 'Solve 3 puzzles daily to maintain your streak'
    }
  }

  // Generate daily goals
  static generateDailyGoals(stats: PuzzleStats, _categories: PuzzleCategory[]): string[] {
    const goals: string[] = []
    
    // Rating goal
    if (stats.currentRating < 1200) {
      goals.push('Complete 5 tactical puzzles to improve pattern recognition')
    } else if (stats.currentRating < 1500) {
      goals.push('Focus on endgame puzzles to round out your skills')
    } else {
      goals.push('Challenge yourself with advanced puzzles')
    }
    
    // Streak goal
    if (stats.currentStreak < 5) {
      goals.push('Build a solving streak - consistency is key!')
    } else if (stats.currentStreak < stats.bestStreak) {
      goals.push(`${stats.bestStreak - stats.currentStreak} more to beat your best streak`)
    }
    
    // Accuracy goal
    if (stats.averageAccuracy < 75) {
      goals.push('Take your time - focus on accuracy over speed')
    }
    
    return goals.slice(0, 2) // Return max 2 goals
  }
}