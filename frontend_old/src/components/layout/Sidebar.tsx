import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ChevronRight, ChevronDown, User, Home, Play, Puzzle, BookOpen, BarChart3, Settings, HelpCircle, Trophy } from 'lucide-react'
import { soundFX } from '../../utils/soundEffects'

// Local constants for navigation items instead of importing from @/data
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
        id: 'puzzle-rush',
        title: 'Puzzle Rush',
        icon: Trophy,
        path: '/puzzles/rush'
      }
    ]
  },
  {
    id: 'progress',
    title: 'Progress',
    icon: BarChart3,
    children: [
      {
        id: 'analytics',
        title: 'Analytics',
        icon: BarChart3,
        path: '/progress/analytics'
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
    path: '/settings'
  },
  {
    id: 'help',
    title: 'Help',
    icon: HelpCircle,
    path: '/help'
  }
]

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['play', 'puzzles', 'study', 'progress']))
  const location = useLocation()

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
    soundFX.playClick()
  }

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  const handleNavClick = () => {
    soundFX.playClick()
  }

  return (
    <aside 
      className={`${isCollapsed ? 'w-16' : 'w-72'} bg-black/20 backdrop-blur-sm border-r border-white/10 flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!isCollapsed && (
          <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Chess Training
          </h2>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navigationItems.map((item) => (
          <div key={item.id}>
            {/* Main item */}
            {item.path ? (
              // Single item with direct link
              <Link
                to={item.path}
                onClick={handleNavClick}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group ${
                  isActive(item.path)
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} className={isActive(item.path) ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'} />
                {!isCollapsed && (
                  <span className="font-medium">{item.title}</span>
                )}
              </Link>
            ) : (
              // Section header with children
              <div>
                <button
                  onClick={() => toggleSection(item.id)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 hover:text-white transition-all duration-200 group"
                >
                  <item.icon size={20} className="text-gray-400 group-hover:text-white" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left font-medium">{item.title}</span>
                      {expandedSections.has(item.id) ? (
                        <ChevronDown size={16} className="text-gray-400" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-400" />
                      )}
                    </>
                  )}
                </button>

                {/* Child items */}
                {!isCollapsed && item.children && expandedSections.has(item.id) && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        to={child.path!}
                        onClick={handleNavClick}
                        className={`flex items-center space-x-3 p-2 rounded-md transition-all duration-200 group ${
                          isActive(child.path!)
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                            : 'hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <child.icon 
                          size={16} 
                          className={isActive(child.path!) ? 'text-cyan-400' : 'text-gray-400 group-hover:text-white'} 
                        />
                        <span className="text-sm">{child.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/10">
        <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">Chess Master</p>
              <p className="text-xs opacity-60">Rating: 1450</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}