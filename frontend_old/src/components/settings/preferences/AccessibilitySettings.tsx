import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accessibility, Eye, Ear, Keyboard, MousePointer2, Volume2 } from 'lucide-react'
import type { AccessibilitySettingsProps } from '@/types/preferences'

export const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({
  preferences,
  onUpdate,
  isLoading = false,
  theme
}) => {
  const handleScreenReaderToggle = (key: keyof typeof preferences.screenReader) => {
    onUpdate({
      screenReader: {
        ...preferences.screenReader,
        [key]: !preferences.screenReader[key]
      }
    })
  }

  const handleKeyboardToggle = (key: keyof typeof preferences.keyboard) => {
    onUpdate({
      keyboard: {
        ...preferences.keyboard,
        [key]: !preferences.keyboard[key]
      }
    })
  }

  const handleVisualToggle = (key: keyof typeof preferences.visual) => {
    onUpdate({
      visual: {
        ...preferences.visual,
        [key]: !preferences.visual[key]
      }
    })
  }

  const handleAudioToggle = (key: keyof typeof preferences.audio) => {
    onUpdate({
      audio: {
        ...preferences.audio,
        [key]: !preferences.audio[key]
      }
    })
  }

  const handleMotorChange = (key: keyof typeof preferences.motor, value: any) => {
    onUpdate({
      motor: {
        ...preferences.motor,
        [key]: value
      }
    })
  }

  return (
    <Card className={`bg-gray-900/50 border-gray-700/50 ${theme.glassMorphism}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.accent} shadow-lg`}>
            <Accessibility size={20} className="text-white" />
          </div>
          <div>
            <CardTitle className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Accessibility Suite
            </CardTitle>
            <CardDescription className="text-gray-400">
              Screen reader, keyboard, and motor accessibility features
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Screen Reader Support */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide flex items-center gap-2`}>
            <Volume2 size={16} />
            Screen Reader Support
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Enable Screen Reader
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Optimize interface for screen reader software
                </p>
              </div>
              <Switch
                checked={preferences.screenReader.enabled}
                onCheckedChange={() => handleScreenReaderToggle('enabled')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            {preferences.screenReader.enabled && (
              <div className="ml-4 space-y-3 border-l-2 border-gray-700/30 pl-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20">
                  <Label className={`text-xs ${theme.text}`}>Announce Moves Immediately</Label>
                  <Switch
                    checked={preferences.screenReader.announceMovesImmediately}
                    onCheckedChange={() => handleScreenReaderToggle('announceMovesImmediately')}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-blue-600 scale-75"
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20">
                  <Label className={`text-xs ${theme.text}`}>Announce Game Events</Label>
                  <Switch
                    checked={preferences.screenReader.announceGameEvents}
                    onCheckedChange={() => handleScreenReaderToggle('announceGameEvents')}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-blue-600 scale-75"
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20">
                  <Label className={`text-xs ${theme.text}`}>Verbose Descriptions</Label>
                  <Switch
                    checked={preferences.screenReader.verboseDescriptions}
                    onCheckedChange={() => handleScreenReaderToggle('verboseDescriptions')}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-blue-600 scale-75"
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20">
                  <Label className={`text-xs ${theme.text}`}>Read Board Position</Label>
                  <Switch
                    checked={preferences.screenReader.readBoardPosition}
                    onCheckedChange={() => handleScreenReaderToggle('readBoardPosition')}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-blue-600 scale-75"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Keyboard Navigation */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide flex items-center gap-2`}>
            <Keyboard size={16} />
            Keyboard Navigation
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Enhanced Keyboard Navigation
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Navigate the entire interface using only keyboard
                </p>
              </div>
              <Switch
                checked={preferences.keyboard.enabled}
                onCheckedChange={() => handleKeyboardToggle('enabled')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Focus Indicators
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Show clear visual focus indicators
                </p>
              </div>
              <Switch
                checked={preferences.keyboard.focusIndicators}
                onCheckedChange={() => handleKeyboardToggle('focusIndicators')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Arrow Key Board Navigation
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Use arrow keys to navigate the chess board
                </p>
              </div>
              <Switch
                checked={preferences.keyboard.arrowKeyNavigation}
                onCheckedChange={() => handleKeyboardToggle('arrowKeyNavigation')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Visual Aids */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide flex items-center gap-2`}>
            <Eye size={16} />
            Visual Aids
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  High Contrast Mode
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Increase contrast for better visibility
                </p>
              </div>
              <Switch
                checked={preferences.visual.highContrast}
                onCheckedChange={() => handleVisualToggle('highContrast')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Large Text
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Use larger font sizes throughout the interface
                </p>
              </div>
              <Switch
                checked={preferences.visual.largeText}
                onCheckedChange={() => handleVisualToggle('largeText')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Reduced Motion
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Minimize animations and motion effects
                </p>
              </div>
              <Switch
                checked={preferences.visual.reducedMotion}
                onCheckedChange={() => handleVisualToggle('reducedMotion')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="space-y-2">
              <Label className={`text-sm font-medium ${theme.text}`}>
                Color Blind Mode
              </Label>
              <Select
                value={preferences.visual.colorBlindMode}
                onValueChange={(value) => onUpdate({
                  visual: { ...preferences.visual, colorBlindMode: value as any }
                })}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="none" className="text-white hover:bg-gray-700">
                    None
                  </SelectItem>
                  <SelectItem value="deuteranopia" className="text-white hover:bg-gray-700">
                    Deuteranopia (Green-blind)
                  </SelectItem>
                  <SelectItem value="protanopia" className="text-white hover:bg-gray-700">
                    Protanopia (Red-blind)
                  </SelectItem>
                  <SelectItem value="tritanopia" className="text-white hover:bg-gray-700">
                    Tritanopia (Blue-blind)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Audio Cues */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide flex items-center gap-2`}>
            <Ear size={16} />
            Audio Cues
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Sound Cues
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Play audio cues for interface interactions
                </p>
              </div>
              <Switch
                checked={preferences.audio.soundCues}
                onCheckedChange={() => handleAudioToggle('soundCues')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Voice Announcements
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Use voice to announce important events
                </p>
              </div>
              <Switch
                checked={preferences.audio.voiceAnnouncements}
                onCheckedChange={() => handleAudioToggle('voiceAnnouncements')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Spatial Audio
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Use positional audio for board awareness
                </p>
              </div>
              <Switch
                checked={preferences.audio.spatialAudio}
                onCheckedChange={() => handleAudioToggle('spatialAudio')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Motor Accessibility */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide flex items-center gap-2`}>
            <MousePointer2 size={16} />
            Motor Accessibility
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Click and Hold Mode
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Use click and hold instead of drag and drop
                </p>
              </div>
              <Switch
                checked={preferences.motor.clickAndHold}
                onCheckedChange={() => handleMotorChange('clickAndHold', !preferences.motor.clickAndHold)}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  One-Handed Mode
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Optimize interface for one-handed operation
                </p>
              </div>
              <Switch
                checked={preferences.motor.oneHandedMode}
                onCheckedChange={() => handleMotorChange('oneHandedMode', !preferences.motor.oneHandedMode)}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="space-y-3">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Drag Threshold: {preferences.motor.dragThreshold}px
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Minimum distance before drag operation starts
                </p>
              </div>
              <Slider
                value={[preferences.motor.dragThreshold]}
                onValueChange={(value) => handleMotorChange('dragThreshold', value[0])}
                min={1}
                max={20}
                step={1}
                className="w-full"
                disabled={isLoading}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1px</span>
                <span>10px</span>
                <span>20px</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Double Click Speed: {preferences.motor.doubleClickSpeed}ms
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Maximum time between clicks for double-click
                </p>
              </div>
              <Slider
                value={[preferences.motor.doubleClickSpeed]}
                onValueChange={(value) => handleMotorChange('doubleClickSpeed', value[0])}
                min={200}
                max={1000}
                step={50}
                className="w-full"
                disabled={isLoading}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>200ms</span>
                <span>500ms</span>
                <span>1000ms</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}