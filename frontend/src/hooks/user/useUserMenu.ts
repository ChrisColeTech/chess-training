import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { getMenuItemsForUser } from '../../constants/userMenu'
import type { UserMenuItem } from '../../constants/userMenu'

export interface UserMenuState {
  menuItems: UserMenuItem[]
  user: any
  isPremium: boolean
}

export interface UserMenuActions {
  handleItemClick: (item: UserMenuItem) => void
  handleLogout: () => void
  showKeyboardShortcuts: () => void
}

export const useUserMenu = (): UserMenuState & UserMenuActions => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Determine if user has premium features
  // TODO: Update when user model has premium fields
  const isPremium = useMemo(() => {
    return false // Will be updated when premium features are added to user model
  }, [])

  // Get menu items based on user status
  const menuItems = useMemo(() => {
    return getMenuItemsForUser(isPremium)
  }, [isPremium])

  const handleLogout = useCallback(() => {
    try {
      logout()
      // Navigate to login after logout
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }, [logout, navigate])

  const showKeyboardShortcuts = useCallback(() => {
    // TODO: Implement keyboard shortcuts modal/dialog
    console.log('Keyboard shortcuts modal - to be implemented with Dialog component')
  }, [])

  const handleItemClick = useCallback((item: UserMenuItem) => {
    if (item.separator) {
      return
    }

    // Handle actions
    if (item.action) {
      switch (item.action) {
        case 'logout':
          handleLogout()
          break
        case 'show-shortcuts':
          showKeyboardShortcuts()
          break
        default:
          console.warn(`Unknown action: ${item.action}`)
      }
      return
    }

    // Handle navigation
    if (item.path) {
      navigate(item.path)
    }
  }, [navigate, handleLogout, showKeyboardShortcuts])

  return {
    menuItems,
    user,
    isPremium,
    handleItemClick,
    handleLogout,
    showKeyboardShortcuts
  }
}