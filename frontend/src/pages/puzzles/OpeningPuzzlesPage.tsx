import React from 'react'
import { Card } from "@/components/ui/card"
import { useThemeStore } from '@/stores/themeStore'
import { usePuzzleSession } from '@/hooks/usePuzzleSession'
import { useTimer } from '@/hooks/useTimer'
import { mockOpeningPuzzles } from '@/data/openingPuzzles'
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

  // Puzzle session management (extracted to custom hook)
  const puzzleSession = usePuzzleSession(mockOpeningPuzzles)
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
    <div className={`min-h-screen p-4 transition-all duration-300 bg-gradient-to-br ${theme.background} ${theme.text}`}>
      {/* Enhanced gaming background effects - follows style guide */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-full opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br ${theme.secondary} rounded-full opacity-15 blur-lg animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Sparkle effects */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Chess piece decorations */}
        <div className="absolute top-10 right-10 text-6xl opacity-5 animate-bounce-subtle delay-500"><FaChessBishop className="w-4 h-4 inline" /></div>
        <div className="absolute bottom-10 left-10 text-5xl opacity-5 animate-bounce-subtle delay-1000">♞</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-5 animate-bounce-subtle delay-1500">♜</div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Component */}
        <PuzzleHeader
          title="Opening Puzzles"
          description="Master opening theory and avoid common traps"
          currentIndex={session.currentPuzzleIndex}
          totalPuzzles={mockOpeningPuzzles.length}
          timeElapsed={session.timeElapsed}
          theme={theme}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chess Board Component */}
          <div className="xl:col-span-2">
            <PuzzleBoard
              position={session.boardPosition}
              onPieceDrop={onPieceDrop}
            />
            
            {/* Board Controls Component */}
            <div className="mt-6">
              <PuzzleControls
                currentPuzzleIndex={session.currentPuzzleIndex}
                totalPuzzles={mockOpeningPuzzles.length}
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
                onPrevious={previousPuzzle}
                onNext={nextPuzzle}
                onReset={resetPuzzle}
                onSkip={skipPuzzle}
              />
            </div>
          </div>

          {/* Right Panel with Components */}
          <div className="space-y-6">
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
              totalPuzzles={mockOpeningPuzzles.length}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpeningPuzzlesPage