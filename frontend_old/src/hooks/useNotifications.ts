import { useState, useEffect, useCallback, useRef } from 'react'
import { soundFX } from '@/utils/soundEffects'
import type {
  NotificationSettings,
  NotificationInstance,
  NotificationStats,
  NotificationChannelSettings,
  NotificationEventSettings,
  QuietHoursPeriod,
  NotificationRule,
  NotificationTest,
  NotificationSoundType,
  NotificationDiagnostics,
  NotificationsHookReturn
} from '@/types/notifications'

/**
 * Custom hook for managing notification settings and state
 * Handles notification configuration, testing, and management
 */
export const useNotifications = (): NotificationsHookReturn => {
  // Default notification settings - would come from API
  const defaultSettings: NotificationSettings = {
    enabled: true,
    channels: [
      { channel: 'in-app', enabled: true, settings: {} },
      { channel: 'email', enabled: true, settings: {} },
      { channel: 'push', enabled: false, settings: {} }
    ],
    events: [],
    quietHours: { enabled: false, startTime: '22:00', endTime: '07:00', timezone: 'UTC' },
    doNotDisturb: { enabled: false, allowUrgent: true, allowFromContacts: false },
    customRules: []
  }
  
  // Settings state
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationInstance[]>([])
  const [notificationStats, _setNotificationStats] = useState<NotificationStats>({
    totalSent: 0,
    totalRead: 0,
    avgResponseTime: 0,
    channelStats: {},
    recentActivity: []
  })
  const [error, setError] = useState<string | null>(null)

  // Settings change tracking
  const [originalSettings, setOriginalSettings] = useState<NotificationSettings>(defaultSettings)

  // Audio context for sound previews
  const audioContext = useRef<AudioContext | null>(null)

  /**
   * Initialize audio context for sound previews
   */
  useEffect(() => {
    const initAudioContext = async () => {
      try {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (error) {
        console.warn('Failed to initialize audio context:', error)
      }
    }

    initAudioContext()

    return () => {
      if (audioContext.current) {
        audioContext.current.close()
      }
    }
  }, [])

  /**
   * Check for unsaved changes
   */
  useEffect(() => {
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings)
    setHasUnsavedChanges(hasChanges)
  }, [settings, originalSettings])

  /**
   * Load notification settings from storage
   */
  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would load from localStorage or API
        const savedSettings = localStorage.getItem('chess-notification-settings')
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings)
          setSettings(parsed)
          setOriginalSettings(parsed)
        }
      } catch (error) {
        console.error('Failed to load notification settings:', error)
        setError('Failed to load notification settings')
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [])

  /**
   * Calculate unread notification count
   */
  const unreadCount = notifications.filter(n => n.status === 'unread').length

  /**
   * Update notification settings
   */
  const updateSettings = useCallback((updates: Partial<NotificationSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }))
    soundFX.playClick()
  }, [])

  /**
   * Update channel-specific settings
   */
  const updateChannelSettings = useCallback((channelSettings: NotificationChannelSettings[]) => {
    setSettings(prev => ({
      ...prev,
      channels: channelSettings
    }))
    soundFX.playClick()
  }, [])

  /**
   * Update event-specific settings
   */
  const updateEventSettings = useCallback((eventSettings: NotificationEventSettings[]) => {
    setSettings(prev => ({
      ...prev,
      events: eventSettings
    }))
    soundFX.playClick()
  }, [])

  /**
   * Update quiet hours configuration
   */
  const updateQuietHours = useCallback((quietHours: QuietHoursPeriod) => {
    setSettings(prev => ({
      ...prev,
      quietHours
    }))
    soundFX.playClick()
  }, [])

  /**
   * Update do not disturb settings
   */
  const updateDoNotDisturb = useCallback((doNotDisturb: NotificationSettings['doNotDisturb']) => {
    setSettings(prev => ({
      ...prev,
      doNotDisturb
    }))
    soundFX.playClick()
  }, [])

  /**
   * Add a custom notification rule
   */
  const addCustomRule = useCallback((rule: Omit<NotificationRule, 'id' | 'createdAt'>) => {
    const newRule: NotificationRule = {
      ...rule,
      id: `rule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now()
    }

    setSettings(prev => ({
      ...prev,
      customRules: [...prev.customRules, newRule]
    }))
    soundFX.playSuccess()
  }, [])

  /**
   * Update an existing custom rule
   */
  const updateCustomRule = useCallback((ruleId: string, updates: Partial<NotificationRule>) => {
    setSettings(prev => ({
      ...prev,
      customRules: prev.customRules.map(rule =>
        rule.id === ruleId ? { ...rule, ...updates } : rule
      )
    }))
    soundFX.playClick()
  }, [])

  /**
   * Remove a custom notification rule
   */
  const removeCustomRule = useCallback((ruleId: string) => {
    setSettings(prev => ({
      ...prev,
      customRules: prev.customRules.filter(rule => rule.id !== ruleId)
    }))
    soundFX.playClick()
  }, [])

  /**
   * Mark a notification as read
   */
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, status: 'read' as const }
          : notification
      )
    )
    soundFX.playClick()
  }, [])

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, status: 'read' as const }))
    )
    soundFX.playClick()
  }, [])

  /**
   * Dismiss a notification
   */
  const dismissNotification = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, status: 'dismissed' as const }
          : notification
      )
    )
    soundFX.playClick()
  }, [])

  /**
   * Archive a notification
   */
  const archiveNotification = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, status: 'archived' as const }
          : notification
      )
    )
    soundFX.playClick()
  }, [])

  /**
   * Perform bulk actions on notifications
   */
  const bulkAction = useCallback((
    action: 'read' | 'archive' | 'delete', 
    notificationIds: string[]
  ) => {
    if (action === 'delete') {
      setNotifications(prev => 
        prev.filter(notification => !notificationIds.includes(notification.id))
      )
    } else {
      const status = action === 'read' ? 'read' : 'archived'
      setNotifications(prev => 
        prev.map(notification =>
          notificationIds.includes(notification.id)
            ? { ...notification, status: status as any }
            : notification
        )
      )
    }
    soundFX.playClick()
  }, [])

  /**
   * Preview a notification sound
   */
  const previewSound = useCallback((sound: NotificationSoundType) => {
    if (sound === 'none') return

    try {
      switch (sound) {
        case 'chess_move':
          soundFX.playClick()
          break
        case 'victory':
          soundFX.playSuccess()
          break
        case 'achievement':
          soundFX.playSuccess()
          break
        case 'alert':
          soundFX.playError()
          break
        case 'default':
        case 'subtle':
        default:
          soundFX.playClick()
          break
      }
    } catch (error) {
      console.warn('Failed to preview sound:', error)
    }
  }, [])

  /**
   * Test a notification configuration
   */
  const testNotification = useCallback(async (test: NotificationTest): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call to test notification
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Create a test notification
      const testNotificationInstance: NotificationInstance = {
        id: `test-${Date.now()}`,
        eventType: test.eventType,
        title: `Test: ${test.name}`,
        message: `This is a test notification for ${test.name}`,
        priority: 'normal',
        status: 'unread',
        timestamp: Date.now(),
        sentChannels: test.testChannels,
        data: test.testData
      }

      setNotifications(prev => [testNotificationInstance, ...prev])
      soundFX.playSuccess()

      // Show preview notification if supported
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(testNotificationInstance.title, {
          body: testNotificationInstance.message,
          icon: '/chess-icon.png'
        })
      }

    } catch (error) {
      setError(`Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      soundFX.playError()
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Run diagnostic checks on notification system
   */
  const runDiagnostics = useCallback(async (): Promise<NotificationDiagnostics> => {
    setIsLoading(true)
    
    try {
      // Simulate diagnostic checks
      await new Promise(resolve => setTimeout(resolve, 1500))

      const diagnostics: NotificationDiagnostics = {
        systemStatus: 'healthy',
        channelStatus: {
          'in-app': { available: true, latency: 0, errorRate: 0 },
          'push': { available: 'Notification' in window, latency: 250, errorRate: 0.02 },
          'email': { available: true, latency: 5000, errorRate: 0.01 },
          'sms': { available: false, latency: 0, errorRate: 0 }
        },
        permissions: {
          notifications: 'Notification' in window && Notification.permission === 'granted',
          sound: audioContext.current?.state === 'running' || false,
          background: true
        },
        configIssues: [],
        performance: {
          avgDeliveryTime: 150,
          successRate: 0.98,
          memoryUsage: 2.5
        },
        testResults: {
          'Sound System': true,
          'Channel Availability': true,
          'Permission Status': Notification.permission === 'granted',
          'Settings Validation': true
        }
      }

      // Add warnings based on diagnostics
      if (Notification.permission !== 'granted') {
        diagnostics.configIssues.push({
          level: 'warning',
          message: 'Browser notification permission not granted',
          recommendation: 'Enable notifications in browser settings for better experience'
        })
      }

      if (!diagnostics.channelStatus.sms.available) {
        diagnostics.configIssues.push({
          level: 'warning',
          message: 'SMS notifications not available',
          recommendation: 'Configure SMS service for mobile alerts'
        })
      }

      return diagnostics
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Save settings to storage
   */
  const saveSettings = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Save to localStorage (in real app, would save to backend)
      localStorage.setItem('chess-notification-settings', JSON.stringify(settings))
      setOriginalSettings(settings)
      setHasUnsavedChanges(false)
      
      soundFX.playSuccess()
    } catch (error) {
      setError(`Failed to save settings: ${error instanceof Error ? error.message : 'Unknown error'}`)
      soundFX.playError()
    } finally {
      setIsLoading(false)
    }
  }, [settings])

  /**
   * Reset settings to defaults
   */
  const resetToDefaults = useCallback(() => {
    setSettings(mockNotificationSettings)
    soundFX.playClick()
  }, [])

  /**
   * Export settings as JSON
   */
  const exportSettings = useCallback((): string => {
    const exportData = {
      settings,
      exportedAt: Date.now(),
      version: '1.0.0'
    }
    return JSON.stringify(exportData, null, 2)
  }, [settings])

  /**
   * Import settings from JSON
   */
  const importSettings = useCallback(async (settingsJson: string): Promise<void> => {
    try {
      const importData = JSON.parse(settingsJson)
      
      if (!importData.settings || typeof importData.settings !== 'object') {
        throw new Error('Invalid settings format')
      }

      // Validate imported settings structure
      const requiredFields = ['enabled', 'channels', 'events', 'quietHours', 'doNotDisturb']
      for (const field of requiredFields) {
        if (!(field in importData.settings)) {
          throw new Error(`Missing required field: ${field}`)
        }
      }

      setSettings(importData.settings)
      soundFX.playSuccess()
    } catch (error) {
      setError(`Failed to import settings: ${error instanceof Error ? error.message : 'Invalid format'}`)
      soundFX.playError()
    }
  }, [])

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // Settings state
    settings,
    isLoading,
    hasUnsavedChanges,

    // Notifications state
    notifications,
    unreadCount,
    notificationStats,

    // Actions
    updateSettings,
    updateChannelSettings,
    updateEventSettings,
    updateQuietHours,
    updateDoNotDisturb,
    addCustomRule,
    updateCustomRule,
    removeCustomRule,

    // Notification management
    markAsRead,
    markAllAsRead,
    dismissNotification,
    archiveNotification,
    bulkAction,

    // Testing and preview
    previewSound,
    testNotification,
    runDiagnostics,

    // Utilities
    saveSettings,
    resetToDefaults,
    exportSettings,
    importSettings,

    // Data constants - would come from API or be defined locally
    availableSounds: ['none', 'default', 'subtle', 'chess_move', 'victory', 'achievement', 'alert'] as const,
    detailedSoundOptions: [],
    availableTests: [],
    priorityLevelOptions: ['low', 'normal', 'high', 'urgent'] as const,
    frequencyOptions: ['immediate', 'hourly', 'daily', 'weekly'] as const,
    visualAlertOptions: [],
    detailedPriorityLevelOptions: [],

    // Error handling
    error,
    clearError
  }
}