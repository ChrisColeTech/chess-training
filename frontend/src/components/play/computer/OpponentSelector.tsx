import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Zap, Shield } from 'lucide-react'
import { GiSwordsPower } from 'react-icons/gi'
import { FaBrain, FaCrown } from 'react-icons/fa'
import type { OpponentSelectorProps } from '@/types/playComputer'
import { soundFX } from '@/utils/soundEffects'

/**
 * Gaming-themed AI opponent selector with battle arena aesthetics
 * Displays available opponents with their personalities and unlock status
 */
export const OpponentSelector: React.FC<OpponentSelectorProps> = ({
  opponents,
  selectedOpponent,
  onOpponentSelect,
  playerRating,
  theme
}) => {
  const getPersonalityIcon = (personality: string) => {
    switch (personality) {
      case 'Aggressive': return <GiSwordsPower className="w-4 h-4" />
      case 'Defensive': return <Shield className="w-4 h-4" />
      case 'Tactical': return <Zap className="w-4 h-4" />
      case 'Positional': return <FaBrain className="w-4 h-4" />
      case 'Balanced': return <FaCrown className="w-4 h-4" />
      default: return <Zap className="w-4 h-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Novice': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Intermediate': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Advanced': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Expert': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Grandmaster': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getRatingDifference = (opponentRating: number) => {
    const diff = opponentRating - playerRating
    if (Math.abs(diff) <= 100) return 'text-green-400'
    if (Math.abs(diff) <= 200) return 'text-yellow-400'
    return diff > 0 ? 'text-red-400' : 'text-green-400'
  }

  const handleOpponentClick = (opponent: any) => {
    if (!opponent.isUnlocked) {
      soundFX.playError()
      return
    }
    onOpponentSelect(opponent)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-2`}>
          CHOOSE YOUR OPPONENT
        </h2>
        <p className={`${theme.text} opacity-80`}>
          Select an AI warrior to battle in the digital arena
        </p>
      </div>

      {/* Opponent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opponents.map((opponent) => (
          <Card
            key={opponent.id}
            className={`
              relative cursor-pointer transition-all duration-300 transform
              ${opponent.isUnlocked 
                ? 'bg-black/20 border-white/10 hover:border-white/30 hover:bg-black/30 hover:scale-105 hover-glow' 
                : 'bg-black/10 border-white/5 opacity-60'
              }
              ${selectedOpponent?.id === opponent.id 
                ? `border-2 ${theme.primary.includes('cyan') ? 'border-cyan-500' : 'border-yellow-500'} glow-effect` 
                : ''
              }
            `}
            onClick={() => handleOpponentClick(opponent)}
          >
            {/* Unlock Overlay */}
            {!opponent.isUnlocked && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg z-10">
                <div className="text-center">
                  <Lock className="w-8 h-8 mx-auto mb-2 text-white/60" />
                  <p className="text-sm text-white/80 font-medium">Locked</p>
                  {opponent.unlockRequirements && (
                    <div className="text-xs text-white/60 mt-1">
                      {opponent.unlockRequirements.minRating && 
                        <div>Rating: {opponent.unlockRequirements.minRating}+</div>
                      }
                      {opponent.unlockRequirements.completedGames && 
                        <div>Games: {opponent.unlockRequirements.completedGames}+</div>
                      }
                    </div>
                  )}
                </div>
              </div>
            )}

            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{opponent.avatar}</span>
                  <div>
                    <CardTitle className={`text-lg ${theme.text}`}>
                      {opponent.name}
                    </CardTitle>
                    <CardDescription className={`text-sm ${theme.text} opacity-60`}>
                      {opponent.title}
                    </CardDescription>
                  </div>
                </div>
                {selectedOpponent?.id === opponent.id && (
                  <FaCrown className={`w-5 h-5 ${theme.primary.includes('cyan') ? 'text-cyan-400' : 'text-yellow-400'}`} />
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Stats Row */}
              <div className="flex items-center justify-between">
                <Badge className={`${getDifficultyColor(opponent.difficulty)} text-xs`}>
                  {opponent.difficulty}
                </Badge>
                <div className={`text-sm font-mono ${getRatingDifference(opponent.rating)}`}>
                  {opponent.rating}
                </div>
              </div>

              {/* Personality & Win Rate */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {getPersonalityIcon(opponent.personality)}
                  <span className={`text-xs ${theme.text} opacity-80`}>
                    {opponent.personality}
                  </span>
                </div>
                <span className={`text-xs ${theme.text} opacity-80`}>
                  {opponent.winRate}% wins
                </span>
              </div>

              {/* Description */}
              <p className={`text-xs ${theme.text} opacity-70 line-clamp-2 leading-relaxed`}>
                {opponent.description}
              </p>

              {/* Specialties */}
              <div className="space-y-1">
                <div className={`text-xs ${theme.text} opacity-60 font-medium`}>
                  Specialties:
                </div>
                <div className="flex flex-wrap gap-1">
                  {opponent.specialties.slice(0, 2).map((specialty, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className={`text-xs px-2 py-1 bg-black/20 border-white/10 ${theme.text}`}
                    >
                      {specialty}
                    </Badge>
                  ))}
                  {opponent.specialties.length > 2 && (
                    <Badge 
                      variant="outline" 
                      className={`text-xs px-2 py-1 bg-black/20 border-white/10 ${theme.text} opacity-60`}
                    >
                      +{opponent.specialties.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Select Button */}
              {opponent.isUnlocked && (
                <Button
                  variant={selectedOpponent?.id === opponent.id ? "default" : "outline"}
                  size="sm"
                  className={`
                    w-full mt-2 transition-all duration-200
                    ${selectedOpponent?.id === opponent.id
                      ? `bg-gradient-to-r ${theme.primary} text-white font-semibold hover:opacity-90`
                      : `bg-black/20 border-white/20 ${theme.text} hover:bg-black/30 hover:border-white/30`
                    }
                  `}
                >
                  {selectedOpponent?.id === opponent.id ? 'Selected' : 'Select Opponent'}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Opponent Details */}
      {selectedOpponent && (
        <Card className="bg-black/20 border-white/10 backdrop-blur-xl animate-slide-down">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{selectedOpponent.avatar}</span>
              <div>
                <CardTitle className={`text-xl ${theme.text}`}>
                  {selectedOpponent.name} - {selectedOpponent.title}
                </CardTitle>
                <CardDescription className={`${theme.text} opacity-80`}>
                  Rating: {selectedOpponent.rating} • {selectedOpponent.personality} Style
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Backstory */}
            <div>
              <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>Warrior's Tale</h4>
              <p className={`text-sm ${theme.text} opacity-80 leading-relaxed`}>
                {selectedOpponent.backstory}
              </p>
            </div>

            {/* Favorite Openings */}
            <div>
              <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>Favorite Arsenal</h4>
              <div className="flex flex-wrap gap-2">
                {selectedOpponent.favoriteOpenings.map((opening, index) => (
                  <Badge 
                    key={index}
                    className={`bg-gradient-to-r ${theme.secondary} text-white text-xs`}
                  >
                    {opening}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Challenge Rating */}
            <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/10">
              <span className={`text-sm font-medium ${theme.text}`}>
                Challenge Rating vs You:
              </span>
              <div className="flex items-center space-x-2">
                <span className={`text-lg font-bold ${getRatingDifference(selectedOpponent.rating)}`}>
                  {selectedOpponent.rating > playerRating ? '+' : ''}{selectedOpponent.rating - playerRating}
                </span>
                <Badge className={getRatingDifference(selectedOpponent.rating).replace('text-', 'bg-').replace('-400', '-500/20 text-') + ' border-' + getRatingDifference(selectedOpponent.rating).replace('text-', '').replace('-400', '-500/30')}>
                  {Math.abs(selectedOpponent.rating - playerRating) <= 100 ? 'Balanced' :
                   selectedOpponent.rating > playerRating + 100 ? 'Challenging' : 'Favorable'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}