import { 
  User, 
  Settings, 
  Palette, 
  Bell, 
  HelpCircle, 
  LogOut, 
  Crown,
  BarChart3,
  Shield,
  Keyboard
} from 'lucide-react'

export interface UserMenuItem {
  id: string
  label: string
  icon: any
  path?: string
  action?: string
  shortcut?: string
  separator?: boolean
  variant?: 'default' | 'destructive'
}

export const USER_MENU_ITEMS: UserMenuItem[] = [
  {
    id: 'profile',
    label: 'View Profile',
    icon: User,
    path: '/profile',
    shortcut: 'Ctrl+P'
  },
  {
    id: 'stats',
    label: 'Statistics',
    icon: BarChart3,
    path: '/progress/overview',
    shortcut: 'Ctrl+S'
  },
  {
    id: 'separator-1',
    label: '',
    icon: null,
    separator: true
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: Settings,
    path: '/settings/preferences'
  },
  {
    id: 'theme',
    label: 'Theme Settings',
    icon: Palette,
    path: '/settings/theme'
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    path: '/settings/notifications'
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    path: '/settings/security'
  },
  {
    id: 'separator-2',
    label: '',
    icon: null,
    separator: true
  },
  {
    id: 'keyboard-shortcuts',
    label: 'Keyboard Shortcuts',
    icon: Keyboard,
    action: 'show-shortcuts',
    shortcut: 'Ctrl+/'
  },
  {
    id: 'help',
    label: 'Help & Support',
    icon: HelpCircle,
    path: '/help/contact',
    shortcut: 'F1'
  },
  {
    id: 'separator-3',
    label: '',
    icon: null,
    separator: true
  },
  {
    id: 'logout',
    label: 'Sign Out',
    icon: LogOut,
    action: 'logout',
    shortcut: 'Ctrl+Shift+Q',
    variant: 'destructive' as const
  }
]

export const getMenuItemsForUser = (isPremium: boolean = false): UserMenuItem[] => {
  const items = [...USER_MENU_ITEMS]
  
  if (isPremium) {
    // Add premium-specific items
    const premiumItem: UserMenuItem = {
      id: 'premium-features',
      label: 'Premium Features',
      icon: Crown,
      path: '/premium'
    }
    
    // Insert after statistics
    const statsIndex = items.findIndex(item => item.id === 'stats')
    if (statsIndex !== -1) {
      items.splice(statsIndex + 1, 0, premiumItem)
    }
  }
  
  return items
}