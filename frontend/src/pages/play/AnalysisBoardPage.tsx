// Analysis Board Page - Following SRP for presentation layer only
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Chessboard } from 'react-chessboard'
import { ArrowLeft, BarChart3, Eye, Save, FolderOpen, Target, Zap } from 'lucide-react'
import { FaBrain } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useThemeStore } from '@/stores/themeStore'
import { soundFX } from '@/utils/soundEffects'

// Import custom hook and components following architecture
import { useAnalysisBoard } from '@/hooks/useAnalysisBoard'
import {
  AnalysisControls,
  EvaluationBar,
  EngineLines,
  MoveNavigation,
  PositionDatabase,
  PositionSetup
} from '@/components/play/analysis'


export const AnalysisBoardPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  // Single responsibility: Use custom hook for all state management
  const { 
    state, 
    actions
  } = useAnalysisBoard()

  // Handler functions from actions
  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    const move = actions.makeMove(sourceSquare, targetSquare)
    return !!move
  }

  const handleFlipBoard = () => {
    actions.flipBoard()
  }

  const handleBackToDashboard = () => {
    soundFX.playClick()
    navigate('/dashboard')
  }

  return (
    <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${theme.background} ${theme.text}`}>
      {/* Professional analysis lab background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Sophisticated floating orbs */}
        <div className={`absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br ${theme.accent} rounded-full opacity-8 blur-3xl animate-pulse-glow`}></div>
        <div className={`absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-gradient-to-br ${theme.highlight} rounded-full opacity-12 blur-3xl animate-pulse-glow animation-delay-1000`}></div>
        <div className={`absolute top-1/2 -left-20 w-64 h-64 bg-gradient-to-br ${theme.secondary} rounded-full opacity-6 blur-3xl animate-pulse-glow animation-delay-2000`}></div>
        
        {/* Technical sparkle field */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Technical chess symbols */}
        <div className="absolute top-16 right-16 text-8xl opacity-4 animate-bounce-subtle delay-500 transform rotate-12"><Zap className="w-4 h-4 inline" /></div>
        <div className="absolute bottom-16 left-16 text-6xl opacity-4 animate-bounce-subtle delay-1000 transform -rotate-12">🔬</div>
        <div className="absolute top-1/3 right-1/4 text-5xl opacity-3 animate-bounce-subtle delay-1500 transform rotate-45"><BarChart3 className="w-4 h-4 inline" /></div>
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Professional analysis header */}
        <div className="flex items-center justify-between p-8">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="lg"
              onClick={handleBackToDashboard}
              className="backdrop-blur-2xl bg-black/30 border-white/20 hover:bg-black/40 hover:border-white/30 hover:scale-105 transition-all duration-300 p-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className={`text-6xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent drop-shadow-2xl`}>
                ANALYSIS LAB
              </h1>
              <p className={`${theme.text} opacity-90 mt-2 text-xl font-medium tracking-wide`}>
                Deep position analysis and study tools
              </p>
            </div>
          </div>

          {/* Engine status display */}
          <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl p-6 border-2">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${state.isAnalysisRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <div>
                <div className="font-bold text-lg">
                  ENGINE {state.isAnalysisRunning ? 'ACTIVE' : 'IDLE'}
                </div>
                <div className="text-sm opacity-80">
                  {state.engineStatus.engineName} {state.engineStatus.version}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-8 grid grid-cols-12 gap-8">
          {/* Left panel - Analysis tools */}
          <div className="col-span-3 space-y-6">
            <Tabs value={state.analysisMode} onValueChange={(value) => actions.toggleAnalysisMode(value as any)}>
              <TabsList className="grid w-full grid-cols-3 bg-black/50">
                <TabsTrigger value="analyze" className="data-[state=active]:bg-black/70">
                  <FaBrain className="w-4 h-4 mr-1" />
                  Analyze
                </TabsTrigger>
                <TabsTrigger value="setup" className="data-[state=active]:bg-black/70">
                  <Target className="w-4 h-4 mr-1" />
                  Setup
                </TabsTrigger>
                <TabsTrigger value="database" className="data-[state=active]:bg-black/70">
                  <FolderOpen className="w-4 h-4 mr-1" />
                  Database
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analyze" className="mt-6">
                <AnalysisControls
                  analysisMode={state.analysisMode}
                  isAnalyzing={state.isAnalysisRunning}
                  engineStatus={state.engineStatus}
                  analysisSettings={state.analysisSettings}
                  onStartAnalysis={actions.startAnalysis}
                  onStopAnalysis={actions.stopAnalysis}
                  onModeChange={actions.toggleAnalysisMode}
                  onSettingsChange={(settings) => {
                    if (settings.depth) actions.setAnalysisDepth(settings.depth)
                    if (settings.multiPV) actions.setMultiPV(settings.multiPV)
                  }}
                />
              </TabsContent>

              <TabsContent value="setup" className="mt-6">
                <PositionSetup
                  currentFen={state.currentFen}
                  onLoadFen={actions.loadPosition}
                  onResetPosition={actions.resetPosition}
                />
              </TabsContent>

              <TabsContent value="database" className="mt-6">
                <PositionDatabase
                  positions={state.savedPositions}
                  onLoadPosition={actions.loadSavedPosition}
                  onSavePosition={actions.saveCurrentPosition}
                  onDeletePosition={actions.deleteSavedPosition}
                />
              </TabsContent>
            </Tabs>

            {/* Move navigation */}
            <MoveNavigation
              gameHistory={state.gameHistory}
              currentMoveIndex={state.currentMoveIndex}
              onGoToMove={actions.goToMove}
              onUndo={actions.undoMove}
              onRedo={actions.redoMove}
            />
          </div>

          {/* Center - Chess Board */}
          <div className="col-span-6">
            <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-8">
              <div className="aspect-square max-w-2xl mx-auto">
                <Chessboard
                  position={state.currentFen}
                  onPieceDrop={handlePieceDrop}
                  boardOrientation={state.boardOrientation}
                  areArrowsAllowed
                  showBoardNotation
                  customBoardStyle={{
                    borderRadius: '12px',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                  }}
                  customLightSquareStyle={{ backgroundColor: '#f0d9b5' }}
                  customDarkSquareStyle={{ backgroundColor: '#b58863' }}
                />
              </div>

              {/* Quick tools */}
              <div className="flex justify-center gap-4 mt-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="backdrop-blur-xl bg-black/20 border-white/10"
                  onClick={() => soundFX.playClick()}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="backdrop-blur-xl bg-black/20 border-white/10"
                  onClick={() => soundFX.playClick()}
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Load
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="backdrop-blur-xl bg-black/20 border-white/10"
                  onClick={handleFlipBoard}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Flip Board
                </Button>
              </div>
            </div>
          </div>

          {/* Right panel - Engine analysis */}
          <div className="col-span-3 space-y-6">
            {/* Engine evaluation */}
            <EvaluationBar 
              evaluation={state.currentAnalysis[0]?.eval || 0}
            />

            {/* Engine lines */}
            <EngineLines
              analysisLines={state.currentAnalysis}
              isAnalyzing={state.isAnalysisRunning}
              onPlayLine={(moves) => {
                // Mock implementation - would play the moves
                soundFX.playClick()
                console.log('Playing line:', moves)
              }}
            />

            {/* Engine performance stats */}
            <div className="backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6">
              <h3 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="opacity-75">NPS:</span>
                  <span className="font-mono">
                    {state.currentAnalysis[0] ? (state.currentAnalysis[0].nps / 1000000).toFixed(1) : '0.0'}M
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Time:</span>
                  <span className="font-mono">
                    {state.currentAnalysis[0]?.time.toFixed(1) || '0.0'}s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Hash:</span>
                  <span className="font-mono">{state.analysisSettings.hashSize}MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Threads:</span>
                  <span className="font-mono">{state.analysisSettings.threads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-75">Depth:</span>
                  <span className="font-mono">{state.engineStatus.currentDepth}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnalysisBoardPage
