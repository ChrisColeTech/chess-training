import React, { useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { TestTube, Upload, Play, Pause, SkipBack, SkipForward, Settings, BookOpen, BarChart3, Eye, Download, Share, ChevronLeft, ChevronRight } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useThemeStore } from '@/stores/themeStore'
import { useGameReview } from '@/hooks/useGameReview'
import { 
  GameSelection, 
  MoveAnalysis, 
  EngineEvaluation, 
  GameStatistics 
} from '@/components/review'
import type { GameReview } from '@/types/gameReview'

/**
 * Game Review Page
 * GAME LABORATORY - Comprehensive chess game analysis interface
 * Visual mockup for analyzing games with engine evaluation and insights
 */
const GameReviewPage: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  // Local state for UI controls
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('analysis')
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [boardSize] = useState(400)
  const [isPlaying, setIsPlaying] = useState(false)

  // Game review hook with all functionality
  const {
    // Data state
    currentGame,
    reviewSession,
    availableGames,
    analysisState,
    canNavigateBack,
    canNavigateForward,
    currentMoveIndex,
    totalMoves,
    // Actions
    selectGame,
    navigateToMove,
    updateDisplaySettings,
  } = useGameReview()

  // Local handler functions
  const handleImportGame = () => {
    setShowImportDialog(true)
  }

  const handleGameSelect = (game: GameReview) => {
    selectGame(game.id)
  }

  const handleMoveNavigation = (direction: 'start' | 'back' | 'forward' | 'end') => {
    switch (direction) {
      case 'start':
        navigateToMove(0)
        break
      case 'back':
        if (canNavigateBack) navigateToMove(currentMoveIndex - 1)
        break
      case 'forward':
        if (canNavigateForward) navigateToMove(currentMoveIndex + 1)
        break
      case 'end':
        navigateToMove(totalMoves)
        break
    }
  }

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying)
    // Auto-play functionality would be implemented here
  }

  const getCurrentPosition = (): string => {
    if (!currentGame || !currentGame.moves[currentMoveIndex]) {
      return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' // Starting position
    }
    return currentGame.moves[currentMoveIndex].positionAfter
  }

  const getCurrentMove = () => {
    if (!currentGame || currentMoveIndex === 0) return null
    return currentGame.moves[currentMoveIndex - 1]
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} p-4`}>
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-full opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br ${theme.secondary} rounded-full opacity-15 blur-lg animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Chess piece background elements */}
        <div className="absolute top-10 right-10 text-6xl opacity-5 animate-bounce-subtle delay-500">⚗️</div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-5 animate-bounce-subtle delay-1000">🔬</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">🧪</div>
        <div className="absolute bottom-1/3 left-1/4 text-7xl opacity-5 animate-bounce-subtle delay-2000">⚛️</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-8 p-8 rounded-xl bg-gradient-to-r ${theme.glassMorphism} shadow-2xl`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-xl flex items-center justify-center shadow-lg`}>
                <TestTube size={32} className="text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                  Game Laboratory
                </h1>
                <p className={`${theme.text} opacity-80 mt-1`}>
                  Analyze your chess games with advanced engine insights and improvement suggestions
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className={`bg-gray-800/30 border-gray-600 ${theme.text} hover:bg-gray-700/50`}
              >
                <Settings size={18} className="mr-2" />
                Settings
              </Button>
              <Button
                onClick={handleImportGame}
                className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <Upload size={18} className="mr-2" />
                Import Game
              </Button>
            </div>
          </div>

          {/* Game Info Bar */}
          {currentGame && (
            <div className="mt-6 flex items-center justify-between p-4 bg-black/20 rounded-lg">
              <div className="flex items-center space-x-6">
                <div>
                  <div className={`font-semibold ${theme.text}`}>
                    {currentGame.gameInfo.white} vs {currentGame.gameInfo.black}
                  </div>
                  <div className={`text-sm ${theme.text} opacity-70`}>
                    {currentGame.gameInfo.event} • {currentGame.gameInfo.date}
                  </div>
                </div>
                <Badge className={`${
                  currentGame.gameInfo.result === '1-0' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                  currentGame.gameInfo.result === '0-1' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                }`}>
                  {currentGame.gameInfo.result}
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {currentGame.opening.name} ({currentGame.opening.eco})
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-800/30 border-gray-600 text-white hover:bg-gray-700/50"
                >
                  <Download size={16} className="mr-1" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-800/30 border-gray-600 text-white hover:bg-gray-700/50"
                >
                  <Share size={16} className="mr-1" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Selection and Chess Board */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Selection (when no game selected) */}
            {!currentGame && (
              <GameSelection
                games={availableGames}
                selectedGame={currentGame}
                onGameSelect={handleGameSelect}
                onImportGame={handleImportGame}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                theme={theme}
              />
            )}

            {/* Chess Board and Controls (when game selected) */}
            {currentGame && (
              <div className="space-y-6">
                {/* Chess Board */}
                <Card className="bg-gray-900 border-gray-700 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-center">
                      <div 
                        className="relative rounded-lg overflow-hidden shadow-2xl"
                        style={{ width: `${boardSize}px`, height: `${boardSize}px` }}
                      >
                        <Chessboard
                          position={getCurrentPosition()}
                          boardOrientation={reviewSession.boardOrientation}
                          arePiecesDraggable={false}
                          showBoardNotation={reviewSession.displaySettings.showCoordinates}
                          customBoardStyle={{
                            borderRadius: '8px',
                          }}
                          customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
                          customDarkSquareStyle={{ backgroundColor: '#b58863' }}
                        />
                      </div>
                    </div>

                    {/* Board Controls */}
                    <div className="mt-6 space-y-4">
                      {/* Move Navigation */}
                      <div className="flex items-center justify-center space-x-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveNavigation('start')}
                          disabled={currentMoveIndex === 0}
                          className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50"
                        >
                          <SkipBack size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveNavigation('back')}
                          disabled={!canNavigateBack}
                          className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50"
                        >
                          <ChevronLeft size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={toggleAutoPlay}
                          className={`px-6 ${isPlaying ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-green-500/20 border-green-500/30 text-green-400'}`}
                        >
                          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                          <span className="ml-2">{isPlaying ? 'Pause' : 'Play'}</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveNavigation('forward')}
                          disabled={!canNavigateForward}
                          className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50"
                        >
                          <ChevronRight size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveNavigation('end')}
                          disabled={currentMoveIndex >= totalMoves}
                          className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50"
                        >
                          <SkipForward size={16} />
                        </Button>
                      </div>

                      {/* Move Counter */}
                      <div className="text-center">
                        <div className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                          Move {currentMoveIndex} of {totalMoves}
                        </div>
                        {getCurrentMove() && (
                          <div className={`text-sm ${theme.text} opacity-70`}>
                            {getCurrentMove()!.color === 'white' ? '<FaChessKing className="w-4 h-4 inline" />' : '♚'} {getCurrentMove()!.san}
                          </div>
                        )}
                      </div>

                      {/* Display Settings */}
                      <div className="flex items-center justify-center space-x-6 p-4 bg-gray-800/30 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="coordinates"
                            checked={reviewSession.displaySettings.showCoordinates}
                            onCheckedChange={(checked) => 
                              updateDisplaySettings({ showCoordinates: checked })
                            }
                          />
                          <Label htmlFor="coordinates" className={`text-sm ${theme.text}`}>
                            Coordinates
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="evaluation-bar"
                            checked={reviewSession.displaySettings.showEvaluationBar}
                            onCheckedChange={(checked) => 
                              updateDisplaySettings({ showEvaluationBar: checked })
                            }
                          />
                          <Label htmlFor="evaluation-bar" className={`text-sm ${theme.text}`}>
                            Evaluation Bar
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="best-moves"
                            checked={reviewSession.displaySettings.showBestMoves}
                            onCheckedChange={(checked) => 
                              updateDisplaySettings({ showBestMoves: checked })
                            }
                          />
                          <Label htmlFor="best-moves" className={`text-sm ${theme.text}`}>
                            Best Moves
                          </Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Back to Games Button */}
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={() => selectGame('')}
                    className="bg-gray-800/30 border-gray-600 text-white hover:bg-gray-700/50"
                  >
                    <BookOpen size={18} className="mr-2" />
                    Back to Game Selection
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Analysis Panels */}
          <div className="space-y-6">
            {currentGame ? (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                  <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-500/20">
                    <FaBrain size={16} className="mr-2" />
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger value="engine" className="data-[state=active]:bg-purple-500/20">
                    <Eye size={16} className="mr-2" />
                    Engine
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="data-[state=active]:bg-green-500/20">
                    <BarChart3 size={16} className="mr-2" />
                    Stats
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="analysis" className="space-y-6">
                  <MoveAnalysis
                    currentMove={getCurrentMove()}
                    allMoves={currentGame.moves}
                    currentIndex={currentMoveIndex}
                    onMoveSelect={navigateToMove}
                    showEngineLines={reviewSession.displaySettings.showBestMoves}
                    theme={theme}
                  />
                </TabsContent>

                <TabsContent value="engine" className="space-y-6">
                  <EngineEvaluation
                    evaluation={getCurrentMove()?.evaluationAfter || 0}
                    bestMoves={getCurrentMove()?.alternativeMoves || []}
                    moveClassification={getCurrentMove()?.classification}
                    isAnalyzing={analysisState.isAnalyzing}
                    depth={15}
                    theme={theme}
                  />
                </TabsContent>

                <TabsContent value="stats" className="space-y-6">
                  <GameStatistics
                    performance={currentGame.performance.white} // Default to white's performance
                    timeAnalysis={currentGame.timeAnalysis}
                    keyPositions={currentGame.keyPositions}
                    playerColor="white"
                    theme={theme}
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <Card className={`bg-gradient-to-r ${theme.glassMorphism} border-gray-700 text-center p-8`}>
                <TestTube size={48} className={`mx-auto mb-4 ${theme.text} opacity-50`} />
                <h3 className={`text-xl font-semibold ${theme.text} mb-2`}>
                  Welcome to the Game Laboratory
                </h3>
                <p className={`${theme.text} opacity-70`}>
                  Select a game to begin your analysis journey and discover insights to improve your chess
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className={`text-xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Import Chess Game
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className={`${theme.text} opacity-80`}>
              Import functionality is a visual mockup. In the full application, you would be able to:
            </p>
            <ul className={`${theme.text} opacity-70 space-y-2 ml-4`}>
              <li>• Upload PGN files from your computer</li>
              <li>• Import games from Chess.com</li>
              <li>• Import games from Lichess</li>
              <li>• Paste PGN data directly</li>
              <li>• Connect to online game databases</li>
            </ul>
            <Button
              onClick={() => setShowImportDialog(false)}
              className={`w-full bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white font-semibold py-2 rounded-xl`}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default GameReviewPage
