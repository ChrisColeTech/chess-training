import { useState } from 'react'
import { Settings, ChevronDown, Star, Sun, Moon, Zap, TestTube, Flame } from 'lucide-react'
import { useThemeStore, themes } from '../../stores/themeStore'
import { soundFX } from '../../utils/soundEffects'

const themeIcons: Record<string, React.ComponentType<any>> = {
  'cyber-neon': Zap,          // Electric/cyber theme - more dynamic than bolt
  'dragon-gold': Sun,         // Gold/warm theme  
  'shadow-knight': Moon,      // Dark theme
  'emerald-matrix': TestTube, // Tech/matrix theme - scientific/experimental
  'crimson-war': Flame,       // War/battle theme
}

// Helper function to get theme colors (moved from dashboard)
const getThemeColors = (primary: string) => {
  const colorMap = {
    cyan: {
      primary: 'text-cyan-400',
      bg: 'bg-cyan-500',
      bgLight: 'bg-cyan-500/20',
      text: 'text-cyan-300',
      border: 'border-cyan-500/30',
    },
    yellow: {
      primary: 'text-yellow-400', 
      bg: 'bg-yellow-500',
      bgLight: 'bg-yellow-500/20',
      text: 'text-yellow-300',
      border: 'border-yellow-500/30',
    },
    purple: {
      primary: 'text-purple-400',
      bg: 'bg-purple-500', 
      bgLight: 'bg-purple-500/20',
      text: 'text-purple-300',
      border: 'border-purple-500/30',
    },
    green: {
      primary: 'text-green-400',
      bg: 'bg-green-500',
      bgLight: 'bg-green-500/20', 
      text: 'text-green-300',
      border: 'border-green-500/30',
    },
    red: {
      primary: 'text-red-400',
      bg: 'bg-red-500',
      bgLight: 'bg-red-500/20',
      text: 'text-red-300', 
      border: 'border-red-500/30',
    }
  }
  return colorMap[primary as keyof typeof colorMap] || colorMap.cyan
}

export function ThemeSwitcher() {
  const { currentTheme, setTheme, getCurrentTheme } = useThemeStore()
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const theme = getCurrentTheme()
  const colors = getThemeColors(theme.primary)

  const handleThemeChange = (themeId: keyof typeof themes) => {
    soundFX.playThemeSwitch()
    setTheme(themeId)
    setShowThemeMenu(false)
  }

  return (
    <div className="flex items-center space-x-4">
      <span className={`px-3 py-1 rounded-full text-sm ${colors.bgLight} ${colors.text} ${colors.border} border`}>
        {theme.name}
      </span>
      <div className="relative">
        <button
          onClick={() => setShowThemeMenu(!showThemeMenu)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors text-white shadow-lg"
        >
          <Settings size={16} />
          <span>Themes</span>
          <ChevronDown size={16} />
        </button>
        {showThemeMenu && (
          <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
            {Object.entries(themes).map(([themeId, themeOption]) => {
              const IconComponent = themeIcons[themeId] || Sun
              const isSelected = currentTheme === themeId
              
              return (
                <button
                  key={themeId}
                  onClick={() => handleThemeChange(themeId as keyof typeof themes)}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700 transition-colors text-white ${
                    isSelected ? 'bg-gray-700' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {isSelected && <Star size={16} className="text-yellow-500" />}
                    <IconComponent size={16} className="text-gray-300" />
                    <span className="font-medium">{themeOption.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${getThemeColors(themeOption.primary).bgLight} ${getThemeColors(themeOption.primary).text} ${getThemeColors(themeOption.primary).border} border`}>
                    {themeOption.description || 'Gaming theme'}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}