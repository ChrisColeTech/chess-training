/**
 * Notification Types
 * Contains all TypeScript interfaces and types for the notification system
 */

/**
 * Notification channel types
 */
export type NotificationChannel = 'email' | 'push' | 'in-app' | 'sms'

/**
 * Notification priority levels
 */
export type NotificationPriority = 'low' | 'normal' | 'high' | 'urgent'

/**
 * Notification frequency settings
 */
export type NotificationFrequency = 'instant' | 'hourly' | 'daily' | 'weekly' | 'never'

/**
 * Event categories for notifications
 */
export type NotificationEventType = 
  | 'game_started'
  | 'game_completed' 
  | 'puzzle_solved'
  | 'achievement_unlocked'
  | 'rating_changed'
  | 'challenge_received'
  | 'tournament_starting'
  | 'training_reminder'
  | 'friend_activity'
  | 'system_maintenance'
  | 'security_alert'

/**
 * Sound types for notifications
 */
export type NotificationSoundType = 
  | 'none'
  | 'default'
  | 'chess_move' 
  | 'victory'
  | 'achievement'
  | 'alert'
  | 'subtle'

/**
 * Visual alert styles
 */
export type VisualAlertStyle = 
  | 'none'
  | 'flash'
  | 'slide'
  | 'bounce'
  | 'glow'
  | 'pulse'

/**
 * Notification status
 */
export type NotificationStatus = 'unread' | 'read' | 'archived' | 'dismissed'

/**
 * Time period for quiet hours
 */
export interface QuietHoursPeriod {
  /** Start time in 24-hour format (e.g., "22:00") */
  startTime: string
  
  /** End time in 24-hour format (e.g., "08:00") */
  endTime: string
  
  /** Days of week (0 = Sunday, 6 = Saturday) */
  daysOfWeek: number[]
  
  /** Whether quiet hours are enabled */
  enabled: boolean
}

/**
 * Channel-specific notification settings
 */
export interface NotificationChannelSettings {
  /** Channel type */
  channel: NotificationChannel
  
  /** Whether this channel is enabled */
  enabled: boolean
  
  /** Minimum priority level for this channel */
  minPriority: NotificationPriority
  
  /** Sound settings for this channel */
  sound: NotificationSoundType
  
  /** Visual style for this channel */
  visualStyle: VisualAlertStyle
  
  /** Delivery delay in minutes */
  deliveryDelay: number
  
  /** Whether to respect quiet hours */
  respectQuietHours: boolean
}

/**
 * Event-specific notification configuration
 */
export interface NotificationEventSettings {
  /** Event type */
  eventType: NotificationEventType
  
  /** Human-readable event name */
  eventName: string
  
  /** Event description */
  description: string
  
  /** Whether this event type is enabled */
  enabled: boolean
  
  /** Priority level for this event */
  priority: NotificationPriority
  
  /** Frequency setting */
  frequency: NotificationFrequency
  
  /** Which channels to use for this event */
  enabledChannels: NotificationChannel[]
  
  /** Custom sound for this event type */
  customSound?: NotificationSoundType
  
  /** Custom visual style for this event type */
  customVisualStyle?: VisualAlertStyle
  
  /** Event category for grouping */
  category: 'gameplay' | 'social' | 'training' | 'system' | 'achievements'
}

/**
 * Individual notification instance
 */
export interface NotificationInstance {
  /** Unique notification ID */
  id: string
  
  /** Event type that triggered this notification */
  eventType: NotificationEventType
  
  /** Notification title */
  title: string
  
  /** Notification message/body */
  message: string
  
  /** Priority level */
  priority: NotificationPriority
  
  /** Current status */
  status: NotificationStatus
  
  /** Timestamp when created */
  timestamp: number
  
  /** Channels this was sent through */
  sentChannels: NotificationChannel[]
  
  /** Associated data/metadata */
  data?: Record<string, any>
  
  /** Action buttons for rich notifications */
  actions?: NotificationAction[]
  
  /** Expiration timestamp (optional) */
  expiresAt?: number
  
  /** Whether this is a grouped notification */
  isGrouped?: boolean
  
  /** Group ID for related notifications */
  groupId?: string
}

/**
 * Action button for rich notifications
 */
export interface NotificationAction {
  /** Action ID */
  id: string
  
  /** Button text */
  label: string
  
  /** Action type */
  type: 'primary' | 'secondary' | 'destructive'
  
  /** URL to navigate to (optional) */
  url?: string
  
  /** Handler function name */
  handler?: string
}

/**
 * Notification rule for custom triggers
 */
export interface NotificationRule {
  /** Rule ID */
  id: string
  
  /** Rule name */
  name: string
  
  /** Rule description */
  description: string
  
  /** Whether rule is active */
  enabled: boolean
  
  /** Conditions that trigger this rule */
  conditions: NotificationCondition[]
  
  /** Actions to take when triggered */
  actions: NotificationRuleAction[]
  
  /** Cooldown period in minutes */
  cooldownMinutes: number
  
  /** Maximum triggers per day */
  maxTriggersPerDay: number
  
  /** Creation timestamp */
  createdAt: number
  
  /** Last triggered timestamp */
  lastTriggered?: number
}

/**
 * Condition for notification rules
 */
export interface NotificationCondition {
  /** Field to check */
  field: string
  
  /** Comparison operator */
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'regex'
  
  /** Value to compare against */
  value: any
  
  /** Logical operator with next condition */
  logicalOperator?: 'and' | 'or'
}

/**
 * Action for notification rules
 */
export interface NotificationRuleAction {
  /** Action type */
  type: 'send_notification' | 'play_sound' | 'show_popup' | 'log_event'
  
  /** Action configuration */
  config: Record<string, any>
}

/**
 * Notification testing configuration
 */
export interface NotificationTest {
  /** Test ID */
  id: string
  
  /** Test name */
  name: string
  
  /** Event type to simulate */
  eventType: NotificationEventType
  
  /** Test data */
  testData: Record<string, any>
  
  /** Channels to test */
  testChannels: NotificationChannel[]
  
  /** Expected behavior description */
  expectedBehavior: string
}

/**
 * Notification statistics and analytics
 */
export interface NotificationStats {
  /** Total notifications sent */
  totalSent: number
  
  /** Notifications by channel */
  byChannel: Record<NotificationChannel, number>
  
  /** Notifications by event type */
  byEventType: Record<NotificationEventType, number>
  
  /** Notifications by priority */
  byPriority: Record<NotificationPriority, number>
  
  /** Read rate percentage */
  readRate: number
  
  /** Average time to read (minutes) */
  avgTimeToRead: number
  
  /** Dismissal rate percentage */
  dismissalRate: number
  
  /** Most active hours */
  activeHours: number[]
  
  /** Recent activity (last 30 days) */
  recentActivity: {
    date: string
    count: number
  }[]
  
  /** Channel effectiveness scores */
  channelEffectiveness: Record<NotificationChannel, {
    deliveryRate: number
    readRate: number
    actionRate: number
  }>
}

/**
 * Global notification settings
 */
export interface NotificationSettings {
  /** Master enable/disable switch */
  enabled: boolean
  
  /** Channel settings */
  channels: NotificationChannelSettings[]
  
  /** Event settings */
  events: NotificationEventSettings[]
  
  /** Quiet hours configuration */
  quietHours: QuietHoursPeriod
  
  /** Do not disturb mode */
  doNotDisturb: {
    enabled: boolean
    until?: number // timestamp
    exceptions: NotificationEventType[] // events that can still notify
  }
  
  /** Grouping settings */
  grouping: {
    enabled: boolean
    maxGroupSize: number
    groupTimeWindow: number // minutes
  }
  
  /** Notification history retention */
  retentionDays: number
  
  /** Custom notification rules */
  customRules: NotificationRule[]
  
  /** Preview settings */
  preview: {
    showInLockScreen: boolean
    showSensitiveContent: boolean
    maxPreviewLength: number
  }
  
  /** Auto-cleanup settings */
  autoCleanup: {
    enabled: boolean
    cleanupAfterDays: number
    keepImportant: boolean
  }
}

/**
 * Props for NotificationCenter component
 */
export interface NotificationCenterProps {
  /** Recent notifications */
  notifications: NotificationInstance[]
  
  /** Whether to show all or just unread */
  showUnreadOnly: boolean
  
  /** Callback when notification is clicked */
  onNotificationClick: (notification: NotificationInstance) => void
  
  /** Callback when notification is dismissed */
  onNotificationDismiss: (notificationId: string) => void
  
  /** Callback when all notifications are marked as read */
  onMarkAllRead: () => void
  
  /** Callback when notification is archived */
  onArchiveNotification: (notificationId: string) => void
  
  /** Loading state */
  isLoading: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Props for AlertSettings component
 */
export interface AlertSettingsProps {
  /** Channel settings */
  channelSettings: NotificationChannelSettings[]
  
  /** Callback when channel settings change */
  onChannelSettingsChange: (settings: NotificationChannelSettings[]) => void
  
  /** Available sound options */
  availableSounds: { value: NotificationSoundType; label: string }[]
  
  /** Callback to preview sound */
  onPreviewSound: (sound: NotificationSoundType) => void
  
  /** Visual alert options */
  visualAlertOptions: Array<{ value: string; label: string; description: string; animation: string; color: string }>
  
  /** Priority level options */
  priorityLevelOptions: Array<{ value: string; label: string; description: string; color: string; icon: string }>
  
  /** Theme from store */
  theme: any
}

/**
 * Props for ChannelSettings component
 */
export interface ChannelSettingsProps {
  /** Individual channel configuration */
  channel: NotificationChannelSettings
  
  /** Callback when settings change */
  onChange: (channel: NotificationChannelSettings) => void
  
  /** Whether this channel is available */
  isAvailable: boolean
  
  /** Channel capability description */
  capabilities: string[]
  
  /** Theme from store */
  theme: any
}

/**
 * Props for EventSettings component
 */
export interface EventSettingsProps {
  /** Event settings list */
  eventSettings: NotificationEventSettings[]
  
  /** Callback when event settings change */
  onEventSettingsChange: (settings: NotificationEventSettings[]) => void
  
  /** Available channels */
  availableChannels: NotificationChannel[]
  
  /** Grouping by category */
  groupByCategory: boolean
  
  /** Priority level options */
  priorityLevelOptions: Array<{ value: string; label: string; description: string }>
  
  /** Frequency options */
  frequencyOptions: Array<{ value: string; label: string; description: string }>
  
  /** Theme from store */
  theme: any
}

/**
 * Props for QuietHours component
 */
export interface QuietHoursProps {
  /** Quiet hours configuration */
  quietHours: QuietHoursPeriod
  
  /** Do not disturb settings */
  doNotDisturb: NotificationSettings['doNotDisturb']
  
  /** Callback when quiet hours change */
  onQuietHoursChange: (quietHours: QuietHoursPeriod) => void
  
  /** Callback when DND changes */
  onDoNotDisturbChange: (dnd: NotificationSettings['doNotDisturb']) => void
  
  /** Available exception events */
  availableExceptions: NotificationEventType[]
  
  /** Theme from store */
  theme: any
}

/**
 * Props for NotificationRules component
 */
export interface NotificationRulesProps {
  /** Custom rules */
  rules: NotificationRule[]
  
  /** Callback when rules change */
  onRulesChange: (rules: NotificationRule[]) => void
  
  /** Callback to test a rule */
  onTestRule: (ruleId: string) => void
  
  /** Available fields for conditions */
  availableFields: string[]
  
  /** Theme from store */
  theme: any
}

/**
 * Props for NotificationTesting component
 */
export interface NotificationTestingProps {
  /** Available tests */
  tests: NotificationTest[]
  
  /** Callback to run a test */
  onRunTest: (test: NotificationTest) => Promise<void>
  
  /** Test results */
  testResults: Record<string, {
    success: boolean
    message: string
    timestamp: number
  }>
  
  /** Loading state */
  isRunningTest: string | null
  
  /** Theme from store */
  theme: any
}

/**
 * Props for NotificationHistory component
 */
export interface NotificationHistoryProps {
  /** Historical notifications */
  notifications: NotificationInstance[]
  
  /** Current page */
  currentPage: number
  
  /** Total pages */
  totalPages: number
  
  /** Items per page */
  itemsPerPage: number
  
  /** Callback for page change */
  onPageChange: (page: number) => void
  
  /** Callback for bulk actions */
  onBulkAction: (action: 'read' | 'archive' | 'delete', notificationIds: string[]) => void
  
  /** Filter settings */
  filters: {
    channel?: NotificationChannel
    eventType?: NotificationEventType
    priority?: NotificationPriority
    status?: NotificationStatus
    dateRange?: {
      start: number
      end: number
    }
  }
  
  /** Callback when filters change */
  onFiltersChange: (filters: NotificationHistoryProps['filters']) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for useNotifications
 */
export interface NotificationsHookReturn {
  // Settings state
  settings: NotificationSettings
  isLoading: boolean
  hasUnsavedChanges: boolean
  
  // Notifications state
  notifications: NotificationInstance[]
  unreadCount: number
  notificationStats: NotificationStats
  
  // Actions
  updateSettings: (settings: Partial<NotificationSettings>) => void
  updateChannelSettings: (channelSettings: NotificationChannelSettings[]) => void
  updateEventSettings: (eventSettings: NotificationEventSettings[]) => void
  updateQuietHours: (quietHours: QuietHoursPeriod) => void
  updateDoNotDisturb: (dnd: NotificationSettings['doNotDisturb']) => void
  addCustomRule: (rule: Omit<NotificationRule, 'id' | 'createdAt'>) => void
  updateCustomRule: (ruleId: string, updates: Partial<NotificationRule>) => void
  removeCustomRule: (ruleId: string) => void
  
  // Notification management
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  dismissNotification: (notificationId: string) => void
  archiveNotification: (notificationId: string) => void
  bulkAction: (action: 'read' | 'archive' | 'delete', notificationIds: string[]) => void
  
  // Testing and preview
  previewSound: (sound: NotificationSoundType) => void
  testNotification: (test: NotificationTest) => Promise<void>
  runDiagnostics: () => Promise<NotificationDiagnostics>
  
  // Utilities
  saveSettings: () => Promise<void>
  resetToDefaults: () => void
  exportSettings: () => string
  importSettings: (settingsJson: string) => Promise<void>
  
  // Error handling
  error: string | null
  clearError: () => void
}

/**
 * Diagnostic information for notification system
 */
export interface NotificationDiagnostics {
  /** System status */
  systemStatus: 'healthy' | 'warning' | 'error'
  
  /** Channel availability */
  channelStatus: Record<NotificationChannel, {
    available: boolean
    latency: number
    errorRate: number
  }>
  
  /** Permission status */
  permissions: {
    notifications: boolean
    sound: boolean
    background: boolean
  }
  
  /** Configuration issues */
  configIssues: {
    level: 'warning' | 'error'
    message: string
    recommendation: string
  }[]
  
  /** Performance metrics */
  performance: {
    avgDeliveryTime: number
    successRate: number
    memoryUsage: number
  }
  
  /** Test results */
  testResults: Record<string, boolean>
}