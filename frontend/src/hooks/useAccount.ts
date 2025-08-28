import { useState, useCallback, useRef, useEffect } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { mockUserAccount } from '@/data/userAccount'
import type {
  AccountHookReturn,
  UserAccount,
  UserProfile,
  SecuritySettings,
  TwoFactorMethod,
  LoginSession,
  ServiceProvider,
  SubscriptionTier,
  PrivacySettings,
  ExportFormat
} from '@/types/account'

/**
 * Account Service - Mock implementation for visual mockup
 * In production, this would make real API calls
 */
class AccountService {
  /**
   * Simulate API delay for realistic UX
   */
  private static async simulateDelay(min = 500, max = 1500): Promise<void> {
    const delay = Math.random() * (max - min) + min
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  /**
   * Generate a mock success response
   */
  private static mockSuccess<T>(data?: T): Promise<{ success: true; data?: T }> {
    return this.simulateDelay().then(() => ({ success: true, data }))
  }

  /**
   * Generate a mock error response (10% chance)
   */
  private static mockError(message: string): Promise<{ success: boolean; error?: string; data?: any }> {
    if (Math.random() < 0.1) {
      return this.simulateDelay(200, 500).then(() => ({ 
        success: false, 
        error: message 
      }))
    }
    return this.mockSuccess()
  }

  static async fetchAccount(): Promise<UserAccount> {
    await this.simulateDelay()
    return mockUserAccount
  }

  static async updateProfile(_updates: Partial<UserProfile>) {
    return this.mockError('Failed to update profile')
  }

  static async uploadAvatar(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    await this.simulateDelay(1000, 3000) // Simulate file upload
    
    // Mock validation
    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'File must be an image' }
    }
    
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: 'File size must be less than 5MB' }
    }

    return { 
      success: true, 
      url: `https://api.example.com/avatars/${Date.now()}.jpg` 
    }
  }

  static async updateSecurity(_updates: Partial<SecuritySettings>) {
    return this.mockError('Failed to update security settings')
  }

  static async changePassword(currentPassword: string, newPassword: string) {
    await this.simulateDelay()
    
    // Mock password validation
    if (currentPassword === newPassword) {
      return { success: false, error: 'New password must be different' }
    }
    
    if (newPassword.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters' }
    }
    
    return { success: true }
  }

  static async setupTwoFactor(_method: TwoFactorMethod) {
    await this.simulateDelay(1000, 2000)
    
    // Mock 2FA setup
    const secret = 'ABCD1234EFGH5678IJKL9012MNOP3456'
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?data=otpauth://totp/ChessTraining?secret=${secret}&issuer=ChessTraining`
    
    return { 
      success: true, 
      data: { secret, qrCode } 
    }
  }

  static async disableTwoFactor(code: string) {
    await this.simulateDelay()
    
    // Mock code validation
    if (code.length !== 6) {
      return { success: false, error: 'Invalid authentication code' }
    }
    
    return { success: true }
  }

  static async getLoginHistory(): Promise<LoginSession[]> {
    await this.simulateDelay()
    return mockUserAccount.loginHistory
  }

  static async terminateSession(_sessionId: string) {
    return this.mockError('Failed to terminate session')
  }

  static async terminateAllSessions() {
    return this.mockError('Failed to terminate all sessions')
  }

  static async connectService(_provider: ServiceProvider) {
    return this.mockError('Failed to connect service')
  }

  static async disconnectService(_provider: ServiceProvider) {
    return this.mockError('Failed to disconnect service')
  }

  static async syncService(_provider: ServiceProvider) {
    await this.simulateDelay(2000, 4000) // Longer for sync
    return this.mockError('Failed to sync service')
  }

  static async upgradeSubscription(_tier: SubscriptionTier, _cycle: 'monthly' | 'yearly') {
    await this.simulateDelay(1500, 3000)
    return this.mockError('Payment processing failed')
  }

  static async cancelSubscription() {
    return this.mockError('Failed to cancel subscription')
  }

  static async updatePaymentMethod(_method: any) {
    return this.mockError('Failed to update payment method')
  }

  static async updatePrivacy(_updates: Partial<PrivacySettings>) {
    return this.mockError('Failed to update privacy settings')
  }

  static async requestDataExport(format: ExportFormat, _dataTypes: string[]) {
    await this.simulateDelay(1000, 2000)
    
    return {
      success: true,
      data: { 
        requestId: `export_${Date.now()}`,
        estimatedTime: '15-30 minutes',
        downloadUrl: `https://api.example.com/exports/user-data-${Date.now()}.${format}`
      }
    }
  }

  static async deleteAccount(_reason: string, _exportData: boolean) {
    await this.simulateDelay(2000, 3000)
    
    return {
      success: true,
      data: {
        requestId: `delete_${Date.now()}`,
        cancellationDeadline: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
      }
    }
  }
}

/**
 * Custom hook for managing user account state and operations
 * Handles profile, security, subscription, and data management
 */
export const useAccount = (): AccountHookReturn => {
  // State
  const [account, setAccount] = useState<UserAccount | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Prevent duplicate operations
  const operationInProgress = useRef(false)

  /**
   * Load account data on mount
   */
  useEffect(() => {
    loadAccount()
  }, [])

  /**
   * Load account data
   */
  const loadAccount = useCallback(async () => {
    if (operationInProgress.current) return
    
    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const accountData = await AccountService.fetchAccount()
      setAccount(accountData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load account')
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [])

  /**
   * Update user profile
   */
  const updateProfile = useCallback(async (updates: Partial<UserProfile>): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.updateProfile(updates)
      
      if (result.success) {
        setAccount(prev => prev ? {
          ...prev,
          profile: { ...prev.profile, ...updates }
        } : prev)
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? 'Failed to update profile') : 'Failed to update profile')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Upload user avatar
   */
  const uploadAvatar = useCallback(async (file: File): Promise<string> => {
    if (!account || operationInProgress.current) throw new Error('Operation in progress')

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.uploadAvatar(file)
      
      if (result.success && result.url) {
        setAccount(prev => prev ? {
          ...prev,
          profile: { ...prev.profile, avatarUrl: result.url }
        } : prev)
        soundFX.playSuccess()
        return result.url
      } else {
        const errorMsg = 'error' in result ? (result.error ?? 'Failed to upload avatar') : 'Failed to upload avatar'
        setError(errorMsg)
        soundFX.playError()
        throw new Error(errorMsg)
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMsg)
      soundFX.playError()
      throw new Error(errorMsg)
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Update security settings
   */
  const updateSecurity = useCallback(async (updates: Partial<SecuritySettings>): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.updateSecurity(updates)
      
      if (result.success) {
        setAccount(prev => prev ? {
          ...prev,
          security: { ...prev.security, ...updates }
        } : prev)
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? null) : 'Failed to update security settings')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Security update failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Change user password
   */
  const changePassword = useCallback(async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.changePassword(currentPassword, newPassword)
      
      if (result.success) {
        // Update password change timestamp
        setAccount(prev => prev ? {
          ...prev,
          security: {
            ...prev.security,
            passwordRequirements: {
              ...prev.security.passwordRequirements,
              lastChanged: Date.now(),
              requiresChange: false
            }
          }
        } : prev)
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? null) : 'Failed to change password')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password change failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Setup two-factor authentication
   */
  const setupTwoFactor = useCallback(async (method: TwoFactorMethod): Promise<{ secret: string; qrCode: string }> => {
    if (!account || operationInProgress.current) {
      throw new Error('Operation in progress')
    }

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.setupTwoFactor(method)
      
      if (result.success && result.data) {
        soundFX.playSuccess()
        return result.data
      } else {
        const errorMsg = 'error' in result ? (typeof result.error === 'string' ? result.error : 'Failed to setup two-factor authentication') : 'Failed to setup two-factor authentication'
        setError(errorMsg)
        soundFX.playError()
        throw new Error(errorMsg)
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : '2FA setup failed'
      setError(errorMsg)
      soundFX.playError()
      throw new Error(errorMsg)
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Disable two-factor authentication
   */
  const disableTwoFactor = useCallback(async (code: string): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.disableTwoFactor(code)
      
      if (result.success) {
        setAccount(prev => prev ? {
          ...prev,
          security: {
            ...prev.security,
            twoFactorAuth: {
              ...prev.security.twoFactorAuth,
              enabled: false,
              method: 'none'
            }
          }
        } : prev)
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? null) : 'Failed to disable two-factor authentication')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '2FA disable failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Get login history
   */
  const getLoginHistory = useCallback(async (): Promise<LoginSession[]> => {
    if (operationInProgress.current) return []

    operationInProgress.current = true
    setError(null)

    try {
      const sessions = await AccountService.getLoginHistory()
      return sessions
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load login history')
      return []
    } finally {
      operationInProgress.current = false
    }
  }, [])

  /**
   * Terminate a specific session
   */
  const terminateSession = useCallback(async (sessionId: string): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.terminateSession(sessionId)
      
      if (result.success) {
        // Remove session from login history
        setAccount(prev => prev ? {
          ...prev,
          loginHistory: prev.loginHistory.filter(session => session.sessionId !== sessionId)
        } : prev)
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? null) : 'Failed to terminate session')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Session termination failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Terminate all sessions except current
   */
  const terminateAllSessions = useCallback(async (): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.terminateAllSessions()
      
      if (result.success) {
        // Keep only current session
        setAccount(prev => prev ? {
          ...prev,
          loginHistory: prev.loginHistory.filter(session => session.status === 'active').slice(0, 1)
        } : prev)
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? null) : 'Failed to terminate sessions')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Session termination failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Connect external service
   */
  const connectService = useCallback(async (provider: ServiceProvider): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.connectService(provider)
      
      if (result.success) {
        // Update connected services
        const newService = {
          provider,
          connected: true,
          connectedAt: Date.now(),
          username: `user_${provider}`,
          permissions: ['read', 'import'],
          metadata: {}
        }

        setAccount(prev => prev ? {
          ...prev,
          connectedServices: [...prev.connectedServices.filter(s => s.provider !== provider), newService]
        } : prev)
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? null) : 'Failed to connect service')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Service connection failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Disconnect external service
   */
  const disconnectService = useCallback(async (provider: ServiceProvider): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.disconnectService(provider)
      
      if (result.success) {
        // Remove service from connected services
        setAccount(prev => prev ? {
          ...prev,
          connectedServices: prev.connectedServices.filter(s => s.provider !== provider)
        } : prev)
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? null) : 'Failed to disconnect service')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Service disconnection failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Sync data from external service
   */
  const syncService = useCallback(async (provider: ServiceProvider): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.syncService(provider)
      
      if (result.success) {
        // Update last sync timestamp
        setAccount(prev => prev ? {
          ...prev,
          connectedServices: prev.connectedServices.map(service => 
            service.provider === provider 
              ? { ...service, lastSync: Date.now() }
              : service
          )
        } : prev)
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? null) : 'Failed to sync service')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Service sync failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Upgrade subscription
   */
  const upgradeSubscription = useCallback(async (tier: SubscriptionTier, cycle: 'monthly' | 'yearly'): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.upgradeSubscription(tier, cycle)
      
      if (result.success) {
        // Update subscription info
        const now = Date.now()
        const cycleMs = cycle === 'monthly' ? 30 * 24 * 60 * 60 * 1000 : 365 * 24 * 60 * 60 * 1000

        setAccount(prev => prev ? {
          ...prev,
          subscription: {
            ...prev.subscription,
            tier,
            billingCycle: cycle,
            status: 'active',
            currentPeriod: {
              start: now,
              end: now + cycleMs
            }
          }
        } : prev)
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? null) : 'Failed to upgrade subscription')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Subscription upgrade failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Cancel subscription
   */
  const cancelSubscription = useCallback(async (): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.cancelSubscription()
      
      if (result.success) {
        // Update subscription status
        setAccount(prev => prev ? {
          ...prev,
          subscription: {
            ...prev.subscription,
            status: 'cancelled',
            payment: {
              ...prev.subscription.payment,
              autoRenew: false
            }
          }
        } : prev)
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? null) : 'Failed to cancel subscription')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Subscription cancellation failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Update payment method
   */
  const updatePaymentMethod = useCallback(async (method: any): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.updatePaymentMethod(method)
      
      if (result.success) {
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? null) : 'Failed to update payment method')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment method update failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Update privacy settings
   */
  const updatePrivacy = useCallback(async (updates: Partial<PrivacySettings>): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.updatePrivacy(updates)
      
      if (result.success) {
        setAccount(prev => prev ? {
          ...prev,
          privacy: { ...prev.privacy, ...updates }
        } : prev)
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (result.error ?? null) : 'Failed to update privacy settings')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Privacy update failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Request data export
   */
  const requestDataExport = useCallback(async (format: ExportFormat, dataTypes: string[]): Promise<string> => {
    if (!account || operationInProgress.current) throw new Error('Operation in progress')

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.requestDataExport(format, dataTypes)
      
      if (result.success && result.data) {
        soundFX.playSuccess()
        return result.data.requestId
      } else {
        const errorMsg = 'error' in result ? (typeof result.error === 'string' ? result.error : 'Failed to request data export') : 'Failed to request data export'
        setError(errorMsg)
        soundFX.playError()
        throw new Error(errorMsg)
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Data export request failed'
      setError(errorMsg)
      soundFX.playError()
      throw new Error(errorMsg)
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Delete user account
   */
  const deleteAccount = useCallback(async (reason: string, exportData: boolean): Promise<boolean> => {
    if (!account || operationInProgress.current) return false

    operationInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const result = await AccountService.deleteAccount(reason, exportData)
      
      if (result.success) {
        soundFX.playSuccess()
        return true
      } else {
        setError('error' in result ? (typeof result.error === 'string' ? result.error : 'Failed to delete account') : 'Failed to delete account')
        soundFX.playError()
        return false
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Account deletion failed')
      soundFX.playError()
      return false
    } finally {
      setIsLoading(false)
      operationInProgress.current = false
    }
  }, [account])

  /**
   * Refresh account data
   */
  const refresh = useCallback(async (): Promise<void> => {
    await loadAccount()
  }, [loadAccount])

  /**
   * Clear error message
   */
  const clearError = useCallback((): void => {
    setError(null)
  }, [])

  return {
    // State
    account,
    isLoading,
    error,

    // Profile management
    updateProfile,
    uploadAvatar,

    // Security management
    updateSecurity,
    changePassword,
    setupTwoFactor,
    disableTwoFactor,

    // Session management
    getLoginHistory,
    terminateSession,
    terminateAllSessions,

    // Connected services
    connectService,
    disconnectService,
    syncService,

    // Subscription management
    upgradeSubscription,
    cancelSubscription,
    updatePaymentMethod,

    // Privacy and data
    updatePrivacy,
    requestDataExport,
    deleteAccount,

    // Utilities
    refresh,
    clearError
  }
}