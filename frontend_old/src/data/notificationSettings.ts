/**
 * Mock Notification Settings Data
 * Contains realistic notification configuration data and examples
 */

import type {
  NotificationSettings,
  NotificationInstance,
  NotificationStats,
  NotificationChannelSettings,
  NotificationEventSettings,
  NotificationTest
} from '@/types/notifications'

/**
 * Default channel settings
 */
export const defaultChannelSettings: NotificationChannelSettings[] = [
  {
    channel: 'in-app',
    enabled: true,
    minPriority: 'low',
    sound: 'default',
    visualStyle: 'slide',
    deliveryDelay: 0,
    respectQuietHours: false
  },
  {
    channel: 'push',
    enabled: true,
    minPriority: 'normal',
    sound: 'default',
    visualStyle: 'slide',
    deliveryDelay: 0,
    respectQuietHours: true
  },
  {
    channel: 'email',
    enabled: false,
    minPriority: 'high',
    sound: 'none',
    visualStyle: 'none',
    deliveryDelay: 60, // 1 hour delay for email digests
    respectQuietHours: false
  },
  {
    channel: 'sms',
    enabled: false,
    minPriority: 'urgent',
    sound: 'none',
    visualStyle: 'none',
    deliveryDelay: 0,
    respectQuietHours: false
  }
]

/**
 * Default event settings
 */
export const defaultEventSettings: NotificationEventSettings[] = [
  // Gameplay Events
  {
    eventType: 'game_started',
    eventName: 'Game Started',
    description: 'When a new chess game begins',
    enabled: true,
    priority: 'normal',
    frequency: 'instant',
    enabledChannels: ['in-app', 'push'],
    customSound: 'chess_move',
    customVisualStyle: 'slide',
    category: 'gameplay'
  },
  {
    eventType: 'game_completed',
    eventName: 'Game Completed',
    description: 'When a chess game ends (win, loss, or draw)',
    enabled: true,
    priority: 'high',
    frequency: 'instant',
    enabledChannels: ['in-app', 'push'],
    customSound: 'victory',
    customVisualStyle: 'bounce',
    category: 'gameplay'
  },
  {
    eventType: 'puzzle_solved',
    eventName: 'Puzzle Solved',
    description: 'When you successfully solve a tactical puzzle',
    enabled: true,
    priority: 'normal',
    frequency: 'instant',
    enabledChannels: ['in-app'],
    customSound: 'achievement',
    customVisualStyle: 'glow',
    category: 'gameplay'
  },
  {
    eventType: 'rating_changed',
    eventName: 'Rating Update',
    description: 'When your chess rating changes significantly',
    enabled: true,
    priority: 'high',
    frequency: 'instant',
    enabledChannels: ['in-app', 'push'],
    customSound: 'achievement',
    customVisualStyle: 'pulse',
    category: 'gameplay'
  },

  // Achievement Events
  {
    eventType: 'achievement_unlocked',
    eventName: 'Achievement Unlocked',
    description: 'When you earn a new achievement or badge',
    enabled: true,
    priority: 'high',
    frequency: 'instant',
    enabledChannels: ['in-app', 'push'],
    customSound: 'victory',
    customVisualStyle: 'bounce',
    category: 'achievements'
  },

  // Social Events
  {
    eventType: 'challenge_received',
    eventName: 'Challenge Received',
    description: 'When another player challenges you to a game',
    enabled: true,
    priority: 'high',
    frequency: 'instant',
    enabledChannels: ['in-app', 'push'],
    customSound: 'alert',
    customVisualStyle: 'flash',
    category: 'social'
  },
  {
    eventType: 'friend_activity',
    eventName: 'Friend Activity',
    description: 'When friends complete games or achieve milestones',
    enabled: false,
    priority: 'low',
    frequency: 'hourly',
    enabledChannels: ['in-app'],
    customSound: 'subtle',
    customVisualStyle: 'slide',
    category: 'social'
  },

  // Training Events
  {
    eventType: 'training_reminder',
    eventName: 'Training Reminder',
    description: 'Scheduled reminders for daily chess training',
    enabled: true,
    priority: 'normal',
    frequency: 'daily',
    enabledChannels: ['in-app', 'push'],
    customSound: 'subtle',
    customVisualStyle: 'slide',
    category: 'training'
  },
  {
    eventType: 'tournament_starting',
    eventName: 'Tournament Starting',
    description: 'When a tournament you registered for is about to begin',
    enabled: true,
    priority: 'high',
    frequency: 'instant',
    enabledChannels: ['in-app', 'push'],
    customSound: 'alert',
    customVisualStyle: 'flash',
    category: 'training'
  },

  // System Events
  {
    eventType: 'system_maintenance',
    eventName: 'System Maintenance',
    description: 'Scheduled maintenance and system updates',
    enabled: true,
    priority: 'normal',
    frequency: 'instant',
    enabledChannels: ['in-app', 'push', 'email'],
    customSound: 'default',
    customVisualStyle: 'slide',
    category: 'system'
  },
  {
    eventType: 'security_alert',
    eventName: 'Security Alert',
    description: 'Security-related notifications and alerts',
    enabled: true,
    priority: 'urgent',
    frequency: 'instant',
    enabledChannels: ['in-app', 'push', 'email'],
    customSound: 'alert',
    customVisualStyle: 'flash',
    category: 'system'
  }
]

/**
 * Mock notification settings
 */
export const mockNotificationSettings: NotificationSettings = {
  enabled: true,
  channels: defaultChannelSettings,
  events: defaultEventSettings,
  quietHours: {
    startTime: '22:00',
    endTime: '08:00',
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // All days
    enabled: true
  },
  doNotDisturb: {
    enabled: false,
    until: undefined,
    exceptions: ['security_alert', 'tournament_starting']
  },
  grouping: {
    enabled: true,
    maxGroupSize: 5,
    groupTimeWindow: 15 // 15 minutes
  },
  retentionDays: 30,
  customRules: [
    {
      id: 'rating-milestone-rule',
      name: 'Rating Milestone Alert',
      description: 'Alert when rating crosses major milestones (1200, 1400, 1600, etc.)',
      enabled: true,
      conditions: [
        {
          field: 'rating',
          operator: 'greater_than',
          value: 1200,
          logicalOperator: 'and'
        },
        {
          field: 'rating',
          operator: 'regex',
          value: '^\\d{2}00$' // Matches 1200, 1300, 1400, etc.
        }
      ],
      actions: [
        {
          type: 'send_notification',
          config: {
            title: 'Rating Milestone!',
            message: 'Congratulations on reaching a new rating milestone!',
            priority: 'high',
            channels: ['in-app', 'push'],
            sound: 'victory'
          }
        }
      ],
      cooldownMinutes: 60,
      maxTriggersPerDay: 3,
      createdAt: Date.now() - 86400000, // 1 day ago
      lastTriggered: Date.now() - 3600000 // 1 hour ago
    },
    {
      id: 'winning-streak-rule',
      name: 'Winning Streak Celebration',
      description: 'Celebrate when player achieves winning streaks of 5+ games',
      enabled: true,
      conditions: [
        {
          field: 'consecutive_wins',
          operator: 'greater_than',
          value: 4
        }
      ],
      actions: [
        {
          type: 'send_notification',
          config: {
            title: 'Winning Streak!',
            message: 'You\'re on fire! {{consecutive_wins}} games in a row!',
            priority: 'high',
            channels: ['in-app', 'push'],
            sound: 'victory'
          }
        }
      ],
      cooldownMinutes: 30,
      maxTriggersPerDay: 10,
      createdAt: Date.now() - 172800000 // 2 days ago
    }
  ],
  preview: {
    showInLockScreen: true,
    showSensitiveContent: false,
    maxPreviewLength: 100
  },
  autoCleanup: {
    enabled: true,
    cleanupAfterDays: 7,
    keepImportant: true
  }
}

/**
 * Mock recent notifications
 */
export const mockNotifications: NotificationInstance[] = [
  {
    id: 'notif-1',
    eventType: 'achievement_unlocked',
    title: 'Achievement Unlocked: Puzzle Master!',
    message: 'You\'ve solved 100 tactical puzzles! Keep up the great work.',
    priority: 'high',
    status: 'unread',
    timestamp: Date.now() - 300000, // 5 minutes ago
    sentChannels: ['in-app', 'push'],
    data: {
      achievementId: 'puzzle-master-100',
      badgeUrl: '/badges/puzzle-master.svg',
      puzzlesSolved: 100
    },
    actions: [
      {
        id: 'view-achievement',
        label: 'View Achievement',
        type: 'primary',
        url: '/achievements/puzzle-master-100'
      },
      {
        id: 'share-achievement',
        label: 'Share',
        type: 'secondary'
      }
    ]
  },
  {
    id: 'notif-2',
    eventType: 'game_completed',
    title: 'Victory! Rating +25',
    message: 'Great game against ChessBot Advanced. Your tactical execution was excellent!',
    priority: 'high',
    status: 'unread',
    timestamp: Date.now() - 1800000, // 30 minutes ago
    sentChannels: ['in-app', 'push'],
    data: {
      gameId: 'game-abc123',
      opponent: 'ChessBot Advanced',
      result: 'win',
      ratingChange: 25,
      newRating: 1245,
      gameLength: '32 moves'
    },
    actions: [
      {
        id: 'analyze-game',
        label: 'Analyze Game',
        type: 'primary',
        url: '/analysis/game-abc123'
      }
    ]
  },
  {
    id: 'notif-3',
    eventType: 'training_reminder',
    title: 'Daily Training Reminder',
    message: 'Time for your daily chess training! You have 3 new tactical puzzles waiting.',
    priority: 'normal',
    status: 'read',
    timestamp: Date.now() - 7200000, // 2 hours ago
    sentChannels: ['in-app', 'push'],
    data: {
      puzzlesAvailable: 3,
      studyPlan: 'Tactical Mastery Level 2',
      estimatedTime: '15 minutes'
    },
    actions: [
      {
        id: 'start-training',
        label: 'Start Training',
        type: 'primary',
        url: '/puzzles/tactical'
      },
      {
        id: 'snooze-reminder',
        label: 'Remind Later',
        type: 'secondary'
      }
    ]
  },
  {
    id: 'notif-4',
    eventType: 'challenge_received',
    title: 'Challenge Received from Magnus2023',
    message: 'Magnus2023 (Rating: 1420) has challenged you to a 10-minute rapid game.',
    priority: 'high',
    status: 'read',
    timestamp: Date.now() - 14400000, // 4 hours ago
    sentChannels: ['in-app', 'push'],
    data: {
      challengerId: 'magnus2023',
      challengerRating: 1420,
      timeControl: '10+0',
      gameType: 'rapid',
      expiresAt: Date.now() + 3600000 // Expires in 1 hour
    },
    actions: [
      {
        id: 'accept-challenge',
        label: 'Accept',
        type: 'primary'
      },
      {
        id: 'decline-challenge',
        label: 'Decline',
        type: 'secondary'
      }
    ],
    expiresAt: Date.now() + 3600000
  },
  {
    id: 'notif-5',
    eventType: 'rating_changed',
    title: 'Rating Milestone: 1200+',
    message: 'Congratulations! You\'ve crossed the 1200 rating threshold. Next stop: 1400!',
    priority: 'high',
    status: 'read',
    timestamp: Date.now() - 86400000, // 1 day ago
    sentChannels: ['in-app', 'push'],
    data: {
      oldRating: 1195,
      newRating: 1220,
      milestone: 1200,
      nextMilestone: 1400,
      improvement: 'tactical-awareness'
    },
    actions: [
      {
        id: 'view-progress',
        label: 'View Progress',
        type: 'primary',
        url: '/progress'
      }
    ]
  },
  {
    id: 'notif-6',
    eventType: 'tournament_starting',
    title: 'Tournament Alert: Weekly Blitz starting in 30 minutes',
    message: 'The Weekly Blitz Tournament starts at 8:00 PM. 127 players registered.',
    priority: 'high',
    status: 'archived',
    timestamp: Date.now() - 172800000, // 2 days ago
    sentChannels: ['in-app', 'push'],
    data: {
      tournamentId: 'weekly-blitz-47',
      tournamentName: 'Weekly Blitz Championship',
      startTime: Date.now() - 170400000, // Started 1.5 days ago
      playersRegistered: 127,
      prizePool: '$50 Chess.com Premium',
      timeControl: '3+2'
    },
    actions: [
      {
        id: 'join-tournament',
        label: 'Join Tournament',
        type: 'primary',
        url: '/tournaments/weekly-blitz-47'
      }
    ]
  }
]

/**
 * Mock notification statistics
 */
export const mockNotificationStats: NotificationStats = {
  totalSent: 342,
  byChannel: {
    'in-app': 287,
    'push': 234,
    'email': 45,
    'sms': 0
  },
  byEventType: {
    'game_completed': 89,
    'puzzle_solved': 67,
    'achievement_unlocked': 23,
    'training_reminder': 56,
    'game_started': 82,
    'rating_changed': 12,
    'challenge_received': 8,
    'friend_activity': 3,
    'tournament_starting': 2,
    'system_maintenance': 0,
    'security_alert': 0
  },
  byPriority: {
    'low': 45,
    'normal': 189,
    'high': 98,
    'urgent': 10
  },
  readRate: 78.5,
  avgTimeToRead: 12.5, // minutes
  dismissalRate: 15.2,
  activeHours: [18, 19, 20, 21, 22], // 6-10 PM most active
  recentActivity: [
    { date: '2024-01-27', count: 12 },
    { date: '2024-01-26', count: 18 },
    { date: '2024-01-25', count: 15 },
    { date: '2024-01-24', count: 9 },
    { date: '2024-01-23', count: 14 },
    { date: '2024-01-22', count: 11 },
    { date: '2024-01-21', count: 8 }
  ],
  channelEffectiveness: {
    'in-app': {
      deliveryRate: 100,
      readRate: 85.2,
      actionRate: 23.5
    },
    'push': {
      deliveryRate: 95.5,
      readRate: 68.3,
      actionRate: 18.7
    },
    'email': {
      deliveryRate: 98.2,
      readRate: 45.8,
      actionRate: 12.3
    },
    'sms': {
      deliveryRate: 0,
      readRate: 0,
      actionRate: 0
    }
  }
}

/**
 * Available notification tests
 */
export const mockNotificationTests: NotificationTest[] = [
  {
    id: 'test-game-complete',
    name: 'Game Completion Test',
    eventType: 'game_completed',
    testData: {
      opponent: 'Test Bot',
      result: 'win',
      ratingChange: 15,
      gameLength: 28
    },
    testChannels: ['in-app', 'push'],
    expectedBehavior: 'Should show victory notification with rating change and offer game analysis'
  },
  {
    id: 'test-achievement',
    name: 'Achievement Unlock Test',
    eventType: 'achievement_unlocked',
    testData: {
      achievementName: 'Test Achievement',
      badgeIcon: '<Trophy className="w-4 h-4 inline" />',
      description: 'This is a test achievement'
    },
    testChannels: ['in-app', 'push'],
    expectedBehavior: 'Should display celebration notification with achievement details and sharing options'
  },
  {
    id: 'test-training-reminder',
    name: 'Training Reminder Test',
    eventType: 'training_reminder',
    testData: {
      puzzlesWaiting: 5,
      studyPlan: 'Advanced Tactics',
      estimatedTime: 20
    },
    testChannels: ['in-app', 'push'],
    expectedBehavior: 'Should show gentle reminder with quick action to start training session'
  },
  {
    id: 'test-challenge',
    name: 'Challenge Received Test',
    eventType: 'challenge_received',
    testData: {
      challenger: 'TestPlayer123',
      rating: 1350,
      timeControl: '15+10',
      gameType: 'rapid'
    },
    testChannels: ['in-app', 'push'],
    expectedBehavior: 'Should display urgent notification with accept/decline actions and auto-expire'
  },
  {
    id: 'test-security-alert',
    name: 'Security Alert Test',
    eventType: 'security_alert',
    testData: {
      alertType: 'suspicious_login',
      location: 'Unknown Location',
      timestamp: Date.now()
    },
    testChannels: ['in-app', 'push', 'email'],
    expectedBehavior: 'Should trigger high-priority alert across all channels with immediate action required'
  }
]

/**
 * Sound option configurations
 */
export const notificationSoundOptions = [
  { value: 'none' as const, label: 'No Sound' },
  { value: 'default' as const, label: 'Default System' },
  { value: 'chess_move' as const, label: 'Chess Move' },
  { value: 'victory' as const, label: 'Victory Fanfare' },
  { value: 'achievement' as const, label: 'Achievement Chime' },
  { value: 'alert' as const, label: 'Alert Tone' },
  { value: 'subtle' as const, label: 'Subtle Ping' }
]

/**
 * Visual alert style options
 */
export const visualAlertOptions = [
  { value: 'none' as const, label: 'No Animation' },
  { value: 'slide' as const, label: 'Slide In' },
  { value: 'bounce' as const, label: 'Bounce Effect' },
  { value: 'flash' as const, label: 'Flash Alert' },
  { value: 'glow' as const, label: 'Glow Effect' },
  { value: 'pulse' as const, label: 'Pulse Animation' }
]

/**
 * Priority level configurations
 */
export const priorityLevelOptions = [
  { value: 'low' as const, label: 'Low Priority', description: 'Minimal disruption, can wait' },
  { value: 'normal' as const, label: 'Normal Priority', description: 'Standard notifications' },
  { value: 'high' as const, label: 'High Priority', description: 'Important, needs attention soon' },
  { value: 'urgent' as const, label: 'Urgent Priority', description: 'Critical, immediate attention' }
]

/**
 * Frequency options
 */
export const frequencyOptions = [
  { value: 'instant' as const, label: 'Instant', description: 'Notify immediately' },
  { value: 'hourly' as const, label: 'Hourly Digest', description: 'Group into hourly summaries' },
  { value: 'daily' as const, label: 'Daily Summary', description: 'Send once per day' },
  { value: 'weekly' as const, label: 'Weekly Report', description: 'Weekly summary only' },
  { value: 'never' as const, label: 'Never', description: 'Disable completely' }
]