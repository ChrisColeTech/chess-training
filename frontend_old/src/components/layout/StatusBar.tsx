import { useLocation } from 'react-router-dom'
import { Database, Clock, TrendingUp, Zap, Check } from 'lucide-react'
import { useThemeStore } from '../../stores/themeStore'

export const StatusBar: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  const location = useLocation()

  const formatTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const getConnectionStatus = () => {
    // In a real app, this would check actual connection status
    return { status: 'Connected', color: 'text-green-400', icon: Check }
  }

  const getRatingInfo = () => {
    // Mock rating info - in real app would come from user store
    return { rating: 1450, change: '+25' }
  }

  const connection = getConnectionStatus()
  const rating = getRatingInfo()

  return (
    <footer className="h-6 bg-black/40 backdrop-blur-sm border-t border-white/10 flex items-center justify-between px-4 text-xs text-gray-300">
      {/* Left section - Connection and status */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <connection.icon size={12} className={connection.color} />
          <span className={connection.color}>{connection.status}</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Database size={12} className="text-blue-400" />
          <span>API Ready</span>
        </div>

        <div className="flex items-center space-x-1">
          <Zap size={12} className="text-yellow-400" />
          <span>Theme: {theme.name}</span>
        </div>
      </div>

      {/* Center section - Page info */}
      <div className="flex items-center space-x-4">
        <span className="opacity-70">Page: {location.pathname}</span>
        
        <div className="flex items-center space-x-1">
          <TrendingUp size={12} className="text-cyan-400" />
          <span>Rating: {rating.rating} ({rating.change})</span>
        </div>
      </div>

      {/* Right section - Time and system info */}
      <div className="flex items-center space-x-4">
        <span>TypeScript ✓</span>
        <span>Build ✓</span>
        
        <div className="flex items-center space-x-1">
          <Clock size={12} />
          <span>{formatTime()}</span>
        </div>
      </div>
    </footer>
  )
}