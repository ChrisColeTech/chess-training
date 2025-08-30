import { useState, useEffect, useCallback } from 'react'
import { soundFX } from '@/utils/soundEffects'
import { apiService } from '@/services/api'
import type {
  EndgamePosition,
  EndgameCategoryInfo,
  EndgameCategory,
  StudyMode,
  EndgameAnalysis,
  TablebaseQueryResult,
  PracticeSession,
  StudyProgress,
  PracticeType,
  EndgameComposition,
  EndgameLibraryHookReturn,
  EndgameDifficulty
} from '@/types/endgameLibrary'

/**
 * Endgame library service for mock operations
 */
class EndgameLibraryService {
  /**
   * Simulate position analysis
   */
  static async analyzePosition(position: EndgamePosition): Promise<EndgameAnalysis> {
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const evaluation = parseFloat(position.evaluation) || 0
    
    return {
      position: position.fen,
      evaluation,
      bestMoves: ['Ke5', 'Kf5', 'Rd7'],
      principalVariation: ['Ke5', 'Ke7', 'Rd7+', 'Ke8', 'Kf6'],
      tacticalThemes: ['King Activity', 'Rook Activity', 'Pawn Promotion'],
      strategicConcepts: ['Opposition', 'Key Squares', 'Zugzwang'],
      keySquares: ['e5', 'f5', 'd7'],
      criticalLines: [
        {
          move: 'Ke5',
          evaluation: 2.1,
          line: ['Ke5', 'Ke7', 'Rd7+', 'Ke8'],
          comment: 'Taking the opposition leads to a winning position'
        },
        {
          move: 'Rd7',
          evaluation: 1.8,
          line: ['Rd7', 'Ke6', 'Kf4', 'Kf6'],
          comment: 'Active rook play creates threats'
        }
      ],
      classification: {
        type: position.category,
        phase: 'late'
      },
      historicalNotes: 'This position demonstrates classical endgame principles first analyzed in the 19th century.',
      depth: 20,
      timestamp: Date.now()
    }
  }

  /**
   * Simulate tablebase query
   */
  static async queryTablebase(fen: string): Promise<TablebaseQueryResult> {
    // Simulate query delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Mock tablebase result based on material
    const pieces = fen.split(' ')[0].replace(/[0-9]/g, '').replace(/\//g, '')
    const pieceCount = pieces.length
    
    if (pieceCount > 7) {
      return {
        fen,
        result: 'Unknown',
        moves: [],
        is7man: false,
        timestamp: Date.now(),
        error: '8+ man positions not supported by tablebase'
      }
    }

    return {
      fen,
      result: Math.random() > 0.5 ? 'Win' : 'Draw',
      dtm: Math.floor(Math.random() * 50) + 1,
      dtz: Math.floor(Math.random() * 25) + 1,
      bestMove: 'Ke5',
      moves: [
        { move: 'Ke5', result: 'Win', dtm: 25, dtz: 12 },
        { move: 'Kf5', result: 'Win', dtm: 27, dtz: 14 },
        { move: 'Rd7', result: 'Draw', dtz: 0 }
      ],
      is7man: pieceCount === 7,
      timestamp: Date.now()
    }
  }

  /**
   * Initialize practice session
   */
  static createPracticeSession(position: EndgamePosition, type: PracticeType): PracticeSession {
    return {
      id: `session_${Date.now()}`,
      position,
      type,
      settings: {
        showHints: false,
        allowUndo: true,
        timeLimit: type === 'find_move' ? 300 : undefined, // 5 minutes for find move
        targetDepth: type === 'calculation' ? 5 : undefined,
        engineStrength: 1500
      },
      gameState: type === 'play_engine' ? {
        fen: position.fen,
        moves: [],
        playerColor: 'white',
        engineThinking: false
      } : undefined,
      startTime: Date.now()
    }
  }

  /**
   * Calculate mastery level based on practice statistics
   */
  static calculateMastery(progress: StudyProgress): number {
    const weights = {
      sessionsCompleted: 0.3,
      totalStudyTime: 0.2,
      practiceSuccess: 0.4,
      variationsMastered: 0.1
    }

    let mastery = 0

    // Sessions completed (max 10)
    mastery += Math.min(progress.sessionsCompleted / 10, 1) * weights.sessionsCompleted * 100

    // Study time (max 60 minutes)
    mastery += Math.min(progress.totalStudyTime / 60, 1) * weights.totalStudyTime * 100

    // Practice success rate
    let totalAttempts = 0
    let totalSuccesses = 0
    
    Object.values(progress.practiceStats).forEach(stats => {
      totalAttempts += stats.attempts
      totalSuccesses += stats.successes
    })

    const successRate = totalAttempts > 0 ? totalSuccesses / totalAttempts : 0
    mastery += successRate * weights.practiceSuccess * 100

    // Variations mastered (assume 5 key variations per position)
    mastery += Math.min(progress.variationsMastered.length / 5, 1) * weights.variationsMastered * 100

    return Math.min(Math.round(mastery), 100)
  }

  /**
   * Generate initial progress for a position
   */
  static generateInitialProgress(positionId: string): StudyProgress {
    return {
      positionId,
      sessionsCompleted: 0,
      totalStudyTime: 0,
      masteryLevel: 0,
      lastStudied: 0,
      practiceStats: {
        play_engine: { attempts: 0, successes: 0, averageTime: 0, bestTime: 0 },
        find_move: { attempts: 0, successes: 0, averageTime: 0, bestTime: 0 },
        guided_study: { attempts: 0, successes: 0, averageTime: 0, bestTime: 0 },
        memorization: { attempts: 0, successes: 0, averageTime: 0, bestTime: 0 },
        calculation: { attempts: 0, successes: 0, averageTime: 0, bestTime: 0 }
      },
      movesPracticed: [],
      variationsMastered: [],
      notes: '',
      isBookmarked: false
    }
  }
}

/**
 * Custom hook for managing endgame library state and operations
 * Handles position browsing, analysis, practice sessions, and progress tracking
 */
export const useEndgameLibrary = (): EndgameLibraryHookReturn => {
  // Data state
  const [categories, setCategories] = useState<EndgameCategoryInfo[]>([])
  const [positions, setPositions] = useState<EndgamePosition[]>([])
  const [compositions, setCompositions] = useState<EndgameComposition[]>([])
  
  // UI state
  const [selectedCategory, setSelectedCategory] = useState<EndgameCategory | null>('Basic Endgames')
  const [selectedPosition, setSelectedPosition] = useState<EndgamePosition | null>(null)
  const [activeTab, setActiveTab] = useState<StudyMode>('overview')
  const [searchFilter, setSearchFilter] = useState('')
  const [sortBy, setSortBy] = useState<'difficulty' | 'rating' | 'study_time' | 'master_games'>('difficulty')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Analysis state
  const [currentAnalysis, setCurrentAnalysis] = useState<EndgameAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [tablebaseResult, setTablebaseResult] = useState<TablebaseQueryResult | null>(null)
  const [isQuerying, setIsQuerying] = useState(false)

  // Practice state
  const [practiceSession, setPracticeSession] = useState<PracticeSession | null>(null)
  const [studyProgress, setStudyProgress] = useState<Record<string, StudyProgress>>({})

  // Loading states
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPositions, setIsLoadingPositions] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Load initial data and study progress
   */
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true)
      try {
        const [categoriesData, positionsData, compositionsData, progressData] = await Promise.all([
          apiService.analysis.getEndgameCategories(),
          apiService.analysis.getEndgamePositions(),
          apiService.analysis.getEndgameCompositions(),
          apiService.analysis.getEndgameProgress()
        ])
        
        setCategories(categoriesData || [])
        setPositions(positionsData || [])
        setCompositions(compositionsData || [])
        setStudyProgress(progressData || {})
        
        // Auto-select first category and position
        if (categoriesData && categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0].category)
        }
      } catch (error) {
        console.error('Failed to load endgame library data:', error)
        setError('Failed to load endgame library data')
      } finally {
        setIsLoading(false)
      }
    }
    
    loadInitialData()
  }, [])

  /**
   * Auto-select first position when category changes
   */
  useEffect(() => {
    if (selectedCategory && positions.length > 0) {
      const firstPosition = positions.find(p => p.category === selectedCategory && p.isUnlocked)
      if (firstPosition) {
        setSelectedPosition(firstPosition)
      }
    }
  }, [selectedCategory, positions])

  /**
   * Filter and sort positions
   */
  const filteredPositions = positions.filter(position => {
    // Category filter
    if (selectedCategory && position.category !== selectedCategory) return false
    
    // Search filter
    if (searchFilter) {
      const searchLower = searchFilter.toLowerCase()
      return (
        position.title.toLowerCase().includes(searchLower) ||
        position.description.toLowerCase().includes(searchLower) ||
        position.keyPoints.some(point => point.toLowerCase().includes(searchLower)) ||
        position.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }
    
    return true
  }).sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'difficulty':
        const difficultyOrder: Record<EndgameDifficulty, number> = {
          'Beginner': 1,
          'Intermediate': 2, 
          'Advanced': 3,
          'Master': 4,
          'Grandmaster': 5
        }
        comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        break
      case 'rating':
        comparison = a.winRate - b.winRate
        break
      case 'study_time':
        const aTime = parseInt(a.studyTime) || 0
        const bTime = parseInt(b.studyTime) || 0
        comparison = aTime - bTime
        break
      case 'master_games':
        comparison = a.masterGames - b.masterGames
        break
      default:
        comparison = 0
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  /**
   * Select a category
   */
  const selectCategory = useCallback((category: EndgameCategory) => {
    setSelectedCategory(category)
    setSearchFilter('') // Clear search when changing category
    soundFX.playClick()
  }, [])

  /**
   * Select a position
   */
  const selectPosition = useCallback((position: EndgamePosition) => {
    setSelectedPosition(position)
    setCurrentAnalysis(null) // Clear previous analysis
    setTablebaseResult(null) // Clear previous tablebase result
    soundFX.playClick()
  }, [])

  /**
   * Set active tab
   */
  const setActiveTabHandler = useCallback((tab: StudyMode) => {
    setActiveTab(tab)
    soundFX.playClick()
  }, [])

  /**
   * Set search filter
   */
  const setSearchFilterHandler = useCallback((filter: string) => {
    setSearchFilter(filter)
  }, [])

  /**
   * Set sorting
   */
  const setSorting = useCallback((by: string, order: 'asc' | 'desc') => {
    setSortBy(by as any)
    setSortOrder(order)
    soundFX.playClick()
  }, [])

  /**
   * Analyze current position
   */
  const analyzePosition = useCallback(async (position: EndgamePosition) => {
    setIsAnalyzing(true)
    setError(null)

    try {
      const analysis = await apiService.analysis.analyzeEndgamePosition(position.id)
      setCurrentAnalysis(analysis)
      soundFX.playClick()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Analysis failed')
      soundFX.playError()
    } finally {
      setIsAnalyzing(false)
    }
  }, [])

  /**
   * Query tablebase for current position
   */
  const queryTablebase = useCallback(async (fen: string): Promise<TablebaseQueryResult> => {
    setIsQuerying(true)
    setError(null)

    try {
      const result = await apiService.analysis.queryTablebase(fen)
      setTablebaseResult(result)
      
      if (result.error) {
        setError(result.error)
        soundFX.playError()
      } else {
        soundFX.playClick()
      }
      
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Tablebase query failed'
      setError(errorMessage)
      soundFX.playError()
      
      // Return an error result
      return {
        fen,
        result: 'Unknown' as const,
        moves: [],
        is7man: false,
        timestamp: Date.now(),
        error: errorMessage
      }
    } finally {
      setIsQuerying(false)
    }
  }, [])

  /**
   * Start a practice session
   */
  const startPracticeSession = useCallback(async (position: EndgamePosition, type: PracticeType) => {
    try {
      const session = await apiService.analysis.startEndgamePractice(position.id, type)
      setPracticeSession(session)
      
      // Update last studied time
      await apiService.analysis.updateEndgameProgress(position.id, {
        lastStudied: Date.now()
      })
      
      setStudyProgress(prev => ({
        ...prev,
        [position.id]: {
          ...prev[position.id],
          lastStudied: Date.now()
        }
      }))

      soundFX.playSuccess()
    } catch (error) {
      console.error('Failed to start practice session:', error)
      setError('Failed to start practice session')
      soundFX.playError()
    }
  }, [])

  /**
   * End practice session
   */
  const endPracticeSession = useCallback(async () => {
    if (!practiceSession) return

    const sessionTime = (Date.now() - practiceSession.startTime) / 1000 / 60 // minutes
    const positionId = practiceSession.position.id

    try {
      // Update progress on server
      const updatedProgress = await apiService.analysis.completeEndgamePractice(practiceSession.id, {
        sessionTime,
        completed: true
      })
      
      // Update local state
      setStudyProgress(prev => ({
        ...prev,
        [positionId]: updatedProgress
      }))

      setPracticeSession(null)
      soundFX.playClick()
    } catch (error) {
      console.error('Failed to end practice session:', error)
      setError('Failed to save session progress')
      setPracticeSession(null)
      soundFX.playError()
    }
  }, [practiceSession])

  /**
   * Update study progress
   */
  const updateProgress = useCallback(async (positionId: string, progressUpdate: Partial<StudyProgress>) => {
    try {
      const updatedProgress = await apiService.analysis.updateEndgameProgress(positionId, progressUpdate)
      
      setStudyProgress(prev => ({
        ...prev,
        [positionId]: updatedProgress
      }))
    } catch (error) {
      console.error('Failed to update progress:', error)
      setError('Failed to update progress')
    }
  }, [])

  /**
   * Get positions by category
   */
  const getPositionsByCategory = useCallback((category: EndgameCategory) => {
    return positions.filter(p => p.category === category)
  }, [positions])

  /**
   * Get unlocked positions only
   */
  const getUnlockedPositions = useCallback(() => {
    return positions.filter(p => p.isUnlocked)
  }, [positions])

  /**
   * Calculate mastery for a position
   */
  const calculateMastery = useCallback((positionId: string) => {
    const progress = studyProgress[positionId]
    return progress ? progress.masteryLevel : 0
  }, [studyProgress])

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Handle back navigation
   */
  const handleBack = useCallback(() => {
    if (selectedPosition) {
      setSelectedPosition(null)
    } else if (selectedCategory) {
      setSelectedCategory(null)
    }
  }, [selectedPosition, selectedCategory, selectPosition, selectCategory])

  /**
   * Handle tab change
   */
  const handleTabChange = useCallback((tab: StudyMode) => {
    setActiveTabHandler(tab)
  }, [setActiveTabHandler])

  /**
   * Handle start practice
   */
  const handleStartPractice = useCallback((position: EndgamePosition, type: PracticeType) => {
    startPracticeSession(position, type)
  }, [startPracticeSession])

  /**
   * Get category progress
   */
  const getCategoryProgress = useCallback((category: EndgameCategory) => {
    const categoryPositions = getPositionsByCategory(category)
    const totalMastery = categoryPositions.reduce((sum, pos) => sum + calculateMastery(pos.id), 0)
    return categoryPositions.length > 0 ? totalMastery / categoryPositions.length : 0
  }, [getPositionsByCategory, calculateMastery])

  return {
    // Data state
    categories,
    positions,
    filteredPositions,
    selectedCategory,
    selectedPosition,
    compositions,

    // UI state
    activeTab,
    searchFilter,
    sortBy,
    sortOrder,

    // Analysis state
    currentAnalysis,
    isAnalyzing,
    tablebaseResult,
    isQuerying,

    // Practice state
    practiceSession,
    studyProgress,

    // Loading states
    isLoading,
    isLoadingPositions,

    // Actions
    selectCategory,
    selectPosition,
    setActiveTab: setActiveTabHandler,
    setSearchFilter: setSearchFilterHandler,
    setSorting,

    // Analysis actions
    analyzePosition,
    queryTablebase,

    // Practice actions
    startPracticeSession,
    endPracticeSession,
    updateProgress,

    // Utilities
    getPositionsByCategory,
    getUnlockedPositions,
    calculateMastery,

    // Error handling
    error,
    clearError,

    // UI handlers
    handleBack,
    handleTabChange,
    handleStartPractice,
    getCategoryProgress
  }
}