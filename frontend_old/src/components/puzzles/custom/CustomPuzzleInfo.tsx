import React from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Info, Settings, Star, Target, Trash, User } from 'lucide-react'
import type { CustomPuzzleInfoProps } from '@/types/customPuzzles'
// Default source icon mapping'

/**
 * Custom puzzle information panel
 * Displays puzzle details, hints, statistics, and provides hint functionality
 * Follows SRP - only handles puzzle information display and hint management
 */
export const CustomPuzzleInfo: React.FC<CustomPuzzleInfoProps> = ({
  puzzle,
  session,
  onRequestHint,
  getCurrentHint,
  formatTime,
  onEdit,
  onDelete
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      case 'Advanced': return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      case 'Expert': return 'bg-red-500/20 text-red-300 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'solved': return 'text-green-400'
      case 'failed': return 'text-red-400'
      default: return 'text-gray-300'
    }
  }

  // Using imported source mapping function

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-bold text-white flex-1">
            {puzzle.title}
          </CardTitle>
          {(onEdit || onDelete) && (
            <div className="flex space-x-1 ml-2">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onEdit}
                  className="h-8 w-8 p-0 hover:bg-white/10"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDelete}
                  className="h-8 w-8 p-0 hover:bg-red-500/20 text-red-400"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className={`border ${getDifficultyColor(puzzle.difficulty)} gpu-accelerated`}>
            {puzzle.difficulty}
          </Badge>
          <Badge variant="outline" className="border-white/20 text-white">
            <Star className="w-3 h-3 mr-1" />
            {puzzle.rating}
          </Badge>
          <Badge variant="outline" className="border-white/20 text-white">
            <Target className="w-3 h-3 mr-1" />
            {puzzle.theme}
          </Badge>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed">
          {puzzle.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Puzzle Metadata */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-400">
              <User className="w-4 h-4 mr-1" />
              <span>By {puzzle.author.name}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <span className="mr-1">🌐</span>
              <span className="capitalize">{puzzle.source}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-400">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{puzzle.createdAt.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Clock className="w-4 h-4 mr-1" />
              <span>{puzzle.moves} moves</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-black/20 rounded-lg p-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-white font-semibold">{puzzle.successRate}%</div>
              <div className="text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-white font-semibold">{puzzle.attemptCount}</div>
              <div className="text-gray-400">Attempts</div>
            </div>
          </div>
        </div>

        {/* Session Info */}
        <div className="bg-black/20 rounded-lg p-3">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="text-center">
              <div className="text-white font-semibold">{formatTime(session.timeElapsed)}</div>
              <div className="text-gray-400">Time</div>
            </div>
            <div className="text-center">
              <div className="text-white font-semibold">{session.moveCount}</div>
              <div className="text-gray-400">Moves</div>
            </div>
            <div className="text-center">
              <div className={`font-semibold capitalize ${getStatusColor(session.status)}`}>
                {session.status}
              </div>
              <div className="text-gray-400">Status</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {puzzle.tags.length > 0 && (
          <div>
            <div className="text-sm text-gray-400 mb-2">Tags</div>
            <div className="flex flex-wrap gap-1">
              {puzzle.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs border-white/20 text-gray-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Hints Section */}
        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-white">Hints</h4>
            <div className="text-sm text-gray-400">
              {session.hintsUsed}/3 used
            </div>
          </div>
          
          {session.hintsUsed > 0 && session.showHint && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-3">
              <div className="flex items-start space-x-2">
                <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-blue-200 text-sm">{getCurrentHint()}</p>
              </div>
            </div>
          )}
          
          {session.status === 'unsolved' && session.hintsUsed < 3 && (
            <Button
              onClick={onRequestHint}
              variant="outline"
              size="sm"
              className="w-full bg-black/30 border-blue-500/30 text-blue-300 hover:bg-blue-500/10 hover:border-blue-500/50 hover-grow active:animate-button-press transition-all duration-300 gpu-accelerated"
            >
              <Info className="w-4 h-4 mr-2" />
              Get Hint ({session.hintsUsed + 1}/3)
            </Button>
          )}
          
          {session.hintsUsed >= 3 && (
            <div className="text-center text-gray-400 text-sm">
              All hints used
            </div>
          )}
        </div>

        {/* Notes */}
        {puzzle.notes && (
          <div className="border-t border-white/10 pt-4">
            <h4 className="font-medium text-white mb-2">Notes</h4>
            <p className="text-gray-300 text-sm italic">
              {puzzle.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CustomPuzzleInfo