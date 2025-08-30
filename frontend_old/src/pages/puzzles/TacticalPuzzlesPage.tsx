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
import { usePuzzlesPage } from '@/hooks/pages/usePuzzlesPage'

type PuzzleStatus = 'unsolved' | 'solved' | 'failed'

export const TacticalPuzzlesPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  // API hooks for puzzle data
  const { 
    useCategoryPuzzles,
    isLoading: isLoadingPuzzles,
    error: puzzleError
  } = usePuzzlesPage()
  
  const { 
    data: tacticalPuzzles, 
    isLoading: isLoadingTactical, 
    error: tacticalError 
  } = useCategoryPuzzles('tactics')

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

  const currentPuzzle = tacticalPuzzles?.puzzles?.[currentPuzzleIndex]

  // Initialize puzzle
  useEffect(() => {
    if (!currentPuzzle) return
    
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
  }, [currentPuzzleIndex, currentPuzzle])

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
    if (!currentPuzzle?.solution) return true
    
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
    if (!currentPuzzle) return
    
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
    if (tacticalPuzzles && currentPuzzleIndex < tacticalPuzzles.puzzles.length - 1) {
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
    if (!currentPuzzle?.hints) return ''
    return currentPuzzle.hints[hintsUsed - 1] || ''
  }

  const skipPuzzle = () => {
    setStatus('failed')
    setIsTimerActive(false)
    soundFX.playError()
  }

  // Loading state
  if (isLoadingPuzzles || isLoadingTactical) {
    return (
      <div className={`min-h-full`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading tactical puzzles...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (puzzleError || tacticalError) {
    return (
      <div className={`min-h-full`}>
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load puzzles</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  // No puzzles available
  if (!tacticalPuzzles?.puzzles || tacticalPuzzles.puzzles.length === 0) {
    return (
      <div className={`min-h-full`}>
        <div className="text-center">
          <p className="mb-4">No tactical puzzles available</p>
          <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-full`}>

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
                  <span>{currentPuzzleIndex + 1} / {tacticalPuzzles.puzzles.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chess board - Prominent & Board-Centric (70% width) */}
          <div className="lg:w-[70%] flex justify-center">
            <Card className={`${theme.glassMorphism} border-0 p-2 w-full max-w-none`}>
              <div className="aspect-square max-w-2xl mx-auto">
                <Chessboard
                  position={boardPosition}
                  onPieceDrop={onDrop}
                  boardOrientation="white"
                  customBoardStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  }}
                  customLightSquareStyle={{ 
                    backgroundColor: '#f0d9b5',
                    transition: 'background-color 0.2s ease'
                  }}
                  customDarkSquareStyle={{ 
                    backgroundColor: '#b58863',
                    transition: 'background-color 0.2s ease'
                  }}
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
                  disabled={currentPuzzleIndex === tacticalPuzzles.puzzles.length - 1}
                  className={`${theme.glassMorphism} border-0`}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Puzzle info and controls - Compact Side Panel (30% width) */}
          <div className="lg:w-[30%] lg:max-w-sm space-y-6">
            {/* Puzzle details */}
            <Card className={`${theme.glassMorphism} border-0`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Puzzle #{currentPuzzle.id || currentPuzzleIndex + 1}
                  </CardTitle>
                  <Badge variant="secondary" className={theme.glassMorphism}>
                    {currentPuzzle.difficulty || 'Unknown'}
                  </Badge>
                </div>
                <CardDescription>{currentPuzzle.description || 'Solve this tactical puzzle'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Theme:</span>
                  <Badge variant="outline">{currentPuzzle.category || 'Tactics'}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Rating:</span>
                  <span className="font-mono">{currentPuzzle.rating || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Moves:</span>
                  <span>{currentPuzzle.solution?.length || 'N/A'}</span>
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
                            Solution: {currentPuzzle.solution?.join(' ') || 'N/A'}
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
                    <span>{currentPuzzleIndex} / {tacticalPuzzles.puzzles.length}</span>
                  </div>
                  <Progress 
                    value={(currentPuzzleIndex / tacticalPuzzles.puzzles.length) * 100} 
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