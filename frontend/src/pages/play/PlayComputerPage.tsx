import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BarChart3, History, Shield, Swords, Target, Trophy, Users, Zap } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
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
 * 
 * ARCHITECTURE NOTES:
 * - Follows Single Responsibility Principle (SRP) - page only handles presentation
 * - Uses Don't Repeat Yourself (DRY) - reusable components for each section
 * - Proper separation of concerns:
 *   - Logic: usePlayComputer hook manages all game state and logic
 *   - Data: aiOpponents.ts contains all mock data and configurations
 *   - UI: Modular components handle specific UI responsibilities
 *   - Theme: Dynamic theme integration following golden standard
 * 
 * GAMING AESTHETIC:
 * - Battle Arena theme with combat terminology
 * - Professional desktop app feel with glass morphism
 * - Epic background effects and animations
 * - Sound integration for tactile feedback
 * 
 * This is a VISUAL MOCKUP PROJECT - realistic interfaces without functional chess engines
 */
export const PlayComputerPage: React.FC = () => {
  // 1. Hooks and state - Following Golden Standard pattern
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
  
  // Battle arena state for enhanced UX
  const [showPerformanceDetails, setShowPerformanceDetails] = useState(false)

  // 3. Event handlers
  const handleBackToDashboard = () => {
    soundFX.playClick()
    navigate('/dashboard')
  }
  
  const handlePerformanceToggle = () => {
    setShowPerformanceDetails(!showPerformanceDetails)
    soundFX.playClick()
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

  // 4. Render with clear hierarchy - Following Golden Standard
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} p-4`}>
      {/* Epic Battle Arena Background Effects - Following Golden Standard */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Massive Battle Orbs - Enhanced for Arena Feel */}
        <div className={`absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br ${theme.accent} rounded-full opacity-15 blur-3xl animate-pulse-glow gpu-accelerated`}></div>
        <div className={`absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-gradient-to-br ${theme.highlight} rounded-full opacity-20 blur-3xl animate-pulse-glow animation-delay-1000 gpu-accelerated`}></div>
        <div className={`absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-br ${theme.secondary} rounded-full opacity-12 blur-2xl animate-pulse-glow animation-delay-2000 gpu-accelerated`}></div>
        
        {/* Combat Energy Fields */}
        <div className={`absolute top-20 right-1/3 w-32 h-32 bg-gradient-to-br ${theme.primary} rounded-full opacity-25 blur-xl animate-float gpu-accelerated`}></div>
        <div className={`absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br ${theme.accent} rounded-full opacity-18 blur-lg animate-float animation-delay-3000 gpu-accelerated`}></div>
        <div className={`absolute top-2/3 left-1/3 w-20 h-20 bg-gradient-to-br ${theme.highlight} rounded-full opacity-22 blur-md animate-float animation-delay-1500 gpu-accelerated`}></div>
        
        {/* Battle Arena Sparkles - More Epic */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Battle Arena Header - Following Golden Standard Card Pattern */}
      <div className="relative z-10 mb-6">
        <Card className="bg-black/20 border-white/10 backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/25 hover:border-white/20 transition-all duration-500 animate-card-entrance">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={handleBackToDashboard}
                  className="p-2 hover:bg-white/10 transition-all duration-200 hover-grow gpu-accelerated"
                >
                  <ArrowLeft className="w-5 h-5 text-white/80" />
                </Button>
                
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center shadow-lg hover-glow`}>
                    <Swords className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className={`text-3xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent drop-shadow-2xl`}>
                      BATTLE ARENA
                    </CardTitle>
                    <CardDescription className={`${theme.text} opacity-90 text-lg font-medium tracking-wide`}>
                      Face legendary AI opponents in digital chess combat
                    </CardDescription>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Performance Stats with Battle Terminology */}
              <div className="hidden md:flex items-center space-x-6">
                <Button
                  variant="ghost"
                  onClick={handlePerformanceToggle}
                  className="flex items-center space-x-4 p-3 hover:bg-white/10 transition-all duration-200 rounded-xl hover-grow"
                >
                  <div className="text-center">
                    <div className={`text-xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                      {performanceStats.currentRating}
                    </div>
                    <div className={`text-xs ${theme.text} opacity-60 uppercase tracking-wider`}>Combat Rating</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-xl font-bold bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent`}>
                      {performanceStats.gamesPlayed}
                    </div>
                    <div className={`text-xs ${theme.text} opacity-60 uppercase tracking-wider`}>Battles</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-xl font-bold ${performanceStats.winRate >= 60 ? 'text-green-400' : performanceStats.winRate >= 40 ? 'text-yellow-400' : 'text-orange-400'}`}>
                      {Math.round(performanceStats.winRate)}%
                    </div>
                    <div className={`text-xs ${theme.text} opacity-60 uppercase tracking-wider`}>Victory Rate</div>
                  </div>
                  
                  <Trophy className={`w-5 h-5 ${theme.text} opacity-40`} />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Error Display - Following Golden Standard */}
      {error && (
        <div className="relative z-10 mb-6">
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg animate-slide-down max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-sm text-red-400">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearError}
                className="text-red-400 hover:bg-red-500/10 active:animate-button-press"
              >
                ×
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Battle Interface - Modular Component Architecture */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          
          {/* Battle Navigation Tabs - Enhanced Gaming Aesthetic */}
          <Card className="bg-black/20 border-white/10 backdrop-blur-xl mb-6 shadow-xl">
            <CardContent className="p-4">
              <TabsList className="grid w-full grid-cols-4 bg-black/30 border border-white/10">
                <TabsTrigger 
                  value="setup" 
                  className={`
                    flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.primary} 
                    data-[state=active]:text-white transition-all duration-300 hover-glow gpu-accelerated
                  `}
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Select Opponent</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="game" 
                  className={`
                    flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.primary} 
                    data-[state=active]:text-white transition-all duration-300 hover-glow gpu-accelerated
                  `}
                  disabled={!gameState}
                >
                  <Swords className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Battle Arena</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className={`
                    flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.primary} 
                    data-[state=active]:text-white transition-all duration-300 hover-glow gpu-accelerated
                  `}
                  disabled={!gameState || gameState.moves.length === 0}
                >
                  <History className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Battle Chronicle</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="analysis" 
                  className={`
                    flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:${theme.primary} 
                    data-[state=active]:text-white transition-all duration-300 hover-glow gpu-accelerated
                  `}
                  disabled={!gameState}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Position Analysis</span>
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          {/* Tab Content - Each using dedicated components for SRP */}
          <div className="space-y-6">
            
            {/* Setup Tab - Battle Arena Configuration */}
            <TabsContent value="setup" className="space-y-6">
              {/* Enhanced Performance Display */}
              {showPerformanceDetails && (
                <Card className="bg-black/20 border-white/10 backdrop-blur-xl animate-slide-down shadow-xl">
                  <CardHeader>
                    <CardTitle className={`${theme.text} flex items-center space-x-2`}>
                      <Target className="w-5 h-5" />
                      <span>Warrior Statistics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-all duration-200 hover-grow">
                        <div className={`text-3xl font-bold text-green-400 mb-2`}>{performanceStats.gamesWon}</div>
                        <div className={`text-sm ${theme.text} opacity-70 uppercase tracking-wider`}>Glorious Victories</div>
                      </div>
                      <div className="text-center p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-all duration-200 hover-grow">
                        <div className={`text-3xl font-bold text-yellow-400 mb-2`}>{performanceStats.gamesDrawn}</div>
                        <div className={`text-sm ${theme.text} opacity-70 uppercase tracking-wider`}>Honorable Draws</div>
                      </div>
                      <div className="text-center p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-all duration-200 hover-grow">
                        <div className={`text-3xl font-bold text-red-400 mb-2`}>{performanceStats.gamesLost}</div>
                        <div className={`text-sm ${theme.text} opacity-70 uppercase tracking-wider`}>Learning Defeats</div>
                      </div>
                      <div className="text-center p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-all duration-200 hover-grow">
                        <div className={`text-3xl font-bold text-cyan-400 mb-2`}>{performanceStats.peakRating}</div>
                        <div className={`text-sm ${theme.text} opacity-70 uppercase tracking-wider`}>Legendary Peak</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
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

            {/* Game Tab - Active Battle Interface */}
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
                <Card className="bg-black/20 border-white/10 backdrop-blur-xl shadow-xl">
                  <CardContent className="p-12 text-center">
                    <Swords className="w-20 h-20 mx-auto text-white/30 mb-6 animate-bounce-subtle" />
                    <h3 className={`text-2xl font-bold ${theme.text} mb-4`}>
                      No Active Battle
                    </h3>
                    <p className={`${theme.text} opacity-60 mb-8 text-lg`}>
                      Configure your battle settings and select a worthy opponent to begin epic combat
                    </p>
                    <Button
                      onClick={() => setActiveTab('setup')}
                      className={`bg-gradient-to-r ${theme.primary} text-white hover:opacity-90 px-8 py-4 text-lg font-semibold hover-glow active:animate-button-press`}
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Choose Your Opponent
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* History Tab - Battle Chronicle */}
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
                <Card className="bg-black/20 border-white/10 backdrop-blur-xl shadow-xl">
                  <CardContent className="p-12 text-center">
                    <History className="w-20 h-20 mx-auto text-white/30 mb-6 animate-bounce-subtle" />
                    <h3 className={`text-2xl font-bold ${theme.text} mb-4`}>
                      No Battle History
                    </h3>
                    <p className={`${theme.text} opacity-60 text-lg`}>
                      Your battle chronicles will appear here once combat begins
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Analysis Tab - Strategic Assessment */}
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
                <Card className="bg-black/20 border-white/10 backdrop-blur-xl shadow-xl">
                  <CardContent className="p-12 text-center">
                    <BarChart3 className="w-20 h-20 mx-auto text-white/30 mb-6 animate-bounce-subtle" />
                    <h3 className={`text-2xl font-bold ${theme.text} mb-4`}>
                      No Position to Analyze
                    </h3>
                    <p className={`${theme.text} opacity-60 text-lg`}>
                      Start a battle to unlock deep strategic analysis of your positions
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

          </div>
        </Tabs>
      </div>

      {/* Epic Chess Battle Silhouettes - Enhanced Arena Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Legendary Chess Pieces as Battle Icons */}
        <div className="absolute top-16 right-16 text-8xl opacity-8 animate-bounce-subtle delay-500 transform rotate-12 gpu-accelerated">♚</div>
        <div className="absolute bottom-16 left-16 text-7xl opacity-6 animate-bounce-subtle delay-1000 transform -rotate-12 gpu-accelerated">♜</div>
        <div className="absolute top-1/3 right-1/4 text-6xl opacity-7 animate-bounce-subtle delay-1500 transform rotate-45 gpu-accelerated">♞</div>
        <div className="absolute bottom-1/3 left-1/4 text-9xl opacity-9 animate-bounce-subtle delay-2000 transform -rotate-6 gpu-accelerated">♛</div>
        <div className="absolute top-1/2 right-20 text-5xl opacity-5 animate-bounce-subtle delay-2500 transform rotate-30 gpu-accelerated"><GiSwordsPower className="w-4 h-4 inline" /></div>
        <div className="absolute bottom-24 right-1/3 text-6xl opacity-6 animate-bounce-subtle delay-3000 transform -rotate-15 gpu-accelerated">🏰</div>
        
        {/* Additional Battle Elements */}
        <div className="absolute top-20 left-1/3 text-4xl opacity-4 animate-bounce-subtle delay-3500 transform rotate-60 gpu-accelerated"><Zap className="w-4 h-4 inline" /></div>
        <div className="absolute bottom-1/4 right-1/5 text-5xl opacity-5 animate-bounce-subtle delay-4000 transform -rotate-30 gpu-accelerated"><Shield className="w-4 h-4 inline" /></div>
        <div className="absolute top-2/3 left-20 text-3xl opacity-4 animate-bounce-subtle delay-4500 transform rotate-90 gpu-accelerated"><FaCrown className="w-4 h-4 inline" /></div>
      </div>
    </div>
  )
}

export default PlayComputerPage