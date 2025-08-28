import { 
  CheckCircle, Flame, TestTube, Info, LogOut, Moon, Star, Sun, Target, TrendingUp, User, Zap,
  PlayCircle, Trophy, BookOpen, Settings, BarChart3, Puzzle, Brain, Shield, HelpCircle,
  ChevronRight, Clock, Award, Users, Search, Database, Gamepad2, Lightbulb
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useThemeStore, themes } from '../stores/themeStore'
import { useAuthStore } from '../stores/authStore'
import { soundFX } from '../utils/soundEffects'
import { ThemeSwitcher } from '../components/ui/ThemeSwitcher'

// Theme icons mapping - using Lucide icons
const themeIcons: Record<string, React.ComponentType<any>> = {
  'cyber-neon': Zap,          // Electric/cyber theme - dynamic and energetic
  'dragon-gold': Sun,         // Gold/warm theme - radiant and powerful
  'shadow-knight': Moon,      // Dark theme - mysterious and elegant  
  'emerald-matrix': TestTube, // Tech/matrix theme - scientific and experimental
  'crimson-war': Flame,       // War/battle theme - fierce and intense
}

// Helper function to get theme colors
const getThemeColors = (primary: string) => {
  const colorMap = {
    cyan: {
      primary: 'text-cyan-400',
      bg: 'bg-cyan-500',
      bgLight: 'bg-cyan-500/20',
      text: 'text-cyan-300',
      border: 'border-cyan-500/30',
      hover: 'hover:bg-cyan-600'
    },
    yellow: {
      primary: 'text-yellow-400', 
      bg: 'bg-yellow-500',
      bgLight: 'bg-yellow-500/20',
      text: 'text-yellow-300',
      border: 'border-yellow-500/30',
      hover: 'hover:bg-yellow-600'
    },
    purple: {
      primary: 'text-purple-400',
      bg: 'bg-purple-500', 
      bgLight: 'bg-purple-500/20',
      text: 'text-purple-300',
      border: 'border-purple-500/30',
      hover: 'hover:bg-purple-600'
    },
    green: {
      primary: 'text-green-400',
      bg: 'bg-green-500',
      bgLight: 'bg-green-500/20', 
      text: 'text-green-300',
      border: 'border-green-500/30',
      hover: 'hover:bg-green-600'
    },
    red: {
      primary: 'text-red-400',
      bg: 'bg-red-500',
      bgLight: 'bg-red-500/20',
      text: 'text-red-300', 
      border: 'border-red-500/30',
      hover: 'hover:bg-red-600'
    }
  }
  return colorMap[primary as keyof typeof colorMap] || colorMap.cyan
}

export const DashboardPage: React.FC = () => {
  const { currentTheme, setTheme, getCurrentTheme } = useThemeStore()
  const { logout } = useAuthStore()
  const theme = getCurrentTheme()
  const colors = getThemeColors(theme.primary)

  const handleLogout = async () => {
    await logout()
    // Navigation will happen automatically via App.tsx routing
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text}`}>
      {/* Header with theme switcher */}
      <header className="w-full px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10 flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${colors.primary}`}>Chess Training Game</h1>
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 backdrop-blur-sm transition-colors text-red-200 hover:text-red-100"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-8 mb-12">
          <h1 className={`text-4xl lg:text-6xl font-bold bg-gradient-to-r from-${theme.primary}-400 to-${theme.primary}-600 bg-clip-text text-transparent`}>
            Welcome to Chess Training
          </h1>
          <p className="text-xl max-w-2xl text-gray-600 dark:text-gray-300">
            Professional chess training game showcasing Tailwind CSS components, modern themes, and game development patterns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className={`flex items-center justify-center space-x-2 px-8 py-4 bg-${theme.primary}-600 hover:bg-${theme.primary}-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl active:animate-button-press transition-all duration-300 gpu-accelerated group`}>
              <Star size={20} className="group-hover:animate-pulse" />
              <span>Start Training</span>
            </button>
            <button className={`px-8 py-4 border-2 border-${theme.primary}-600 text-${theme.primary}-600 hover:bg-${theme.primary}-50 dark:hover:bg-${theme.primary}-900/20 font-semibold rounded-xl active:animate-button-press transition-all duration-300 gpu-accelerated`}>
              View Features
            </button>
          </div>

          <div className="flex items-center space-x-3 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-6 py-4 rounded-lg max-w-md">
            <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
            <span>All systems ready! Game architecture and UI framework properly configured.</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-12">
          <h2 className="text-3xl font-bold text-center mb-8">Chess Training Dashboard</h2>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link 
              to="/puzzles/tactical" 
              onClick={() => soundFX.playClick()}
              className={`flex flex-col items-center p-6 ${theme.surface} rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <Puzzle size={32} className={`${colors.primary} mb-3`} />
              <span className="font-bold text-lg">Solve Puzzles</span>
              <span className="text-sm opacity-70">Tactical training</span>
            </Link>

            <Link 
              to="/play/computer" 
              onClick={() => soundFX.playClick()}
              className={`flex flex-col items-center p-6 ${theme.surface} rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <PlayCircle size={32} className={`${colors.primary} mb-3`} />
              <span className="font-bold text-lg">Play Game</span>
              <span className="text-sm opacity-70">vs Computer</span>
            </Link>

            <Link 
              to="/progress/overview" 
              onClick={() => soundFX.playClick()}
              className={`flex flex-col items-center p-6 ${theme.surface} rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <BarChart3 size={32} className={`${colors.primary} mb-3`} />
              <span className="font-bold text-lg">Progress</span>
              <span className="text-sm opacity-70">View stats</span>
            </Link>

            <Link 
              to="/study/plans" 
              onClick={() => soundFX.playClick()}
              className={`flex flex-col items-center p-6 ${theme.surface} rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <BookOpen size={32} className={`${colors.primary} mb-3`} />
              <span className="font-bold text-lg">Study</span>
              <span className="text-sm opacity-70">Learning plans</span>
            </Link>
          </div>

          {/* Main Navigation Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Play Section */}
            <div className={`${theme.surface} rounded-2xl p-6 shadow-xl`}>
              <div className="flex items-center mb-6">
                <div className={`p-3 ${colors.bgLight} rounded-lg mr-4`}>
                  <Gamepad2 size={24} className={colors.primary} />
                </div>
                <h3 className="text-xl font-bold">Play Chess</h3>
              </div>
              <div className="space-y-3">
                <Link to="/play/computer" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <PlayCircle size={18} className={`${colors.primary} mr-3`} />
                    <span>Play vs Computer</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/play/analysis" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Search size={18} className={`${colors.primary} mr-3`} />
                    <span>Analysis Board</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/play/review" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Clock size={18} className={`${colors.primary} mr-3`} />
                    <span>Game Review</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
              </div>
            </div>

            {/* Puzzles Section */}
            <div className={`${theme.surface} rounded-2xl p-6 shadow-xl`}>
              <div className="flex items-center mb-6">
                <div className={`p-3 ${colors.bgLight} rounded-lg mr-4`}>
                  <Puzzle size={24} className={colors.primary} />
                </div>
                <h3 className="text-xl font-bold">Puzzle Training</h3>
              </div>
              <div className="space-y-3">
                <Link to="/puzzles/tactical" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Target size={18} className={`${colors.primary} mr-3`} />
                    <span>Tactical Puzzles</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/puzzles/opening" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Lightbulb size={18} className={`${colors.primary} mr-3`} />
                    <span>Opening Puzzles</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/puzzles/endgame" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Shield size={18} className={`${colors.primary} mr-3`} />
                    <span>Endgame Puzzles</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/puzzles/custom" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <User size={18} className={`${colors.primary} mr-3`} />
                    <span>Custom Puzzles</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
              </div>
            </div>

            {/* Study Section */}
            <div className={`${theme.surface} rounded-2xl p-6 shadow-xl`}>
              <div className="flex items-center mb-6">
                <div className={`p-3 ${colors.bgLight} rounded-lg mr-4`}>
                  <BookOpen size={24} className={colors.primary} />
                </div>
                <h3 className="text-xl font-bold">Study Materials</h3>
              </div>
              <div className="space-y-3">
                <Link to="/study/plans" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <BookOpen size={18} className={`${colors.primary} mr-3`} />
                    <span>Study Plans</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/study/openings" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Lightbulb size={18} className={`${colors.primary} mr-3`} />
                    <span>Opening Explorer</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/study/endgames" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Database size={18} className={`${colors.primary} mr-3`} />
                    <span>Endgame Library</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/study/masters" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Users size={18} className={`${colors.primary} mr-3`} />
                    <span>Master Games</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
              </div>
            </div>

            {/* Progress Section */}
            <div className={`${theme.surface} rounded-2xl p-6 shadow-xl`}>
              <div className="flex items-center mb-6">
                <div className={`p-3 ${colors.bgLight} rounded-lg mr-4`}>
                  <BarChart3 size={24} className={colors.primary} />
                </div>
                <h3 className="text-xl font-bold">Progress Tracking</h3>
              </div>
              <div className="space-y-3">
                <Link to="/progress/overview" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <BarChart3 size={18} className={`${colors.primary} mr-3`} />
                    <span>Overview</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/progress/detailed-stats" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <TrendingUp size={18} className={`${colors.primary} mr-3`} />
                    <span>Detailed Stats</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/progress/achievements" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Trophy size={18} className={`${colors.primary} mr-3`} />
                    <span>Achievements</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/progress/learning-path" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Brain size={18} className={`${colors.primary} mr-3`} />
                    <span>Learning Path</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
              </div>
            </div>

            {/* Settings Section */}
            <div className={`${theme.surface} rounded-2xl p-6 shadow-xl`}>
              <div className="flex items-center mb-6">
                <div className={`p-3 ${colors.bgLight} rounded-lg mr-4`}>
                  <Settings size={24} className={colors.primary} />
                </div>
                <h3 className="text-xl font-bold">Settings & Account</h3>
              </div>
              <div className="space-y-3">
                <Link to="/profile" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <User size={18} className={`${colors.primary} mr-3`} />
                    <span>Profile</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/settings/account" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Settings size={18} className={`${colors.primary} mr-3`} />
                    <span>Account Settings</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/settings/preferences" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <User size={18} className={`${colors.primary} mr-3`} />
                    <span>Preferences</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/settings/board" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Gamepad2 size={18} className={`${colors.primary} mr-3`} />
                    <span>Board Settings</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
              </div>
            </div>

            {/* Help Section */}
            <div className={`${theme.surface} rounded-2xl p-6 shadow-xl`}>
              <div className="flex items-center mb-6">
                <div className={`p-3 ${colors.bgLight} rounded-lg mr-4`}>
                  <HelpCircle size={24} className={colors.primary} />
                </div>
                <h3 className="text-xl font-bold">Help & Support</h3>
              </div>
              <div className="space-y-3">
                <Link to="/help/center" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <HelpCircle size={18} className={`${colors.primary} mr-3`} />
                    <span>Help Center</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/help/tutorials" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <BookOpen size={18} className={`${colors.primary} mr-3`} />
                    <span>Tutorials</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
                <Link to="/help/contact" className={`flex items-center justify-between p-3 rounded-lg hover:${colors.bgLight} transition-colors group`}>
                  <div className="flex items-center">
                    <Users size={18} className={`${colors.primary} mr-3`} />
                    <span>Contact Support</span>
                  </div>
                  <ChevronRight size={16} className="opacity-50 group-hover:opacity-100" />
                </Link>
              </div>
            </div>
          </div>

          {/* Theme System Demo - Moved to bottom */}
          <div className={`${theme.surface} rounded-2xl p-6 shadow-xl mt-12`}>
            <h3 className="text-lg font-semibold mb-6 text-center">Gaming Theme Showcase</h3>
            <div className="space-y-6">
              <div className="flex justify-center mb-4">
                <ThemeSwitcher />
              </div>
              
              <p className="text-center opacity-70">
                Immersive gaming themes with dark atmospheres and rich visual effects. 
                Click any theme below to experience the full aesthetic transformation.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(themes).map(([themeId, themeOption]) => {
                  const IconComponent = themeIcons[themeId] || Sun
                  const isActive = currentTheme === themeId
                  return (
                    <button
                      key={themeId}
                      onClick={() => {
                        soundFX.playThemeSwitch()
                        setTheme(themeId as keyof typeof themes)
                      }}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-md relative overflow-hidden group ${
                        isActive 
                          ? 'ring-2 ring-white/50 scale-105 shadow-lg' 
                          : 'hover:scale-102'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${themeOption.background.replace('from-', '').replace(' via-', ', ').replace(' to-', ', ')})`,
                        borderColor: isActive ? themeOption.chessLight : 'rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <div className="flex flex-col items-center space-y-3 relative z-10">
                        <div 
                          className="flex items-center justify-center w-10 h-10 rounded-lg shadow-md"
                          style={{ backgroundColor: themeOption.chessLight }}
                        >
                          <IconComponent size={24} className="text-gray-900" />
                        </div>
                        <span className={`text-sm font-bold text-center ${themeOption.text}`}>
                          {themeOption.name}
                        </span>
                        {isActive && (
                          <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">
                            Active
                          </span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-6 py-4 rounded-lg">
                <Info size={20} className="text-blue-500 flex-shrink-0" />
                <div>
                  <div className="font-bold">Current Theme: {theme.name}</div>
                  <div className="text-sm">{theme.description}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}