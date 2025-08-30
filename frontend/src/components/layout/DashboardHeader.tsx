import React from 'react'
import { Crown, Target, Clock, Trophy, Zap, ArrowRight } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import { useAuth } from '../../hooks/auth/useAuth'
import { useThemeStore } from '../../stores/themeStore'
import { useDashboard } from '../../hooks/useDashboard'
import { cn } from '../../lib/utils'

interface DashboardHeaderProps {
  className?: string
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ className }) => {
  const { user } = useAuth()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  const {
    stats,
    recentActivity,
    dailyGoals,
    isLoading
  } = useDashboard()

  // Activity ticker animation - cycles through recent activities
  const [currentActivityIndex, setCurrentActivityIndex] = React.useState(0)
  
  React.useEffect(() => {
    if (recentActivity.length > 1) {
      const interval = setInterval(() => {
        setCurrentActivityIndex((prev) => (prev + 1) % recentActivity.length)
      }, 4000) // Change activity every 4 seconds
      
      return () => clearInterval(interval)
    }
  }, [recentActivity.length])

  const currentActivity = recentActivity[currentActivityIndex]

  if (isLoading) {
    return (
      <div className={cn(
        "space-y-4 p-6 rounded-2xl",
        theme.glassMorphism,
        "backdrop-blur-sm border border-white/10",
        className
      )}>
        <div className="animate-pulse">
          <div className="h-8 bg-white/10 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "space-y-6 p-6 rounded-2xl",
      theme.glassMorphism,
      "backdrop-blur-sm border border-white/10",
      className
    )}>
      {/* Welcome Message Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle Button */}
          <SidebarTrigger className="text-white hover:text-white/80 hover:bg-white/10" />
          
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-400" />
              Welcome back, {user?.username || 'Chess Master'}!
            </h1>
            <p className="text-white/70">
            {new Date().getHours() < 12 
              ? 'Good morning! Ready to conquer the board?' 
              : new Date().getHours() < 18 
              ? 'Good afternoon! Time to sharpen your skills!' 
              : 'Good evening! Perfect time for some strategic games!'
            }
            </p>
          </div>
        </div>

        {/* Current ELO Badge */}
        <div className={cn(
          "px-4 py-2 rounded-xl flex items-center gap-2",
          "bg-gradient-to-r", theme.accent,
          "shadow-lg"
        )}>
          <Crown className="h-5 w-5 text-white" />
          <span className="text-white font-bold text-lg">
            {stats?.chess_elo || user?.chess_elo || 1200}
          </span>
        </div>
      </div>

      {/* Recent Activity Ticker */}
      {currentActivity && (
        <div className="bg-black/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                currentActivity.type === 'game' && currentActivity.result === 'win' ? 'bg-green-400' :
                currentActivity.type === 'game' && currentActivity.result === 'loss' ? 'bg-red-400' :
                currentActivity.type === 'puzzle' ? 'bg-blue-400' : 'bg-purple-400'
              )} />
              
              <div className="text-white">
                <span className="text-sm font-medium">Latest Activity:</span>
                <span className="ml-2">{currentActivity.description}</span>
                {currentActivity.rating_change && (
                  <span className={cn(
                    "ml-2 font-medium",
                    currentActivity.rating_change > 0 ? 'text-green-400' : 'text-red-400'
                  )}>
                    {currentActivity.rating_change > 0 ? '+' : ''}{currentActivity.rating_change}
                  </span>
                )}
              </div>
            </div>
            
            {/* Activity Navigation */}
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <span>{currentActivityIndex + 1}/{recentActivity.length}</span>
              <ArrowRight className="h-3 w-3 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Statistics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Daily Goals Progress */}
        <div className="bg-black/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-5 w-5 text-blue-400" />
            <span className="text-xs text-white/60">Daily Goals</span>
          </div>
          <div className="space-y-2">
            <div className="text-white font-medium text-sm">
              Games: {dailyGoals.games.current}/{dailyGoals.games.target}
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min((dailyGoals.games.current / dailyGoals.games.target) * 100, 100)}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Puzzle Progress */}
        <div className="bg-black/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span className="text-xs text-white/60">Puzzles</span>
          </div>
          <div className="space-y-2">
            <div className="text-white font-medium text-sm">
              Solved: {dailyGoals.puzzles.current}/{dailyGoals.puzzles.target}
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min((dailyGoals.puzzles.current / dailyGoals.puzzles.target) * 100, 100)}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Study Time */}
        <div className="bg-black/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-5 w-5 text-green-400" />
            <span className="text-xs text-white/60">Study Time</span>
          </div>
          <div className="space-y-2">
            <div className="text-white font-medium text-sm">
              {dailyGoals.study_time.current}m/{dailyGoals.study_time.target}m
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${Math.min((dailyGoals.study_time.current / dailyGoals.study_time.target) * 100, 100)}%` 
                }}
              />
            </div>
          </div>
        </div>

        {/* Win Streak */}
        <div className="bg-black/20 rounded-xl p-4 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="h-5 w-5 text-orange-400" />
            <span className="text-xs text-white/60">Win Streak</span>
          </div>
          <div className="space-y-1">
            <div className="text-white font-bold text-lg">
              {stats?.daily_streak || 0}
            </div>
            <div className="text-xs text-white/60">
              games in a row
            </div>
          </div>
        </div>
      </div>

      {/* Quick Motivation Message */}
      <div className="text-center">
        <p className="text-white/60 text-sm italic">
          {dailyGoals.games.current >= dailyGoals.games.target ? 
            "🎉 Daily game goal completed! You're on fire!" :
            `${dailyGoals.games.target - dailyGoals.games.current} more games to reach your daily goal!`
          }
        </p>
      </div>
    </div>
  )
}

export default DashboardHeader