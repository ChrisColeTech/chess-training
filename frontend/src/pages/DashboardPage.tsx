import { TrendingUp, Trophy, Target, Clock, BarChart3 } from 'lucide-react'
import { FaChessKing, FaChessPawn, FaChessQueen, FaChessRook, FaChessBishop, FaChessKnight } from 'react-icons/fa'
import { useAuth } from '../hooks/auth/useAuth'
import { useThemeStore } from '../stores/themeStore'

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  const statsCards = [
    {
      title: 'Current ELO',
      value: user?.chess_elo || '1200',
      change: '+23',
      icon: FaChessKing,
      color: 'text-green-400'
    },
    {
      title: 'Puzzle Rating',
      value: user?.puzzle_rating || '1150',
      change: '+12',
      icon: FaChessPawn,
      color: 'text-blue-400'
    },
    {
      title: 'Games Played',
      value: '47',
      change: '+5',
      icon: FaChessQueen,
      color: 'text-purple-400'
    },
    {
      title: 'Study Hours',
      value: '23.4',
      change: '+2.1',
      icon: Clock,
      color: 'text-orange-400'
    }
  ]

  const recentActivity = [
    { type: 'win', opponent: 'ChessBot2000', rating: '+15', time: '2 hours ago' },
    { type: 'puzzle', description: 'Endgame puzzle completed', points: '+8', time: '4 hours ago' },
    { type: 'loss', opponent: 'GrandmasterX', rating: '-12', time: '1 day ago' },
    { type: 'study', description: 'King & Pawn endings', duration: '45 min', time: '1 day ago' }
  ]

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Welcome Header */}
      <div className={`${theme.glassMorphism} backdrop-blur-sm border border-white/10 rounded-2xl p-6`}>
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.username || 'Chess Master'}!
        </h1>
        <p className="text-white/70">
          Ready to improve your game today? Your current rating is {user?.chess_elo || '1200'} ELO.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className={`${theme.glassMorphism} backdrop-blur-sm border border-white/10 rounded-xl p-6 relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${theme.accent} shadow-lg`}>
                <stat.icon size={24} className="text-white" />
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
        ))}
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

        {/* Recent Activity */}
        <div className={`${theme.glassMorphism} backdrop-blur-sm border border-white/10 rounded-xl p-6`}>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Clock size={20} />
            <span>Recent Activity</span>
          </h2>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-black/10 border border-white/10">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'win' ? 'bg-green-400' :
                  activity.type === 'loss' ? 'bg-red-400' :
                  activity.type === 'puzzle' ? 'bg-blue-400' : 'bg-purple-400'
                }`}></div>
                
                <div className="flex-1">
                  {activity.type === 'win' && (
                    <p className="text-white text-sm">
                      <span className="text-green-400 font-medium">Won</span> against {activity.opponent}
                      <span className="text-green-400 ml-2">{activity.rating}</span>
                    </p>
                  )}
                  {activity.type === 'loss' && (
                    <p className="text-white text-sm">
                      <span className="text-red-400 font-medium">Lost</span> to {activity.opponent}
                      <span className="text-red-400 ml-2">{activity.rating}</span>
                    </p>
                  )}
                  {activity.type === 'puzzle' && (
                    <p className="text-white text-sm">
                      {activity.description}
                      <span className="text-blue-400 ml-2">{activity.points}</span>
                    </p>
                  )}
                  {activity.type === 'study' && (
                    <p className="text-white text-sm">
                      Studied: {activity.description}
                      <span className="text-purple-400 ml-2">{activity.duration}</span>
                    </p>
                  )}
                  <p className="text-white/40 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Goals */}
      <div className={`${theme.glassMorphism} backdrop-blur-sm border border-white/10 rounded-xl p-6`}>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <Trophy size={20} />
          <span>Daily Goals</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Play 3 games</span>
              <span className="text-white/60 text-sm">2/3</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2">
              <div className={`bg-gradient-to-r ${theme.accent} h-2 rounded-full`} style={{ width: '67%' }}></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Solve 10 puzzles</span>
              <span className="text-white/60 text-sm">7/10</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2">
              <div className={`bg-gradient-to-r ${theme.accent} h-2 rounded-full`} style={{ width: '70%' }}></div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Study 30 minutes</span>
              <span className="text-white/60 text-sm">23/30 min</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2">
              <div className={`bg-gradient-to-r ${theme.accent} h-2 rounded-full`} style={{ width: '77%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}