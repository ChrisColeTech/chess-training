// Position Setup Component - Following SRP for position loading/management only
import React, { useState } from 'react'
import { RefreshCw, Copy, Save, Upload, Download, Shuffle, Target, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { PositionSetupProps } from '@/types/analysisBoard'
import { useThemeStore } from '@/stores/themeStore'
import { soundFX } from '@/utils/soundEffects'
// Predefined positions moved locally
const predefinedPositions = [
  {
    name: 'Starting Position',
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    description: 'Standard chess starting position',
    icon: Crown
  },
  {
    name: 'King and Pawn vs King',
    fen: '8/8/8/8/8/8/4K3/4k3 w - - 0 1',
    description: 'Basic endgame position',
    icon: Crown
  },
  {
    name: 'Queen vs Rook',
    fen: '8/8/8/8/8/5q2/8/4K1k1 w - - 0 1',
    description: 'Advanced endgame study',
    icon: Crown
  }
]

export const PositionSetup: React.FC<PositionSetupProps> = ({
  currentFen,
  onLoadFen,
  onResetPosition,
  className = ''
}) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  
  const [fenInput, setFenInput] = useState('')
  const [isValidFen, setIsValidFen] = useState(true)

  // Single responsibility: FEN validation and handling
  const validateFen = (fen: string): boolean => {
    if (!fen || fen.trim().length === 0) return false
    
    try {
      // Basic FEN structure validation
      const parts = fen.trim().split(' ')
      if (parts.length !== 6) return false
      
      const [position, activeColor, castling, enPassant, halfmove, fullmove] = parts
      
      // Validate position part
      const ranks = position.split('/')
      if (ranks.length !== 8) return false
      
      // Valid pieces: rnbqkpRNBQKP and numbers 1-8
      const validPiecePattern = /^[rnbqkpRNBQKP1-8]+$/
      
      for (const rank of ranks) {
        if (!validPiecePattern.test(rank)) return false
        
        // Check that rank has exactly 8 squares
        let squares = 0
        for (const char of rank) {
          if (/\d/.test(char)) {
            squares += parseInt(char)
          } else {
            squares += 1
          }
        }
        if (squares !== 8) return false
      }
      
      // Validate other parts
      if (!['w', 'b'].includes(activeColor)) return false
      if (!/^(-|[KQkq]{1,4})$/.test(castling)) return false
      if (!/^(-|[a-h][36])$/.test(enPassant)) return false
      if (!/^\d+$/.test(halfmove)) return false
      if (!/^\d+$/.test(fullmove)) return false
      
      return true
    } catch (error) {
      return false
    }
  }

  const handleFenChange = (value: string) => {
    setFenInput(value)
    setIsValidFen(validateFen(value))
  }

  const handleLoadFen = () => {
    if (isValidFen && fenInput.trim()) {
      try {
        onLoadFen(fenInput.trim())
        soundFX.playSuccess()
        setFenInput('')
      } catch {
        soundFX.playError()
      }
    } else {
      soundFX.playError()
    }
  }

  const handleCopyFen = async () => {
    try {
      await navigator.clipboard.writeText(currentFen)
      soundFX.playClick()
    } catch (error) {
      console.error('Failed to copy FEN:', error)
      soundFX.playError()
    }
  }

  const handlePasteFen = async () => {
    try {
      const text = await navigator.clipboard.readText()
      if (text) {
        handleFenChange(text)
        soundFX.playClick()
      }
    } catch (error) {
      console.error('Failed to paste FEN:', error)
      soundFX.playError()
    }
  }

  // Get predefined starting positions (first 3 for quick setup)
  const startingPositions = predefinedPositions.slice(0, 3)

  return (
    <div className={`backdrop-blur-2xl bg-black/30 border-white/20 rounded-2xl border-2 p-6 ${className}`}>
      <h3 className="font-bold mb-4 uppercase tracking-wider flex items-center gap-2">
        <Shuffle className="w-5 h-5" />
        Position Setup
      </h3>

      {/* FEN Input Section */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Load FEN Position</label>
          <div className="space-y-2">
            <Textarea
              placeholder="Enter FEN notation (e.g., rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1)"
              value={fenInput}
              onChange={(e) => handleFenChange(e.target.value)}
              className={`backdrop-blur-xl bg-black/20 border-white/10 font-mono text-sm ${
                fenInput && !isValidFen ? 'border-red-500/30 focus:border-red-500/50' : ''
              }`}
              rows={3}
            />
            {fenInput && !isValidFen && (
              <div className="text-xs text-red-400 flex items-center gap-1">
                <Target className="w-3 h-3" />
                Invalid FEN format
              </div>
            )}
          </div>
          
          <div className="flex gap-2 mt-2">
            <Button 
              onClick={handleLoadFen} 
              disabled={!isValidFen || !fenInput.trim()}
              variant="outline" 
              size="sm"
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              Load Position
            </Button>
            <Button 
              onClick={handlePasteFen}
              variant="outline" 
              size="sm"
              title="Paste from clipboard"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Current Position Section */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Current Position FEN</label>
          <div className="relative">
            <Input
              value={currentFen}
              readOnly
              className="backdrop-blur-xl bg-black/20 border-white/10 font-mono text-sm pr-10"
            />
            <Button
              onClick={handleCopyFen}
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1 h-8 w-8 p-0"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Position Presets */}
      <div className="space-y-4 mb-6">
        <label className="text-sm font-medium block">Quick Setup</label>
        <div className="space-y-2">
          {startingPositions.map((position, index) => {
            const IconComponent = position.icon
            return (
              <div 
                key={index}
                className="p-3 backdrop-blur-xl bg-black/20 border-white/10 rounded-lg border cursor-pointer hover:bg-black/30 hover:border-white/20 transition-all group"
                onClick={() => {
                  onLoadFen(position.fen)
                  soundFX.playClick()
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.accent} bg-opacity-20`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm group-hover:text-white transition-colors">
                      {position.name}
                    </div>
                    <div className="text-xs opacity-75 mt-1">
                      {position.description}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Position Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button 
          onClick={onResetPosition} 
          variant="outline" 
          className="w-full"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset Board
        </Button>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => soundFX.playClick()}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Setup
        </Button>
      </div>

      {/* Setup Instructions */}
      <div className="mt-6 p-3 bg-black/20 rounded-lg border border-white/5">
        <h4 className="text-xs font-medium mb-2 opacity-90">FEN Format Guide</h4>
        <div className="text-xs opacity-70 space-y-1">
          <div>• Position: piece placement (rnbqkbnr/pppppppp/...)</div>
          <div>• Active: w (white) or b (black) to move</div>
          <div>• Castling: KQkq availability</div>
          <div>• En passant: target square or -</div>
          <div>• Halfmove: moves since capture/pawn move</div>
          <div>• Fullmove: complete move pairs</div>
        </div>
      </div>
    </div>
  )
}

export default PositionSetup