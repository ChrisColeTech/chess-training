import React from 'react'
import { Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useThemeStore } from '@/stores/themeStore'
import { useProfile } from '@/hooks/useProfile'
import { 
  ProfileHeader, 
  ProfileTabs, 
  ProfileOverview, 
  ProfileAchievements, 
  ProfileActivity 
} from '@/components/core/profile'

export const ProfilePage: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  // const { user } = useAuthStore() // Unused for now
  const theme = getCurrentTheme()
  
  // Profile management hook (all business logic extracted here)
  const {
    selectedTab,
    // isLoading, // Unused for now
    // error, // Unused for now
    // profileData, // Unused for now
    
    // Handlers (business logic extracted to hook)
    handleTabChange,
    handleEditProfile,
    handleQuickAction,
    // clearError, // Unused for now
    
    // Utility functions
    getRarityColor,
    getActivityIcon,
    calculateAchievementProgress,
    
    // Computed values
    achievements,
    quickActions,
    recentActivity,
    userStats
  } = useProfile()

  return (
    <div className={`min-h-full`}>
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-20 w-64 h-64 bg-gradient-to-br ${theme.accent} rounded-full opacity-10 blur-3xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br ${theme.highlight} rounded-full opacity-15 blur-3xl animate-pulse-glow animation-delay-2000`}></div>
        <div className={`absolute top-1/2 left-10 w-48 h-48 bg-gradient-to-br ${theme.secondary} rounded-full opacity-8 blur-2xl animate-pulse-glow animation-delay-4000`}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-2`}>
                Player Profile
              </h1>
              <p className={`text-lg ${theme.text} opacity-70`}>
                Track your chess journey and celebrate achievements
              </p>
            </div>
            <Button
              onClick={handleEditProfile}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white"
            >
              <Settings size={16} className="mr-2" />
              Edit Profile
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Summary Card */}
            <div className="lg:col-span-1">
              <ProfileHeader 
                userStats={userStats}
                onEditProfile={handleEditProfile}
                theme={theme}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tab Navigation */}
              <ProfileTabs
                selectedTab={selectedTab}
                onTabChange={handleTabChange}
                theme={theme}
              />

              {/* Tab Content */}
              {selectedTab === 'overview' && (
                <ProfileOverview
                  userStats={userStats}
                  quickActions={quickActions}
                  onQuickAction={handleQuickAction}
                  theme={theme}
                />
              )}

              {selectedTab === 'achievements' && (
                <ProfileAchievements
                  achievements={achievements}
                  getRarityColor={getRarityColor}
                  calculateProgress={calculateAchievementProgress}
                  theme={theme}
                />
              )}

              {selectedTab === 'activity' && (
                <ProfileActivity
                  recentActivity={recentActivity}
                  getActivityIcon={getActivityIcon}
                  theme={theme}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage