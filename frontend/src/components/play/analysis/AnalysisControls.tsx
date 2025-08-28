// Analysis Controls Component - Following SRP for engine control interface only
import React, { useState } from 'react'
import { Play, Pause, Settings, FolderOpen, Plus, Minus, Zap, Target, Cpu, Timer } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import type { AnalysisControlsProps } from '@/types/analysisBoard'
import { useThemeStore } from '@/stores/themeStore'

export const AnalysisControls: React.FC<AnalysisControlsProps> = ({
  analysisMode,
  isAnalyzing,
  engineStatus,
  analysisSettings,
  onStartAnalysis,
  onStopAnalysis,
  onModeChange,
  onSettingsChange,
  className = ''
}) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  const [localDepth, setLocalDepth] = useState([analysisSettings.depth])
  const [localMultiPV, setLocalMultiPV] = useState(analysisSettings.multiPV)

  // Single responsibility: Handle control interactions
  const handleDepthChange = (value: number[]) => {
    setLocalDepth(value)
    onSettingsChange({ depth: value[0] })
  }

  const handleMultiPVChange = (delta: number) => {
    const newValue = Math.max(1, Math.min(5, localMultiPV + delta))
    setLocalMultiPV(newValue)
    onSettingsChange({ multiPV: newValue })
  }

  const handleTimeLimit = (seconds: number | undefined) => {
    onSettingsChange({ timeLimit: seconds })
  }

  return (
    <div className={`backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6 ${className}`}>
      {/* Engine status header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold uppercase tracking-wider flex items-center gap-2">
          <FaBrain className="w-5 h-5" />
          Engine Control
        </h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
          <Badge variant={isAnalyzing ? 'default' : 'outline'} className="text-xs">
            {isAnalyzing ? 'ANALYZING' : 'IDLE'}
          </Badge>
        </div>
      </div>

      <Tabs value={analysisMode} onValueChange={(value) => onModeChange(value as any)}>
        <TabsList className="grid w-full grid-cols-3 bg-black/50">
          <TabsTrigger value="analyze" className="data-[state=active]:bg-black/70">
            <FaBrain className="w-4 h-4 mr-1" />
            Analyze
          </TabsTrigger>
          <TabsTrigger value="setup" className="data-[state=active]:bg-black/70">
            <Settings className="w-4 h-4 mr-1" />
            Setup
          </TabsTrigger>
          <TabsTrigger value="database" className="data-[state=active]:bg-black/70">
            <FolderOpen className="w-4 h-4 mr-1" />
            Database
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="mt-6 space-y-6">
          {/* Main analysis controls */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={isAnalyzing ? onStopAnalysis : onStartAnalysis}
                className={`flex-1 ${isAnalyzing 
                  ? 'bg-red-500/30 border-red-500/30 hover:bg-red-500/40 text-red-200' 
                  : `bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white`
                } transition-all duration-300`}
              >
                {isAnalyzing ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop Analysis
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Analysis
                  </>
                )}
              </Button>
            </div>

            {/* Depth control */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Search Depth
                </label>
                <Badge variant="outline" className="text-xs">
                  {localDepth[0]}
                </Badge>
              </div>
              <Slider
                value={localDepth}
                onValueChange={handleDepthChange}
                max={25}
                min={5}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs opacity-60 mt-1">
                <span>Fast (5)</span>
                <span>Balanced ({localDepth[0]})</span>
                <span>Deep (25)</span>
              </div>
            </div>

            {/* Multi-PV control */}
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Analysis Lines
              </label>
              <div className="flex items-center justify-center gap-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleMultiPVChange(-1)}
                  disabled={localMultiPV <= 1}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <div className="w-16 text-center">
                  <div className="text-2xl font-bold">{localMultiPV}</div>
                  <div className="text-xs opacity-60">lines</div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleMultiPVChange(1)}
                  disabled={localMultiPV >= 5}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Time limit controls */}
            <div>
              <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                <Timer className="w-4 h-4" />
                Time Limit
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'None', value: undefined },
                  { label: '10s', value: 10 },
                  { label: '30s', value: 30 },
                  { label: '60s', value: 60 }
                ].map((option) => (
                  <Button
                    key={option.label}
                    size="sm"
                    variant={analysisSettings.timeLimit === option.value ? 'default' : 'outline'}
                    onClick={() => handleTimeLimit(option.value)}
                    className="text-xs"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="setup" className="mt-6 space-y-4">
          {/* Engine settings */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                CPU Threads
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 4, 8].map((threads) => (
                  <Button
                    key={threads}
                    size="sm"
                    variant={analysisSettings.threads === threads ? 'default' : 'outline'}
                    onClick={() => onSettingsChange({ threads })}
                    className="flex-1 text-xs"
                  >
                    {threads}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Hash Table Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[128, 512, 1024].map((size) => (
                  <Button
                    key={size}
                    size="sm"
                    variant={analysisSettings.hashSize === size ? 'default' : 'outline'}
                    onClick={() => onSettingsChange({ hashSize: size })}
                    className="text-xs"
                  >
                    {size}MB
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Contempt Factor
              </label>
              <Slider
                value={[analysisSettings.contempt || 0]}
                onValueChange={([value]) => onSettingsChange({ contempt: value })}
                max={100}
                min={-100}
                step={10}
                className="w-full"
              />
              <div className="text-xs opacity-60 mt-1 text-center">
                Current: {analysisSettings.contempt || 0}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="database" className="mt-6">
          <div className="text-center py-8 opacity-60">
            <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Position database controls would go here</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Engine status footer */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="font-medium opacity-90">{engineStatus.engineName}</div>
            <div className="opacity-60">Engine</div>
          </div>
          <div>
            <div className="font-medium opacity-90">{engineStatus.version}</div>
            <div className="opacity-60">Version</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisControls