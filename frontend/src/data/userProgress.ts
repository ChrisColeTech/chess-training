/**
 * Mock User Progress Data
 * Provides realistic mock data for the progress overview dashboard
 */

import type { 
  PerformanceAnalytics,
  StudyStreak,
  SkillProgression,
  Achievement,
  Goal,
  LearningPath,
  TrainingSession,
  ActivityDataPoint,
  RatingDataPoint,
  TimePeriod,
  SessionType,
  MockDataConfig
} from '@/types/progressOverview'

import { Target, Trophy, Flame, Zap, Star, BookOpen, Timer, Castle, Sword, Crown, Brain } from 'lucide-react'

/**
 * Generate mock rating history data
 */
const generateRatingHistory = (months: number = 12): RatingDataPoint[] => {
  const history: RatingDataPoint[] = []
  const startRating = 1400 + Math.random() * 400 // Random starting rating between 1400-1800
  let currentRating = startRating

  for (let i = 0; i < months; i++) {
    // Simulate realistic rating progression with some variance
    const monthlyChange = (Math.random() - 0.3) * 100 // Slight upward bias
    currentRating = Math.max(1200, Math.min(2400, currentRating + monthlyChange))
    
    const date = new Date()
    date.setMonth(date.getMonth() - (months - i - 1))
    
    history.push({
      date: date.getTime(),
      rating: Math.round(currentRating),
      label: date.toLocaleDateString('en-US', { month: 'short' }),
      gameType: ['blitz', 'rapid', 'classical', 'puzzle'][Math.floor(Math.random() * 4)] as any
    })
  }

  return history
}

/**
 * Generate mock activity data for different time periods
 */
export const generateMockActivityData = (period: TimePeriod): ActivityDataPoint[] => {
  const data: ActivityDataPoint[] = []
  const days = period === 'week' ? 7 : period === 'month' ? 30 : 365
  
  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - i - 1))
    
    // Simulate realistic activity patterns (less on weekends, more variation)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const baseActivity = isWeekend ? 0.6 : 1.0
    const randomFactor = 0.5 + Math.random()
    
    const puzzles = Math.floor(baseActivity * randomFactor * (5 + Math.random() * 25))
    const studyTime = Math.floor(baseActivity * randomFactor * (10 + Math.random() * 60))
    const games = Math.floor(baseActivity * randomFactor * (0 + Math.random() * 5))
    const quality = Math.min(100, 60 + Math.random() * 40) // Quality score 60-100
    
    data.push({
      date: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      puzzles,
      studyTime,
      games,
      totalTime: studyTime + (games * 15), // Estimate 15 min per game
      quality: Math.round(quality)
    })
  }
  
  return data
}

/**
 * Generate mock training sessions
 */
export const generateMockSessions = (count: number = 10): TrainingSession[] => {
  const sessions: TrainingSession[] = []
  const sessionTypes: SessionType[] = ['puzzle', 'study', 'game', 'analysis', 'opening', 'endgame']
  
  const sessionTemplates = {
    puzzle: {
      titles: ['Tactical Training', 'Pin & Forks', 'Checkmate Patterns', 'Combination Practice'],
      descriptions: ['Solved tactical puzzles', 'Practiced pin and fork tactics', 'Learned mate patterns', 'Complex combinations']
    },
    study: {
      titles: ['Opening Study', 'Endgame Theory', 'Strategic Concepts', 'Positional Play'],
      descriptions: ['Studied opening principles', 'Reviewed endgame positions', 'Analyzed strategic ideas', 'Improved positional understanding']
    },
    game: {
      titles: ['Blitz Game', 'Rapid Game', 'Classical Game', 'Practice Match'],
      descriptions: ['Quick tactical game', 'Standard time control', 'Long thought game', 'Training match']
    },
    analysis: {
      titles: ['Game Review', 'Position Analysis', 'Engine Check', 'Mistake Review'],
      descriptions: ['Analyzed recent game', 'Deep position study', 'Engine-assisted review', 'Studied blunders']
    },
    opening: {
      titles: ['Sicilian Defense', 'Queen\'s Gambit', 'Ruy Lopez', 'King\'s Indian'],
      descriptions: ['Sicilian variations', 'Queen\'s gambit theory', 'Spanish opening', 'Hypermodern defense']
    },
    endgame: {
      titles: ['Rook Endgame', 'Pawn Endgame', 'Queen Endgame', 'Minor Piece'],
      descriptions: ['Rook vs pawns', 'Pawn promotion', 'Queen technique', 'Bishop vs knight']
    }
  }
  
  for (let i = 0; i < count; i++) {
    const type = sessionTypes[Math.floor(Math.random() * sessionTypes.length)]
    const template = sessionTemplates[type]
    const titleIndex = Math.floor(Math.random() * template.titles.length)
    
    const duration = 5 + Math.random() * 45 // 5-50 minutes
    const score = 60 + Math.random() * 40 // 60-100 score
    const accuracy = type === 'puzzle' ? 75 + Math.random() * 25 : undefined
    const ratingChange = type === 'game' ? Math.round((Math.random() - 0.5) * 30) : undefined
    
    const timestamp = Date.now() - (i * 2 * 60 * 60 * 1000) // Every 2 hours back
    
    sessions.push({
      id: `session_${i}`,
      type,
      title: template.titles[titleIndex],
      description: template.descriptions[titleIndex],
      duration: Math.round(duration),
      score: Math.round(score),
      timestamp,
      xpGained: Math.round(score / 2),
      accuracy: accuracy ? Math.round(accuracy) : undefined,
      ratingChange,
      metadata: {
        puzzlesSolved: type === 'puzzle' ? Math.floor(duration / 2) : undefined,
        gamesPlayed: type === 'game' ? 1 : undefined,
        openingsStudied: type === 'opening' ? Math.ceil(duration / 10) : undefined,
        mistakesCount: Math.floor(Math.random() * 5),
        timeSpent: Math.round(duration)
      }
    })
  }
  
  return sessions.reverse() // Most recent first
}

/**
 * Generate comprehensive mock progress data
 */
export const generateMockProgressData = () => {
  const ratingHistory = generateRatingHistory()
  const currentRating = ratingHistory[ratingHistory.length - 1].rating
  const peakRating = Math.max(...ratingHistory.map(h => h.rating))
  const peakRatingDate = ratingHistory.find(h => h.rating === peakRating)?.date || Date.now()
  
  // Performance Analytics
  const performanceAnalytics: PerformanceAnalytics = {
    overallRating: currentRating,
    ratingHistory,
    peakRating,
    peakRatingDate,
    gameStats: {
      wins: 167,
      losses: 98,
      draws: 23,
      totalGames: 288,
      winRate: 58.0
    },
    timeControlStats: {
      blitz: { rating: currentRating - 50, games: 120, winRate: 62.5 },
      rapid: { rating: currentRating + 20, games: 98, winRate: 55.1 },
      classical: { rating: currentRating + 80, games: 34, winRate: 52.9 }
    },
    recentTrend: {
      direction: Math.random() > 0.3 ? 'up' : 'down',
      change: Math.round((Math.random() - 0.3) * 50),
      period: 'month'
    },
    accuracy: {
      overall: 78.5,
      tactical: 82.3,
      positional: 74.2,
      endgame: 69.8
    }
  }
  
  // Study Streak
  const currentStreak = Math.floor(Math.random() * 45) + 1
  const studyStreak: StudyStreak = {
    current: currentStreak,
    longest: Math.max(currentStreak, Math.floor(Math.random() * 60) + currentStreak),
    lastStudyDate: Date.now() - (Math.random() * 24 * 60 * 60 * 1000),
    streakStartDate: Date.now() - (currentStreak * 24 * 60 * 60 * 1000),
    daysToMilestone: currentStreak >= 30 ? 60 - currentStreak : 30 - currentStreak,
    nextMilestone: currentStreak >= 30 ? 60 : 30,
    status: currentStreak > 0 ? 'active' : 'broken'
  }
  
  // Skill Progressions
  const skillProgressions: SkillProgression[] = [
    {
      category: 'tactics',
      name: 'Tactical Vision',
      level: 12,
      progress: 67,
      xp: 3450,
      xpToNext: 800,
      improvement: 12.3,
      color: 'text-blue-400',
      icon: Sword
    },
    {
      category: 'openings',
      name: 'Opening Knowledge',
      level: 8,
      progress: 34,
      xp: 2180,
      xpToNext: 1200,
      improvement: 8.7,
      color: 'text-green-400',
      icon: BookOpen
    },
    {
      category: 'endgames',
      name: 'Endgame Technique',
      level: 6,
      progress: 78,
      xp: 1890,
      xpToNext: 450,
      improvement: 15.2,
      color: 'text-purple-400',
      icon: Crown
    },
    {
      category: 'strategy',
      name: 'Strategic Understanding',
      level: 10,
      progress: 23,
      xp: 2850,
      xpToNext: 950,
      improvement: 6.4,
      color: 'text-yellow-400',
      icon: Brain
    },
    {
      category: 'calculation',
      name: 'Calculation Depth',
      level: 9,
      progress: 56,
      xp: 2420,
      xpToNext: 780,
      improvement: 9.8,
      color: 'text-red-400',
      icon: Zap
    },
    {
      category: 'time_management',
      name: 'Time Management',
      level: 7,
      progress: 89,
      xp: 1970,
      xpToNext: 230,
      improvement: 18.5,
      color: 'text-indigo-400',
      icon: Timer
    }
  ]
  
  // Achievements
  const achievements: Achievement[] = [
    {
      id: 'first_victory',
      title: 'First Victory',
      description: 'Win your first rated game',
      icon: Trophy,
      status: 'completed',
      progress: 1,
      target: 1,
      xpReward: 100,
      category: 'tactics',
      rarity: 'common',
      badgeColor: 'text-yellow-400',
      completedAt: Date.now() - (30 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'puzzle_master',
      title: 'Puzzle Master',
      description: 'Solve 1000 tactical puzzles',
      icon: Target,
      status: 'completed',
      progress: 1247,
      target: 1000,
      xpReward: 500,
      category: 'tactics',
      rarity: 'rare',
      badgeColor: 'text-blue-400',
      completedAt: Date.now() - (7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'study_streak_30',
      title: 'Dedicated Student',
      description: 'Study chess for 30 consecutive days',
      icon: Flame,
      status: currentStreak >= 30 ? 'completed' : 'in_progress',
      progress: currentStreak,
      target: 30,
      xpReward: 750,
      category: 'strategy',
      rarity: 'epic',
      badgeColor: 'text-orange-400',
      completedAt: currentStreak >= 30 ? Date.now() - ((currentStreak - 30) * 24 * 60 * 60 * 1000) : undefined
    },
    {
      id: 'rating_milestone_2000',
      title: 'Expert Level',
      description: 'Reach 2000 rating',
      icon: Star,
      status: currentRating >= 2000 ? 'completed' : 'in_progress',
      progress: currentRating,
      target: 2000,
      xpReward: 1000,
      category: 'strategy',
      rarity: 'epic',
      badgeColor: 'text-purple-400',
      completedAt: currentRating >= 2000 ? Date.now() - (Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined
    },
    {
      id: 'endgame_expert',
      title: 'Endgame Expert',
      description: 'Master 50 endgame positions',
      icon: Crown,
      status: 'in_progress',
      progress: 34,
      target: 50,
      xpReward: 800,
      category: 'endgames',
      rarity: 'rare',
      badgeColor: 'text-indigo-400'
    },
    {
      id: 'grandmaster_level',
      title: 'Grandmaster Dreams',
      description: 'Reach 2500 rating',
      icon: Crown,
      status: 'locked',
      progress: currentRating,
      target: 2500,
      xpReward: 2000,
      category: 'strategy',
      rarity: 'legendary',
      badgeColor: 'text-gold-400',
      requirements: ['Reach 2200 rating', 'Complete 100 study sessions']
    }
  ]
  
  // Goals
  const goals: Goal[] = [
    {
      id: 'improve_tactics',
      title: 'Improve Tactical Rating',
      description: 'Reach 2000 puzzle rating',
      target: 2000,
      progress: 1876,
      targetDate: Date.now() + (60 * 24 * 60 * 60 * 1000), // 60 days from now
      category: 'tactics',
      priority: 'high',
      status: 'active',
      icon: Target,
      color: 'text-blue-400',
      createdAt: Date.now() - (30 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'learn_openings',
      title: 'Master Opening Repertoire',
      description: 'Learn 5 complete opening systems',
      target: 5,
      progress: 3,
      targetDate: Date.now() + (90 * 24 * 60 * 60 * 1000),
      category: 'openings',
      priority: 'medium',
      status: 'active',
      icon: BookOpen,
      color: 'text-green-400',
      createdAt: Date.now() - (45 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'consistent_study',
      title: 'Study Consistency',
      description: 'Study chess every day for 90 days',
      target: 90,
      progress: currentStreak,
      targetDate: Date.now() + ((90 - currentStreak) * 24 * 60 * 60 * 1000),
      category: 'strategy',
      priority: 'high',
      status: 'active',
      icon: Flame,
      color: 'text-orange-400',
      createdAt: Date.now() - (currentStreak * 24 * 60 * 60 * 1000)
    }
  ]
  
  // Learning Paths
  const learningPaths: LearningPath[] = [
    {
      id: 'tactical_mastery',
      name: 'Tactical Mastery',
      description: 'Complete tactical training from beginner to advanced',
      totalLessons: 24,
      completedLessons: 16,
      currentLesson: 17,
      estimatedTime: 12,
      timeSpent: 8.5,
      difficulty: 'intermediate',
      category: 'tactics',
      progress: 67,
      nextLessonTitle: 'Deflection and Decoy Tactics',
      icon: Sword
    },
    {
      id: 'opening_fundamentals',
      name: 'Opening Fundamentals',
      description: 'Learn the principles and popular openings',
      totalLessons: 18,
      completedLessons: 7,
      currentLesson: 8,
      estimatedTime: 15,
      timeSpent: 6.2,
      difficulty: 'beginner',
      category: 'openings',
      progress: 39,
      nextLessonTitle: 'Sicilian Defense Basics',
      icon: Castle
    },
    {
      id: 'endgame_mastery',
      name: 'Endgame Mastery',
      description: 'Master essential endgame patterns and techniques',
      totalLessons: 20,
      completedLessons: 4,
      currentLesson: 5,
      estimatedTime: 18,
      timeSpent: 3.8,
      difficulty: 'advanced',
      category: 'endgames',
      progress: 20,
      nextLessonTitle: 'King and Pawn vs King',
      icon: Crown
    }
  ]
  
  return {
    performanceAnalytics,
    studyStreak,
    skillProgressions,
    achievements,
    goals,
    learningPaths
  }
}

/**
 * Mock data configurations for different skill levels
 */
export const mockDataConfigs: Record<string, MockDataConfig> = {
  beginner: {
    skillLevel: 'beginner',
    ratingRange: { min: 800, max: 1400 },
    activityMultiplier: 0.7,
    achievementRate: 0.3,
    streakProbability: 0.4
  },
  intermediate: {
    skillLevel: 'intermediate',
    ratingRange: { min: 1400, max: 1800 },
    activityMultiplier: 1.0,
    achievementRate: 0.5,
    streakProbability: 0.6
  },
  advanced: {
    skillLevel: 'advanced',
    ratingRange: { min: 1800, max: 2200 },
    activityMultiplier: 1.2,
    achievementRate: 0.7,
    streakProbability: 0.8
  },
  expert: {
    skillLevel: 'expert',
    ratingRange: { min: 2200, max: 2600 },
    activityMultiplier: 1.5,
    achievementRate: 0.9,
    streakProbability: 0.9
  }
}

/**
 * Generate skill-level appropriate mock data
 */
export const generateSkillLevelData = (_skillLevel: keyof typeof mockDataConfigs) => {
  // const config = mockDataConfigs[skillLevel] // Unused for now
  // Implementation would adjust all mock data based on skill level
  return generateMockProgressData()
}

/**
 * Command Center theme data for gaming aesthetic
 */
export const commandCenterData = {
  systemStatus: 'OPERATIONAL',
  lastSync: Date.now(),
  activeModules: [
    { name: 'TACTICAL_SCANNER', status: 'ONLINE', efficiency: 94 },
    { name: 'STRATEGY_ANALYZER', status: 'ONLINE', efficiency: 87 },
    { name: 'PATTERN_RECOGNITION', status: 'ONLINE', efficiency: 91 },
    { name: 'MEMORY_BANK', status: 'ONLINE', efficiency: 96 },
    { name: 'CALCULATION_ENGINE', status: 'ONLINE', efficiency: 89 }
  ],
  alerts: [
    { type: 'SUCCESS', message: 'Study streak milestone reached', timestamp: Date.now() - 3600000 },
    { type: 'INFO', message: 'New achievement unlocked', timestamp: Date.now() - 7200000 },
    { type: 'WARNING', message: 'Endgame skills require attention', timestamp: Date.now() - 14400000 }
  ]
}