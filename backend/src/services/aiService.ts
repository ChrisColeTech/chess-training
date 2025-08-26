import { Chess } from 'chess.js';

export class AIService {
  async getBestMove(fen: string, aiLevel: number): Promise<any> {
    const chess = new Chess(fen);
    const moves = chess.moves({ verbose: true });
    
    if (moves.length === 0) {
      throw new Error('No legal moves available');
    }

    // Simple AI implementation for POC
    // In production, this would integrate with Stockfish
    
    switch (aiLevel) {
      case 1:
        return this.getRandomMove(moves);
      case 2:
        return this.getBasicMove(chess, moves);
      case 3:
        return this.getImprovedMove(chess, moves);
      case 4:
        return this.getAdvancedMove(chess, moves);
      case 5:
        return this.getExpertMove(chess, moves);
      default:
        return this.getRandomMove(moves);
    }
  }

  private getRandomMove(moves: any[]) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  private getBasicMove(chess: Chess, moves: any[]) {
    // Level 2: Prefer captures and checks
    const captures = moves.filter(move => move.captured);
    
    if (captures.length > 0) {
      return captures[Math.floor(Math.random() * captures.length)];
    }
    
    // Check for checks
    const checks = moves.filter(move => {
      chess.move(move);
      const isCheck = chess.inCheck();
      chess.undo();
      return isCheck;
    });
    
    if (checks.length > 0) {
      return checks[Math.floor(Math.random() * checks.length)];
    }
    
    return this.getRandomMove(moves);
  }

  private getImprovedMove(chess: Chess, moves: any[]) {
    // Level 3: Basic evaluation with scoring
    const scoredMoves = moves.map(move => {
      let score = 0;
      
      // Material values
      const pieceValues: { [key: string]: number } = { 
        p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 
      };
      
      // Captures
      if (move.captured) {
        score += pieceValues[move.captured] * 10;
        
        // Avoid capturing with more valuable pieces
        if (pieceValues[move.piece] > pieceValues[move.captured]) {
          score -= 2;
        }
      }
      
      // Checks
      chess.move(move);
      if (chess.inCheck()) {
        score += 5;
        
        // Checkmate is even better
        if (chess.isCheckmate()) {
          score += 1000;
        }
      }
      chess.undo();
      
      // Center control
      const centerSquares = ['e4', 'e5', 'd4', 'd5'];
      if (centerSquares.includes(move.to)) {
        score += 2;
      }
      
      // Piece development (knights and bishops to good squares)
      if (move.piece === 'n' || move.piece === 'b') {
        const goodSquares = ['c3', 'd3', 'e3', 'f3', 'c6', 'd6', 'e6', 'f6'];
        if (goodSquares.includes(move.to)) {
          score += 1;
        }
      }
      
      // Avoid moving the same piece multiple times in opening
      if (chess.moveNumber() < 10 && move.piece !== 'p') {
        // This is simplified - in reality you'd track piece movement history
        score -= 0.5;
      }
      
      return { move, score };
    });

    // Sort by score and pick from top moves
    scoredMoves.sort((a, b) => b.score - a.score);
    const topScore = scoredMoves[0].score;
    const bestMoves = scoredMoves.filter(m => m.score >= topScore - 1);
    
    return bestMoves[Math.floor(Math.random() * bestMoves.length)].move;
  }

  private getAdvancedMove(chess: Chess, moves: any[]) {
    // Level 4: Look ahead 1 move and evaluate responses
    const scoredMoves = moves.map(move => {
      chess.move(move);
      let score = this.evaluatePosition(chess);
      
      // Look at opponent's best response
      const opponentMoves = chess.moves({ verbose: true });
      if (opponentMoves.length > 0) {
        let bestOpponentScore = -Infinity;
        
        for (const oppMove of opponentMoves.slice(0, 10)) { // Limit for performance
          chess.move(oppMove);
          const oppScore = this.evaluatePosition(chess);
          bestOpponentScore = Math.max(bestOpponentScore, oppScore);
          chess.undo();
        }
        
        score -= bestOpponentScore;
      }
      
      chess.undo();
      return { move, score };
    });

    scoredMoves.sort((a, b) => b.score - a.score);
    const topScore = scoredMoves[0].score;
    const bestMoves = scoredMoves.filter(m => m.score >= topScore - 2);
    
    return bestMoves[Math.floor(Math.random() * bestMoves.length)].move;
  }

  private getExpertMove(chess: Chess, moves: any[]) {
    // Level 5: Deeper evaluation (simplified for POC)
    // In production, this would use Stockfish with higher depth
    return this.getAdvancedMove(chess, moves);
  }

  private evaluatePosition(chess: Chess): number {
    let score = 0;
    
    // Game state evaluation
    if (chess.isCheckmate()) {
      return chess.turn() === 'w' ? -1000 : 1000;
    }
    
    if (chess.isDraw()) {
      return 0;
    }
    
    // Material count
    const pieceValues: { [key: string]: number } = { 
      p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 
    };
    
    const board = chess.board();
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = board[row][col];
        if (square) {
          const value = pieceValues[square.type] || 0;
          if (square.color === 'w') {
            score += value;
          } else {
            score -= value;
          }
        }
      }
    }
    
    // Positional factors
    const moves = chess.moves();
    score += moves.length * 0.1; // Mobility
    
    if (chess.inCheck()) {
      score += chess.turn() === 'w' ? -0.5 : 0.5;
    }
    
    return score;
  }
}