import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Swords, Users, BarChart3, History } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'
import { usePlayComputer } from '@/hooks/usePlayComputer'
import { OpponentSelector } from '@/components/play/computer/OpponentSelector'
import { GameSetup } from '@/components/play/computer/GameSetup'
import { ChessGameBoard } from '@/components/play/computer/ChessGameBoard'
import { MoveHistory } from '@/components/play/computer/MoveHistory'
import { GameAnalysis } from '@/components/play/computer/GameAnalysis'
import { soundFX } from '@/utils/soundEffects'
import { GiSwordsPower } from 'react-icons/gi'

/**
 * Play vs Computer Page - Battle Arena
 * Gaming-themed page for playing chess against AI opponents
 * Follows the exact architectural pattern from LoginPage with battle aesthetics
 */
export const PlayComputerPage: React.FC = () => {
  // 1. Hooks and state
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const {
    gameState,
    gameAnalysis,
    availableOpponents,
    performanceStats,
    gameSetup,
    isValidSetup,
    isAnalyzing,
    selectOpponent,
    updateSetup,
    startGame,
    makeMove,
    analyzePosition,
    error,
    clearError
  } = usePlayComputer()

  // 2. Derived values
  const theme = getCurrentTheme()
  const [activeTab, setActiveTab] = useState<'setup' | 'game' | 'analysis' | 'history'>('setup')
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)

  // 3. Event handlers
  const handleBackToDashboard = () => {
    soundFX.playClick()
    navigate('/dashboard')
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as 'setup' | 'game' | 'analysis' | 'history')
    soundFX.playClick()
  }

  const handleGameStart = async () => {
    await startGame()
    if (gameState) {
      setActiveTab('game')
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

  // Determine player color for board orientation
  const playerColor: 'white' | 'black' = gameState?.setup.playerColor === 'random' 
    ? (Math.random() < 0.5 ? 'white' : 'black')
    : ((gameSetup.playerColor === 'random' ? 'white' : gameSetup.playerColor) || 'white')

  // 4. Render with clear hierarchy
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} p-4`}>
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Combat Orbs */}
        <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-full opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br ${theme.secondary} rounded-full opacity-15 blur-lg animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Battle Energy Particles */}
        <div className={`absolute top-10 right-1/3 w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-full opacity-30 blur-md animate-float`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-lg animate-float animation-delay-3000`}></div>
        
        {/* Battle Sparkles */}
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-twinkle`}></div>
          <div className={`absolute top-3/4 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-500`}></div>
          <div className={`absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-white rounded-full animate-twinkle animation-delay-1500`}></div>
          <div className={`absolute bottom-1/3 left-1/5 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-2500`}></div>
        </div>
      </div>

      {/* Battle Arena Header */}
      <div className="relative z-10 mb-6">
        <Card className="bg-black/20 border-white/10 backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/25 hover:border-white/20 transition-all duration-500 animate-card-entrance">
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
                    <Swords className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                      Battle Arena
                    </CardTitle>
                    <CardDescription className={`${theme.text} opacity-80`}>
                      Choose your opponent and engage in digital combat
                    </CardDescription>
                  </div>
                </div>
              </div>
              
              {/* Performance Stats */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-center">
                  <div className={`text-lg font-bold ${theme.text}`}>
                    {performanceStats.currentRating}
                  </div>
                  <div className={`text-xs ${theme.text} opacity-60`}>Rating</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${theme.text}`}>
                    {performanceStats.gamesPlayed}
                  </div>
                  <div className={`text-xs ${theme.text} opacity-60`}>Battles</div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${theme.text}`}>
                    {Math.round(performanceStats.winRate)}%
                  </div>
                  <div className={`text-xs ${theme.text} opacity-60`}>Victory</div>
                </div>
              </div>
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

      {/* Main Battle Interface */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          
          {/* Battle Navigation Tabs */}
          <Card className="bg-black/20 border-white/10 backdrop-blur-xl mb-6">
            <CardContent className="p-4">
              <TabsList className="grid w-full grid-cols-4 bg-black/30 border border-white/10">
                <TabsTrigger 
                  value="setup" 
                  className={`
                    flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.primary} 
                    data-[state=active]:text-white transition-all duration-200
                  `}
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Opponent</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="game" 
                  className={`
                    flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.primary} 
                    data-[state=active]:text-white transition-all duration-200
                  `}
                  disabled={!gameState}
                >
                  <Swords className="w-4 h-4" />
                  <span className="hidden sm:inline">Battle</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className={`
                    flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.primary} 
                    data-[state=active]:text-white transition-all duration-200
                  `}
                  disabled={!gameState || gameState.moves.length === 0}
                >
                  <History className="w-4 h-4" />
                  <span className="hidden sm:inline">Chronicle</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="analysis" 
                  className={`
                    flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.primary} 
                    data-[state=active]:text-white transition-all duration-200
                  `}
                  disabled={!gameState}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Analysis</span>
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          {/* Tab Content */}
          <div className="space-y-6">
            
            {/* Setup Tab */}
            <TabsContent value="setup" className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <OpponentSelector
                    opponents={availableOpponents}
                    selectedOpponent={gameSetup.opponent || null}
                    onOpponentSelect={selectOpponent}
                    playerRating={performanceStats.currentRating}
                    theme={theme}
                  />
                </div>
                <div>
                  <GameSetup
                    setup={gameSetup}
                    onSetupChange={updateSetup}
                    onStartGame={handleGameStart}
                    isValidSetup={isValidSetup}
                    theme={theme}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Game Tab */}
            <TabsContent value="game">
              {gameState ? (
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
              ) : (
                <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
                  <CardContent className="p-12 text-center">
                    <Swords className="w-16 h-16 mx-auto text-white/40 mb-4" />
                    <h3 className={`text-xl font-bold ${theme.text} mb-2`}>
                      No Active Battle
                    </h3>
                    <p className={`${theme.text} opacity-60 mb-6`}>
                      Configure your battle settings and select an opponent to begin combat
                    </p>
                    <Button
                      onClick={() => setActiveTab('setup')}
                      className={`bg-gradient-to-r ${theme.primary} text-white hover:opacity-90`}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Select Opponent
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              {gameState ? (
                <MoveHistory
                  moves={gameState.moves}
                  currentMoveIndex={currentMoveIndex}
                  onMoveSelect={handleMoveSelect}
                  showEvaluations={true}
                  theme={theme}
                />
              ) : (
                <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
                  <CardContent className="p-12 text-center">
                    <History className="w-16 h-16 mx-auto text-white/40 mb-4" />
                    <p className={`${theme.text} opacity-60`}>
                      No battle history available
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis">
              {gameState ? (
                <GameAnalysis
                  gameState={gameState}
                  analysis={gameAnalysis}
                  isAnalyzing={isAnalyzing}
                  onAnalyze={analyzePosition}
                  theme={theme}
                />
              ) : (
                <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
                  <CardContent className="p-12 text-center">
                    <BarChart3 className="w-16 h-16 mx-auto text-white/40 mb-4" />
                    <p className={`${theme.text} opacity-60`}>
                      No position to analyze
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

          </div>
        </Tabs>
      </div>

      {/* Gaming Visual Effects (Chess Pieces Background) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 right-10 text-6xl opacity-5 animate-bounce-subtle delay-500">♜</div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-5 animate-bounce-subtle delay-1000">♞</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">♝</div>
        <div className="absolute bottom-1/3 left-1/4 text-7xl opacity-5 animate-bounce-subtle delay-2000">♛</div>
        <div className="absolute top-1/2 right-10 text-3xl opacity-5 animate-bounce-subtle delay-2500"><GiSwordsPower className="w-4 h-4 inline" /></div>
        <div className="absolute bottom-20 right-1/3 text-4xl opacity-5 animate-bounce-subtle delay-3000">🏰</div>
      </div>
    </div>
  )
}