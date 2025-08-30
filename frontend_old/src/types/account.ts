/**
 * Account Management Types
 * Contains all TypeScript interfaces and types for user account management
 */

/**
 * Account verification levels
 */
export type VerificationLevel = 'unverified' | 'email-verified' | 'phone-verified' | 'fully-verified'

/**
 * Account subscription tiers
 */
export type SubscriptionTier = 'free' | 'premium' | 'pro' | 'grandmaster'

/**
 * Privacy settings levels
 */
export type PrivacyLevel = 'public' | 'friends' | 'private'

/**
 * Two-factor authentication methods
 */
export type TwoFactorMethod = 'none' | 'totp' | 'sms' | 'email'

/**
 * Login history entry types
 */
export type LoginSessionType = 'web' | 'mobile' | 'desktop' | 'api'

/**
 * Data export formats
 */
export type ExportFormat = 'json' | 'csv' | 'pgn' | 'pdf'

/**
 * Account status types
 */
export type AccountStatus = 'active' | 'suspended' | 'pending-verification' | 'locked'

/**
 * Connected service providers
 */
export type ServiceProvider = 'lichess' | 'chesscom' | 'fide' | 'uscf' | 'google' | 'facebook' | 'discord'

/**
 * Notification preference types
 */
export type NotificationType = 'email' | 'push' | 'sms' | 'in-app'

/**
 * User profile information
 */
export interface UserProfile {
  /** User's display name */
  displayName: string
  
  /** Email address */
  email: string
  
  /** Phone number (optional) */
  phoneNumber?: string
  
  /** Profile bio/description */
  bio: string
  
  /** User's location */
  location: string
  
  /** Birth date for age verification */
  birthDate: string
  
  /** Profile visibility setting */
  profileVisibility: PrivacyLevel
  
  /** Avatar URL or identifier */
  avatarUrl?: string
  
  /** User's chess ratings */
  ratings: {
    rapid: number
    blitz: number
    bullet: number
    classical: number
    puzzle: number
  }
  
  /** FIDE rating if available */
  fideRating?: number
  
  /** Preferred time zones */
  timezone: string
  
  /** Preferred language */
  language: string
  
  /** User's chess title (if any) */
  title?: 'CM' | 'FM' | 'IM' | 'GM' | 'WCM' | 'WFM' | 'WIM' | 'WGM'
  
  /** Verification badges earned */
  verificationBadges: string[]
  
  /** Social links */
  socialLinks: {
    twitter?: string
    youtube?: string
    twitch?: string
    website?: string
  }
}

/**
 * Security settings and configurations
 */
export interface SecuritySettings {
  /** Two-factor authentication configuration */
  twoFactorAuth: {
    enabled: boolean
    method: TwoFactorMethod
    backupCodes: string[]
    enabledAt?: number
  }
  
  /** Password requirements */
  passwordRequirements: {
    lastChanged: number
    requiresChange: boolean
    strength: 'weak' | 'medium' | 'strong'
  }
  
  /** Login notifications */
  loginNotifications: {
    newDevice: boolean
    suspiciousActivity: boolean
    failedAttempts: boolean
  }
  
  /** Session management */
  sessionSettings: {
    maxSessions: number
    sessionTimeout: number
    requireReauth: boolean
  }
  
  /** API access settings */
  apiAccess: {
    enabled: boolean
    rateLimit: number
    allowedOrigins: string[]
  }
}

/**
 * Subscription and billing information
 */
export interface SubscriptionInfo {
  /** Current subscription tier */
  tier: SubscriptionTier
  
  /** Subscription status */
  status: 'active' | 'cancelled' | 'past-due' | 'trial' | 'expired'
  
  /** Billing cycle */
  billingCycle: 'monthly' | 'yearly' | 'lifetime'
  
  /** Current period dates */
  currentPeriod: {
    start: number
    end: number
  }
  
  /** Subscription features */
  features: {
    unlimitedPuzzles: boolean
    advancedAnalytics: boolean
    personalCoach: boolean
    prioritySupport: boolean
    customTraining: boolean
    tournamentPrep: boolean
    masterDatabase: boolean
    openingBook: boolean
  }
  
  /** Payment information */
  payment: {
    method: 'credit-card' | 'paypal' | 'crypto' | 'bank-transfer'
    lastFour?: string
    expiresAt?: number
    autoRenew: boolean
  }
  
  /** Billing history */
  billingHistory: PaymentRecord[]
  
  /** Usage statistics */
  usage: {
    puzzlesSolved: number
    gamesPlayed: number
    studyHours: number
    coachingSessions: number
  }
}

/**
 * Payment record for billing history
 */
export interface PaymentRecord {
  /** Payment ID */
  id: string
  
  /** Amount paid */
  amount: number
  
  /** Currency */
  currency: string
  
  /** Payment date */
  date: number
  
  /** Payment status */
  status: 'paid' | 'pending' | 'failed' | 'refunded'
  
  /** Description */
  description: string
  
  /** Invoice URL */
  invoiceUrl?: string
  
  /** Receipt URL */
  receiptUrl?: string
}

/**
 * Connected external service
 */
export interface ConnectedService {
  /** Service provider */
  provider: ServiceProvider
  
  /** Connection status */
  connected: boolean
  
  /** Account username on the service */
  username?: string
  
  /** Connection date */
  connectedAt?: number
  
  /** Last sync date */
  lastSync?: number
  
  /** Available permissions */
  permissions: string[]
  
  /** Service-specific data */
  metadata: Record<string, any>
  
  /** Import statistics */
  importStats?: {
    gamesImported: number
    ratingsImported: boolean
    profileSynced: boolean
  }
}

/**
 * Login history entry
 */
export interface LoginSession {
  /** Session ID */
  sessionId: string
  
  /** Login timestamp */
  timestamp: number
  
  /** IP address */
  ipAddress: string
  
  /** Geographic location */
  location: {
    country: string
    city: string
    region: string
  }
  
  /** Device information */
  device: {
    type: LoginSessionType
    browser?: string
    os?: string
    userAgent: string
  }
  
  /** Session status */
  status: 'active' | 'expired' | 'terminated'
  
  /** Last activity */
  lastActivity: number
  
  /** Security flags */
  flags: {
    suspicious: boolean
    newDevice: boolean
    newLocation: boolean
  }
}

/**
 * Privacy and data settings
 */
export interface PrivacySettings {
  /** Profile visibility */
  profileVisibility: PrivacyLevel
  
  /** Game visibility */
  gameVisibility: PrivacyLevel
  
  /** Statistics visibility */
  statsVisibility: PrivacyLevel
  
  /** Online status visibility */
  onlineStatus: boolean
  
  /** Allow friend requests */
  allowFriendRequests: boolean
  
  /** Allow direct messages */
  allowDirectMessages: boolean
  
  /** Data collection preferences */
  dataCollection: {
    analytics: boolean
    marketing: boolean
    personalization: boolean
    research: boolean
  }
  
  /** Communication preferences */
  communications: {
    email: boolean
    push: boolean
    sms: boolean
    newsletter: boolean
  }
  
  /** Data retention settings */
  dataRetention: {
    deleteInactive: boolean
    retentionPeriod: number
    exportBeforeDelete: boolean
  }
}

/**
 * Account achievement and trust indicators
 */
export interface AccountBadges {
  /** Verification badges */
  verification: {
    emailVerified: boolean
    phoneVerified: boolean
    identityVerified: boolean
    addressVerified: boolean
  }
  
  /** Trust indicators */
  trust: {
    accountAge: number
    gamesPlayed: number
    communityRating: number
    reportCount: number
  }
  
  /** Special achievements */
  achievements: {
    id: string
    name: string
    description: string
    earnedAt: number
    icon: string
    rarity: 'common' | 'rare' | 'epic' | 'legendary'
  }[]
  
  /** Certifications */
  certifications: {
    chessCoach: boolean
    tournament: boolean
    streamer: boolean
    moderator: boolean
  }
}

/**
 * Data export request
 */
export interface DataExportRequest {
  /** Request ID */
  requestId: string
  
  /** Request date */
  requestedAt: number
  
  /** Export format */
  format: ExportFormat
  
  /** Data types to include */
  dataTypes: {
    profile: boolean
    games: boolean
    puzzles: boolean
    progress: boolean
    social: boolean
    payments: boolean
  }
  
  /** Date range filter */
  dateRange?: {
    start: number
    end: number
  }
  
  /** Request status */
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'expired'
  
  /** Download URL (when ready) */
  downloadUrl?: string
  
  /** Expiration date */
  expiresAt?: number
  
  /** File size in bytes */
  fileSize?: number
}

/**
 * Account deletion request
 */
export interface AccountDeletionRequest {
  /** Request ID */
  requestId: string
  
  /** Request date */
  requestedAt: number
  
  /** Deletion type */
  type: 'immediate' | 'scheduled' | 'deactivation'
  
  /** Scheduled deletion date */
  scheduledFor?: number
  
  /** Reason for deletion */
  reason: string
  
  /** Data export before deletion */
  exportData: boolean
  
  /** Confirmation token */
  confirmationToken: string
  
  /** Status */
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled'
  
  /** Cancellation deadline */
  cancellationDeadline: number
}

/**
 * Complete account information
 */
export interface UserAccount {
  /** Basic account info */
  accountId: string
  createdAt: number
  lastLoginAt: number
  status: AccountStatus
  verificationLevel: VerificationLevel
  
  /** Profile information */
  profile: UserProfile
  
  /** Security settings */
  security: SecuritySettings
  
  /** Subscription details */
  subscription: SubscriptionInfo
  
  /** Connected services */
  connectedServices: ConnectedService[]
  
  /** Privacy settings */
  privacy: PrivacySettings
  
  /** Account badges and trust */
  badges: AccountBadges
  
  /** Login history */
  loginHistory: LoginSession[]
  
  /** Pending data exports */
  dataExports: DataExportRequest[]
  
  /** Account deletion request (if any) */
  deletionRequest?: AccountDeletionRequest
}

/**
 * Props for profile editor component
 */
export interface ProfileEditorProps {
  /** Current user profile */
  profile: UserProfile
  
  /** Callback when profile is updated */
  onProfileUpdate: (updates: Partial<UserProfile>) => void
  
  /** Loading state */
  isLoading: boolean
  
  /** Error message */
  error: string | null
  
  /** Theme from store */
  theme: any
}

/**
 * Props for security settings component
 */
export interface SecuritySettingsProps {
  /** Current security settings */
  security: SecuritySettings
  
  /** Callback when settings are updated */
  onSecurityUpdate: (updates: Partial<SecuritySettings>) => void
  
  /** Password change handler */
  onPasswordChange: (currentPassword: string, newPassword: string) => Promise<boolean>
  
  /** 2FA setup handler */
  onTwoFactorSetup: (method: TwoFactorMethod) => Promise<{ secret: string; qrCode: string }>
  
  /** Loading state */
  isLoading: boolean
  
  /** Error message */
  error: string | null
  
  /** Theme from store */
  theme: any
}

/**
 * Props for subscription management component
 */
export interface SubscriptionManagementProps {
  /** Current subscription info */
  subscription: SubscriptionInfo
  
  /** Available subscription tiers */
  availableTiers: {
    tier: SubscriptionTier
    name: string
    price: number
    features: string[]
    popular?: boolean
  }[]
  
  /** Upgrade handler */
  onUpgrade: (tier: SubscriptionTier, cycle: 'monthly' | 'yearly') => Promise<void>
  
  /** Cancel subscription handler */
  onCancel: () => Promise<void>
  
  /** Update payment method handler */
  onUpdatePayment: (method: any) => Promise<void>
  
  /** Loading state */
  isLoading: boolean
  
  /** Error message */
  error: string | null
  
  /** Theme from store */
  theme: any
}

/**
 * Props for data management component
 */
export interface DataManagementProps {
  /** Current privacy settings */
  privacy: PrivacySettings
  
  /** Data export requests */
  dataExports: DataExportRequest[]
  
  /** Account deletion request */
  deletionRequest?: AccountDeletionRequest
  
  /** Privacy settings update handler */
  onPrivacyUpdate: (updates: Partial<PrivacySettings>) => void
  
  /** Data export request handler */
  onExportRequest: (format: ExportFormat, dataTypes: string[]) => Promise<void>
  
  /** Account deletion handler */
  onDeleteAccount: (reason: string, exportData: boolean) => Promise<void>
  
  /** Loading state */
  isLoading: boolean
  
  /** Error message */
  error: string | null
  
  /** Theme from store */
  theme: any
}

/**
 * Props for connected services component
 */
export interface ConnectedServicesProps {
  /** List of connected services */
  services: ConnectedService[]
  
  /** Available service providers */
  availableProviders: ServiceProvider[]
  
  /** Connect service handler */
  onConnect: (provider: ServiceProvider) => Promise<void>
  
  /** Disconnect service handler */
  onDisconnect: (provider: ServiceProvider) => Promise<void>
  
  /** Sync service handler */
  onSync: (provider: ServiceProvider) => Promise<void>
  
  /** Loading state */
  isLoading: boolean
  
  /** Error message */
  error: string | null
  
  /** Theme from store */
  theme: any
}

/**
 * Props for login history component
 */
export interface LoginHistoryProps {
  /** Login session history */
  sessions: LoginSession[]
  
  /** Terminate session handler */
  onTerminateSession: (sessionId: string) => Promise<void>
  
  /** Terminate all sessions handler */
  onTerminateAllSessions: () => Promise<void>
  
  /** Loading state */
  isLoading: boolean
  
  /** Error message */
  error: string | null
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for useAccount
 */
export interface AccountHookReturn {
  // Account state
  account: UserAccount | null
  isLoading: boolean
  error: string | null
  
  // Profile management
  updateProfile: (updates: Partial<UserProfile>) => Promise<boolean>
  uploadAvatar: (file: File) => Promise<string>
  
  // Security management
  updateSecurity: (updates: Partial<SecuritySettings>) => Promise<boolean>
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
  setupTwoFactor: (method: TwoFactorMethod) => Promise<{ secret: string; qrCode: string }>
  disableTwoFactor: (code: string) => Promise<boolean>
  
  // Session management
  getLoginHistory: () => Promise<LoginSession[]>
  terminateSession: (sessionId: string) => Promise<boolean>
  terminateAllSessions: () => Promise<boolean>
  
  // Connected services
  connectService: (provider: ServiceProvider) => Promise<boolean>
  disconnectService: (provider: ServiceProvider) => Promise<boolean>
  syncService: (provider: ServiceProvider) => Promise<boolean>
  
  // Subscription management
  upgradeSubscription: (tier: SubscriptionTier, cycle: 'monthly' | 'yearly') => Promise<boolean>
  cancelSubscription: () => Promise<boolean>
  updatePaymentMethod: (method: any) => Promise<boolean>
  
  // Privacy and data
  updatePrivacy: (updates: Partial<PrivacySettings>) => Promise<boolean>
  requestDataExport: (format: ExportFormat, dataTypes: string[]) => Promise<string>
  deleteAccount: (reason: string, exportData: boolean) => Promise<boolean>
  
  // Utilities
  refresh: () => Promise<void>
  clearError: () => void
}