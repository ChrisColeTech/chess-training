import React from 'react'
import { Minus, Square, X, Maximize2, Crown } from 'lucide-react'
import { useThemeStore } from '../../stores/themeStore'
import { useTitleBar } from '../../hooks/layout/useTitleBar'
import { cn } from '../../lib/utils'

export const TitleBar: React.FC = () => {
  const { getCurrentTheme } = useThemeStore()
  const theme = getCurrentTheme()
  const { isMaximized, isElectron, isReady, minimize, maximize, close } = useTitleBar()

  // Don't render title bar if not in Electron or not ready
  if (!isElectron || !isReady) {
    return null
  }

  return (
    <div className={cn(
      "h-8 backdrop-blur-sm border-b border-white/10 flex items-center justify-between select-none relative z-30",
      "bg-gradient-to-r", theme.primary,
      "transition-all duration-200"
    )}>
      {/* Drag Region - Left side */}
      <div 
        className="flex-1 h-full flex items-center px-4 drag-region cursor-move group"
        style={{ WebkitAppRegion: 'drag' } as any}
      >
        <div className="flex items-center space-x-2">
          <div className={cn(
            "w-4 h-4 rounded-full flex items-center justify-center transition-all duration-200",
            "bg-gradient-to-br", theme.accent,
            "group-hover:scale-110"
          )}>
            <Crown size={10} className="text-white" />
          </div>
          <span className="text-sm font-medium text-white drop-shadow-sm">
            Chess Training
          </span>
        </div>
      </div>

      {/* Window Controls */}
      <div 
        className="flex items-center h-full"
        style={{ WebkitAppRegion: 'no-drag' } as any}
      >
        {/* Minimize Button */}
        <button
          onClick={minimize}
          className={cn(
            "h-full w-10 flex items-center justify-center transition-all duration-150 group",
            "hover:bg-white/10 active:bg-white/5"
          )}
          aria-label="Minimize window"
          title="Minimize"
        >
          <Minus size={12} className="text-gray-300 group-hover:text-white transition-colors duration-150" />
        </button>

        {/* Maximize/Restore Button */}
        <button
          onClick={maximize}
          className={cn(
            "h-full w-10 flex items-center justify-center transition-all duration-150 group",
            "hover:bg-white/10 active:bg-white/5"
          )}
          aria-label={isMaximized ? "Restore window" : "Maximize window"}
          title={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? (
            <Square size={10} className="text-gray-300 group-hover:text-white transition-colors duration-150" />
          ) : (
            <Maximize2 size={10} className="text-gray-300 group-hover:text-white transition-colors duration-150" />
          )}
        </button>

        {/* Close Button */}
        <button
          onClick={close}
          className={cn(
            "h-full w-10 flex items-center justify-center transition-all duration-150 group",
            "hover:bg-red-500/90 active:bg-red-600"
          )}
          aria-label="Close window"
          title="Close"
        >
          <X size={12} className="text-gray-300 group-hover:text-white transition-colors duration-150" />
        </button>
      </div>
    </div>
  )
}