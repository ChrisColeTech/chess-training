import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { BookOpen, Clock, HelpCircle, Palette, Settings, Swords, User, Volume2, Zap } from 'lucide-react'
import { timeControlConfigs } from '@/data/aiOpponents'
import type { GameSetupProps, PlayerColor, TimeControlConfig } from '@/types/playComputer'
import { soundFX } from '@/utils/soundEffects'

/**
 * Gaming-themed game setup component with battle configuration
 * Allows players to configure game settings before battle
 */
export const GameSetup: React.FC<GameSetupProps> = ({
  setup,
  onSetupChange,
  onStartGame,
  isValidSetup,
  theme
}) => {
  const handlePlayerColorChange = (color: string) => {
    onSetupChange({ playerColor: color as PlayerColor })
    soundFX.playClick()
  }

  const handleTimeControlChange = (timeControlId: string) => {
    const timeControl = timeControlConfigs.find(tc => 
      `${tc.initialTime}-${tc.increment}-${tc.type}` === timeControlId
    )
    if (timeControl) {
      onSetupChange({ timeControl })
      soundFX.playClick()
    }
  }

  const handleToggleChange = (setting: string, value: boolean) => {
    onSetupChange({ [setting]: value })
    soundFX.playClick()
  }

  const getTimeControlId = (tc?: TimeControlConfig) => 
    tc ? `${tc.initialTime}-${tc.increment}-${tc.type}` : undefined

  const getColorIcon = (color: PlayerColor) => {
    switch (color) {
      case 'white': return '<FaChessKing className="w-4 h-4 inline" />'
      case 'black': return '♚'
      case 'random': return '<Dice6 className="w-4 h-4 inline" />'
      default: return '<FaChessKing className="w-4 h-4 inline" />'
    }
  }

  const getTimeControlColor = (type: string) => {
    switch (type) {
      case 'Blitz': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Rapid': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Classical': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Unlimited': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className={`text-2xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-2`}>
          BATTLE CONFIGURATION
        </h2>
        <p className={`${theme.text} opacity-80`}>
          Configure your battle settings and prepare for combat
        </p>
      </div>

      {/* Setup Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Color Selection */}
        <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-white/80" />
              <CardTitle className={`${theme.text}`}>Choose Your Side</CardTitle>
            </div>
            <CardDescription className={`${theme.text} opacity-60`}>
              Select which color pieces you want to command
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {(['white', 'black', 'random'] as PlayerColor[]).map((color) => (
                <Button
                  key={color}
                  variant={setup.playerColor === color ? "default" : "outline"}
                  onClick={() => handlePlayerColorChange(color)}
                  className={`
                    flex flex-col items-center space-y-2 h-16 transition-all duration-200
                    ${setup.playerColor === color
                      ? `bg-gradient-to-r ${theme.primary} text-white font-semibold hover:opacity-90 glow-effect`
                      : `bg-black/20 border-white/20 ${theme.text} hover:bg-black/30 hover:border-white/30`
                    }
                  `}
                >
                  <span className="text-2xl">{getColorIcon(color)}</span>
                  <span className="text-xs capitalize">{color}</span>
                </Button>
              ))}
            </div>
            <div className={`text-xs ${theme.text} opacity-60 text-center mt-2`}>
              Random will assign a color automatically
            </div>
          </CardContent>
        </Card>

        {/* Time Control */}
        <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-white/80" />
              <CardTitle className={`${theme.text}`}>Time Control</CardTitle>
            </div>
            <CardDescription className={`${theme.text} opacity-60`}>
              Set the battle duration and time pressure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              value={getTimeControlId(setup.timeControl)}
              onValueChange={handleTimeControlChange}
            >
              <SelectTrigger className="bg-black/30 border-white/20 text-white">
                <SelectValue placeholder="Select time control" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-white/20">
                {timeControlConfigs.map((tc) => (
                  <SelectItem 
                    key={`${tc.initialTime}-${tc.increment}-${tc.type}`}
                    value={`${tc.initialTime}-${tc.increment}-${tc.type}`}
                    className="text-white hover:bg-white/10 focus:bg-white/10"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{tc.displayName}</span>
                      <Badge className={`ml-2 ${getTimeControlColor(tc.type)}`}>
                        {tc.type}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Selected Time Control Details */}
            {setup.timeControl && (
              <div className="p-3 bg-black/20 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getTimeControlColor(setup.timeControl.type)}>
                    {setup.timeControl.type}
                  </Badge>
                  <span className={`text-sm font-mono ${theme.text}`}>
                    {setup.timeControl.initialTime}m + {setup.timeControl.increment}s
                  </span>
                </div>
                <p className={`text-xs ${theme.text} opacity-70`}>
                  {setup.timeControl.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Advanced Settings */}
      <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-white/80" />
            <CardTitle className={`${theme.text}`}>Advanced Configuration</CardTitle>
          </div>
          <CardDescription className={`${theme.text} opacity-60`}>
            Fine-tune your battle experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Opening Book */}
            <div className="flex items-center justify-between p-3 bg-black/10 rounded-lg border border-white/5">
              <div className="flex items-center space-x-2">
                <span className="text-lg"><BookOpen className="w-4 h-4 inline" /></span>
                <div>
                  <Label className={`text-sm font-medium ${theme.text}`}>
                    Opening Book
                  </Label>
                  <p className={`text-xs ${theme.text} opacity-60`}>
                    Use standard openings
                  </p>
                </div>
              </div>
              <Switch
                checked={setup.useOpeningBook || false}
                onCheckedChange={(value) => handleToggleChange('useOpeningBook', value)}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-cyan-500 data-[state=checked]:to-blue-500"
              />
            </div>

            {/* Move Hints */}
            <div className="flex items-center justify-between p-3 bg-black/10 rounded-lg border border-white/5">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-white/80" />
                <div>
                  <Label className={`text-sm font-medium ${theme.text}`}>
                    Move Hints
                  </Label>
                  <p className={`text-xs ${theme.text} opacity-60`}>
                    Show suggested moves
                  </p>
                </div>
              </div>
              <Switch
                checked={setup.showHints || false}
                onCheckedChange={(value) => handleToggleChange('showHints', value)}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-yellow-500 data-[state=checked]:to-orange-500"
              />
            </div>

            {/* Sound Effects */}
            <div className="flex items-center justify-between p-3 bg-black/10 rounded-lg border border-white/5">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-white/80" />
                <div>
                  <Label className={`text-sm font-medium ${theme.text}`}>
                    Sound Effects
                  </Label>
                  <p className={`text-xs ${theme.text} opacity-60`}>
                    Battle audio feedback
                  </p>
                </div>
              </div>
              <Switch
                checked={setup.enableSounds !== false} // Default to true
                onCheckedChange={(value) => handleToggleChange('enableSounds', value)}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-500 data-[state=checked]:to-emerald-500"
              />
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Battle Summary */}
      {setup.opponent && (
        <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Swords className="w-5 h-5 text-white/80" />
              <CardTitle className={`${theme.text}`}>Battle Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/10">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl mb-1"><User className="w-4 h-4 inline" /></div>
                  <div className={`text-sm font-medium ${theme.text}`}>You</div>
                  <div className={`text-xs ${theme.text} opacity-60`}>
                    {setup.playerColor === 'random' ? 'Random' : setup.playerColor} pieces
                  </div>
                </div>
                
                <div className="text-2xl text-white/60"><Zap className="w-4 h-4 inline" /></div>
                
                <div className="text-center">
                  <div className="text-2xl mb-1">{setup.opponent.avatar}</div>
                  <div className={`text-sm font-medium ${theme.text}`}>
                    {setup.opponent.name}
                  </div>
                  <div className={`text-xs ${theme.text} opacity-60`}>
                    {setup.opponent.difficulty} • {setup.opponent.rating}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {setup.timeControl && (
                  <Badge className={getTimeControlColor(setup.timeControl.type)}>
                    {setup.timeControl.displayName}
                  </Badge>
                )}
                <div className={`text-xs ${theme.text} opacity-60 mt-1`}>
                  {setup.useOpeningBook && '<BookOpen className="w-4 h-4 inline" /> '} 
                  {setup.showHints && '<Lightbulb className="w-4 h-4 inline" /> '}
                  {setup.enableSounds && '🔊'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Start Battle Button */}
      <div className="text-center">
        <Button
          onClick={onStartGame}
          disabled={!isValidSetup}
          size="lg"
          className={`
            px-8 py-4 text-lg font-bold transition-all duration-300
            ${isValidSetup
              ? `bg-gradient-to-r ${theme.primary} text-white hover:opacity-90 hover:scale-105 glow-effect shadow-2xl`
              : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
            }
          `}
        >
          <Swords className="w-6 h-6 mr-2" />
          {isValidSetup ? 'ENTER BATTLE ARENA' : 'Select Opponent First'}
        </Button>
        
        {!isValidSetup && (
          <p className={`text-sm ${theme.text} opacity-60 mt-2`}>
            Choose an opponent and configure your settings to begin battle
          </p>
        )}
      </div>
    </div>
  )
}