/**
 * Miscellaneous UI configurations
 * 
 * Generated: 2025-08-29T00:52:22.208Z
 * Consolidated from: 62 UI interface(s)
 * Source files: importExportSources.ts, subscriptionData.ts, userProgressTracking.ts, account.ts, achievements.ts, contact.ts, detailedStats.ts, forgotPassword.ts, gameReview.ts, helpCenter.ts, learningPath.ts, masterGames.ts, openingExplorer.ts, playComputer.ts, profile.ts, progressOverview.ts, register.ts, resetPassword.ts, studyPlans.ts, tutorials.ts
 */

import React from 'react';

// From: /mnt/c/Projects/chess-training/frontend/src/data/importExportSources.ts
export interface SupportedSource {
  name: string;
  color: string;
  description: string;
  category: 'import' | 'export' | 'both';
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/subscriptionData.ts
export interface SubscriptionTier {
  tier: 'free' | 'premium' | 'pro' | 'grandmaster';
  name: string;
  price: number;
  description: string;
  popular: boolean;
  features: string[];
  limits: {
    puzzlesPerDay: number | 'unlimited'
    gamesPerMonth: number | 'unlimited'
    analysisDepth: number
    coachingSessions: number | 'unlimited'
    storageGB: number | 'unlimited'
  };
  benefits: string[];
  color: string;
  icon: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/userProgressTracking.ts
export interface UserProgressData {
  userId: string;
  currentPerformanceLevel: 'excellent' | 'good' | 'average' | 'needsWork';
  performanceValue: number;
  progressMetrics: {
    tacticalRating: number
    puzzlesSolved: number
    studyStreak: number
    totalStudyTime: number // minutes
    gamesPlayed: number
    winLossRatio: number
    averageAccuracy: number
    improvement: number // percentage change
    milestoneReached: number // percentage of current milestone
  };
  achievements: string[];
  lastActivity: string;
  progressHistory: ProgressSnapshot[];
  createdAt: string;
  updatedAt: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/data/userProgressTracking.ts
export interface ProgressSnapshot {
  date: string;
  performanceValue: number;
  tacticalRating: number;
  puzzlesSolved: number;
  studyStreak: number;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/account.ts
export interface UserProfile {
  displayName: string; // User's display name
  email: string; // Email address
  phoneNumber?: string; // Phone number (optional)
  bio: string; // Profile bio/description
  location: string; // User's location
  birthDate: string; // Birth date for age verification
  profileVisibility: PrivacyLevel; // Profile visibility setting
  avatarUrl?: string; // Avatar URL or identifier
  ratings: {
    rapid: number
    blitz: number
    bullet: number
    classical: number
    puzzle: number
  }; // User's chess ratings
  fideRating?: number; // FIDE rating if available
  timezone: string; // Preferred time zones
  language: string; // Preferred language
  title?: 'CM' | 'FM' | 'IM' | 'GM' | 'WCM' | 'WFM' | 'WIM' | 'WGM'; // User's chess title (if any)
  verificationBadges: string[]; // Verification badges earned
  socialLinks: {
    twitter?: string
    youtube?: string
    twitch?: string
    website?: string
  }; // Social links
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/account.ts
export interface DataExportRequest {
  requestId: string; // Request ID
  requestedAt: number; // Request date
  format: ExportFormat; // Export format
  dataTypes: {
    profile: boolean
    games: boolean
    puzzles: boolean
    progress: boolean
    social: boolean
    payments: boolean
  }; // Data types to include
  dateRange?: {
    start: number
    end: number
  }; // Date range filter
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'expired'; // Request status
  downloadUrl?: string; // Download URL (when ready)
  expiresAt?: number; // Expiration date
  fileSize?: number; // File size in bytes
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/achievements.ts
export interface AchievementUnlockCondition {
  type: 'rating' | 'games_played' | 'puzzles_solved' | 'study_hours' | 'streak' | 'accuracy' | 'achievement'; // Type of condition
  target: number; // Target value to reach
  current?: number; // Current progress towards target
  description: string; // Human-readable description
  requiredAchievements?: string[]; // Required achievements (for chained unlocks)
  timeFrame?: 'daily' | 'weekly' | 'monthly' | 'all_time'; // Minimum time period (for streaks)
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/achievements.ts
export interface AchievementShare {
  achievement: Achievement; // Achievement being shared
  sharedAt: Date; // Share timestamp
  message?: string; // Share message/comment
  platform: 'internal' | 'discord' | 'twitter' | 'facebook'; // Platform shared to
  reactions: number; // Reactions/likes received
  comments: string[]; // Comments received
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/contact.ts
export interface ContactState {
  formData: ContactFormData;
  errors: ContactFormErrors;
  isValid: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  supportChannels: SupportChannel[];
  contactCategories: ContactCategory[];
  systemInfo: SystemInfo;
  submissionResult: ContactSubmissionResponse | null;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/contact.ts
export interface UseContactReturn {
  formData: ContactFormData;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  supportChannels: SupportChannel[];
  contactCategories: ContactCategory[];
  systemInfo: SystemInfo;
  submissionResult: ContactSubmissionResponse | null;
  updateFormField: (field: keyof ContactFormData, value: any) => void;
  validateForm: () => boolean;
  clearForm: () => void;
  resetSubmissionState: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  getPriorityColor: (priority: string) => string;
  generateTicketId: () => string;
  handleBackToHelp: () => void;
  handleSendAnother: () => void;
  handleQuickHelpClick: (path: string) => void;
  handleChannelAction: (channelId: string) => void;
  error: string | null;
  clearError: () => void;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/detailedStats.ts
export interface OpeningRepertoire {
  repertoireStats: Record<OpeningSystem, {
    gamesPlayed: number
    winRate: number
    drawRate: number
    lossRate: number
    avgRatingOpponent: number
    performance: number
  }>; // Opening statistics by system
  topOpenings: Array<{
    name: string
    eco: string
    frequency: number
    winRate: number
    lastPlayed: string
    trend: 'improving' | 'declining' | 'stable'
  }>; // Most played openings
  preparation: {
    depthKnown: Record<string, number>
    theoryGaps: Array<{
      opening: string
      line: string
      priority: 'high' | 'medium' | 'low'
      studyTime: number
    }>
    novelties: Array<{
      position: string
      move: string
      date: string
      success: boolean
    }>
  }; // Opening preparation level
  byColor: {
    white: {
      mainSystems: string[]
      winRate: number
      avgGameLength: number
    }
    black: {
      defenses: string[]
      winRate: number
      avgGameLength: number
    }
  }; // Color-specific statistics
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/detailedStats.ts
export interface DetailedStatistics {
  userId: string; // User identification
  lastUpdated: string; // Last updated timestamp
  analysisPeriod: AnalyticsTimePeriod; // Analysis period
  performance: PerformanceMetrics; // Performance metrics
  trends: TrendAnalysis; // Trend analysis
  openings: OpeningRepertoire; // Opening repertoire
  weaknesses: WeaknessAnalysis; // Weakness analysis
  heatMaps: PositionHeatMaps; // Position heat maps
  comparative: ComparativeAnalysis; // Comparative analysis
  gamePhases: GamePhaseAnalysis; // Game phase analysis
  summary: {
    totalGames: number
    totalPuzzles: number
    studyHours: number
    ratingChange: number
    majorMilestones: Array<{
      date: string
      milestone: string
      description: string
    }>
  }; // Summary statistics
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/forgotPassword.ts
export interface UseForgotPasswordReturn {
  isLoading: boolean;
  isEmailSent: boolean;
  error: string | null;
  emailValue: string;
  register: any;
  handleSubmit: any;
  formErrors: any;
  watch: any;
  handleFormSubmit: (data: ForgotPasswordForm) => Promise<void>;
  handleSendAnotherEmail: () => void;
  handleBackToLogin: () => void;
  clearError: () => void;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/gameReview.ts
export interface AnalyzedMove {
  moveNumber: number; // Move number in the game
  color: 'white' | 'black'; // Player color making the move
  san: string; // Move in Standard Algebraic Notation
  uci: string; // Move in UCI format
  from: string; // Source and target squares
  to: string;
  piece: string; // Piece type moved
  captured?: string; // Captured piece (if any)
  promotion?: string; // Whether move is a promotion
  timeSpent: number; // Time spent on this move (seconds)
  timeRemaining: number; // Time remaining after move
  evaluationBefore: number; // Engine evaluation of the position before the move
  evaluationAfter: number; // Engine evaluation of the position after the move
  bestMove: string; // Best move according to engine
  alternativeMoves: {
    move: string
    evaluation: number
    line: string[]
  }[]; // Top 3 alternative moves
  classification: MoveClassification; // Move classification
  evaluationLoss: number; // Evaluation loss in centipawns
  phase: GamePhase; // Game phase when move was played
  positionAfter: string; // Position after this move (FEN)
  comment?: string; // Computer-generated comment
  principalVariation: string[]; // Principal variation after this move
  isCriticalPosition: boolean; // Whether position is critical
  tacticalThemes: string[]; // Tactical themes present
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/gameReview.ts
export interface GameReview {
  id: string; // Unique review identifier
  gameInfo: {
    white: string
    black: string
    whiteElo?: number
    blackElo?: number
    result: string
    date: string
    event: string
    site: string
    round?: string
    timeControl: string
    termination: string
  }; // Game metadata
  pgn: string; // Original PGN data
  source: GameSource; // Import source
  analysisConfig: {
    depth: AnalysisDepth
    engineTime: number
    multiPV: number
    includeOpeningBook: boolean
    includeTablebase: boolean
  }; // Analysis configuration used
  analysisStatus: AnalysisStatus; // Analysis status
  analysisProgress: number; // Progress percentage (0-100)
  moves: AnalyzedMove[]; // All moves with analysis
  opening: OpeningAnalysis; // Opening analysis
  endgame?: EndgameAnalysis; // Endgame analysis (if applicable)
  timeAnalysis: TimeAnalysis; // Time usage analysis
  performance: {
    white: PerformanceMetrics
    black: PerformanceMetrics
  }; // Performance metrics for both players
  keyPositions: {
    moveNumber: number
    position: string
    evaluation: number
    description: string
    type: 'Critical' | 'Turning_Point' | 'Missed_Opportunity' | 'Best_Play'
  }[]; // Key positions and critical moments
  summary: {
    gameResult: string
    gameLength: number
    gamePhases: {
      openingLength: number
      middlegameLength: number
      endgameLength: number
    }
    decisionPoints: number
    majorBlunders: number
    winner?: 'white' | 'black'
    winningMoment?: number
  }; // Overall game summary
  improvements: {
    category: 'Opening' | 'Tactics' | 'Strategy' | 'Endgame' | 'Time_Management'
    description: string
    specificMoves: number[]
    priority: 'High' | 'Medium' | 'Low'
    studyMaterial: string[]
  }[]; // Improvement suggestions
  createdAt: number; // Analysis timestamps
  analysisCompletedAt?: number;
  lastViewedAt: number;
  userNotes: {
    moveNumber: number
    note: string
    timestamp: number
  }[]; // User notes and annotations
  bookmarks: {
    moveNumber: number
    label: string
    category: string
  }[]; // Bookmarked positions
  exportSettings: {
    includeVariations: boolean
    includeComments: boolean
    includeEvaluations: boolean
    format: 'PGN' | 'PDF' | 'HTML'
  }; // Export preferences
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/gameReview.ts
export interface ReviewSession {
  currentGame: GameReview | null; // Currently reviewing game
  currentMoveIndex: number; // Current move being viewed
  boardOrientation: 'white' | 'black'; // Board orientation
  viewMode: 'Analysis' | 'Play_Through' | 'Training' | 'Compare'; // View mode
  displaySettings: {
    showCoordinates: boolean
    showMoveNumbers: boolean
    showEvaluationBar: boolean
    showBestMoves: boolean
    showArrows: boolean
    highlightLastMove: boolean
    highlightSquares: boolean
  }; // Display preferences
  filters: {
    showOnlyMistakes: boolean
    minEvaluationLoss: number
    selectedPhases: GamePhase[]
    selectedClassifications: MoveClassification[]
  }; // Filter settings
  comparisonGame?: GameReview; // Comparison game (if in compare mode)
  trainingMode: {
    hideEngine: boolean
    askForBestMove: boolean
    showHintsAfterTime: number
    quizMode: boolean
  }; // Training mode settings
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/gameReview.ts
export interface GameReviewHookReturn {
  currentGame: GameReview | null;
  reviewSession: ReviewSession;
  availableGames: GameReview[];
  gameCollections: GameCollection[];
  importState: {
    isImporting: boolean
    importProgress: number
    lastImport: GameImport | null
  };
  analysisState: {
    isAnalyzing: boolean
    analysisProgress: number
    currentAnalysis: string | null
  };
  isLoading: boolean;
  selectGame: (gameId: string) => void;
  importGame: (source: GameSource, data: string) => Promise<boolean>;
  analyzeGame: (gameId: string, config: AnalysisDepth) => Promise<void>;
  navigateToMove: (moveIndex: number) => void;
  updateDisplaySettings: (settings: Partial<ReviewSession['displaySettings']>) => void;
  updateFilters: (filters: Partial<ReviewSession['filters']>) => void;
  saveUserNote: (moveIndex: number, note: string) => void;
  bookmarkPosition: (moveIndex: number, label: string, category: string) => void;
  exportGame: (gameId: string, format: 'PGN' | 'PDF' | 'HTML') => Promise<string>;
  createCollection: (name: string, gameIds: string[]) => Promise<string>;
  deleteGame: (gameId: string) => Promise<void>;
  canNavigateBack: boolean;
  canNavigateForward: boolean;
  currentMoveIndex: number;
  totalMoves: number;
  error: string | null;
  clearError: () => void;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/helpCenter.ts
export interface HelpArticle {
  id: string; // Unique identifier
  title: string; // Article title
  description: string; // Brief description/summary
  content: string; // Full article content in markdown
  category: HelpCategory; // Article category
  contentType: ContentType; // Content type
  difficulty: ArticleDifficulty; // Difficulty level
  tags: string[]; // Tags for improved searchability
  readingTime: number; // Estimated reading time in minutes
  author: {
    name: string
    role: string
    avatar?: string
  }; // Author information
  metadata: {
    createdAt: number
    updatedAt: number
    version: string
    views: number
    helpfulVotes: number
    totalVotes: number
  }; // Article metadata
  relatedArticles: string[]; // Related articles
  prerequisites?: string[]; // Prerequisites (other article IDs)
  isFeatured: boolean; // Whether article is featured
  isTrending: boolean; // Whether article is trending
  videoUrl?: string; // Video URL if content includes video
  videoThumbnail?: string; // Video thumbnail URL
  videoDuration?: number; // Video duration in seconds
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/helpCenter.ts
export interface Tutorial_helpCenter {
  id: string; // Unique identifier
  title: string; // Tutorial title
  description: string; // Brief description
  category: HelpCategory; // Category
  difficulty: ArticleDifficulty; // Difficulty level
  steps: TutorialStep[]; // Tutorial steps
  estimatedTime: number; // Estimated completion time
  prerequisites?: string[]; // Prerequisites
  rewards?: {
    points: number
    badges: string[]
    achievements: string[]
  }; // Completion rewards
  metadata: {
    createdAt: number
    updatedAt: number
    completions: number
    averageRating: number
    totalRatings: number
  }; // Tutorial metadata
  isInteractive: boolean; // Whether tutorial is interactive
  thumbnail: string; // Thumbnail image
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/helpCenter.ts
export interface CategoryInfo {
  id: HelpCategory; // Category ID
  name: string; // Display name
  description: string; // Category description
  icon: string; // Category icon (Phosphor icon name)
  color: string; // Category color theme
  articleCount: number; // Number of articles in category
  featuredArticles: string[]; // Featured articles in this category
  isPopular: boolean; // Whether category is popular
  subcategories?: {
    id: string
    name: string
    count: number
  }[]; // Subcategories if applicable
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/helpCenter.ts
export interface HelpCenterHookReturn {
  articles: HelpArticle[];
  faqs: FAQItem[];
  tutorials: Tutorial[];
  categories: CategoryInfo[];
  config: HelpCenterConfig;
  currentArticle: HelpArticle | null;
  searchResults: SearchResult[];
  searchQuery: string;
  searchFilters: SearchFilters;
  userProgress: UserProgress;
  isLoading: boolean;
  isSearching: boolean;
  selectedCategory: HelpCategory | null;
  showSearchFilters: boolean;
  performSearch: (query: string, filters?: Partial<SearchFilters>) => Promise<void>;
  clearSearch: () => void;
  updateFilters: (filters: Partial<SearchFilters>) => void;
  getSuggestions: (query: string) => string[];
  navigateToArticle: (articleId: string) => void;
  navigateToCategory: (category: HelpCategory) => void;
  goBack: () => void;
  submitFeedback: (contentId: string, feedback: FeedbackType) => void;
  toggleBookmark: (contentId: string) => void;
  markAsRead: (contentId: string) => void;
  startTutorial: (tutorialId: string) => void;
  getFeaturedContent: () => (HelpArticle | Tutorial)[];
  getPopularContent: () => (HelpArticle | Tutorial)[];
  getRelatedContent: (contentId: string) => (HelpArticle | Tutorial)[];
  getCategoryContent: (category: HelpCategory) => (HelpArticle | Tutorial)[];
  trackPageView: (contentId: string) => void;
  trackSearch: (query: string) => void;
  trackUserAction: (action: string, contentId?: string) => void;
  error: string | null;
  handleViewChange: (view: string) => void;
  handleSearch: (query: string) => void;
  handleCategorySelect: (category: HelpCategory) => void;
  handleArticleSelect: (articleId: string) => void;
  handleFAQVote: (faqId: string, helpful: boolean) => void;
  clearError: () => void;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/learningPath.ts
export interface SkillNode {
  id: string; // Unique skill identifier
  name: string; // Skill name
  description: string; // Skill description
  category: SkillCategory; // Skill category
  masteryLevel: SkillLevel; // Current mastery level
  masteryProgress: number; // Mastery progress (0-100)
  prerequisites: string[]; // Prerequisites skill IDs
  unlocks: string[]; // Skills unlocked by mastering this
  position: {
    x: number
    y: number
    level: number
  }; // Position in skill tree visualization
  visual: {
    icon: string
    color: string
    shape: 'circle' | 'diamond' | 'hexagon' | 'star'
    glowIntensity: number
  }; // Visual representation
  associatedContent: {
    pathId: string
    moduleId: string
    lessonIds: string[]
  }[]; // Associated learning content
  metrics: {
    timeSpent: number // minutes
    practiceAttempts: number
    successRate: number
    lastPracticed: number
    difficulty: PathDifficulty
  }; // Skill metrics
  isUnlocked: boolean; // Whether skill is currently unlocked
  isFeatured: boolean; // Whether skill is featured/highlighted
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/learningPath.ts
export interface LearningBranch {
  id: string; // Branch identifier
  name: string; // Branch name
  theme: string; // Branch theme/color
  skillIds: string[]; // Skills in this branch
  completion: {
    skillsMastered: number
    totalSkills: number
    percentage: number
  }; // Branch completion progress
  difficulty: PathDifficulty; // Branch difficulty
  estimatedHours: number; // Estimated completion time
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/learningPath.ts
export interface AdaptiveDifficulty {
  currentLevel: PathDifficulty; // Current difficulty level
  performance: {
    accuracy: number
    speed: number
    consistency: number
    improvement: number
  }; // Performance metrics
  adjustmentFactors: {
    recentPerformance: number
    streakBonus: number
    timeSpentFactor: number
    mistakeRecovery: number
  }; // Adjustment factors
  recommendedLevel: PathDifficulty; // Recommended next level
  confidence: number; // Confidence in recommendation
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/learningPath.ts
export interface StudySessionPlan {
  id: string; // Session identifier
  title: string; // Session title
  plannedStartTime: number; // Planned start time
  estimatedDuration: number; // Estimated duration in minutes
  intensity: SessionIntensity; // Session intensity
  plannedContent: {
    skillId: string
    contentType: 'theory' | 'practice' | 'assessment' | 'review'
    estimatedTime: number
    priority: RecommendationPriority
  }[]; // Planned content
  goals: {
    primary: string[]
    secondary: string[]
    stretch: string[]
  }; // Session goals
  prerequisites: {
    skillId: string
    required: boolean
    current: number
    minimum: number
  }[]; // Prerequisites check
  successMetrics: {
    targetAccuracy: number
    targetCompletion: number
    skillImprovement: number
  }; // Success metrics
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/masterGames.ts
export interface MasterPlayer {
  name: string; // Player name
  rating: number; // Player rating at time of game
  peakRating?: number; // Peak rating achieved
  country?: string; // Country/nationality
  birthYear?: number; // Birth year
  titles: string[]; // Notable titles (GM, IM, WGM, etc.)
  championshipYears?: number[]; // World champion years if applicable
  biography?: string; // Brief biography
  playingStyle?: string; // Playing style description
  specialties?: string[]; // Famous for (sacrifices, endgames, etc.)
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/masterGames.ts
export interface ChessOpening {
  name: string; // Opening name
  eco: ECOCode; // ECO code
  moves: string[]; // Main line moves in algebraic notation
  category: string; // Opening category (e.g., "Sicilian Defense", "King's Gambit")
  variation?: string; // Sub-variation name
  characteristics?: string[]; // Opening characteristics
  themes?: string[]; // Common themes in this opening
  popularity?: number; // Popularity rating (1-10)
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/masterGames.ts
export interface MoveAnnotation {
  moveNumber: number; // Move number (half-moves)
  san: string; // Move in Standard Algebraic Notation
  comment: string; // Text annotation
  assessment?: '!' | '!!' | '?' | '??' | '!?' | '?!'; // Numeric assessment (!, !!, ?, ??, !?, ?!)
  evaluation?: number; // Engine evaluation if available
  isKeyMoment: boolean; // Whether this is a key/critical moment
  themes?: string[]; // Tactical themes present
  alternatives?: string[]; // Alternative moves suggested
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/masterGames.ts
export interface LibraryStats {
  totalGames: number; // Total games in library
  gamesByCentury: Record<string, number>; // Games by century
  gamesByOpening: Record<string, number>; // Games by opening
  gamesByResult: Record<GameResult, number>; // Games by result
  averageRating: number; // Average rating
  topPlayers: Array<{
    name: string
    gameCount: number
    winRate: number
  }>; // Most frequent players
  mostStudied: Array<{
    gameId: string
    studyCount: number
  }>; // Most studied games
  themeDistribution: Record<string, number>; // Educational themes distribution
  userStats: {
    gamesStudied: number
    totalStudyTime: number
    favoriteThemes: string[]
    averageStudyRating: number
  }; // User study statistics
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/masterGames.ts
export interface MasterProfile {
  photoUrl?: string; // Player photo/avatar URL
  fullBiography: string; // Detailed biography
  careerHighlights: string[]; // Career highlights
  famousGames: string[]; // Famous games (game IDs)
  openingRepertoire: {
    asWhite: ChessOpening[]
    asBlack: ChessOpening[]
  }; // Opening repertoire
  careerStats: {
    totalGames: number
    winRate: number
    drawRate: number
    lossRate: number
    averageOpponentRating: number
    peakWorldRanking?: number
  }; // Career statistics
  quotes: Array<{
    text: string
    context?: string
    year?: number
  }>; // Notable quotes
  styleAnalysis: {
    aggression: number // 1-10
    tacticalAbility: number
    positionalUnderstanding: number
    endgameSkill: number
    openingPreparation: number
    creativity: number
  }; // Playing style analysis
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/masterGames.ts
export interface RecommendationCriteria {
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'; // User's skill level
  learningStyle: 'Tactical' | 'Positional' | 'Endgame' | 'Opening' | 'Mixed'; // Preferred learning style
  studyTime: number; // Time available for study
  studiedGames: string[]; // Previously studied games
  favoriteOpenings: string[]; // Favorite openings
  objectives: string[]; // Learning objectives
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingExplorer.ts
export interface MasterGame {
  white: string; // White player name
  black: string; // Black player name
  whiteRating?: number; // White player rating
  blackRating?: number; // Black player rating
  result: '1-0' | '0-1' | '1/2-1/2'; // Game result
  year: number; // Year played
  event: string; // Tournament or event
  avgRating: number; // Average rating of both players
  moves: number; // Number of moves in the game
  date?: string; // Game date (if available)
  round?: string | number; // Round number
  significance?: string; // Game significance or notes
  gameUrl?: string; // Link to game analysis
  pgn?: string; // PGN notation
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingExplorer.ts
export interface UserOpeningData {
  favorites: ECOCode[]; // Favorite openings
  recentlyStudied: ECOCode[]; // Recently studied openings
  studyProgress: Record<ECOCode, {
    studiedAt: number
    timeSpent: number
    masteryLevel: number // 0-100
    notes: string
  }>; // Opening study progress
  repertoire: {
    white: ECOCode[]
    black: ECOCode[]
  }; // User's repertoire
  performance: Record<ECOCode, {
    gamesPlayed: number
    wins: number
    draws: number
    losses: number
    avgOpponentRating: number
  }>; // Performance with specific openings
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/openingExplorer.ts
export interface OpeningExplorerHookReturn {
  currentOpening: ChessOpening | null;
  currentPosition: string;
  moveSequence: string[];
  boardOrientation: 'white' | 'black';
  searchResults: SearchResults | null;
  filters: OpeningFilters;
  isSearching: boolean;
  currentVariations: MoveVariation[];
  expandedNodes: Set<string>;
  positionAnalysis: PositionAnalysis | null;
  isAnalyzing: boolean;
  masterGames: MasterGame[];
  isLoadingGames: boolean;
  activeTab: ExplorerTab;
  selectOpening: (opening: ChessOpening) => void;
  makeMove: (from: string, to: string) => boolean;
  resetPosition: () => void;
  loadPosition: (fen: string, moves: string[]) => void;
  updateFilters: (filters: Partial<OpeningFilters>) => void;
  searchOpenings: (query: string) => Promise<void>;
  analyzePosition: () => Promise<void>;
  selectVariation: (variation: MoveVariation) => void;
  toggleNode: (nodeId: string) => void;
  setActiveTab: (tab: ExplorerTab) => void;
  flipBoard: () => void;
  addToFavorites: (eco: ECOCode) => void;
  removeFromFavorites: (eco: ECOCode) => void;
  isFavorite: (eco: ECOCode) => boolean;
  exportPosition: () => string;
  copyFEN: () => void;
  copyPGN: () => void;
  error: string | null;
  clearError: () => void;
  handleOpeningSelect: (opening: ChessOpening) => void;
  handleVariationSelect: (variation: MoveVariation) => void;
  handleGameSelect: (game: MasterGame) => void;
  openingStats: OpeningStatistics | null;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/playComputer.ts
export interface AIOpponent {
  id: string; // Unique identifier
  name: string; // Display name with gaming theme
  title: string; // Gaming-themed title/rank
  avatar: string; // Avatar/icon identifier
  difficulty: AIDifficulty; // AI difficulty level
  rating: number; // Estimated Elo rating
  personality: AIPersonality; // Playing style personality
  description: string; // Gaming-themed description
  favoriteOpenings: string[]; // Favorite openings
  specialties: string[]; // Special abilities or characteristics
  winRate: number; // Win rate percentage
  backstory: string; // Gaming-themed backstory
  unlockRequirements?: {
    minRating?: number
    completedGames?: number
    achievements?: string[]
  }; // Unlock requirements
  isUnlocked: boolean; // Whether this opponent is unlocked
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/playComputer.ts
export interface ChessMove {
  from: string; // Source square (e.g., 'e2')
  to: string; // Target square (e.g., 'e4')
  piece: string; // Piece type
  captured?: string; // Captured piece (if any)
  san: string; // Move in Standard Algebraic Notation
  moveNumber: number; // Move number
  color: 'white' | 'black'; // Whether this is a white or black move
  timestamp: number; // Timestamp when move was made
  timeRemaining: number; // Time remaining after move (in milliseconds)
  evaluation?: {
    score: number
    bestMove: string
    depth: number
  }; // Move evaluation (if analysis is enabled)
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/playComputer.ts
export interface PlayComputerHookReturn {
  gameState: GameState | null;
  gameAnalysis: GameAnalysis | null;
  availableOpponents: AIOpponent[];
  performanceStats: PerformanceStats;
  gameSetup: Partial<GameSetup>;
  isValidSetup: boolean;
  isLoading: boolean;
  isAnalyzing: boolean;
  selectOpponent: (opponent: AIOpponent) => void;
  updateSetup: (setup: Partial<GameSetup>) => void;
  startGame: () => Promise<void>;
  makeMove: (from: string, to: string) => Promise<boolean>;
  resignGame: () => void;
  offerDraw: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  analyzePosition: () => Promise<void>;
  canMakeMove: boolean;
  isPlayerTurn: boolean;
  gameStatus: GameStatus;
  error: string | null;
  clearError: () => void;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/profile.ts
export interface ProfileUser {
  displayName: string;
  email: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  joinDate: string;
  currentRating: number;
  peakRating: number;
  ratingChange: number;
  gamesPlayed: number;
  puzzlesSolved: number;
  studyHours: number;
  winRate: number;
  currentStreak: number;
  longestStreak: number;
  favoriteOpening: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/profile.ts
export interface QuickAction_profile {
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/profile.ts
export interface ProfileData {
  userStats: ProfileUser;
  achievements: Achievement[];
  recentActivity: RecentActivity[];
  quickActions: QuickAction[];
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface StatCard {
  id: string; // Unique identifier
  title: string; // Display title
  value: string | number; // Current value (string for formatted display)
  change: string; // Change description
  trend: TrendDirection; // Trend direction
  icon: LucideIcon; // Icon component
  color: string; // Color class for styling
  subtitle?: string; // Optional subtitle
  tooltip?: string; // Optional tooltip
  priority: number; // Priority for display order
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface Achievement {
  id: string; // Unique identifier
  title: string; // Display name
  description: string; // Achievement description
  icon: LucideIcon; // Icon component
  status: AchievementStatus; // Current status
  progress: number; // Current progress value
  target: number; // Target value for completion
  xpReward: number; // Experience points reward
  category: SkillCategory; // Achievement category
  rarity: 'common' | 'rare' | 'epic' | 'legendary'; // Rarity level
  requirements?: string[]; // Unlock requirements
  badgeColor: string; // Badge color/style
  completedAt?: number; // Completion timestamp (if completed)
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface SkillProgression {
  category: SkillCategory; // Skill category
  name: string; // Display name
  level: number; // Current level
  progress: number; // Progress towards next level (0-100)
  xp: number; // Experience points
  xpToNext: number; // XP needed for next level
  improvement: number; // Recent improvement percentage
  color: string; // Color theme
  icon: LucideIcon; // Icon component
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface Goal {
  id: string; // Unique identifier
  title: string; // Goal title
  description: string; // Detailed description
  target: number; // Target value
  progress: number; // Current progress
  targetDate: number; // Target completion date
  category: SkillCategory; // Goal category
  priority: 'low' | 'medium' | 'high'; // Priority level
  status: 'active' | 'completed' | 'paused' | 'failed'; // Status
  icon: LucideIcon; // Icon component
  color: string; // Color theme
  createdAt: number; // Created timestamp
  completedAt?: number; // Completed timestamp (if completed)
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface QuickAction_progressOverview {
  id: string; // Unique identifier
  title: string; // Action title
  description: string; // Description or subtitle
  icon: LucideIcon; // Icon component
  path: string; // Navigation path
  color: string; // Color theme
  backgroundColor: string; // Background color
  isRecommended?: boolean; // Recommended action
  priority: number; // Action priority
  estimatedTime?: number; // Estimated time in minutes
  streak?: number; // Current streak or progress
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/progressOverview.ts
export interface ProgressOverviewHookReturn {
  performanceAnalytics: PerformanceAnalytics;
  studyStreak: StudyStreak;
  skillProgressions: SkillProgression[];
  achievements: Achievement[];
  goals: Goal[];
  learningPaths: LearningPath[];
  recentSessions: TrainingSession[];
  activityData: ActivityDataPoint[];
  selectedTimePeriod: TimePeriod;
  isLoading: boolean;
  setTimePeriod: (period: TimePeriod) => void;
  refreshData: () => Promise<void>;
  statsCards: StatCard[];
  quickActions: QuickAction[];
  weeklyProgress: {
    puzzlesSolved: number
    studyTime: number
    gamesPlayed: number
    improvement: number
  };
  formatRating: (rating: number) => string;
  formatDuration: (minutes: number) => string;
  calculateProgress: (current: number, target: number) => number;
  error: string | null;
  clearError: () => void;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/register.ts
export interface RegisterRequest {
  displayName: string;
  email: string;
  password: string;
  skillLevel: SkillLevel;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/resetPassword.ts
export interface PasswordRequirement {
  regex: RegExp;
  text: string;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/resetPassword.ts
export interface UseResetPasswordReturn {
  formState: ResetPasswordState;
  passwordValue: string;
  form: any;
  handleSubmit: (data: ResetPasswordForm) => Promise<void>;
  handleTogglePassword: () => void;
  handleToggleConfirmPassword: () => void;
  handleBackToLogin: () => void;
  handleRequestNewLink: () => void;
  handleContinueToLogin: () => void;
  passwordRequirements: PasswordRequirement[];
  clearError: () => void;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/studyPlans.ts
export interface StudyLesson {
  id: string; // Unique lesson identifier
  title: string; // Lesson title
  type: LessonType; // Lesson type classification
  description: string; // Brief description
  estimatedTime: number; // Estimated completion time in minutes
  difficulty: StudyDifficulty; // Lesson difficulty level
  prerequisites: string[]; // Prerequisites lesson IDs
  objectives: string[]; // Learning objectives
  content: {
    /** Main content sections */
    sections: LessonSection[]
    /** Interactive elements */
    interactive: InteractiveElement[]
    /** Assessment questions */
    assessment?: AssessmentQuestion[]
  }; // Lesson content structure
  completion: {
    status: CompletionStatus
    score?: number
    completedAt?: number
    timeSpent: number
    attempts: number
  }; // Completion tracking
  gamification: {
    xpReward: number
    badgeReward?: string
    unlockReward?: string[]
  }; // Gaming elements
  order: number; // Order within module
  isUnlocked: boolean; // Whether lesson is unlocked
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/studyPlans.ts
export interface InteractiveElement {
  id: string; // Element identifier
  type: 'puzzle' | 'position_trainer' | 'move_practice' | 'quiz' | 'simulation'; // Element type
  title: string; // Element title
  config: Record<string, any>; // Configuration for the interactive element
  points: number; // Points awarded for completion
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/studyPlans.ts
export interface StudyModule {
  id: string; // Unique module identifier
  title: string; // Module title
  description: string; // Module description
  category: LearningCategory; // Module category
  difficulty: StudyDifficulty; // Module difficulty level
  estimatedHours: number; // Estimated total completion time in hours
  icon: string; // Module icon/image
  lessons: StudyLesson[]; // Lessons in this module
  prerequisites: string[]; // Module prerequisites
  learningOutcomes: string[]; // Learning outcomes
  completion: {
    status: CompletionStatus
    progress: number // 0-100
    lessonsCompleted: number
    totalLessons: number
    completedAt?: number
    certificateEarned: boolean
  }; // Module completion tracking
  order: number; // Module order in learning path
  isUnlocked: boolean; // Whether module is unlocked
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/studyPlans.ts
export interface LearningPath {
  id: string; // Unique path identifier
  title: string; // Path title
  description: string; // Path description
  targetLevel: StudyDifficulty; // Target skill level
  category: LearningCategory; // Path category
  thumbnail: string; // Path image/thumbnail
  totalHours: number; // Estimated total completion time in hours
  modules: StudyModule[]; // Study modules in this path
  prerequisites: {
    minRating?: number
    completedPaths?: string[]
    achievements?: string[]
  }; // Path prerequisites
  completion: {
    status: CompletionStatus
    progress: number // 0-100
    modulesCompleted: number
    totalModules: number
    startedAt?: number
    completedAt?: number
    estimatedCompletionDate?: number
  }; // Path completion tracking
  metrics: {
    enrolledUsers: number
    averageRating: number
    completionRate: number
    difficultyRating: number
  }; // Path popularity and ratings
  isUnlocked: boolean; // Whether path is unlocked for user
  isEnrolled: boolean; // Whether user is enrolled
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/studyPlans.ts
export interface StudySession {
  id: string; // Session identifier
  startTime: number; // Session start time
  endTime: number; // Session end time
  duration: number; // Session duration in minutes
  contentStudied: {
    pathId: string
    moduleId: string
    lessonId: string
    completionStatus: CompletionStatus
  }[]; // Content studied
  xpEarned: number; // XP earned this session
  performance: {
    accuracy: number
    speed: number
    engagement: number
  }; // Session performance
  notes?: string; // Session notes
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/studyPlans.ts
export interface StudyPlansHookReturn {
  learningPaths: LearningPath[];
  studyProgress: StudyProgress;
  availableBadges: AchievementBadge[];
  studySchedule: StudySchedule | null;
  recommendations: StudyRecommendation[];
  customPlans: CustomStudyPlan[];
  selectedPath: LearningPath | null;
  currentModule: StudyModule | null;
  currentLesson: StudyLesson | null;
  isLoading: boolean;
  isLessonLoading: boolean;
  selectPath: (path: LearningPath) => void;
  enrollInPath: (pathId: string) => Promise<void>;
  selectModule: (module: StudyModule) => void;
  selectLesson: (lesson: StudyLesson) => void;
  completeLesson: (lessonId: string, score: number) => Promise<void>;
  updateSchedule: (schedule: StudySchedule) => Promise<void>;
  createCustomPlan: (plan: Omit<CustomStudyPlan, 'id' | 'createdAt' | 'modifiedAt'>) => Promise<void>;
  navigateToNextLesson: () => boolean;
  navigateToPrevLesson: () => boolean;
  calculatePathProgress: (pathId: string) => number;
  getRecommendedContent: () => StudyRecommendation[];
  getStudyStreak: () => number;
  getTodaysGoalProgress: () => number;
  error: string | null;
  clearError: () => void;
  handleTabChange: (tab: string) => void;
  handleLessonComplete: (lessonId: string, score: number) => Promise<void>;
  getTabIcon: (tab: string) => React.ReactNode;
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/tutorials.ts
export interface TutorialStep {
  id: string; // Unique step identifier
  type: TutorialStepType; // Step type
  title: string; // Step title
  description: string; // Step description/content
  instruction?: string; // Optional instruction text
  estimatedDuration: number; // Step duration estimate in seconds
  isInteractive: boolean; // Whether this step is interactive
  requiredActions?: string[]; // Required actions to complete step
  video?: {
    url: string
    thumbnailUrl: string
    duration: number
    subtitles?: string
  }; // Optional video content
  image?: {
    url: string
    alt: string
    caption?: string
  }; // Optional image/screenshot
  interactiveElements?: {
    selector: string
    action: 'click' | 'hover' | 'input' | 'highlight'
    description: string
  }[]; // Interactive element selectors for highlighting
  quiz?: {
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }[]; // Quiz questions for quiz-type steps
  completionCriteria?: {
    type: 'automatic' | 'manual' | 'quiz_score' | 'interaction'
    threshold?: number
  }; // Completion criteria
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/tutorials.ts
export interface Tutorial_tutorials {
  id: string; // Unique tutorial identifier
  title: string; // Tutorial title
  description: string; // Brief tutorial description
  summary: string; // Detailed tutorial summary
  category: TutorialCategory; // Tutorial category
  difficulty: TutorialDifficulty; // Difficulty level
  estimatedDuration: number; // Estimated completion time in minutes
  steps: TutorialStep[]; // Tutorial steps
  thumbnailUrl: string; // Tutorial thumbnail image
  tags: string[]; // Tags for search and filtering
  prerequisites: string[]; // Prerequisites (other tutorial IDs)
  learningObjectives: string[]; // Learning objectives
  version: string; // Tutorial version
  createdAt: number; // Creation date
  updatedAt: number; // Last update date
  averageRating: number; // Average rating
  ratingCount: number; // Number of ratings
  completionRate: number; // Completion rate percentage
  isFeatured: boolean; // Whether tutorial is featured
  isNew: boolean; // Whether tutorial is new
  isRecommended: boolean; // Whether tutorial is recommended for user
  unlockRequirements?: {
    completedTutorials?: string[]
    minimumRating?: number
    achievementsRequired?: string[]
  }; // Unlock requirements
  isUnlocked: boolean; // Whether tutorial is unlocked for user
  relatedTutorials: string[]; // Related tutorials
  type?: 'video' | 'interactive' | 'text' | 'mixed'; // Tutorial type/format
  instructor?: {
    name: string
    title: string
    avatar?: string
  }; // Tutorial instructor/author
  views: number; // View count
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/tutorials.ts
export interface TutorialProgress {
  tutorialId: string; // Tutorial ID
  status: TutorialStatus; // Overall completion status
  currentStepIndex: number; // Current step index (0-based)
  completedSteps: number[]; // Completed step indices
  skippedSteps: number[]; // Skipped step indices
  progressPercentage: number; // Overall progress percentage (0-100)
  timeSpent: number; // Time spent in minutes
  startedAt?: number; // Start timestamp
  lastAccessedAt: number; // Last accessed timestamp
  completedAt?: number; // Completion timestamp
  userRating?: TutorialRating; // User's rating (if completed)
  userFeedback?: string; // User's written feedback
  restartCount: number; // Number of times restarted
  quizScores?: Record<string, number>; // Quiz scores by step
  notes?: string; // User notes during tutorial
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/tutorials.ts
export interface TutorialAchievement {
  id: string; // Unique achievement identifier
  name: string; // Achievement name
  description: string; // Achievement description
  icon: string; // Achievement icon identifier
  tier: AchievementTier; // Achievement tier
  points: number; // Points awarded
  requirements: {
    completedTutorials?: string[]
    categoriesCompleted?: TutorialCategory[]
    totalTutorials?: number
    perfectScores?: number
    timeConstraints?: {
      maxTimePerTutorial: number
      tutorialCount: number
    }
  }; // Requirements to unlock
  isUnlocked: boolean; // Whether achievement is unlocked
  unlockedAt?: number; // Unlock timestamp
  rarity: number; // Rarity percentage
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/tutorials.ts
export interface TutorialMiniGame {
  id: string; // Unique game identifier
  name: string; // Game name
  description: string; // Game description
  type: 'pattern_recognition' | 'move_sequence' | 'piece_placement' | 'calculation' | 'memory'; // Game type
  difficulty: TutorialDifficulty; // Difficulty level
  config: {
    timeLimit?: number
    attempts?: number
    targetScore?: number
    positions?: string[]
    sequences?: string[][]
  }; // Game configuration
  scoring: {
    pointsPerCorrect: number
    pointsPerIncorrect: number
    timeBonus: boolean
    perfectBonus?: number
  }; // Scoring system
  instructions: string[]; // Instructions
  successCriteria: {
    minScore: number
    maxAttempts?: number
    timeLimit?: number
  }; // Success criteria
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/tutorials.ts
export interface QuickStartGuide {
  id: string; // Unique guide identifier
  title: string; // Guide title
  description: string; // Brief description
  targetUser: 'beginner' | 'intermediate' | 'advanced' | 'returning'; // Target user type
  essentialTutorials: string[]; // Essential tutorials in order
  estimatedTime: number; // Estimated completion time
  steps: {
    title: string
    description: string
    tutorialId?: string
    action?: 'tutorial' | 'practice' | 'explore'
  }[]; // Guide steps
  reward?: {
    points: number
    achievement?: string
    unlocks?: string[]
  }; // Completion reward
}

// From: /mnt/c/Projects/chess-training/frontend/src/types/tutorials.ts
export interface TutorialsHookReturn {
  tutorials: Tutorial[];
  videoTutorials: Record<string, VideoTutorial>;
  miniGames: TutorialMiniGame[];
  quickStartGuides: QuickStartGuide[];
  progress: Record<string, TutorialProgress>;
  statistics: TutorialStatistics;
  achievements: TutorialAchievement[];
  currentTutorial: Tutorial | null;
  currentTutorialProgress: TutorialProgress | null;
  isInTutorial: boolean;
  filteredTutorials: Tutorial[];
  filters: TutorialFilters;
  sortOptions: TutorialSortOptions;
  searchQuery: string;
  recommendations: TutorialRecommendation[];
  featuredTutorials: Tutorial[];
  recentTutorials: Tutorial[];
  isLoading: boolean;
  isVideoLoading: boolean;
  isProgressSaving: boolean;
  launchTutorial: (tutorialId: string) => void;
  pauseTutorial: () => void;
  resumeTutorial: () => void;
  completeTutorial: (rating?: TutorialRating, feedback?: string) => void;
  restartTutorial: (tutorialId: string) => void;
  completeStep: (stepIndex: number) => void;
  skipStep: (stepIndex: number) => void;
  goToStep: (stepIndex: number) => void;
  setFilters: (filters: TutorialFilters) => void;
  setSortOptions: (sortOptions: TutorialSortOptions) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
  updateProgress: (tutorialId: string, progress: Partial<TutorialProgress>) => void;
  saveProgress: () => Promise<void>;
  playVideo: (tutorialId: string, stepIndex: number) => void;
  pauseVideo: () => void;
  seekVideo: (time: number) => void;
  selectVideoChapter: (chapterIndex: number) => void;
  startMiniGame: (gameId: string) => void;
  completeMiniGame: (gameId: string, score: number) => void;
  error: string | null;
  clearError: () => void;
}

// Consolidated MiscUIConfig
export const MiscUIConfig = {
  supportedSource: {} as SupportedSource,
  subscriptionTier: {} as SubscriptionTier,
  userProgressData: {} as UserProgressData,
  progressSnapshot: {} as ProgressSnapshot,
  userProfile: {} as UserProfile,
  dataExportRequest: {} as DataExportRequest,
  achievementUnlockCondition: {} as AchievementUnlockCondition,
  achievementShare: {} as AchievementShare,
  contactState: {} as ContactState,
  useContactReturn: {} as UseContactReturn,
  openingRepertoire: {} as OpeningRepertoire,
  detailedStatistics: {} as DetailedStatistics,
  useForgotPasswordReturn: {} as UseForgotPasswordReturn,
  analyzedMove: {} as AnalyzedMove,
  gameReview: {} as GameReview,
  reviewSession: {} as ReviewSession,
  gameReviewHookReturn: {} as GameReviewHookReturn,
  helpArticle: {} as HelpArticle,
  tutorial: {} as Tutorial_helpCenter,
  categoryInfo: {} as CategoryInfo,
  helpCenterHookReturn: {} as HelpCenterHookReturn,
  skillNode: {} as SkillNode,
  learningBranch: {} as LearningBranch,
  adaptiveDifficulty: {} as AdaptiveDifficulty,
  studySessionPlan: {} as StudySessionPlan,
  masterPlayer: {} as MasterPlayer,
  chessOpening: {} as ChessOpening,
  moveAnnotation: {} as MoveAnnotation,
  libraryStats: {} as LibraryStats,
  masterProfile: {} as MasterProfile,
  recommendationCriteria: {} as RecommendationCriteria,
  masterGame: {} as MasterGame,
  userOpeningData: {} as UserOpeningData,
  openingExplorerHookReturn: {} as OpeningExplorerHookReturn,
  aIOpponent: {} as AIOpponent,
  chessMove: {} as ChessMove,
  playComputerHookReturn: {} as PlayComputerHookReturn,
  profileUser: {} as ProfileUser,
  quickAction: {} as QuickAction_profile,
  profileData: {} as ProfileData,
  statCard: {} as StatCard,
  achievement: {} as Achievement,
  skillProgression: {} as SkillProgression,
  goal: {} as Goal,
  quickAction: {} as QuickAction_progressOverview,
  progressOverviewHookReturn: {} as ProgressOverviewHookReturn,
  registerRequest: {} as RegisterRequest,
  passwordRequirement: {} as PasswordRequirement,
  useResetPasswordReturn: {} as UseResetPasswordReturn,
  studyLesson: {} as StudyLesson,
  interactiveElement: {} as InteractiveElement,
  studyModule: {} as StudyModule,
  learningPath: {} as LearningPath,
  studySession: {} as StudySession,
  studyPlansHookReturn: {} as StudyPlansHookReturn,
  tutorialStep: {} as TutorialStep,
  tutorial: {} as Tutorial_tutorials,
  tutorialProgress: {} as TutorialProgress,
  tutorialAchievement: {} as TutorialAchievement,
  tutorialMiniGame: {} as TutorialMiniGame,
  quickStartGuide: {} as QuickStartGuide,
  tutorialsHookReturn: {} as TutorialsHookReturn,
} as const;

// Type exports
export type SupportedSourceType = SupportedSource;
export type SubscriptionTierType = SubscriptionTier;
export type UserProgressDataType = UserProgressData;
export type ProgressSnapshotType = ProgressSnapshot;
export type UserProfileType = UserProfile;
export type DataExportRequestType = DataExportRequest;
export type AchievementUnlockConditionType = AchievementUnlockCondition;
export type AchievementShareType = AchievementShare;
export type ContactStateType = ContactState;
export type UseContactReturnType = UseContactReturn;
export type OpeningRepertoireType = OpeningRepertoire;
export type DetailedStatisticsType = DetailedStatistics;
export type UseForgotPasswordReturnType = UseForgotPasswordReturn;
export type AnalyzedMoveType = AnalyzedMove;
export type GameReviewType = GameReview;
export type ReviewSessionType = ReviewSession;
export type GameReviewHookReturnType = GameReviewHookReturn;
export type HelpArticleType = HelpArticle;
export type Tutorial_helpCenterType = Tutorial_helpCenter;
export type CategoryInfoType = CategoryInfo;
export type HelpCenterHookReturnType = HelpCenterHookReturn;
export type SkillNodeType = SkillNode;
export type LearningBranchType = LearningBranch;
export type AdaptiveDifficultyType = AdaptiveDifficulty;
export type StudySessionPlanType = StudySessionPlan;
export type MasterPlayerType = MasterPlayer;
export type ChessOpeningType = ChessOpening;
export type MoveAnnotationType = MoveAnnotation;
export type LibraryStatsType = LibraryStats;
export type MasterProfileType = MasterProfile;
export type RecommendationCriteriaType = RecommendationCriteria;
export type MasterGameType = MasterGame;
export type UserOpeningDataType = UserOpeningData;
export type OpeningExplorerHookReturnType = OpeningExplorerHookReturn;
export type AIOpponentType = AIOpponent;
export type ChessMoveType = ChessMove;
export type PlayComputerHookReturnType = PlayComputerHookReturn;
export type ProfileUserType = ProfileUser;
export type QuickAction_profileType = QuickAction_profile;
export type ProfileDataType = ProfileData;
export type StatCardType = StatCard;
export type AchievementType = Achievement;
export type SkillProgressionType = SkillProgression;
export type GoalType = Goal;
export type QuickAction_progressOverviewType = QuickAction_progressOverview;
export type ProgressOverviewHookReturnType = ProgressOverviewHookReturn;
export type RegisterRequestType = RegisterRequest;
export type PasswordRequirementType = PasswordRequirement;
export type UseResetPasswordReturnType = UseResetPasswordReturn;
export type StudyLessonType = StudyLesson;
export type InteractiveElementType = InteractiveElement;
export type StudyModuleType = StudyModule;
export type LearningPathType = LearningPath;
export type StudySessionType = StudySession;
export type StudyPlansHookReturnType = StudyPlansHookReturn;
export type TutorialStepType = TutorialStep;
export type Tutorial_tutorialsType = Tutorial_tutorials;
export type TutorialProgressType = TutorialProgress;
export type TutorialAchievementType = TutorialAchievement;
export type TutorialMiniGameType = TutorialMiniGame;
export type QuickStartGuideType = QuickStartGuide;
export type TutorialsHookReturnType = TutorialsHookReturn;
