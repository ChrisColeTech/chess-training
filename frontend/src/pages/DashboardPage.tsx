import { CheckCircle, Flame, TestTube, Info, LogOut, Moon, Star, Sun, Target, TrendingUp, User, Zap } from 'lucide-react'
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

        {/* Component Showcase */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center mb-8">Tailwind CSS Components Showcase</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Enhanced Stats Card */}
            <div className={`${theme.surface} rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 gpu-accelerated group`}>
              <h3 className="text-lg font-semibold mb-4 group-hover:text-cyan-400 transition-colors">Player Statistics</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-sm opacity-60">Chess Rating</div>
                  <div className="text-3xl font-bold hover:animate-level-up cursor-default">1,450</div>
                  <div className={`text-sm text-${theme.primary}-400 animate-success-bounce`}>+25 this week <Zap className="w-4 h-4 inline" /></div>
                </div>
                <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
                  <div className={`bg-gradient-to-r ${theme.primary} h-3 rounded-full shadow-lg transition-all duration-1000 ease-out animate-pulse-glow`} 
                       style={{width: '75%', 
                               background: 'linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6)',
                               backgroundSize: '200% 100%',
                               animation: 'shimmer 2s infinite'
                              }}>
                  </div>
                </div>
                <div className="flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 border border-green-500/30 rounded-full text-sm cursor-pointer hover:bg-green-500/30 transition-colors">Improving <TrendingUp className="w-4 h-4 inline" /></span>
                  <span className={`px-3 py-1 bg-${theme.primary}-500/20 text-${theme.primary}-300 border border-${theme.primary}-500/30 rounded-full text-sm cursor-pointer hover:bg-${theme.primary}-500/30 transition-colors`}>Active <Target className="w-4 h-4 inline" /></span>
                </div>
              </div>
            </div>

            {/* Profile Card */}
            <div className={`${theme.surface} rounded-2xl p-6 shadow-xl`}>
              <h3 className="text-lg font-semibold mb-4">Player Profile</h3>
              <div className="space-y-4 text-center">
                <div className={`w-16 h-16 mx-auto bg-${theme.primary}-500/20 rounded-full flex items-center justify-center border-2 border-${theme.primary}-500/50`}>
                  <User size={32} className={`text-${theme.primary}-400`} />
                </div>
                <div>
                  <div className="text-lg font-bold">Chess Master</div>
                  <div className="opacity-60">Intermediate Player</div>
                </div>
                <div className="flex justify-center space-x-2">
                  <span className={`px-3 py-1 bg-${theme.primary}-500/20 text-${theme.primary}-300 border border-${theme.primary}-500/30 rounded-full text-sm`}>Level 12</span>
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full text-sm">Tournament Ready</span>
                </div>
              </div>
            </div>

            {/* Controls Card */}
            <div className={`${theme.surface} rounded-2xl p-6 shadow-xl`}>
              <h3 className="text-lg font-semibold mb-4">Game Controls</h3>
              <div className="space-y-3">
                <button className={`w-full flex items-center justify-center space-x-2 px-4 py-3 bg-${theme.primary}-500 hover:bg-${theme.primary}-600 text-white rounded-lg transition-all shadow-lg hover:shadow-xl`}>
                  <Star size={16} />
                  <span>Start Game</span>
                </button>
                <button className={`w-full px-4 py-3 bg-${theme.primary}-500/20 border border-${theme.primary}-500/50 text-${theme.primary}-300 hover:bg-${theme.primary}-500/30 rounded-lg transition-colors`}>
                  Training Mode
                </button>
                <button className="w-full px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  Practice Puzzles
                </button>
                <div className="w-full bg-black/20 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full shadow-lg" style={{width: '60%'}}></div>
                </div>
                <p className="text-sm opacity-60 text-center">Training Progress: 60%</p>
              </div>
            </div>
          </div>

          {/* Theme System Demo */}
          <div className={`${theme.surface} rounded-2xl p-6 shadow-xl mt-8`}>
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