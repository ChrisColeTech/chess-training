// Mock data for PuzzleSelectionPage following architecture guide
import type { PuzzleCategory, PuzzleStats, RecentPuzzle, Achievement } from '../types/puzzleSelection'

export const mockPuzzleCategories: PuzzleCategory[] = [
  {
    id: 'tactical',
    name: 'Tactical Puzzles',
    description: 'Master tactical motifs and combinations',
    icon: '<GiSwordsPower className="w-4 h-4 inline" />',
    route: '/puzzles/tactical',
    difficulty: [
      { level: 'Beginner', rating: 800, puzzleCount: 150, completed: 45, accuracy: 78 },
      { level: 'Intermediate', rating: 1200, puzzleCount: 200, completed: 23, accuracy: 65 },
      { level: 'Advanced', rating: 1600, puzzleCount: 180, completed: 8, accuracy: 58 },
      { level: 'Expert', rating: 2000, puzzleCount: 120, completed: 2, accuracy: 50 }
    ],
    totalPuzzles: 650,
    completedPuzzles: 78,
    averageRating: 1145,
    personalBest: 1389,
    lastPlayed: new Date('2024-01-15'),
    achievements: ['First Blood', 'Combo Master', 'Tactical Genius'],
    color: 'red',
    gradient: 'from-red-400 to-rose-600'
  },
  {
    id: 'opening',
    name: 'Opening Puzzles',
    description: 'Learn opening traps and principles',
    icon: '🏰',
    route: '/puzzles/opening',
    difficulty: [
      { level: 'Beginner', rating: 900, puzzleCount: 120, completed: 67, accuracy: 85 },
      { level: 'Intermediate', rating: 1300, puzzleCount: 160, completed: 34, accuracy: 72 },
      { level: 'Advanced', rating: 1700, puzzleCount: 140, completed: 12, accuracy: 64 },
      { level: 'Expert', rating: 2100, puzzleCount: 80, completed: 3, accuracy: 67 }
    ],
    totalPuzzles: 500,
    completedPuzzles: 116,
    averageRating: 1267,
    personalBest: 1456,
    lastPlayed: new Date('2024-01-18'),
    achievements: ['Opening Expert', 'Trap Master'],
    color: 'blue',
    gradient: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'endgame',
    name: 'Endgame Puzzles',
    description: 'Perfect your endgame technique',
    icon: '<FaChessKing className="w-4 h-4 inline" />',
    route: '/puzzles/endgame',
    difficulty: [
      { level: 'Beginner', rating: 1000, puzzleCount: 100, completed: 28, accuracy: 72 },
      { level: 'Intermediate', rating: 1400, puzzleCount: 130, completed: 15, accuracy: 68 },
      { level: 'Advanced', rating: 1800, puzzleCount: 110, completed: 6, accuracy: 61 },
      { level: 'Expert', rating: 2200, puzzleCount: 60, completed: 1, accuracy: 100 }
    ],
    totalPuzzles: 400,
    completedPuzzles: 50,
    averageRating: 1134,
    personalBest: 1298,
    lastPlayed: new Date('2024-01-12'),
    achievements: ['Endgame Scholar'],
    color: 'purple',
    gradient: 'from-purple-400 to-indigo-600'
  },
  {
    id: 'custom',
    name: 'Custom Puzzles',
    description: 'Create and solve custom puzzle sets',
    icon: '🎨',
    route: '/puzzles/custom',
    difficulty: [
      { level: 'Beginner', rating: 950, puzzleCount: 45, completed: 12, accuracy: 83 },
      { level: 'Intermediate', rating: 1350, puzzleCount: 60, completed: 8, accuracy: 75 },
      { level: 'Advanced', rating: 1750, puzzleCount: 35, completed: 3, accuracy: 67 },
      { level: 'Expert', rating: 2150, puzzleCount: 20, completed: 0, accuracy: 0 }
    ],
    totalPuzzles: 160,
    completedPuzzles: 23,
    averageRating: 1201,
    personalBest: 1367,
    lastPlayed: new Date('2024-01-16'),
    achievements: ['Creator', 'Community Contributor'],
    color: 'green',
    gradient: 'from-green-400 to-emerald-600'
  }
]

export const mockPuzzleStats: PuzzleStats = {
  totalPuzzlesCompleted: 267,
  currentRating: 1178,
  weeklyProgress: 156,
  averageAccuracy: 74.5,
  timeSpent: 2847, // minutes
  favoriteCategory: 'Opening Puzzles',
  currentStreak: 12,
  bestStreak: 23
}

export const mockRecentPuzzles: RecentPuzzle[] = [
  {
    id: '1',
    title: 'Knight Fork Combo',
    category: 'Tactical',
    difficulty: 'Intermediate',
    rating: 1245,
    completed: true,
    accuracy: 100,
    timeSpent: 45,
    date: new Date('2024-01-18T14:30:00')
  },
  {
    id: '2', 
    title: 'Italian Game Trap',
    category: 'Opening',
    difficulty: 'Beginner',
    rating: 967,
    completed: true,
    accuracy: 83,
    timeSpent: 67,
    date: new Date('2024-01-18T13:15:00')
  },
  {
    id: '3',
    title: 'Rook vs Pawn Endgame',
    category: 'Endgame', 
    difficulty: 'Advanced',
    rating: 1567,
    completed: false,
    timeSpent: 123,
    date: new Date('2024-01-17T19:45:00')
  },
  {
    id: '4',
    title: 'Custom Mate in 3',
    category: 'Custom',
    difficulty: 'Expert',
    rating: 1834,
    completed: true,
    accuracy: 100,
    timeSpent: 89,
    date: new Date('2024-01-16T16:20:00')
  },
  {
    id: '5',
    title: 'Pin and Win',
    category: 'Tactical',
    difficulty: 'Beginner', 
    rating: 891,
    completed: true,
    accuracy: 67,
    timeSpent: 78,
    date: new Date('2024-01-15T11:30:00')
  }
]

export const mockAchievements: Achievement[] = [
  {
    id: 'first-solve',
    title: 'First Solve',
    description: 'Complete your first puzzle',
    icon: '<Trophy className="w-4 h-4 inline" />',
    unlocked: true,
    unlockedDate: new Date('2024-01-10'),
    rarity: 'Common'
  },
  {
    id: 'streak-10',
    title: 'On Fire',
    description: 'Solve 10 puzzles in a row',
    icon: '<Flame className="w-4 h-4 inline" />',
    unlocked: true,
    unlockedDate: new Date('2024-01-15'),
    rarity: 'Rare'
  },
  {
    id: 'tactical-master',
    title: 'Tactical Master',
    description: 'Complete 50 tactical puzzles',
    icon: '<GiSwordsPower className="w-4 h-4 inline" />',
    unlocked: true,
    unlockedDate: new Date('2024-01-17'),
    rarity: 'Epic'
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Solve a puzzle in under 10 seconds',
    icon: '<Zap className="w-4 h-4 inline" />',
    unlocked: false,
    rarity: 'Rare',
    progress: 12.5,
    maxProgress: 10.0
  },
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: 'Achieve 100% accuracy on 20 puzzles',
    icon: '💎',
    unlocked: false,
    rarity: 'Legendary',
    progress: 12,
    maxProgress: 20
  }
]

// Utility functions
export const getCategoryProgress = (category: PuzzleCategory): number => {
  return Math.round((category.completedPuzzles / category.totalPuzzles) * 100)
}

export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours > 0) {
    return `${hours}h ${mins}m`
  }
  return `${mins}m`
}

export const getRarityColor = (rarity: Achievement['rarity']): string => {
  switch (rarity) {
    case 'Common': return 'text-gray-400'
    case 'Rare': return 'text-blue-400'
    case 'Epic': return 'text-purple-400'
    case 'Legendary': return 'text-yellow-400'
    default: return 'text-gray-400'
  }
}

export const getFilteredCategories = (categories: PuzzleCategory[], filters: any): PuzzleCategory[] => {
  return categories.filter(category => {
    if (filters.categories.length > 0 && !filters.categories.includes(category.id)) {
      return false
    }
    
    if (!filters.showCompleted && getCategoryProgress(category) === 100) {
      return false
    }
    
    return true
  })
}