import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Menu, ChevronRight, ChevronDown, Home,
  PlayCircle, Puzzle, BookOpen, BarChart3, Settings, HelpCircle,
  Gamepad2, Search, Clock, Target, Lightbulb, Shield, User as UserIcon,
  Trophy, TrendingUp, Brain, Database, Users, User, Zap
} from 'lucide-react'
import { soundFX } from '../../utils/soundEffects'

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

interface NavItem {
  id: string
  title: string
  icon: React.ComponentType<any>
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
    title: 'Play Chess',
    icon: Gamepad2,
    children: [
      { id: 'play-computer', title: 'vs Computer', icon: PlayCircle, path: '/play/computer' },
      { id: 'play-analysis', title: 'Analysis Board', icon: Search, path: '/play/analysis' },
      { id: 'play-review', title: 'Game Review', icon: Clock, path: '/play/review' }
    ]
  },
  {
    id: 'puzzles',
    title: 'Puzzle Training',
    icon: Puzzle,
    children: [
      { id: 'puzzles-tactical', title: 'Tactical Puzzles', icon: Target, path: '/puzzles/tactical' },
      { id: 'puzzles-opening', title: 'Opening Puzzles', icon: Lightbulb, path: '/puzzles/opening' },
      { id: 'puzzles-endgame', title: 'Endgame Puzzles', icon: Shield, path: '/puzzles/endgame' },
      { id: 'puzzles-custom', title: 'Custom Puzzles', icon: UserIcon, path: '/puzzles/custom' }
    ]
  },
  {
    id: 'study',
    title: 'Study Materials',
    icon: BookOpen,
    children: [
      { id: 'study-plans', title: 'Study Plans', icon: BookOpen, path: '/study/plans' },
      { id: 'study-openings', title: 'Opening Explorer', icon: Lightbulb, path: '/study/openings' },
      { id: 'study-endgames', title: 'Endgame Library', icon: Database, path: '/study/endgames' },
      { id: 'study-masters', title: 'Master Games', icon: Users, path: '/study/masters' }
    ]
  },
  {
    id: 'progress',
    title: 'Progress Tracking',
    icon: BarChart3,
    children: [
      { id: 'progress-overview', title: 'Overview', icon: BarChart3, path: '/progress/overview' },
      { id: 'progress-detailed', title: 'Detailed Stats', icon: TrendingUp, path: '/progress/detailed-stats' },
      { id: 'progress-achievements', title: 'Achievements', icon: Trophy, path: '/progress/achievements' },
      { id: 'progress-learning', title: 'Learning Path', icon: Brain, path: '/progress/learning-path' }
    ]
  },
  {
    id: 'settings',
    title: 'Settings & Account',
    icon: Settings,
    children: [
      { id: 'profile', title: 'Profile', icon: User, path: '/profile' },
      { id: 'settings-account', title: 'Account Settings', icon: Settings, path: '/settings/account' },
      { id: 'settings-preferences', title: 'Preferences', icon: User, path: '/settings/preferences' },
      { id: 'settings-board', title: 'Board Settings', icon: Gamepad2, path: '/settings/board' },
      { id: 'settings-notifications', title: 'Notifications', icon: Zap, path: '/settings/notifications' }
    ]
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: HelpCircle,
    children: [
      { id: 'help-center', title: 'Help Center', icon: HelpCircle, path: '/help/center' },
      { id: 'help-tutorials', title: 'Tutorials', icon: BookOpen, path: '/help/tutorials' },
      { id: 'help-contact', title: 'Contact Support', icon: Users, path: '/help/contact' }
    ]
  }
]

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