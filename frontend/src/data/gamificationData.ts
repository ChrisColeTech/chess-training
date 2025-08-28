/**
 * Gamification Mock Data
 * Comprehensive achievement data for the TROPHY ROOM experience
 */

import type { 
  Achievement, 
  AchievementSeries, 
  AchievementStats,
  AchievementLeaderboardEntry,
  AchievementNotification,
  AchievementCategory,
  AchievementRarity
} from '@/types/achievements'

/**
 * Mock Achievements - TROPHY ROOM Collection
 */
export const mockAchievements: Achievement[] = [
  // TACTICAL MASTERY SERIES
  {
    id: 'first_puzzle',
    title: 'First Strike',
    description: 'Solve your first tactical puzzle',
    lore: 'Every grandmaster started with a single move...',
    icon: 'Target',
    category: 'Tactical',
    rarity: 'Common',
    status: 'completed',
    conditions: [{
      type: 'puzzles_solved',
      target: 1,
      current: 1,
      description: 'Solve 1 tactical puzzle',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 50,
      badge: 'first_strike_badge',
      description: '+50 XP, Novice Tactician Badge'
    },
    earnedAt: new Date('2024-01-15T10:30:00Z'),
    progress: 100,
    isHidden: false,
    isSecret: false,
    series: 'tactical_mastery',
    seriesOrder: 1,
    tags: ['beginner', 'tactical', 'first'],
    difficulty: 1
  },
  {
    id: 'puzzle_apprentice',
    title: 'Tactical Apprentice',
    description: 'Solve 100 tactical puzzles',
    lore: 'Pattern recognition begins to emerge from the chaos of calculation...',
    icon: 'Sword',
    category: 'Tactical',
    rarity: 'Common',
    status: 'completed',
    conditions: [{
      type: 'puzzles_solved',
      target: 100,
      current: 100,
      description: 'Solve 100 tactical puzzles',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 150,
      badge: 'tactical_apprentice_badge',
      description: '+150 XP, Apprentice Badge'
    },
    earnedAt: new Date('2024-02-20T14:45:00Z'),
    progress: 100,
    isHidden: false,
    isSecret: false,
    series: 'tactical_mastery',
    seriesOrder: 2,
    tags: ['tactical', 'progression'],
    difficulty: 2
  },
  {
    id: 'puzzle_master',
    title: 'Tactical Grandmaster',
    description: 'Solve 1000 tactical puzzles',
    lore: 'Your tactical vision pierces through the veil of complexity with surgical precision...',
    icon: 'Crown',
    category: 'Tactical',
    rarity: 'Epic',
    status: 'completed',
    conditions: [{
      type: 'puzzles_solved',
      target: 1000,
      current: 1000,
      description: 'Solve 1000 tactical puzzles',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 500,
      badge: 'tactical_grandmaster_badge',
      title: 'Tactical Grandmaster',
      unlocks: ['golden_pieces_theme'],
      description: '+500 XP, Grandmaster Title, Golden Pieces'
    },
    earnedAt: new Date('2024-06-20T18:20:00Z'),
    progress: 100,
    isHidden: false,
    isSecret: false,
    series: 'tactical_mastery',
    seriesOrder: 3,
    tags: ['tactical', 'mastery', 'elite'],
    difficulty: 4
  },
  {
    id: 'puzzle_legend',
    title: 'Tactical Immortal',
    description: 'Solve 5000 tactical puzzles',
    lore: 'Legends speak of those who see twenty moves ahead in a single glance...',
    icon: 'Zap',
    category: 'Tactical',
    rarity: 'Mythic',
    status: 'in_progress',
    conditions: [{
      type: 'puzzles_solved',
      target: 5000,
      current: 2847,
      description: 'Solve 5000 tactical puzzles',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 2000,
      badge: 'tactical_immortal_badge',
      title: 'Tactical Immortal',
      unlocks: ['mythic_board_theme', 'lightning_effects'],
      description: '+2000 XP, Immortal Title, Mythic Theme'
    },
    progress: 57,
    isHidden: false,
    isSecret: false,
    series: 'tactical_mastery',
    seriesOrder: 4,
    tags: ['tactical', 'legendary', 'mythic'],
    difficulty: 5
  },

  // RATING CONQUEST SERIES
  {
    id: 'first_victory',
    title: 'First Blood',
    description: 'Win your first game',
    lore: 'Victory tastes sweeter than honey, and twice as addictive...',
    icon: 'Trophy',
    category: 'Rating',
    rarity: 'Common',
    status: 'completed',
    conditions: [{
      type: 'games_played',
      target: 1,
      current: 1,
      description: 'Win 1 game',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 25,
      badge: 'first_blood_badge',
      description: '+25 XP, Victory Badge'
    },
    earnedAt: new Date('2024-01-12T09:15:00Z'),
    progress: 100,
    isHidden: false,
    isSecret: false,
    series: 'rating_conquest',
    seriesOrder: 1,
    tags: ['beginner', 'victory', 'first'],
    difficulty: 1
  },
  {
    id: 'rising_warrior',
    title: 'Rising Warrior',
    description: 'Reach 1500 rating',
    lore: 'From the ashes of defeat, warriors are forged...',
    icon: 'Shield',
    category: 'Rating',
    rarity: 'Rare',
    status: 'completed',
    conditions: [{
      type: 'rating',
      target: 1500,
      current: 1500,
      description: 'Achieve 1500 rating',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 200,
      badge: 'rising_warrior_badge',
      description: '+200 XP, Warrior Badge'
    },
    earnedAt: new Date('2024-03-10T16:30:00Z'),
    progress: 100,
    isHidden: false,
    isSecret: false,
    series: 'rating_conquest',
    seriesOrder: 2,
    tags: ['rating', 'milestone', 'warrior'],
    difficulty: 2
  },
  {
    id: 'champion_ascendant',
    title: 'Champion Ascendant',
    description: 'Reach 2000 rating',
    lore: 'You stand at the threshold of chess mastery, where legends are born...',
    icon: 'Star',
    category: 'Rating',
    rarity: 'Legendary',
    status: 'in_progress',
    conditions: [{
      type: 'rating',
      target: 2000,
      current: 1847,
      description: 'Achieve 2000 rating',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 1000,
      badge: 'champion_badge',
      title: 'Chess Champion',
      unlocks: ['champion_crown_pieces'],
      description: '+1000 XP, Champion Title, Crown Pieces'
    },
    progress: 92,
    isHidden: false,
    isSecret: false,
    series: 'rating_conquest',
    seriesOrder: 3,
    tags: ['rating', 'champion', 'legendary'],
    difficulty: 4
  },

  // STREAK DOMINATION SERIES
  {
    id: 'win_streak_5',
    title: 'Hot Streak',
    description: 'Win 5 games in a row',
    lore: 'Momentum is the chess player\'s greatest ally...',
    icon: 'Fire',
    category: 'Streaks',
    rarity: 'Rare',
    status: 'completed',
    conditions: [{
      type: 'streak',
      target: 5,
      current: 5,
      description: '5 consecutive wins',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 150,
      badge: 'hot_streak_badge',
      description: '+150 XP, Fire Badge'
    },
    earnedAt: new Date('2024-04-05T12:00:00Z'),
    progress: 100,
    isHidden: false,
    isSecret: false,
    series: 'streak_domination',
    seriesOrder: 1,
    tags: ['streak', 'momentum'],
    difficulty: 2
  },
  {
    id: 'win_streak_10',
    title: 'Unstoppable Force',
    description: 'Win 10 games in a row',
    lore: 'When victory becomes habit, opponents tremble before your approach...',
    icon: 'Fire',
    category: 'Streaks',
    rarity: 'Epic',
    status: 'completed',
    conditions: [{
      type: 'streak',
      target: 10,
      current: 10,
      description: '10 consecutive wins',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 300,
      badge: 'unstoppable_badge',
      description: '+300 XP, Unstoppable Badge'
    },
    earnedAt: new Date('2024-05-03T19:45:00Z'),
    progress: 100,
    isHidden: false,
    isSecret: false,
    series: 'streak_domination',
    seriesOrder: 2,
    tags: ['streak', 'domination', 'elite'],
    difficulty: 3
  },

  // STUDY DEDICATION SERIES
  {
    id: 'dedicated_student',
    title: 'Dedicated Scholar',
    description: 'Study for 50 hours total',
    lore: 'Knowledge is the foundation upon which chess mastery is built...',
    icon: 'BookOpen',
    category: 'Study',
    rarity: 'Rare',
    status: 'in_progress',
    conditions: [{
      type: 'study_hours',
      target: 50,
      current: 34,
      description: '50 hours of study time',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 250,
      badge: 'scholar_badge',
      description: '+250 XP, Scholar Badge'
    },
    progress: 68,
    isHidden: false,
    isSecret: false,
    series: 'study_dedication',
    seriesOrder: 1,
    tags: ['study', 'dedication'],
    difficulty: 2
  },
  {
    id: 'chess_sage',
    title: 'Chess Sage',
    description: 'Study for 200 hours total',
    lore: 'Wisdom comes to those who seek it with unwavering dedication...',
    icon: 'BookOpen',
    category: 'Study',
    rarity: 'Legendary',
    status: 'available',
    conditions: [{
      type: 'study_hours',
      target: 200,
      current: 34,
      description: '200 hours of study time',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 750,
      badge: 'sage_badge',
      title: 'Chess Sage',
      unlocks: ['ancient_wisdom_theme'],
      description: '+750 XP, Sage Title, Ancient Theme'
    },
    progress: 17,
    isHidden: false,
    isSecret: false,
    series: 'study_dedication',
    seriesOrder: 2,
    tags: ['study', 'wisdom', 'legendary'],
    difficulty: 4
  },

  // SPECIAL ACHIEVEMENTS
  {
    id: 'speed_demon',
    title: 'Zap Reflexes',
    description: 'Win a bullet game in under 60 seconds',
    lore: 'Speed kills, but precision devastates...',
    icon: 'Zap',
    category: 'Special',
    rarity: 'Epic',
    status: 'completed',
    conditions: [{
      type: 'games_played',
      target: 1,
      current: 1,
      description: 'Win bullet game < 60 seconds',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 400,
      badge: 'lightning_badge',
      description: '+400 XP, Zap Badge'
    },
    earnedAt: new Date('2024-04-18T20:10:00Z'),
    progress: 100,
    isHidden: false,
    isSecret: false,
    tags: ['speed', 'bullet', 'special'],
    difficulty: 3
  },
  {
    id: 'perfection_artist',
    title: 'Artist of Perfection',
    description: 'Play a game with 100% accuracy',
    lore: 'Perfection is not attainable, but if we chase perfection we can catch excellence...',
    icon: 'Star',
    category: 'Special',
    rarity: 'Mythic',
    status: 'available',
    conditions: [{
      type: 'accuracy',
      target: 100,
      current: 0,
      description: '100% accuracy in a game',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 2500,
      badge: 'perfection_badge',
      title: 'Perfectionist',
      unlocks: ['perfect_crystal_theme', 'perfection_aura'],
      description: '+2500 XP, Perfectionist Title, Crystal Theme'
    },
    progress: 0,
    isHidden: false,
    isSecret: true,
    tags: ['perfect', 'accuracy', 'mythic', 'secret'],
    difficulty: 5
  },
  {
    id: 'endgame_surgeon',
    title: 'Endgame Surgeon',
    description: 'Master 25 endgame positions',
    lore: 'In the endgame, precision is the difference between victory and defeat...',
    icon: 'Crown',
    category: 'Endgame',
    rarity: 'Epic',
    status: 'in_progress',
    conditions: [{
      type: 'puzzles_solved',
      target: 25,
      current: 18,
      description: 'Master 25 endgame positions',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 600,
      badge: 'surgeon_badge',
      title: 'Endgame Surgeon',
      description: '+600 XP, Surgeon Title'
    },
    progress: 72,
    isHidden: false,
    isSecret: false,
    tags: ['endgame', 'precision', 'mastery'],
    difficulty: 4
  },

  // OPENING EXPLORER SERIES
  {
    id: 'opening_apprentice',
    title: 'Opening Explorer',
    description: 'Study 10 different opening variations',
    lore: 'Every journey begins with a single step, every game with a single move...',
    icon: 'BookOpen',
    category: 'Opening',
    rarity: 'Common',
    status: 'completed',
    conditions: [{
      type: 'study_hours',
      target: 10,
      current: 10,
      description: 'Study 10 opening variations',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 100,
      badge: 'explorer_badge',
      description: '+100 XP, Explorer Badge'
    },
    earnedAt: new Date('2024-03-25T11:20:00Z'),
    progress: 100,
    isHidden: false,
    isSecret: false,
    series: 'opening_mastery',
    seriesOrder: 1,
    tags: ['opening', 'exploration'],
    difficulty: 1
  },

  // MILESTONE ACHIEVEMENTS
  {
    id: 'century_club',
    title: 'Century Club',
    description: 'Play 100 games',
    lore: 'Experience is the greatest teacher, and you\'ve been a dedicated student...',
    icon: 'Trophy',
    category: 'Milestones',
    rarity: 'Rare',
    status: 'completed',
    conditions: [{
      type: 'games_played',
      target: 100,
      current: 100,
      description: 'Play 100 games',
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 300,
      badge: 'century_badge',
      description: '+300 XP, Century Badge'
    },
    earnedAt: new Date('2024-05-15T16:00:00Z'),
    progress: 100,
    isHidden: false,
    isSecret: false,
    tags: ['milestone', 'experience'],
    difficulty: 2
  },

  // HIDDEN ACHIEVEMENTS
  {
    id: 'secret_master',
    title: '???',
    description: 'A mysterious achievement awaits...',
    lore: 'Some secrets are worth discovering...',
    icon: 'Lock',
    category: 'Special',
    rarity: 'Legendary',
    status: 'locked',
    conditions: [{
      type: 'achievement',
      target: 1,
      current: 0,
      description: 'Unlock the secret path...',
      requiredAchievements: ['puzzle_master', 'champion_ascendant', 'chess_sage'],
      timeFrame: 'all_time'
    }],
    reward: {
      xp: 1500,
      badge: 'secret_master_badge',
      title: 'Secret Master',
      unlocks: ['shadow_realm_theme'],
      description: '+1500 XP, Secret Master Title'
    },
    progress: 0,
    isHidden: true,
    isSecret: true,
    tags: ['secret', 'hidden', 'mystery'],
    difficulty: 5
  }
]

/**
 * Achievement Series Data
 */
export const mockAchievementSeries: AchievementSeries[] = [
  {
    id: 'tactical_mastery',
    name: 'Tactical Mastery',
    description: 'Master the art of tactical calculation',
    icon: 'Sword',
    achievementIds: ['first_puzzle', 'puzzle_apprentice', 'puzzle_master', 'puzzle_legend'],
    totalCount: 4,
    completedCount: 3,
    progress: 75,
    seriesReward: {
      xp: 1000,
      badge: 'tactical_master_series',
      title: 'Tactical Master',
      unlocks: ['tactical_master_theme'],
      description: '+1000 XP, Master Title, Special Theme'
    }
  },
  {
    id: 'rating_conquest',
    name: 'Rating Conquest',
    description: 'Climb the rating ladder to greatness',
    icon: 'Trophy',
    achievementIds: ['first_victory', 'rising_warrior', 'champion_ascendant'],
    totalCount: 3,
    completedCount: 2,
    progress: 67
  },
  {
    id: 'streak_domination',
    name: 'Streak Domination',
    description: 'Dominate your opponents with unstoppable streaks',
    icon: 'Fire',
    achievementIds: ['win_streak_5', 'win_streak_10'],
    totalCount: 2,
    completedCount: 2,
    progress: 100
  },
  {
    id: 'study_dedication',
    name: 'Study Dedication',
    description: 'Dedication to learning brings wisdom',
    icon: 'BookOpen',
    achievementIds: ['dedicated_student', 'chess_sage'],
    totalCount: 2,
    completedCount: 0,
    progress: 0
  },
  {
    id: 'opening_mastery',
    name: 'Opening Mastery',
    description: 'Master the opening phase of chess',
    icon: 'BookOpen',
    achievementIds: ['opening_apprentice'],
    totalCount: 1,
    completedCount: 1,
    progress: 100
  }
]

/**
 * Achievement Statistics
 */
export const mockAchievementStats: AchievementStats = {
  totalAchievements: mockAchievements.length,
  completedAchievements: mockAchievements.filter(a => a.status === 'completed').length,
  completionRate: Math.round((mockAchievements.filter(a => a.status === 'completed').length / mockAchievements.length) * 100),
  totalXpEarned: mockAchievements
    .filter(a => a.status === 'completed')
    .reduce((total, a) => total + a.reward.xp, 0),
  byRarity: {
    Common: {
      total: mockAchievements.filter(a => a.rarity === 'Common').length,
      completed: mockAchievements.filter(a => a.rarity === 'Common' && a.status === 'completed').length,
      rate: 0
    },
    Rare: {
      total: mockAchievements.filter(a => a.rarity === 'Rare').length,
      completed: mockAchievements.filter(a => a.rarity === 'Rare' && a.status === 'completed').length,
      rate: 0
    },
    Epic: {
      total: mockAchievements.filter(a => a.rarity === 'Epic').length,
      completed: mockAchievements.filter(a => a.rarity === 'Epic' && a.status === 'completed').length,
      rate: 0
    },
    Legendary: {
      total: mockAchievements.filter(a => a.rarity === 'Legendary').length,
      completed: mockAchievements.filter(a => a.rarity === 'Legendary' && a.status === 'completed').length,
      rate: 0
    },
    Mythic: {
      total: mockAchievements.filter(a => a.rarity === 'Mythic').length,
      completed: mockAchievements.filter(a => a.rarity === 'Mythic' && a.status === 'completed').length,
      rate: 0
    }
  },
  byCategory: {
    Tactical: {
      total: mockAchievements.filter(a => a.category === 'Tactical').length,
      completed: mockAchievements.filter(a => a.category === 'Tactical' && a.status === 'completed').length,
      rate: 0
    },
    Rating: {
      total: mockAchievements.filter(a => a.category === 'Rating').length,
      completed: mockAchievements.filter(a => a.category === 'Rating' && a.status === 'completed').length,
      rate: 0
    },
    Study: {
      total: mockAchievements.filter(a => a.category === 'Study').length,
      completed: mockAchievements.filter(a => a.category === 'Study' && a.status === 'completed').length,
      rate: 0
    },
    Special: {
      total: mockAchievements.filter(a => a.category === 'Special').length,
      completed: mockAchievements.filter(a => a.category === 'Special' && a.status === 'completed').length,
      rate: 0
    },
    Endgame: {
      total: mockAchievements.filter(a => a.category === 'Endgame').length,
      completed: mockAchievements.filter(a => a.category === 'Endgame' && a.status === 'completed').length,
      rate: 0
    },
    Opening: {
      total: mockAchievements.filter(a => a.category === 'Opening').length,
      completed: mockAchievements.filter(a => a.category === 'Opening' && a.status === 'completed').length,
      rate: 0
    },
    Puzzles: {
      total: mockAchievements.filter(a => a.category === 'Puzzles').length,
      completed: mockAchievements.filter(a => a.category === 'Puzzles' && a.status === 'completed').length,
      rate: 0
    },
    Games: {
      total: mockAchievements.filter(a => a.category === 'Games').length,
      completed: mockAchievements.filter(a => a.category === 'Games' && a.status === 'completed').length,
      rate: 0
    },
    Streaks: {
      total: mockAchievements.filter(a => a.category === 'Streaks').length,
      completed: mockAchievements.filter(a => a.category === 'Streaks' && a.status === 'completed').length,
      rate: 0
    },
    Milestones: {
      total: mockAchievements.filter(a => a.category === 'Milestones').length,
      completed: mockAchievements.filter(a => a.category === 'Milestones' && a.status === 'completed').length,
      rate: 0
    }
  },
  recentlyEarned: mockAchievements
    .filter(a => a.status === 'completed' && a.earnedAt)
    .sort((a, b) => (b.earnedAt?.getTime() ?? 0) - (a.earnedAt?.getTime() ?? 0))
    .slice(0, 10),
  nearCompletion: mockAchievements
    .filter(a => a.status === 'in_progress' && a.progress >= 75)
    .sort((a, b) => b.progress - a.progress),
  currentStreak: 7,
  longestStreak: 12,
  averageDifficulty: 2.8
}

// Calculate completion rates
Object.keys(mockAchievementStats.byRarity).forEach(rarity => {
  const data = mockAchievementStats.byRarity[rarity as keyof typeof mockAchievementStats.byRarity]
  data.rate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0
})

Object.keys(mockAchievementStats.byCategory).forEach(category => {
  const data = mockAchievementStats.byCategory[category as keyof typeof mockAchievementStats.byCategory]
  data.rate = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0
})

/**
 * Mock Leaderboard Data
 */
export const mockLeaderboard: AchievementLeaderboardEntry[] = [
  {
    userId: 'player1',
    username: 'GrandmasterFlash',
    avatar: '<Trophy className="w-4 h-4 inline" />',
    totalAchievements: 45,
    completionRate: 89,
    totalXp: 12500,
    rarestAchievement: mockAchievements.find(a => a.rarity === 'Mythic'),
    latestAchievement: mockAchievements.find(a => a.id === 'speed_demon'),
    rank: 1,
    previousRank: 2
  },
  {
    userId: 'current_user',
    username: 'You',
    avatar: '<Star className="w-4 h-4 inline" />',
    totalAchievements: mockAchievementStats.completedAchievements,
    completionRate: mockAchievementStats.completionRate,
    totalXp: mockAchievementStats.totalXpEarned,
    rarestAchievement: mockAchievements.find(a => a.id === 'puzzle_master'),
    latestAchievement: mockAchievements.find(a => a.id === 'win_streak_10'),
    rank: 2,
    previousRank: 3
  },
  {
    userId: 'player3',
    username: 'TacticalNinja',
    avatar: '🥷',
    totalAchievements: 38,
    completionRate: 76,
    totalXp: 9800,
    rarestAchievement: mockAchievements.find(a => a.id === 'speed_demon'),
    latestAchievement: mockAchievements.find(a => a.id === 'century_club'),
    rank: 3,
    previousRank: 1
  }
]

/**
 * Mock Notifications
 */
export const mockNotifications: AchievementNotification[] = [
  {
    id: 'notif_1',
    achievement: mockAchievements.find(a => a.id === 'win_streak_10')!,
    earnedAt: new Date('2024-05-03T19:45:00Z'),
    isRead: false,
    isDismissed: false
  },
  {
    id: 'notif_2',
    achievement: mockAchievements.find(a => a.id === 'century_club')!,
    earnedAt: new Date('2024-05-15T16:00:00Z'),
    isRead: true,
    isDismissed: false
  }
]

/**
 * Default Achievement Filters
 */
export const defaultAchievementFilters = {
  categories: [] as AchievementCategory[],
  rarities: [] as AchievementRarity[],
  statuses: [] as any[],
  earnedOnly: false,
  availableOnly: false,
  secretOnly: false,
  searchText: '',
  sortBy: 'title' as const,
  sortDirection: 'asc' as const,
  difficultyRange: [1, 5] as [number, number],
  seriesFilter: undefined
}