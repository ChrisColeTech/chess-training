import React from 'react'
import { cn } from '../../lib/utils'
import { useCollapsiblePlayerCards } from '../../hooks/chess/useCollapsiblePlayerCards'

interface ResponsiveGameLayoutProps {
  chessBoard: React.ReactNode
  playerInfo: React.ReactNode
  gameControls?: React.ReactNode
  moveHints?: React.ReactNode
  sidePreference?: 'left' | 'right'
  className?: string
}

/**
 * ResponsiveGameLayout - SRP Layout Component
 * Single Responsibility: Responsive layout with collapsible player cards
 */
export const ResponsiveGameLayout: React.FC<ResponsiveGameLayoutProps> = ({
  chessBoard,
  playerInfo,
  gameControls,
  moveHints,
  sidePreference = 'right',
  className
}) => {
  const { isCollapsed, toggle } = useCollapsiblePlayerCards({
    defaultCollapsed: false,
    autoCollapseOnMobile: true,
    persistState: true,
    storageKey: 'chess-responsive-layout-collapsed'
  })

  return (
    <div className={cn('responsive-game-layout', className)}>
      {/* Main game area */}
      <div className="game-container">
        <div className="game-content">
          {/* Chess board section */}
          <div className="board-section">
            <div className="board-wrapper">
              {chessBoard}
            </div>
            
            {/* Move hints below board */}
            {moveHints && (
              <div className="hints-section">
                {moveHints}
              </div>
            )}
          </div>

          {/* Player info sidebar */}
          <div className={cn(
            'player-sidebar',
            sidePreference === 'left' ? 'sidebar-left' : 'sidebar-right',
            isCollapsed && 'collapsed'
          )}>
            {/* Collapse toggle button */}
            <button
              className="collapse-toggle"
              onClick={toggle}
              aria-label={isCollapsed ? 'Expand player cards' : 'Collapse player cards'}
            >
              {isCollapsed ? '◀' : '▶'}
            </button>

            {/* Player info content */}
            <div className="sidebar-content">
              {playerInfo}
            </div>
          </div>
        </div>

        {/* Game controls */}
        {gameControls && (
          <div className="controls-section">
            {gameControls}
          </div>
        )}
      </div>

      <style>{`
        .responsive-game-layout {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .game-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .game-content {
          flex: 1;
          display: flex;
          gap: 1rem;
          padding: 1rem;
          min-height: 0;
        }

        .board-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 0;
        }

        .board-wrapper {
          flex-shrink: 0;
          max-width: 100%;
        }

        .hints-section {
          width: 100%;
          max-width: 600px;
          margin-top: 1rem;
        }

        .player-sidebar {
          position: relative;
          width: 300px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .player-sidebar.collapsed {
          width: 40px;
        }

        .collapse-toggle {
          position: absolute;
          top: 50%;
          right: -20px;
          transform: translateY(-50%);
          width: 40px;
          height: 60px;
          background: rgba(59, 130, 246, 0.9);
          border: none;
          border-radius: 0 8px 8px 0;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          z-index: 10;
          transition: all 0.2s ease;
        }

        .collapse-toggle:hover {
          background: rgba(59, 130, 246, 1);
          transform: translateY(-50%) scale(1.05);
        }

        .sidebar-left .collapse-toggle {
          right: auto;
          left: -20px;
          border-radius: 8px 0 0 8px;
        }

        .sidebar-content {
          padding: 1rem;
          height: 100%;
          transition: opacity 0.3s ease;
        }

        .collapsed .sidebar-content {
          opacity: 0;
          pointer-events: none;
        }

        .controls-section {
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(0, 0, 0, 0.2);
        }

        /* Mobile layout */
        @media (max-width: 768px) {
          .game-content {
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.5rem;
          }

          .board-section {
            order: 2;
          }

          .player-sidebar {
            order: 1;
            width: 100%;
            height: auto;
            min-height: 60px;
          }

          .player-sidebar.collapsed {
            width: 100%;
            height: 40px;
          }

          .collapse-toggle {
            top: auto;
            bottom: -20px;
            right: 50%;
            transform: translateX(50%);
            width: 60px;
            height: 40px;
            border-radius: 0 0 8px 8px;
          }

          .collapse-toggle:hover {
            transform: translateX(50%) scale(1.05);
          }

          .sidebar-left .collapse-toggle {
            left: auto;
            right: 50%;
            border-radius: 0 0 8px 8px;
          }

          .hints-section {
            order: 3;
            margin-top: 0.5rem;
          }
        }

        /* Tablet layout */
        @media (min-width: 769px) and (max-width: 1024px) {
          .game-content {
            gap: 0.75rem;
          }

          .player-sidebar {
            width: 250px;
          }

          .player-sidebar.collapsed {
            width: 35px;
          }
        }
      `}</style>
    </div>
  )
}

export default ResponsiveGameLayout