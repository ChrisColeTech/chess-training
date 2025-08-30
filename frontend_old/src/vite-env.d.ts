/// <reference types="vite/client" />

// Electron API types
declare global {
  interface Window {
    electronAPI: {
      minimizeWindow: () => Promise<void>
      maximizeWindow: () => Promise<void>
      closeWindow: () => Promise<void>
      isWindowMaximized: () => Promise<boolean>
      onWindowMaximized: (callback: (isMaximized: boolean) => void) => void
      removeAllListeners: () => void
    }
  }
}
