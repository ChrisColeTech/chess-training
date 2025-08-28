/**
 * Opening Explorer Types
 * Contains all TypeScript interfaces and types for the opening explorer system
 */

/**
 * ECO code ranges for opening classification
 */
export type ECOCode = string

/**
 * Opening categories for classification
 */
export type OpeningCategory = 'Defense' | 'Game' | 'Gambit' | 'System' | 'Opening'

/**
 * Difficulty levels for openings
 */
export type OpeningDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Master' | 'Grandmaster'

/**
 * Popularity levels for openings
 */
export type OpeningPopularity = 'Very High' | 'High' | 'Medium' | 'Low' | 'Rare'

/**
 * Game results for statistics
 */
export type GameResult = 'white_wins' | 'black_wins' | 'draw'

/**
 * Move evaluation categories
 */
export type MoveCategory = 'book' | 'excellent' | 'good' | 'inaccuracy' | 'mistake' | 'blunder'

/**
 * Tab types for the explorer interface
 */
export type ExplorerTab = 'overview' | 'variations' | 'theory' | 'games' | 'analysis'

/**
 * Filter options for opening search
 */
export interface OpeningFilters {
  /** Search query string */
  searchQuery: string
  
  /** Category filter */
  category: OpeningCategory | 'All'
  
  /** Difficulty filter */
  difficulty: OpeningDifficulty | 'All'
  
  /** Popularity filter */
  popularity: OpeningPopularity | 'All'
  
  /** Minimum games threshold */
  minGames: number
  
  /** Rating range filter */
  ratingRange: {
    min: number
    max: number
  }
}

/**
 * Represents a chess opening with comprehensive data
 */
export interface ChessOpening {
  /** ECO classification code */
  eco: ECOCode
  
  /** Full opening name */
  name: string
  
  /** Position in FEN notation */
  fen: string
  
  /** Move sequence to reach position */
  moves: string[]
  
  /** Frequency of play (percentage) */
  frequency: number
  
  /** White win percentage */
  whiteWins: number
  
  /** Draw percentage */
  draws: number
  
  /** Black win percentage */
  blackWins: number
  
  /** Average player rating for this opening */
  avgRating: number
  
  /** Total number of games in database */
  games: number
  
  /** Opening category */
  category: OpeningCategory
  
  /** Difficulty level */
  difficulty: OpeningDifficulty
  
  /** Popularity level */
  popularity: OpeningPopularity
  
  /** Theoretical assessment */
  theory: string
  
  /** Number of master-level games */
  masterGames: number
  
  /** Key strategic ideas */
  keyIdeas: string[]
  
  /** Alternative names */
  aliases?: string[]
  
  /** Related openings */
  relatedOpenings?: ECOCode[]
  
  /** First appearance year */
  firstAppeared?: number
  
  /** Notable practitioners */
  famousPlayers?: string[]
}

/**
 * Move variation data for position analysis
 */
export interface MoveVariation {
  /** Move in standard notation */
  move: string
  
  /** Move in SAN (Standard Algebraic Notation) */
  san: string
  
  /** Frequency of this move (percentage) */
  frequency: number
  
  /** White win percentage after this move */
  whiteWins: number
  
  /** Draw percentage after this move */
  draws: number
  
  /** Black win percentage after this move */
  blackWins: number
  
  /** Total games with this move */
  games: number
  
  /** ECO codes this move can lead to */
  eco: ECOCode[]
  
  /** Engine evaluation of the move */
  evaluation: number
  
  /** Move quality category */
  category: MoveCategory
  
  /** Resulting position FEN (if calculated) */
  resultingFen?: string
  
  /** Transpositions possible from this move */
  transpositions?: ECOCode[]
}

/**
 * Master game reference
 */
export interface MasterGame {
  /** White player name */
  white: string
  
  /** Black player name */
  black: string
  
  /** White player rating */
  whiteRating?: number
  
  /** Black player rating */
  blackRating?: number
  
  /** Game result */
  result: '1-0' | '0-1' | '1/2-1/2'
  
  /** Year played */
  year: number
  
  /** Tournament or event */
  event: string
  
  /** Average rating of both players */
  avgRating: number
  
  /** Number of moves in the game */
  moves: number
  
  /** Game date (if available) */
  date?: string
  
  /** Round number */
  round?: string | number
  
  /** Game significance or notes */
  significance?: string
  
  /** Link to game analysis */
  gameUrl?: string
  
  /** PGN notation */
  pgn?: string
}

/**
 * Position analysis data
 */
export interface PositionAnalysis {
  /** Current position FEN */
  position: string
  
  /** Engine evaluation */
  evaluation: number
  
  /** Evaluation in descriptive terms */
  evaluationText: string
  
  /** Best moves according to engine */
  bestMoves: string[]
  
  /** Tactical themes present */
  tacticalThemes: string[]
  
  /** Pawn structure assessment */
  pawnStructure: {
    type: string
    assessment: 'excellent' | 'good' | 'average' | 'poor' | 'terrible'
    weaknesses: string[]
    strengths: string[]
  }
  
  /** King safety evaluation */
  kingSafety: {
    white: 'safe' | 'exposed' | 'critical'
    black: 'safe' | 'exposed' | 'critical'
  }
  
  /** Piece activity assessment */
  pieceActivity: {
    white: number // 0-100 scale
    black: number // 0-100 scale
  }
  
  /** Space advantage */
  spaceAdvantage: {
    white: number
    black: number
  }
}

/**
 * Opening tree node for navigation
 */
export interface OpeningTreeNode {
  /** Move that leads to this position */
  move: string
  
  /** Position FEN */
  fen: string
  
  /** Move sequence from starting position */
  moveSequence: string[]
  
  /** Statistics for this position */
  statistics: {
    games: number
    whiteWins: number
    draws: number
    blackWins: number
    avgRating: number
  }
  
  /** Child variations */
  variations: MoveVariation[]
  
  /** Parent node reference */
  parent?: OpeningTreeNode
  
  /** Whether this node is expanded in UI */
  isExpanded: boolean
  
  /** ECO code (if this position has one) */
  eco?: ECOCode
  
  /** Opening name (if this position has one) */
  openingName?: string
}

/**
 * Search results for opening database
 */
export interface SearchResults {
  /** Matched openings */
  openings: ChessOpening[]
  
  /** Total results found */
  totalResults: number
  
  /** Search filters applied */
  appliedFilters: OpeningFilters
  
  /** Search execution time */
  searchTime: number
  
  /** Suggestions for improved search */
  suggestions?: string[]
}

/**
 * Opening statistics summary
 */
export interface OpeningStatistics {
  /** Total openings in database */
  totalOpenings: number
  
  /** Openings by category */
  byCategory: Record<OpeningCategory, number>
  
  /** Openings by difficulty */
  byDifficulty: Record<OpeningDifficulty, number>
  
  /** Openings by popularity */
  byPopularity: Record<OpeningPopularity, number>
  
  /** Most played openings */
  mostPlayed: ChessOpening[]
  
  /** Highest rated openings */
  highestRated: ChessOpening[]
  
  /** Recent additions */
  recentAdditions: ChessOpening[]
}

/**
 * User's opening preferences and history
 */
export interface UserOpeningData {
  /** Favorite openings */
  favorites: ECOCode[]
  
  /** Recently studied openings */
  recentlyStudied: ECOCode[]
  
  /** Opening study progress */
  studyProgress: Record<ECOCode, {
    studiedAt: number
    timeSpent: number
    masteryLevel: number // 0-100
    notes: string
  }>
  
  /** User's repertoire */
  repertoire: {
    white: ECOCode[]
    black: ECOCode[]
  }
  
  /** Performance with specific openings */
  performance: Record<ECOCode, {
    gamesPlayed: number
    wins: number
    draws: number
    losses: number
    avgOpponentRating: number
  }>
}

/**
 * Props for OpeningSearch component
 */
export interface OpeningSearchProps {
  /** Current search filters */
  filters: OpeningFilters
  
  /** Callback when filters change */
  onFiltersChange: (filters: Partial<OpeningFilters>) => void
  
  /** Search results */
  results: SearchResults | null
  
  /** Loading state */
  isLoading: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Props for VariationTree component
 */
export interface VariationTreeProps {
  /** Current position */
  currentPosition: string
  
  /** Available variations */
  variations: MoveVariation[]
  
  /** Callback when variation is selected */
  onVariationSelect: (variation: MoveVariation) => void
  
  /** Expanded nodes */
  expandedNodes: Set<string>
  
  /** Callback when node expansion changes */
  onNodeToggle: (nodeId: string) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for MasterGames component
 */
export interface MasterGamesProps {
  /** Opening being viewed */
  opening: ChessOpening
  
  /** Available games */
  games: MasterGame[]
  
  /** Callback when game is selected for study */
  onGameSelect: (game: MasterGame) => void
  
  /** Loading state */
  isLoading: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Props for OpeningAnalysis component
 */
export interface OpeningAnalysisProps {
  /** Current position */
  position: string
  
  /** Analysis data */
  analysis: PositionAnalysis | null
  
  /** Loading state */
  isAnalyzing: boolean
  
  /** Callback to request analysis */
  onAnalyze: () => void
  
  /** Theme from store */
  theme: any
}

/**
 * Props for OpeningBoard component
 */
export interface OpeningBoardProps {
  /** Current position FEN */
  position: string
  
  /** Callback when move is made */
  onMove: (from: string, to: string) => boolean
  
  /** Whether moves are allowed */
  allowMoves: boolean
  
  /** Last move highlight */
  lastMove?: {
    from: string
    to: string
  }
  
  /** Arrows to display */
  arrows?: Array<{
    from: string
    to: string
    color?: string
  }>
  
  /** Board orientation */
  orientation: 'white' | 'black'
  
  /** Show coordinates */
  showCoordinates: boolean
  
  /** Theme from store */
  theme: any
}

/**
 * Props for OpeningInfo component
 */
export interface OpeningInfoProps {
  /** Opening data */
  opening: ChessOpening
  
  /** Current position */
  currentPosition: string
  
  /** Move sequence */
  moveSequence: string[]
  
  /** Active tab */
  activeTab: ExplorerTab
  
  /** Callback when tab changes */
  onTabChange: (tab: ExplorerTab) => void
  
  /** Theme from store */
  theme: any
}

/**
 * Hook return type for useOpeningExplorer
 */
export interface OpeningExplorerHookReturn {
  // Current state
  currentOpening: ChessOpening | null
  currentPosition: string
  moveSequence: string[]
  boardOrientation: 'white' | 'black'
  
  // Search state
  searchResults: SearchResults | null
  filters: OpeningFilters
  isSearching: boolean
  
  // Variations state
  currentVariations: MoveVariation[]
  expandedNodes: Set<string>
  
  // Analysis state
  positionAnalysis: PositionAnalysis | null
  isAnalyzing: boolean
  
  // Games state
  masterGames: MasterGame[]
  isLoadingGames: boolean
  
  // UI state
  activeTab: ExplorerTab
  
  // Actions
  selectOpening: (opening: ChessOpening) => void
  makeMove: (from: string, to: string) => boolean
  resetPosition: () => void
  loadPosition: (fen: string, moves: string[]) => void
  updateFilters: (filters: Partial<OpeningFilters>) => void
  searchOpenings: (query: string) => Promise<void>
  analyzePosition: () => Promise<void>
  selectVariation: (variation: MoveVariation) => void
  toggleNode: (nodeId: string) => void
  setActiveTab: (tab: ExplorerTab) => void
  flipBoard: () => void
  
  // Favorites
  addToFavorites: (eco: ECOCode) => void
  removeFromFavorites: (eco: ECOCode) => void
  isFavorite: (eco: ECOCode) => boolean
  
  // Export/Import
  exportPosition: () => string
  copyFEN: () => void
  copyPGN: () => void
  
  // Error handling
  error: string | null
  clearError: () => void
  
  // UI handlers
  handleOpeningSelect: (opening: ChessOpening) => void
  handleVariationSelect: (variation: MoveVariation) => void
  handleGameSelect: (game: MasterGame) => void
  
  // Statistics
  openingStats: OpeningStatistics | null
}

/**
 * Opening database service interface
 */
export interface OpeningDatabaseService {
  /** Search for openings */
  searchOpenings: (filters: OpeningFilters) => Promise<SearchResults>
  
  /** Get opening by ECO code */
  getOpeningByECO: (eco: ECOCode) => Promise<ChessOpening | null>
  
  /** Get variations for position */
  getVariations: (fen: string) => Promise<MoveVariation[]>
  
  /** Get master games for opening */
  getMasterGames: (eco: ECOCode) => Promise<MasterGame[]>
  
  /** Analyze position */
  analyzePosition: (fen: string) => Promise<PositionAnalysis>
  
  /** Get opening statistics */
  getStatistics: () => Promise<OpeningStatistics>
  
  /** Get related openings */
  getRelatedOpenings: (eco: ECOCode) => Promise<ChessOpening[]>
}