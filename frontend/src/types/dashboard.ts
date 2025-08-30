export interface DashboardStats {
  chess_elo: number
  puzzle_rating: number
  games_played: number
  study_hours: number
  rating_change: number
  puzzle_rating_change: number
  games_change: number
  study_hours_change: number
}

export interface DailyGoal {
  id: string
  type: 'games' | 'puzzles' | 'study' | 'streak'
  label: string
  current: number
  target: number
  completed: boolean
}

export interface UserActivity {
  id: string
  type: 'win' | 'loss' | 'puzzle' | 'study'
  description: string
  opponent?: string
  rating_change?: number
  points?: number
  duration?: string
  created_at: string
  timeFormatted?: string
}

// Performance Analytics Data
export interface ELOProgressionPoint {
  date: string
  elo: number
  games: number
  wins: number
  losses: number
}

export interface GameTypeDistribution {
  name: string
  value: number
  color: string
}

export interface PerformanceMetric {
  metric: string
  value: string
  trend: 'up' | 'down' | 'neutral'
  color: string
}

export interface PerformanceAnalyticsData {
  eloProgression: ELOProgressionPoint[]
  gameTypes: GameTypeDistribution[]
  recentPerformance: PerformanceMetric[]
  insights: {
    id: string
    type: 'positive' | 'neutral' | 'warning'
    title: string
    description: string
  }[]
}

// Recent Games Data
export interface GameResult {
  id: number
  opponent: string
  opponentRating: number
  result: 'win' | 'loss' | 'draw'
  playerColor: 'white' | 'black'
  gameType: string
  timeControl: string
  moves: number
  accuracy: number
  ratingChange: number
  opening: string
  date: string
  duration: string
  endReason: string
}

export interface RecentGamesData {
  games: GameResult[]
  summary: {
    wins: number
    losses: number
    draws: number
  }
}

// Achievement Data
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'games' | 'puzzles' | 'rating' | 'study'
  points: number
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  unlocked: boolean
  unlockedAt?: string
  progress?: number
  total?: number
}

export interface AchievementData {
  achievements: Achievement[]
  totalPoints: number
  unlockedCount: number
  categories: {
    id: string
    label: string
    count: number
  }[]
  recentUnlocks: Achievement[]
}

// Advanced Metrics Data
export interface TimeControlPerformance {
  timeControl: string
  games: number
  wins: number
  losses: number
  draws: number
  winRate: number
  avgAccuracy: number
  avgRating: number
}

export interface OpeningPerformance {
  opening: string
  games: number
  wins: number
  losses: number
  draws: number
  winRate: number
  avgAccuracy: number
}

export interface SkillAssessment {
  skill: string
  score: number
  maxScore: number
}

export interface MonthlyTrend {
  month: string
  rating: number
  games: number
  winRate: number
  accuracy: number
  puzzles: number
}

export interface PieceAnalysis {
  piece: string
  strength: number
  weaknesses: string[]
}

export interface CompetitiveStat {
  metric: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'neutral'
  color: string
}

export interface AdvancedMetricsData {
  timeControlPerformance: TimeControlPerformance[]
  openingPerformance: OpeningPerformance[]
  skillAssessment: SkillAssessment[]
  monthlyTrends: MonthlyTrend[]
  pieceAnalysis: PieceAnalysis[]
  competitiveStats: CompetitiveStat[]
}

// Combined Dashboard Data Interface
export interface ExtendedDashboardData {
  performanceAnalytics: PerformanceAnalyticsData
  recentGames: RecentGamesData
  achievements: AchievementData
  advancedMetrics: AdvancedMetricsData
}