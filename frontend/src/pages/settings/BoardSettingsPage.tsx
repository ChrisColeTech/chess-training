import React, { useState, useEffect } from 'react'
import { ArrowLeft, CheckCircle, Download, Eye, Hammer, Palette, Settings, Sparkles, Upload, Wrench, XCircle, Zap } from 'lucide-react'
import { FaCrown } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useThemeStore } from '@/stores/themeStore'
import { useBoardSettings } from '@/hooks/useBoardSettings'
import { availablePieceSets } from '@/data/boardThemes'
import { 
  BoardPreview, 
  ThemeSelector, 
  PieceSelector, 
  BoardControls 
} from '@/components/settings/board'
import { useNavigate } from 'react-router-dom'

/**
 * BoardSettingsPage Component
 * Comprehensive board customization interface with BOARD FORGE theme
 * Visual mockup with realistic board customization options
 */
export const BoardSettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  const {
    settings,
    availableThemes,
    customThemes,
    isLoading,
    isSaving,
    isExporting,
    isImporting,
    updateSettings,
    selectTheme,
    applyPreview,
    cancelPreview,
    isPreviewMode,
    error,
    clearError
  } = useBoardSettings()

  const [activeTab, setActiveTab] = useState('themes')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Local handler functions
  const handleSave = () => {
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const handleExport = () => {
    // Export settings functionality - mockup
    const settingsJson = JSON.stringify(settings, null, 2)
    const blob = new Blob([settingsJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'board-settings.json'
    link.click()
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string)
          // Would call updateSettings with importedSettings
          console.log('Imported settings:', importedSettings)
        } catch (error) {
          console.error('Failed to import settings:', error)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleReset = () => {
    // Reset to default settings
    console.log('Resetting to default settings')
  }

  // Clear error after timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.background} flex items-center justify-center`}>
        <Card className={`${theme.glassMorphism} border-white/10 p-8`}>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span className={`${theme.text} font-medium`}>Loading board settings...</span>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} p-4 sm:p-6 lg:p-8`}>
      {/* Enhanced Gaming Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs with BOARD FORGE theme */}
        <div className={`absolute top-20 left-20 w-40 h-40 bg-gradient-to-br ${theme.accent} rounded-full opacity-20 blur-2xl animate-pulse-glow`}></div>
        <div className={`absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br ${theme.primary} rounded-full opacity-25 blur-3xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 left-10 w-32 h-32 bg-gradient-to-br ${theme.secondary} rounded-full opacity-15 blur-xl animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Forge Sparks Effect */}
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 right-1/4 w-2 h-2 bg-orange-400 rounded-full animate-twinkle`}></div>
          <div className={`absolute top-3/4 left-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-twinkle animation-delay-500`}></div>
          <div className={`absolute top-1/2 right-1/2 w-1.5 h-1.5 bg-red-400 rounded-full animate-twinkle animation-delay-1500`}></div>
          <div className={`absolute bottom-1/3 left-1/5 w-1 h-1 bg-orange-300 rounded-full animate-twinkle animation-delay-2500`}></div>
        </div>
        
        {/* Floating Chess Pieces with Forge theme */}
        <div className="absolute top-16 right-16 text-5xl opacity-10 animate-bounce-subtle delay-500">⚒️</div>
        <div className="absolute bottom-16 left-16 text-4xl opacity-10 animate-bounce-subtle delay-1000">🔨</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-10 animate-bounce-subtle delay-1500"><Zap className="w-4 h-4 inline" /></div>
        <div className="absolute bottom-1/3 left-1/4 text-6xl opacity-10 animate-bounce-subtle delay-2000"><Settings className="w-4 h-4 inline" /></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header with BOARD FORGE theme */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/settings')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${theme.primary} shadow-lg`}>
                <Hammer size={28} className="text-white" />
              </div>
              
              <div>
                <h1 className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                  BOARD FORGE
                </h1>
                <p className={`${theme.text} opacity-80 text-lg`}>
                  Craft your perfect chess battlefield
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {isPreviewMode && (
              <div className="flex space-x-2">
                <Button
                  onClick={applyPreview}
                  className={`bg-gradient-to-r ${theme.accent} hover:opacity-90 text-white shadow-lg`}
                >
                  <CheckCircle size={16} className="mr-2" />
                  Apply
                </Button>
                <Button
                  variant="outline"
                  onClick={cancelPreview}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <XCircle size={16} className="mr-2" />
                  Cancel
                </Button>
              </div>
            )}
            
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className={`bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white shadow-lg`}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Forging...
                </>
              ) : (
                <>
                  <Wrench size={16} className="mr-2" />
                  Save Forge
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg animate-slide-down">
            <div className="flex items-center space-x-2">
              <CheckCircle size={20} className="text-green-400" />
              <span className="text-green-300 font-medium">Board settings forged successfully!</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg animate-slide-down">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <XCircle size={20} className="text-red-400" />
                <span className="text-red-300 font-medium">{error}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearError}
                className="text-red-300 hover:text-red-200 hover:bg-red-500/10"
              >
                Dismiss
              </Button>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Live Preview */}
          <div className="xl:col-span-1 space-y-6">
            <BoardPreview
              settings={settings}
              theme={theme}
              size="large"
              interactive={true}
            />

            {/* Quick Actions */}
            <Card className={`${theme.glassMorphism} border-white/10`}>
              <CardContent className="p-4">
                <h3 className={`font-semibold ${theme.text} mb-4 flex items-center space-x-2`}>
                  <Zap size={16} />
                  <span>Quick Forge Actions</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handleExport}
                    disabled={isExporting}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 text-xs"
                  >
                    <Download size={14} className="mr-1" />
                    Export
                  </Button>
                  
                  <label className="cursor-pointer">
                    <Button
                      disabled={isImporting}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 text-xs w-full"
                      asChild
                    >
                      <span>
                        <Upload size={14} className="mr-1" />
                        Import
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </label>
                  
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 text-xs col-span-2"
                  >
                    <Settings size={14} className="mr-1" />
                    Reset to Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Theme Stats */}
            <Card className={`${theme.glassMorphism} border-white/10`}>
              <CardContent className="p-4">
                <h3 className={`font-semibold ${theme.text} mb-4 flex items-center space-x-2`}>
                  <Sparkles size={16} />
                  <span>Forge Statistics</span>
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className={`${theme.text} opacity-70`}>Available Themes:</span>
                    <Badge variant="outline" className="border-white/20 text-white/80">
                      {availableThemes.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${theme.text} opacity-70`}>Custom Themes:</span>
                    <Badge variant="outline" className="border-white/20 text-white/80">
                      {customThemes.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${theme.text} opacity-70`}>Current Theme:</span>
                    <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-black text-xs">
                      {settings.theme.category}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${theme.text} opacity-70`}>Preview Mode:</span>
                    <Badge 
                      variant={isPreviewMode ? "secondary" : "outline"}
                      className={isPreviewMode ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" : "border-white/20 text-white/80"}
                    >
                      {isPreviewMode ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings Tabs */}
          <div className="xl:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 mb-6">
                <TabsTrigger value="themes" className="data-[state=active]:bg-white/10">
                  <Palette size={16} className="mr-2" />
                  <span className="hidden sm:inline">Themes</span>
                </TabsTrigger>
                <TabsTrigger value="pieces" className="data-[state=active]:bg-white/10">
                  <FaCrown size={16} className="mr-2" />
                  <span className="hidden sm:inline">Pieces</span>
                </TabsTrigger>
                <TabsTrigger value="controls" className="data-[state=active]:bg-white/10">
                  <Settings size={16} className="mr-2" />
                  <span className="hidden sm:inline">Controls</span>
                </TabsTrigger>
                <TabsTrigger value="forge" className="data-[state=active]:bg-white/10">
                  <Hammer size={16} className="mr-2" />
                  <span className="hidden sm:inline">Forge</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="themes" className="space-y-6">
                <ThemeSelector
                  themes={availableThemes}
                  selectedTheme={settings.theme}
                  onThemeSelect={selectTheme}
                  showPremium={true}
                  theme={theme}
                />
              </TabsContent>

              <TabsContent value="pieces" className="space-y-6">
                <PieceSelector
                  pieceSets={availablePieceSets}
                  selectedPieceSet={settings.theme.pieceSet}
                  onPieceSetSelect={(pieceSet) => {
                    const updatedTheme = { ...settings.theme, pieceSet }
                    updateSettings({ theme: updatedTheme })
                  }}
                  theme={theme}
                />
              </TabsContent>

              <TabsContent value="controls" className="space-y-6">
                <BoardControls
                  settings={settings}
                  onSettingsChange={updateSettings}
                  theme={theme}
                />
              </TabsContent>

              <TabsContent value="forge" className="space-y-6">
                {/* Custom Theme Creation - Placeholder for now */}
                <Card className={`${theme.glassMorphism} border-white/10`}>
                  <CardContent className="p-8 text-center">
                    <div className={`p-4 rounded-lg bg-gradient-to-br ${theme.accent} bg-opacity-20 inline-block mb-4`}>
                      <Hammer size={48} className={theme.text} />
                    </div>
                    <h3 className={`text-xl font-bold ${theme.text} mb-2`}>
                      Theme Forge Workshop
                    </h3>
                    <p className={`${theme.text} opacity-60 mb-6`}>
                      Create custom board themes with the Theme Forge. Coming soon in the next update!
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-black">
                        <Sparkles size={14} className="mr-1" />
                        Premium Feature
                      </Badge>
                      <Badge variant="outline" className="border-white/20 text-white/70">
                        <Eye size={14} className="mr-1" />
                        Visual Mockup
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BoardSettingsPage
