export interface NotificationSoundOption {
  value: string
  label: string
  description: string
  filename: string
  duration: number
}

export interface VisualAlertOption {
  value: string
  label: string
  description: string
  animation: string
  color: string
}

export interface PriorityLevelOption {
  value: 'urgent' | 'high' | 'normal' | 'low'
  label: string
  description: string
  color: string
  icon: string
}

export interface FrequencyOption {
  value: 'instant' | 'batched' | 'hourly' | 'daily' | 'weekly'
  label: string
  description: string
  batchSize?: number
  interval?: number
}

export interface NotificationEventTemplate {
  eventType: string
  eventName: string
  description: string
  category: 'gameplay' | 'achievements' | 'social' | 'training' | 'system'
  defaultPriority: 'urgent' | 'high' | 'normal' | 'low'
  defaultFrequency: 'instant' | 'batched' | 'hourly' | 'daily' | 'weekly'
  defaultChannels: string[]
  canCustomizeSound: boolean
  canCustomizeVisual: boolean
  examples: string[]
}

// Notification sound options
export const notificationSoundOptions: NotificationSoundOption[] = [
  {
    value: 'none',
    label: 'No Sound',
    description: 'Silent notifications',
    filename: '',
    duration: 0
  },
  {
    value: 'chime',
    label: 'Gentle Chime',
    description: 'Soft bell-like sound',
    filename: 'chime-gentle.mp3',
    duration: 800
  },
  {
    value: 'beep',
    label: 'System Beep',
    description: 'Classic computer beep',
    filename: 'beep-system.mp3',
    duration: 200
  },
  {
    value: 'ding',
    label: 'Achievement Ding',
    description: 'Success notification sound',
    filename: 'ding-achievement.mp3',
    duration: 600
  },
  {
    value: 'chord',
    label: 'Notification Chord',
    description: 'Rich musical chord',
    filename: 'chord-notification.mp3',
    duration: 1200
  },
  {
    value: 'pop',
    label: 'Pop Sound',
    description: 'Light pop notification',
    filename: 'pop-light.mp3',
    duration: 300
  },
  {
    value: 'alert',
    label: 'Alert Sound',
    description: 'Attention-grabbing alert',
    filename: 'alert-urgent.mp3',
    duration: 1500
  },
  {
    value: 'wood',
    label: 'Wood Tap',
    description: 'Chess piece sound',
    filename: 'wood-tap.mp3',
    duration: 400
  }
]

// Visual alert options
export const visualAlertOptions: VisualAlertOption[] = [
  {
    value: 'none',
    label: 'No Visual',
    description: 'No visual effects',
    animation: '',
    color: ''
  },
  {
    value: 'fade',
    label: 'Fade In/Out',
    description: 'Gentle fade animation',
    animation: 'fadeInOut',
    color: '#3b82f6'
  },
  {
    value: 'slide',
    label: 'Slide Down',
    description: 'Slides from top of screen',
    animation: 'slideDown',
    color: '#10b981'
  },
  {
    value: 'bounce',
    label: 'Bounce',
    description: 'Bouncing entrance effect',
    animation: 'bounce',
    color: '#f59e0b'
  },
  {
    value: 'pulse',
    label: 'Pulse',
    description: 'Pulsing glow effect',
    animation: 'pulse',
    color: '#8b5cf6'
  },
  {
    value: 'flash',
    label: 'Flash',
    description: 'Quick flash animation',
    animation: 'flash',
    color: '#ef4444'
  },
  {
    value: 'shake',
    label: 'Shake',
    description: 'Attention-grabbing shake',
    animation: 'shake',
    color: '#f97316'
  }
]

// Priority level options
export const priorityLevelOptions: PriorityLevelOption[] = [
  {
    value: 'urgent',
    label: 'Urgent',
    description: 'Critical notifications requiring immediate attention',
    color: '#ef4444',
    icon: '🚨'
  },
  {
    value: 'high',
    label: 'High',
    description: 'Important notifications that should be seen soon',
    color: '#f97316',
    icon: '⚠️'
  },
  {
    value: 'normal',
    label: 'Normal',
    description: 'Standard notifications for regular updates',
    color: '#3b82f6',
    icon: 'ℹ️'
  },
  {
    value: 'low',
    label: 'Low',
    description: 'Minor notifications that can be checked later',
    color: '#6b7280',
    icon: '💬'
  }
]

// Frequency options
export const frequencyOptions: FrequencyOption[] = [
  {
    value: 'instant',
    label: 'Instant',
    description: 'Send immediately when event occurs',
    interval: 0
  },
  {
    value: 'batched',
    label: 'Batched (5 min)',
    description: 'Group similar notifications together',
    batchSize: 5,
    interval: 300000 // 5 minutes
  },
  {
    value: 'hourly',
    label: 'Hourly Digest',
    description: 'Send summary every hour',
    interval: 3600000 // 1 hour
  },
  {
    value: 'daily',
    label: 'Daily Summary',
    description: 'Send daily summary at preferred time',
    interval: 86400000 // 24 hours
  },
  {
    value: 'weekly',
    label: 'Weekly Report',
    description: 'Send weekly summary report',
    interval: 604800000 // 7 days
  }
]

// Available notification event types
export const notificationEventTemplates: NotificationEventTemplate[] = [
  // Gameplay Events
  {
    eventType: 'game_started',
    eventName: 'Game Started',
    description: 'Notification when a new game begins',
    category: 'gameplay',
    defaultPriority: 'normal',
    defaultFrequency: 'instant',
    defaultChannels: ['in-app', 'push'],
    canCustomizeSound: true,
    canCustomizeVisual: true,
    examples: ['Your game with @player has started', 'Tournament round 1 is beginning']
  },
  {
    eventType: 'game_completed',
    eventName: 'Game Completed',
    description: 'Notification when a game finishes',
    category: 'gameplay',
    defaultPriority: 'high',
    defaultFrequency: 'instant',
    defaultChannels: ['in-app', 'push', 'email'],
    canCustomizeSound: true,
    canCustomizeVisual: true,
    examples: ['You won against @player!', 'Game ended in draw']
  },
  {
    eventType: 'move_made',
    eventName: 'Opponent Move',
    description: 'Notification when opponent makes a move',
    category: 'gameplay',
    defaultPriority: 'normal',
    defaultFrequency: 'instant',
    defaultChannels: ['in-app', 'push'],
    canCustomizeSound: true,
    canCustomizeVisual: false,
    examples: ['@player played Nf3', 'Your turn in correspondence game']
  },
  {
    eventType: 'time_running_low',
    eventName: 'Time Running Low',
    description: 'Alert when clock time is getting low',
    category: 'gameplay',
    defaultPriority: 'urgent',
    defaultFrequency: 'instant',
    defaultChannels: ['in-app', 'push'],
    canCustomizeSound: true,
    canCustomizeVisual: true,
    examples: ['30 seconds remaining!', 'Time pressure - move quickly!']
  },

  // Achievement Events
  {
    eventType: 'achievement_unlocked',
    eventName: 'Achievement Unlocked',
    description: 'Notification for new achievements',
    category: 'achievements',
    defaultPriority: 'high',
    defaultFrequency: 'instant',
    defaultChannels: ['in-app', 'push'],
    canCustomizeSound: true,
    canCustomizeVisual: true,
    examples: ['Achievement: First Victory!', 'Badge earned: Puzzle Master']
  },
  {
    eventType: 'milestone_reached',
    eventName: 'Milestone Reached',
    description: 'Major progress milestones',
    category: 'achievements',
    defaultPriority: 'high',
    defaultFrequency: 'instant',
    defaultChannels: ['in-app', 'push', 'email'],
    canCustomizeSound: true,
    canCustomizeVisual: true,
    examples: ['1000 puzzles solved!', 'Rating increased to 1500!']
  },
  {
    eventType: 'streak_milestone',
    eventName: 'Streak Milestone',
    description: 'Consecutive activity streaks',
    category: 'achievements',
    defaultPriority: 'normal',
    defaultFrequency: 'daily',
    defaultChannels: ['in-app'],
    canCustomizeSound: true,
    canCustomizeVisual: true,
    examples: ['7-day login streak!', '50 puzzles in a row correct!']
  },

  // Social Events
  {
    eventType: 'challenge_received',
    eventName: 'Challenge Received',
    description: 'When another player challenges you',
    category: 'social',
    defaultPriority: 'high',
    defaultFrequency: 'instant',
    defaultChannels: ['in-app', 'push'],
    canCustomizeSound: true,
    canCustomizeVisual: true,
    examples: ['@player challenges you to a game', 'Tournament invitation received']
  },
  {
    eventType: 'friend_request',
    eventName: 'Friend Request',
    description: 'New friend requests',
    category: 'social',
    defaultPriority: 'normal',
    defaultFrequency: 'batched',
    defaultChannels: ['in-app', 'push'],
    canCustomizeSound: false,
    canCustomizeVisual: false,
    examples: ['@player wants to be friends', 'New connection request']
  },
  {
    eventType: 'friend_online',
    eventName: 'Friend Online',
    description: 'When friends come online',
    category: 'social',
    defaultPriority: 'low',
    defaultFrequency: 'batched',
    defaultChannels: ['in-app'],
    canCustomizeSound: false,
    canCustomizeVisual: false,
    examples: ['@friend is now online', '3 friends are now available']
  },

  // Training Events
  {
    eventType: 'training_reminder',
    eventName: 'Training Reminder',
    description: 'Daily training reminders',
    category: 'training',
    defaultPriority: 'normal',
    defaultFrequency: 'daily',
    defaultChannels: ['in-app', 'push'],
    canCustomizeSound: true,
    canCustomizeVisual: false,
    examples: ['Time for daily puzzles!', 'Study session reminder']
  },
  {
    eventType: 'lesson_completed',
    eventName: 'Lesson Completed',
    description: 'When finishing a lesson',
    category: 'training',
    defaultPriority: 'normal',
    defaultFrequency: 'instant',
    defaultChannels: ['in-app'],
    canCustomizeSound: true,
    canCustomizeVisual: true,
    examples: ['Endgame lesson completed', 'Opening study finished']
  },
  {
    eventType: 'weakness_identified',
    eventName: 'Weakness Identified',
    description: 'AI identifies areas for improvement',
    category: 'training',
    defaultPriority: 'normal',
    defaultFrequency: 'weekly',
    defaultChannels: ['in-app', 'email'],
    canCustomizeSound: false,
    canCustomizeVisual: false,
    examples: ['Work on knight endgames', 'Time management needs improvement']
  },

  // System Events
  {
    eventType: 'system_maintenance',
    eventName: 'System Maintenance',
    description: 'Scheduled maintenance notifications',
    category: 'system',
    defaultPriority: 'high',
    defaultFrequency: 'instant',
    defaultChannels: ['in-app', 'push', 'email'],
    canCustomizeSound: false,
    canCustomizeVisual: false,
    examples: ['Maintenance in 1 hour', 'Server update complete']
  },
  {
    eventType: 'security_alert',
    eventName: 'Security Alert',
    description: 'Account security notifications',
    category: 'system',
    defaultPriority: 'urgent',
    defaultFrequency: 'instant',
    defaultChannels: ['in-app', 'push', 'email', 'sms'],
    canCustomizeSound: false,
    canCustomizeVisual: true,
    examples: ['New login detected', 'Password changed successfully']
  },
  {
    eventType: 'feature_announcement',
    eventName: 'Feature Announcement',
    description: 'New features and updates',
    category: 'system',
    defaultPriority: 'low',
    defaultFrequency: 'weekly',
    defaultChannels: ['in-app', 'email'],
    canCustomizeSound: false,
    canCustomizeVisual: false,
    examples: ['New puzzle categories available', 'Update: Improved analysis engine']
  }
]

// Available exception events (always allowed during Do Not Disturb)
export const availableExceptions = [
  'security_alert',
  'system_maintenance', 
  'time_running_low',
  'game_completed',
  'challenge_received'
]

// Default quiet hours configuration
export const defaultQuietHours = {
  enabled: false,
  startTime: '22:00',
  endTime: '08:00',
  daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // All days
  respectsTimeZone: true
}

// Default Do Not Disturb configuration
export const defaultDoNotDisturb = {
  enabled: false,
  until: undefined as number | undefined,
  exceptions: ['security_alert', 'time_running_low'] as string[]
}