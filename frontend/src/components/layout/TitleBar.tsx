import { useThemeStore } from '../../stores/themeStore'

export const TitleBar: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  return (
    <div className={`h-12 bg-gradient-to-r ${theme.primary} backdrop-blur-sm border-b border-white/10 flex items-center justify-between select-none relative z-20`}>
      {/* App Title */}
      <div className="flex items-center px-6">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${theme.accent} flex items-center justify-center`}>
            <span className="text-lg font-bold text-white">♔</span>
          </div>
          <h1 className="text-lg font-bold text-white drop-shadow-sm">Chess Training</h1>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="flex items-center px-6">
        <div className={`px-3 py-1 rounded-full ${theme.glassMorphism} text-xs font-medium text-white`}>
          {theme.name}
        </div>
      </div>
    </div>
  )
}