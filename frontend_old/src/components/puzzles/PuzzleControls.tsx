import React from 'react'
import { ArrowLeft, ArrowRight, RefreshCw, SkipForward } from 'lucide-react'
import { Button } from "@/components/ui/button"
import type { PuzzleControlsProps } from '@/types/openingPuzzles'

/**
 * Navigation and control buttons for puzzle interface
 * Follows the style guide for button hierarchy and animations
 */
export const PuzzleControls: React.FC<PuzzleControlsProps> = ({
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onReset,
  onSkip
}) => {
  return (
    <div className="flex justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30 hover:border-white/30 active:animate-button-press transition-all duration-300 gpu-accelerated"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30 hover:border-white/30 active:animate-button-press transition-all duration-300 gpu-accelerated"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Reset
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onSkip}
        className="backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30 hover:border-white/30 active:animate-button-press transition-all duration-300 gpu-accelerated"
      >
        <SkipForward className="w-4 h-4 mr-2" />
        Skip
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={!canGoNext}
        className="backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30 hover:border-white/30 active:animate-button-press transition-all duration-300 gpu-accelerated"
      >
        Next
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}