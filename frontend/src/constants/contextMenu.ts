import { Copy, Edit, Trash, RotateCcw, Eye, Share, Download, Settings } from 'lucide-react'
import { FaChessKing, FaChessQueen, FaChessRook, FaChessBishop, FaChessKnight, FaChessPawn } from 'react-icons/fa'
import type { LucideIcon } from 'lucide-react'

export interface ContextMenuItem {
  id: string
  label: string
  icon: LucideIcon | React.ComponentType<any>
  shortcut?: string
  disabled?: boolean
  separator?: boolean
  danger?: boolean
}

export interface ChessPieceAction extends ContextMenuItem {
  pieceType: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
  action: 'move' | 'capture' | 'castle' | 'promote' | 'en-passant'
}

export const BOARD_CONTEXT_MENU: ContextMenuItem[] = [
  {
    id: 'analyze-position',
    label: 'Analyze Position',
    icon: Eye,
    shortcut: 'Ctrl+A'
  },
  {
    id: 'copy-fen',
    label: 'Copy FEN',
    icon: Copy,
    shortcut: 'Ctrl+C'
  },
  {
    id: 'separator-1',
    label: '',
    icon: Copy, // Not used for separator
    separator: true
  },
  {
    id: 'flip-board',
    label: 'Flip Board',
    icon: RotateCcw,
    shortcut: 'F'
  },
  {
    id: 'board-settings',
    label: 'Board Settings',
    icon: Settings
  }
]

export const PIECE_CONTEXT_MENU: Record<string, ContextMenuItem[]> = {
  king: [
    {
      id: 'show-moves',
      label: 'Show Legal Moves',
      icon: FaChessKing,
      shortcut: 'Space'
    },
    {
      id: 'castle-kingside',
      label: 'Castle Kingside',
      icon: FaChessRook,
      shortcut: 'O-O'
    },
    {
      id: 'castle-queenside',
      label: 'Castle Queenside',
      icon: FaChessQueen,
      shortcut: 'O-O-O'
    }
  ],
  queen: [
    {
      id: 'show-moves',
      label: 'Show Legal Moves',
      icon: FaChessQueen,
      shortcut: 'Space'
    },
    {
      id: 'show-attacks',
      label: 'Show Attacked Squares',
      icon: Eye
    }
  ],
  rook: [
    {
      id: 'show-moves',
      label: 'Show Legal Moves',
      icon: FaChessRook,
      shortcut: 'Space'
    },
    {
      id: 'show-file-rank',
      label: 'Highlight File & Rank',
      icon: Eye
    }
  ],
  bishop: [
    {
      id: 'show-moves',
      label: 'Show Legal Moves',
      icon: FaChessBishop,
      shortcut: 'Space'
    },
    {
      id: 'show-diagonals',
      label: 'Highlight Diagonals',
      icon: Eye
    }
  ],
  knight: [
    {
      id: 'show-moves',
      label: 'Show Legal Moves',
      icon: FaChessKnight,
      shortcut: 'Space'
    }
  ],
  pawn: [
    {
      id: 'show-moves',
      label: 'Show Legal Moves',
      icon: FaChessPawn,
      shortcut: 'Space'
    },
    {
      id: 'promote-queen',
      label: 'Promote to Queen',
      icon: FaChessQueen
    },
    {
      id: 'promote-rook',
      label: 'Promote to Rook',
      icon: FaChessRook
    },
    {
      id: 'promote-bishop',
      label: 'Promote to Bishop',
      icon: FaChessBishop
    },
    {
      id: 'promote-knight',
      label: 'Promote to Knight',
      icon: FaChessKnight
    }
  ]
}

export const GAME_CONTEXT_MENU: ContextMenuItem[] = [
  {
    id: 'copy-game',
    label: 'Copy Game',
    icon: Copy,
    shortcut: 'Ctrl+C'
  },
  {
    id: 'share-game',
    label: 'Share Game',
    icon: Share
  },
  {
    id: 'download-pgn',
    label: 'Download PGN',
    icon: Download,
    shortcut: 'Ctrl+S'
  },
  {
    id: 'separator-1',
    label: '',
    icon: Copy,
    separator: true
  },
  {
    id: 'edit-game',
    label: 'Edit Game',
    icon: Edit
  },
  {
    id: 'delete-game',
    label: 'Delete Game',
    icon: Trash,
    danger: true
  }
]

export const PUZZLE_CONTEXT_MENU: ContextMenuItem[] = [
  {
    id: 'hint',
    label: 'Show Hint',
    icon: Eye,
    shortcut: 'H'
  },
  {
    id: 'solution',
    label: 'Show Solution',
    icon: Eye,
    shortcut: 'S'
  },
  {
    id: 'separator-1',
    label: '',
    icon: Copy,
    separator: true
  },
  {
    id: 'reset-puzzle',
    label: 'Reset Puzzle',
    icon: RotateCcw,
    shortcut: 'R'
  },
  {
    id: 'next-puzzle',
    label: 'Next Puzzle',
    icon: Share,
    shortcut: 'N'
  }
]

export const getContextMenuForPiece = (pieceType: string): ContextMenuItem[] => {
  return PIECE_CONTEXT_MENU[pieceType] || []
}

export const getContextMenuForContext = (context: 'board' | 'game' | 'puzzle'): ContextMenuItem[] => {
  switch (context) {
    case 'board':
      return BOARD_CONTEXT_MENU
    case 'game':
      return GAME_CONTEXT_MENU
    case 'puzzle':
      return PUZZLE_CONTEXT_MENU
    default:
      return BOARD_CONTEXT_MENU
  }
}