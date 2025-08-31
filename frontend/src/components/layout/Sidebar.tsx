import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ChevronRight, ChevronDown, User, Home, Play, Puzzle, BookOpen, BarChart3, Settings, HelpCircle, Trophy, Bug } from 'lucide-react'
import { useThemeStore } from '../../stores/themeStore'
import { useAuth } from '../../hooks/auth/useAuth'
import { SidebarUserAvatar } from '../ui/UserAvatar'

// Navigation items matching POC structure
interface NavItem {
  id: string
  title: string
  icon: any
  path?: string
  children?: NavItem[]
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home,
    path: '/dashboard'
  },
  {
    id: 'play',
    title: 'Play',
    icon: Play,
    children: [
      {
        id: 'vs-computer',
        title: 'vs Computer',
        icon: Play,
        path: '/play/computer'
      },
      {
        id: 'online',
        title: 'Online Games',
        icon: Play,
        path: '/play/online'
      }
    ]
  },
  {
    id: 'puzzles',
    title: 'Puzzles',
    icon: Puzzle,
    children: [
      {
        id: 'daily-puzzles',
        title: 'Daily Puzzles',
        icon: Puzzle,
        path: '/puzzles/daily'
      },
      {
        id: 'tactical',
        title: 'Tactical',
        icon: Puzzle,
        path: '/puzzles/tactical'
      },
      {
        id: 'endgame',
        title: 'Endgame',
        icon: Puzzle,
        path: '/puzzles/endgame'
      }
    ]
  },
  {
    id: 'progress',
    title: 'Progress',
    icon: BarChart3,
    children: [
      {
        id: 'overview',
        title: 'Overview',
        icon: BarChart3,
        path: '/progress/overview'
      },
      {
        id: 'achievements',
        title: 'Achievements',
        icon: Trophy,
        path: '/progress/achievements'
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    children: [
      {
        id: 'preferences',
        title: 'Preferences',
        icon: Settings,
        path: '/settings/preferences'
      },
      {
        id: 'account',
        title: 'Account',
        icon: User,
        path: '/settings/account'
      }
    ]
  },
  {
    id: 'help',
    title: 'Help',
    icon: HelpCircle,
    children: [
      {
        id: 'tutorials',
        title: 'Tutorials',
        icon: BookOpen,
        path: '/help/tutorials'
      },
      {
        id: 'contact',
        title: 'Contact',
        icon: HelpCircle,
        path: '/help/contact'
      }
    ]
  }
]

// Add debug section
navigationItems.push({
  id: 'debug',
  title: 'Debug',
  icon: Bug,
  children: [
    {
      id: 'chess-test',
      title: 'Chess Board Test',
      icon: Play,
      path: '/debug/chess'
    }
  ]
})

console.log('🔧 Navigation items:', navigationItems.map(item => item.title))

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const { getCurrentTheme } = useThemeStore()
  const { user, logout } = useAuth()
  const theme = getCurrentTheme()
  const location = useLocation()

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const isItemActive = (item: NavItem): boolean => {
    if (item.path) {
      return location.pathname === item.path || location.pathname.startsWith(item.path + '/')
    }
    return item.children?.some(child => isItemActive(child)) || false
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id)
    const isActive = isItemActive(item)
    const hasChildren = item.children && item.children.length > 0
    const Icon = item.icon

    if (hasChildren) {
      return (
        <div key={item.id}>
          <button
            onClick={() => toggleExpanded(item.id)}
            className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 group ${
              isActive
                ? `bg-gradient-to-r ${theme.accent} text-white shadow-lg`
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
            style={{ paddingLeft: `${12 + level * 20}px` }}
          >
            <div className="flex items-center space-x-3">
              <Icon size={18} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium">{item.title}</span>
              )}
            </div>
            
            {!isCollapsed && (
              <div className="transition-transform duration-200">
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            )}
          </button>
          
          {/* Children */}
          {!isCollapsed && isExpanded && item.children && (
            <div className="mt-1 space-y-1">
              {item.children.map(child => renderNavItem(child, level + 1))}
            </div>
          )}
        </div>
      )
    }

    // Leaf item with path
    return (
      <Link
        key={item.id}
        to={item.path || '#'}
        className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
          isActive
            ? `bg-gradient-to-r ${theme.accent} text-white shadow-lg`
            : 'text-white/80 hover:text-white hover:bg-white/10'
        }`}
        style={{ paddingLeft: `${12 + level * 20}px` }}
      >
        <Icon size={18} className="flex-shrink-0" />
        {!isCollapsed && (
          <>
            <span className="font-medium">{item.title}</span>
            {isActive && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
            )}
          </>
        )}
      </Link>
    )
  }

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ${theme.glassMorphism} backdrop-blur-md border-r border-white/20 flex flex-col relative z-20`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && user && (
            <div className="flex items-center space-x-3">
              <SidebarUserAvatar />
              <div>
                <p className="text-sm font-medium text-white">{user.username || 'Player'}</p>
                <p className="text-xs text-white/70">ELO: {user.chess_elo || 1200}</p>
              </div>
            </div>
          )}
          
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map(item => renderNavItem(item))}
      </nav>


      {/* User Actions */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <User size={18} className="flex-shrink-0" />
          {!isCollapsed && (
            <span className="font-medium">Logout</span>
          )}
        </button>
      </div>
    </div>
  )
}