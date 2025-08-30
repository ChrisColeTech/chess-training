import { useState, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { NAVIGATION_ITEMS } from '../../constants/navigation'
import type { NavItem } from '../../constants/navigation'

export interface SidebarNavigationState {
  navigationItems: NavItem[]
  expandedItems: string[]
  user: any
  currentPath: string
}

export interface SidebarNavigationActions {
  toggleExpanded: (itemId: string) => void
  isItemActive: (item: NavItem) => boolean
  isItemExpanded: (itemId: string) => boolean
  logout: () => void
}

export const useSidebarNavigation = (): SidebarNavigationState & SidebarNavigationActions => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const { user, logout } = useAuth()
  const location = useLocation()

  const navigationItems = useMemo(() => NAVIGATION_ITEMS, [])
  const currentPath = useMemo(() => location.pathname, [location.pathname])

  const toggleExpanded = useCallback((itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }, [])

  const isItemActive = useCallback((item: NavItem): boolean => {
    if (item.path) {
      return currentPath === item.path || currentPath.startsWith(item.path + '/')
    }
    return item.children?.some(child => isItemActive(child)) || false
  }, [currentPath])

  const isItemExpanded = useCallback((itemId: string): boolean => {
    return expandedItems.includes(itemId)
  }, [expandedItems])

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  return {
    navigationItems,
    expandedItems,
    user,
    currentPath,
    toggleExpanded,
    isItemActive,
    isItemExpanded,
    logout: handleLogout
  }
}