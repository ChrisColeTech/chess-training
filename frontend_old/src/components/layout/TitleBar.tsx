import { useState, useEffect } from 'react'
import { Minus, Square, X, Maximize2 } from 'lucide-react'

export const TitleBar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false)
  const [isElectron, setIsElectron] = useState(false)

  useEffect(() => {
    // Check if running in Electron
    const checkElectron = window.electronAPI !== undefined
    setIsElectron(checkElectron)

    if (checkElectron && window.electronAPI?.isWindowMaximized) {
      // Get initial maximize state
      const maximized = window.electronAPI.isWindowMaximized()
      setIsMaximized(maximized)

      // Listen for maximize state changes
      if (window.electronAPI?.onWindowMaximized) {
        window.electronAPI.onWindowMaximized((maximized: boolean) => {
          setIsMaximized(maximized)
        })
      }

      // Cleanup
      return () => {
        if (window.electronAPI?.removeAllListeners) {
          window.electronAPI.removeAllListeners()
        }
      }
    }
  }, [])

  const handleMinimize = () => {
    if (isElectron && window.electronAPI?.minimizeWindow) {
      window.electronAPI.minimizeWindow()
    }
  }

  const handleMaximize = () => {
    if (isElectron && window.electronAPI?.maximizeWindow) {
      window.electronAPI.maximizeWindow()
    }
  }

  const handleClose = () => {
    if (isElectron && window.electronAPI?.closeWindow) {
      window.electronAPI.closeWindow()
    }
  }

  // Don't render title bar if not in Electron
  if (!isElectron) {
    return null
  }

  return (
    <div className="h-8 bg-gray-900/95 backdrop-blur-sm border-b border-white/10 flex items-center justify-between select-none">
      {/* Drag Region - Left side */}
      <div 
        className="flex-1 h-full flex items-center px-4 drag-region cursor-move"
        style={{ WebkitAppRegion: 'drag' } as any}
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"></div>
          <span className="text-sm font-medium text-white">Chess Training</span>
        </div>
      </div>

      {/* Window Controls */}
      <div 
        className="flex items-center h-full"
        style={{ WebkitAppRegion: 'no-drag' } as any}
      >
        {/* Minimize Button */}
        <button
          onClick={handleMinimize}
          className="h-full w-12 flex items-center justify-center hover:bg-white/10 transition-colors group"
          aria-label="Minimize"
        >
          <Minus size={14} className="text-gray-300 group-hover:text-white" />
        </button>

        {/* Maximize/Restore Button */}
        <button
          onClick={handleMaximize}
          className="h-full w-12 flex items-center justify-center hover:bg-white/10 transition-colors group"
          aria-label={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? (
            <Square size={12} className="text-gray-300 group-hover:text-white" />
          ) : (
            <Maximize2 size={12} className="text-gray-300 group-hover:text-white" />
          )}
        </button>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="h-full w-12 flex items-center justify-center hover:bg-red-500 transition-colors group"
          aria-label="Close"
        >
          <X size={14} className="text-gray-300 group-hover:text-white" />
        </button>
      </div>
    </div>
  )
}