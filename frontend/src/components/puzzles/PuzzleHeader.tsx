import React from 'react'
import { ArrowLeft, Clock, BookOpen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { soundFX } from '@/utils/soundEffects'

interface PuzzleHeaderProps {
  title: string
  description: string
  currentIndex: number
  totalPuzzles: number
  timeElapsed: number
  theme: any
}

/**
 * Header component for puzzle pages with navigation and stats
 * Follows the style guide for layout and theme integration
 */
export const PuzzleHeader: React.FC<PuzzleHeaderProps> = ({
  title,
  description,
  currentIndex,
  totalPuzzles,
  timeElapsed,
  theme
}) => {
  const navigate = useNavigate()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleBackClick = () => {
    soundFX.playClick()
    navigate('/puzzles')
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackClick}
          className="backdrop-blur-xl bg-black/20 border-white/10 hover:bg-black/30 hover:border-white/20 active:animate-button-press transition-all duration-300 gpu-accelerated"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
            {title}
          </h1>
          <p className={`${theme.text} opacity-80 mt-1`}>
            {description}
          </p>
        </div>
      </div>

      {/* Timer and stats */}
      <div className="flex items-center gap-4">
        <Card className="backdrop-blur-xl bg-black/20 border-white/10">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-xl bg-black/20 border-white/10">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{currentIndex + 1} / {totalPuzzles}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}