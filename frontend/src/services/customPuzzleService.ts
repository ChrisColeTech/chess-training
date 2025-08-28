import { Chess } from 'chess.js'
import type { 
  CustomPuzzle, 
  CustomMoveValidationResult, 
  CustomPuzzleFormData,
  CustomPuzzleFilters,
  CustomPuzzleSearchResult
} from '@/types/customPuzzles'

/**
 * Service class for custom puzzle-related business logic
 * Handles move validation, puzzle management, collection operations, and search functionality
 * Following the same pattern as the opening puzzle service
 */
export class CustomPuzzleService {
  /**
   * Validate a chess move and determine if it matches the expected solution
   */
  static validateMove(
    game: Chess,
    sourceSquare: string,
    targetSquare: string,
    expectedMove: string
  ): CustomMoveValidationResult {
    try {
      // Store the game state for potential rollback
      const previousFen = game.fen()
      
      // Attempt the move
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Default to queen promotion
      })

      if (move === null) {
        return {
          isValid: false,
          isCorrect: false,
          isComplete: false,
          error: 'Invalid chess move',
          feedback: 'That move is not legal in this position'
        }
      }

      // Check if move matches expected solution
      const isCorrect = move.san === expectedMove

      if (!isCorrect) {
        // Rollback the move if incorrect
        game.load(previousFen)
      }

      return {
        isValid: true,
        isCorrect,
        isComplete: false, // Will be determined by calling code
        move,
        feedback: isCorrect ? 'Correct move!' : `Try again. Expected ${expectedMove}, but you played ${move.san}`
      }
    } catch (error) {
      return {
        isValid: false,
        isCorrect: false,
        isComplete: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        feedback: 'An error occurred while processing your move'
      }
    }
  }

  /**
   * Check if a sequence of moves matches the complete puzzle solution
   */
  static checkSolutionComplete(userMoves: string[], solution: string[]): boolean {
    if (userMoves.length !== solution.length) {
      return false
    }

    return userMoves.every((move, index) => move === solution[index])
  }

  /**
   * Calculate puzzle score based on performance metrics
   */
  static calculatePuzzleScore(
    timeElapsed: number,
    hintsUsed: number,
    puzzleRating: number,
    isCompleted: boolean,
    moveCount?: number
  ): number {
    if (!isCompleted) return 0

    let baseScore = puzzleRating

    // Time penalty (lose points for taking longer)
    // Assume optimal time is 30 seconds per 100 rating points
    const optimalTime = (puzzleRating / 100) * 30
    const timePenalty = Math.max(0, timeElapsed - optimalTime) * 0.5
    baseScore -= timePenalty

    // Hint penalty (lose 15% per hint used for custom puzzles)
    const hintPenalty = hintsUsed * 0.15
    baseScore *= (1 - hintPenalty)

    // Move efficiency bonus/penalty
    if (moveCount !== undefined) {
      // Bonus for solving in fewer moves, penalty for extra moves
      const optimalMoves = 3 // Assume 3 moves is optimal for most tactical puzzles
      const moveEfficiency = Math.max(0.8, optimalMoves / moveCount)
      baseScore *= moveEfficiency
    }

    // Minimum score is 5% of puzzle rating
    return Math.max(puzzleRating * 0.05, baseScore)
  }

  /**
   * Get performance rating based on score
   */
  static getPerformanceRating(
    score: number,
    puzzleRating: number
  ): 'Excellent' | 'Good' | 'Fair' | 'Poor' {
    const percentage = score / puzzleRating

    if (percentage >= 0.95) return 'Excellent'
    if (percentage >= 0.80) return 'Good'
    if (percentage >= 0.60) return 'Fair'
    return 'Poor'
  }

  /**
   * Validate custom puzzle data structure
   */
  static validatePuzzleData(puzzle: Partial<CustomPuzzle>): {
    isValid: boolean
    errors: string[]
  } {
    const errors: string[] = []
    const requiredFields = [
      'title', 'description', 'fen', 'solution', 'theme', 
      'difficulty', 'hint1', 'hint2', 'hint3'
    ]

    // Check required fields
    requiredFields.forEach(field => {
      const value = puzzle[field as keyof CustomPuzzle]
      if (value === undefined || value === null || value === '' || 
          (Array.isArray(value) && value.length === 0)) {
        errors.push(`${field} is required`)
      }
    })

    // Validate FEN string
    if (puzzle.fen) {
      try {
        const chess = new Chess(puzzle.fen)
        if (!chess.isGameOver()) {
          // Valid position
        }
      } catch (error) {
        errors.push('Invalid FEN string')
      }
    }

    // Validate solution moves
    if (puzzle.solution && Array.isArray(puzzle.solution)) {
      if (puzzle.solution.length === 0) {
        errors.push('Solution must contain at least one move')
      }
      // Could add more validation for move format
    }

    // Validate rating range
    if (puzzle.rating !== undefined && (puzzle.rating < 100 || puzzle.rating > 3000)) {
      errors.push('Rating must be between 100 and 3000')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Create a new custom puzzle from form data
   */
  static createPuzzle(formData: CustomPuzzleFormData, authorId: string): CustomPuzzle {
    const now = new Date()
    
    return {
      id: `custom_${Date.now()}`,
      fen: formData.fen,
      solution: formData.solution,
      title: formData.title,
      description: formData.description,
      theme: formData.theme,
      difficulty: formData.difficulty,
      rating: this.estimateRatingFromDifficulty(formData.difficulty),
      moves: formData.solution.length,
      tags: formData.tags,
      source: 'user-created',
      author: {
        id: authorId,
        name: 'Current User', // Would come from auth context
        rating: 1500 // Would come from user profile
      },
      createdAt: now,
      updatedAt: now,
      attemptCount: 0,
      successRate: 0,
      averageTime: 0,
      collectionId: formData.collectionId,
      hint1: formData.hint1,
      hint2: formData.hint2,
      hint3: formData.hint3,
      notes: formData.notes,
      isFeatured: false,
      isBookmarked: false
    }
  }

  /**
   * Estimate puzzle rating based on difficulty level
   */
  private static estimateRatingFromDifficulty(difficulty: string): number {
    const ratingMap = {
      'Beginner': 800,
      'Intermediate': 1400,
      'Advanced': 1800,
      'Expert': 2200
    }
    return ratingMap[difficulty as keyof typeof ratingMap] || 1400
  }

  /**
   * Filter puzzles based on criteria
   */
  static filterPuzzles(
    puzzles: CustomPuzzle[], 
    filters: CustomPuzzleFilters
  ): CustomPuzzle[] {
    return puzzles.filter(puzzle => {
      // Difficulty filter
      if (filters.difficulty && !filters.difficulty.includes(puzzle.difficulty)) {
        return false
      }

      // Theme filter
      if (filters.themes && filters.themes.length > 0) {
        const hasMatchingTheme = filters.themes.some(theme => 
          puzzle.theme.toLowerCase().includes(theme.toLowerCase())
        )
        if (!hasMatchingTheme) return false
      }

      // Rating range filter
      if (filters.rating) {
        if (puzzle.rating < filters.rating.min || puzzle.rating > filters.rating.max) {
          return false
        }
      }

      // Source filter
      if (filters.source && !filters.source.includes(puzzle.source)) {
        return false
      }

      // Tags filter
      if (filters.tags && filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(filterTag =>
          puzzle.tags.some(puzzleTag => 
            puzzleTag.toLowerCase().includes(filterTag.toLowerCase())
          )
        )
        if (!hasMatchingTag) return false
      }

      // Collection filter
      if (filters.collections && filters.collections.length > 0) {
        if (!puzzle.collectionId || !filters.collections.includes(puzzle.collectionId)) {
          return false
        }
      }

      // Author filter
      if (filters.author && !puzzle.author.name.toLowerCase().includes(filters.author.toLowerCase())) {
        return false
      }

      // Date range filter
      if (filters.dateRange) {
        if (puzzle.createdAt < filters.dateRange.start || puzzle.createdAt > filters.dateRange.end) {
          return false
        }
      }

      // Success rate filter
      if (filters.minSuccessRate && puzzle.successRate < filters.minSuccessRate) {
        return false
      }

      // Bookmarked only filter
      if (filters.bookmarkedOnly && !puzzle.isBookmarked) {
        return false
      }

      // Featured only filter
      if (filters.featuredOnly && !puzzle.isFeatured) {
        return false
      }

      return true
    })
  }

  /**
   * Search puzzles with advanced filtering and pagination
   */
  static searchPuzzles(
    puzzles: CustomPuzzle[],
    query: string,
    filters: CustomPuzzleFilters,
    page: number = 1,
    pageSize: number = 20
  ): CustomPuzzleSearchResult {
    const startTime = performance.now()

    // First apply text search
    let filteredPuzzles = puzzles
    if (query.trim()) {
      const lowercaseQuery = query.toLowerCase()
      filteredPuzzles = puzzles.filter(puzzle =>
        puzzle.title.toLowerCase().includes(lowercaseQuery) ||
        puzzle.description.toLowerCase().includes(lowercaseQuery) ||
        puzzle.theme.toLowerCase().includes(lowercaseQuery) ||
        puzzle.author.name.toLowerCase().includes(lowercaseQuery) ||
        puzzle.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
        (puzzle.notes && puzzle.notes.toLowerCase().includes(lowercaseQuery))
      )
    }

    // Apply filters
    filteredPuzzles = this.filterPuzzles(filteredPuzzles, filters)

    // Sort results
    filteredPuzzles = this.sortPuzzles(filteredPuzzles, 'rating', 'desc')

    // Pagination
    const totalCount = filteredPuzzles.length
    const totalPages = Math.ceil(totalCount / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedPuzzles = filteredPuzzles.slice(startIndex, endIndex)

    const executionTime = performance.now() - startTime

    return {
      puzzles: paginatedPuzzles,
      totalCount,
      currentPage: page,
      totalPages,
      appliedFilters: filters,
      searchQuery: query,
      executionTime
    }
  }

  /**
   * Sort puzzles by various criteria
   */
  static sortPuzzles(
    puzzles: CustomPuzzle[],
    sortBy: 'rating' | 'difficulty' | 'created' | 'popularity' | 'random',
    sortOrder: 'asc' | 'desc' = 'desc'
  ): CustomPuzzle[] {
    const sortedPuzzles = [...puzzles]

    switch (sortBy) {
      case 'rating':
        sortedPuzzles.sort((a, b) => 
          sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating
        )
        break

      case 'difficulty':
        const difficultyOrder = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
        sortedPuzzles.sort((a, b) => {
          const aIndex = difficultyOrder.indexOf(a.difficulty)
          const bIndex = difficultyOrder.indexOf(b.difficulty)
          return sortOrder === 'asc' ? aIndex - bIndex : bIndex - aIndex
        })
        break

      case 'created':
        sortedPuzzles.sort((a, b) => 
          sortOrder === 'asc' 
            ? a.createdAt.getTime() - b.createdAt.getTime()
            : b.createdAt.getTime() - a.createdAt.getTime()
        )
        break

      case 'popularity':
        sortedPuzzles.sort((a, b) => 
          sortOrder === 'asc' 
            ? a.attemptCount - b.attemptCount 
            : b.attemptCount - a.attemptCount
        )
        break

      case 'random':
        for (let i = sortedPuzzles.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [sortedPuzzles[i], sortedPuzzles[j]] = [sortedPuzzles[j], sortedPuzzles[i]]
        }
        break
    }

    return sortedPuzzles
  }

  /**
   * Generate import/export data for puzzles
   */
  static exportPuzzlesToPGN(puzzles: CustomPuzzle[]): string {
    return puzzles.map(puzzle => {
      const moves = puzzle.solution.join(' ')
      return `[Event "Custom Puzzle"]
[Site "Chess Training App"]
[Date "${puzzle.createdAt.toISOString().split('T')[0]}"]
[White "${puzzle.author.name}"]
[Black "Puzzle"]
[Result "*"]
[FEN "${puzzle.fen}"]
[SetUp "1"]
[Theme "${puzzle.theme}"]
[Difficulty "${puzzle.difficulty}"]
[Rating "${puzzle.rating}"]

${moves} *`
    }).join('\n\n')
  }

  /**
   * Parse PGN data to create puzzles (simplified)
   */
  static importPuzzlesFromPGN(pgnData: string, authorId: string): CustomPuzzle[] {
    // This is a simplified implementation
    // In a real app, you'd use a proper PGN parser
    const games = pgnData.split(/\n\s*\n/)
    const puzzles: CustomPuzzle[] = []

    games.forEach((game, index) => {
      try {
        // Extract headers
        const headers: any = {}
        const headerRegex = /\[(\w+)\s+"([^"]+)"\]/g
        let match
        while ((match = headerRegex.exec(game)) !== null) {
          headers[match[1]] = match[2]
        }

        // Extract moves (very simplified)
        const movesSection = game.split('\n').find(line => !line.startsWith('[') && line.trim())
        const moves = movesSection?.split(' ').filter(move => 
          move && !move.includes('.') && move !== '*'
        ) || []

        if (headers.FEN && moves.length > 0) {
          const now = new Date()
          puzzles.push({
            id: `imported_${Date.now()}_${index}`,
            fen: headers.FEN,
            solution: moves,
            title: headers.Theme || 'Imported Puzzle',
            description: `Imported puzzle from PGN`,
            theme: headers.Theme || 'Tactics',
            difficulty: headers.Difficulty || 'Intermediate',
            rating: parseInt(headers.Rating) || 1400,
            moves: moves.length,
            tags: ['imported'],
            source: 'imported',
            author: {
              id: authorId,
              name: headers.White || 'Unknown'
            },
            createdAt: now,
            updatedAt: now,
            attemptCount: 0,
            successRate: 0,
            averageTime: 0,
            hint1: 'Look for the key tactical motif',
            hint2: 'Consider all forcing moves',
            hint3: 'Calculate the main variation',
            notes: `Imported on ${now.toLocaleDateString()}`,
            isFeatured: false,
            isBookmarked: false
          })
        }
      } catch (error) {
        console.warn('Failed to parse PGN game:', error)
      }
    })

    return puzzles
  }

  /**
   * Generate sharing URL for a puzzle
   */
  static generateShareableURL(puzzle: CustomPuzzle, baseURL: string = ''): string {
    const encodedData = btoa(JSON.stringify({
      id: puzzle.id,
      title: puzzle.title,
      fen: puzzle.fen,
      solution: puzzle.solution
    }))
    return `${baseURL}/puzzle/shared/${encodedData}`
  }

  /**
   * Parse shared puzzle from URL
   */
  static parseSharedPuzzle(encodedData: string): Partial<CustomPuzzle> | null {
    try {
      const data = JSON.parse(atob(encodedData))
      return {
        id: data.id,
        title: data.title,
        fen: data.fen,
        solution: data.solution
      }
    } catch (error) {
      return null
    }
  }

  /**
   * Calculate collection statistics
   */
  static calculateCollectionStats(puzzles: CustomPuzzle[]): {
    totalPuzzles: number
    averageRating: number
    averageSuccessRate: number
    difficultyDistribution: Record<string, number>
    themeDistribution: Record<string, number>
  } {
    const totalPuzzles = puzzles.length
    if (totalPuzzles === 0) {
      return {
        totalPuzzles: 0,
        averageRating: 0,
        averageSuccessRate: 0,
        difficultyDistribution: {},
        themeDistribution: {}
      }
    }

    const averageRating = puzzles.reduce((sum, p) => sum + p.rating, 0) / totalPuzzles
    const averageSuccessRate = puzzles.reduce((sum, p) => sum + p.successRate, 0) / totalPuzzles

    const difficultyDistribution: Record<string, number> = {}
    const themeDistribution: Record<string, number> = {}

    puzzles.forEach(puzzle => {
      difficultyDistribution[puzzle.difficulty] = (difficultyDistribution[puzzle.difficulty] || 0) + 1
      themeDistribution[puzzle.theme] = (themeDistribution[puzzle.theme] || 0) + 1
    })

    return {
      totalPuzzles,
      averageRating: Math.round(averageRating),
      averageSuccessRate: Math.round(averageSuccessRate),
      difficultyDistribution,
      themeDistribution
    }
  }
}