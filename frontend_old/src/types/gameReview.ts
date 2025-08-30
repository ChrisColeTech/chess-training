/**
 * Game Review Types
 * Contains all TypeScript interfaces and types for analyzing chess games
 * Following the "GAME LABORATORY" theme for post-game analysis
 */

/**
 * Game import sources
 */
export type GameSource = 'PGN_File' | 'Chess_Com' | 'Lichess' | 'Manual_Input' | 'Recent_Games'

/**
 * Analysis depth levels
 */
export type AnalysisDepth = 'Quick' | 'Standard' | 'Deep' | 'Tournament'

/**
 * Move classifications based on engine evaluation
 */
export type MoveClassification = 'Brilliant' | 'Great' | 'Good' | 'Inaccuracy' | 'Mistake' | 'Blunder' | 'Book' | 'Forced'

/**
 * Position evaluation types
 */
export type PositionEvaluation = 'Winning' | 'Better' | 'Slightly_Better' | 'Equal' | 'Slightly_Worse' | 'Worse' | 'Losing' | 'Unclear'

/**
 * Game phase classifications
 */
export type GamePhase = 'Opening' | 'Middlegame' | 'Endgame'

/**
 * Analysis status
 */
export type AnalysisStatus = 'Pending' | 'In_Progress' | 'Completed' | 'Failed'

/**
 * Represents a chess move with comprehensive analysis data
 */
export interface AnalyzedMove {
  /** Move number in the game */
  moveNumber: number
  
  /** Player color making the move */
  color: 'white' | 'black'
  
  /** Move in Standard Algebraic Notation */
  san: string
  
  /** Move in UCI format */
  uci: string
  
  /** Source and target squares */
  from: string
  to: string
  
  /** Piece type moved */
  piece: string
  
  /** Captured piece (if any) */
  captured?: string
  
  /** Whether move is a promotion */
  promotion?: string
  
  /** Time spent on this move (seconds) */
  timeSpent: number
  
  /** Time remaining after move */
  timeRemaining: number
  
  /** Engine evaluation of the position before the move */
  evaluationBefore: number
  
  /** Engine evaluation of the position after the move */
  evaluationAfter: number
  
  /** Best move according to engine */
  bestMove: string
  
  /** Top 3 alternative moves */
  alternativeMoves: {
    move: string
    evaluation: number
    line: string[]
  }[]
  
  /** Move classification */
  classification: MoveClassification
  
  /** Evaluation loss in centipawns */
  evaluationLoss: number
  
  /** Game phase when move was played */
  phase: GamePhase
  
  /** Position after this move (FEN) */
  positionAfter: string
  
  /** Computer-generated comment */
  comment?: string
  
  /** Principal variation after this move */
  principalVariation: string[]
  
  /** Whether position is critical */
  isCriticalPosition: boolean
  
  /** Tactical themes present */
  tacticalThemes: string[]
}

/**
 * Opening information and analysis
 */
export interface OpeningAnalysis {
  /** Opening name */
  name: string
  
  /** ECO code */
  eco: string
  
  /** Opening moves */
  moves: string[]
  
  /** Number of moves in theory */
  theoryDepth: number
  
  /** Where player deviated from theory */
  deviationMove?: number
  
  /** Alternative theoretical moves at deviation point */
  theoreticalAlternatives: string[]
  
  /** Opening evaluation */
  evaluation: PositionEvaluation
  
  /** Common plans and ideas */
  commonPlans: string[]
  
  /** Typical pawn structures */
  pawnStructures: string[]
  
  /** Master games in this opening */
  masterGames: {
    white: string
    black: string
    result: string
    year: number
    event: string
  }[]
  
  /** Success rate statistics */
  statistics: {
    whiteWinRate: number
    blackWinRate: number
    drawRate: number
    totalGames: number
  }
}

/**
 * Endgame classification and analysis
 */
export interface EndgameAnalysis {
  /** Endgame type */
  type: string
  
  /** Material balance */
  materialBalance: {
    white: { [piece: string]: number }
    black: { [piece: string]: number }
  }
  
  /** Theoretical result */
  theoreticalResult: 'Win' | 'Draw' | 'Loss' | 'Unclear'
  
  /** Key squares and concepts */
  keySquares: string[]
  
  /** Winning technique or drawing method */
  technique: string
  
  /** Critical moments */
  criticalMoments: number[]
  
  /** Tablebase evaluation (if available) */
  tablebaseResult?: 'Win' | 'Draw' | 'Loss'
  
  /** Distance to mate/draw */
  distanceToGoal?: number
}

/**
 * Time usage analysis
 */
export interface TimeAnalysis {
  /** Total time used */
  totalTimeUsed: number
  
  /** Average time per move */
  averageTimePerMove: number
  
  /** Time distribution by phase */
  phaseDistribution: {
    opening: number
    middlegame: number
    endgame: number
  }
  
  /** Moves where too much time was spent */
  timeWasters: number[]
  
  /** Critical positions where more time was needed */
  timePressure: number[]
  
  /** Time management grade */
  timeGrade: 'A' | 'B' | 'C' | 'D' | 'F'
  
  /** Time-related blunders */
  timeBlunders: number[]
}

/**
 * Player accuracy and performance metrics
 */
export interface PerformanceMetrics {
  /** Overall accuracy percentage */
  overallAccuracy: number
  
  /** Accuracy by game phase */
  phaseAccuracy: {
    opening: number
    middlegame: number
    endgame: number
  }
  
  /** Move classifications count */
  moveClassifications: {
    brilliant: number
    great: number
    good: number
    inaccuracy: number
    mistake: number
    blunder: number
  }
  
  /** Performance rating for this game */
  performanceRating: number
  
  /** ACPL (Average Centipawn Loss) */
  averageCentipawnLoss: number
  
  /** Blunder rate percentage */
  blunderRate: number
  
  /** Time management efficiency */
  timeEfficiency: number
  
  /** Critical position handling */
  criticalPositionScore: number
}

/**
 * Comprehensive game review data
 */
export interface GameReview {
  /** Unique review identifier */
  id: string
  
  /** Game metadata */
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
  }
  
  /** Original PGN data */
  pgn: string
  
  /** Import source */
  source: GameSource
  
  /** Analysis configuration used */
  analysisConfig: {
    depth: AnalysisDepth
    engineTime: number
    multiPV: number
    includeOpeningBook: boolean
    includeTablebase: boolean
  }
  
  /** Analysis status */
  analysisStatus: AnalysisStatus
  
  /** Progress percentage (0-100) */
  analysisProgress: number
  
  /** All moves with analysis */
  moves: AnalyzedMove[]
  
  /** Opening analysis */
  opening: OpeningAnalysis
  
  /** Endgame analysis (if applicable) */
  endgame?: EndgameAnalysis
  
  /** Time usage analysis */
  timeAnalysis: TimeAnalysis
  
  /** Performance metrics for both players */
  performance: {
    white: PerformanceMetrics
    black: PerformanceMetrics
  }
  
  /** Key positions and critical moments */
  keyPositions: {
    moveNumber: number
    position: string
    evaluation: number
    description: string
    type: 'Critical' | 'Turning_Point' | 'Missed_Opportunity' | 'Best_Play'
  }[]
  
  /** Overall game summary */
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
  }
  
  /** Improvement suggestions */
  improvements: {
    category: 'Opening' | 'Tactics' | 'Strategy' | 'Endgame' | 'Time_Management'
    description: string
    specificMoves: number[]
    priority: 'High' | 'Medium' | 'Low'
    studyMaterial: string[]
  }[]
  
  /** Analysis timestamps */
  createdAt: number
  analysisCompletedAt?: number
  lastViewedAt: number
  
  /** User notes and annotations */
  userNotes: {
    moveNumber: number
    note: string
    timestamp: number
  }[]
  
  /** Bookmarked positions */
  bookmarks: {
    moveNumber: number
    label: string
    category: string
  }[]
  
  /** Export preferences */
  exportSettings: {
    includeVariations: boolean
    includeComments: boolean
    includeEvaluations: boolean
    format: 'PGN' | 'PDF' | 'HTML'
  }
}

/**
 * Game import/upload data
 */
export interface GameImport {
  /** Import method used */
  source: GameSource
  
  /** Raw game data (PGN, JSON, etc.) */
  gameData: string
  
  /** Import timestamp */
  importedAt: number
  
  /** Additional metadata */
  metadata: {
    filename?: string
    fileSize?: number
    gameCount?: number
    sourceUrl?: string
    apiKey?: string
  }
  
  /** Import validation */
  validation: {
    isValid: boolean
    errors: string[]
    warnings: string[]
    gamesFound: number
    gamesImported: number
  }
}

/**
 * Review session state
 */
export interface ReviewSession {
  /** Currently reviewing game */
  currentGame: GameReview | null
  
  /** Current move being viewed */
  currentMoveIndex: number
  
  /** Board orientation */
  boardOrientation: 'white' | 'black'
  
  /** View mode */
  viewMode: 'Analysis' | 'Play_Through' | 'Training' | 'Compare'
  
  /** Display preferences */
  displaySettings: {
    showCoordinates: boolean
    showMoveNumbers: boolean
    showEvaluationBar: boolean
    showBestMoves: boolean
    showArrows: boolean
    highlightLastMove: boolean
    highlightSquares: boolean
  }
  
  /** Filter settings */
  filters: {
    showOnlyMistakes: boolean
    minEvaluationLoss: number
    selectedPhases: GamePhase[]
    selectedClassifications: MoveClassification[]
  }
  
  /** Comparison game (if in compare mode) */
  comparisonGame?: GameReview
  
  /** Training mode settings */
  trainingMode: {
    hideEngine: boolean
    askForBestMove: boolean
    showHintsAfterTime: number
    quizMode: boolean
  }
}

/**
 * Game collection and organization
 */
export interface GameCollection {
  /** Collection identifier */
  id: string
  
  /** Collection name */
  name: string
  
  /** Description */
  description: string
  
  /** Games in collection */
  gameIds: string[]
  
  /** Collection tags */
  tags: string[]
  
  /** Created timestamp */
  createdAt: number
  
  /** Last updated */
  updatedAt: number
  
  /** Collection stats */
  stats: {
    totalGames: number
    averageAccuracy: number
    averageRating: number
    mostCommonOpenings: string[]
    improvementAreas: string[]
  }
  
  /** Sharing settings */
  sharing: {
    isPublic: boolean
    shareUrl?: string
    allowComments: boolean
    allowDownload: boolean
  }
}

/**
 * Props for game selection component
 */
export interface GameSelectionProps {
  /** Available games */
  games: GameReview[]
  
  /** Currently selected game */
  selectedGame: GameReview | null
  
  /** Callback when game is selected */
  onGameSelect: (game: GameReview) => void
  
  /** Callback to import new game */
  onImportGame: () => void
  
  /** Search and filter options */
  searchQuery: string
  onSearchChange: (query: string) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for move analysis component
 */
export interface MoveAnalysisProps {
  /** Current move being analyzed */
  currentMove: AnalyzedMove | null
  
  /** All moves in the game */
  allMoves: AnalyzedMove[]
  
  /** Current move index */
  currentIndex: number
  
  /** Callback to navigate to move */
  onMoveSelect: (index: number) => void
  
  /** Whether to show engine lines */
  showEngineLines: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Props for engine evaluation component
 */
export interface EngineEvaluationProps {
  /** Current position evaluation */
  evaluation: number
  
  /** Best moves with evaluations */
  bestMoves: {
    move: string
    evaluation: number
    line: string[]
  }[]
  
  /** Current move classification */
  moveClassification?: MoveClassification
  
  /** Whether engine is analyzing */
  isAnalyzing: boolean
  
  /** Analysis depth */
  depth: number
  
  /** Theme from store */
  theme: any
}

/**
 * Props for game statistics component
 */
export interface GameStatisticsProps {
  /** Performance metrics */
  performance: PerformanceMetrics
  
  /** Time analysis */
  timeAnalysis: TimeAnalysis
  
  /** Key positions */
  keyPositions: GameReview['keyPositions']
  
  /** Player color being analyzed */
  playerColor: 'white' | 'black'
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for useGameReview
 */
export interface GameReviewHookReturn {
  // Current state
  currentGame: GameReview | null
  reviewSession: ReviewSession
  availableGames: GameReview[]
  gameCollections: GameCollection[]
  
  // Import state
  importState: {
    isImporting: boolean
    importProgress: number
    lastImport: GameImport | null
  }
  
  // Analysis state
  analysisState: {
    isAnalyzing: boolean
    analysisProgress: number
    currentAnalysis: string | null
  }
  
  // Loading states
  isLoading: boolean
  
  // Actions
  selectGame: (gameId: string) => void
  importGame: (source: GameSource, data: string) => Promise<boolean>
  analyzeGame: (gameId: string, config: AnalysisDepth) => Promise<void>
  navigateToMove: (moveIndex: number) => void
  updateDisplaySettings: (settings: Partial<ReviewSession['displaySettings']>) => void
  updateFilters: (filters: Partial<ReviewSession['filters']>) => void
  saveUserNote: (moveIndex: number, note: string) => void
  bookmarkPosition: (moveIndex: number, label: string, category: string) => void
  exportGame: (gameId: string, format: 'PGN' | 'PDF' | 'HTML') => Promise<string>
  createCollection: (name: string, gameIds: string[]) => Promise<string>
  deleteGame: (gameId: string) => Promise<void>
  
  // Utilities
  canNavigateBack: boolean
  canNavigateForward: boolean
  currentMoveIndex: number
  totalMoves: number
  
  // Error handling
  error: string | null
  clearError: () => void
}

/**
 * Game review service interface
 */
export interface GameReviewService {
  importFromPGN: (pgn: string) => Promise<GameReview>
  importFromChessCom: (username: string, gameId?: string) => Promise<GameReview[]>
  importFromLichess: (username: string, gameId?: string) => Promise<GameReview[]>
  analyzeGame: (game: GameReview, config: AnalysisDepth) => Promise<GameReview>
  exportGame: (game: GameReview, format: string) => Promise<string>
  saveReview: (review: GameReview) => Promise<void>
  loadReviews: () => Promise<GameReview[]>
  deleteReview: (id: string) => Promise<void>
}