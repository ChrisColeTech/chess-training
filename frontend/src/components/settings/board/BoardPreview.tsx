import React from 'react'
import { Chessboard } from 'react-chessboard'
import { Palette, Eye, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { boardSizeConfigs } from '@/data/boardThemes'
import type { BoardPreviewProps } from '@/types/boardSettings'

/**
 * BoardPreview Component
 * Displays a live preview of the chess board with current settings applied
 */
export const BoardPreview: React.FC<BoardPreviewProps> = ({
  settings,
  position = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', // Starting position
  size = 'medium',
  interactive = true,
  theme
}) => {
  const previewSize = size === 'small' ? 320 : size === 'medium' ? 400 : 480

  // Calculate board style from settings
  const boardStyle = {
    borderRadius: '12px',
    boxShadow: settings.theme.border.show 
      ? `0 0 20px ${settings.theme.border.color}40, inset 0 0 0 ${settings.theme.border.width === 'thin' ? '2px' : settings.theme.border.width === 'thick' ? '6px' : '4px'} ${settings.theme.border.color}`
      : '0 8px 32px rgba(0, 0, 0, 0.3)',
  }

  // Custom square styles for theme colors
  const customSquareStyles = React.useMemo(() => {
    const styles: { [square: string]: React.CSSProperties } = {}
    
    // Apply theme colors to all squares
    for (let file = 0; file < 8; file++) {
      for (let rank = 0; rank < 8; rank++) {
        const square = String.fromCharCode(97 + file) + (rank + 1)
        const isLight = (file + rank) % 2 === 0
        
        styles[square] = {
          backgroundColor: isLight ? settings.theme.lightSquare : settings.theme.darkSquare,
          transition: 'all 0.2s ease'
        }
      }
    }

    // Add last move highlighting if enabled
    if (settings.highlighting.showLastMove) {
      styles['e2'] = {
        ...styles['e2'],
        boxShadow: `inset 0 0 0 3px ${settings.highlighting.color}`,
        backgroundColor: settings.theme.lightSquare,
        opacity: 0.9
      }
      styles['e4'] = {
        ...styles['e4'],
        boxShadow: `inset 0 0 0 3px ${settings.highlighting.color}`,
        backgroundColor: settings.theme.darkSquare,
        opacity: 0.9
      }
    }

    return styles
  }, [settings])

  // Custom board appearance
  const customBoardStyle = {
    borderRadius: '12px',
    background: settings.theme.background === 'wood-grain' 
      ? 'linear-gradient(45deg, #8b4513, #a0522d)' 
      : settings.theme.background === 'marble-veins'
      ? 'linear-gradient(45deg, #f0f0f0, #e0e0e0)'
      : settings.theme.background === 'space-stars'
      ? 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
      : 'transparent',
  }

  return (
    <Card className={`${theme.glassMorphism} border-white/10 overflow-hidden`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.accent} bg-opacity-20`}>
              <Eye size={20} className={theme.text} />
            </div>
            <div>
              <CardTitle className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                Live Preview
              </CardTitle>
              <p className={`text-sm ${theme.text} opacity-60`}>
                Real-time board visualization
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-1">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              {settings.theme.name}
            </Badge>
            <Badge variant="outline" className="text-xs border-white/20 text-white/70">
              {boardSizeConfigs[settings.size].label}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Theme Info Banner */}
        <div className={`p-4 rounded-lg border border-white/10 bg-gradient-to-r ${theme.primary} bg-opacity-10`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Palette size={18} className={theme.text} />
              <div>
                <h4 className={`font-semibold ${theme.text}`}>
                  {settings.theme.name}
                </h4>
                <p className={`text-xs ${theme.text} opacity-70`}>
                  {settings.theme.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {settings.theme.isPremium && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs">
                  Premium
                </Badge>
              )}
              <Badge variant="outline" className="text-xs border-white/20 text-white/70">
                {settings.theme.category}
              </Badge>
            </div>
          </div>
        </div>

        {/* Chess Board Preview */}
        <div className="flex justify-center">
          <div 
            className="relative"
            style={boardStyle}
          >
            {/* Board Background Effect */}
            {settings.theme.background !== 'plain' && (
              <div 
                className="absolute inset-0 rounded-lg opacity-20 pointer-events-none"
                style={customBoardStyle}
              />
            )}
            
            <Chessboard
              position={position}
              boardOrientation={settings.orientation}
              boardWidth={previewSize}
              arePiecesDraggable={interactive}
              showBoardNotation={settings.coordinates.show}
              customBoardStyle={{
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}
              customSquareStyles={customSquareStyles}
              customDarkSquareStyle={{
                backgroundColor: settings.theme.darkSquare,
              }}
              customLightSquareStyle={{
                backgroundColor: settings.theme.lightSquare,
              }}
            />

            {/* Coordinate Labels Overlay */}
            {settings.coordinates.show && settings.coordinates.position === 'outside' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* File labels (a-h) */}
                <div className="absolute bottom-[-20px] left-0 right-0 flex justify-around text-xs font-medium">
                  {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map((file, index) => (
                    <span 
                      key={file} 
                      className={`${theme.text} opacity-60`}
                      style={{
                        color: settings.coordinates.colorScheme === 'accent' 
                          ? settings.theme.border.color 
                          : undefined
                      }}
                    >
                      {settings.orientation === 'white' ? file : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'][index]}
                    </span>
                  ))}
                </div>
                
                {/* Rank labels (1-8) */}
                <div className="absolute left-[-20px] top-0 bottom-0 flex flex-col justify-around text-xs font-medium">
                  {[8, 7, 6, 5, 4, 3, 2, 1].map((rank, index) => (
                    <span 
                      key={rank} 
                      className={`${theme.text} opacity-60`}
                      style={{
                        color: settings.coordinates.colorScheme === 'accent' 
                          ? settings.theme.border.color 
                          : undefined
                      }}
                    >
                      {settings.orientation === 'white' ? rank : [1, 2, 3, 4, 5, 6, 7, 8][index]}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Settings Summary */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className={`p-3 rounded-lg bg-black/20 border border-white/10`}>
            <div className="flex items-center space-x-2 mb-2">
              <Settings size={14} className={theme.text} />
              <span className={`font-medium ${theme.text}`}>Display</span>
            </div>
            <div className={`space-y-1 ${theme.text} opacity-70`}>
              <div>Size: {boardSizeConfigs[settings.size].label}</div>
              <div>Orientation: {settings.orientation === 'white' ? 'White' : 'Black'}</div>
              <div>Coordinates: {settings.coordinates.show ? 'On' : 'Off'}</div>
            </div>
          </div>

          <div className={`p-3 rounded-lg bg-black/20 border border-white/10`}>
            <div className="flex items-center space-x-2 mb-2">
              <Palette size={14} className={theme.text} />
              <span className={`font-medium ${theme.text}`}>Appearance</span>
            </div>
            <div className={`space-y-1 ${theme.text} opacity-70`}>
              <div>Piece Set: {settings.theme.pieceSet.replace(/-/g, ' ')}</div>
              <div>Material: {settings.theme.material.replace(/-/g, ' ')}</div>
              <div>Highlights: {settings.highlighting.showLastMove ? 'On' : 'Off'}</div>
            </div>
          </div>
        </div>

        {/* Theme Color Swatches */}
        <div className="flex items-center space-x-4">
          <span className={`text-sm font-medium ${theme.text}`}>Theme Colors:</span>
          <div className="flex space-x-2">
            <div 
              className="w-8 h-8 rounded-lg border-2 border-white/20 shadow-sm"
              style={{ backgroundColor: settings.theme.lightSquare }}
              title="Light squares"
            />
            <div 
              className="w-8 h-8 rounded-lg border-2 border-white/20 shadow-sm"
              style={{ backgroundColor: settings.theme.darkSquare }}
              title="Dark squares"
            />
            {settings.theme.border.show && (
              <div 
                className="w-8 h-8 rounded-lg border-2 border-white/20 shadow-sm"
                style={{ backgroundColor: settings.theme.border.color }}
                title="Border color"
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}