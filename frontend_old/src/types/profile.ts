
// Profile tab types
export type ProfileTab = 'overview' | 'achievements' | 'activity'

// Profile user data structure
export interface ProfileUser {
  displayName: string
  email: string
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  joinDate: string
  currentRating: number
  peakRating: number
  ratingChange: number
  gamesPlayed: number
  puzzlesSolved: number
  studyHours: number
  winRate: number
  currentStreak: number
  longestStreak: number
  favoriteOpening: string
}

// Achievement data structure  
export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  total: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

// Recent activity data structure
export interface RecentActivity {
  type: 'puzzle' | 'game' | 'achievement' | 'study'
  description: string
  time: string
  points: string
}

// Quick action data structure  
export interface QuickAction {
  title: string
  description: string
  icon: string
  color: string
  link: string
}

// Complete profile data structure
export interface ProfileData {
  userStats: ProfileUser
  achievements: Achievement[]
  recentActivity: RecentActivity[]
  quickActions: QuickAction[]
}

// Profile component props
export interface ProfileHeaderProps {
  userStats: ProfileUser
  onEditProfile: () => void
  theme: any
}

export interface ProfileTabsProps {
  selectedTab: ProfileTab
  onTabChange: (tab: ProfileTab) => void
  theme: any
}

export interface ProfileOverviewProps {
  userStats: ProfileUser
  quickActions: QuickAction[]
  onQuickAction: (link: string) => void
  theme: any
  isLoading?: boolean
  error?: Error | null
}

export interface ProfileAchievementsProps {
  achievements: Achievement[]
  getRarityColor: (rarity: string) => string
  calculateProgress: (achievement: Achievement) => number
  theme: any
  isLoading?: boolean
  error?: Error | null
}

export interface ProfileActivityProps {
  recentActivity: RecentActivity[]
  getActivityIcon: (type: string) => string
  theme: any
  isLoading?: boolean
  error?: Error | null
}

// Stats grid component props
export interface StatsGridProps {
  userStats: ProfileUser
  theme: any
}