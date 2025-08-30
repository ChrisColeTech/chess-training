export interface ElectronAPI {
  minimizeWindow: () => void
  maximizeWindow: () => void
  closeWindow: () => void
  isWindowMaximized: () => boolean
  onWindowMaximized: (callback: (maximized: boolean) => void) => void
  removeAllListeners: () => void
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}

export {}