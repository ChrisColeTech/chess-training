import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Bell, LogOut, User, Settings, Menu } from 'lucide-react'
import { useThemeStore } from '../../stores/themeStore'
import { useAuthStore } from '../../stores/authStore'
import { ThemeSwitcher } from '../ui/ThemeSwitcher'
import { soundFX } from '../../utils/soundEffects'

interface HeaderProps {
  onToggleSidebar: () => void
  isSidebarCollapsed: boolean
}

const getPageTitle = (pathname: string): string => {
  const routes: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/profile': 'Profile',
    '/play/computer': 'Play vs Computer',
    '/play/analysis': 'Analysis Board', 
    '/play/review': 'Game Review',
    '/puzzles/tactical': 'Tactical Puzzles',
    '/puzzles/opening': 'Opening Puzzles',
    '/puzzles/endgame': 'Endgame Puzzles',
    '/puzzles/custom': 'Custom Puzzles',
    '/study/plans': 'Study Plans',
    '/study/openings': 'Opening Explorer',
    '/study/endgames': 'Endgame Library', 
    '/study/masters': 'Master Games',
    '/progress/overview': 'Progress Overview',
    '/progress/detailed-stats': 'Detailed Statistics',
    '/progress/achievements': 'Achievements',
    '/progress/learning-path': 'Learning Path',
    '/settings/account': 'Account Settings',
    '/settings/preferences': 'Preferences',
    '/settings/board': 'Board Settings',
    '/settings/notifications': 'Notifications',
    '/help/center': 'Help Center',
    '/help/tutorials': 'Tutorials',
    '/help/contact': 'Contact Support'
  }
  
  return routes[pathname] || 'Chess Training'
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { getCurrentTheme } = useThemeStore()
  const { logout } = useAuthStore()
  const theme = getCurrentTheme()
  const location = useLocation()
  
  const pageTitle = getPageTitle(location.pathname)

  const handleLogout = async () => {
    soundFX.playClick()
    await logout()
  }

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu)
    soundFX.playClick()
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    soundFX.playClick()
  }

  return (
    <header className="h-16 bg-black/20 backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-6">
      {/* Left section - Page title */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu size={20} />
        </button>
        
        <div>
          <h1 className="text-xl font-bold text-white">{pageTitle}</h1>
          <div className="flex items-center space-x-2 text-sm opacity-60">
            <span>Chess Training Platform</span>
          </div>
        </div>
      </div>

      {/* Right section - Controls and user */}
      <div className="flex items-center space-x-4">
        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Bell size={20} />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">3</span>
            </span>
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-gray-900 border border-white/10 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b border-white/10">
                <h3 className="font-semibold text-white">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-4 hover:bg-white/5 transition-colors border-b border-white/5">
                  <p className="text-sm text-white">New puzzle streak achievement unlocked!</p>
                  <p className="text-xs opacity-60 mt-1">5 minutes ago</p>
                </div>
                <div className="p-4 hover:bg-white/5 transition-colors border-b border-white/5">
                  <p className="text-sm text-white">Rating increased by 25 points</p>
                  <p className="text-xs opacity-60 mt-1">1 hour ago</p>
                </div>
                <div className="p-4 hover:bg-white/5 transition-colors">
                  <p className="text-sm text-white">Weekly study goal completed</p>
                  <p className="text-xs opacity-60 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-white">Chess Master</p>
              <p className="text-xs opacity-60">Rating: 1450</p>
            </div>
          </button>

          {/* User dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-white/10 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                    <User size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Chess Master</p>
                    <p className="text-sm opacity-60">demo@example.com</p>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                <button 
                  onClick={() => {
                    setShowUserMenu(false)
                    soundFX.playClick()
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-white/5 transition-colors flex items-center space-x-3"
                >
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button 
                  onClick={() => {
                    setShowUserMenu(false)
                    soundFX.playClick()
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-white/5 transition-colors flex items-center space-x-3"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
              </div>
              
              <div className="border-t border-white/10 py-2">
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    handleLogout()
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-red-500/10 text-red-400 transition-colors flex items-center space-x-3"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside handlers */}
      {(showUserMenu || showNotifications) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false)
            setShowNotifications(false)
          }}
        />
      )}
    </header>
  )
}