import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PlayCircle, Crown, Shield, Zap } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'
import { usePlayComputer } from '@/hooks/usePlayComputer'
import { ChessGameBoard } from '@/components/play/computer/ChessGameBoard'
import { MoveHistory } from '@/components/play/computer/MoveHistory'
import { soundFX } from '@/utils/soundEffects'

/**
 * Play vs Computer Page - Simple Interface
 * 
 * SIMPLE USER EXPERIENCE:
 * - Choose difficulty: Easy, Medium, Hard (3 buttons)
 * - Choose color: White, Black, Random (3 buttons)  
 * - Click "Start Game" (1 button)
 * - Play chess immediately (chess board appears)
 * 
 * This is a VISUAL MOCKUP PROJECT - realistic interfaces without functional chess engines
 */

type Difficulty = 'Easy' | 'Medium' | 'Hard'
type PlayerColor = 'white' | 'black' | 'random'
type GameStep = 'difficulty' | 'color' | 'game'

export const PlayComputerPage: React.FC = () => {
  // Hooks and state
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const {
    gameState,
    availableOpponents,
    selectOpponent,
    updateSetup,
    startGame,
    makeMove,
    error,
    clearError
  } = usePlayComputer()

  // Simple setup state
  const theme = getCurrentTheme()
  const [currentStep, setCurrentStep] = useState<GameStep>('difficulty')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null)
  const [selectedColor, setSelectedColor] = useState<PlayerColor | null>(null)
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)

  // Event handlers
  const handleBackToDashboard = () => {
    soundFX.playClick()
    navigate('/dashboard')
  }

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty)
    soundFX.playClick()
    
    // Auto-select appropriate opponent based on difficulty
    const difficultyMap = {
      'Easy': 'Novice',
      'Medium': 'Intermediate', 
      'Hard': 'Advanced'
    }
    
    const opponent = availableOpponents.find(opp => 
      opp.difficulty === difficultyMap[difficulty] && opp.isUnlocked
    )
    
    if (opponent) {
      selectOpponent(opponent)
    }
    
    setCurrentStep('color')
  }

  const handleColorSelect = (color: PlayerColor) => {
    setSelectedColor(color)
    updateSetup({ playerColor: color })
    soundFX.playClick()
  }

  const handleStartGame = async () => {
    if (selectedDifficulty && selectedColor) {
      await startGame()
      if (gameState) {
        setCurrentStep('game')
      }
    }
  }

  const handlePlayerMove = async (from: string, to: string): Promise<boolean> => {
    const success = await makeMove(from, to)
    if (success && gameState) {
      setCurrentMoveIndex(gameState.moves.length - 1)
    }
    return success
  }

  const handleMoveSelect = (moveIndex: number) => {
    setCurrentMoveIndex(moveIndex)
  }

  const handleBackToSetup = () => {
    setCurrentStep('difficulty')
    setSelectedDifficulty(null)
    setSelectedColor(null)
    soundFX.playClick()
  }

  // Determine player color for board orientation
  const playerColor: 'white' | 'black' = gameState?.setup.playerColor === 'random' 
    ? (Math.random() < 0.5 ? 'white' : 'black')
    : ((selectedColor === 'random' ? 'white' : selectedColor) || 'white')

  // Render simple interface
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} p-4`}>
      
      {/* Simple Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br ${theme.accent} rounded-full opacity-12 blur-3xl animate-pulse-glow`}></div>
        <div className={`absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-gradient-to-br ${theme.highlight} rounded-full opacity-15 blur-3xl animate-pulse-glow animation-delay-1000`}></div>
      </div>

      {/* Simple Header */}
      <div className="relative z-10 mb-8">
        <Card className="bg-black/20 border-white/10 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={handleBackToDashboard}
                  className="p-2 hover:bg-white/10 transition-all duration-200"
                >
                  <ArrowLeft className="w-5 h-5 text-white/80" />
                </Button>
                
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center shadow-lg`}>
                    <PlayCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                      Play vs Computer
                    </CardTitle>
                    <CardDescription className={`${theme.text} opacity-80`}>
                      Choose difficulty, color, and start playing
                    </CardDescription>
                  </div>
                </div>
              </div>

              {currentStep === 'game' && (
                <Button
                  variant="ghost"
                  onClick={handleBackToSetup}
                  className="text-white/80 hover:text-white hover:bg-white/10"
                >
                  New Game
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Error Display */}
      {error && (
        <div className="relative z-10 mb-6">
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg animate-slide-down max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-400">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearError}
                className="text-red-400 hover:bg-red-500/10"
              >
                ×
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Single Page Setup - All choices on one page */}
        {currentStep !== 'game' && (
          <Card className="bg-black/20 border-white/10 backdrop-blur-xl shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className={`text-3xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-2`}>
                Play vs Computer
              </CardTitle>
              <CardDescription className={`${theme.text} opacity-80 text-lg`}>
                Choose difficulty, color, and start playing
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              
              {/* Difficulty Selection */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Choose Difficulty</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => handleDifficultySelect('Easy')}
                    className={`h-24 flex flex-col items-center justify-center space-y-2 text-base font-semibold transition-all duration-300 ${
                      selectedDifficulty === 'Easy' 
                        ? `bg-gradient-to-r ${theme.primary} text-white border-2 scale-105 shadow-2xl` 
                        : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 hover:from-green-500/30 hover:to-emerald-500/30 text-green-400 hover:text-green-300 hover:scale-105'
                    }`}
                  >
                    <Shield className="w-6 h-6" />
                    <span>Easy</span>
                  </Button>

                  <Button
                    onClick={() => handleDifficultySelect('Medium')}
                    className={`h-24 flex flex-col items-center justify-center space-y-2 text-base font-semibold transition-all duration-300 ${
                      selectedDifficulty === 'Medium' 
                        ? `bg-gradient-to-r ${theme.primary} text-white border-2 scale-105 shadow-2xl` 
                        : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-500/30 text-blue-400 hover:text-blue-300 hover:scale-105'
                    }`}
                  >
                    <Zap className="w-6 h-6" />
                    <span>Medium</span>
                  </Button>

                  <Button
                    onClick={() => handleDifficultySelect('Hard')}
                    className={`h-24 flex flex-col items-center justify-center space-y-2 text-base font-semibold transition-all duration-300 ${
                      selectedDifficulty === 'Hard' 
                        ? `bg-gradient-to-r ${theme.primary} text-white border-2 scale-105 shadow-2xl` 
                        : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 hover:from-red-500/30 hover:to-orange-500/30 text-red-400 hover:text-red-300 hover:scale-105'
                    }`}
                  >
                    <Crown className="w-6 h-6" />
                    <span>Hard</span>
                  </Button>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Choose Your Color</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => handleColorSelect('white')}
                    className={`h-24 flex flex-col items-center justify-center space-y-2 text-base font-semibold transition-all duration-300 ${
                      selectedColor === 'white' 
                        ? `bg-gradient-to-r ${theme.primary} text-white border-2 scale-105 shadow-2xl` 
                        : 'bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30 hover:scale-105'
                    }`}
                  >
                    <span className="text-3xl">♔</span>
                    <span>White</span>
                  </Button>

                  <Button
                    onClick={() => handleColorSelect('black')}
                    className={`h-24 flex flex-col items-center justify-center space-y-2 text-base font-semibold transition-all duration-300 ${
                      selectedColor === 'black' 
                        ? `bg-gradient-to-r ${theme.primary} text-white border-2 scale-105 shadow-2xl` 
                        : 'bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30 hover:scale-105'
                    }`}
                  >
                    <span className="text-3xl">♚</span>
                    <span>Black</span>
                  </Button>

                  <Button
                    onClick={() => handleColorSelect('random')}
                    className={`h-24 flex flex-col items-center justify-center space-y-2 text-base font-semibold transition-all duration-300 ${
                      selectedColor === 'random' 
                        ? `bg-gradient-to-r ${theme.primary} text-white border-2 scale-105 shadow-2xl` 
                        : 'bg-black/20 border-white/20 text-white hover:bg-black/30 hover:border-white/30 hover:scale-105'
                    }`}
                  >
                    <span className="text-3xl">🎲</span>
                    <span>Random</span>
                  </Button>
                </div>
              </div>

              {/* Start Game Button */}
              {selectedDifficulty && selectedColor && (
                <div className="text-center">
                  <Button
                    onClick={handleStartGame}
                    size="lg"
                    className={`px-12 py-4 text-xl font-bold transition-all duration-300 hover:scale-105 bg-gradient-to-r ${theme.primary} text-white hover:opacity-90 shadow-2xl`}
                  >
                    <PlayCircle className="w-6 h-6 mr-3" />
                    Start Game
                  </Button>
                </div>
              )}

            </CardContent>
          </Card>
        )}


        {/* Step 3: Game */}
        {currentStep === 'game' && gameState && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ChessGameBoard
                gameState={gameState}
                onPlayerMove={handlePlayerMove}
                playerColor={playerColor}
                showCoordinates={true}
                showLastMove={true}
                theme={theme}
              />
            </div>
            <div>
              <MoveHistory
                moves={gameState.moves}
                currentMoveIndex={currentMoveIndex}
                onMoveSelect={handleMoveSelect}
                showEvaluations={true}
                theme={theme}
              />
            </div>
          </div>
        )}

      </div>

      {/* Chess Piece Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-16 right-16 text-4xl opacity-5 animate-bounce-subtle delay-500 transform rotate-12">♚</div>
        <div className="absolute bottom-16 left-16 text-4xl opacity-4 animate-bounce-subtle delay-1000 transform -rotate-12">♜</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-4 animate-bounce-subtle delay-1500 transform rotate-45">♞</div>
        <div className="absolute bottom-1/3 left-1/4 text-5xl opacity-6 animate-bounce-subtle delay-2000 transform -rotate-6">♛</div>
      </div>

    </div>
  )
}

export default PlayComputerPage