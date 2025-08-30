import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Share, Sparkles, Star, Target, TrendingUp, Trophy, Users } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import { useThemeStore } from '@/stores/themeStore'
import { useAchievements } from '@/hooks/useAchievements'
import { soundFX } from '@/utils/soundEffects'
import {
  AchievementGrid,
  AchievementFilters,
  AchievementStats,
  BadgeDetails
} from '@/components/progress/achievements'

/**
 * Achievements Page - TROPHY ROOM
 * Professional achievements gallery with comprehensive gamification system
 */
const AchievementsPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  // Use the achievements hook for all business logic
  const {
    achievements,
    filteredAchievements,
    stats,
    leaderboard,
    // notifications, // Unused for now
    filters,
    setFilters,
    // resetFilters, // Unused for now
    selectedAchievement,
    setSelectedAchievement,
    isLoading,
    error,
    clearError,
    // shareAchievement, // Unused for now
    // nearCompletionAchievements, // Unused for now
    recommendedAchievements
  } = useAchievements()

  const [viewMode, setViewMode] = useState<'grid' | 'stats' | 'leaderboard'>('grid')
  const [showRecommended, setShowRecommended] = useState(false)

  // Local handler functions
  const handleBackToProgress = () => {
    navigate('/progress')
  }

  const handleAchievementClick = (achievement: any) => {
    setSelectedAchievement(achievement)
    soundFX.playClick()
  }

  const handleShare = (achievement: any) => {
    // Share functionality - mockup for now
    if (navigator.share) {
      navigator.share({
        title: `Achievement Unlocked: ${achievement.title}`,
        text: achievement.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`I just earned the "${achievement.title}" achievement in Chess Training!`)
    }
    soundFX.playSuccess()
  }

  // Get unique categories and rarities for filters
  const availableCategories = [...new Set(achievements.map(a => a.category))]
  const availableRarities = [...new Set(achievements.map(a => a.rarity))]

  return (
    <div className="min-h-full p-4 relative">
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Trophy Particles */}
        <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.primary} rounded-full opacity-20 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.accent} rounded-full opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 left-10 w-24 h-16 bg-gradient-to-br ${theme.secondary} rounded-full opacity-15 blur-lg animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Moving Orbs */}
        <div className={`absolute top-10 right-1/3 w-16 h-16 bg-gradient-to-br ${theme.highlight} rounded-full opacity-30 blur-md animate-float`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-lg animate-float animation-delay-3000`}></div>
        
        {/* Trophy Room Sparkles */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-twinkle"></div>
          <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-500"></div>
          <div className="absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-twinkle animation-delay-1500"></div>
          <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle animation-delay-2500"></div>
        </div>
        
        {/* Floating Trophy Icons */}
        <div className="absolute top-10 right-10 text-6xl opacity-5 animate-bounce-subtle delay-500"><Trophy className="w-4 h-4 inline" /></div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-5 animate-bounce-subtle delay-1000"><FaCrown className="w-4 h-4 inline" /></div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">🎖️</div>
        <div className="absolute bottom-1/3 left-1/4 text-7xl opacity-5 animate-bounce-subtle delay-2000"><Star className="w-4 h-4 inline" /></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToProgress}
              className={`p-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:bg-slate-700/50 transition-all duration-200 ${theme.text} hover:text-white hover-glow`}
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                <Trophy className="w-4 h-4 inline" /> TROPHY ROOM
              </h1>
              <p className={`${theme.text} opacity-80 mt-1`}>
                Showcase your chess mastery achievements
              </p>
            </div>
          </div>
          
          {/* View Mode Toggles */}
          <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-2">
            {[
              { key: 'grid', icon: Trophy, label: 'Trophies' },
              { key: 'stats', icon: TrendingUp, label: 'Stats' },
              { key: 'leaderboard', icon: Users, label: 'Rankings' }
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => {
                  setViewMode(key as typeof viewMode)
                  soundFX.playClick()
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  viewMode === key
                    ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg hover-glow`
                    : `${theme.text} opacity-70 hover:opacity-100 hover:bg-slate-700/50`
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl animate-slide-down">
            <div className="flex items-center justify-between">
              <p className="text-red-400">{error}</p>
              <button
                onClick={clearError}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 ${theme.glassMorphism}`}>
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="text-yellow-400" size={24} />
              <span className={`${theme.text} font-medium`}>Total Earned</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {stats.completedAchievements}/{stats.totalAchievements}
            </div>
            <div className={`text-sm ${theme.text} opacity-60`}>Achievements</div>
          </div>
          
          <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 ${theme.glassMorphism}`}>
            <div className="flex items-center gap-3 mb-2">
              <Target className="text-blue-400" size={24} />
              <span className={`${theme.text} font-medium`}>Completion</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.completionRate}%</div>
            <div className={`text-sm ${theme.text} opacity-60`}>Complete</div>
          </div>
          
          <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 ${theme.glassMorphism}`}>
            <div className="flex items-center gap-3 mb-2">
              <FaCrown className="text-purple-400" size={24} />
              <span className={`${theme.text} font-medium`}>Legendary</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {stats.byRarity.Legendary?.completed || 0}/{stats.byRarity.Legendary?.total || 0}
            </div>
            <div className={`text-sm ${theme.text} opacity-60`}>Unlocked</div>
          </div>
          
          <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 ${theme.glassMorphism}`}>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="text-orange-400" size={24} />
              <span className={`${theme.text} font-medium`}>Total XP</span>
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalXpEarned.toLocaleString()}</div>
            <div className={`text-sm ${theme.text} opacity-60`}>Experience</div>
          </div>
        </div>

        {/* Recommended Achievements */}
        {recommendedAchievements.length > 0 && !showRecommended && (
          <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8 ${theme.glassMorphism}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Target size={20} className="text-green-400" />
                Recommended Achievements
              </h2>
              <button
                onClick={() => setShowRecommended(true)}
                className={`px-4 py-2 bg-gradient-to-r ${theme.accent} rounded-lg text-white font-medium hover:opacity-90 transition-opacity hover-glow`}
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedAchievements.slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3">
                  <BadgeDetails
                    achievement={achievement}
                    size="medium"
                    theme={theme}
                    showEffects={true}
                    onClick={() => handleAchievementClick(achievement)}
                  />
                  <div>
                    <h3 className="font-medium text-white">{achievement.title}</h3>
                    <p className={`text-sm ${theme.text} opacity-70`}>{achievement.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        {viewMode === 'grid' && (
          <div className="space-y-8">
            {/* Filters */}
            <AchievementFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableCategories={availableCategories}
              availableRarities={availableRarities}
              theme={theme}
            />

            {/* Achievement Grid */}
            <AchievementGrid
              achievements={filteredAchievements}
              isLoading={isLoading}
              filters={filters}
              onFiltersChange={setFilters}
              onAchievementClick={handleAchievementClick}
              theme={theme}
              columns={4}
              showEmptyState={true}
            />
          </div>
        )}

        {viewMode === 'stats' && (
          <AchievementStats
            stats={stats}
            theme={theme}
            showDetails={true}
          />
        )}

        {viewMode === 'leaderboard' && (
          <div className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 ${theme.glassMorphism}`}>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Users size={24} className={theme.text} />
              Achievement Leaderboard
            </h2>
            <div className="space-y-4">
              {leaderboard.map((entry) => (
                <div
                  key={entry.userId}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-slate-700/30 ${
                    entry.userId === 'current_user' ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30' : 'bg-slate-700/20'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.primary} flex items-center justify-center text-white font-bold`}>
                    {entry.rank}
                  </div>
                  <div className="text-2xl">{entry.avatar}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{entry.username}</h3>
                    <p className={`text-sm ${theme.text} opacity-70`}>
                      {entry.totalAchievements} achievements • {entry.completionRate}% complete
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">{entry.totalXp.toLocaleString()} XP</p>
                    {entry.rarestAchievement && (
                      <p className={`text-sm ${theme.text} opacity-70`}>
                        Latest: {entry.rarestAchievement.title}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 max-w-md w-full ${theme.glassMorphism} animate-slide-up`}>
            <div className="text-center mb-6">
              <BadgeDetails
                achievement={selectedAchievement}
                size="hero"
                theme={theme}
                showEffects={true}
              />
            </div>
            
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white">{selectedAchievement.title}</h2>
              <p className={`${theme.text} opacity-80`}>{selectedAchievement.description}</p>
              
              {selectedAchievement.lore && (
                <p className="text-sm italic opacity-60 text-yellow-400">
                  "{selectedAchievement.lore}"
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-700/20 rounded-xl">
                <div>
                  <p className="text-xs text-slate-400">Category</p>
                  <p className="font-medium text-white">{selectedAchievement.category}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Rarity</p>
                  <p className="font-medium text-white">{selectedAchievement.rarity}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Reward</p>
                  <p className="font-medium text-white">+{selectedAchievement.reward.xp} XP</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Status</p>
                  <p className="font-medium text-white capitalize">{selectedAchievement.status}</p>
                </div>
              </div>

              <div className="flex gap-3">
                {selectedAchievement.status === 'completed' && (
                  <button
                    onClick={() => handleShare(selectedAchievement)}
                    className={`flex-1 px-4 py-2 bg-gradient-to-r ${theme.secondary} rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 hover-glow`}
                  >
                    <Share size={16} />
                    Share
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedAchievement(null)
                    soundFX.playClick()
                  }}
                  className={`flex-1 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg ${theme.text} font-medium transition-colors`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AchievementsPage