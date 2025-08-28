import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { Lightbulb, ArrowLeft, ArrowRight, SkipForward, Target, Clock, Trophy, CheckCircle, XCircle, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useThemeStore } from '@/stores/themeStore'
import { soundFX } from '@/utils/soundEffects'

// Mock puzzle data - realistic tactical puzzles
const mockPuzzles = [
  {
    id: 1,
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['Qxf7#'],
    theme: 'Back Rank Mate',
    difficulty: 'Beginner',
    rating: 1200,
    moves: 1,
    description: 'White to move and checkmate in 1',
    hint1: 'Look for a forcing move that attacks the king',
    hint2: 'The black king has no escape squares',
    hint3: 'Queen takes f7 is checkmate!'
  },
  {
    id: 2,
    fen: 'rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
    solution: ['d4', 'cxd4'],
    theme: 'Fork',
    difficulty: 'Intermediate',
    rating: 1500,
    moves: 2,
    description: 'Black to move and win material',
    hint1: 'Look for a pawn move that attacks two pieces',
    hint2: 'The d4 pawn can create a fork',
    hint3: 'Play d4 to fork the knight and bishop'
  },
  {
    id: 3,
    fen: 'r3k2r/ppp2ppp/2n1bn2/2bpp3/2B1P3/3P1N2/PPP2PPP/RNBQ1RK1 w kq - 0 8',
    solution: ['Bxf7+', 'Kxf7', 'Ng5+'],
    theme: 'Discovered Attack',
    difficulty: 'Advanced',
    rating: 1800,
    moves: 3,
    description: 'White to move and win the queen',
    hint1: 'Look for a sacrifice that opens up lines',
    hint2: 'The bishop on c4 can sacrifice itself',
    hint3: 'After Bxf7+ Kxf7, Ng5+ wins the queen'
  }
]

type PuzzleStatus = 'unsolved' | 'solved' | 'failed'

export const TacticalPuzzlesPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0)
  const [game, setGame] = useState(new Chess())
  const [boardPosition, setBoardPosition] = useState('')
  const [moveCount, setMoveCount] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [status, setStatus] = useState<PuzzleStatus>('unsolved')
  const [showHint, setShowHint] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [userMoves, setUserMoves] = useState<string[]>([])

  const currentPuzzle = mockPuzzles[currentPuzzleIndex]

  // Initialize puzzle
  useEffect(() => {
    const chess = new Chess(currentPuzzle.fen)
    setGame(chess)
    setBoardPosition(currentPuzzle.fen)
    setMoveCount(0)
    setHintsUsed(0)
    setStatus('unsolved')
    setShowHint(false)
    setTimeElapsed(0)
    setIsTimerActive(true)
    setUserMoves([])
  }, [currentPuzzleIndex])

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerActive && status === 'unsolved') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerActive, status])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Always promote to queen for simplicity
    })

    if (move === null) {
      soundFX.playError()
      return false
    }

    const newMoves = [...userMoves, move.san]
    setUserMoves(newMoves)
    setMoveCount(prev => prev + 1)
    setBoardPosition(game.fen())

    // Check if move matches solution
    const solutionMove = currentPuzzle.solution[newMoves.length - 1]
    
    if (move.san === solutionMove) {
      if (newMoves.length === currentPuzzle.solution.length) {
        // Puzzle solved!
        setStatus('solved')
        setIsTimerActive(false)
        soundFX.playSuccess()
      } else {
        // Correct move, continue
        soundFX.playClick()
      }
    } else {
      // Wrong move
      setStatus('failed')
      setIsTimerActive(false)
      soundFX.playError()
    }

    return true
  }

  const resetPuzzle = () => {
    const chess = new Chess(currentPuzzle.fen)
    setGame(chess)
    setBoardPosition(currentPuzzle.fen)
    setMoveCount(0)
    setStatus('unsolved')
    setTimeElapsed(0)
    setIsTimerActive(true)
    setUserMoves([])
    soundFX.playClick()
  }

  const nextPuzzle = () => {
    if (currentPuzzleIndex < mockPuzzles.length - 1) {
      setCurrentPuzzleIndex(prev => prev + 1)
      soundFX.playClick()
    }
  }

  const previousPuzzle = () => {
    if (currentPuzzleIndex > 0) {
      setCurrentPuzzleIndex(prev => prev - 1)
      soundFX.playClick()
    }
  }

  const showNextHint = () => {
    if (hintsUsed < 3) {
      setHintsUsed(prev => prev + 1)
      setShowHint(true)
      soundFX.playClick()
    }
  }

  const getCurrentHint = () => {
    switch (hintsUsed) {
      case 1: return currentPuzzle.hint1
      case 2: return currentPuzzle.hint2
      case 3: return currentPuzzle.hint3
      default: return ''
    }
  }

  const skipPuzzle = () => {
    setStatus('failed')
    setIsTimerActive(false)
    soundFX.playError()
  }

  return (
    <div className={`min-h-screen p-4 transition-all duration-300 ${theme.background} ${theme.text}`}>
      {/* Floating particles effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 ${theme.accent} rounded-full opacity-20 animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className={`${theme.glassMorphism} hover:${theme.accent}/20`}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className={`text-3xl font-bold ${theme.gradient}`}>
                Tactical Puzzles
              </h1>
              <p className={`${theme.secondary} mt-1`}>
                Solve chess puzzles to improve your tactical vision
              </p>
            </div>
          </div>

          {/* Timer and stats */}
          <div className="flex items-center gap-4">
            <Card className={`${theme.glassMorphism} border-0`}>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(timeElapsed)}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`${theme.glassMorphism} border-0`}>
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>{currentPuzzleIndex + 1} / {mockPuzzles.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chess board */}
          <div className="xl:col-span-2">
            <Card className={`${theme.glassMorphism} border-0 p-6`}>
              <div className="aspect-square max-w-2xl mx-auto">
                <Chessboard
                  position={boardPosition}
                  onPieceDrop={onDrop}
                  boardOrientation="white"
                  customBoardStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  }}
                  customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
                  customDarkSquareStyle={{ backgroundColor: '#b58863' }}
                />
              </div>

              {/* Board controls */}
              <div className="flex justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={previousPuzzle}
                  disabled={currentPuzzleIndex === 0}
                  className={`${theme.glassMorphism} border-0`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetPuzzle}
                  className={`${theme.glassMorphism} border-0`}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={skipPuzzle}
                  className={`${theme.glassMorphism} border-0`}
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPuzzle}
                  disabled={currentPuzzleIndex === mockPuzzles.length - 1}
                  className={`${theme.glassMorphism} border-0`}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Puzzle info and controls */}
          <div className="space-y-6">
            {/* Puzzle details */}
            <Card className={`${theme.glassMorphism} border-0`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Puzzle #{currentPuzzle.id}
                  </CardTitle>
                  <Badge variant="secondary" className={theme.glassMorphism}>
                    {currentPuzzle.difficulty}
                  </Badge>
                </div>
                <CardDescription>{currentPuzzle.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Theme:</span>
                  <Badge variant="outline">{currentPuzzle.theme}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Rating:</span>
                  <span className="font-mono">{currentPuzzle.rating}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Moves:</span>
                  <span>{currentPuzzle.moves}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Your moves:</span>
                  <span>{moveCount}</span>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            {status !== 'unsolved' && (
              <Card className={`${theme.glassMorphism} border-0`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {status === 'solved' ? (
                      <>
                        <CheckCircle className={`w-6 h-6 ${theme.success}`} />
                        <div>
                          <p className={`font-semibold ${theme.success}`}>Solved!</p>
                          <p className="text-sm opacity-75">
                            Time: {formatTime(timeElapsed)} | Hints: {hintsUsed}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className={`w-6 h-6 ${theme.destructive}`} />
                        <div>
                          <p className={`font-semibold ${theme.destructive}`}>Try again!</p>
                          <p className="text-sm opacity-75">
                            Solution: {currentPuzzle.solution.join(' ')}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Hints */}
            <Card className={`${theme.glassMorphism} border-0`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Hints ({hintsUsed}/3)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {showHint && hintsUsed > 0 && (
                  <div className={`p-3 rounded-lg ${theme.accent}/10`}>
                    <p className="text-sm">{getCurrentHint()}</p>
                  </div>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={showNextHint}
                  disabled={hintsUsed >= 3 || status !== 'unsolved'}
                  className={`w-full ${theme.glassMorphism} border-0`}
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Get Hint ({hintsUsed + 1}/3)
                </Button>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card className={`${theme.glassMorphism} border-0`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Puzzles completed</span>
                    <span>{currentPuzzleIndex} / {mockPuzzles.length}</span>
                  </div>
                  <Progress 
                    value={(currentPuzzleIndex / mockPuzzles.length) * 100} 
                    className={`h-2 ${theme.glassMorphism}`}
                  />
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${theme.accent}`}>87%</div>
                    <div className="text-xs opacity-75">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${theme.accent}`}>1,247</div>
                    <div className="text-xs opacity-75">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${theme.accent}`}>42</div>
                    <div className="text-xs opacity-75">Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TacticalPuzzlesPage