import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { ArrowLeft, RotateCcw, Copy, FileDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useThemeStore } from '@/stores/themeStore'
import { soundFX } from '@/utils/soundEffects'

export const AnalysisBoardPage: React.FC = () => {
  const navigate = useNavigate()
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  // Simple state management
  const [chess] = useState(() => new Chess())
  const [position, setPosition] = useState(chess.fen())
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white')
  const [fenInput, setFenInput] = useState('')

  const handlePieceDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // Auto-promote to queen for simplicity
      })
      
      if (move) {
        setPosition(chess.fen())
        soundFX.playClick()
        return true
      }
    } catch (e) {
      // Invalid move
    }
    return false
  }

  const handleLoadFen = () => {
    if (!fenInput.trim()) return
    
    try {
      chess.load(fenInput)
      setPosition(chess.fen())
      soundFX.playClick()
      setFenInput('')
    } catch (e) {
      soundFX.playError()
      alert('Invalid FEN position')
    }
  }

  const handleResetPosition = () => {
    chess.reset()
    setPosition(chess.fen())
    soundFX.playClick()
  }

  const handleFlipBoard = () => {
    setBoardOrientation(prev => prev === 'white' ? 'black' : 'white')
    soundFX.playClick()
  }

  const handleCopyFen = () => {
    navigator.clipboard.writeText(position)
    soundFX.playClick()
  }

  const handleBackToDashboard = () => {
    soundFX.playClick()
    navigate('/dashboard')
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.background} ${theme.text}`}>
      <div className="container mx-auto px-6 py-8">
        {/* Simple header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToDashboard}
              className="hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
              Analysis Board
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls panel */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="font-semibold mb-4">Position Setup</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fen-input" className="text-sm">Load FEN</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="fen-input"
                      placeholder="Enter FEN position..."
                      value={fenInput}
                      onChange={(e) => setFenInput(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                      onKeyDown={(e) => e.key === 'Enter' && handleLoadFen()}
                    />
                    <Button size="sm" onClick={handleLoadFen}>
                      Load
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm">Current FEN</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={position}
                      readOnly
                      className="bg-white/5 border-white/20 text-white font-mono text-xs"
                    />
                    <Button size="sm" onClick={handleCopyFen}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="font-semibold mb-4">Board Controls</h3>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetPosition}
                  className="w-full bg-white/5 border-white/20 hover:bg-white/10"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Position
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFlipBoard}
                  className="w-full bg-white/5 border-white/20 hover:bg-white/10"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Flip Board
                </Button>
              </div>
            </div>
          </div>

          {/* Chess board */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <div className="aspect-square max-w-2xl mx-auto">
                <Chessboard
                  position={position}
                  onPieceDrop={handlePieceDrop}
                  boardOrientation={boardOrientation}
                  areArrowsAllowed
                  showBoardNotation
                  customBoardStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  }}
                  customLightSquareStyle={{ 
                    backgroundColor: '#f0d9b5',
                  }}
                  customDarkSquareStyle={{ 
                    backgroundColor: '#b58863',
                  }}
                />
              </div>
              
              <p className="text-center text-sm opacity-60 mt-4">
                Click and drag pieces to explore positions freely
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnalysisBoardPage
