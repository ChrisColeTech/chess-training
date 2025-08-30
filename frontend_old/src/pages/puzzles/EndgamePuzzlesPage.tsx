import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { ArrowLeft, ArrowRight, BookOpen, Clock, Trophy, Star, CheckCircle, XCircle, RefreshCw, Target, Lightbulb, Crown } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useThemeStore } from '@/stores/themeStore'
import { soundFX } from '@/utils/soundEffects'
import { usePuzzlesPage } from '@/hooks/pages/usePuzzlesPage'

type PuzzleStatus = 'unsolved' | 'solved' | 'failed'

export const EndgamePuzzlesPage: React.FC = () => {
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
    data: endgamePuzzles, 
    isLoading: isLoadingEndgame, 
    error: endgameError 
  } = useCategoryPuzzles('endgame')

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
  const [showTheory, setShowTheory] = useState(false)

  const currentPuzzle = endgamePuzzles?.puzzles?.[currentPuzzleIndex]

  // Default endgame categories for now - could come from API later
  const endgameCategories = [
    { name: 'King & Pawn', description: 'Basic king and pawn endings', puzzles: 50, completed: 23, icon: Crown },
    { name: 'Rook Endings', description: 'Rook vs pawn endgames', puzzles: 75, completed: 31, icon: Crown },
    { name: 'Minor Pieces', description: 'Bishop and knight endings', puzzles: 40, completed: 15, icon: Crown },
    { name: 'Queen Endings', description: 'Queen endgame techniques', puzzles: 30, completed: 8, icon: Crown }
  ]

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
    setShowTheory(false)
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
      promotion: 'q',
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
        setStatus('solved')
        setIsTimerActive(false)
        soundFX.playSuccess()
      } else {
        soundFX.playClick()
      }
    } else {
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
    if (endgamePuzzles && currentPuzzleIndex < endgamePuzzles.puzzles.length - 1) {
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

  // Loading state
  if (isLoadingPuzzles || isLoadingEndgame) {
    return (
      <div className={`min-h-full`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading endgame puzzles...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (puzzleError || endgameError) {
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
  if (!endgamePuzzles?.puzzles || endgamePuzzles.puzzles.length === 0) {
    return (
      <div className={`min-h-full`}>
        <div className="text-center">
          <p className="mb-4">No endgame puzzles available</p>
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
              <h1 className={`text-3xl font-bold ${theme.gradient} flex items-center gap-3`}>
                <FaCrown className="w-8 h-8" />
                Endgame Puzzles
              </h1>
              <p className={`${theme.secondary} mt-1`}>
                Master classical endgame positions and theory
              </p>
            </div>
          </div>

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
                  <span>{currentPuzzleIndex + 1} / {endgamePuzzles.puzzles.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="puzzles" className="space-y-6">
          <TabsList className={`${theme.glassMorphism} border-0`}>
            <TabsTrigger value="puzzles">Practice Puzzles</TabsTrigger>
            <TabsTrigger value="theory">Endgame Theory</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="puzzles" className="space-y-6">
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
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
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
                      onClick={() => setShowTheory(!showTheory)}
                      className={`${theme.glassMorphism} border-0`}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Theory
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextPuzzle}
                      disabled={currentPuzzleIndex === endgamePuzzles.puzzles.length - 1}
                      className={`${theme.glassMorphism} border-0`}
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Puzzle info */}
              <div className="space-y-6">
                {/* Puzzle details */}
                <Card className={`${theme.glassMorphism} border-0`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FaCrown className="w-5 h-5" />
                        {currentPuzzle.category || 'Endgame'}
                      </CardTitle>
                      <Badge variant="secondary" className={theme.glassMorphism}>
                        {currentPuzzle.difficulty || 'Unknown'}
                      </Badge>
                    </div>
                    <CardDescription>{currentPuzzle.description || 'Master this endgame position'}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Rating:</span>
                      <span className="font-mono">{currentPuzzle.rating || 'N/A'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Solution length:</span>
                      <span>{currentPuzzle.solution?.length || 'N/A'} moves</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Your moves:</span>
                      <span>{moveCount}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Theory section */}
                {showTheory && (
                  <Card className={`${theme.glassMorphism} border-0`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Theory
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed">
                        {currentPuzzle.theory || 'Study the key ideas for this endgame type.'}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Status */}
                {status !== 'unsolved' && (
                  <Card className={`${theme.glassMorphism} border-0`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        {status === 'solved' ? (
                          <>
                            <CheckCircle className={`w-6 h-6 ${theme.success}`} />
                            <div>
                              <p className={`font-semibold ${theme.success}`}>Perfect!</p>
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
                                Solution: {currentPuzzle.solution?.slice(0, 3).join(' ') || 'N/A'}...
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
              </div>
            </div>
          </TabsContent>

          <TabsContent value="theory">
            <Card className={`${theme.glassMorphism} border-0`}>
              <CardHeader>
                <CardTitle>Endgame Theory</CardTitle>
                <CardDescription>Essential endgame principles and techniques</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${theme.accent}/10`}>
                    <h3 className="font-semibold mb-2">Basic Checkmates</h3>
                    <p className="text-sm leading-relaxed">
                      Every chess player must know how to deliver checkmate with queen and king, 
                      rook and king, and two rooks. These are fundamental winning techniques.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${theme.accent}/10`}>
                    <h3 className="font-semibold mb-2">King and Pawn</h3>
                    <p className="text-sm leading-relaxed">
                      The most common endgame. Key concepts include the opposition, 
                      the rule of the square, and breakthrough techniques.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${theme.accent}/10`}>
                    <h3 className="font-semibold mb-2">Rook Endgames</h3>
                    <p className="text-sm leading-relaxed">
                      "All rook endgames are drawn" is a famous saying, but understanding 
                      cutting off the king and active rook play is crucial.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${theme.accent}/10`}>
                    <h3 className="font-semibold mb-2">Minor Pieces</h3>
                    <p className="text-sm leading-relaxed">
                      Bishop and knight endgames require precise technique. 
                      Some positions are winning, others are theoretical draws.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {endgameCategories.map((category) => {
                const IconComponent = category.icon
                const completionRate = (category.completed / category.puzzles) * 100
                
                return (
                  <Card key={category.name} className={`${theme.glassMorphism} border-0 cursor-pointer hover:${theme.accent}/20 transition-all`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${theme.accent}/20`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span>{category.completed}/{category.puzzles} puzzles</span>
                        </div>
                        <Progress value={completionRate} className={`h-2 ${theme.glassMorphism}`} />
                        <div className="flex justify-between text-xs opacity-75">
                          <span>{Math.round(completionRate)}% complete</span>
                          <span>{category.puzzles - category.completed} remaining</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default EndgamePuzzlesPage