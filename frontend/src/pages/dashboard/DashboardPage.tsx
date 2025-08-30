import { Trophy, Clock, BarChart3, AlertCircle, RefreshCw } from 'lucide-react'
import { FaChessKing, FaChessPawn, FaChessQueen, FaChessRook, FaChessBishop, FaChessKnight } from 'react-icons/fa'
import { useAuth } from '../../hooks/auth/useAuth'
import { useThemeStore } from '../../stores/themeStore'
import { useDashboard, type StatsCard } from '../../hooks/dashboard/useDashboard'
import { PageBreadcrumbs } from '../../components/navigation/BreadcrumbNavigation'
import { useNotifications } from '../../hooks/notifications/useNotifications'
import { Button } from '../../components/ui/button'
import { ELOBadge, StatusBadge, RatingChangeBadge } from '../../components/ui/ChessBadge'
import { ELOProgress, DailyGoalsList } from '../../components/ui/ChessProgress'
import { PieceContextMenu } from '../../components/ui/ChessContextMenu'
import { useChessContextMenu } from '../../hooks/chess/useChessContextMenu'

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  const { showSuccess, showGameResult, showAchievement } = useNotifications()
  const { handleMenuItemClick } = useChessContextMenu()
  
  // Business logic extracted to dedicated hook
  const {
    stats,
    statsCards,
    recentActivity,
    isLoading,
    error,
    refreshData
  } = useDashboard()

  // Icon mapping for stats cards
  const iconMap = {
    king: FaChessKing,
    pawn: FaChessPawn,
    queen: FaChessQueen,
    rook: FaChessRook,
    bishop: FaChessBishop,
    knight: FaChessKnight,
    clock: Clock
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 space-y-6 min-h-screen">
        <PageBreadcrumbs className="mb-6" />
        <div className={`${theme.glassMorphism} backdrop-blur-sm border border-white/10 rounded-2xl p-6`}>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="ml-3 text-white/70">Loading dashboard...</span>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 space-y-6 min-h-screen">
        <PageBreadcrumbs className="mb-6" />
        <div className={`${theme.glassMorphism} backdrop-blur-sm border border-white/10 rounded-2xl p-6`}>
          <div className="flex items-center justify-center h-32 text-center">
            <div>
              <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
              <p className="text-white mb-2">Failed to load dashboard</p>
              <p className="text-white/60 text-sm mb-4">{error}</p>
              <Button onClick={refreshData} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Page Navigation */}
      <PageBreadcrumbs className="mb-6" />
      
      {/* Welcome Header */}
      <div className={`${theme.glassMorphism} backdrop-blur-sm border border-white/10 rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user?.username || 'Chess Master'}!
            </h1>
            <p className="text-white/70">
              Ready to improve your game today?
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <ELOBadge rating={stats?.chess_elo || user?.chess_elo || 1200} showIcon />
              <StatusBadge status="online" />
            </div>
            <RatingChangeBadge change={stats?.rating_change || 0} />
            <Button onClick={refreshData} variant="ghost" size="sm" className="text-white/60 hover:text-white">
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* ELO Progress Section */}
        <div className="mt-4">
          <ELOProgress variant="bar" />
        </div>
        
        {/* Demo Toast Buttons */}
        <div className="flex gap-2 mt-4">
          <Button 
            size="sm" 
            onClick={() => showSuccess('Welcome to Chess Training!', { description: 'Your dashboard is ready to use.' })}
          >
            Test Success Toast
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => showGameResult(true, 'Great opening play!', 15)}
          >
            Test Game Win
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => showAchievement('First Victory', 'You won your first game!')}
          >
            Test Achievement
          </Button>
        </div>
      </div>

      {/* Stats Grid - Now using real data from API */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat: StatsCard) => {
          const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Clock
          
          // Add context menu for chess ELO card (king piece) 
          if (stat.id === 'chess-elo') {
            return (
              <PieceContextMenu key={stat.id} pieceType="king" onItemSelect={handleMenuItemClick}>
                <div className={`${theme.glassMorphism} backdrop-blur-sm border border-white/10 rounded-xl p-6 relative overflow-hidden cursor-pointer hover:border-white/30 transition-colors`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${theme.accent} shadow-lg`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                <span className={`text-sm font-medium ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-white/60 text-sm">{stat.title}</p>
              </div>
                  {/* Decorative gradient */}
                  <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${theme.accent} rounded-full opacity-10`}></div>
                </div>
              </PieceContextMenu>
            )
          }

          return (
            <div key={stat.id} className={`${theme.glassMorphism} backdrop-blur-sm border border-white/10 rounded-xl p-6 relative overflow-hidden`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${theme.accent} shadow-lg`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                <span className={`text-sm font-medium ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-white/60 text-sm">{stat.title}</p>
              </div>
              {/* Decorative gradient */}
              <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${theme.accent} rounded-full opacity-10`}></div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className={`${theme.glassMorphism} backdrop-blur-sm border border-white/10 rounded-xl p-6`}>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <FaChessKnight size={20} />
            <span>Quick Actions</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <button className={`p-4 rounded-lg bg-gradient-to-br ${theme.accent} text-white font-medium hover:opacity-90 transition-all transform hover:scale-105 shadow-lg`}>
              <div className="text-center">
                <FaChessRook size={24} className="mx-auto mb-2" />
                <span>Play vs Computer</span>
              </div>
            </button>
            
            <button className={`p-4 rounded-lg bg-black/20 border border-white/20 text-white font-medium hover:bg-black/30 transition-all transform hover:scale-105`}>
              <div className="text-center">
                <FaChessBishop size={24} className="mx-auto mb-2" />
                <span>Daily Puzzles</span>
              </div>
            </button>
            
            <button className={`p-4 rounded-lg bg-black/20 border border-white/20 text-white font-medium hover:bg-black/30 transition-all transform hover:scale-105`}>
              <div className="text-center">
                <BarChart3 size={24} className="mx-auto mb-2" />
                <span>View Progress</span>
              </div>
            </button>
            
            <button className={`p-4 rounded-lg bg-black/20 border border-white/20 text-white font-medium hover:bg-black/30 transition-all transform hover:scale-105`}>
              <div className="text-center">
                <Trophy size={24} className="mx-auto mb-2" />
                <span>Achievements</span>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity - Now using real data from API */}
        <div className={`${theme.glassMorphism} backdrop-blur-sm border border-white/10 rounded-xl p-6`}>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Clock size={20} />
            <span>Recent Activity</span>
          </h2>
          
          {recentActivity.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-8 w-8 text-white/40 mx-auto mb-2" />
              <p className="text-white/60">No recent activity</p>
              <p className="text-white/40 text-sm">Start playing to see your activity here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-black/10 border border-white/10">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'win' ? 'bg-green-400' :
                    activity.type === 'loss' ? 'bg-red-400' :
                    activity.type === 'puzzle' ? 'bg-blue-400' : 'bg-purple-400'
                  }`}></div>
                  
                  <div className="flex-1">
                    {activity.type === 'win' && (
                      <p className="text-white text-sm">
                        <span className="text-green-400 font-medium">Won</span> against {activity.opponent}
                        {activity.rating_change && (
                          <span className="text-green-400 ml-2">+{activity.rating_change}</span>
                        )}
                      </p>
                    )}
                    {activity.type === 'loss' && (
                      <p className="text-white text-sm">
                        <span className="text-red-400 font-medium">Lost</span> to {activity.opponent}
                        {activity.rating_change && (
                          <span className="text-red-400 ml-2">{activity.rating_change}</span>
                        )}
                      </p>
                    )}
                    {activity.type === 'puzzle' && (
                      <p className="text-white text-sm">
                        {activity.description}
                        {activity.points && (
                          <span className="text-blue-400 ml-2">+{activity.points}</span>
                        )}
                      </p>
                    )}
                    {activity.type === 'study' && (
                      <p className="text-white text-sm">
                        Studied: {activity.description}
                        {activity.duration && (
                          <span className="text-purple-400 ml-2">{activity.duration}</span>
                        )}
                      </p>
                    )}
                    <p className="text-white/40 text-xs mt-1">{activity.timeFormatted}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Daily Goals */}
      <div className={`${theme.glassMorphism} backdrop-blur-sm border border-white/10 rounded-xl p-6`}>
        <DailyGoalsList />
      </div>
    </div>
  )
}