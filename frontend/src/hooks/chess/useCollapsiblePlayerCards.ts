import { useState, useCallback, useEffect } from 'react'

interface UseCollapsiblePlayerCardsOptions {
  defaultCollapsed?: boolean
  autoCollapseOnMobile?: boolean
  persistState?: boolean
  storageKey?: string
}

/**
 * useCollapsiblePlayerCards - SRP Hook for Collapsible State
 * Single Responsibility: Manage collapse state and persistence
 */
export const useCollapsiblePlayerCards = ({
  defaultCollapsed = false,
  autoCollapseOnMobile = true,
  persistState = true,
  storageKey = 'chess-player-cards-collapsed'
}: UseCollapsiblePlayerCardsOptions = {}) => {
  
  // Initialize state from localStorage or default
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (persistState && typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey)
      if (stored !== null) {
        return JSON.parse(stored)
      }
    }
    return defaultCollapsed
  })
  
  // Auto-collapse on mobile if enabled
  useEffect(() => {
    if (autoCollapseOnMobile && typeof window !== 'undefined') {
      const handleResize = () => {
        const isMobile = window.innerWidth < 768
        if (isMobile && !isCollapsed) {
          setIsCollapsed(true)
        }
      }
      
      handleResize() // Check initial size
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [autoCollapseOnMobile, isCollapsed])
  
  // Persist state changes
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(isCollapsed))
    }
  }, [isCollapsed, persistState, storageKey])
  
  const toggle = useCallback(() => {
    setIsCollapsed((prev: boolean) => !prev)
  }, [])
  
  const expand = useCallback(() => {
    setIsCollapsed(false)
  }, [])
  
  const collapse = useCallback(() => {
    setIsCollapsed(true)
  }, [])
  
  return {
    isCollapsed,
    toggle,
    expand,
    collapse
  }
}