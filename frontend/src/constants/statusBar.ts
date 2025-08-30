import { Wifi, WifiOff, Server, Clock, User, Monitor, Zap, CheckCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface StatusBarConfig {
  id: string
  label: string
  icon: LucideIcon
  colorClass: string
  priority: 'high' | 'medium' | 'low'
}

export interface ConnectionStatus {
  id: string
  status: 'connected' | 'connecting' | 'disconnected' | 'error'
  label: string
  icon: LucideIcon
  colorClass: string
  lastUpdate?: Date
}

export interface SystemStatus {
  id: string
  component: string
  status: 'online' | 'degraded' | 'offline'
  icon: LucideIcon
  colorClass: string
  details?: string
}

export const CONNECTION_STATUSES: Record<string, ConnectionStatus> = {
  CONNECTED: {
    id: 'connected',
    status: 'connected',
    label: 'Online',
    icon: Wifi,
    colorClass: 'text-green-400'
  },
  CONNECTING: {
    id: 'connecting', 
    status: 'connecting',
    label: 'Connecting...',
    icon: Wifi,
    colorClass: 'text-yellow-400'
  },
  DISCONNECTED: {
    id: 'disconnected',
    status: 'disconnected', 
    label: 'Offline',
    icon: WifiOff,
    colorClass: 'text-gray-400'
  },
  ERROR: {
    id: 'error',
    status: 'error',
    label: 'Connection Error',
    icon: WifiOff,
    colorClass: 'text-red-400'
  }
}

export const SYSTEM_COMPONENTS: Record<string, SystemStatus> = {
  API_SERVER: {
    id: 'api-server',
    component: 'API Server',
    status: 'online',
    icon: Server,
    colorClass: 'text-green-400',
    details: 'All endpoints responding'
  },
  DATABASE: {
    id: 'database',
    component: 'Database',
    status: 'online', 
    icon: CheckCircle,
    colorClass: 'text-green-400',
    details: 'Connection healthy'
  },
  AUTH_SERVICE: {
    id: 'auth-service',
    component: 'Authentication',
    status: 'online',
    icon: User,
    colorClass: 'text-green-400', 
    details: 'JWT valid'
  },
  CHESS_ENGINE: {
    id: 'chess-engine',
    component: 'Chess Engine',
    status: 'online',
    icon: Zap,
    colorClass: 'text-green-400',
    details: 'Stockfish ready'
  }
}

export const STATUS_BAR_ITEMS: StatusBarConfig[] = [
  {
    id: 'connection',
    label: 'Connection Status',
    icon: Wifi,
    colorClass: 'text-green-400',
    priority: 'high'
  },
  {
    id: 'system',
    label: 'System Status', 
    icon: Monitor,
    colorClass: 'text-blue-400',
    priority: 'medium'
  },
  {
    id: 'clock',
    label: 'Current Time',
    icon: Clock,
    colorClass: 'text-white',
    priority: 'low'
  },
  {
    id: 'user-rating',
    label: 'User Rating',
    icon: User,
    colorClass: 'text-purple-400',
    priority: 'medium'
  }
]

export const getConnectionStatus = (isOnline: boolean, hasError: boolean = false): ConnectionStatus => {
  if (hasError) return CONNECTION_STATUSES.ERROR
  if (!isOnline) return CONNECTION_STATUSES.DISCONNECTED
  return CONNECTION_STATUSES.CONNECTED
}

export const getSystemHealth = (components: SystemStatus[]): 'healthy' | 'degraded' | 'critical' => {
  const offlineCount = components.filter(c => c.status === 'offline').length
  const degradedCount = components.filter(c => c.status === 'degraded').length
  
  if (offlineCount > 0) return 'critical'
  if (degradedCount > 0) return 'degraded' 
  return 'healthy'
}

export const formatSystemUptime = (startTime: Date): string => {
  const now = new Date()
  const uptime = now.getTime() - startTime.getTime()
  
  const hours = Math.floor(uptime / (1000 * 60 * 60))
  const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}