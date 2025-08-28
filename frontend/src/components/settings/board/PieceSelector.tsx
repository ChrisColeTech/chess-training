import React, { useState } from 'react'
import { Castle, Zap, Star, Gamepad2, Check, Eye } from 'lucide-react'
import { GiSwordsPower } from 'react-icons/gi'
import { FaCrown } from 'react-icons/fa'
import { FiStar as FaSparkles } from 'react-icons/fi'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { PieceSelectorProps, PieceSet } from '@/types/boardSettings'

/**
 * PieceSelector Component
 * Allows users to choose and customize chess piece sets
 */
export const PieceSelector: React.FC<PieceSelectorProps> = ({
  pieceSets,
  selectedPieceSet,
  onPieceSetSelect,
  theme
}) => {
  const [previewPieceSet, setPreviewPieceSet] = useState<PieceSet | null>(null)

  // Get piece set display info
  const getPieceSetInfo = (pieceSet: PieceSet) => {
    const info = pieceSets.find(p => p.id === pieceSet)
    return info || { id: pieceSet, name: pieceSet, preview: '♚♛♜♝♞♟', description: 'Custom piece set' }
  }

  // Get piece set icon
  const getPieceSetIcon = (pieceSet: PieceSet) => {
    switch (pieceSet) {
      case 'classic-staunton': return <FaCrown size={16} />
      case 'modern-sleek': return <Zap size={16} />
      case 'medieval-fantasy': return <GiSwordsPower size={16} />
      case 'minimalist': return <Star size={16} />
      case 'ornate-royal': return <FaSparkles size={16} />
      case 'pixel-retro': return <Gamepad2 size={16} />
      case 'neon-glow': return <Zap size={16} />
      case 'crystal-clear': return <Star size={16} />
      case 'wooden-carved': return <Castle size={16} />
      case 'metal-luxury': return <FaCrown size={16} />
      default: return <FaCrown size={16} />
    }
  }

  // Handle piece set selection
  const handlePieceSetSelect = (pieceSet: PieceSet) => {
    onPieceSetSelect(pieceSet)
    setPreviewPieceSet(null)
  }

  // Handle preview
  const handlePreview = (pieceSet: PieceSet) => {
    setPreviewPieceSet(pieceSet)
    setTimeout(() => setPreviewPieceSet(null), 2000) // Auto-hide preview after 2s
  }

  const currentlyPreviewing = previewPieceSet || selectedPieceSet

  return (
    <Card className={`${theme.glassMorphism} border-white/10`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${theme.accent} bg-opacity-20`}>
              <FaCrown size={20} className={theme.text} />
            </div>
            <div>
              <CardTitle className={`text-lg font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent`}>
                Piece Sets
              </CardTitle>
              <p className={`text-sm ${theme.text} opacity-60`}>
                Choose your chess piece style
              </p>
            </div>
          </div>
          
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
            {pieceSets.length} Available
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Selection Display */}
        <div className={`p-4 rounded-lg border border-white/10 bg-gradient-to-r ${theme.primary} bg-opacity-10`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {getPieceSetIcon(currentlyPreviewing)}
              <div>
                <h4 className={`font-semibold ${theme.text}`}>
                  {getPieceSetInfo(currentlyPreviewing).name}
                  {previewPieceSet && (
                    <Badge variant="outline" className="ml-2 text-xs border-white/20 text-white/70">
                      Preview
                    </Badge>
                  )}
                </h4>
                <p className={`text-sm ${theme.text} opacity-70`}>
                  {getPieceSetInfo(currentlyPreviewing).description || 'Custom piece set'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Large Piece Preview */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 text-6xl">
              {getPieceSetInfo(currentlyPreviewing).preview.split('').map((piece, index) => (
                <span 
                  key={index}
                  className="drop-shadow-lg transition-all duration-200 hover:scale-110"
                  style={{
                    filter: previewPieceSet ? 'brightness(1.2) contrast(1.1)' : undefined,
                    textShadow: previewPieceSet ? '0 0 20px rgba(255, 255, 255, 0.5)' : undefined
                  }}
                >
                  {piece}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Piece Set Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pieceSets.map((pieceSetInfo) => (
            <PieceSetCard
              key={pieceSetInfo.id}
              pieceSetInfo={pieceSetInfo}
              isSelected={selectedPieceSet === pieceSetInfo.id}
              isPreview={previewPieceSet === pieceSetInfo.id}
              onSelect={handlePieceSetSelect}
              onPreview={handlePreview}
              theme={theme}
            />
          ))}
        </div>

        {/* Style Categories */}
        <div className="space-y-4">
          <h3 className={`font-semibold ${theme.text} flex items-center space-x-2`}>
            <FaSparkles size={16} />
            <span>Popular Styles</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className={`p-3 rounded-lg bg-black/20 border border-white/10`}>
              <div className="flex items-center space-x-2 mb-2">
                <FaCrown size={14} className={theme.text} />
                <span className={`font-medium ${theme.text}`}>Traditional</span>
              </div>
              <div className={`${theme.text} opacity-70 text-xs space-y-1`}>
                <div>• Classic Staunton</div>
                <div>• Tournament Standard</div>
                <div>• Wooden Carved</div>
              </div>
            </div>

            <div className={`p-3 rounded-lg bg-black/20 border border-white/10`}>
              <div className="flex items-center space-x-2 mb-2">
                <Zap size={14} className={theme.text} />
                <span className={`font-medium ${theme.text}`}>Modern</span>
              </div>
              <div className={`${theme.text} opacity-70 text-xs space-y-1`}>
                <div>• Modern Sleek</div>
                <div>• Minimalist</div>
                <div>• Crystal Clear</div>
              </div>
            </div>

            <div className={`p-3 rounded-lg bg-black/20 border border-white/10`}>
              <div className="flex items-center space-x-2 mb-2">
                <Gamepad2 size={14} className={theme.text} />
                <span className={`font-medium ${theme.text}`}>Gaming</span>
              </div>
              <div className={`${theme.text} opacity-70 text-xs space-y-1`}>
                <div>• Pixel Retro</div>
                <div>• Neon Glow</div>
                <div>• Medieval Fantasy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Customization Options */}
        <div className={`p-4 rounded-lg border border-white/10 bg-black/10`}>
          <h4 className={`font-semibold ${theme.text} mb-3 flex items-center space-x-2`}>
            <Star size={16} />
            <span>Piece Customization</span>
          </h4>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className={`${theme.text} opacity-80`}>Size Scaling:</span>
              <div className="flex space-x-2 mt-1">
                {['80%', '90%', '100%', '110%'].map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    size="sm"
                    className={`text-xs h-7 px-2 border-white/20 text-white hover:bg-white/10 ${
                      size === '100%' ? 'bg-white/10' : ''
                    }`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <span className={`${theme.text} opacity-80`}>Shadow Effect:</span>
              <div className="flex space-x-2 mt-1">
                {['None', 'Soft', 'Hard'].map((shadow) => (
                  <Button
                    key={shadow}
                    variant="outline"
                    size="sm"
                    className={`text-xs h-7 px-2 border-white/20 text-white hover:bg-white/10 ${
                      shadow === 'Soft' ? 'bg-white/10' : ''
                    }`}
                  >
                    {shadow}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Individual Piece Set Card Component
 */
interface PieceSetCardProps {
  pieceSetInfo: { id: PieceSet; name: string; preview: string; description?: string }
  isSelected: boolean
  isPreview: boolean
  onSelect: (pieceSet: PieceSet) => void
  onPreview: (pieceSet: PieceSet) => void
  theme: any
}

const PieceSetCard: React.FC<PieceSetCardProps> = ({ 
  pieceSetInfo, 
  isSelected, 
  isPreview,
  onSelect,
  onPreview,
  theme 
}) => {
  return (
    <div
      className={`
        relative p-4 rounded-lg border transition-all duration-200 group
        ${isSelected 
          ? `border-white/30 bg-gradient-to-br ${theme.primary} bg-opacity-20 shadow-lg` 
          : 'border-white/10 bg-black/20 hover:border-white/20 hover:bg-black/30'
        }
        ${isPreview ? 'ring-2 ring-white/30 bg-white/5' : ''}
      `}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className={`absolute top-2 right-2 p-1 rounded-full bg-gradient-to-br ${theme.accent}`}>
          <Check size={12} className="text-white" />
        </div>
      )}

      {/* Preview Indicator */}
      {isPreview && (
        <div className="absolute top-2 left-2 p-1 rounded-full bg-white/20 backdrop-blur-sm">
          <Eye size={12} className="text-white" />
        </div>
      )}

      {/* Piece Preview */}
      <div className="mb-3 text-center">
        <div className="text-3xl flex justify-center space-x-1">
          {pieceSetInfo.preview.split('').slice(0, 4).map((piece, index) => (
            <span 
              key={index}
              className="transition-transform duration-200 hover:scale-110 drop-shadow-sm"
            >
              {piece}
            </span>
          ))}
        </div>
      </div>

      {/* Piece Set Info */}
      <div className="space-y-2">
        <h4 className={`font-semibold ${theme.text} text-sm`}>
          {pieceSetInfo.name}
        </h4>
        
        <p className={`text-xs ${theme.text} opacity-60 line-clamp-2`}>
          {pieceSetInfo.description || 'No description available'}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(pieceSetInfo.id)}
            className="flex-1 h-7 text-xs border-white/20 text-white hover:bg-white/10"
          >
            <Eye size={12} className="mr-1" />
            Preview
          </Button>
          
          <Button
            onClick={() => onSelect(pieceSetInfo.id)}
            disabled={isSelected}
            className={`flex-1 h-7 text-xs ${
              isSelected 
                ? 'bg-white/20 text-white cursor-default'
                : `bg-gradient-to-r ${theme.primary} hover:opacity-90 text-white`
            }`}
          >
            {isSelected ? (
              <>
                <Check size={12} className="mr-1" />
                Selected
              </>
            ) : (
              'Select'
            )}
          </Button>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  )
}