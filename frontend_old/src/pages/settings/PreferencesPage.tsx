import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Palette, Globe, Accessibility, Gauge, ShieldCheck, Database, CloudUpload, Volume2, ArrowLeft, Save, RotateCcw, Download, AlertTriangle } from 'lucide-react'
import { FaChessKnight } from 'react-icons/fa'
import { useThemeStore } from '@/stores/themeStore'
import { usePreferences } from '@/hooks/usePreferences'
import {
  GeneralSettings,
  ThemeSelector, 
  LanguageSettings,
  AccessibilitySettings
} from '@/components/settings/preferences'
import type { UserPreferences } from '@/types/preferences'

// Preferences sections - moved here to remove dependency on @/data
const preferencesSections = [
  { id: 'general', title: 'General', description: 'Basic application settings' },
  { id: 'appearance', title: 'Appearance', description: 'Visual customization options' },
  { id: 'language', title: 'Language', description: 'Language and locale settings' },
  { id: 'accessibility', title: 'Accessibility', description: 'Accessibility features' },
  { id: 'performance', title: 'Performance', description: 'Performance optimization settings' },
  { id: 'privacy', title: 'Privacy', description: 'Privacy and data settings' },
  { id: 'importExport', title: 'Import/Export', description: 'Data import and export options' },
  { id: 'backupSync', title: 'Backup & Sync', description: 'Backup and synchronization settings' },
  { id: 'gaming', title: 'Gaming', description: 'Game-related preferences' },
  { id: 'soundAnimation', title: 'Sound & Animation', description: 'Audio and visual effects settings' }
]

// Quick presets - moved here to remove dependency on @/data
const quickPresets = [
  {
    id: 'beginner',
    name: 'Beginner Mode',
    description: 'Helpful settings for new players',
    icon: 'game-controller'
  },
  {
    id: 'advanced',
    name: 'Advanced Mode', 
    description: 'Optimized for experienced players',
    icon: 'eye'
  },
  {
    id: 'performance',
    name: 'Performance Mode',
    description: 'Optimized for lower-end devices',
    icon: 'battery-low'
  },
  {
    id: 'accessibility',
    name: 'Accessibility Mode',
    description: 'Enhanced accessibility features',
    icon: 'accessibility'
  }
]

const PreferencesPage: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  const {
    preferences,
    isLoading,
    isSaving,
    isExporting,
    updateGeneral,
    updateAppearance,
    updateLanguage,
    updateAccessibility,
    // saveChanges, // Unused for now
    // discardChanges, // Unused for now
    // resetToDefaults, // Unused for now
    // exportPreferences, // Unused for now
    hasUnsavedChanges,
    // Presentation handlers (business logic extracted to hook)
    handleBack,
    handleSave,
    handleDiscard,
    handleReset,
    handleExport,
    handleQuickPreset,
    getSectionInfo,
    error,
    clearError
  } = usePreferences()

  const [activeTab, setActiveTab] = useState('general')
  const [_showResetConfirm, _setShowResetConfirm] = useState(false)

  return (
    <div className="min-h-full p-4 relative">
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Control Center Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${theme.accent?.includes?.('cyan') ? '#00ffff' : '#3b82f6'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating Command Panels */}
        <div className={`absolute top-20 left-20 w-32 h-32 bg-gradient-to-br ${theme.accent} rounded-lg opacity-20 blur-xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br ${theme.highlight} rounded-lg opacity-25 blur-2xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 left-10 w-24 h-16 bg-gradient-to-br ${theme.secondary} rounded-lg opacity-15 blur-lg animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Data Stream Lines */}
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-twinkle`}></div>
          <div className={`absolute top-3/4 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-twinkle animation-delay-500`}></div>
          <div className={`absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-green-400 rounded-full animate-twinkle animation-delay-1500`}></div>
        </div>
      </div>

      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 text-white"
            >
              <ArrowLeft size={16} className="mr-2" />
              Settings
            </Button>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${theme.primary} shadow-lg`}>
                  <Settings size={24} className="text-white" />
                </div>
                <div>
                  <h1 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                    CONTROL CENTER
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Master your chess training experience
                  </p>
                </div>
              </div>
            </div>

            {hasUnsavedChanges && (
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                <AlertTriangle size={12} className="mr-1" />
                Unsaved Changes
              </Badge>
            )}
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap gap-2 items-center">
            <Button
              onClick={handleSave}
              disabled={!hasUnsavedChanges || isSaving}
              className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white disabled:opacity-50`}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>

            <Button
              onClick={handleDiscard}
              disabled={!hasUnsavedChanges || isSaving}
              variant="outline"
              className="bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 text-white disabled:opacity-50"
            >
              <RotateCcw size={16} className="mr-2" />
              Discard
            </Button>

            <Button
              onClick={handleExport}
              disabled={isExporting}
              variant="outline"
              className="bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 text-white disabled:opacity-50"
            >
              <Download size={16} className="mr-2" />
              Export
            </Button>

            <Button
              onClick={handleReset}
              disabled={isSaving}
              variant="outline"
              className={`${_showResetConfirm ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50'}`}
            >
              <RotateCcw size={16} className="mr-2" />
              {_showResetConfirm ? 'Confirm Reset' : 'Reset All'}
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="mb-6 bg-red-500/10 border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-red-400" />
                <div className="flex-1">
                  <p className="text-red-400 font-medium">Error</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
                <Button
                  onClick={clearError}
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Presets */}
        <Card className={`mb-6 bg-gray-900/50 border-gray-700/50 ${theme.glassMorphism}`}>
          <CardHeader className="pb-4">
            <CardTitle className={`text-lg font-bold ${theme.text} flex items-center gap-2`}>
              <Settings size={18} />
              Quick Configuration Presets
            </CardTitle>
            <CardDescription className="text-gray-400">
              Apply pre-configured settings for specific use cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {quickPresets.map((preset) => (
                <Button
                  key={preset.id}
                  onClick={() => handleQuickPreset(preset.id)}
                  className="h-auto p-4 flex flex-col items-start gap-2 bg-gray-800/30 border border-gray-700/30 hover:bg-gray-700/50 text-white"
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded bg-gradient-to-r ${theme.accent} shadow-sm`}>
                      {preset.icon === 'game-controller' && <Settings size={14} className="text-white" />}
                      {preset.icon === 'eye' && <Accessibility size={14} className="text-white" />}
                      {preset.icon === 'battery-low' && <Gauge size={14} className="text-white" />}
                      {preset.icon === 'accessibility' && <Accessibility size={14} className="text-white" />}
                    </div>
                    <span className="font-medium text-sm">{preset.name}</span>
                  </div>
                  <p className="text-xs text-gray-400 text-left">
                    {preset.description}
                  </p>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Preferences Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 bg-gray-800/50 p-1 rounded-xl">
            {preferencesSections.slice(0, 6).map((section) => {
              const sectionInfo = getSectionInfo(section.id as keyof UserPreferences)
              return (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-400 rounded-lg px-3 py-2"
                >
                  <div className="flex flex-col items-center gap-1">
                    {section.id === 'general' && <Settings size={16} />}
                    {section.id === 'appearance' && <Palette size={16} />}
                    {section.id === 'language' && <Globe size={16} />}
                    {section.id === 'accessibility' && <Accessibility size={16} />}
                    {section.id === 'performance' && <Gauge size={16} />}
                    {section.id === 'privacy' && <ShieldCheck size={16} />}
                    <span className="text-xs font-medium">{sectionInfo?.title}</span>
                    {sectionInfo?.badge && (
                      <Badge variant="secondary" className="text-xs px-1.5 py-0">
                        {sectionInfo.badge}
                      </Badge>
                    )}
                  </div>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <div className="space-y-6">
            <TabsContent value="general" className="space-y-0">
              <GeneralSettings
                preferences={preferences.general}
                onUpdate={updateGeneral}
                isLoading={isLoading}
                theme={theme}
              />
            </TabsContent>

            <TabsContent value="appearance" className="space-y-0">
              <ThemeSelector
                preferences={preferences.appearance}
                onUpdate={updateAppearance}
                isLoading={isLoading}
                theme={theme}
              />
            </TabsContent>

            <TabsContent value="language" className="space-y-0">
              <LanguageSettings
                preferences={preferences.language}
                onUpdate={updateLanguage}
                isLoading={isLoading}
                theme={theme}
              />
            </TabsContent>

            <TabsContent value="accessibility" className="space-y-0">
              <AccessibilitySettings
                preferences={preferences.accessibility}
                onUpdate={updateAccessibility}
                isLoading={isLoading}
                theme={theme}
              />
            </TabsContent>

            <TabsContent value="performance" className="space-y-0">
              <Card className={`bg-gray-900/50 border-gray-700/50 ${theme.glassMorphism}`}>
                <CardHeader className="text-center py-12">
                  <Gauge size={48} className={`mx-auto ${theme.text} opacity-50 mb-4`} />
                  <CardTitle className={`text-xl font-bold ${theme.text} opacity-70`}>
                    Performance Settings
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Graphics, memory, and optimization settings would be available here in the full implementation
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-0">
              <Card className={`bg-gray-900/50 border-gray-700/50 ${theme.glassMorphism}`}>
                <CardHeader className="text-center py-12">
                  <ShieldCheck size={48} className={`mx-auto ${theme.text} opacity-50 mb-4`} />
                  <CardTitle className={`text-xl font-bold ${theme.text} opacity-70`}>
                    Security Center
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Data privacy, security, and sharing preferences would be available here in the full implementation
                  </CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        {/* Additional Sections Preview */}
        <Card className={`mt-6 bg-gray-900/30 border-gray-700/30 ${theme.glassMorphism}`}>
          <CardHeader>
            <CardTitle className={`text-lg font-bold ${theme.text} opacity-70`}>
              Additional Settings Available
            </CardTitle>
            <CardDescription className="text-gray-400">
              These advanced settings would be fully implemented in the complete version
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {preferencesSections.slice(6).map((section) => (
                <div
                  key={section.id}
                  className="p-4 rounded-lg bg-gray-800/20 border border-gray-700/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {section.id === 'gaming' && <FaChessKnight size={20} className={`${theme.text} opacity-70`} />}
                    {section.id === 'soundAnimation' && <Volume2 size={20} className={`${theme.text} opacity-70`} />}
                    {section.id === 'importExport' && <Database size={20} className={`${theme.text} opacity-70`} />}
                    {section.id === 'backupSync' && <CloudUpload size={20} className={`${theme.text} opacity-70`} />}
                    <div className="flex-1">
                      <h3 className={`text-sm font-semibold ${theme.text} opacity-70`}>
                        {section.title}
                      </h3>
                      {section.badge && (
                        <Badge variant="outline" className="text-xs mt-1 opacity-60">
                          {section.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PreferencesPage
