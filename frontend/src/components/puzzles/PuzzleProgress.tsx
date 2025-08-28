import React from 'react'
import { Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { PuzzleProgressProps } from '@/types/openingPuzzles'

/**
 * Progress tracking card for puzzle completion and stats
 * Follows the style guide for card design and theme integration
 */
export const PuzzleProgress: React.FC<PuzzleProgressProps> = ({
  currentPuzzleIndex,
  totalPuzzles,
  theme
}) => {
  return (
    <Card className="backdrop-blur-xl bg-black/20 border-white/10 hover:shadow-cyan-500/25 hover:border-white/20 transition-all duration-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Opening Progress
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
          <div className="text-center">
            <div className={`text-lg font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
              92%
            </div>
            <div className="text-xs opacity-75">Opening Accuracy</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
              1,340
            </div>
            <div className="text-xs opacity-75">Theory Rating</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}>
              28
            </div>
            <div className="text-xs opacity-75">Traps Learned</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}