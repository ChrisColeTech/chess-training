import { Chess } from 'chess.js'
import type { 
  GameState, 
  GameSetup, 
  ChessMove, 
  GameResult,
  AIMoveResult,
  GameAnalysis,
  PerformanceStats,
  RatingChange
} from '@/types/playComputer'

/**
 * Service class for computer chess game business logic
 * Handles game state management, AI move generation, and analysis
 */
export class PlayComputerService {
  private static chess: Chess = new Chess()

  /**
   * Initialize a new game with the given setup
   */
  static initializeGame(setup: GameSetup): GameState {
    const gameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    this.chess.reset()

    // Determine player color
    let playerColor: 'white' | 'black' = setup.playerColor === 'random' 
      ? Math.random() < 0.5 ? 'white' : 'black'
      : setup.playerColor

    const initialTime = setup.timeControl.initialTime * 60 * 1000 // Convert to milliseconds

    return {
      gameId,
      setup,
      position: this.chess.fen(),
      moves: [],
      status: 'active',
      result: 'ongoing',
      currentTurn: 'white',
      timeRemaining: {
        white: initialTime,
        black: initialTime
      },
      inCheck: false,
      legalMoves: this.chess.moves(),
      startTime: Date.now(),
      aiThinking: playerColor === 'black' // AI starts thinking if it plays white
    }
  }

  /**
   * Validate and make a player move
   */
  static makePlayerMove(
    gameState: GameState, 
    from: string, 
    to: string, 
    promotion?: string
  ): { success: boolean; updatedState?: GameState; error?: string } {
    try {
      // Load current position
      this.chess.load(gameState.position)

      // Attempt the move
      const move = this.chess.move({
        from,
        to,
        promotion: promotion || 'q'
      })

      if (!move) {
        return { success: false, error: 'Invalid move' }
      }

      // Create chess move object
      const chessMove: ChessMove = {
        from,
        to,
        piece: move.piece,
        captured: move.captured,
        san: move.san,
        moveNumber: Math.ceil(gameState.moves.length / 2) + 1,
        color: move.color === 'w' ? 'white' : 'black',
        timestamp: Date.now(),
        timeRemaining: gameState.timeRemaining[move.color === 'w' ? 'white' : 'black']
      }

      // Update game state
      const updatedState: GameState = {
        ...gameState,
        position: this.chess.fen(),
        moves: [...gameState.moves, chessMove],
        currentTurn: this.chess.turn() as 'white' | 'black',
        inCheck: this.chess.inCheck(),
        legalMoves: this.chess.moves(),
        lastMove: chessMove,
        aiThinking: !this.chess.isGameOver()
      }

      // Check for game over
      if (this.chess.isGameOver()) {
        updatedState.status = 'completed'
        updatedState.result = this.determineGameResult()
        updatedState.endTime = Date.now()
        updatedState.aiThinking = false
      }

      return { success: true, updatedState }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
  }

  /**
   * Generate an AI move for the given position
   */
  static async generateAIMove(
    gameState: GameState
  ): Promise<{ success: boolean; move?: ChessMove; updatedState?: GameState; error?: string }> {
    try {
      // Simulate thinking time based on difficulty
      const thinkingTime = this.calculateAIThinkingTime(gameState.setup.opponent.difficulty)
      await new Promise(resolve => setTimeout(resolve, thinkingTime))

      // Load current position
      this.chess.load(gameState.position)

      // Generate AI move based on difficulty and personality
      const aiMoveResult = await this.calculateAIMove(gameState)
      
      if (!aiMoveResult) {
        return { success: false, error: 'AI could not generate a move' }
      }

      // Make the move
      const move = this.chess.move({
        from: aiMoveResult.move.from,
        to: aiMoveResult.move.to,
        promotion: 'q'
      })

      if (!move) {
        return { success: false, error: 'AI generated invalid move' }
      }

      // Create chess move object
      const chessMove: ChessMove = {
        from: aiMoveResult.move.from,
        to: aiMoveResult.move.to,
        piece: move.piece,
        captured: move.captured,
        san: move.san,
        moveNumber: Math.ceil(gameState.moves.length / 2) + 1,
        color: move.color === 'w' ? 'white' : 'black',
        timestamp: Date.now(),
        timeRemaining: gameState.timeRemaining[move.color === 'w' ? 'white' : 'black'],
        evaluation: {
          score: aiMoveResult.evaluation,
          bestMove: aiMoveResult.move.san,
          depth: aiMoveResult.depth
        }
      }

      // Update game state
      const updatedState: GameState = {
        ...gameState,
        position: this.chess.fen(),
        moves: [...gameState.moves, chessMove],
        currentTurn: this.chess.turn() as 'white' | 'black',
        inCheck: this.chess.inCheck(),
        legalMoves: this.chess.moves(),
        lastMove: chessMove,
        aiThinking: false
      }

      // Check for game over
      if (this.chess.isGameOver()) {
        updatedState.status = 'completed'
        updatedState.result = this.determineGameResult()
        updatedState.endTime = Date.now()
      }

      return { success: true, move: chessMove, updatedState }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'AI move generation failed' 
      }
    }
  }

  /**
   * Calculate AI thinking time based on difficulty
   */
  private static calculateAIThinkingTime(difficulty: string): number {
    const baseTimes = {
      'Novice': 500,
      'Intermediate': 800,
      'Advanced': 1200,
      'Expert': 1800,
      'Grandmaster': 2500
    }
    
    const baseTime = baseTimes[difficulty as keyof typeof baseTimes] || 1000
    // Add some randomness to make it feel more human
    return baseTime + Math.random() * 500
  }

  /**
   * Calculate the best AI move based on difficulty and personality
   */
  private static async calculateAIMove(gameState: GameState): Promise<AIMoveResult | null> {
    const { opponent } = gameState.setup
    const moves = this.chess.moves({ verbose: true })
    
    if (moves.length === 0) return null

    // Simple AI implementation - would integrate with Stockfish in production
    let selectedMove = moves[Math.floor(Math.random() * moves.length)]
    let evaluation = Math.random() * 2 - 1 // Random evaluation between -1 and 1
    let depth = 1

    // Adjust move selection based on difficulty and personality
    switch (opponent.difficulty) {
      case 'Novice':
        // Random moves, occasionally good ones
        if (Math.random() > 0.7) {
          selectedMove = this.findBestMoveSimple(moves)
          evaluation = 0.5
        }
        depth = 1
        break
        
      case 'Intermediate':
        // Mix of random and good moves
        if (Math.random() > 0.4) {
          selectedMove = this.findBestMoveSimple(moves)
          evaluation = 0.3
        }
        depth = 3
        break
        
      case 'Advanced':
        // Mostly good moves
        if (Math.random() > 0.2) {
          selectedMove = this.findBestMoveSimple(moves)
          evaluation = 0.1
        }
        depth = 5
        break
        
      case 'Expert':
        // Very good moves with occasional brilliancies
        selectedMove = this.findBestMoveSimple(moves)
        if (Math.random() > 0.8) {
          evaluation = 0.8 // Brilliant move
        }
        depth = 8
        break
        
      case 'Grandmaster':
        // Near-perfect play
        selectedMove = this.findBestMoveSimple(moves)
        evaluation = 0.9
        depth = 12
        break
    }

    // Apply personality adjustments
    selectedMove = this.applyPersonalityToMove(selectedMove, moves, opponent.personality)

    return {
      move: {
        from: selectedMove.from,
        to: selectedMove.to,
        piece: selectedMove.piece,
        captured: selectedMove.captured,
        san: selectedMove.san,
        moveNumber: Math.ceil(gameState.moves.length / 2) + 1,
        color: selectedMove.color === 'w' ? 'white' : 'black',
        timestamp: Date.now(),
        timeRemaining: gameState.timeRemaining[selectedMove.color === 'w' ? 'white' : 'black']
      },
      confidence: Math.random() * 0.3 + 0.7, // 0.7-1.0 confidence
      calculationTime: this.calculateAIThinkingTime(opponent.difficulty),
      evaluation,
      depth
    }
  }

  /**
   * Simple move evaluation (would be replaced with Stockfish in production)
   */
  private static findBestMoveSimple(moves: any[]): any {
    // Prioritize captures, checks, and center moves
    let bestMove = moves[0]
    let bestScore = 0

    moves.forEach(move => {
      let score = Math.random() * 0.1 // Base randomness
      
      // Prioritize captures
      if (move.captured) {
        const pieceValues = { 'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 0 }
        score += pieceValues[move.captured as keyof typeof pieceValues] || 0
      }
      
      // Prioritize checks
      if (move.san.includes('+')) {
        score += 0.5
      }
      
      // Prioritize center squares
      const centerSquares = ['d4', 'd5', 'e4', 'e5']
      if (centerSquares.includes(move.to)) {
        score += 0.3
      }
      
      // Prioritize piece development
      if (['n', 'b'].includes(move.piece) && 
          ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
           'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'].includes(move.from)) {
        score += 0.2
      }

      if (score > bestScore) {
        bestScore = score
        bestMove = move
      }
    })

    return bestMove
  }

  /**
   * Apply personality traits to move selection
   */
  private static applyPersonalityToMove(selectedMove: any, allMoves: any[], personality: string): any {
    switch (personality) {
      case 'Aggressive':
        // Prefer attacking moves and sacrifices
        const attackingMoves = allMoves.filter(m => 
          m.captured || m.san.includes('+') || m.san.includes('#')
        )
        if (attackingMoves.length > 0 && Math.random() > 0.3) {
          return attackingMoves[Math.floor(Math.random() * attackingMoves.length)]
        }
        break
        
      case 'Defensive':
        // Prefer safe, solid moves
        const safeMoves = allMoves.filter(m => !m.captured && !m.san.includes('+'))
        if (safeMoves.length > 0 && Math.random() > 0.4) {
          return safeMoves[Math.floor(Math.random() * safeMoves.length)]
        }
        break
        
      case 'Tactical':
        // Prefer moves that create tactical threats
        const tacticalMoves = allMoves.filter(m => 
          m.san.includes('+') || m.piece === 'n' || m.piece === 'b'
        )
        if (tacticalMoves.length > 0 && Math.random() > 0.2) {
          return tacticalMoves[Math.floor(Math.random() * tacticalMoves.length)]
        }
        break
        
      case 'Positional':
        // Prefer moves that improve position
        const positionalMoves = allMoves.filter(m => 
          ['d4', 'd5', 'e4', 'e5', 'c4', 'c5', 'f4', 'f5'].includes(m.to)
        )
        if (positionalMoves.length > 0 && Math.random() > 0.3) {
          return positionalMoves[Math.floor(Math.random() * positionalMoves.length)]
        }
        break
        
      case 'Unorthodox':
        // Prefer unusual, creative moves
        const unusualMoves = allMoves.filter(m => 
          !['e4', 'e5', 'd4', 'd5', 'Nf3', 'Nf6'].includes(m.san)
        )
        if (unusualMoves.length > 0 && Math.random() > 0.4) {
          return unusualMoves[Math.floor(Math.random() * unusualMoves.length)]
        }
        break
    }
    
    return selectedMove
  }

  /**
   * Determine the game result
   */
  private static determineGameResult(): GameResult {
    if (this.chess.isCheckmate()) {
      return this.chess.turn() === 'w' ? 'black_wins' : 'white_wins'
    } else if (this.chess.isDraw() || this.chess.isStalemate() || 
               this.chess.isThreefoldRepetition() || this.chess.isInsufficientMaterial()) {
      return 'draw'
    }
    return 'ongoing'
  }

  /**
   * Analyze the current position
   */
  static analyzePosition(gameState: GameState): GameAnalysis {
    this.chess.load(gameState.position)
    
    const position = gameState.position.split(' ')[0]
    let materialBalance = 0
    
    // Calculate material balance
    const pieceValues = { 'q': 9, 'Q': -9, 'r': 5, 'R': -5, 'b': 3, 'B': -3, 'n': 3, 'N': -3, 'p': 1, 'P': -1 }
    for (const char of position) {
      materialBalance += pieceValues[char as keyof typeof pieceValues] || 0
    }

    // Simple position evaluation
    const evaluation = materialBalance + Math.random() * 0.5 - 0.25
    
    // Determine opening
    const moveCount = gameState.moves.length
    const openingMoves = gameState.moves.slice(0, Math.min(10, moveCount)).map(m => m.san)
    const openingName = this.identifyOpening(openingMoves)

    return {
      evaluation,
      bestMoves: this.chess.moves().slice(0, 3),
      positionAnalysis: {
        materialBalance,
        kingSafety: this.chess.inCheck() ? 'Critical' : 'Safe',
        centerControl: materialBalance > 0.5 ? 'White' : materialBalance < -0.5 ? 'Black' : 'Equal',
        pawnStructure: 'Average' // Simplified
      },
      tacticalThemes: this.identifyTacticalThemes(),
      opening: {
        name: openingName.name,
        eco: openingName.eco,
        moves: openingMoves
      }
    }
  }

  /**
   * Identify the opening from move sequence
   */
  private static identifyOpening(moves: string[]): { name: string; eco: string } {
    const moveString = moves.join(' ')
    
    if (moveString.includes('e4 e5 Nf3 Nc6 Bc4')) {
      return { name: 'Italian Game', eco: 'C50' }
    } else if (moveString.includes('e4 c5')) {
      return { name: 'Sicilian Defense', eco: 'B20' }
    } else if (moveString.includes('d4 d5')) {
      return { name: 'Queen\'s Gambit', eco: 'D06' }
    } else if (moveString.includes('e4 e6')) {
      return { name: 'French Defense', eco: 'C00' }
    } else if (moveString.includes('e4')) {
      return { name: 'King\'s Pawn Opening', eco: 'B00' }
    } else if (moveString.includes('d4')) {
      return { name: 'Queen\'s Pawn Opening', eco: 'D00' }
    }
    
    return { name: 'Unknown Opening', eco: 'A00' }
  }

  /**
   * Identify tactical themes in position
   */
  private static identifyTacticalThemes(): string[] {
    const themes: string[] = []
    
    if (this.chess.inCheck()) {
      themes.push('Check')
    }
    
    const moves = this.chess.moves({ verbose: true })
    const hasCaptureMove = moves.some(m => m.captured)
    const hasFork = moves.some(m => m.piece === 'n' && m.captured)
    
    if (hasCaptureMove) themes.push('Capture')
    if (hasFork) themes.push('Fork')
    
    // Add more sophisticated tactical detection here
    return themes
  }

  /**
   * Calculate rating change after game
   */
  static calculateRatingChange(
    playerRating: number,
    opponentRating: number,
    result: GameResult,
    playerColor: 'white' | 'black'
  ): RatingChange {
    const K = 32 // Rating change factor
    const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400))
    
    let actualScore: number
    if (result === 'white_wins' && playerColor === 'white' || 
        result === 'black_wins' && playerColor === 'black') {
      actualScore = 1
    } else if (result === 'draw') {
      actualScore = 0.5
    } else {
      actualScore = 0
    }
    
    const change = Math.round(K * (actualScore - expectedScore))
    const newRating = playerRating + change
    
    return {
      oldRating: playerRating,
      newRating,
      change,
      reason: actualScore === 1 ? 'win' : actualScore === 0.5 ? 'draw' : 'loss'
    }
  }

  /**
   * Generate performance statistics
   */
  static generatePerformanceStats(): PerformanceStats {
    // This would typically come from a database or storage
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesDrawn: 0,
      gamesLost: 0,
      winRate: 0,
      avgGameLength: 0,
      avgGameDuration: 0,
      currentRating: 1200,
      peakRating: 1200,
      gamesByDifficulty: {
        'Novice': 0,
        'Intermediate': 0,
        'Advanced': 0,
        'Expert': 0,
        'Grandmaster': 0
      },
      timeControlStats: {
        'Blitz': { played: 0, won: 0, winRate: 0 },
        'Rapid': { played: 0, won: 0, winRate: 0 },
        'Classical': { played: 0, won: 0, winRate: 0 },
        'Unlimited': { played: 0, won: 0, winRate: 0 }
      },
      recentGames: []
    }
  }

  /**
   * Format game time for display
   */
  static formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  /**
   * Validate game setup
   */
  static validateGameSetup(setup: Partial<GameSetup>): boolean {
    return !!(
      setup.opponent &&
      setup.playerColor &&
      setup.timeControl
    )
  }
}