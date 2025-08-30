// PuzzleSelectionPage TypeScript interfaces following architecture guide

export interface PuzzleCategory {
  id: string
  name: string
  description: string
  icon: string
  route: string
  difficulty: PuzzleDifficulty[]
  totalPuzzles: number
  completedPuzzles: number
  averageRating: number
  personalBest: number
  lastPlayed?: Date
  achievements: string[]
  color: string
  gradient: string
}

export interface PuzzleDifficulty {
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  rating: number
  puzzleCount: number
  completed: number
  accuracy: number
}

export interface PuzzleStats {
  totalPuzzlesCompleted: number
  currentRating: number
  weeklyProgress: number
  averageAccuracy: number
  timeSpent: number
  favoriteCategory: string
  currentStreak: number
  bestStreak: number
}

export interface RecentPuzzle {
  id: string
  title: string
  category: string
  difficulty: string
  rating: number
  completed: boolean
  accuracy?: number
  timeSpent?: number
  date: Date
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedDate?: Date
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  progress?: number
  maxProgress?: number
}

export interface PuzzleSelectionFilters {
  difficulty: string[]
  categories: string[]
  showCompleted: boolean
  sortBy: 'name' | 'progress' | 'difficulty' | 'recent'
}

// Component Props
export interface CategoryCardProps {
  category: PuzzleCategory
  onClick: (route: string) => void
  theme: any
}

export interface StatsCardProps {
  stats: PuzzleStats
  theme: any
}

export interface RecentPuzzlesProps {
  puzzles: RecentPuzzle[]
  onPuzzleClick: (puzzle: RecentPuzzle) => void
  theme: any
}

export interface AchievementShowcaseProps {
  achievements: Achievement[]
  theme: any
}