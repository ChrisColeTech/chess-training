import React from 'react'
import { ArrowLeft, Sparkles } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { useThemeStore } from '@/stores/themeStore'
import { useMasterGames } from '@/hooks/useMasterGames'
import { GameLibrary, GameViewer, MasterAnalysis } from '@/components/study/masters'

/**
 * Master Games Page
 * Professional visual mockup for studying annotated master games
 * Following the golden standard architecture with proper SRP and DRY principles
 */
export const MasterGamesPage: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  // Use the custom hook for all business logic
  const {
    // Data state
    filteredGames,
    selectedGame,
    currentMove,
    libraryStats,
    
    // UI state  
    filters,
    isPlaying,
    playbackSpeed,
    boardOrientation,
    analysisMode,
    
    // Loading states
    isLoading,
    isLoadingGame,
    
    // Actions
    selectGame,
    setCurrentMove,
    togglePlayback,
    setPlaybackSpeed,
    updateFilters,
    toggleBookmark,
    // flipBoard, // Unused for now
    setAnalysisMode,
    
    // Game navigation
    // goToStart, // Unused for now
    // goToEnd, // Unused for now
    // nextMove, // Unused for now
    // previousMove, // Unused for now
    
    // Presentation handlers (business logic extracted to hook)
    handleBackClick,
    // handleFlipBoard, // Unused for now
    
    // Error handling
    error,
    clearError
  } = useMasterGames()

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} relative overflow-hidden`}>
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-xl animate-pulse-glow`} />
        <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-full opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`} />
        <div className={`absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br ${theme.secondary} rounded-full opacity-15 blur-lg animate-pulse-glow animation-delay-2000`} />
        
        {/* Moving Orbs */}
        <div className={`absolute top-10 right-1/3 w-16 h-16 bg-gradient-to-br ${theme.primary} rounded-full opacity-30 blur-md animate-float`} />
        <div className={`absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-lg animate-float animation-delay-3000`} />
        
        {/* Sparkle Effect */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-twinkle" />
          <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-500" />
          <div className="absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-white rounded-full animate-twinkle animation-delay-1500" />
          <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-white rounded-full animate-twinkle animation-delay-2500" />
        </div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleBackClick}
              variant="outline"
              className="bg-black/30 backdrop-blur-md border-white/20 text-white hover:bg-white/10 transition-all duration-200"
            >
              <ArrowLeft size={24} />
            </Button>
            <div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent flex items-center gap-3`}>
                <FaCrown size={40} className="text-yellow-400" />
                MASTERS HALL
                <Sparkles size={32} className="text-purple-400 animate-pulse" />
              </h1>
              <p className={`${theme.text} opacity-80 mt-1`}>
                Study legendary games from chess immortals • {libraryStats.totalGames} games in collection
              </p>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="bg-black/30 backdrop-blur-md border-white/20 rounded-xl p-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="text-center">
                <div className={`text-lg font-bold ${theme.text}`}>
                  {libraryStats.userStats.gamesStudied}
                </div>
                <div className={`${theme.text} opacity-60`}>Studied</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className={`text-lg font-bold ${theme.text}`}>
                  {libraryStats.averageRating}
                </div>
                <div className={`${theme.text} opacity-60`}>Avg Rating</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <div className={`text-lg font-bold ${theme.text}`}>
                  {libraryStats.userStats.averageStudyRating.toFixed(1)}
                </div>
                <div className={`${theme.text} opacity-60`}>Quality</div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl animate-slide-down">
            <div className="flex items-center justify-between">
              <p className="text-red-400">{error}</p>
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
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-220px)]">
          {/* Left Sidebar - Game Library */}
          <div className="col-span-3">
            <GameLibrary
              games={filteredGames}
              filters={filters}
              isLoading={isLoading}
              selectedGameId={selectedGame?.id}
              onGameSelect={selectGame}
              onFiltersChange={updateFilters}
              onBookmarkToggle={toggleBookmark}
              theme={theme}
            />
          </div>

          {/* Center - Game Viewer */}
          <div className="col-span-4">
            <GameViewer
              game={selectedGame}
              currentMove={currentMove}
              isPlaying={isPlaying}
              playbackSpeed={playbackSpeed}
              showCoordinates={true}
              showLastMove={true}
              orientation={boardOrientation}
              onMoveChange={setCurrentMove}
              onPlayToggle={togglePlayback}
              onSpeedChange={setPlaybackSpeed}
              theme={theme}
            />
          </div>

          {/* Right Panel - Analysis */}
          <div className="col-span-5">
            <MasterAnalysis
              game={selectedGame}
              currentMove={currentMove}
              mode={analysisMode}
              onModeChange={setAnalysisMode}
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* Floating Chess Piece Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-16 text-6xl opacity-5 animate-bounce-subtle delay-500">♚</div>
        <div className="absolute bottom-16 left-16 text-5xl opacity-5 animate-bounce-subtle delay-1000">♛</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">♜</div>
        <div className="absolute bottom-1/3 left-1/4 text-7xl opacity-5 animate-bounce-subtle delay-2000">♞</div>
        <div className="absolute top-2/3 right-2/3 text-3xl opacity-5 animate-bounce-subtle delay-2500">♝</div>
      </div>

      {/* Keyboard Shortcuts Hint (Hidden by default, shown on hover) */}
      <div className="fixed bottom-4 right-4 bg-black/30 backdrop-blur-md border-white/10 rounded-lg p-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none hover:pointer-events-auto">
        <div className="text-xs text-white/70">
          <div>← / → : Navigate moves</div>
          <div>Space : Play/Pause</div>
          <div>Home/End : Start/End</div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoadingGame && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-black/30 backdrop-blur-md border-white/20 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Loading Master Game</h3>
            <p className="text-white/70">Preparing position analysis...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MasterGamesPage