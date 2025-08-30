export interface SystemHealth {
  api_server: 'online' | 'degraded' | 'offline'
  database: 'online' | 'degraded' | 'offline'
  auth_service: 'online' | 'degraded' | 'offline'
  chess_engine: 'online' | 'degraded' | 'offline'
  last_checked: string
}

export interface ConnectionInfo {
  status: 'connected' | 'connecting' | 'disconnected' | 'error'
  latency?: number
  last_connected?: string
  error_message?: string
}

export interface ApiStatus {
  status: 'online' | 'degraded' | 'offline'
  version: string
  uptime: string
  endpoints_healthy: number
  endpoints_total: number
}