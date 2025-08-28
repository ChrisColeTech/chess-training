/**
 * Endgame Library Types
 * Contains all TypeScript interfaces and types for the endgame study system
 */

/**
 * Endgame difficulty levels
 */
export type EndgameDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Master' | 'Grandmaster'

/**
 * Endgame categories with gaming themes
 */
export type EndgameCategory = 
  | 'Basic Endgames'
  | 'Rook Endgames' 
  | 'Queen Endgames'
  | 'Minor Piece Endgames'
  | 'Bishop Endgames'
  | 'Knight Endgames'
  | 'Pawn Endgames'
  | 'Classical Positions'
  | 'Fortress Positions'
  | 'Theoretical Studies'

/**
 * Endgame study modes
 */
export type StudyMode = 'overview' | 'analysis' | 'practice' | 'theory' | 'tablebase' | 'variations'

/**
 * Endgame position evaluation types
 */
export type PositionEvaluation = 'winning' | 'drawn' | 'losing' | 'unclear'

/**
 * Tablebase result types
 */
export type TablebaseResult = 'Win' | 'Loss' | 'Draw' | 'Unknown'

/**
 * Practice session types
 */
export type PracticeType = 'play_engine' | 'find_move' | 'guided_study' | 'memorization' | 'calculation'

/**
 * Represents a theoretical endgame position
 */
export interface EndgamePosition {
  /** Unique identifier */
  id: string
  
  /** Position title */
  title: string
  
  /** Gaming-themed subtitle */
  subtitle?: string
  
  /** Category classification */
  category: EndgameCategory
  
  /** Difficulty level */
  difficulty: EndgameDifficulty
  
  /** Chess position in FEN notation */
  fen: string
  
  /** Position description */
  description: string
  
  /** Key learning points */
  keyPoints: string[]
  
  /** Estimated study time */
  studyTime: string
  
  /** Number of master games with this position */
  masterGames: number
  
  /** Statistical win rate for the stronger side */
  winRate: number
  
  /** Engine evaluation */
  evaluation: string
  
  /** Theoretical assessment */
  theoreticalResult: PositionEvaluation
  
  /** ECO/opening code if applicable */
  ecoCode?: string
  
  /** Famous games featuring this position */
  famousGames?: {
    players: string
    year: number
    tournament: string
    result: string
  }[]
  
  /** Position tags for filtering */
  tags: string[]
  
  /** Unlocking requirements */
  unlockRequirements?: {
    minRating?: number
    completedPositions?: string[]
    masterLevel?: EndgameDifficulty
  }
  
  /** Whether position is unlocked */
  isUnlocked: boolean
  
  /** Related positions */
  relatedPositions: string[]
  
  /** Author/analyst who contributed this position */
  author?: string
  
  /** Publication source */
  source?: string
}

/**
 * Endgame category information
 */
export interface EndgameCategoryInfo {
  /** Category name */
  name: EndgameCategory
  
  /** Gaming-themed title */
  title: string
  
  /** Category description */
  description: string
  
  /** Number of positions in category */
  count: number
  
  /** Icon identifier for UI */
  icon: string
  
  /** Gaming theme color */
  color: string
  
  /** Difficulty range */
  difficultyRange: {
    min: EndgameDifficulty
    max: EndgameDifficulty
  }
  
  /** Estimated total study time */
  totalStudyTime: number
  
  /** Whether category is unlocked */
  isUnlocked: boolean
  
  /** Category progress percentage */
  progress: number
}

/**
 * Tablebase query result
 */
export interface TablebaseQueryResult {
  /** Position FEN */
  fen: string
  
  /** Tablebase result */
  result: TablebaseResult
  
  /** Distance to mate (if winning/losing) */
  dtm?: number
  
  /** Distance to zeroing move (if drawn) */
  dtz?: number
  
  /** Best move in the position */
  bestMove?: string
  
  /** All legal moves with evaluations */
  moves: {
    move: string
    result: TablebaseResult
    dtm?: number
    dtz?: number
  }[]
  
  /** Whether result is from 7-man tablebase */
  is7man: boolean
  
  /** Query timestamp */
  timestamp: number
  
  /** Error message if query failed */
  error?: string
}

/**
 * Position analysis data
 */
export interface EndgameAnalysis {
  /** Position FEN */
  position: string
  
  /** Engine evaluation */
  evaluation: number
  
  /** Best moves */
  bestMoves: string[]
  
  /** Principal variation */
  principalVariation: string[]
  
  /** Tactical themes present */
  tacticalThemes: string[]
  
  /** Strategic concepts */
  strategicConcepts: string[]
  
  /** Key squares in the position */
  keySquares: string[]
  
  /** Critical moves and variations */
  criticalLines: {
    move: string
    evaluation: number
    line: string[]
    comment: string
  }[]
  
  /** Position classification */
  classification: {
    type: string
    subtype?: string
    phase: 'early' | 'middle' | 'late'
  }
  
  /** Historical analysis */
  historicalNotes?: string
  
  /** Computer analysis depth */
  depth: number
  
  /** Analysis timestamp */
  timestamp: number
}

/**
 * Study progress tracking
 */
export interface StudyProgress {
  /** Position ID */
  positionId: string
  
  /** Study sessions completed */
  sessionsCompleted: number
  
  /** Total study time (minutes) */
  totalStudyTime: number
  
  /** Mastery level (0-100) */
  masteryLevel: number
  
  /** Last studied timestamp */
  lastStudied: number
  
  /** Practice statistics */
  practiceStats: {
    [key in PracticeType]: {
      attempts: number
      successes: number
      averageTime: number
      bestTime: number
    }
  }
  
  /** Moves practiced */
  movesPracticed: string[]
  
  /** Variations mastered */
  variationsMastered: string[]
  
  /** Personal notes */
  notes: string
  
  /** Bookmarked for review */
  isBookmarked: boolean
  
  /** Star rating */
  rating?: number
}

/**
 * Practice session configuration
 */
export interface PracticeSession {
  /** Session ID */
  id: string
  
  /** Position being practiced */
  position: EndgamePosition
  
  /** Practice type */
  type: PracticeType
  
  /** Session settings */
  settings: {
    showHints: boolean
    allowUndo: boolean
    timeLimit?: number
    targetDepth?: number
    engineStrength?: number
  }
  
  /** Current game state (if playing) */
  gameState?: {
    fen: string
    moves: string[]
    playerColor: 'white' | 'black'
    engineThinking: boolean
  }
  
  /** Session start time */
  startTime: number
  
  /** Session end time */
  endTime?: number
  
  /** Session result */
  result?: {
    success: boolean
    movesPlayed: number
    timeUsed: number
    hintsUsed: number
    evaluation: 'excellent' | 'good' | 'okay' | 'poor'
  }
}

/**
 * Endgame composition (study-like position)
 */
export interface EndgameComposition {
  /** Composition ID */
  id: string
  
  /** Title */
  title: string
  
  /** Composer name */
  composer: string
  
  /** Composition year */
  year: number
  
  /** Initial position */
  fen: string
  
  /** Stipulation (e.g., "White to play and win") */
  stipulation: string
  
  /** Solution moves */
  solution: {
    mainLine: string[]
    alternatives: {
      move: string
      line: string[]
      comment: string
    }[]
  }
  
  /** Artistic value rating */
  artisticValue: number
  
  /** Difficulty for solving */
  solvingDifficulty: EndgameDifficulty
  
  /** Theme/motif */
  themes: string[]
  
  /** Publication source */
  source?: string
  
  /** Award won */
  award?: string
}

/**
 * Component props interfaces
 */

/**
 * Props for EndgameCategories component
 */
export interface EndgameCategoriesProps {
  /** Available categories */
  categories: EndgameCategoryInfo[]
  
  /** Currently selected category */
  selectedCategory: EndgameCategory | null
  
  /** Callback when category is selected */
  onCategorySelect: (category: EndgameCategory) => void
  
  /** Search filter text */
  searchFilter: string
  
  /** Callback when search changes */
  onSearchChange: (search: string) => void
  
  /** Player's progress data */
  progress: Record<EndgameCategory, number>
  
  /** Theme from store */
  theme: any
}

/**
 * Props for PositionViewer component  
 */
export interface PositionViewerProps {
  /** Current position */
  position: EndgamePosition
  
  /** Current board FEN */
  currentFen?: string
  
  /** Whether pieces are draggable */
  allowMoves?: boolean
  
  /** Callback when move is made */
  onMove?: (from: string, to: string) => void
  
  /** Highlighted squares */
  highlightedSquares?: string[]
  
  /** Arrow overlays */
  arrows?: Array<{
    from: string
    to: string
    color: string
  }>
  
  /** Board orientation */
  orientation?: 'white' | 'black'
  
  /** Whether to show coordinates */
  showCoordinates?: boolean
  
  /** Board size */
  size?: number
  
  /** Theme from store */
  theme: any
}

/**
 * Props for TablebaseQuery component
 */
export interface TablebaseQueryProps {
  /** Current position FEN */
  position: string
  
  /** Callback when query is made */
  onQuery: (fen: string) => Promise<TablebaseQueryResult>
  
  /** Current query result */
  result: TablebaseQueryResult | null
  
  /** Whether query is loading */
  isLoading: boolean
  
  /** Query history */
  history: TablebaseQueryResult[]
  
  /** Theme from store */
  theme: any
}

/**
 * Props for EndgameAnalysis component
 */
export interface EndgameAnalysisProps {
  /** Position being analyzed */
  position: EndgamePosition
  
  /** Current analysis data */
  analysis: EndgameAnalysis | null
  
  /** Whether analysis is loading */
  isAnalyzing: boolean
  
  /** Callback to request analysis */
  onAnalyze: () => void
  
  /** Callback to analyze specific variation */
  onAnalyzeVariation: (moves: string[]) => void
  
  /** Engine depth setting */
  engineDepth: number
  
  /** Callback when depth changes */
  onDepthChange: (depth: number) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for position practice component
 */
export interface EndgamePracticeProps {
  /** Position to practice */
  position: EndgamePosition
  
  /** Practice session state */
  session: PracticeSession | null
  
  /** Available practice types */
  practiceTypes: PracticeType[]
  
  /** Callback to start practice session */
  onStartPractice: (type: PracticeType) => void
  
  /** Callback to end session */
  onEndPractice: () => void
  
  /** Callback when move is made */
  onMove: (from: string, to: string) => void
  
  /** Study progress for this position */
  progress: StudyProgress
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for useEndgameLibrary
 */
export interface EndgameLibraryHookReturn {
  // Data state
  categories: EndgameCategoryInfo[]
  positions: EndgamePosition[]
  filteredPositions: EndgamePosition[]
  selectedCategory: EndgameCategory | null
  selectedPosition: EndgamePosition | null
  compositions: EndgameComposition[]
  
  // UI state  
  activeTab: StudyMode
  searchFilter: string
  sortBy: 'difficulty' | 'rating' | 'study_time' | 'master_games'
  sortOrder: 'asc' | 'desc'
  
  // Analysis state
  currentAnalysis: EndgameAnalysis | null
  isAnalyzing: boolean
  tablebaseResult: TablebaseQueryResult | null
  isQuerying: boolean
  
  // Practice state
  practiceSession: PracticeSession | null
  studyProgress: Record<string, StudyProgress>
  
  // Loading states
  isLoading: boolean
  isLoadingPositions: boolean
  
  // Actions
  selectCategory: (category: EndgameCategory) => void
  selectPosition: (position: EndgamePosition) => void
  setActiveTab: (tab: StudyMode) => void
  setSearchFilter: (filter: string) => void
  setSorting: (by: string, order: 'asc' | 'desc') => void
  
  // Analysis actions
  analyzePosition: (position: EndgamePosition) => Promise<void>
  queryTablebase: (fen: string) => Promise<TablebaseQueryResult>
  
  // Practice actions
  startPracticeSession: (position: EndgamePosition, type: PracticeType) => void
  endPracticeSession: () => void
  updateProgress: (positionId: string, progress: Partial<StudyProgress>) => void
  
  // Utilities
  getPositionsByCategory: (category: EndgameCategory) => EndgamePosition[]
  getUnlockedPositions: () => EndgamePosition[]
  calculateMastery: (positionId: string) => number
  
  // Error handling
  error: string | null
  clearError: () => void
  
  // UI handlers
  handleBack: () => void
  handleTabChange: (tab: StudyMode) => void
  handleStartPractice: (position: EndgamePosition, type: PracticeType) => void
  getCategoryProgress: (category: EndgameCategory) => number
}

/**
 * Endgame library filters and sorting
 */
export interface EndgameLibraryFilters {
  /** Category filter */
  category?: EndgameCategory
  
  /** Difficulty range */
  difficultyRange?: {
    min: EndgameDifficulty
    max: EndgameDifficulty
  }
  
  /** Study time range (minutes) */
  studyTimeRange?: {
    min: number
    max: number
  }
  
  /** Win rate range */
  winRateRange?: {
    min: number
    max: number
  }
  
  /** Tags to include */
  includeTags?: string[]
  
  /** Tags to exclude */
  excludeTags?: string[]
  
  /** Only show unlocked positions */
  unlockedOnly?: boolean
  
  /** Only show positions with progress */
  studiedOnly?: boolean
  
  /** Search text */
  searchText?: string
}

/**
 * Statistics for endgame library
 */
export interface EndgameLibraryStats {
  /** Total positions available */
  totalPositions: number
  
  /** Positions studied */
  studiedPositions: number
  
  /** Average mastery across all positions */
  averageMastery: number
  
  /** Total study time */
  totalStudyTime: number
  
  /** Positions by difficulty */
  positionsByDifficulty: Record<EndgameDifficulty, number>
  
  /** Positions by category */
  positionsByCategory: Record<EndgameCategory, number>
  
  /** Study streak (days) */
  studyStreak: number
  
  /** Favorite category */
  favoriteCategory: EndgameCategory
  
  /** Recently studied positions */
  recentPositions: string[]
  
  /** Bookmarked positions */
  bookmarkedPositions: string[]
}