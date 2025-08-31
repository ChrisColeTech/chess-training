import type { ReactNode } from 'react'

export interface PlayerInfo {
  name: string
  avatar?: string | ReactNode
  color: 'white' | 'black'
  rating?: number
  isAI: boolean
  aiLevel?: number
}

export interface TimerInfo {
  remaining: number // seconds
  format: string // formatted time string
  isActive: boolean
}

export interface GameStatus {
  isPlayerTurn: boolean
  gameState: 'active' | 'paused' | 'completed'
  lastMove?: string
}

export interface MoveHint {
  move: string // "Nf3", "d4", etc.
  evaluation: number // Position evaluation (centipawns)
  explanation: string // "Develops piece, Controls center"
  rank: number // 1, 2, 3 (best to worst)
}

export interface GameHints {
  bestMoves: MoveHint[]
  currentEvaluation: number
  suggestion: string
  position: {
    phase: 'opening' | 'middlegame' | 'endgame'
    material: { white: number, black: number }
  }
}