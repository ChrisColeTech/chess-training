import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Clock, Calendar, Rocket, Keyboard, CheckCircle, Save, HelpCircle as Question } from 'lucide-react'
import type { GeneralSettingsProps } from '@/types/preferences'

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  preferences,
  onUpdate,
  isLoading = false,
  theme
}) => {
  const handleToggle = (key: keyof typeof preferences) => {
    onUpdate({ [key]: !preferences[key] })
  }

  const handleSelectChange = (key: keyof typeof preferences, value: string) => {
    onUpdate({ [key]: value })
  }

  return (
    <Card className={`bg-gray-900/50 border-gray-700/50 ${theme.glassMorphism}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.accent} shadow-lg`}>
            <Settings size={20} className="text-white" />
          </div>
          <div>
            <CardTitle className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Command Center
            </CardTitle>
            <CardDescription className="text-gray-400">
              Core application behavior and startup preferences
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Auto-Save Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
            <div className="flex items-center gap-3">
              <Save size={18} className={`${theme.text} opacity-70`} />
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Auto-Save Progress
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Automatically save your progress every 2 seconds
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.autoSave}
              onCheckedChange={() => handleToggle('autoSave')}
              disabled={isLoading}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
            <div className="flex items-center gap-3">
              <Question size={18} className={`${theme.text} opacity-70`} />
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Show Tooltips
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Display helpful tooltips for new users
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.showTooltips}
              onCheckedChange={() => handleToggle('showTooltips')}
              disabled={isLoading}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
            <div className="flex items-center gap-3">
              <CheckCircle size={18} className={`${theme.text} opacity-70`} />
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Confirm Destructive Actions
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Ask for confirmation before deleting or resetting data
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.confirmDestructiveActions}
              onCheckedChange={() => handleToggle('confirmDestructiveActions')}
              disabled={isLoading}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
            <div className="flex items-center gap-3">
              <Clock size={18} className={`${theme.text} opacity-70`} />
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Remember Last Session
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Restore your previous session when you return
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.rememberLastSession}
              onCheckedChange={() => handleToggle('rememberLastSession')}
              disabled={isLoading}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-800/30 border border-gray-700/30">
            <div className="flex items-center gap-3">
              <Keyboard size={18} className={`${theme.text} opacity-70`} />
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Enable Keyboard Shortcuts
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Use keyboard shortcuts for faster navigation
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.enableKeyboardShortcuts}
              onCheckedChange={() => handleToggle('enableKeyboardShortcuts')}
              disabled={isLoading}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </div>

        {/* Format Preferences */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide`}>
            Format Preferences
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={`text-sm font-medium ${theme.text}`}>
                Date Format
              </Label>
              <Select
                value={preferences.dateFormat}
                onValueChange={(value) => handleSelectChange('dateFormat', value as any)}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="MM/DD/YYYY" className="text-white hover:bg-gray-700">
                    MM/DD/YYYY (US)
                  </SelectItem>
                  <SelectItem value="DD/MM/YYYY" className="text-white hover:bg-gray-700">
                    DD/MM/YYYY (EU)
                  </SelectItem>
                  <SelectItem value="YYYY-MM-DD" className="text-white hover:bg-gray-700">
                    YYYY-MM-DD (ISO)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={`text-sm font-medium ${theme.text}`}>
                Time Format
              </Label>
              <Select
                value={preferences.timeFormat}
                onValueChange={(value) => handleSelectChange('timeFormat', value as any)}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="12h" className="text-white hover:bg-gray-700">
                    12 Hour (AM/PM)
                  </SelectItem>
                  <SelectItem value="24h" className="text-white hover:bg-gray-700">
                    24 Hour (Military)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className={`text-sm font-medium ${theme.text}`}>
              Time Zone
            </Label>
            <Input
              value={preferences.timeZone}
              onChange={(e) => onUpdate({ timeZone: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
              placeholder="America/New_York"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-400">
              Use IANA time zone identifiers (e.g., America/New_York, Europe/London)
            </p>
          </div>
        </div>

        {/* Startup Behavior */}
        <div className="space-y-4">
          <h4 className={`text-sm font-semibold ${theme.text} opacity-80 uppercase tracking-wide`}>
            Startup Behavior
          </h4>
          
          <div className="space-y-2">
            <Label className={`text-sm font-medium ${theme.text}`}>
              Default Landing Page
            </Label>
            <Select
              value={preferences.startupBehavior}
              onValueChange={(value) => handleSelectChange('startupBehavior', value as any)}
              disabled={isLoading}
            >
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <div className="flex items-center gap-2">
                  <Rocket size={16} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="dashboard" className="text-white hover:bg-gray-700">
                  Dashboard
                </SelectItem>
                <SelectItem value="last_page" className="text-white hover:bg-gray-700">
                  Last Visited Page
                </SelectItem>
                <SelectItem value="training" className="text-white hover:bg-gray-700">
                  Training Center
                </SelectItem>
                <SelectItem value="custom" className="text-white hover:bg-gray-700">
                  Custom Page
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {preferences.startupBehavior === 'custom' && (
            <div className="space-y-2">
              <Label className={`text-sm font-medium ${theme.text}`}>
                Custom Startup Page
              </Label>
              <Input
                value={preferences.customStartupPage || ''}
                onChange={(e) => onUpdate({ customStartupPage: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                placeholder="/puzzles/tactical"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-400">
                Enter a custom route path (e.g., /puzzles/tactical, /study/openings)
              </p>
            </div>
          )}
        </div>

        {/* Advanced Features Toggle */}
        <div className="pt-4 border-t border-gray-700/30">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${theme.primary} shadow-lg`}>
                <Rocket size={18} className="text-white" />
              </div>
              <div>
                <Label className={`text-sm font-medium ${theme.text}`}>
                  Show Advanced Features
                </Label>
                <p className="text-xs text-gray-400 mt-1">
                  Enable power user features and advanced controls
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.showAdvancedFeatures}
              onCheckedChange={() => handleToggle('showAdvancedFeatures')}
              disabled={isLoading}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}