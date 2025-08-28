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

// Mock endgame puzzle data - classic endgame positions
const mockEndgamePuzzles = [
  {
    id: 1,
    fen: '8/8/8/8/8/3K4/4R3/4k3 w - - 0 1',
    solution: ['Re1+', 'Kf2', 'Re2+', 'Kf3', 'Re3+'],
    endgameType: 'Rook vs King',
    difficulty: 'Beginner',
    rating: 1000,
    moves: 5,
    description: 'White to move and deliver checkmate',
    theory: 'In rook endgames, the key is to cut off the enemy king and systematically drive it to the edge.',
    hint1: 'Use the rook to give check and cut off escape squares',
    hint2: 'Drive the king to the edge of the board',
    hint3: 'Re1+ starts the mating attack'
  },
  {
    id: 2,
    fen: '8/8/8/8/8/2QK4/8/2k5 w - - 0 1',
    solution: ['Qc2+', 'Kb1', 'Qb3+', 'Ka1', 'Qb2#'],
    endgameType: 'Queen vs King',
    difficulty: 'Beginner',
    rating: 1100,
    moves: 5,
    description: 'White to move and deliver checkmate',
    theory: 'The queen is powerful enough to checkmate with just the king\'s help by controlling key squares.',
    hint1: 'Use checks to drive the black king to the corner',
    hint2: 'The queen can control many squares at once',
    hint3: 'Start with Qc2+ to push the king back'
  },
  {
    id: 3,
    fen: '8/8/8/8/8/5K2/6P1/6k1 w - - 0 1',
    solution: ['g4', 'Kh2', 'g5', 'Kg3', 'g6', 'Kh4', 'g7', 'Kh5', 'g8=Q'],
    endgameType: 'King and Pawn vs King',
    difficulty: 'Intermediate',
    rating: 1300,
    moves: 9,
    description: 'White to move and promote the pawn',
    theory: 'In king and pawn endgames, the key is to support the pawn while preventing the enemy king from stopping it.',
    hint1: 'Push the pawn while your king supports it',
    hint2: 'Keep the enemy king at bay',
    hint3: 'Start with g4 to advance the pawn'
  },
  {
    id: 4,
    fen: '8/8/8/8/8/1N1K4/8/1k6 w - - 0 1',
    solution: ['Nc5', 'Ka1', 'Kc3', 'Kb1', 'Nd3+', 'Ka1', 'Nc1', 'Kb1', 'Nd3+', 'Ka2', 'Nb4+'],
    endgameType: 'King and Knight vs King',
    difficulty: 'Advanced',
    rating: 1600,
    moves: 11,
    description: 'White to move - can you achieve mate?',
    theory: 'King and knight cannot force checkmate against a lone king. This is a theoretical draw.',
    hint1: 'Try to coordinate your pieces',
    hint2: 'Look for forcing moves',
    hint3: 'This position is actually a theoretical draw!'
  }
]

// Endgame categories for theory section
const endgameCategories = [
  {
    name: 'Basic Mates',
    description: 'Queen mate, Rook mate, Two rooks mate',
    puzzles: 12,
    completed: 8,
    icon: Crown
  },
  {
    name: 'Pawn Endgames',
    description: 'King and pawn vs king positions',
    puzzles: 15,
    completed: 6,
    icon: Target
  },
  {
    name: 'Rook Endgames',
    description: 'Complex rook and pawn positions',
    puzzles: 18,
    completed: 4,
    icon: Trophy
  },
  {
    name: 'Minor Piece Endgames',
    description: 'Bishop and knight endgames',
    puzzles: 10,
    completed: 2,
    icon: Star
  }
]

type PuzzleStatus = 'unsolved' | 'solved' | 'failed'

export const EndgamePuzzlesPage: React.FC = () => {
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
  const [showTheory, setShowTheory] = useState(false)

  const currentPuzzle = mockEndgamePuzzles[currentPuzzleIndex]

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
    setShowTheory(false)
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
    if (currentPuzzleIndex < mockEndgamePuzzles.length - 1) {
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

  return (
    <div className={`min-h-screen p-4 transition-all duration-300 ${theme.background} ${theme.text}`}>
      {/* Floating particles effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 ${theme.accent} rounded-full opacity-30 animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${4 + Math.random() * 3}s`
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
                  <span>{currentPuzzleIndex + 1} / {mockEndgamePuzzles.length}</span>
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
                      disabled={currentPuzzleIndex === mockEndgamePuzzles.length - 1}
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
                        {currentPuzzle.endgameType}
                      </CardTitle>
                      <Badge variant="secondary" className={theme.glassMorphism}>
                        {currentPuzzle.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>{currentPuzzle.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Rating:</span>
                      <span className="font-mono">{currentPuzzle.rating}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Solution length:</span>
                      <span>{currentPuzzle.moves} moves</span>
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
                        {currentPuzzle.theory}
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
                                Solution: {currentPuzzle.solution.slice(0, 3).join(' ')}...
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