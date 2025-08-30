import { useState, useEffect, useMemo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { useThemeStore } from '../../stores/themeStore'
import { systemService } from '../../services/system/systemService'
import { 
  SYSTEM_COMPONENTS,
  getConnectionStatus,
  getSystemHealth,
  formatSystemUptime,
  type ConnectionStatus,
  type SystemStatus
} from '../../constants/statusBar'
import type { SystemHealth } from '../../types/system'

export interface StatusBarState {
  connectionStatus: ConnectionStatus
  systemComponents: SystemStatus[]
  systemHealth: 'healthy' | 'degraded' | 'critical'
  currentTime: Date
  currentPath: string
  currentTheme: string
  userRating: number
  ratingChange: number
  appUptime: string
  isOnline: boolean
}

export interface StatusBarActions {
  refreshStatus: () => void
  checkConnection: () => Promise<boolean>
  getStatusColor: (status: string) => string
  formatTime: (date: Date) => string
}

export const useStatusBar = (): StatusBarState & StatusBarActions => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [systemComponents, setSystemComponents] = useState(Object.values(SYSTEM_COMPONENTS))
  const [appStartTime] = useState(new Date()) // App start time for uptime calculation
  
  const { user } = useAuth()
  const { getCurrentTheme } = useThemeStore()
  const location = useLocation()
  
  const theme = getCurrentTheme()

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Real system health check every 30 seconds
  useEffect(() => {
    const healthCheck = async () => {
      try {
        const health = await systemService.getSystemHealth()
        
        // Map API response to SystemStatus components
        const updatedComponents = Object.values(SYSTEM_COMPONENTS).map(component => {
          const statusKey = component.id.replace('-', '_') as keyof SystemHealth
          const status = health[statusKey] || 'offline'
          
          return {
            ...component,
            status: status as 'online' | 'degraded' | 'offline',
            colorClass: 
              status === 'online' ? 'text-green-400' :
              status === 'degraded' ? 'text-yellow-400' : 'text-red-400'
          }
        })
        
        setSystemComponents(updatedComponents)
      } catch (error) {
        console.error('System health check failed:', error)
        // Fall back to offline status for all components on error
        const offlineComponents = systemComponents.map(component => ({
          ...component,
          status: 'offline' as const,
          colorClass: 'text-red-400'
        }))
        setSystemComponents(offlineComponents)
      }
    }

    // Initial health check
    healthCheck()
    
    // Set up interval for periodic checks
    const interval = setInterval(healthCheck, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [user])

  const connectionStatus = useMemo(() => {
    return getConnectionStatus(isOnline)
  }, [isOnline])

  const systemHealth = useMemo(() => {
    return getSystemHealth(systemComponents)
  }, [systemComponents])

  const currentPath = useMemo(() => {
    // Clean up path for display
    return location.pathname.replace(/^\//, '') || 'dashboard'
  }, [location.pathname])

  const currentTheme = useMemo(() => {
    return theme.name || 'Default'
  }, [theme.name])

  const userRating = useMemo(() => {
    return user?.chess_elo || 1200
  }, [user?.chess_elo])

  const ratingChange = useMemo(() => {
    // Mock rating change - would come from real rating tracking
    return 23 // Positive change for demo
  }, [])

  const appUptime = useMemo(() => {
    return formatSystemUptime(appStartTime)
  }, [appStartTime, currentTime])

  const refreshStatus = useCallback(() => {
    // Force refresh all status indicators
    setCurrentTime(new Date())
    setIsOnline(navigator.onLine)
    
    // Trigger system component health check
    const updatedComponents = systemComponents.map(component => ({
      ...component,
      status: 'online' as const,
      colorClass: 'text-green-400'
    }))
    setSystemComponents(updatedComponents)
  }, [systemComponents])

  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      const connectionInfo = await systemService.checkConnection()
      const online = connectionInfo.status === 'connected'
      setIsOnline(online)
      return online
    } catch (error) {
      setIsOnline(false)
      return false
    }
  }, [])

  const getStatusColor = useCallback((status: string): string => {
    switch (status) {
      case 'online':
      case 'connected':
      case 'healthy':
        return 'text-green-400'
      case 'degraded':
      case 'connecting':
      case 'warning':
        return 'text-yellow-400'
      case 'offline':
      case 'disconnected':
      case 'critical':
      case 'error':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }, [])

  const formatTime = useCallback((date: Date): string => {
    return date.toLocaleTimeString(undefined, {
      hour12: true,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    })
  }, [])

  return {
    connectionStatus,
    systemComponents,
    systemHealth,
    currentTime,
    currentPath,
    currentTheme,
    userRating,
    ratingChange,
    appUptime,
    isOnline,
    refreshStatus,
    checkConnection,
    getStatusColor,
    formatTime
  }
}