import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'
import { cn } from '../../lib/utils'
import { useThemeStore } from '../../stores/themeStore'
import { HelpCircle, Info, AlertCircle, CheckCircle } from 'lucide-react'

interface ChessTooltipProps {
  content: string
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  className?: string
  delayDuration?: number
  variant?: 'default' | 'help' | 'info' | 'warning' | 'success'
}

interface PieceTooltipProps extends Omit<ChessTooltipProps, 'variant'> {
  pieceType: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
  square?: string
  value?: number
  showValue?: boolean
}

interface MoveTooltipProps extends Omit<ChessTooltipProps, 'content'> {
  move: string
  evaluation?: number
  annotation?: string
  isBlunder?: boolean
  isBest?: boolean
}

interface FeatureTooltipProps extends Omit<ChessTooltipProps, 'variant'> {
  feature: 'premium' | 'disabled' | 'coming-soon' | 'beta'
}

export const ChessTooltip: React.FC<ChessTooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  className,
  delayDuration = 300,
  variant = 'default'
}) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  const getVariantIcon = () => {
    switch (variant) {
      case 'help':
        return <HelpCircle size={14} className="text-blue-400" />
      case 'info':
        return <Info size={14} className="text-blue-400" />
      case 'warning':
        return <AlertCircle size={14} className="text-yellow-400" />
      case 'success':
        return <CheckCircle size={14} className="text-green-400" />
      default:
        return null
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'help':
        return 'border-blue-500/30 bg-blue-900/80'
      case 'info':
        return 'border-blue-500/30 bg-blue-900/80'
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-900/80'
      case 'success':
        return 'border-green-500/30 bg-green-900/80'
      default:
        return 'border-white/20'
    }
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className={cn(
            'max-w-xs p-3 text-sm font-medium text-white backdrop-blur-sm',
            `bg-gradient-to-br ${theme.glassMorphism}`,
            'shadow-lg shadow-black/50',
            getVariantStyles(),
            className
          )}
        >
          <div className="flex items-start gap-2">
            {getVariantIcon()}
            <span className="leading-relaxed">{content}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const PieceTooltip: React.FC<PieceTooltipProps> = ({
  pieceType,
  square,
  value,
  showValue = true,
  children,
  side,
  align,
  className,
  delayDuration
}) => {
  const getPieceDescription = () => {
    const descriptions = {
      king: 'The King - Most important piece, must be protected',
      queen: 'The Queen - Most powerful piece, worth 9 points',
      rook: 'The Rook - Moves in straight lines, worth 5 points',
      bishop: 'The Bishop - Moves diagonally, worth 3 points',
      knight: 'The Knight - Jumps in L-shape, worth 3 points',
      pawn: 'The Pawn - Can promote when reaching end, worth 1 point'
    }
    
    let description = descriptions[pieceType]
    if (square) {
      description += ` on ${square.toUpperCase()}`
    }
    if (showValue && value) {
      description += ` (${value} pts)`
    }
    
    return description
  }

  return (
    <ChessTooltip
      content={getPieceDescription()}
      variant="info"
      side={side}
      align={align}
      className={className}
      delayDuration={delayDuration}
    >
      {children}
    </ChessTooltip>
  )
}

export const MoveTooltip: React.FC<MoveTooltipProps> = ({
  move,
  evaluation,
  annotation,
  isBlunder = false,
  isBest = false,
  children,
  side,
  align,
  className,
  delayDuration
}) => {
  const getMoveDescription = () => {
    let description = `Move: ${move}`
    
    if (evaluation !== undefined) {
      description += `\nEvaluation: ${evaluation > 0 ? '+' : ''}${evaluation}`
    }
    
    if (isBest) {
      description += '\nBest move!'
    } else if (isBlunder) {
      description += '\nBlunder! This loses material or position'
    }
    
    if (annotation) {
      description += `\n${annotation}`
    }
    
    return description
  }

  const getVariant = () => {
    if (isBest) return 'success'
    if (isBlunder) return 'warning'
    return 'info'
  }

  return (
    <ChessTooltip
      content={getMoveDescription()}
      variant={getVariant()}
      side={side}
      align={align}
      className={className}
      delayDuration={delayDuration}
    >
      {children}
    </ChessTooltip>
  )
}

export const FeatureTooltip: React.FC<FeatureTooltipProps> = ({
  feature,
  children,
  side,
  align,
  className,
  delayDuration
}) => {
  const getFeatureDescription = () => {
    switch (feature) {
      case 'premium':
        return 'This feature requires a premium subscription to access'
      case 'disabled':
        return 'This feature is currently disabled'
      case 'coming-soon':
        return 'This feature is coming soon! Stay tuned for updates'
      case 'beta':
        return 'This feature is in beta. Please report any issues'
      default:
        return 'Feature information'
    }
  }

  const getVariant = () => {
    switch (feature) {
      case 'premium':
        return 'warning'
      case 'disabled':
        return 'warning'
      case 'coming-soon':
        return 'info'
      case 'beta':
        return 'help'
      default:
        return 'default'
    }
  }

  return (
    <ChessTooltip
      content={getFeatureDescription()}
      variant={getVariant()}
      side={side}
      align={align}
      className={className}
      delayDuration={delayDuration}
    >
      {children}
    </ChessTooltip>
  )
}

// Convenience components for common use cases
export const HelpTooltip: React.FC<Omit<ChessTooltipProps, 'variant'>> = (props) => (
  <ChessTooltip variant="help" {...props} />
)

export const InfoTooltip: React.FC<Omit<ChessTooltipProps, 'variant'>> = (props) => (
  <ChessTooltip variant="info" {...props} />
)

export const WarningTooltip: React.FC<Omit<ChessTooltipProps, 'variant'>> = (props) => (
  <ChessTooltip variant="warning" {...props} />
)

export const SuccessTooltip: React.FC<Omit<ChessTooltipProps, 'variant'>> = (props) => (
  <ChessTooltip variant="success" {...props} />
)