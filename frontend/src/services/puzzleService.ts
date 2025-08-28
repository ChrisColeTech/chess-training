import { Chess } from 'chess.js'
import type { OpeningPuzzle, MoveValidationResult } from '@/types/openingPuzzles'

/**
 * Service class for puzzle-related business logic
 * Handles move validation, puzzle scoring, and game state management
 */
export class PuzzleService {
  /**
   * Validate a chess move and determine if it matches the expected solution
   */
  static validateMove(
    game: Chess,
    sourceSquare: string,
    targetSquare: string,
    expectedMove: string
  ): MoveValidationResult {
    try {
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
          error: 'Invalid chess move'
        }
      }

      // Check if move matches expected solution
      const isCorrect = move.san === expectedMove

      return {
        isValid: true,
        isCorrect,
        isComplete: false, // Will be determined by calling code
        move
      }
    } catch (error) {
      return {
        isValid: false,
        isCorrect: false,
        isComplete: false,
        error: error instanceof Error ? error.message : 'Unknown error'
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
    isCompleted: boolean
  ): number {
    if (!isCompleted) return 0

    let baseScore = puzzleRating

    // Time penalty (lose points for taking longer)
    // Assume optimal time is 30 seconds per 100 rating points
    const optimalTime = (puzzleRating / 100) * 30
    const timePenalty = Math.max(0, timeElapsed - optimalTime) * 0.5
    baseScore -= timePenalty

    // Hint penalty (lose 10% per hint used)
    const hintPenalty = hintsUsed * 0.1
    baseScore *= (1 - hintPenalty)

    // Minimum score is 10% of puzzle rating
    return Math.max(puzzleRating * 0.1, baseScore)
  }

  /**
   * Get performance rating based on score
   */
  static getPerformanceRating(
    score: number,
    puzzleRating: number
  ): 'Excellent' | 'Good' | 'Fair' | 'Poor' {
    const percentage = score / puzzleRating

    if (percentage >= 0.9) return 'Excellent'
    if (percentage >= 0.7) return 'Good'
    if (percentage >= 0.5) return 'Fair'
    return 'Poor'
  }

  /**
   * Generate next puzzle suggestion based on performance
   */
  static suggestNextPuzzleDifficulty(
    currentDifficulty: string,
    recentScores: number[],
    recentRatings: number[]
  ): string {
    if (recentScores.length === 0) return currentDifficulty

    // Calculate average performance over recent puzzles
    const avgPerformance = recentScores.reduce((sum, score, index) => {
      return sum + (score / recentRatings[index])
    }, 0) / recentScores.length

    // Suggest difficulty based on performance
    if (avgPerformance > 0.85) {
      // Excellent performance, suggest harder puzzles
      if (currentDifficulty === 'Beginner') return 'Intermediate'
      if (currentDifficulty === 'Intermediate') return 'Advanced'
      return 'Advanced'
    } else if (avgPerformance < 0.5) {
      // Poor performance, suggest easier puzzles
      if (currentDifficulty === 'Advanced') return 'Intermediate'
      if (currentDifficulty === 'Intermediate') return 'Beginner'
      return 'Beginner'
    }

    // Maintain current difficulty
    return currentDifficulty
  }

  /**
   * Analyze puzzle position for key characteristics
   */
  static analyzePuzzlePosition(fen: string): {
    materialBalance: number
    kingSafety: 'Safe' | 'Exposed' | 'Critical'
    centerControl: 'White' | 'Black' | 'Equal'
    developmentAdvantage: 'White' | 'Black' | 'Equal'
  } {
    
    // Basic material counting
    const pieces = fen.split(' ')[0]
    let materialBalance = 0
    
    for (const char of pieces) {
      const pieceValues: { [key: string]: number } = {
        'q': 9, 'Q': -9, 'r': 5, 'R': -5, 'b': 3, 'B': -3,
        'n': 3, 'N': -3, 'p': 1, 'P': -1
      }
      materialBalance += pieceValues[char] || 0
    }

    // Simple king safety assessment (placeholder)
    const kingSafety: 'Safe' | 'Exposed' | 'Critical' = 'Safe' // Would need more complex analysis

    // Simple center control assessment (placeholder)
    const centerControl: 'White' | 'Black' | 'Equal' = 'Equal' // Would need to analyze e4, e5, d4, d5

    // Simple development assessment (placeholder)
    const developmentAdvantage: 'White' | 'Black' | 'Equal' = 'Equal' // Would need to count developed pieces

    return {
      materialBalance,
      kingSafety,
      centerControl,
      developmentAdvantage
    }
  }

  /**
   * Format puzzle statistics for display
   */
  static formatPuzzleStats(
    completed: number,
    total: number,
    averageTime: number,
    accuracy: number
  ): {
    completionRate: string
    averageTimeFormatted: string
    accuracyFormatted: string
    progressPercentage: number
  } {
    const progressPercentage = (completed / total) * 100
    const completionRate = `${completed}/${total}`
    
    const minutes = Math.floor(averageTime / 60)
    const seconds = averageTime % 60
    const averageTimeFormatted = `${minutes}:${seconds.toString().padStart(2, '0')}`
    
    const accuracyFormatted = `${Math.round(accuracy)}%`

    return {
      completionRate,
      averageTimeFormatted,
      accuracyFormatted,
      progressPercentage
    }
  }

  /**
   * Generate hint based on puzzle position and difficulty
   */
  static generateHint(
    puzzle: OpeningPuzzle,
    hintLevel: 1 | 2 | 3,
    _currentMoveIndex: number
  ): string {
    // Use the pre-defined hints from the puzzle data
    switch (hintLevel) {
      case 1:
        return puzzle.hint1
      case 2:
        return puzzle.hint2
      case 3:
        return puzzle.hint3
      default:
        return puzzle.hint1
    }
  }

  /**
   * Validate puzzle data structure
   */
  static validatePuzzleData(puzzle: Partial<OpeningPuzzle>): boolean {
    const requiredFields = [
      'id', 'fen', 'solution', 'opening', 'difficulty',
      'description', 'theory', 'hint1', 'hint2', 'hint3'
    ]

    return requiredFields.every(field => {
      const value = puzzle[field as keyof OpeningPuzzle]
      return value !== undefined && value !== null && value !== ''
    })
  }
}