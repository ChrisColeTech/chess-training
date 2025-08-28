import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, Database, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useThemeStore } from '@/stores/themeStore'
import { useOpeningExplorer } from '@/hooks/useOpeningExplorer'
import {
  OpeningSearch,
  VariationTree,
  MasterGames,
  OpeningBoard,
  OpeningInfo
} from '@/components/study/explorer'


/**
 * Opening Explorer Page - OPENING ARCHIVE themed interface
 * Professional opening database explorer with ECO codes, variations, and master games
 */
export const OpeningExplorerPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  // Use the extracted hook for all business logic
  const {
    // Data state
    currentOpening,
    currentPosition,
    moveSequence,
    boardOrientation,
    searchResults,
    filters,
    isSearching,
    currentVariations,
    expandedNodes,
    // positionAnalysis, // Unused for now
    // isAnalyzing, // Unused for now
    masterGames,
    isLoadingGames,
    activeTab,
    // Actions
    // selectOpening, // Unused for now
    makeMove,
    resetPosition,
    // loadPosition, // Unused for now
    updateFilters,
    // searchOpenings, // Unused for now
    // analyzePosition, // Unused for now
    // selectVariation, // Unused for now
    toggleNode,
    setActiveTab,
    flipBoard,
    copyFEN,
    copyPGN,
    // Presentation handlers (business logic extracted to hook)
    handleOpeningSelect,
    handleVariationSelect,
    handleGameSelect,
    // Error handling
    error,
    clearError
  } = useOpeningExplorer()

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${theme.background} ${theme.text}`}>
      {/* Opening explorer background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Knowledge orbs */}
        <div className={`absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br ${theme.accent} rounded-full opacity-6 blur-3xl animate-pulse-glow`}></div>
        <div className={`absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-gradient-to-br ${theme.highlight} rounded-full opacity-10 blur-3xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 -left-20 w-64 h-64 bg-gradient-to-br ${theme.secondary} rounded-full opacity-5 blur-3xl animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Explorer sparkles */}
        <div className="absolute inset-0">
          {[...Array(45)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Knowledge symbols */}
        <div className="absolute top-16 right-16 text-8xl opacity-4 animate-bounce-subtle delay-500 transform rotate-12"><BookOpen className="w-4 h-4 inline" /></div>
        <div className="absolute bottom-16 left-16 text-6xl opacity-4 animate-bounce-subtle delay-1000 transform -rotate-12">🌲</div>
        <div className="absolute top-1/3 left-20 text-5xl opacity-3 animate-bounce-subtle delay-1500 transform rotate-30"><Search className="w-4 h-4 inline" /></div>
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Explorer header */}
        <div className="flex items-center justify-between p-8">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/dashboard')}
              className="backdrop-blur-2xl bg-black/30 border-white/20 hover:bg-black/40 hover:border-white/30 hover:scale-105 transition-all duration-300 p-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className={`text-6xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent drop-shadow-2xl`}>
                OPENING EXPLORER
              </h1>
              <p className={`${theme.text} opacity-90 mt-2 text-xl font-medium tracking-wide`}>
                Comprehensive ECO database and opening analysis
              </p>
            </div>
          </div>

          {/* Database stats */}
          <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl p-6 border-2">
            <div className="text-center">
              <div className={`text-2xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent mb-1`}>
                500+
              </div>
              <div className="text-sm opacity-80 font-medium uppercase tracking-wider">ECO Codes</div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-8 grid grid-cols-12 gap-8">
          {/* Left panel - Search & openings */}
          <div className="col-span-3 space-y-6">
            <OpeningSearch
              filters={filters}
              onFiltersChange={updateFilters}
              results={searchResults}
              isLoading={isSearching}
              theme={theme}
            />
            
            {searchResults && searchResults.openings.length > 0 && (
              <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6">
                <h3 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Search Results
                </h3>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {searchResults.openings.map((opening, index) => (
                    <div
                      key={index}
                      className={`p-3 backdrop-blur-xl bg-black/20 border border-white/10 rounded-lg cursor-pointer transition-all hover:bg-black/30 ${
                        currentOpening?.eco === opening.eco ? 'border-white/30 bg-black/40' : ''
                      }`}
                      onClick={() => handleOpeningSelect(opening)}
                    >
                      <div className="font-semibold text-sm mb-1">{opening.name}</div>
                      <div className="text-xs opacity-75">ECO: {opening.eco}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Center - Chess Board */}
          <div className="col-span-6">
            <OpeningBoard
              position={currentPosition}
              onMove={makeMove}
              allowMoves={true}
              orientation={boardOrientation}
              showCoordinates={true}
              theme={theme}
            />
            
            {/* Position info */}
            {currentOpening && (
              <div className="flex justify-center gap-4 mt-6">
                <div className="backdrop-blur-xl bg-black/30 border-white/20 rounded-xl p-3 border text-center">
                  <div className="font-bold text-lg">{currentOpening.eco}</div>
                  <div className="text-xs opacity-75">ECO Code</div>
                </div>
                <div className="backdrop-blur-xl bg-black/30 border-white/20 rounded-xl p-3 border text-center">
                  <div className="font-bold text-lg">{currentOpening.games.toLocaleString()}</div>
                  <div className="text-xs opacity-75">Games</div>
                </div>
                <div className="backdrop-blur-xl bg-black/30 border-white/20 rounded-xl p-3 border text-center">
                  <div className="font-bold text-lg">{currentOpening.avgRating}</div>
                  <div className="text-xs opacity-75">Avg Rating</div>
                </div>
              </div>
            )}

            {/* Move sequence */}
            <div className="flex justify-center mt-4">
              <div className="backdrop-blur-xl bg-black/20 border-white/10 rounded-lg p-3 border max-w-md">
                <div className="text-sm font-mono text-center">
                  {moveSequence.length > 0 
                    ? moveSequence.map((move, i) => `${Math.floor(i/2) + 1}${i % 2 === 0 ? '.' : '...'} ${move}`).join(' ')
                    : 'Starting position'
                  }
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex justify-center gap-2 mt-4">
              <Button size="sm" variant="outline" onClick={resetPosition}>
                Reset Position
              </Button>
              <Button size="sm" variant="outline" onClick={flipBoard}>
                Flip Board
              </Button>
              <Button size="sm" variant="outline" onClick={copyFEN}>
                Copy FEN
              </Button>
              <Button size="sm" variant="outline" onClick={copyPGN}>
                Copy PGN
              </Button>
            </div>
          </div>

          {/* Right panel - Analysis tabs */}
          <div className="col-span-3 space-y-6">
            {/* Variations */}
            <VariationTree
              currentPosition={currentPosition}
              variations={currentVariations}
              onVariationSelect={handleVariationSelect}
              expandedNodes={expandedNodes}
              onNodeToggle={toggleNode}
              theme={theme}
            />
            
            {/* Opening info */}
            {currentOpening && (
              <OpeningInfo
                opening={currentOpening}
                currentPosition={currentPosition}
                moveSequence={moveSequence}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                theme={theme}
              />
            )}
            
            {/* Master games */}
            {currentOpening && (
              <MasterGames
                opening={currentOpening}
                games={masterGames}
                onGameSelect={handleGameSelect}
                isLoading={isLoadingGames}
                theme={theme}
              />
            )}
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div className="fixed bottom-4 right-4 p-4 bg-red-500/90 border border-red-400 rounded-lg backdrop-blur-xl z-50">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-white">{error}</span>
              <Button size="sm" variant="ghost" onClick={clearError}>
                ×
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OpeningExplorerPage
