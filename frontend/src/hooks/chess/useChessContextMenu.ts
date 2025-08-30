import { useState, useCallback } from 'react'
import type { ContextMenuItem } from '@/constants/contextMenu'
import {
  getContextMenuForPiece,
  getContextMenuForContext
} from '@/constants/contextMenu'
import { useToast } from '@/hooks/use-toast'

export interface ChessContextMenuState {
  contextType: 'board' | 'piece' | 'game' | 'puzzle' | null
  pieceType?: string
  position?: { x: number; y: number }
  selectedSquare?: string
}

export interface UseChessContextMenuReturn {
  contextState: ChessContextMenuState
  menuItems: ContextMenuItem[]
  handleContextMenu: (
    event: React.MouseEvent,
    type: 'board' | 'piece' | 'game' | 'puzzle',
    pieceType?: string,
    square?: string
  ) => void
  handleMenuItemClick: (itemId: string) => void
  closeContextMenu: () => void
  isMenuOpen: boolean
}

export const useChessContextMenu = (): UseChessContextMenuReturn => {
  const { toast } = useToast()
  const [contextState, setContextState] = useState<ChessContextMenuState>({
    contextType: null
  })

  const isMenuOpen = contextState.contextType !== null

  const getMenuItems = useCallback((state: ChessContextMenuState): ContextMenuItem[] => {
    if (state.contextType === 'piece' && state.pieceType) {
      return getContextMenuForPiece(state.pieceType)
    }
    if (state.contextType && state.contextType !== 'piece') {
      return getContextMenuForContext(state.contextType)
    }
    return []
  }, [])

  const menuItems = getMenuItems(contextState)

  const handleContextMenu = useCallback((
    event: React.MouseEvent,
    type: 'board' | 'piece' | 'game' | 'puzzle',
    pieceType?: string,
    square?: string
  ) => {
    event.preventDefault()
    
    const rect = event.currentTarget.getBoundingClientRect()
    const position = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }

    setContextState({
      contextType: type,
      pieceType,
      position,
      selectedSquare: square
    })
  }, [])

  const handleMenuItemClick = useCallback((itemId: string) => {
    const { pieceType, selectedSquare } = contextState

    // Handle different menu actions
    switch (itemId) {
      // Board actions
      case 'analyze-position':
        toast({
          title: 'Position Analysis',
          description: 'Opening analysis board for current position...'
        })
        break

      case 'copy-fen':
        // In a real app, this would copy the actual FEN
        navigator.clipboard.writeText('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
        toast({
          title: 'FEN Copied',
          description: 'Position FEN copied to clipboard'
        })
        break

      case 'flip-board':
        toast({
          title: 'Board Flipped',
          description: 'Board orientation changed'
        })
        break

      case 'board-settings':
        toast({
          title: 'Board Settings',
          description: 'Opening board settings panel...'
        })
        break

      // Piece actions
      case 'show-moves':
        toast({
          title: 'Legal Moves',
          description: `Showing legal moves for ${pieceType} on ${selectedSquare}`
        })
        break

      case 'castle-kingside':
        toast({
          title: 'Castling',
          description: 'Attempting kingside castle...'
        })
        break

      case 'castle-queenside':
        toast({
          title: 'Castling',
          description: 'Attempting queenside castle...'
        })
        break

      case 'show-attacks':
        toast({
          title: 'Attack Squares',
          description: `Highlighting squares attacked by ${pieceType}`
        })
        break

      case 'show-file-rank':
        toast({
          title: 'File & Rank',
          description: 'Highlighting file and rank for rook'
        })
        break

      case 'show-diagonals':
        toast({
          title: 'Diagonals',
          description: 'Highlighting diagonals for bishop'
        })
        break

      // Promotion actions
      case 'promote-queen':
      case 'promote-rook':
      case 'promote-bishop':
      case 'promote-knight':
        const promotionPiece = itemId.replace('promote-', '')
        toast({
          title: 'Pawn Promotion',
          description: `Promoting pawn to ${promotionPiece}`
        })
        break

      // Game actions
      case 'copy-game':
        toast({
          title: 'Game Copied',
          description: 'Game PGN copied to clipboard'
        })
        break

      case 'share-game':
        toast({
          title: 'Share Game',
          description: 'Opening share options...'
        })
        break

      case 'download-pgn':
        toast({
          title: 'Download PGN',
          description: 'Downloading game as PGN file...'
        })
        break

      case 'edit-game':
        toast({
          title: 'Edit Game',
          description: 'Opening game editor...'
        })
        break

      case 'delete-game':
        toast({
          title: 'Delete Game',
          description: 'Game deleted successfully',
          variant: 'destructive'
        })
        break

      // Puzzle actions
      case 'hint':
        toast({
          title: 'Puzzle Hint',
          description: 'Here\'s a hint for this puzzle...'
        })
        break

      case 'solution':
        toast({
          title: 'Puzzle Solution',
          description: 'Showing complete solution...'
        })
        break

      case 'reset-puzzle':
        toast({
          title: 'Puzzle Reset',
          description: 'Puzzle reset to starting position'
        })
        break

      case 'next-puzzle':
        toast({
          title: 'Next Puzzle',
          description: 'Loading next puzzle...'
        })
        break

      default:
        console.warn(`Unhandled context menu action: ${itemId}`)
    }

    // Close context menu after action
    closeContextMenu()
  }, [contextState, toast])

  const closeContextMenu = useCallback(() => {
    setContextState({ contextType: null })
  }, [])

  return {
    contextState,
    menuItems,
    handleContextMenu,
    handleMenuItemClick,
    closeContextMenu,
    isMenuOpen
  }
}