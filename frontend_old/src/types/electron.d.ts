// Electron API type declarations
export interface ElectronAPI {
  minimize(): void;
  maximize(): void;
  unmaximize(): void;
  close(): void;
  isMaximized(): boolean;
  onMaximized(callback: (maximized: boolean) => void): void;
  removeMaximizedListener(): void;
  isWindowMaximized(): boolean;
  onWindowMaximized(callback: (maximized: boolean) => void): void;
  removeAllListeners(): void;
  minimizeWindow(): void;
  maximizeWindow(): void;
  closeWindow(): void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};