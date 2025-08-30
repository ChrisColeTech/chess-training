import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter
} from './sheet'
import { cn } from '../../lib/utils'
import { useThemeStore } from '../../stores/themeStore'
import { X, Menu } from 'lucide-react'
import { Button } from './button'

interface ChessSheetProps {
  children: React.ReactNode
  trigger?: React.ReactNode
  title?: string
  description?: string
  side?: 'left' | 'right' | 'top' | 'bottom'
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  showClose?: boolean
  footer?: React.ReactNode
}

interface MobileNavigationSheetProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface GameAnalysisSheetProps {
  gameData: any // TODO: Define proper game data type
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface PuzzleHintSheetProps {
  puzzleId: string
  hint?: string
  solution?: string
  showSolution?: boolean
  onRequestHint?: () => void
  onRequestSolution?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const ChessSheet: React.FC<ChessSheetProps> = ({
  children,
  trigger,
  title,
  description,
  side = 'right',
  className,
  open,
  onOpenChange,
  showClose = true,
  footer
}) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent 
        side={side}
        className={cn(
          'backdrop-blur-sm border-l border-white/20 w-full sm:w-96',
          `bg-gradient-to-br ${theme.glassMorphism}`,
          'shadow-xl shadow-black/50',
          className
        )}
      >
        {(title || description) && (
          <SheetHeader className="space-y-2">
            {title && (
              <SheetTitle className="text-xl font-bold text-white flex items-center justify-between">
                {title}
                {showClose && (
                  <SheetClose asChild>
                    <Button variant="ghost" size="sm" className="text-white/70 hover:text-white p-2">
                      <X size={18} />
                    </Button>
                  </SheetClose>
                )}
              </SheetTitle>
            )}
            {description && (
              <SheetDescription className="text-white/70">
                {description}
              </SheetDescription>
            )}
          </SheetHeader>
        )}

        <div className="flex-1 py-6 overflow-y-auto">
          {children}
        </div>

        {footer && (
          <SheetFooter className="border-t border-white/20 pt-4">
            {footer}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

export const MobileNavigationSheet: React.FC<MobileNavigationSheetProps> = ({
  children,
  open,
  onOpenChange
}) => {
  return (
    <ChessSheet
      trigger={
        <Button variant="ghost" size="sm" className="text-white/70 hover:text-white lg:hidden">
          <Menu size={20} />
        </Button>
      }
      title="Navigation"
      side="left"
      open={open}
      onOpenChange={onOpenChange}
      className="w-80"
    >
      {children}
    </ChessSheet>
  )
}

export const GameAnalysisSheet: React.FC<GameAnalysisSheetProps> = ({
  gameData,
  open,
  onOpenChange
}) => {
  return (
    <ChessSheet
      title="Game Analysis"
      description="Detailed analysis of your game"
      side="right"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="space-y-4">
        {/* Game info */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">Game Information</h3>
          <div className="text-white/80 space-y-1 text-sm">
            <p>White: {gameData?.white || 'Player'}</p>
            <p>Black: {gameData?.black || 'Opponent'}</p>
            <p>Result: {gameData?.result || '1-0'}</p>
            <p>Opening: {gameData?.opening || 'Unknown'}</p>
          </div>
        </div>

        {/* Move analysis */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">Move Analysis</h3>
          <div className="text-white/80 text-sm">
            <p>Accuracy: {gameData?.accuracy || '85%'}</p>
            <p>Blunders: {gameData?.blunders || 2}</p>
            <p>Mistakes: {gameData?.mistakes || 3}</p>
            <p>Inaccuracies: {gameData?.inaccuracies || 5}</p>
          </div>
        </div>

        {/* Engine evaluation */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">Engine Evaluation</h3>
          <div className="text-white/80 text-sm">
            <p>Final position: {gameData?.finalEval || '+2.3'}</p>
            <p>Engine: Stockfish 16</p>
          </div>
        </div>
      </div>
    </ChessSheet>
  )
}

export const PuzzleHintSheet: React.FC<PuzzleHintSheetProps> = ({
  puzzleId,
  hint,
  solution,
  showSolution = false,
  onRequestHint,
  onRequestSolution,
  open,
  onOpenChange
}) => {
  return (
    <ChessSheet
      title="Puzzle Help"
      description={`Puzzle ${puzzleId}`}
      side="right"
      open={open}
      onOpenChange={onOpenChange}
      footer={
        <div className="flex gap-2 w-full">
          <Button 
            variant="outline" 
            onClick={onRequestHint}
            disabled={!hint}
            className="flex-1"
          >
            Show Hint
          </Button>
          <Button 
            variant="outline" 
            onClick={onRequestSolution}
            disabled={!solution}
            className="flex-1"
          >
            Show Solution
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {hint && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Hint</h3>
            <div className="text-white/80 text-sm p-3 rounded-lg bg-blue-900/20 border border-blue-500/20">
              {hint}
            </div>
          </div>
        )}

        {showSolution && solution && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Solution</h3>
            <div className="text-white/80 text-sm p-3 rounded-lg bg-green-900/20 border border-green-500/20">
              {solution}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">Tips</h3>
          <ul className="text-white/70 text-sm space-y-1 list-disc list-inside">
            <li>Look for tactical patterns (pins, forks, skewers)</li>
            <li>Consider all candidate moves</li>
            <li>Calculate variations to the end</li>
            <li>Check for defensive resources</li>
          </ul>
        </div>
      </div>
    </ChessSheet>
  )
}