/**
 * React component prop interfaces
 * 
 * Generated: 2025-08-29T00:52:22.207Z
 * Consolidated from: 103 UI interface(s)
 * Source files: account.ts, achievements.ts, customPuzzles.ts, detailedStats.ts, endgameLibrary.ts, gameReview.ts, helpCenter.ts, learningPath.ts, masterGames.ts, notifications.ts, openingExplorer.ts, openingPuzzles.ts, playComputer.ts, preferences.ts, profile.ts, progressOverview.ts, puzzleSelection.ts, studyPlans.ts, tutorials.ts
 */

// From: /mnt/c/Projects/chess-training/frontend/src/types/account.ts
export interface ProfileEditorProps {
  profile: UserProfile; // Current user profile
  onProfileUpdate: (updates: Partial<UserProfile>) => void; // Callback when profile is updated
  isLoading: boolean; // Loading state
  error: string | null; // Error message
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/account.ts
export interface SecuritySettingsProps {
  security: SecuritySettings; // Current security settings
  onSecurityUpdate: (updates: Partial<SecuritySettings>) => void; // Callback when settings are updated
  onPasswordChange: (currentPassword: string, newPassword: string) => Promise<boolean>; // Password change handler
  onTwoFactorSetup: (method: TwoFactorMethod) => Promise<{ secret: string; qrCode: string }>; // 2FA setup handler
  isLoading: boolean; // Loading state
  error: string | null; // Error message
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/account.ts
export interface SubscriptionManagementProps {
  subscription: SubscriptionInfo; // Current subscription info
  availableTiers: {
    tier: SubscriptionTier
    name: string
    price: number
    features: string[]
    popular?: boolean
  }[]; // Available subscription tiers
  onUpgrade: (tier: SubscriptionTier, cycle: 'monthly' | 'yearly') => Promise<void>; // Upgrade handler
  onCancel: () => Promise<void>; // Cancel subscription handler
  onUpdatePayment: (method: any) => Promise<void>; // Update payment method handler
  isLoading: boolean; // Loading state
  error: string | null; // Error message
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/account.ts
export interface DataManagementProps {
  privacy: PrivacySettings; // Current privacy settings
  dataExports: DataExportRequest[]; // Data export requests
  deletionRequest?: AccountDeletionRequest; // Account deletion request
  onPrivacyUpdate: (updates: Partial<PrivacySettings>) => void; // Privacy settings update handler
  onExportRequest: (format: ExportFormat, dataTypes: string[]) => Promise<void>; // Data export request handler
  onDeleteAccount: (reason: string, exportData: boolean) => Promise<void>; // Account deletion handler
  isLoading: boolean; // Loading state
  error: string | null; // Error message
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/account.ts
export interface ConnectedServicesProps {
  services: ConnectedService[]; // List of connected services
  availableProviders: ServiceProvider[]; // Available service providers
  onConnect: (provider: ServiceProvider) => Promise<void>; // Connect service handler
  onDisconnect: (provider: ServiceProvider) => Promise<void>; // Disconnect service handler
  onSync: (provider: ServiceProvider) => Promise<void>; // Sync service handler
  isLoading: boolean; // Loading state
  error: string | null; // Error message
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/account.ts
export interface LoginHistoryProps {
  sessions: LoginSession[]; // Login session history
  onTerminateSession: (sessionId: string) => Promise<void>; // Terminate session handler
  onTerminateAllSessions: () => Promise<void>; // Terminate all sessions handler
  isLoading: boolean; // Loading state
  error: string | null; // Error message
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/achievements.ts
export interface AchievementCardProps {
  achievement: Achievement; // Achievement to display
  showProgress?: boolean; // Whether to show progress bar
  showDetails?: boolean; // Whether to show detailed info
  onClick?: (achievement: Achievement) => void; // Click handler
  theme: any; // Theme from store
  size?: 'small' | 'medium' | 'large'; // Size variant
  variant?: 'card' | 'list' | 'compact'; // Layout variant
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/achievements.ts
export interface AchievementGridProps {
  achievements: Achievement[]; // Achievements to display
  isLoading: boolean; // Loading state
  filters: AchievementFilters; // Current filters
  onFiltersChange: (filters: AchievementFilters) => void; // Filter change handler
  onAchievementClick: (achievement: Achievement) => void; // Achievement click handler
  theme: any; // Theme from store
  columns?: number; // Grid columns
  showEmptyState?: boolean; // Show empty state
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/achievements.ts
export interface AchievementDetailsProps {
  achievement: Achievement | null; // Achievement to show details for
  isOpen: boolean; // Whether modal is open
  onClose: () => void; // Close handler
  onShare?: (achievement: Achievement) => void; // Share handler
  theme: any; // Theme from store
  seriesAchievements?: Achievement[]; // Related achievements in same series
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/achievements.ts
export interface AchievementFiltersProps {
  filters: AchievementFilters; // Current filters
  onFiltersChange: (filters: AchievementFilters) => void; // Filter change handler
  availableCategories: AchievementCategory[]; // Available filter options
  availableRarities: AchievementRarity[];
  theme: any; // Theme from store
  isCollapsed?: boolean; // Whether filters are collapsed
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/achievements.ts
export interface AchievementStatsProps {
  stats: AchievementStats; // Achievement statistics
  theme: any; // Theme from store
  showDetails?: boolean; // Show detailed breakdown
  comparisonStats?: AchievementStats; // Comparison data (for before/after)
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/achievements.ts
export interface ProgressTrackerProps_achievements {
  progress: number; // Current progress value
  target: number; // Maximum/target value
  label: string; // Progress label
  theme: any; // Theme from store
  size?: 'small' | 'medium' | 'large'; // Size variant
  showPercentage?: boolean; // Show percentage
  animated?: boolean; // Animated progress
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/achievements.ts
export interface BadgeDetailsProps {
  achievement: Achievement; // Badge/achievement to display
  size: 'small' | 'medium' | 'large' | 'hero'; // Display size
  showEffects?: boolean; // Whether to show shine/glow effect
  theme: any; // Theme from store
  onClick?: () => void; // Click handler
  isNew?: boolean; // Whether badge is newly earned
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/customPuzzles.ts
export interface CustomPuzzleControlsProps {
  currentPuzzleIndex: number; // Current puzzle index
  totalPuzzles: number; // Total number of puzzles
  canGoPrevious: boolean; // Whether previous button should be disabled
  canGoNext: boolean; // Whether next button should be disabled
  onPrevious: () => void; // Callback for going to previous puzzle
  onNext: () => void; // Callback for going to next puzzle
  onReset: () => void; // Callback for resetting current puzzle
  onSkip: () => void; // Callback for skipping current puzzle
  onBookmark: () => void; // Callback for bookmarking current puzzle
  onShare: () => void; // Callback for sharing current puzzle
  isBookmarked: boolean; // Whether current puzzle is bookmarked
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/customPuzzles.ts
export interface CustomPuzzleInfoProps {
  puzzle: CustomPuzzle; // The current puzzle
  session: CustomPuzzleSession; // Current puzzle session state
  onRequestHint: () => void; // Callback for requesting a hint
  getCurrentHint: () => string; // Function to get the current hint text
  formatTime: (seconds: number) => string; // Function to format time display
  onEdit?: () => void; // Callback for editing puzzle (if user is author)
  onDelete?: () => void; // Callback for deleting puzzle (if user is author)
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/customPuzzles.ts
export interface CustomPuzzleCollectionBrowserProps {
  collections: CustomPuzzleCollection[]; // Available collections
  userCollections: CustomPuzzleCollection[]; // Current user's collections
  onSelectCollection: (collection: CustomPuzzleCollection) => void; // Callback for selecting a collection
  onCreateCollection: () => void; // Callback for creating new collection
  onImportCollection: () => void; // Callback for importing collection
  theme: any; // Current theme
  isLoading: boolean; // Loading state
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/customPuzzles.ts
export interface PuzzleImportExportProps {
  onImportPGN: (file: File) => void; // Callback for importing PGN file
  onImportFromURL: (url: string) => void; // Callback for importing from URL
  onExportCollection: (collectionId: string, format: 'pgn' | 'json') => void; // Callback for exporting collection
  theme: any; // Current theme
  importProgress?: {
    current: number
    total: number
    status: 'processing' | 'complete' | 'error'
  }; // Import progress
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/customPuzzles.ts
export interface PuzzleSharingProps {
  puzzle: CustomPuzzle; // Current puzzle to share
  onGenerateShareLink: () => string; // Callback for generating share link
  onCopyToClipboard: (text: string) => void; // Callback for copying to clipboard
  onShareToSocial: (platform: 'twitter' | 'discord' | 'reddit') => void; // Callback for sharing to social media
  theme: any; // Current theme
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/detailedStats.ts
export interface PerformanceMetricsProps {
  metrics: PerformanceMetrics;
  isLoading: boolean;
  timePeriod: AnalyticsTimePeriod;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/detailedStats.ts
export interface TrendAnalysisProps {
  trends: TrendAnalysis;
  isLoading: boolean;
  timePeriod: AnalyticsTimePeriod;
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/detailedStats.ts
export interface WeaknessAnalysisProps {
  weaknesses: WeaknessAnalysis;
  isLoading: boolean;
  onRecommendationClick: (recommendation: any) => void;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/detailedStats.ts
export interface PositionHeatMapProps {
  heatMaps: PositionHeatMaps;
  selectedMap: keyof PositionHeatMaps;
  onMapChange: (map: keyof PositionHeatMaps) => void;
  isLoading: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/detailedStats.ts
export interface ComparativeAnalysisProps {
  comparative: ComparativeAnalysis;
  isLoading: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/detailedStats.ts
export interface GamePhaseAnalysisProps {
  gamePhases: GamePhaseAnalysis;
  selectedPhase: GamePhase;
  onPhaseChange: (phase: GamePhase) => void;
  isLoading: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/endgameLibrary.ts
export interface EndgameCategoriesProps {
  categories: EndgameCategoryInfo[]; // Available categories
  selectedCategory: EndgameCategory | null; // Currently selected category
  onCategorySelect: (category: EndgameCategory) => void; // Callback when category is selected
  searchFilter: string; // Search filter text
  onSearchChange: (search: string) => void; // Callback when search changes
  progress: Record<EndgameCategory, number>; // Player's progress data
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/endgameLibrary.ts
export interface PositionViewerProps {
  position: EndgamePosition; // Current position
  currentFen?: string; // Current board FEN
  allowMoves?: boolean; // Whether pieces are draggable
  onMove?: (from: string, to: string) => void; // Callback when move is made
  highlightedSquares?: string[]; // Highlighted squares
  arrows?: Array<{
    from: string
    to: string
    color: string
  }>; // Arrow overlays
  orientation?: 'white' | 'black'; // Board orientation
  showCoordinates?: boolean; // Whether to show coordinates
  size?: number; // Board size
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/endgameLibrary.ts
export interface TablebaseQueryProps {
  position: string; // Current position FEN
  onQuery: (fen: string) => Promise<TablebaseQueryResult>; // Callback when query is made
  result: TablebaseQueryResult | null; // Current query result
  isLoading: boolean; // Whether query is loading
  history: TablebaseQueryResult[]; // Query history
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/endgameLibrary.ts
export interface EndgameAnalysisProps {
  position: EndgamePosition; // Position being analyzed
  analysis: EndgameAnalysis | null; // Current analysis data
  isAnalyzing: boolean; // Whether analysis is loading
  onAnalyze: () => void; // Callback to request analysis
  onAnalyzeVariation: (moves: string[]) => void; // Callback to analyze specific variation
  engineDepth: number; // Engine depth setting
  onDepthChange: (depth: number) => void; // Callback when depth changes
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/endgameLibrary.ts
export interface EndgamePracticeProps {
  position: EndgamePosition; // Position to practice
  session: PracticeSession | null; // Practice session state
  practiceTypes: PracticeType[]; // Available practice types
  onStartPractice: (type: PracticeType) => void; // Callback to start practice session
  onEndPractice: () => void; // Callback to end session
  onMove: (from: string, to: string) => void; // Callback when move is made
  progress: StudyProgress; // Study progress for this position
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/gameReview.ts
export interface GameSelectionProps {
  games: GameReview[]; // Available games
  selectedGame: GameReview | null; // Currently selected game
  onGameSelect: (game: GameReview) => void; // Callback when game is selected
  onImportGame: () => void; // Callback to import new game
  searchQuery: string; // Search and filter options
  onSearchChange: (query: string) => void;
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/gameReview.ts
export interface MoveAnalysisProps {
  currentMove: AnalyzedMove | null; // Current move being analyzed
  allMoves: AnalyzedMove[]; // All moves in the game
  currentIndex: number; // Current move index
  onMoveSelect: (index: number) => void; // Callback to navigate to move
  showEngineLines: boolean; // Whether to show engine lines
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/gameReview.ts
export interface EngineEvaluationProps {
  evaluation: number; // Current position evaluation
  bestMoves: {
    move: string
    evaluation: number
    line: string[]
  }[]; // Best moves with evaluations
  moveClassification?: MoveClassification; // Current move classification
  isAnalyzing: boolean; // Whether engine is analyzing
  depth: number; // Analysis depth
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/gameReview.ts
export interface GameStatisticsProps {
  performance: PerformanceMetrics; // Performance metrics
  timeAnalysis: TimeAnalysis; // Time analysis
  keyPositions: GameReview['keyPositions']; // Key positions
  playerColor: 'white' | 'black'; // Player color being analyzed
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/helpCenter.ts
export interface SearchInterfaceProps {
  query: string; // Current search query
  results: SearchResult[]; // Search results
  filters: SearchFilters; // Current filters
  isLoading: boolean; // Whether search is loading
  suggestions: string[]; // Search suggestions
  onQueryChange: (query: string) => void; // Callback for search query change
  onFiltersChange: (filters: Partial<SearchFilters>) => void; // Callback for filter change
  onSuggestionSelect: (suggestion: string) => void; // Callback for search suggestion selection
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/helpCenter.ts
export interface CategoryBrowserProps {
  categories: CategoryInfo[]; // Available categories
  selectedCategory: HelpCategory | null; // Currently selected category
  onCategorySelect: (category: HelpCategory) => void; // Callback when category is selected
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/helpCenter.ts
export interface ArticleViewerProps {
  article: HelpArticle | null; // Article to display
  isLoading: boolean; // Whether article is loading
  userProgress: UserProgress; // User progress data
  relatedArticles: HelpArticle[]; // Related articles
  onArticleNavigate: (articleId: string) => void; // Callback for article navigation
  onFeedbackSubmit: (articleId: string, feedback: FeedbackType) => void; // Callback for feedback submission
  onBookmarkToggle: (articleId: string) => void; // Callback for bookmark toggle
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/helpCenter.ts
export interface FAQSectionProps {
  faqs: FAQItem[]; // FAQ items to display
  searchQuery?: string; // Current search query for highlighting
  categoryFilter: HelpCategory | 'all'; // Selected category filter
  onCategoryFilterChange: (category: HelpCategory | 'all') => void; // Callback for category filter change
  onFAQVote: (faqId: string, helpful: boolean) => void; // Callback for FAQ item vote
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/helpCenter.ts
export interface TutorialBrowserProps {
  tutorials: Tutorial[]; // Available tutorials
  userProgress: UserProgress; // User progress
  filter: {
    category: HelpCategory | 'all'
    difficulty: ArticleDifficulty | 'all'
    completedOnly: boolean
  }; // Current filter
  onFilterChange: (filter: any) => void; // Callback for filter change
  onTutorialStart: (tutorialId: string) => void; // Callback to start tutorial
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/learningPath.ts
export interface SkillTreeProps {
  skillTree: PersonalizedLearningPath['skillTree']; // Skill tree data
  selectedSkill: SkillNode | null; // Selected skill node
  onSkillSelect: (skill: SkillNode) => void; // Callback when skill is selected
  onSkillFocus: (skillId: string) => void; // Callback when skill is focused for study
  viewMode: 'overview' | 'category' | 'progress' | 'recommendations'; // View mode
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/learningPath.ts
export interface PathViewerProps {
  learningPath: PersonalizedLearningPath; // Learning path data
  currentView: 'tree' | 'timeline' | 'analytics' | 'planning'; // Current view
  onViewChange: (view: 'tree' | 'timeline' | 'analytics' | 'planning') => void; // Callback when view changes
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/learningPath.ts
export interface RecommendationEngineProps {
  recommendations: LearningRecommendation[]; // Learning recommendations
  weakAreas: WeakArea[]; // Weak areas
  onRecommendationAccept: (recommendationId: string) => void; // Callback when recommendation is accepted
  onRecommendationDismiss: (recommendationId: string) => void; // Callback when recommendation is dismissed
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/learningPath.ts
export interface LearningAnalyticsProps {
  analytics: LearningAnalytics; // Analytics data
  selectedPeriod: 'day' | 'week' | 'month' | 'quarter' | 'year'; // Time period selection
  onPeriodChange: (period: string) => void; // Callback when period changes
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/learningPath.ts
export interface StudyPlannerProps {
  plannedSessions: StudySessionPlan[]; // Planned study sessions
  objectives: LearningObjective[]; // Learning objectives
  onSessionSchedule: (session: StudySessionPlan) => void; // Callback when session is scheduled
  onSessionModify: (sessionId: string, changes: Partial<StudySessionPlan>) => void; // Callback when session is modified
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/learningPath.ts
export interface MilestoneTrackerProps {
  milestones: LearningMilestone[]; // Learning milestones
  recentAchievements: LearningMilestone[]; // Recent achievements
  onMilestoneCelebrate: (milestoneId: string) => void; // Callback when milestone is celebrated
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/masterGames.ts
export interface GameLibraryProps {
  games: MasterGame[]; // Available games
  filters: GameFilters; // Current filter settings
  isLoading: boolean; // Loading state
  selectedGameId?: string; // Selected game ID
  onGameSelect: (game: MasterGame) => void; // Callback when game is selected
  onFiltersChange: (filters: Partial<GameFilters>) => void; // Callback when filters change
  onBookmarkToggle: (gameId: string) => void; // Callback when game is bookmarked
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/masterGames.ts
export interface GameViewerProps {
  game: MasterGame | null; // Game to display
  currentMove: number; // Current move position
  isPlaying: boolean; // Whether game is auto-playing
  playbackSpeed: number; // Playback speed (moves per second)
  showCoordinates: boolean; // Whether to show coordinates
  showLastMove: boolean; // Whether to show last move highlight
  orientation: PlayerColor; // Board orientation
  onMoveChange: (moveNumber: number) => void; // Callback when move position changes
  onPlayToggle: () => void; // Callback when play/pause toggled
  onSpeedChange: (speed: number) => void; // Callback when playback speed changes
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/masterGames.ts
export interface MasterAnalysisProps {
  game: MasterGame | null; // Game being analyzed
  currentMove: number; // Current move position
  mode: 'annotations' | 'analysis' | 'database' | 'themes'; // Analysis mode
  onModeChange: (mode: MasterAnalysisProps['mode']) => void; // Callback when mode changes
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/masterGames.ts
export interface PlayerProfileProps {
  player: MasterProfile; // Player to display
  isLoading: boolean; // Loading state
  onViewGames: (playerId: string) => void; // Callback when player's games are requested
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationCenterProps {
  notifications: NotificationInstance[]; // Recent notifications
  showUnreadOnly: boolean; // Whether to show all or just unread
  onNotificationClick: (notification: NotificationInstance) => void; // Callback when notification is clicked
  onNotificationDismiss: (notificationId: string) => void; // Callback when notification is dismissed
  onMarkAllRead: () => void; // Callback when all notifications are marked as read
  onArchiveNotification: (notificationId: string) => void; // Callback when notification is archived
  isLoading: boolean; // Loading state
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface AlertSettingsProps {
  channelSettings: NotificationChannelSettings[]; // Channel settings
  onChannelSettingsChange: (settings: NotificationChannelSettings[]) => void; // Callback when channel settings change
  availableSounds: { value: NotificationSoundType; label: string }[]; // Available sound options
  onPreviewSound: (sound: NotificationSoundType) => void; // Callback to preview sound
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface ChannelSettingsProps {
  channel: NotificationChannelSettings; // Individual channel configuration
  onChange: (channel: NotificationChannelSettings) => void; // Callback when settings change
  isAvailable: boolean; // Whether this channel is available
  capabilities: string[]; // Channel capability description
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface EventSettingsProps {
  eventSettings: NotificationEventSettings[]; // Event settings list
  onEventSettingsChange: (settings: NotificationEventSettings[]) => void; // Callback when event settings change
  availableChannels: NotificationChannel[]; // Available channels
  groupByCategory: boolean; // Grouping by category
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface QuietHoursProps {
  quietHours: QuietHoursPeriod; // Quiet hours configuration
  doNotDisturb: NotificationSettings['doNotDisturb']; // Do not disturb settings
  onQuietHoursChange: (quietHours: QuietHoursPeriod) => void; // Callback when quiet hours change
  onDoNotDisturbChange: (dnd: NotificationSettings['doNotDisturb']) => void; // Callback when DND changes
  availableExceptions: NotificationEventType[]; // Available exception events
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationRulesProps {
  rules: NotificationRule[]; // Custom rules
  onRulesChange: (rules: NotificationRule[]) => void; // Callback when rules change
  onTestRule: (ruleId: string) => void; // Callback to test a rule
  availableFields: string[]; // Available fields for conditions
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationTestingProps {
  tests: NotificationTest[]; // Available tests
  onRunTest: (test: NotificationTest) => Promise<void>; // Callback to run a test
  testResults: Record<string, {
    success: boolean
    message: string
    timestamp: number
  }>; // Test results
  isRunningTest: string | null; // Loading state
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/notifications.ts
export interface NotificationHistoryProps {
  notifications: NotificationInstance[]; // Historical notifications
  currentPage: number; // Current page
  totalPages: number; // Total pages
  itemsPerPage: number; // Items per page
  onPageChange: (page: number) => void; // Callback for page change
  onBulkAction: (action: 'read' | 'archive' | 'delete', notificationIds: string[]) => void; // Callback for bulk actions
  filters: {
    channel?: NotificationChannel
    eventType?: NotificationEventType
    priority?: NotificationPriority
    status?: NotificationStatus
    dateRange?: {
      start: number
      end: number
    }
  }; // Filter settings
  onFiltersChange: (filters: NotificationHistoryProps['filters']) => void; // Callback when filters change
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingExplorer.ts
export interface OpeningSearchProps {
  filters: OpeningFilters; // Current search filters
  onFiltersChange: (filters: Partial<OpeningFilters>) => void; // Callback when filters change
  results: SearchResults | null; // Search results
  isLoading: boolean; // Loading state
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingExplorer.ts
export interface VariationTreeProps {
  currentPosition: string; // Current position
  variations: MoveVariation[]; // Available variations
  onVariationSelect: (variation: MoveVariation) => void; // Callback when variation is selected
  expandedNodes: Set<string>; // Expanded nodes
  onNodeToggle: (nodeId: string) => void; // Callback when node expansion changes
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingExplorer.ts
export interface MasterGamesProps {
  opening: ChessOpening; // Opening being viewed
  games: MasterGame[]; // Available games
  onGameSelect: (game: MasterGame) => void; // Callback when game is selected for study
  isLoading: boolean; // Loading state
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingExplorer.ts
export interface OpeningAnalysisProps {
  position: string; // Current position
  analysis: PositionAnalysis | null; // Analysis data
  isAnalyzing: boolean; // Loading state
  onAnalyze: () => void; // Callback to request analysis
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingExplorer.ts
export interface OpeningInfoProps {
  opening: ChessOpening; // Opening data
  currentPosition: string; // Current position
  moveSequence: string[]; // Move sequence
  activeTab: ExplorerTab; // Active tab
  onTabChange: (tab: ExplorerTab) => void; // Callback when tab changes
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingPuzzles.ts
export interface PuzzleControlsProps {
  currentPuzzleIndex: number; // Current puzzle index
  totalPuzzles: number; // Total number of puzzles
  canGoPrevious: boolean; // Whether previous button should be disabled
  canGoNext: boolean; // Whether next button should be disabled
  onPrevious: () => void; // Callback for going to previous puzzle
  onNext: () => void; // Callback for going to next puzzle
  onReset: () => void; // Callback for resetting current puzzle
  onSkip: () => void; // Callback for skipping current puzzle
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingPuzzles.ts
export interface PuzzleInfoProps {
  puzzle: OpeningPuzzle; // The current puzzle
  session: PuzzleSession; // Current puzzle session state
  onRequestHint: () => void; // Callback for requesting a hint
  getCurrentHint: () => string; // Function to get the current hint text
  formatTime: (seconds: number) => string; // Function to format time display
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingPuzzles.ts
export interface PuzzleTabsProps {
  puzzle: OpeningPuzzle; // The current puzzle
  theme: any; // Current theme from theme store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingPuzzles.ts
export interface PuzzleProgressProps {
  currentPuzzleIndex: number; // Current puzzle index
  totalPuzzles: number; // Total number of puzzles
  theme: any; // Current theme
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/playComputer.ts
export interface OpponentSelectorProps {
  opponents: AIOpponent[]; // Available AI opponents
  selectedOpponent: AIOpponent | null; // Currently selected opponent
  onOpponentSelect: (opponent: AIOpponent) => void; // Callback when opponent is selected
  playerRating: number; // Player's current rating
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/playComputer.ts
export interface GameSetupProps {
  setup: Partial<GameSetup>; // Current game setup
  onSetupChange: (setup: Partial<GameSetup>) => void; // Callback when setup changes
  onStartGame: () => void; // Callback to start game
  isValidSetup: boolean; // Whether setup is valid
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/playComputer.ts
export interface MoveHistoryProps {
  moves: ChessMove[]; // Game moves
  currentMoveIndex: number; // Current move index being viewed
  onMoveSelect: (moveIndex: number) => void; // Callback when move is selected for review
  showEvaluations: boolean; // Whether to show move evaluations
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/playComputer.ts
export interface GameAnalysisProps {
  gameState: GameState; // Current game state
  analysis: GameAnalysis | null; // Game analysis data
  isAnalyzing: boolean; // Whether analysis is loading
  onAnalyze: () => void; // Callback to request analysis
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface GeneralSettingsProps {
  preferences: GeneralPreferences;
  onUpdate: (preferences: Partial<GeneralPreferences>) => void;
  isLoading?: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface LanguageSettingsProps {
  preferences: LanguagePreferences;
  onUpdate: (preferences: Partial<LanguagePreferences>) => void;
  isLoading?: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface AccessibilitySettingsProps {
  preferences: AccessibilityPreferences;
  onUpdate: (preferences: Partial<AccessibilityPreferences>) => void;
  isLoading?: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface PerformanceSettingsProps {
  preferences: PerformancePreferences;
  onUpdate: (preferences: Partial<PerformancePreferences>) => void;
  isLoading?: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface PrivacySettingsProps {
  preferences: PrivacyPreferences;
  onUpdate: (preferences: Partial<PrivacyPreferences>) => void;
  isLoading?: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface ImportExportSettingsProps {
  preferences: ImportExportPreferences;
  onUpdate: (preferences: Partial<ImportExportPreferences>) => void;
  onExport: (format: 'json' | 'csv') => Promise<void>;
  onImport: (data: string | File) => Promise<void>;
  isLoading?: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface BackupSyncSettingsProps {
  preferences: BackupSyncPreferences;
  onUpdate: (preferences: Partial<BackupSyncPreferences>) => void;
  isLoading?: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface GamingSettingsProps {
  preferences: GamingPreferences;
  onUpdate: (preferences: Partial<GamingPreferences>) => void;
  isLoading?: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/preferences.ts
export interface SoundAnimationSettingsProps {
  preferences: SoundAnimationPreferences;
  onUpdate: (preferences: Partial<SoundAnimationPreferences>) => void;
  isLoading?: boolean;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/profile.ts
export interface ProfileHeaderProps {
  userStats: ProfileUser;
  onEditProfile: () => void;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/profile.ts
export interface ProfileTabsProps {
  selectedTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/profile.ts
export interface ProfileOverviewProps {
  userStats: ProfileUser;
  quickActions: QuickAction[];
  onQuickAction: (link: string) => void;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/profile.ts
export interface ProfileAchievementsProps {
  achievements: Achievement[];
  getRarityColor: (rarity: string) => string;
  calculateProgress: (achievement: Achievement) => number;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/profile.ts
export interface ProfileActivityProps {
  recentActivity: RecentActivity[];
  getActivityIcon: (type: string) => string;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/profile.ts
export interface StatsGridProps {
  userStats: ProfileUser;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface StatsCardsProps {
  stats: StatCard[]; // Statistics data
  isLoading?: boolean; // Loading state
  timePeriod: TimePeriod; // Selected time period
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface ProgressChartsProps {
  ratingHistory: RatingDataPoint[]; // Rating history data
  activityData: ActivityDataPoint[]; // Activity data
  isLoading?: boolean; // Loading state
  timePeriod: TimePeriod; // Selected time period
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface ActivityFeedProps {
  sessions: TrainingSession[]; // Training sessions
  isLoading?: boolean; // Loading state
  maxSessions?: number; // Max sessions to display
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface AchievementSectionProps {
  achievements: Achievement[]; // Achievements data
  isLoading?: boolean; // Loading state
  maxAchievements?: number; // Max achievements to display
  showProgress?: boolean; // Show progress bars
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface QuickActionsProps {
  actions: QuickAction[]; // Quick action items
  isLoading?: boolean; // Loading state
  maxActions?: number; // Max actions to display
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/puzzleSelection.ts
export interface CategoryCardProps {
  category: PuzzleCategory;
  onClick: (route: string) => void;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/puzzleSelection.ts
export interface StatsCardProps {
  stats: PuzzleStats;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/puzzleSelection.ts
export interface RecentPuzzlesProps {
  puzzles: RecentPuzzle[];
  onPuzzleClick: (puzzle: RecentPuzzle) => void;
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/puzzleSelection.ts
export interface AchievementShowcaseProps {
  achievements: Achievement[];
  theme: any;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/studyPlans.ts
export interface PlanOverviewProps {
  learningPaths: LearningPath[]; // Available learning paths
  progress: StudyProgress; // User's progress data
  selectedPath: LearningPath | null; // Selected path
  onPathSelect: (path: LearningPath) => void; // Callback when path is selected
  onEnroll: (pathId: string) => void; // Callback when enrolling in path
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/studyPlans.ts
export interface LessonViewerProps {
  lesson: StudyLesson | null; // Current lesson
  onLessonComplete: (lessonId: string, score: number) => void; // Callback when lesson is completed
  onNextLesson: () => void; // Callback when navigating to next lesson
  onPrevLesson: () => void; // Callback when navigating to previous lesson
  isLoading: boolean; // Whether lesson is loading
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/studyPlans.ts
export interface ProgressTrackerProps_studyPlans {
  progress: StudyProgress; // User's study progress
  currentPath: LearningPath | null; // Current learning path
  goals: {
    dailyTime: number
    weeklyTime: number
    monthlyGoals: string[]
  }; // Study goals
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/studyPlans.ts
export interface StudySchedulerProps {
  schedule: StudySchedule | null; // Current schedule
  onScheduleUpdate: (schedule: StudySchedule) => void; // Callback when schedule is updated
  recommendations: StudyRecommendation[]; // Study recommendations
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/studyPlans.ts
export interface AchievementBadgesProps {
  badges: AchievementBadge[]; // All available badges
  recentBadges: AchievementBadge[]; // Recently earned badges
  badgeProgress: Record<string, number>; // User's current progress toward badges
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/tutorials.ts
export interface TutorialLauncherProps {
  tutorials: Tutorial[]; // Available tutorials
  progress: Record<string, TutorialProgress>; // User's tutorial progress
  filters: TutorialFilters; // Current filters
  sortOptions: TutorialSortOptions; // Current sort options
  onLaunchTutorial: (tutorialId: string) => void; // Callback when tutorial is launched
  onFiltersChange: (filters: TutorialFilters) => void; // Callback when filters change
  onSortChange: (sortOptions: TutorialSortOptions) => void; // Callback when sort options change
  isLoading: boolean; // Whether tutorials are loading
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/tutorials.ts
export interface InteractiveGuideProps {
  tutorial: Tutorial; // Current tutorial
  progress: TutorialProgress; // User's progress on this tutorial
  currentStep: number; // Current step index
  onStepComplete: (stepIndex: number) => void; // Callback when step is completed
  onStepSkip: (stepIndex: number) => void; // Callback when step is skipped
  onTutorialComplete: (rating?: TutorialRating, feedback?: string) => void; // Callback when tutorial is completed
  onPause: () => void; // Callback when tutorial is paused
  onResume: () => void; // Callback when tutorial is resumed
  onRestart: () => void; // Callback when tutorial is restarted
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/tutorials.ts
export interface ProgressTrackerProps_tutorials {
  statistics: TutorialStatistics; // Tutorial statistics
  achievements: TutorialAchievement[]; // Available achievements
  recentProgress: TutorialProgress[]; // Recent progress data
  learningGoals?: {
    dailyTarget: number
    weeklyTarget: number
    currentStreak: number
    bestStreak: number
  }; // Learning goals
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/tutorials.ts
export interface VideoPlayerProps {
  video: VideoTutorial; // Video tutorial data
  currentTime: number; // Current playback time
  playerState: VideoPlayerState; // Player state
  onTimeUpdate: (time: number) => void; // Callback when time updates
  onStateChange: (state: VideoPlayerState) => void; // Callback when state changes
  onChapterSelect: (chapterIndex: number) => void; // Callback when chapter is selected
  onInteractionTrigger: (interaction: any) => void; // Callback when interaction is triggered
  showControls: boolean; // Whether controls are visible
  theme: any; // Theme from store
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/tutorials.ts
export interface TutorialFeedbackProps {
  tutorial: Tutorial; // Tutorial being rated
  currentRating?: TutorialRating; // Current user rating
  currentFeedback?: string; // Current user feedback
  onSubmitRating: (rating: TutorialRating, feedback?: string) => void; // Callback when rating is submitted
  isSubmitting: boolean; // Whether feedback is being submitted
  theme: any; // Theme from store
}

// Consolidated ComponentProps
export const ComponentProps = {
  profileEditorProps: {} as ProfileEditorProps,
  securitySettingsProps: {} as SecuritySettingsProps,
  subscriptionManagementProps: {} as SubscriptionManagementProps,
  dataManagementProps: {} as DataManagementProps,
  connectedServicesProps: {} as ConnectedServicesProps,
  loginHistoryProps: {} as LoginHistoryProps,
  achievementCardProps: {} as AchievementCardProps,
  achievementGridProps: {} as AchievementGridProps,
  achievementDetailsProps: {} as AchievementDetailsProps,
  achievementFiltersProps: {} as AchievementFiltersProps,
  achievementStatsProps: {} as AchievementStatsProps,
  progressTrackerProps: {} as ProgressTrackerProps_achievements,
  badgeDetailsProps: {} as BadgeDetailsProps,
  customPuzzleControlsProps: {} as CustomPuzzleControlsProps,
  customPuzzleInfoProps: {} as CustomPuzzleInfoProps,
  customPuzzleCollectionBrowserProps: {} as CustomPuzzleCollectionBrowserProps,
  puzzleImportExportProps: {} as PuzzleImportExportProps,
  puzzleSharingProps: {} as PuzzleSharingProps,
  performanceMetricsProps: {} as PerformanceMetricsProps,
  trendAnalysisProps: {} as TrendAnalysisProps,
  weaknessAnalysisProps: {} as WeaknessAnalysisProps,
  positionHeatMapProps: {} as PositionHeatMapProps,
  comparativeAnalysisProps: {} as ComparativeAnalysisProps,
  gamePhaseAnalysisProps: {} as GamePhaseAnalysisProps,
  endgameCategoriesProps: {} as EndgameCategoriesProps,
  positionViewerProps: {} as PositionViewerProps,
  tablebaseQueryProps: {} as TablebaseQueryProps,
  endgameAnalysisProps: {} as EndgameAnalysisProps,
  endgamePracticeProps: {} as EndgamePracticeProps,
  gameSelectionProps: {} as GameSelectionProps,
  moveAnalysisProps: {} as MoveAnalysisProps,
  engineEvaluationProps: {} as EngineEvaluationProps,
  gameStatisticsProps: {} as GameStatisticsProps,
  searchInterfaceProps: {} as SearchInterfaceProps,
  categoryBrowserProps: {} as CategoryBrowserProps,
  articleViewerProps: {} as ArticleViewerProps,
  fAQSectionProps: {} as FAQSectionProps,
  tutorialBrowserProps: {} as TutorialBrowserProps,
  skillTreeProps: {} as SkillTreeProps,
  pathViewerProps: {} as PathViewerProps,
  recommendationEngineProps: {} as RecommendationEngineProps,
  learningAnalyticsProps: {} as LearningAnalyticsProps,
  studyPlannerProps: {} as StudyPlannerProps,
  milestoneTrackerProps: {} as MilestoneTrackerProps,
  gameLibraryProps: {} as GameLibraryProps,
  gameViewerProps: {} as GameViewerProps,
  masterAnalysisProps: {} as MasterAnalysisProps,
  playerProfileProps: {} as PlayerProfileProps,
  notificationCenterProps: {} as NotificationCenterProps,
  alertSettingsProps: {} as AlertSettingsProps,
  channelSettingsProps: {} as ChannelSettingsProps,
  eventSettingsProps: {} as EventSettingsProps,
  quietHoursProps: {} as QuietHoursProps,
  notificationRulesProps: {} as NotificationRulesProps,
  notificationTestingProps: {} as NotificationTestingProps,
  notificationHistoryProps: {} as NotificationHistoryProps,
  openingSearchProps: {} as OpeningSearchProps,
  variationTreeProps: {} as VariationTreeProps,
  masterGamesProps: {} as MasterGamesProps,
  openingAnalysisProps: {} as OpeningAnalysisProps,
  openingInfoProps: {} as OpeningInfoProps,
  puzzleControlsProps: {} as PuzzleControlsProps,
  puzzleInfoProps: {} as PuzzleInfoProps,
  puzzleTabsProps: {} as PuzzleTabsProps,
  puzzleProgressProps: {} as PuzzleProgressProps,
  opponentSelectorProps: {} as OpponentSelectorProps,
  gameSetupProps: {} as GameSetupProps,
  moveHistoryProps: {} as MoveHistoryProps,
  gameAnalysisProps: {} as GameAnalysisProps,
  generalSettingsProps: {} as GeneralSettingsProps,
  languageSettingsProps: {} as LanguageSettingsProps,
  accessibilitySettingsProps: {} as AccessibilitySettingsProps,
  performanceSettingsProps: {} as PerformanceSettingsProps,
  privacySettingsProps: {} as PrivacySettingsProps,
  importExportSettingsProps: {} as ImportExportSettingsProps,
  backupSyncSettingsProps: {} as BackupSyncSettingsProps,
  gamingSettingsProps: {} as GamingSettingsProps,
  soundAnimationSettingsProps: {} as SoundAnimationSettingsProps,
  profileHeaderProps: {} as ProfileHeaderProps,
  profileTabsProps: {} as ProfileTabsProps,
  profileOverviewProps: {} as ProfileOverviewProps,
  profileAchievementsProps: {} as ProfileAchievementsProps,
  profileActivityProps: {} as ProfileActivityProps,
  statsGridProps: {} as StatsGridProps,
  statsCardsProps: {} as StatsCardsProps,
  progressChartsProps: {} as ProgressChartsProps,
  activityFeedProps: {} as ActivityFeedProps,
  achievementSectionProps: {} as AchievementSectionProps,
  quickActionsProps: {} as QuickActionsProps,
  categoryCardProps: {} as CategoryCardProps,
  statsCardProps: {} as StatsCardProps,
  recentPuzzlesProps: {} as RecentPuzzlesProps,
  achievementShowcaseProps: {} as AchievementShowcaseProps,
  planOverviewProps: {} as PlanOverviewProps,
  lessonViewerProps: {} as LessonViewerProps,
  progressTrackerProps: {} as ProgressTrackerProps_studyPlans,
  studySchedulerProps: {} as StudySchedulerProps,
  achievementBadgesProps: {} as AchievementBadgesProps,
  tutorialLauncherProps: {} as TutorialLauncherProps,
  interactiveGuideProps: {} as InteractiveGuideProps,
  progressTrackerProps: {} as ProgressTrackerProps_tutorials,
  videoPlayerProps: {} as VideoPlayerProps,
  tutorialFeedbackProps: {} as TutorialFeedbackProps,
} as const;

// Type exports
export type ProfileEditorPropsType = ProfileEditorProps;
export type SecuritySettingsPropsType = SecuritySettingsProps;
export type SubscriptionManagementPropsType = SubscriptionManagementProps;
export type DataManagementPropsType = DataManagementProps;
export type ConnectedServicesPropsType = ConnectedServicesProps;
export type LoginHistoryPropsType = LoginHistoryProps;
export type AchievementCardPropsType = AchievementCardProps;
export type AchievementGridPropsType = AchievementGridProps;
export type AchievementDetailsPropsType = AchievementDetailsProps;
export type AchievementFiltersPropsType = AchievementFiltersProps;
export type AchievementStatsPropsType = AchievementStatsProps;
export type ProgressTrackerProps_achievementsType = ProgressTrackerProps_achievements;
export type BadgeDetailsPropsType = BadgeDetailsProps;
export type CustomPuzzleControlsPropsType = CustomPuzzleControlsProps;
export type CustomPuzzleInfoPropsType = CustomPuzzleInfoProps;
export type CustomPuzzleCollectionBrowserPropsType = CustomPuzzleCollectionBrowserProps;
export type PuzzleImportExportPropsType = PuzzleImportExportProps;
export type PuzzleSharingPropsType = PuzzleSharingProps;
export type PerformanceMetricsPropsType = PerformanceMetricsProps;
export type TrendAnalysisPropsType = TrendAnalysisProps;
export type WeaknessAnalysisPropsType = WeaknessAnalysisProps;
export type PositionHeatMapPropsType = PositionHeatMapProps;
export type ComparativeAnalysisPropsType = ComparativeAnalysisProps;
export type GamePhaseAnalysisPropsType = GamePhaseAnalysisProps;
export type EndgameCategoriesPropsType = EndgameCategoriesProps;
export type PositionViewerPropsType = PositionViewerProps;
export type TablebaseQueryPropsType = TablebaseQueryProps;
export type EndgameAnalysisPropsType = EndgameAnalysisProps;
export type EndgamePracticePropsType = EndgamePracticeProps;
export type GameSelectionPropsType = GameSelectionProps;
export type MoveAnalysisPropsType = MoveAnalysisProps;
export type EngineEvaluationPropsType = EngineEvaluationProps;
export type GameStatisticsPropsType = GameStatisticsProps;
export type SearchInterfacePropsType = SearchInterfaceProps;
export type CategoryBrowserPropsType = CategoryBrowserProps;
export type ArticleViewerPropsType = ArticleViewerProps;
export type FAQSectionPropsType = FAQSectionProps;
export type TutorialBrowserPropsType = TutorialBrowserProps;
export type SkillTreePropsType = SkillTreeProps;
export type PathViewerPropsType = PathViewerProps;
export type RecommendationEnginePropsType = RecommendationEngineProps;
export type LearningAnalyticsPropsType = LearningAnalyticsProps;
export type StudyPlannerPropsType = StudyPlannerProps;
export type MilestoneTrackerPropsType = MilestoneTrackerProps;
export type GameLibraryPropsType = GameLibraryProps;
export type GameViewerPropsType = GameViewerProps;
export type MasterAnalysisPropsType = MasterAnalysisProps;
export type PlayerProfilePropsType = PlayerProfileProps;
export type NotificationCenterPropsType = NotificationCenterProps;
export type AlertSettingsPropsType = AlertSettingsProps;
export type ChannelSettingsPropsType = ChannelSettingsProps;
export type EventSettingsPropsType = EventSettingsProps;
export type QuietHoursPropsType = QuietHoursProps;
export type NotificationRulesPropsType = NotificationRulesProps;
export type NotificationTestingPropsType = NotificationTestingProps;
export type NotificationHistoryPropsType = NotificationHistoryProps;
export type OpeningSearchPropsType = OpeningSearchProps;
export type VariationTreePropsType = VariationTreeProps;
export type MasterGamesPropsType = MasterGamesProps;
export type OpeningAnalysisPropsType = OpeningAnalysisProps;
export type OpeningInfoPropsType = OpeningInfoProps;
export type PuzzleControlsPropsType = PuzzleControlsProps;
export type PuzzleInfoPropsType = PuzzleInfoProps;
export type PuzzleTabsPropsType = PuzzleTabsProps;
export type PuzzleProgressPropsType = PuzzleProgressProps;
export type OpponentSelectorPropsType = OpponentSelectorProps;
export type GameSetupPropsType = GameSetupProps;
export type MoveHistoryPropsType = MoveHistoryProps;
export type GameAnalysisPropsType = GameAnalysisProps;
export type GeneralSettingsPropsType = GeneralSettingsProps;
export type LanguageSettingsPropsType = LanguageSettingsProps;
export type AccessibilitySettingsPropsType = AccessibilitySettingsProps;
export type PerformanceSettingsPropsType = PerformanceSettingsProps;
export type PrivacySettingsPropsType = PrivacySettingsProps;
export type ImportExportSettingsPropsType = ImportExportSettingsProps;
export type BackupSyncSettingsPropsType = BackupSyncSettingsProps;
export type GamingSettingsPropsType = GamingSettingsProps;
export type SoundAnimationSettingsPropsType = SoundAnimationSettingsProps;
export type ProfileHeaderPropsType = ProfileHeaderProps;
export type ProfileTabsPropsType = ProfileTabsProps;
export type ProfileOverviewPropsType = ProfileOverviewProps;
export type ProfileAchievementsPropsType = ProfileAchievementsProps;
export type ProfileActivityPropsType = ProfileActivityProps;
export type StatsGridPropsType = StatsGridProps;
export type StatsCardsPropsType = StatsCardsProps;
export type ProgressChartsPropsType = ProgressChartsProps;
export type ActivityFeedPropsType = ActivityFeedProps;
export type AchievementSectionPropsType = AchievementSectionProps;
export type QuickActionsPropsType = QuickActionsProps;
export type CategoryCardPropsType = CategoryCardProps;
export type StatsCardPropsType = StatsCardProps;
export type RecentPuzzlesPropsType = RecentPuzzlesProps;
export type AchievementShowcasePropsType = AchievementShowcaseProps;
export type PlanOverviewPropsType = PlanOverviewProps;
export type LessonViewerPropsType = LessonViewerProps;
export type ProgressTrackerProps_studyPlansType = ProgressTrackerProps_studyPlans;
export type StudySchedulerPropsType = StudySchedulerProps;
export type AchievementBadgesPropsType = AchievementBadgesProps;
export type TutorialLauncherPropsType = TutorialLauncherProps;
export type InteractiveGuidePropsType = InteractiveGuideProps;
export type ProgressTrackerProps_tutorialsType = ProgressTrackerProps_tutorials;
export type VideoPlayerPropsType = VideoPlayerProps;
export type TutorialFeedbackPropsType = TutorialFeedbackProps;
