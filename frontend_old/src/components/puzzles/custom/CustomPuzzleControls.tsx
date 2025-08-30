import React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, RotateCcw, SkipForward, Bookmark, Download, CheckCircle } from 'lucide-react'
import type { CustomPuzzleControlsProps } from '@/types/customPuzzles'

/**
 * Custom puzzle navigation and action controls
 * Handles puzzle navigation, reset, skip, bookmark, and share actions
 * Follows SRP - only handles control actions and UI
 */
export const CustomPuzzleControls: React.FC<CustomPuzzleControlsProps> = ({
  currentPuzzleIndex,
  totalPuzzles,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onReset,
  onSkip,
  onBookmark,
  onShare,
  isBookmarked
}) => {
  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:border-white/20 transition-all duration-500 p-4">
      <div className="flex flex-col space-y-4">
        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            className="bg-black/30 border-white/20 text-white hover:bg-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed gpu-accelerated"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="flex-1 text-center mx-4">
            <div className="text-sm text-gray-300">
              Puzzle {currentPuzzleIndex + 1} of {totalPuzzles}
            </div>
            <div className="w-full bg-black/40 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentPuzzleIndex + 1) / totalPuzzles) * 100}%`
                }}
              />
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={!canGoNext}
            className="bg-black/30 border-white/20 text-white hover:bg-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed gpu-accelerated"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Action Controls */}
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="bg-black/30 border-white/20 text-white hover:bg-white/10 hover:border-white/30 hover-grow active:animate-button-press transition-all duration-300 gpu-accelerated"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onSkip}
            className="bg-black/30 border-orange-500/30 text-orange-300 hover:bg-orange-500/10 hover:border-orange-500/50 hover-grow active:animate-button-press transition-all duration-300 gpu-accelerated"
          >
            <SkipForward className="w-4 h-4 mr-1" />
            Skip
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onBookmark}
            className={`border-white/20 hover:border-white/30 hover-grow active:animate-button-press transition-all duration-300 gpu-accelerated ${
              isBookmarked 
                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/30'
                : 'bg-black/30 text-white hover:bg-white/10'
            }`}
          >
            {isBookmarked ? (
              <CheckCircle className="w-4 h-4 mr-1" />
            ) : (
              <Bookmark className="w-4 h-4 mr-1" />
            )}
            {isBookmarked ? 'Saved' : 'Save'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="bg-black/30 border-green-500/30 text-green-300 hover:bg-green-500/10 hover:border-green-500/50 hover-grow active:animate-button-press transition-all duration-300 gpu-accelerated"
          >
            <Download className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default CustomPuzzleControls