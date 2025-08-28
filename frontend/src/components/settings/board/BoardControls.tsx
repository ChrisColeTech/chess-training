import React from 'react'
import { Sliders, RotateCw, Volume2, Eye, Zap, Target, ArrowRight, Circle, Square, Download, Upload, RotateCcw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { boardSizeConfigs, availableSoundEffects } from '@/data/boardThemes'
import type { BoardControlsProps, BoardSize, AnimationSpeed, HighlightStyle, ArrowStyle } from '@/types/boardSettings'

/**
 * BoardControls Component
 * Provides comprehensive controls for board settings customization
 */
export const BoardControls: React.FC<BoardControlsProps> = ({
  settings,
  onSettingsChange,
  theme
}) => {
  // Handle board size change
  const handleSizeChange = (size: string) => {
    onSettingsChange({ size: size as BoardSize })
  }

  // Handle orientation change
  const handleOrientationChange = (value: string) => {
    onSettingsChange({ orientation: value as 'white' | 'black' })
  }

  // Handle animation speed change
  const handleAnimationSpeedChange = (speed: string) => {
    onSettingsChange({
      animations: {
        ...settings.animations,
        speed: speed as AnimationSpeed
      }
    })
  }

  // Handle highlight style change
  const handleHighlightStyleChange = (style: string) => {
    onSettingsChange({
      highlighting: {
        ...settings.highlighting,
        style: style as HighlightStyle
      }
    })
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    onSettingsChange({
      sounds: {
        ...settings.sounds,
        volume: value[0]
      }
    })
  }

  // Handle coordinate settings
  const handleCoordinateChange = (key: string, value: any) => {
    onSettingsChange({
      coordinates: {
        ...settings.coordinates,
        [key]: value
      }
    })
  }

  // Handle highlighting settings
  const handleHighlightingChange = (key: string, value: any) => {
    onSettingsChange({
      highlighting: {
        ...settings.highlighting,
        [key]: value
      }
    })
  }

  // Handle animation settings
  const handleAnimationChange = (key: string, value: any) => {
    onSettingsChange({
      animations: {
        ...settings.animations,
        [key]: value
      }
    })
  }

  // Handle sound settings
  const handleSoundChange = (key: string, value: any) => {
    onSettingsChange({
      sounds: {
        ...settings.sounds,
        [key]: value
      }
    })
  }

  // Handle markup settings
  const handleMarkupChange = (key: string, value: any) => {
    onSettingsChange({
      markup: {
        ...settings.markup,
        [key]: value
      }
    })
  }

  return (
    <Card className={`${theme.glassMorphism} border-white/10`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.accent} bg-opacity-20`}>
              <Sliders size={20} className={theme.text} />
            </div>
            <div>
              <CardTitle className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                Board Controls
              </CardTitle>
              <p className={`text-sm ${theme.text} opacity-60`}>
                Fine-tune your board experience
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="display" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50">
            <TabsTrigger value="display" className="text-xs data-[state=active]:bg-white/10">
              <Eye size={14} className="mr-1" />
              Display
            </TabsTrigger>
            <TabsTrigger value="animations" className="text-xs data-[state=active]:bg-white/10">
              <Zap size={14} className="mr-1" />
              Effects
            </TabsTrigger>
            <TabsTrigger value="sounds" className="text-xs data-[state=active]:bg-white/10">
              <Volume2 size={14} className="mr-1" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-xs data-[state=active]:bg-white/10">
              <Target size={14} className="mr-1" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Board Size */}
              <div className="space-y-3">
                <Label className={`text-sm font-medium ${theme.text} flex items-center space-x-2`}>
                  <Square size={16} />
                  <span>Board Size</span>
                </Label>
                <Select value={settings.size} onValueChange={handleSizeChange}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    {Object.entries(boardSizeConfigs).map(([size, config]) => (
                      <SelectItem key={size} value={size} className="text-white hover:bg-gray-700">
                        {config.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Board Orientation */}
              <div className="space-y-3">
                <Label className={`text-sm font-medium ${theme.text} flex items-center space-x-2`}>
                  <RotateCw size={16} />
                  <span>Orientation</span>
                </Label>
                <Select value={settings.orientation} onValueChange={handleOrientationChange}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="white" className="text-white hover:bg-gray-700">
                      White on Bottom
                    </SelectItem>
                    <SelectItem value="black" className="text-white hover:bg-gray-700">
                      Black on Bottom
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Coordinate Settings */}
            <div className={`p-4 rounded-lg bg-black/20 border border-white/10 space-y-4`}>
              <h4 className={`font-semibold ${theme.text} flex items-center space-x-2`}>
                <Target size={16} />
                <span>Coordinates & Labels</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label className={`text-sm ${theme.text}`}>Show Coordinates</Label>
                  <Switch
                    checked={settings.coordinates.show}
                    onCheckedChange={(checked) => handleCoordinateChange('show', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className={`text-sm ${theme.text}`}>Show Rank/File Labels</Label>
                  <Switch
                    checked={settings.showLabels}
                    onCheckedChange={(checked) => onSettingsChange({ showLabels: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label className={`text-sm ${theme.text}`}>Position</Label>
                  <Select 
                    value={settings.coordinates.position} 
                    onValueChange={(value) => handleCoordinateChange('position', value)}
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="inside" className="text-white hover:bg-gray-700">Inside Board</SelectItem>
                      <SelectItem value="outside" className="text-white hover:bg-gray-700">Outside Board</SelectItem>
                      <SelectItem value="both" className="text-white hover:bg-gray-700">Both Sides</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className={`text-sm ${theme.text}`}>Style</Label>
                  <Select 
                    value={settings.coordinates.style} 
                    onValueChange={(value) => handleCoordinateChange('style', value)}
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="classic" className="text-white hover:bg-gray-700">Classic</SelectItem>
                      <SelectItem value="bold" className="text-white hover:bg-gray-700">Bold</SelectItem>
                      <SelectItem value="minimal" className="text-white hover:bg-gray-700">Minimal</SelectItem>
                      <SelectItem value="gaming" className="text-white hover:bg-gray-700">Gaming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Move Highlighting */}
            <div className={`p-4 rounded-lg bg-black/20 border border-white/10 space-y-4`}>
              <h4 className={`font-semibold ${theme.text} flex items-center space-x-2`}>
                <Circle size={16} />
                <span>Move Highlighting</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label className={`text-sm ${theme.text}`}>Show Last Move</Label>
                  <Switch
                    checked={settings.highlighting.showLastMove}
                    onCheckedChange={(checked) => handleHighlightingChange('showLastMove', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className={`text-sm ${theme.text}`}>Show Legal Moves</Label>
                  <Switch
                    checked={settings.highlighting.showLegalMoves}
                    onCheckedChange={(checked) => handleHighlightingChange('showLegalMoves', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className={`text-sm ${theme.text}`}>Highlight Style</Label>
                  <Select 
                    value={settings.highlighting.style} 
                    onValueChange={handleHighlightStyleChange}
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="dots" className="text-white hover:bg-gray-700">Dots</SelectItem>
                      <SelectItem value="border" className="text-white hover:bg-gray-700">Border</SelectItem>
                      <SelectItem value="glow" className="text-white hover:bg-gray-700">Glow</SelectItem>
                      <SelectItem value="solid" className="text-white hover:bg-gray-700">Solid</SelectItem>
                      <SelectItem value="none" className="text-white hover:bg-gray-700">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className={`text-sm ${theme.text}`}>Opacity</Label>
                  <Slider
                    value={[settings.highlighting.opacity * 100]}
                    onValueChange={(value) => handleHighlightingChange('opacity', value[0] / 100)}
                    max={100}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <div className={`text-xs ${theme.text} opacity-60 text-center`}>
                    {Math.round(settings.highlighting.opacity * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Animation Settings */}
          <TabsContent value="animations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Animation Speed */}
              <div className="space-y-3">
                <Label className={`text-sm font-medium ${theme.text} flex items-center space-x-2`}>
                  <Zap size={16} />
                  <span>Animation Speed</span>
                </Label>
                <Select value={settings.animations.speed} onValueChange={handleAnimationSpeedChange}>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="instant" className="text-white hover:bg-gray-700">Instant</SelectItem>
                    <SelectItem value="fast" className="text-white hover:bg-gray-700">Fast</SelectItem>
                    <SelectItem value="normal" className="text-white hover:bg-gray-700">Normal</SelectItem>
                    <SelectItem value="slow" className="text-white hover:bg-gray-700">Slow</SelectItem>
                    <SelectItem value="cinematic" className="text-white hover:bg-gray-700">Cinematic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Animation Toggles */}
              <div className="space-y-3">
                <Label className={`text-sm font-medium ${theme.text}`}>Animation Types</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className={`text-sm ${theme.text}`}>Piece Movement</Label>
                    <Switch
                      checked={settings.animations.moveAnimation}
                      onCheckedChange={(checked) => handleAnimationChange('moveAnimation', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className={`text-sm ${theme.text}`}>Captures</Label>
                    <Switch
                      checked={settings.animations.captureAnimation}
                      onCheckedChange={(checked) => handleAnimationChange('captureAnimation', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className={`text-sm ${theme.text}`}>Check Alerts</Label>
                    <Switch
                      checked={settings.animations.checkAnimation}
                      onCheckedChange={(checked) => handleAnimationChange('checkAnimation', checked)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow and Markup Settings */}
            <div className={`p-4 rounded-lg bg-black/20 border border-white/10 space-y-4`}>
              <h4 className={`font-semibold ${theme.text} flex items-center space-x-2`}>
                <ArrowRight size={16} />
                <span>Arrows & Markup</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label className={`text-sm ${theme.text}`}>Enable Arrows</Label>
                  <Switch
                    checked={settings.markup.enableArrows}
                    onCheckedChange={(checked) => handleMarkupChange('enableArrows', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className={`text-sm ${theme.text}`}>Square Highlights</Label>
                  <Switch
                    checked={settings.markup.enableSquareHighlight}
                    onCheckedChange={(checked) => handleMarkupChange('enableSquareHighlight', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className={`text-sm ${theme.text}`}>Arrow Style</Label>
                  <Select 
                    value={settings.markup.arrowStyle} 
                    onValueChange={(value) => handleMarkupChange('arrowStyle', value as ArrowStyle)}
                  >
                    <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="simple" className="text-white hover:bg-gray-700">Simple</SelectItem>
                      <SelectItem value="curved" className="text-white hover:bg-gray-700">Curved</SelectItem>
                      <SelectItem value="bold" className="text-white hover:bg-gray-700">Bold</SelectItem>
                      <SelectItem value="dashed" className="text-white hover:bg-gray-700">Dashed</SelectItem>
                      <SelectItem value="glowing" className="text-white hover:bg-gray-700">Glowing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className={`text-sm ${theme.text}`}>Arrow Opacity</Label>
                  <Slider
                    value={[settings.markup.arrowOpacity * 100]}
                    onValueChange={(value) => handleMarkupChange('arrowOpacity', value[0] / 100)}
                    max={100}
                    min={10}
                    step={10}
                    className="w-full"
                  />
                  <div className={`text-xs ${theme.text} opacity-60 text-center`}>
                    {Math.round(settings.markup.arrowOpacity * 100)}%
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Sound Settings */}
          <TabsContent value="sounds" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Master Volume */}
              <div className={`p-4 rounded-lg bg-black/20 border border-white/10 space-y-4`}>
                <div className="flex items-center justify-between">
                  <Label className={`text-sm font-medium ${theme.text} flex items-center space-x-2`}>
                    <Volume2 size={16} />
                    <span>Sound Effects</span>
                  </Label>
                  <Switch
                    checked={settings.sounds.enabled}
                    onCheckedChange={(checked) => handleSoundChange('enabled', checked)}
                  />
                </div>
                
                {settings.sounds.enabled && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className={`text-sm ${theme.text}`}>Master Volume</Label>
                      <Slider
                        value={[settings.sounds.volume * 100]}
                        onValueChange={handleVolumeChange}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <div className={`text-xs ${theme.text} opacity-60 text-center`}>
                        {Math.round(settings.sounds.volume * 100)}%
                      </div>
                    </div>

                    {/* Sound Effect Assignments */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className={`text-sm ${theme.text}`}>Move Sound</Label>
                        <Select 
                          value={settings.sounds.moveSound} 
                          onValueChange={(value) => handleSoundChange('moveSound', value)}
                        >
                          <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            {availableSoundEffects.map((sound) => (
                              <SelectItem key={sound.id} value={sound.id} className="text-white hover:bg-gray-700">
                                {sound.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className={`text-sm ${theme.text}`}>Capture Sound</Label>
                        <Select 
                          value={settings.sounds.captureSound} 
                          onValueChange={(value) => handleSoundChange('captureSound', value)}
                        >
                          <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            {availableSoundEffects.map((sound) => (
                              <SelectItem key={sound.id} value={sound.id} className="text-white hover:bg-gray-700">
                                {sound.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <div className="space-y-6">
              {/* Gameplay Options */}
              <div className={`p-4 rounded-lg bg-black/20 border border-white/10 space-y-4`}>
                <h4 className={`font-semibold ${theme.text} flex items-center space-x-2`}>
                  <Target size={16} />
                  <span>Gameplay Options</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label className={`text-sm ${theme.text}`}>Drag & Drop</Label>
                    <Switch
                      checked={settings.enableDragDrop}
                      onCheckedChange={(checked) => onSettingsChange({ enableDragDrop: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className={`text-sm ${theme.text}`}>Context Menu</Label>
                    <Switch
                      checked={settings.enableContextMenu}
                      onCheckedChange={(checked) => onSettingsChange({ enableContextMenu: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className={`text-sm ${theme.text}`}>Auto-Queen</Label>
                    <Switch
                      checked={settings.autoQueen}
                      onCheckedChange={(checked) => onSettingsChange({ autoQueen: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className={`text-sm ${theme.text}`}>Show Captured</Label>
                    <Switch
                      checked={settings.showCapturedPieces}
                      onCheckedChange={(checked) => onSettingsChange({ showCapturedPieces: checked })}
                    />
                  </div>
                </div>
              </div>

              {/* Import/Export */}
              <div className={`p-4 rounded-lg bg-black/20 border border-white/10 space-y-4`}>
                <h4 className={`font-semibold ${theme.text} flex items-center space-x-2`}>
                  <Download size={16} />
                  <span>Settings Management</span>
                </h4>
                
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Download size={14} className="mr-2" />
                    Export Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Upload size={14} className="mr-2" />
                    Import Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <RotateCcw size={14} className="mr-2" />
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}