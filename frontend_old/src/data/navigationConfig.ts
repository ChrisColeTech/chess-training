import { 
  Home, 
  Gamepad2, 
  PlayCircle, 
  Search, 
  Clock, 
  Puzzle, 
  Target, 
  Lightbulb, 
  Shield, 
  User as UserIcon, 
  BookOpen, 
  Database, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Trophy, 
  Brain, 
  Settings, 
  User, 
  Zap, 
  HelpCircle 
} from 'lucide-react'

export interface NavItem {
  id: string
  title: string
  icon: any
  path?: string
  children?: NavItem[]
}

export const navigationItems: NavItem[] = [
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
    id: 'progress',
    title: 'Progress Tracking',
    icon: BarChart3,
    children: [
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
];