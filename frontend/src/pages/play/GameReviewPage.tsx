import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chessboard } from 'react-chessboard'
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, BookOpen, BarChart3, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useThemeStore } from '@/stores/themeStore'
import { useGameReview } from '@/hooks/useGameReview'
import { soundFX } from '@/utils/soundEffects'
import { 
  GameSelection, 
  MoveAnalysis, 
  EngineEvaluation, 
  GameStatistics 
} from '@/components/review'
import type { GameReview } from '@/types/gameReview'

const GameReviewPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  // Local state for UI controls
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('analysis')
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

  const handleGameSelect = (game: GameReview) => {
    selectGame(game.id)
  }

  const handleBackToDashboard = () => {
    soundFX.playClick()
    navigate('/dashboard')
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
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text}`}>
      <div className="container mx-auto px-6 py-8">
        {/* Simple header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToDashboard}
              className="hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Game Review
            </h1>
          </div>
          
          {currentGame && (
            <div className="text-right">
              <p className={`text-lg font-semibold ${theme.text}`}>
                {currentGame.gameInfo.white} vs {currentGame.gameInfo.black}
              </p>
              <div className="flex items-center gap-2 justify-end mt-1">
                <Badge className={`${
                  currentGame.gameInfo.result === '1-0' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                  currentGame.gameInfo.result === '0-1' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                }`}>
                  {currentGame.gameInfo.result}
                </Badge>
                <span className={`text-sm ${theme.text} opacity-70`}>
                  {currentGame.gameInfo.date}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Game Selection (when no game selected) */}
          {!currentGame && (
            <div className="lg:col-span-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <h2 className="text-xl font-semibold mb-4">Your Recent Games</h2>
                <p className="text-sm opacity-60 mb-6">
                  Review games you've played in the app. Games are automatically saved after completion.
                </p>
                
                <div className="space-y-3">
                  {availableGames.slice(0, 5).map((game) => (
                    <div
                      key={game.id}
                      onClick={() => handleGameSelect(game)}
                      className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">
                            {game.gameInfo.white} vs {game.gameInfo.black}
                          </p>
                          <p className="text-sm opacity-60">
                            {game.gameInfo.date} • {game.moves.length} moves
                          </p>
                        </div>
                        <Badge className={`${
                          game.gameInfo.result === '1-0' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                          game.gameInfo.result === '0-1' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }`}>
                          {game.gameInfo.result}
                        </Badge>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </div>
                  ))}
                  
                  {availableGames.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p className="text-lg font-medium mb-2">No games yet</p>
                      <p className="text-sm opacity-60">
                        Play some games against the computer to see them here for review
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Chess Board (when game selected) */}
          {currentGame && (
            <>
              <div className="lg:col-span-3">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <div className="aspect-square max-w-2xl mx-auto">
                    <Chessboard
                      position={getCurrentPosition()}
                      boardOrientation={reviewSession.boardOrientation}
                      arePiecesDraggable={false}
                      showBoardNotation={reviewSession.displaySettings.showCoordinates}
                      customBoardStyle={{
                        borderRadius: '8px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                      }}
                      customLightSquareStyle={{ 
                        backgroundColor: '#f0d9b5',
                      }}
                      customDarkSquareStyle={{ 
                        backgroundColor: '#b58863',
                      }}
                    />
                  </div>

                  {/* Playback Controls */}
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveNavigation('start')}
                        disabled={currentMoveIndex === 0}
                        className="bg-white/5 border-white/20 hover:bg-white/10"
                      >
                        <SkipBack size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveNavigation('back')}
                        disabled={!canNavigateBack}
                        className="bg-white/5 border-white/20 hover:bg-white/10"
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
                        className="bg-white/5 border-white/20 hover:bg-white/10"
                      >
                        <ChevronRight size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveNavigation('end')}
                        disabled={currentMoveIndex >= totalMoves}
                        className="bg-white/5 border-white/20 hover:bg-white/10"
                      >
                        <SkipForward size={16} />
                      </Button>
                    </div>

                    <div className="text-center">
                      <div className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                        Move {currentMoveIndex} of {totalMoves}
                      </div>
                      {getCurrentMove() && (
                        <div className={`text-sm ${theme.text} opacity-70`}>
                          {getCurrentMove()!.color === 'white' ? '♔' : '♚'} {getCurrentMove()!.san}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      onClick={() => selectGame('')}
                      className="bg-white/5 border-white/20 hover:bg-white/10"
                    >
                      <BookOpen size={18} className="mr-2" />
                      Back to Games
                    </Button>
                  </div>
                </div>
              </div>

              {/* Analysis Panel */}
              <div className="lg:col-span-1 space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 bg-white/5">
                    <TabsTrigger value="analysis">
                      <FaBrain size={14} />
                    </TabsTrigger>
                    <TabsTrigger value="engine">
                      <Eye size={14} />
                    </TabsTrigger>
                    <TabsTrigger value="stats">
                      <BarChart3 size={14} />
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="analysis">
                    <MoveAnalysis
                      currentMove={getCurrentMove()}
                      allMoves={currentGame.moves}
                      currentIndex={currentMoveIndex}
                      onMoveSelect={navigateToMove}
                      showEngineLines={reviewSession.displaySettings.showBestMoves}
                      theme={theme}
                    />
                  </TabsContent>

                  <TabsContent value="engine">
                    <EngineEvaluation
                      evaluation={getCurrentMove()?.evaluationAfter || 0}
                      bestMoves={getCurrentMove()?.alternativeMoves || []}
                      moveClassification={getCurrentMove()?.classification}
                      isAnalyzing={analysisState.isAnalyzing}
                      depth={15}
                      theme={theme}
                    />
                  </TabsContent>

                  <TabsContent value="stats">
                    <GameStatistics
                      performance={currentGame.performance.white}
                      timeAnalysis={currentGame.timeAnalysis}
                      keyPositions={currentGame.keyPositions}
                      playerColor="white"
                      theme={theme}
                    />
                  </TabsContent>
                </Tabs>

                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <h3 className="font-semibold mb-3">Display Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="coordinates" className="text-sm">Coordinates</Label>
                      <Switch
                        id="coordinates"
                        checked={reviewSession.displaySettings.showCoordinates}
                        onCheckedChange={(checked) => 
                          updateDisplaySettings({ showCoordinates: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="best-moves" className="text-sm">Best Moves</Label>
                      <Switch
                        id="best-moves"
                        checked={reviewSession.displaySettings.showBestMoves}
                        onCheckedChange={(checked) => 
                          updateDisplaySettings({ showBestMoves: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default GameReviewPage
