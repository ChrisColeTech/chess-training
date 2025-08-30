import React from 'react'
import { Card } from "@/components/ui/card"
import { useThemeStore } from '@/stores/themeStore'
import { useCustomPuzzles } from '@/hooks/useCustomPuzzles'
import { useTimer } from '@/hooks/useTimer'
import { usePuzzlesPage } from "@/hooks/pages/usePuzzlesPage"
import { 
  PuzzleBoard, 
  PuzzleHeader, 
  PuzzleProgress 
} from '@/components/puzzles'
import {
  CustomPuzzleControls,
  CustomPuzzleInfo,
  CustomPuzzleCollectionBrowser,
  CustomPuzzleImportExport,
  CustomPuzzleFilters
} from '@/components/puzzles/custom'
import { Sparkles, Target } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'

/**
 * Custom Puzzles Page
 * Refactored to follow SRP and DRY principles with proper separation of concerns
 * All business logic extracted to custom hooks and services
 * Following the EXACT same architectural pattern as OpeningPuzzlesPage
 */
export const CustomPuzzlesPage: React.FC = () => {
  // Theme management
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  // Custom puzzle session management (extracted to custom hook)
  // API hooks for puzzle data
  const { 
    useCategoryPuzzles,
    isLoading: isLoadingPuzzles,
    error: puzzleError
  } = usePuzzlesPage()
  
  const { 
    data: customPuzzles, 
    isLoading: isLoadingCustom, 
    error: customError 
  } = useCategoryPuzzles("custom")

  // Custom puzzle session management (extracted to custom hook)
  const customPuzzleSession = useCustomPuzzles(customPuzzles?.puzzles || [])
  const { 
    session, 
    currentPuzzle, 
    // filteredPuzzles, // Unused for now
    totalPuzzles,
    onPieceDrop, 
    resetPuzzle, 
    nextPuzzle, 
    previousPuzzle, 
    showNextHint, 
    getCurrentHint, 
    skipPuzzle, 
    setActiveTab,
    updateTimer,
    updateSearchQuery,
    updateFilters,
    // updateSorting, // Unused for now
    clearFiltersAndSearch,
    bookmarkPuzzle,
    sharePuzzle,
    // goToPuzzle, // Unused for now
    canGoPrevious,
    canGoNext,
    hasFiltersActive
  } = customPuzzleSession

  // Timer management (extracted to custom hook)
  const timer = useTimer(session.isTimerActive, updateTimer)

  // Mock handlers for import/export and collection management
  const handleImportPGN = (file: File) => {
    console.log('Importing PGN file:', file.name)
    // In real app, would call CustomPuzzleService.importPuzzlesFromPGN
  }

  const handleImportFromURL = (url: string) => {
    console.log('Importing from URL:', url)
    // In real app, would make API call to import from external source
  }

  const handleExportCollection = (collectionId: string, format: 'pgn' | 'json') => {
    console.log('Exporting collection:', collectionId, 'as', format)
    // In real app, would call CustomPuzzleService.exportPuzzlesToPGN or similar
  }

  const handleSelectCollection = (collection: any) => {
    console.log('Selected collection:', collection.name)
    // In real app, would filter puzzles by collection
    updateFilters({ collections: [collection.id] })
    setActiveTab('puzzle')
  }

  const handleCreateCollection = () => {
    console.log('Creating new collection')
    // In real app, would open collection creation modal
  }

  const handleImportCollection = () => {
    console.log('Importing collection')
    // In real app, would open import modal
    setActiveTab('import')
  }

  // Get available themes and tags for filtering
  // Default themes and tags for now - could come from API later
  const availableThemes = ["tactics", "endgame", "middlegame", "opening"]
  const availableTags = ["pin", "fork", "skewer", "checkmate", "sacrifice"]

  // Loading state
  if (isLoadingPuzzles || isLoadingCustom) {
    return (
      <div className={`min-h-full`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading custom puzzles...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (puzzleError || customError) {
    return (
      <div className={`min-h-full`}>
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to load puzzles</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    )
  }


  return (
    <div className={`min-h-full`}>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Component */}
        <PuzzleHeader
          title="Custom Puzzles"
          description="Create, share, and solve community-created chess puzzles"
          currentIndex={session.currentPuzzleIndex}
          totalPuzzles={totalPuzzles}
          timeElapsed={session.timeElapsed}
          theme={theme}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chess Board Component */}
          <div className="xl:col-span-2">
            {currentPuzzle ? (
              <PuzzleBoard
                position={session.boardPosition}
                onPieceDrop={onPieceDrop}
              />
            ) : (
              <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:border-white/20 transition-all duration-500 aspect-square flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-4"><Target className="w-4 h-4 inline" /></div>
                  <div className="text-lg font-medium mb-2">No Puzzles Found</div>
                  <div className="text-sm">
                    {hasFiltersActive ? 
                      'Try adjusting your filters or search criteria' : 
                      'Create your first custom puzzle to get started'
                    }
                  </div>
                </div>
              </Card>
            )}
            
            {/* Board Controls Component */}
            {currentPuzzle && (
              <div className="mt-6">
                <CustomPuzzleControls
                  currentPuzzleIndex={session.currentPuzzleIndex}
                  totalPuzzles={totalPuzzles}
                  canGoPrevious={canGoPrevious}
                  canGoNext={canGoNext}
                  onPrevious={previousPuzzle}
                  onNext={nextPuzzle}
                  onReset={resetPuzzle}
                  onSkip={skipPuzzle}
                  onBookmark={bookmarkPuzzle}
                  onShare={sharePuzzle}
                  isBookmarked={currentPuzzle.isBookmarked}
                />
              </div>
            )}
          </div>

          {/* Right Panel with Components */}
          <div className="space-y-6">
            {/* Tab-based Content */}
            <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:shadow-cyan-500/25 hover:border-white/20 transition-all duration-500">
              {/* Tab Navigation */}
              <div className="p-4 border-b border-white/10">
                <div className="flex space-x-1 bg-black/20 p-1 rounded-lg">
                  {[
                    { key: 'puzzle', label: '🧩 Puzzle', icon: '🧩' },
                    { key: 'collection', label: '<BookOpen className="w-4 h-4 inline" /> Collections', icon: '<BookOpen className="w-4 h-4 inline" />' },
                    { key: 'import', label: '📥 Import', icon: '📥' },
                    { key: 'share', label: '🔗 Share', icon: '🔗' }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        session.activeTab === tab.key
                          ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                {session.activeTab === 'puzzle' && currentPuzzle && (
                  <CustomPuzzleInfo
                    puzzle={currentPuzzle}
                    session={session}
                    onRequestHint={showNextHint}
                    getCurrentHint={getCurrentHint}
                    formatTime={timer.formatTime}
                    onEdit={() => console.log('Edit puzzle:', currentPuzzle.id)}
                    onDelete={() => console.log('Delete puzzle:', currentPuzzle.id)}
                  />
                )}

                {session.activeTab === 'collection' && (
                  <CustomPuzzleCollectionBrowser
                    collections={customPuzzles?.collections || []}
                    userCollections={mockCustomPuzzleCollections.filter(c => c.author.id === 'user_123')}
                    onSelectCollection={handleSelectCollection}
                    onCreateCollection={handleCreateCollection}
                    onImportCollection={handleImportCollection}
                    theme={theme}
                    isLoading={false}
                  />
                )}

                {session.activeTab === 'import' && (
                  <CustomPuzzleImportExport
                    onImportPGN={handleImportPGN}
                    onImportFromURL={handleImportFromURL}
                    onExportCollection={handleExportCollection}
                    theme={theme}
                    importProgress={undefined}
                  />
                )}

                {session.activeTab === 'share' && currentPuzzle && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🔗</div>
                    <div className="text-white font-medium mb-2">Share This Puzzle</div>
                    <div className="text-gray-400 text-sm mb-4">
                      Share "{currentPuzzle.title}" with others
                    </div>
                    <button
                      onClick={sharePuzzle}
                      className={`px-6 py-3 bg-gradient-to-r ${theme.primary} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover-glow active:animate-button-press transition-all duration-300 gpu-accelerated`}
                    >
                      Copy Share Link
                    </button>
                  </div>
                )}
              </div>
            </Card>

            {/* Search and Filters */}
            <CustomPuzzleFilters
              filters={session.filters}
              searchQuery={session.searchQuery}
              onFiltersChange={updateFilters}
              onSearchChange={updateSearchQuery}
              onClearAll={clearFiltersAndSearch}
              availableThemes={availableThemes}
              availableTags={availableTags}
              theme={theme}
            />

            {/* Progress Component */}
            <PuzzleProgress
              currentPuzzleIndex={session.currentPuzzleIndex}
              totalPuzzles={totalPuzzles}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomPuzzlesPage