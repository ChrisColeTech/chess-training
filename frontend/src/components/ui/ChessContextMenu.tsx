import React from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from './context-menu'
import { cn } from '@/lib/utils'
import { useThemeStore } from '@/stores/themeStore'
import type { ContextMenuItem as ChessContextMenuItem } from '@/constants/contextMenu'
import { getContextMenuForPiece, getContextMenuForContext } from '@/constants/contextMenu'

interface ChessContextMenuProps {
  items: ChessContextMenuItem[]
  children: React.ReactNode
  onItemSelect?: (itemId: string) => void
  className?: string
}

interface PieceContextMenuProps extends Omit<ChessContextMenuProps, 'items'> {
  pieceType: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
  items?: ChessContextMenuItem[] // Optional override
}

interface GameContextMenuProps extends Omit<ChessContextMenuProps, 'items'> {
  context: 'board' | 'game' | 'puzzle'
  items?: ChessContextMenuItem[] // Optional override
}

export const ChessContextMenu: React.FC<ChessContextMenuProps> = ({
  items,
  children,
  onItemSelect,
  className
}) => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()

  const handleSelect = (itemId: string) => {
    if (onItemSelect) {
      onItemSelect(itemId)
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger className={cn('cursor-pointer', className)}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent 
        className={cn(
          'min-w-48 backdrop-blur-sm border border-white/20',
          `bg-gradient-to-br ${theme.glassMorphism}`,
          'shadow-lg shadow-black/50'
        )}
      >
        {items.map((item, index) => {
          if (item.separator) {
            return <ContextMenuSeparator key={`separator-${index}`} className="bg-white/20" />
          }

          const IconComponent = item.icon

          return (
            <ContextMenuItem
              key={item.id}
              onClick={() => handleSelect(item.id)}
              disabled={item.disabled}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm text-white/90',
                'hover:bg-white/10 focus:bg-white/10 transition-colors',
                item.danger && 'text-red-400 hover:text-red-300 hover:bg-red-900/20',
                item.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <IconComponent size={16} className="text-current" />
              <span className="flex-1">{item.label}</span>
              {item.shortcut && (
                <ContextMenuShortcut className="text-white/60 text-xs">
                  {item.shortcut}
                </ContextMenuShortcut>
              )}
            </ContextMenuItem>
          )
        })}
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const PieceContextMenu: React.FC<PieceContextMenuProps> = ({
  pieceType,
  items,
  children,
  onItemSelect,
  className
}) => {
  const defaultItems = items || getContextMenuForPiece(pieceType)

  return (
    <ChessContextMenu
      items={defaultItems}
      onItemSelect={onItemSelect}
      className={className}
    >
      {children}
    </ChessContextMenu>
  )
}

export const GameContextMenu: React.FC<GameContextMenuProps> = ({
  context,
  items,
  children,
  onItemSelect,
  className
}) => {
  const defaultItems = items || getContextMenuForContext(context)

  return (
    <ChessContextMenu
      items={defaultItems}
      onItemSelect={onItemSelect}
      className={className}
    >
      {children}
    </ChessContextMenu>
  )
}

// Convenience wrapper for board context menu
export const BoardContextMenu: React.FC<Omit<GameContextMenuProps, 'context'>> = (props) => (
  <GameContextMenu context="board" {...props} />
)

// Convenience wrapper for puzzle context menu  
export const PuzzleContextMenu: React.FC<Omit<GameContextMenuProps, 'context'>> = (props) => (
  <GameContextMenu context="puzzle" {...props} />
)