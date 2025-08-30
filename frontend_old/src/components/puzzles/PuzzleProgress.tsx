import React from 'react'
import { Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { PuzzleProgressProps } from '@/types/openingPuzzles'
import { usePuzzlesPage } from "@/hooks/pages/usePuzzlesPage"

/**
 * Progress tracking card for puzzle completion and stats
 * Follows the style guide for card design and theme integration
 */
export const PuzzleProgress: React.FC<PuzzleProgressProps> = ({
  currentPuzzleIndex,
  totalPuzzles,
  theme
}) => {
  // Get progress data from API
  const { progressData, isLoadingProgress } = usePuzzlesPage()
  
  // Default stats while loading or if no data
  const defaultStats = [
    { label: "Accuracy", value: 87 },
    { label: "Rating", value: 1247 },
    { label: "Streak", value: 42 }
  ]
  
  const displayStats = progressData ? [
    { label: "Accuracy", value: Math.round(progressData.accuracy) },
    { label: "Rating", value: progressData.averageTime },
    { label: "Streak", value: progressData.currentStreak }
  ] : defaultStats
  
  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:shadow-cyan-500/25 hover:border-white/20 transition-all duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Puzzles completed</span>
            <span>{currentPuzzleIndex} / {totalPuzzles}</span>
          </div>
          <Progress 
            value={(currentPuzzleIndex / totalPuzzles) * 100} 
            className="h-2 bg-black/30"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
          {displayStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-lg font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-xs opacity-75">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

