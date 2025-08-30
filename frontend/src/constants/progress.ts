export interface ProgressConfig {
  id: string
  label: string
  type: 'goal' | 'rating' | 'streak' | 'achievement'
  colorClass: string
  maxValue: number
  unit: string
}

export interface ELOProgressConfig {
  id: string
  currentRating: number
  targetRating: number
  previousRating?: number
  ratingChange?: number
  colorScheme: 'positive' | 'negative' | 'neutral'
}

export const DAILY_GOALS: Record<string, ProgressConfig> = {
  GAMES_PLAYED: {
    id: 'games-played',
    label: 'Games Played',
    type: 'goal',
    colorClass: 'from-blue-500 to-purple-600',
    maxValue: 5,
    unit: 'games'
  },
  PUZZLES_SOLVED: {
    id: 'puzzles-solved',
    label: 'Puzzles Solved',
    type: 'goal',
    colorClass: 'from-green-500 to-teal-600',
    maxValue: 10,
    unit: 'puzzles'
  },
  STUDY_TIME: {
    id: 'study-time',
    label: 'Study Time',
    type: 'goal',
    colorClass: 'from-orange-500 to-red-600',
    maxValue: 60,
    unit: 'minutes'
  },
  WIN_STREAK: {
    id: 'win-streak',
    label: 'Win Streak',
    type: 'streak',
    colorClass: 'from-yellow-500 to-orange-600',
    maxValue: 10,
    unit: 'wins'
  }
}

export const WEEKLY_GOALS: Record<string, ProgressConfig> = {
  TOTAL_GAMES: {
    id: 'total-games',
    label: 'Weekly Games',
    type: 'goal',
    colorClass: 'from-indigo-500 to-blue-600',
    maxValue: 25,
    unit: 'games'
  },
  PUZZLE_RATING: {
    id: 'puzzle-rating',
    label: 'Puzzle Rating',
    type: 'rating',
    colorClass: 'from-purple-500 to-pink-600',
    maxValue: 2000,
    unit: 'rating'
  },
  STUDY_HOURS: {
    id: 'study-hours',
    label: 'Study Hours',
    type: 'goal',
    colorClass: 'from-teal-500 to-green-600',
    maxValue: 10,
    unit: 'hours'
  },
  TOURNAMENT_POINTS: {
    id: 'tournament-points',
    label: 'Tournament Points',
    type: 'achievement',
    colorClass: 'from-red-500 to-pink-600',
    maxValue: 100,
    unit: 'points'
  }
}

export const ELO_PROGRESS_COLORS = {
  positive: {
    background: 'from-green-500 to-emerald-600',
    text: 'text-green-700',
    border: 'border-green-500'
  },
  negative: {
    background: 'from-red-500 to-rose-600',
    text: 'text-red-700',
    border: 'border-red-500'
  },
  neutral: {
    background: 'from-blue-500 to-indigo-600',
    text: 'text-blue-700',
    border: 'border-blue-500'
  }
}

export const calculateProgressPercentage = (current: number, max: number): number => {
  return Math.min(Math.round((current / max) * 100), 100)
}

export const getELOProgressPercentage = (current: number, target: number, previous?: number): number => {
  if (!previous) return 0
  
  const totalChange = target - previous
  const currentChange = current - previous
  
  if (totalChange === 0) return 100
  return Math.min(Math.round((currentChange / totalChange) * 100), 100)
}

export const getProgressColorScheme = (ratingChange?: number): 'positive' | 'negative' | 'neutral' => {
  if (!ratingChange) return 'neutral'
  if (ratingChange > 0) return 'positive'
  if (ratingChange < 0) return 'negative'
  return 'neutral'
}

export const formatProgressValue = (value: number, unit: string): string => {
  if (unit === 'minutes' && value >= 60) {
    const hours = Math.floor(value / 60)
    const minutes = value % 60
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
  }
  
  if (unit === 'rating') {
    return value.toLocaleString()
  }
  
  return `${value} ${unit}`
}