import { contextBridge, ipcRenderer } from 'electron';

// Define the API that will be available to the renderer process
const electronAPI = {
  // Auth storage methods
  auth: {
    setTokens: (accessToken: string, refreshToken: string) => 
      ipcRenderer.invoke('auth:set-tokens', accessToken, refreshToken),
    
    getTokens: () => 
      ipcRenderer.invoke('auth:get-tokens'),
    
    clearTokens: () => 
      ipcRenderer.invoke('auth:clear-tokens'),
    
    hasTokens: () => 
      ipcRenderer.invoke('auth:has-tokens')
  },
  
  // App methods
  app: {
    getVersion: () => ipcRenderer.invoke('app:get-version'),
    quit: () => ipcRenderer.invoke('app:quit')
  },
  
  // Config methods
  config: {
    get: (key: string) => ipcRenderer.invoke('config:get', key),
    set: (key: string, value: any) => ipcRenderer.invoke('config:set', key, value),
    delete: (key: string) => ipcRenderer.invoke('config:delete', key),
    clear: () => ipcRenderer.invoke('config:clear')
  },
  
  // Check if running in Electron
  isElectron: true
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// Type definitions for the exposed API
declare global {
  interface Window {
    electronAPI: typeof electronAPI;
  }
}