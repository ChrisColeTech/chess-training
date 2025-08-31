import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Play } from 'lucide-react'
import { useGameSetup } from '../../hooks/useGameSetup'
import { DIFFICULTY_LABELS, TIME_CONTROL_LABELS } from '../../data/themeData'
import type { GameSetupFormProps } from '../../types/components'

/**
 * GameSetupForm - Pure UI Component Following SRP  
 * Single Responsibility: Render game setup form only
 * No form logic, no data constants, no business logic
 * Pure presentation that delegates to setup hook
 */
export const GameSetupForm: React.FC<GameSetupFormProps> = ({ 
  onStartGame, 
  isLoading = false,
  error = null,
  onClearError 
}) => {
  const {
    setup,
    isSubmitting,
    updateDifficulty,
    updatePlayerColor,
    updateTimeControl,
    handleSubmit
  } = useGameSetup()

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSubmit(onStartGame, onClearError)
  }

  return (
    <Card className="bg-black/20 backdrop-blur-xl border-white/10">
      <CardHeader>
        <CardTitle className="text-white text-xl flex items-center space-x-2">
          <Play className="w-5 h-5" />
          <span>Game Setup</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onFormSubmit} className="space-y-6">
          
          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500/30 text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {/* AI Difficulty */}
          <div>
            <label className="text-white text-sm font-medium mb-3 block">
              AI Difficulty
            </label>
            <div className="grid grid-cols-5 gap-2">
              {([1, 2, 3, 4, 5] as const).map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={setup.difficulty === level ? "default" : "outline"}
                  className={`h-16 flex flex-col ${
                    setup.difficulty === level 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                  onClick={() => updateDifficulty(level)}
                  disabled={isSubmitting || isLoading}
                >
                  <span className="text-lg font-bold">{level}</span>
                  <span className="text-xs">{DIFFICULTY_LABELS[level]}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="text-white text-sm font-medium mb-3 block">
              Choose Your Color
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['white', 'black', 'random'] as const).map((color) => (
                <Button
                  key={color}
                  type="button"
                  variant={setup.playerColor === color ? "default" : "outline"}
                  className={`h-12 ${
                    setup.playerColor === color 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                  onClick={() => updatePlayerColor(color)}
                  disabled={isSubmitting || isLoading}
                >
                  {color === 'white' ? '⚪ White' : 
                   color === 'black' ? '⚫ Black' : '🎲 Random'}
                </Button>
              ))}
            </div>
          </div>

          {/* Time Control */}
          <div>
            <label className="text-white text-sm font-medium mb-3 block">
              Time Control
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['1+0', '3+0', '5+0', '10+0', '15+10', 'unlimited'] as const).map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={setup.timeControl === time ? "default" : "outline"}
                  className={`h-10 ${
                    setup.timeControl === time 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                  onClick={() => updateTimeControl(time)}
                  disabled={isSubmitting || isLoading}
                >
                  {TIME_CONTROL_LABELS[time]}
                </Button>
              ))}
            </div>
          </div>

          {/* Start Game Button */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold h-12 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Starting Game...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start Game
              </>
            )}
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}

export default GameSetupForm