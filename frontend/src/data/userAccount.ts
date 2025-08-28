import type {
  UserAccount,
  UserProfile,
  SecuritySettings,
  SubscriptionInfo,
  ConnectedService,
  PrivacySettings,
  AccountBadges,
  LoginSession,
  DataExportRequest,
  PaymentRecord
} from '@/types/account'

/**
 * Mock user profile for visual mockup
 */
const mockUserProfile: UserProfile = {
  displayName: 'ChessVault Master',
  email: 'chessmaster@example.com',
  phoneNumber: '+1 (555) 123-4567',
  bio: 'Passionate chess enthusiast working on mastering endgame techniques and tactical combinations. Enjoy analyzing master games and solving challenging puzzles.',
  location: 'San Francisco, CA',
  birthDate: '1990-05-15',
  profileVisibility: 'public',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChessVault',
  ratings: {
    rapid: 1847,
    blitz: 1623,
    bullet: 1456,
    classical: 1923,
    puzzle: 2156
  },
  fideRating: 1850,
  timezone: 'America/Los_Angeles',
  language: 'en-US',
  title: 'FM',
  verificationBadges: ['email-verified', 'phone-verified', 'identity-verified'],
  socialLinks: {
    twitter: 'https://twitter.com/chessvault',
    youtube: 'https://youtube.com/@chessvault',
    twitch: 'https://twitch.tv/chessvault',
    website: 'https://chessvault.com'
  }
}

/**
 * Mock security settings
 */
const mockSecuritySettings: SecuritySettings = {
  twoFactorAuth: {
    enabled: true,
    method: 'totp',
    backupCodes: [
      'ABC123DEF', 'GHI456JKL', 'MNO789PQR', 
      'STU012VWX', 'YZA345BCD', 'EFG678HIJ'
    ],
    enabledAt: Date.now() - (30 * 24 * 60 * 60 * 1000) // 30 days ago
  },
  passwordRequirements: {
    lastChanged: Date.now() - (45 * 24 * 60 * 60 * 1000), // 45 days ago
    requiresChange: false,
    strength: 'strong'
  },
  loginNotifications: {
    newDevice: true,
    suspiciousActivity: true,
    failedAttempts: true
  },
  sessionSettings: {
    maxSessions: 5,
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    requireReauth: true
  },
  apiAccess: {
    enabled: true,
    rateLimit: 1000,
    allowedOrigins: ['https://chessvault.com', 'https://app.chessvault.com']
  }
}

/**
 * Mock payment history
 */
const mockPaymentHistory: PaymentRecord[] = [
  {
    id: 'pay_2024_001',
    amount: 19.99,
    currency: 'USD',
    date: Date.now() - (15 * 24 * 60 * 60 * 1000), // 15 days ago
    status: 'paid',
    description: 'Pro Plan - Monthly Subscription',
    invoiceUrl: 'https://api.example.com/invoices/2024_001.pdf',
    receiptUrl: 'https://api.example.com/receipts/2024_001.pdf'
  },
  {
    id: 'pay_2024_002',
    amount: 19.99,
    currency: 'USD',
    date: Date.now() - (45 * 24 * 60 * 60 * 1000), // 45 days ago
    status: 'paid',
    description: 'Pro Plan - Monthly Subscription',
    invoiceUrl: 'https://api.example.com/invoices/2024_002.pdf',
    receiptUrl: 'https://api.example.com/receipts/2024_002.pdf'
  },
  {
    id: 'pay_2024_003',
    amount: 9.99,
    currency: 'USD',
    date: Date.now() - (75 * 24 * 60 * 60 * 1000), // 75 days ago
    status: 'paid',
    description: 'Premium Plan - Monthly Subscription',
    invoiceUrl: 'https://api.example.com/invoices/2024_003.pdf',
    receiptUrl: 'https://api.example.com/receipts/2024_003.pdf'
  },
  {
    id: 'pay_2024_004',
    amount: 9.99,
    currency: 'USD',
    date: Date.now() - (105 * 24 * 60 * 60 * 1000), // 105 days ago
    status: 'refunded',
    description: 'Premium Plan - Monthly Subscription (Refunded)',
    invoiceUrl: 'https://api.example.com/invoices/2024_004.pdf',
    receiptUrl: 'https://api.example.com/receipts/2024_004.pdf'
  }
]

/**
 * Mock subscription information
 */
const mockSubscriptionInfo: SubscriptionInfo = {
  tier: 'pro',
  status: 'active',
  billingCycle: 'monthly',
  currentPeriod: {
    start: Date.now() - (15 * 24 * 60 * 60 * 1000), // 15 days ago
    end: Date.now() + (15 * 24 * 60 * 60 * 1000) // 15 days from now
  },
  features: {
    unlimitedPuzzles: true,
    advancedAnalytics: true,
    personalCoach: true,
    prioritySupport: true,
    customTraining: true,
    tournamentPrep: true,
    masterDatabase: true,
    openingBook: true
  },
  payment: {
    method: 'credit-card',
    lastFour: '4242',
    expiresAt: Date.now() + (365 * 24 * 60 * 60 * 1000), // 1 year from now
    autoRenew: true
  },
  billingHistory: mockPaymentHistory,
  usage: {
    puzzlesSolved: 2847,
    gamesPlayed: 156,
    studyHours: 78.5,
    coachingSessions: 12
  }
}

/**
 * Mock connected services
 */
const mockConnectedServices: ConnectedService[] = [
  {
    provider: 'lichess',
    connected: true,
    username: 'ChessVaultMaster',
    connectedAt: Date.now() - (60 * 24 * 60 * 60 * 1000), // 60 days ago
    lastSync: Date.now() - (2 * 60 * 60 * 1000), // 2 hours ago
    permissions: ['read', 'import-games', 'import-ratings'],
    metadata: {
      userId: 'lichess_user_12345',
      rating: 1847,
      gamesCount: 2156
    },
    importStats: {
      gamesImported: 1823,
      ratingsImported: true,
      profileSynced: true
    }
  },
  {
    provider: 'chesscom',
    connected: false,
    permissions: [],
    metadata: {}
  },
  {
    provider: 'google',
    connected: true,
    username: 'chessmaster@gmail.com',
    connectedAt: Date.now() - (120 * 24 * 60 * 60 * 1000), // 120 days ago
    lastSync: Date.now() - (24 * 60 * 60 * 1000), // 1 day ago
    permissions: ['profile', 'email'],
    metadata: {
      userId: 'google_user_67890',
      verified: true
    }
  },
  {
    provider: 'discord',
    connected: true,
    username: 'ChessVault#1234',
    connectedAt: Date.now() - (30 * 24 * 60 * 60 * 1000), // 30 days ago
    lastSync: Date.now() - (6 * 60 * 60 * 1000), // 6 hours ago
    permissions: ['profile', 'guilds'],
    metadata: {
      userId: 'discord_user_98765',
      discriminator: '1234',
      guildCount: 15
    }
  }
]

/**
 * Mock privacy settings
 */
const mockPrivacySettings: PrivacySettings = {
  profileVisibility: 'public',
  gameVisibility: 'public',
  statsVisibility: 'friends',
  onlineStatus: true,
  allowFriendRequests: true,
  allowDirectMessages: true,
  dataCollection: {
    analytics: true,
    marketing: false,
    personalization: true,
    research: true
  },
  communications: {
    email: true,
    push: true,
    sms: false,
    newsletter: true
  },
  dataRetention: {
    deleteInactive: false,
    retentionPeriod: 365, // days
    exportBeforeDelete: true
  }
}

/**
 * Mock account badges and achievements
 */
const mockAccountBadges: AccountBadges = {
  verification: {
    emailVerified: true,
    phoneVerified: true,
    identityVerified: true,
    addressVerified: false
  },
  trust: {
    accountAge: 180, // days
    gamesPlayed: 2156,
    communityRating: 4.8,
    reportCount: 0
  },
  achievements: [
    {
      id: 'puzzle_master',
      name: 'Puzzle Master',
      description: 'Solved 1000+ tactical puzzles',
      earnedAt: Date.now() - (30 * 24 * 60 * 60 * 1000),
      icon: '🧩',
      rarity: 'rare'
    },
    {
      id: 'endgame_expert',
      name: 'Endgame Expert',
      description: 'Mastered 50 essential endgames',
      earnedAt: Date.now() - (45 * 24 * 60 * 60 * 1000),
      icon: '<FaChessKing className="w-4 h-4 inline" />',
      rarity: 'epic'
    },
    {
      id: 'opening_scholar',
      name: 'Opening Scholar',
      description: 'Studied 25 different opening systems',
      earnedAt: Date.now() - (20 * 24 * 60 * 60 * 1000),
      icon: '<BookOpen className="w-4 h-4 inline" />',
      rarity: 'rare'
    },
    {
      id: 'rating_climber',
      name: 'Rating Climber',
      description: 'Gained 200+ rating points in a month',
      earnedAt: Date.now() - (60 * 24 * 60 * 60 * 1000),
      icon: '<TrendingUp className="w-4 h-4 inline" />',
      rarity: 'common'
    },
    {
      id: 'streak_master',
      name: 'Streak Master',
      description: 'Maintained a 20-game winning streak',
      earnedAt: Date.now() - (10 * 24 * 60 * 60 * 1000),
      icon: '<Flame className="w-4 h-4 inline" />',
      rarity: 'legendary'
    }
  ],
  certifications: {
    chessCoach: true,
    tournament: false,
    streamer: true,
    moderator: false
  }
}

/**
 * Mock login history
 */
const mockLoginHistory: LoginSession[] = [
  {
    sessionId: 'session_current',
    timestamp: Date.now() - (2 * 60 * 60 * 1000), // 2 hours ago
    ipAddress: '192.168.1.100',
    location: {
      country: 'United States',
      city: 'San Francisco',
      region: 'California'
    },
    device: {
      type: 'web',
      browser: 'Chrome 120.0',
      os: 'macOS 14.2',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    status: 'active',
    lastActivity: Date.now() - (5 * 60 * 1000), // 5 minutes ago
    flags: {
      suspicious: false,
      newDevice: false,
      newLocation: false
    }
  },
  {
    sessionId: 'session_mobile',
    timestamp: Date.now() - (6 * 60 * 60 * 1000), // 6 hours ago
    ipAddress: '10.0.0.15',
    location: {
      country: 'United States',
      city: 'San Francisco',
      region: 'California'
    },
    device: {
      type: 'mobile',
      browser: 'Safari 17.0',
      os: 'iOS 17.2',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15'
    },
    status: 'active',
    lastActivity: Date.now() - (30 * 60 * 1000), // 30 minutes ago
    flags: {
      suspicious: false,
      newDevice: false,
      newLocation: false
    }
  },
  {
    sessionId: 'session_yesterday',
    timestamp: Date.now() - (24 * 60 * 60 * 1000), // 1 day ago
    ipAddress: '192.168.1.100',
    location: {
      country: 'United States',
      city: 'San Francisco',
      region: 'California'
    },
    device: {
      type: 'web',
      browser: 'Firefox 121.0',
      os: 'macOS 14.2',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0'
    },
    status: 'expired',
    lastActivity: Date.now() - (20 * 60 * 60 * 1000), // 20 hours ago
    flags: {
      suspicious: false,
      newDevice: false,
      newLocation: false
    }
  },
  {
    sessionId: 'session_suspicious',
    timestamp: Date.now() - (3 * 24 * 60 * 60 * 1000), // 3 days ago
    ipAddress: '203.0.113.42',
    location: {
      country: 'Netherlands',
      city: 'Amsterdam',
      region: 'North Holland'
    },
    device: {
      type: 'web',
      browser: 'Chrome 119.0',
      os: 'Windows 11',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    status: 'terminated',
    lastActivity: Date.now() - (3 * 24 * 60 * 60 * 1000), // 3 days ago
    flags: {
      suspicious: true,
      newDevice: true,
      newLocation: true
    }
  },
  {
    sessionId: 'session_old',
    timestamp: Date.now() - (7 * 24 * 60 * 60 * 1000), // 1 week ago
    ipAddress: '192.168.1.100',
    location: {
      country: 'United States',
      city: 'San Francisco',
      region: 'California'
    },
    device: {
      type: 'desktop',
      browser: 'Chrome 119.0',
      os: 'macOS 14.1',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    status: 'expired',
    lastActivity: Date.now() - (6 * 24 * 60 * 60 * 1000), // 6 days ago
    flags: {
      suspicious: false,
      newDevice: false,
      newLocation: false
    }
  }
]

/**
 * Mock data export requests
 */
const mockDataExports: DataExportRequest[] = [
  {
    requestId: 'export_2024_001',
    requestedAt: Date.now() - (3 * 24 * 60 * 60 * 1000), // 3 days ago
    format: 'json',
    dataTypes: {
      profile: true,
      games: true,
      puzzles: true,
      progress: true,
      social: false,
      payments: false
    },
    status: 'completed',
    downloadUrl: 'https://api.example.com/exports/user-data-2024-001.json',
    expiresAt: Date.now() + (4 * 24 * 60 * 60 * 1000), // 4 days from now
    fileSize: 15728640 // ~15MB
  },
  {
    requestId: 'export_2024_002',
    requestedAt: Date.now() - (30 * 60 * 1000), // 30 minutes ago
    format: 'csv',
    dataTypes: {
      profile: true,
      games: false,
      puzzles: true,
      progress: true,
      social: false,
      payments: true
    },
    status: 'processing',
    fileSize: undefined
  }
]

/**
 * Complete mock user account
 */
export const mockUserAccount: UserAccount = {
  accountId: 'user_chessvault_001',
  createdAt: Date.now() - (180 * 24 * 60 * 60 * 1000), // 180 days ago
  lastLoginAt: Date.now() - (2 * 60 * 60 * 1000), // 2 hours ago
  status: 'active',
  verificationLevel: 'fully-verified',
  
  profile: mockUserProfile,
  security: mockSecuritySettings,
  subscription: mockSubscriptionInfo,
  connectedServices: mockConnectedServices,
  privacy: mockPrivacySettings,
  badges: mockAccountBadges,
  loginHistory: mockLoginHistory,
  dataExports: mockDataExports
}

/**
 * Available subscription tiers for upgrade options
 */
export const availableSubscriptionTiers = [
  {
    tier: 'free' as const,
    name: 'Free',
    price: 0,
    features: [
      '10 puzzles per day',
      'Basic game analysis',
      'Community support',
      'Standard board themes'
    ]
  },
  {
    tier: 'premium' as const,
    name: 'Premium',
    price: 9.99,
    features: [
      'Unlimited puzzles',
      'Advanced analytics',
      'Study plans',
      'Priority support',
      'Custom board themes',
      'Opening explorer'
    ],
    popular: true
  },
  {
    tier: 'pro' as const,
    name: 'Pro',
    price: 19.99,
    features: [
      'Everything in Premium',
      'Personal AI coach',
      'Tournament preparation',
      'Custom training plans',
      'Master game database',
      'Live coaching sessions'
    ]
  },
  {
    tier: 'grandmaster' as const,
    name: 'Grandmaster',
    price: 49.99,
    features: [
      'Everything in Pro',
      'One-on-one GM coaching',
      'Tournament entry support',
      'Advanced opening preparation',
      'Custom analysis engine',
      'Exclusive master classes'
    ]
  }
]

/**
 * Available service providers for connection
 */
export const availableServiceProviders = [
  'lichess',
  'chesscom',
  'fide',
  'uscf',
  'google',
  'facebook',
  'discord'
] as const