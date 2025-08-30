/**
 * Notification and alert configurations
 * 
 * Generated: 2025-08-29T00:52:22.208Z
 * Consolidated from: 14 UI interface(s)
 * Source files: notificationSettingsData.ts, notifications.ts
 */

// From: /mnt/c/Projects/chess-training/frontend/src/data/notificationSettingsData.ts
export interface VisualAlertOption {
  value: string;
  label: string;
  description: string;
  animation: string;
  color: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/notificationSettingsData.ts
export interface PriorityLevelOption {
  value: 'urgent' | 'high' | 'normal' | 'low';
  label: string;
  description: string;
  color: string;
  icon: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/notificationSettingsData.ts
export interface NotificationEventTemplate {
  eventType: string;
  eventName: string;
  description: string;
  category: 'gameplay' | 'achievements' | 'social' | 'training' | 'system';
  defaultPriority: 'urgent' | 'high' | 'normal' | 'low';
  defaultFrequency: 'instant' | 'batched' | 'hourly' | 'daily' | 'weekly';
  defaultChannels: string[];
  canCustomizeSound: boolean;
  canCustomizeVisual: boolean;
  examples: string[];
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface QuietHoursPeriod {
  startTime: string; // Start time in 24-hour format (e.g., "22:00")
  endTime: string; // End time in 24-hour format (e.g., "08:00")
  daysOfWeek: number[]; // Days of week (0 = Sunday, 6 = Saturday)
  enabled: boolean; // Whether quiet hours are enabled
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationChannelSettings {
  channel: NotificationChannel; // Channel type
  enabled: boolean; // Whether this channel is enabled
  minPriority: NotificationPriority; // Minimum priority level for this channel
  sound: NotificationSoundType; // Sound settings for this channel
  visualStyle: VisualAlertStyle; // Visual style for this channel
  deliveryDelay: number; // Delivery delay in minutes
  respectQuietHours: boolean; // Whether to respect quiet hours
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationEventSettings {
  eventType: NotificationEventType; // Event type
  eventName: string; // Human-readable event name
  description: string; // Event description
  enabled: boolean; // Whether this event type is enabled
  priority: NotificationPriority; // Priority level for this event
  frequency: NotificationFrequency; // Frequency setting
  enabledChannels: NotificationChannel[]; // Which channels to use for this event
  customSound?: NotificationSoundType; // Custom sound for this event type
  customVisualStyle?: VisualAlertStyle; // Custom visual style for this event type
  category: 'gameplay' | 'social' | 'training' | 'system' | 'achievements'; // Event category for grouping
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationInstance {
  id: string; // Unique notification ID
  eventType: NotificationEventType; // Event type that triggered this notification
  title: string; // Notification title
  message: string; // Notification message/body
  priority: NotificationPriority; // Priority level
  status: NotificationStatus; // Current status
  timestamp: number; // Timestamp when created
  sentChannels: NotificationChannel[]; // Channels this was sent through
  data?: Record<string, any>; // Associated data/metadata
  actions?: NotificationAction[]; // Action buttons for rich notifications
  expiresAt?: number; // Expiration timestamp (optional)
  isGrouped?: boolean; // Whether this is a grouped notification
  groupId?: string; // Group ID for related notifications
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationAction {
  id: string; // Action ID
  label: string; // Button text
  type: 'primary' | 'secondary' | 'destructive'; // Action type
  url?: string; // URL to navigate to (optional)
  handler?: string; // Handler function name
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationRuleAction {
  type: 'send_notification' | 'play_sound' | 'show_popup' | 'log_event'; // Action type
  config: Record<string, any>; // Action configuration
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationTest {
  id: string; // Test ID
  name: string; // Test name
  eventType: NotificationEventType; // Event type to simulate
  testData: Record<string, any>; // Test data
  testChannels: NotificationChannel[]; // Channels to test
  expectedBehavior: string; // Expected behavior description
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationStats {
  totalSent: number; // Total notifications sent
  byChannel: Record<NotificationChannel, number>; // Notifications by channel
  byEventType: Record<NotificationEventType, number>; // Notifications by event type
  byPriority: Record<NotificationPriority, number>; // Notifications by priority
  readRate: number; // Read rate percentage
  avgTimeToRead: number; // Average time to read (minutes)
  dismissalRate: number; // Dismissal rate percentage
  activeHours: number[]; // Most active hours
  recentActivity: {
    date: string
    count: number
  }[]; // Recent activity (last 30 days)
  channelEffectiveness: Record<NotificationChannel, {
    deliveryRate: number
    readRate: number
    actionRate: number
  }>; // Channel effectiveness scores
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationSettings {
  enabled: boolean; // Master enable/disable switch
  channels: NotificationChannelSettings[]; // Channel settings
  events: NotificationEventSettings[]; // Event settings
  quietHours: QuietHoursPeriod; // Quiet hours configuration
  doNotDisturb: {
    enabled: boolean
    until?: number // timestamp
    exceptions: NotificationEventType[] // events that can still notify
  }; // Do not disturb mode
  grouping: {
    enabled: boolean
    maxGroupSize: number
    groupTimeWindow: number // minutes
  }; // Grouping settings
  retentionDays: number; // Notification history retention
  customRules: NotificationRule[]; // Custom notification rules
  preview: {
    showInLockScreen: boolean
    showSensitiveContent: boolean
    maxPreviewLength: number
  }; // Preview settings
  autoCleanup: {
    enabled: boolean
    cleanupAfterDays: number
    keepImportant: boolean
  }; // Auto-cleanup settings
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationsHookReturn {
  settings: NotificationSettings;
  isLoading: boolean;
  hasUnsavedChanges: boolean;
  notifications: NotificationInstance[];
  unreadCount: number;
  notificationStats: NotificationStats;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  updateChannelSettings: (channelSettings: NotificationChannelSettings[]) => void;
  updateEventSettings: (eventSettings: NotificationEventSettings[]) => void;
  updateQuietHours: (quietHours: QuietHoursPeriod) => void;
  updateDoNotDisturb: (dnd: NotificationSettings['doNotDisturb']) => void;
  addCustomRule: (rule: Omit<NotificationRule, 'id' | 'createdAt'>) => void;
  updateCustomRule: (ruleId: string, updates: Partial<NotificationRule>) => void;
  removeCustomRule: (ruleId: string) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (notificationId: string) => void;
  archiveNotification: (notificationId: string) => void;
  bulkAction: (action: 'read' | 'archive' | 'delete', notificationIds: string[]) => void;
  previewSound: (sound: NotificationSoundType) => void;
  testNotification: (test: NotificationTest) => Promise<void>;
  runDiagnostics: () => Promise<NotificationDiagnostics>;
  saveSettings: () => Promise<void>;
  resetToDefaults: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationDiagnostics {
  systemStatus: 'healthy' | 'warning' | 'error'; // System status
  channelStatus: Record<NotificationChannel, {
    available: boolean
    latency: number
    errorRate: number
  }>; // Channel availability
  permissions: {
    notifications: boolean
    sound: boolean
    background: boolean
  }; // Permission status
  configIssues: {
    level: 'warning' | 'error'
    message: string
    recommendation: string
  }[]; // Configuration issues
  performance: {
    avgDeliveryTime: number
    successRate: number
    memoryUsage: number
  }; // Performance metrics
  testResults: Record<string, boolean>; // Test results
}

// Consolidated NotificationConfig
export const NotificationConfig = {
  visualAlertOption: {} as VisualAlertOption,
  priorityLevelOption: {} as PriorityLevelOption,
  notificationEventTemplate: {} as NotificationEventTemplate,
  quietHoursPeriod: {} as QuietHoursPeriod,
  notificationChannelSettings: {} as NotificationChannelSettings,
  notificationEventSettings: {} as NotificationEventSettings,
  notificationInstance: {} as NotificationInstance,
  notificationAction: {} as NotificationAction,
  notificationRuleAction: {} as NotificationRuleAction,
  notificationTest: {} as NotificationTest,
  notificationStats: {} as NotificationStats,
  notificationSettings: {} as NotificationSettings,
  notificationsHookReturn: {} as NotificationsHookReturn,
  notificationDiagnostics: {} as NotificationDiagnostics,
} as const;

// Type exports
export type VisualAlertOptionType = VisualAlertOption;
export type PriorityLevelOptionType = PriorityLevelOption;
export type NotificationEventTemplateType = NotificationEventTemplate;
export type QuietHoursPeriodType = QuietHoursPeriod;
export type NotificationChannelSettingsType = NotificationChannelSettings;
export type NotificationEventSettingsType = NotificationEventSettings;
export type NotificationInstanceType = NotificationInstance;
export type NotificationActionType = NotificationAction;
export type NotificationRuleActionType = NotificationRuleAction;
export type NotificationTestType = NotificationTest;
export type NotificationStatsType = NotificationStats;
export type NotificationSettingsType = NotificationSettings;
export type NotificationsHookReturnType = NotificationsHookReturn;
export type NotificationDiagnosticsType = NotificationDiagnostics;
