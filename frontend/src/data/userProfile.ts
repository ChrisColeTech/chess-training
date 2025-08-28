import type { ProfileData, ProfileUser, Achievement, RecentActivity, QuickAction } from '@/types/profile'

// Mock user statistics data
export const mockUserStats: ProfileUser = {
  displayName: 'Chess Master',
  email: 'chess.master@example.com',
  skillLevel: 'intermediate',
  joinDate: '2024-01-15',
  currentRating: 1450,
  peakRating: 1520,
  ratingChange: +25,
  gamesPlayed: 247,
  puzzlesSolved: 1834,
  studyHours: 67,
  winRate: 67.2,
  currentStreak: 8,
  longestStreak: 15,
  favoriteOpening: "Queen's Gambit"
}

// Mock achievements data
export const mockAchievements: Achievement[] = [
  { 
    id: 'tactical-master', 
    name: 'Tactical Master', 
    description: 'Solve 1000 tactical puzzles', 
    icon: 'Target', 
    unlocked: true, 
    progress: 1000, 
    total: 1000,
    rarity: 'epic'
  },
  { 
    id: 'endgame-expert', 
    name: 'Endgame Expert', 
    description: 'Master 50 endgame patterns', 
    icon: 'Crown', 
    unlocked: true, 
    progress: 50, 
    total: 50,
    rarity: 'rare'
  },
  { 
    id: 'speed-demon', 
    name: 'Speed Demon', 
    description: 'Win 25 blitz games', 
    icon: 'Zap', 
    unlocked: false, 
    progress: 18, 
    total: 25,
    rarity: 'common'
  },
  { 
    id: 'tournament-warrior', 
    name: 'Tournament Warrior', 
    description: 'Participate in 10 tournaments', 
    icon: 'Sword', 
    unlocked: false, 
    progress: 3, 
    total: 10,
    rarity: 'legendary'
  }
]

// Mock recent activity data
export const mockRecentActivity: RecentActivity[] = [
  { 
    type: 'puzzle', 
    description: 'Solved tactical puzzle #2847', 
    time: '2 hours ago', 
    points: '+12 ELO' 
  },
  { 
    type: 'game', 
    description: 'Won against AI (Level 8)', 
    time: '1 day ago', 
    points: '+15 ELO' 
  },
  { 
    type: 'achievement', 
    description: 'Unlocked "Tactical Master" badge', 
    time: '2 days ago', 
    points: 'New Badge!' 
  },
  { 
    type: 'study', 
    description: 'Completed endgame lesson', 
    time: '3 days ago', 
    points: '+8 ELO' 
  }
]

// Mock quick actions data
export const mockQuickActions: QuickAction[] = [
  { 
    title: 'Train Tactics', 
    description: 'Solve puzzles to improve', 
    icon: 'Target', 
    color: 'from-red-500 to-pink-600', 
    link: '/puzzles/tactics' 
  },
  { 
    title: 'Play AI', 
    description: 'Challenge the computer', 
    icon: 'Brain', 
    color: 'from-blue-500 to-cyan-600', 
    link: '/play/computer' 
  },
  { 
    title: 'Analyze Games', 
    description: 'Review your performance', 
    icon: 'TrendingUp', 
    color: 'from-green-500 to-emerald-600', 
    link: '/play/analysis' 
  },
  { 
    title: 'Study Openings', 
    description: 'Learn opening theory', 
    icon: 'Shield', 
    color: 'from-purple-500 to-violet-600', 
    link: '/study/openings' 
  }
]

// Complete mock profile data
export const mockUserProfile: ProfileData = {
  userStats: mockUserStats,
  achievements: mockAchievements,
  recentActivity: mockRecentActivity,
  quickActions: mockQuickActions
}