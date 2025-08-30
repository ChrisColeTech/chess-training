import React from 'react'
import { Card } from "@/components/ui/card"
import { useThemeStore } from '@/stores/themeStore'
import { usePuzzleSession } from '@/hooks/usePuzzleSession'
import { useTimer } from '@/hooks/useTimer'
import { usePuzzlesPage } from '@/hooks/pages/usePuzzlesPage'
import { 
  PuzzleBoard, 
  PuzzleControls, 
  PuzzleHeader, 
  PuzzleInfo, 
  PuzzleProgress, 
  PuzzleTabs 
} from '@/components/puzzles'
import { FaChessBishop } from 'react-icons/fa'

/**
 * Opening Puzzles Page
 * Refactored to follow SRP and DRY principles with proper separation of concerns
 * All business logic extracted to custom hooks and services
 */
export const OpeningPuzzlesPage: React.FC = () => {
  // Theme management
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  // API hooks for puzzle data
  const { 
    useCategoryPuzzles,
    isLoading: isLoadingPuzzles,
    error: puzzleError
  } = usePuzzlesPage()
  
  const { 
    data: openingPuzzles, 
    isLoading: isLoadingOpening, 
    error: openingError 
  } = useCategoryPuzzles('opening')

  // Puzzle session management (extracted to custom hook)
  const puzzleSession = usePuzzleSession(openingPuzzles?.puzzles || [])
  const { 
    session, 
    currentPuzzle, 
    onPieceDrop, 
    resetPuzzle, 
    nextPuzzle, 
    previousPuzzle, 
    showNextHint, 
    getCurrentHint, 
    skipPuzzle,
    updateTimer,
    canGoPrevious,
    canGoNext
  } = puzzleSession

  // Timer management (extracted to custom hook)
  const timer = useTimer(session.isTimerActive, updateTimer)

  return (
    <div className={`min-h-full`}>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Component */}
        <PuzzleHeader
          title="Opening Puzzles"
          description="Master opening theory and avoid common traps"
          currentIndex={session.currentPuzzleIndex}
          totalPuzzles={openingPuzzles?.puzzles?.length || 0}
          timeElapsed={session.timeElapsed}
          theme={theme}
        />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chess Board Component - Prominent & Board-Centric (70% width) */}
          <div className="lg:w-[70%] flex justify-center">
            <div className="w-full max-w-none">
              <PuzzleBoard
                position={session.boardPosition}
                onPieceDrop={onPieceDrop}
              />
              
              {/* Board Controls Component */}
              <div className="mt-6">
                <PuzzleControls
                  currentPuzzleIndex={session.currentPuzzleIndex}
                totalPuzzles={openingPuzzles?.puzzles?.length || 0}
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
                onPrevious={previousPuzzle}
                onNext={nextPuzzle}
                onReset={resetPuzzle}
                onSkip={skipPuzzle}
              />
              </div>
            </div>
          </div>

          {/* Right Panel with Components - Compact Side Panel (30% width) */}
          <div className="lg:w-[30%] lg:max-w-sm space-y-6">
            <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:shadow-cyan-500/25 hover:border-white/20 transition-all duration-500">
              <div className="p-4">
                {session.activeTab === 'puzzle' ? (
                  <PuzzleInfo
                    puzzle={currentPuzzle}
                    session={session}
                    onRequestHint={showNextHint}
                    getCurrentHint={getCurrentHint}
                    formatTime={timer.formatTime}
                  />
                ) : (
                  <PuzzleTabs
                    puzzle={currentPuzzle}
                    theme={theme}
                  />
                )}
              </div>
            </Card>

            {/* Progress Component */}
            <PuzzleProgress
              currentPuzzleIndex={session.currentPuzzleIndex}
              totalPuzzles={openingPuzzles?.puzzles?.length || 0}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpeningPuzzlesPage