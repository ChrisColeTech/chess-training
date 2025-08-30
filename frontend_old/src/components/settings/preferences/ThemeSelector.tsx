import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Moon, Eye, Type, Layout, Monitor, Sidebar, Sparkles, Wand2 } from 'lucide-react'
// Local theme options - moved from @/data/preferencesData
const themeOptions = [
  {
    value: 'midnight',
    label: 'Midnight Blue',
    description: 'Deep blue theme perfect for focus',
    primaryColors: ['#1e293b', '#334155', '#475569'],
    accentColor: '#3b82f6',
    backgroundGradient: 'from-slate-900 to-blue-900',
    isPremium: false
  },
  {
    value: 'cyber',
    label: 'Cyber Green',
    description: 'Futuristic neon green aesthetic',
    primaryColors: ['#0f172a', '#1e293b', '#334155'],
    accentColor: '#10b981',
    backgroundGradient: 'from-slate-900 to-emerald-900',
    isPremium: true
  },
  {
    value: 'neon',
    label: 'Neon Purple',
    description: 'Vibrant purple with electric accents',
    primaryColors: ['#1a103d', '#2d1b69', '#422a7a'],
    accentColor: '#8b5cf6',
    backgroundGradient: 'from-purple-900 to-violet-900',
    isPremium: true
  },
  {
    value: 'royal',
    label: 'Royal Gold',
    description: 'Luxurious gold and dark theme',
    primaryColors: ['#1c1917', '#292524', '#44403c'],
    accentColor: '#f59e0b',
    backgroundGradient: 'from-stone-900 to-amber-900',
    isPremium: true
  },
  {
    value: 'classic',
    label: 'Classic Green',
    description: 'Traditional chess tournament colors',
    primaryColors: ['#14532d', '#166534', '#15803d'],
    accentColor: '#22c55e',
    backgroundGradient: 'from-green-900 to-green-700',
    isPremium: false
  }
]
import type { ThemeSelectorProps } from '@/types/preferences'

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  preferences,
  onUpdate,
  isLoading = false,
  theme
}) => {
  const handleToggle = (key: keyof typeof preferences) => {
    onUpdate({ [key]: !preferences[key] })
  }

  const handleSliderChange = (key: keyof typeof preferences, value: number[]) => {
    onUpdate({ [key]: value[0] })
  }

  const handleThemeSelect = (newTheme: string) => {
    onUpdate({ currentTheme: newTheme as any })
  }

  const handleAnimationToggle = (key: keyof typeof preferences.animations) => {
    onUpdate({
      animations: {
        ...preferences.animations,
        [key]: !preferences.animations[key]
      }
    })
  }

  const handleLayoutToggle = (key: keyof typeof preferences.layout) => {
    onUpdate({
      layout: {
        ...preferences.layout,
        [key]: !preferences.layout[key]
      }
    })
  }

  return (
    <Card className={`bg-gray-900/50 border-gray-700/50 ${theme.glassMorphism}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.accent} shadow-lg`}>
            <Palette size={20} className="text-white" />
          </div>
          <div>
            <CardTitle className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Visual Interface
            </CardTitle>
            <CardDescription className="text-gray-400">
              Customize themes, colors, and visual appearance
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Theme Selection */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide`}>
            Theme Selection
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {themeOptions.map((themeOption) => (
              <Button
                key={themeOption.value}
                variant={preferences.currentTheme === themeOption.value ? "default" : "outline"}
                className={`h-auto p-3 flex flex-col items-center gap-2 ${
                  preferences.currentTheme === themeOption.value 
                    ? `bg-gradient-to-r ${theme.primary} text-white border-transparent`
                    : 'bg-gray-800/30 border-gray-600 hover:bg-gray-700/50'
                }`}
                onClick={() => handleThemeSelect(themeOption.value)}
                disabled={isLoading}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${
                  themeOption.value === 'midnight' ? 'from-blue-900 to-blue-600' :
                  themeOption.value === 'cyber' ? 'from-cyan-900 to-cyan-400' :
                  themeOption.value === 'neon' ? 'from-green-900 to-green-400' :
                  themeOption.value === 'royal' ? 'from-purple-900 to-purple-500' :
                  'from-green-900 to-green-300'
                } shadow-lg`}></div>
                <div className="text-center">
                  <div className="text-xs font-medium">{themeOption.label}</div>
                  <div className="text-xs opacity-70">{themeOption.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Display Options */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide`}>
            Display Options
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div className="flex items-center gap-3">
                <Moon size={18} className={`${theme.text} opacity-70`} />
                <div>
                  <Label className={`text-sm font-medium ${theme.text}`}>
                    Dark Mode
                  </Label>
                  <p className="text-xs text-gray-400 mt-1">
                    Use dark theme for reduced eye strain
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.darkMode}
                onCheckedChange={() => handleToggle('darkMode')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div className="flex items-center gap-3">
                <Eye size={18} className={`${theme.text} opacity-70`} />
                <div>
                  <Label className={`text-sm font-medium ${theme.text}`}>
                    High Contrast
                  </Label>
                  <p className="text-xs text-gray-400 mt-1">
                    Increase contrast for better visibility
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.highContrast}
                onCheckedChange={() => handleToggle('highContrast')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Font and UI Scaling */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide`}>
            Font & UI Scaling
          </h4>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Type size={18} className={`${theme.text} opacity-70`} />
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Font Size: {(preferences.fontSize * 100).toFixed(0)}%
                </Label>
              </div>
              <Slider
                value={[preferences.fontSize]}
                onValueChange={(value) => handleSliderChange('fontSize', value)}
                min={0.5}
                max={2.0}
                step={0.1}
                className="w-full"
                disabled={isLoading}
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>50%</span>
                <span>100%</span>
                <span>200%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className={`text-sm font-medium ${theme.text}`}>
                UI Density
              </Label>
              <Select
                value={preferences.uiDensity}
                onValueChange={(value) => onUpdate({ uiDensity: value as any })}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <div className="flex items-center gap-2">
                    <Layout size={16} />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="compact" className="text-white hover:bg-gray-700">
                    Compact - Maximum information
                  </SelectItem>
                  <SelectItem value="comfortable" className="text-white hover:bg-gray-700">
                    Comfortable - Balanced spacing
                  </SelectItem>
                  <SelectItem value="spacious" className="text-white hover:bg-gray-700">
                    Spacious - Extra breathing room
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Animation & Effects */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide`}>
            Animation & Effects
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div className="flex items-center gap-3">
                <Sparkles size={18} className={`${theme.text} opacity-70`} />
                <div>
                  <Label className={`text-sm font-medium ${theme.text}`}>
                    Enable Animations
                  </Label>
                  <p className="text-xs text-gray-400 mt-1">
                    Show smooth transitions and effects
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.animations.enabled}
                onCheckedChange={() => handleAnimationToggle('enabled')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            {preferences.animations.enabled && (
              <div className="ml-6 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20 border border-gray-700/20">
                  <Label className={`text-xs ${theme.text}`}>Particle Effects</Label>
                  <Switch
                    checked={preferences.animations.particleEffects}
                    onCheckedChange={() => handleAnimationToggle('particleEffects')}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-blue-600 scale-75"
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20 border border-gray-700/20">
                  <Label className={`text-xs ${theme.text}`}>Background Effects</Label>
                  <Switch
                    checked={preferences.animations.backgroundEffects}
                    onCheckedChange={() => handleAnimationToggle('backgroundEffects')}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-blue-600 scale-75"
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20 border border-gray-700/20">
                  <Label className={`text-xs ${theme.text}`}>Transitions</Label>
                  <Switch
                    checked={preferences.animations.transitions}
                    onCheckedChange={() => handleAnimationToggle('transitions')}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-blue-600 scale-75"
                  />
                </div>

                <div className="space-y-2">
                  <Label className={`text-xs ${theme.text}`}>
                    Animation Intensity
                  </Label>
                  <Select
                    value={preferences.animations.intensity}
                    onValueChange={(value) => onUpdate({
                      animations: { ...preferences.animations, intensity: value as any }
                    })}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="reduced" className="text-white hover:bg-gray-700">
                        Reduced
                      </SelectItem>
                      <SelectItem value="normal" className="text-white hover:bg-gray-700">
                        Normal
                      </SelectItem>
                      <SelectItem value="enhanced" className="text-white hover:bg-gray-700">
                        Enhanced
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Layout Preferences */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide`}>
            Layout Preferences
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div className="flex items-center gap-3">
                <Sidebar size={18} className={`${theme.text} opacity-70`} />
                <div>
                  <Label className={`text-sm font-medium ${theme.text}`}>
                    Compact Mode
                  </Label>
                  <p className="text-xs text-gray-400 mt-1">
                    Reduce spacing for more content on screen
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.layout.compactMode}
                onCheckedChange={() => handleLayoutToggle('compactMode')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
              <div className="flex items-center gap-3">
                <Monitor size={18} className={`${theme.text} opacity-70`} />
                <div>
                  <Label className={`text-sm font-medium ${theme.text}`}>
                    Show Header
                  </Label>
                  <p className="text-xs text-gray-400 mt-1">
                    Display the main navigation header
                  </p>
                </div>
              </div>
              <Switch
                checked={preferences.layout.headerVisible}
                onCheckedChange={() => handleLayoutToggle('headerVisible')}
                disabled={isLoading}
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Color Customization */}
        <div className="pt-4 border-t border-gray-700/30">
          <div className="space-y-4">
            <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide flex items-center gap-2`}>
              <Wand2 size={16} />
              Advanced Color Customization
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className={`text-xs ${theme.text}`}>
                  Background Opacity: {(preferences.colorCustomization.backgroundOpacity * 100).toFixed(0)}%
                </Label>
                <Slider
                  value={[preferences.colorCustomization.backgroundOpacity]}
                  onValueChange={(value) => onUpdate({
                    colorCustomization: {
                      ...preferences.colorCustomization,
                      backgroundOpacity: value[0]
                    }
                  })}
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label className={`text-xs ${theme.text}`}>
                  Text Contrast: {(preferences.colorCustomization.textContrast * 100).toFixed(0)}%
                </Label>
                <Slider
                  value={[preferences.colorCustomization.textContrast]}
                  onValueChange={(value) => onUpdate({
                    colorCustomization: {
                      ...preferences.colorCustomization,
                      textContrast: value[0]
                    }
                  })}
                  min={0.5}
                  max={1.5}
                  step={0.05}
                  className="w-full"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}