# Chess Training POC - Electron Desktop App Guide

**Version:** 1.0 POC  
**Stack:** Electron, React, Node.js Backend  
**Purpose:** Desktop wrapper for chess training application

## Overview

The Electron application wraps the React frontend and provides desktop functionality. It manages the main window, handles system integration, and coordinates communication between the frontend and backend API server.

## Technology Stack

### Core Dependencies
```json
{
  "electron": "^27.0.x",
  "electron-builder": "^24.6.x",
  "electron-vite": "^1.0.x",
  "concurrently": "^8.2.x"
}
```

### Development Dependencies
```json
{
  "@types/node": "^18.17.x",
  "electron-devtools-installer": "^3.2.x",
  "wait-on": "^7.0.x"
}
```

## Project Structure

```
electron/
├── src/
│   ├── main/                 # Main process
│   │   ├── main.ts          # Entry point
│   │   ├── window.ts        # Window management
│   │   └── backend.ts       # Backend server management
│   ├── preload/             # Preload scripts
│   │   └── preload.ts       # Context bridge
│   └── renderer/            # Renderer process (React)
│       └── (links to ../frontend)
├── resources/               # App resources
│   ├── icon.png
│   └── icon.ico
├── build/                   # Build configuration
│   └── notarize.js         # macOS notarization
├── dist/                    # Built application
├── package.json
├── electron-builder.json    # Build configuration
└── vite.config.ts          # Electron-vite config
```

## Main Process Setup

### Main Entry Point

```typescript
// electron/src/main/main.ts
import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { WindowManager } from './window';
import { BackendManager } from './backend';

// Enable live reload for development
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname, {
    electron: join(__dirname, '..', 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
}

class ChessTrainingApp {
  private windowManager: WindowManager;
  private backendManager: BackendManager;

  constructor() {
    this.windowManager = new WindowManager();
    this.backendManager = new BackendManager();
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    // App event handlers
    app.whenReady().then(() => {
      this.initialize();
    });

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        this.shutdown();
      }
    });

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.windowManager.createMainWindow();
      }
    });

    // IPC handlers
    ipcMain.handle('app:get-version', () => app.getVersion());
    ipcMain.handle('app:quit', () => this.shutdown());
    ipcMain.handle('backend:start', () => this.backendManager.start());
    ipcMain.handle('backend:stop', () => this.backendManager.stop());
    ipcMain.handle('backend:status', () => this.backendManager.getStatus());
  }

  private async initialize() {
    // Start backend server
    await this.backendManager.start();
    
    // Create main window
    this.windowManager.createMainWindow();

    // Install dev tools in development
    if (process.env.NODE_ENV === 'development') {
      const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');
      try {
        await installExtension(REACT_DEVELOPER_TOOLS);
      } catch (err) {
        console.log('Failed to install React DevTools:', err);
      }
    }
  }

  private async shutdown() {
    await this.backendManager.stop();
    app.quit();
  }
}

// Initialize app
new ChessTrainingApp();
```

### Window Management

```typescript
// electron/src/main/window.ts
import { BrowserWindow, shell } from 'electron';
import { join } from 'path';

export class WindowManager {
  private mainWindow: BrowserWindow | null = null;

  createMainWindow(): BrowserWindow {
    // Create the browser window
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 1000,
      minHeight: 700,
      show: false,
      autoHideMenuBar: true,
      titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: join(__dirname, '../preload/preload.js'),
        webSecurity: true
      },
      icon: this.getIcon()
    });

    // Load the app
    if (process.env.NODE_ENV === 'development') {
      // Development: load from Vite dev server
      this.mainWindow.loadURL('http://localhost:5173');
      this.mainWindow.webContents.openDevTools();
    } else {
      // Production: load from built files
      this.mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }

    // Show window when ready
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
      
      if (process.env.NODE_ENV === 'development') {
        this.mainWindow?.webContents.openDevTools();
      }
    });

    // Handle window closed
    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    // Handle external links
    this.mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: 'deny' };
    });

    return this.mainWindow;
  }

  private getIcon(): string {
    const iconPath = join(__dirname, '../resources');
    
    if (process.platform === 'win32') {
      return join(iconPath, 'icon.ico');
    } else if (process.platform === 'darwin') {
      return join(iconPath, 'icon.icns');
    } else {
      return join(iconPath, 'icon.png');
    }
  }

  getMainWindow(): BrowserWindow | null {
    return this.mainWindow;
  }

  focusMainWindow(): void {
    if (this.mainWindow) {
      if (this.mainWindow.isMinimized()) {
        this.mainWindow.restore();
      }
      this.mainWindow.focus();
    }
  }
}
```

### Backend Server Management

```typescript
// electron/src/main/backend.ts
import { spawn, ChildProcess } from 'child_process';
import { join } from 'path';
import waitOn from 'wait-on';

export class BackendManager {
  private backendProcess: ChildProcess | null = null;
  private isStarting: boolean = false;
  private isRunning: boolean = false;

  async start(): Promise<void> {
    if (this.isRunning || this.isStarting) {
      return;
    }

    this.isStarting = true;
    console.log('Starting backend server...');

    try {
      const backendPath = this.getBackendPath();
      
      // Start backend process
      this.backendProcess = spawn('node', [join(backendPath, 'dist/app.js')], {
        cwd: backendPath,
        env: {
          ...process.env,
          NODE_ENV: 'production',
          PORT: '3000'
        },
        stdio: ['pipe', 'pipe', 'pipe']
      });

      // Handle process events
      this.backendProcess.on('error', (error) => {
        console.error('Backend process error:', error);
        this.isRunning = false;
        this.isStarting = false;
      });

      this.backendProcess.on('exit', (code) => {
        console.log('Backend process exited with code:', code);
        this.isRunning = false;
        this.isStarting = false;
      });

      // Log backend output in development
      if (process.env.NODE_ENV === 'development') {
        this.backendProcess.stdout?.on('data', (data) => {
          console.log('Backend stdout:', data.toString());
        });

        this.backendProcess.stderr?.on('data', (data) => {
          console.log('Backend stderr:', data.toString());
        });
      }

      // Wait for backend to be ready
      await waitOn({
        resources: ['http://localhost:3000/api/health'],
        timeout: 30000,
        interval: 1000
      });

      this.isRunning = true;
      this.isStarting = false;
      console.log('Backend server started successfully');
      
    } catch (error) {
      this.isStarting = false;
      console.error('Failed to start backend server:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (!this.backendProcess || !this.isRunning) {
      return;
    }

    console.log('Stopping backend server...');

    return new Promise((resolve) => {
      if (!this.backendProcess) {
        resolve();
        return;
      }

      const timeout = setTimeout(() => {
        // Force kill if graceful shutdown fails
        this.backendProcess?.kill('SIGKILL');
        resolve();
      }, 5000);

      this.backendProcess.once('exit', () => {
        clearTimeout(timeout);
        this.isRunning = false;
        console.log('Backend server stopped');
        resolve();
      });

      // Graceful shutdown
      this.backendProcess.kill('SIGTERM');
    });
  }

  getStatus(): { running: boolean; starting: boolean } {
    return {
      running: this.isRunning,
      starting: this.isStarting
    };
  }

  private getBackendPath(): string {
    if (process.env.NODE_ENV === 'development') {
      return join(__dirname, '../../../backend');
    } else {
      return join(process.resourcesPath, 'backend');
    }
  }
}
```

## Preload Script (Security Bridge)

```typescript
// electron/src/preload/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
const electronAPI = {
  // App methods
  getVersion: (): Promise<string> => ipcRenderer.invoke('app:get-version'),
  quit: (): Promise<void> => ipcRenderer.invoke('app:quit'),
  
  // Backend methods
  startBackend: (): Promise<void> => ipcRenderer.invoke('backend:start'),
  stopBackend: (): Promise<void> => ipcRenderer.invoke('backend:stop'),
  getBackendStatus: (): Promise<{ running: boolean; starting: boolean }> => 
    ipcRenderer.invoke('backend:status'),
  
  // Window methods
  onWindowFocus: (callback: () => void) => {
    ipcRenderer.on('window-focus', callback);
    return () => ipcRenderer.removeListener('window-focus', callback);
  },
  
  onWindowBlur: (callback: () => void) => {
    ipcRenderer.on('window-blur', callback);
    return () => ipcRenderer.removeListener('window-blur', callback);
  }
};

// Type definitions for TypeScript
export type ElectronAPI = typeof electronAPI;

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// Add type definitions for the global window object
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
```

## Build Configuration

### Electron Builder Config

```json
{
  "appId": "com.chessTraining.app",
  "productName": "Chess Training",
  "directories": {
    "output": "dist-electron"
  },
  "files": [
    "dist/**/*",
    "resources/**/*",
    "!resources/README.md",
    "node_modules/**/*",
    "!node_modules/.cache/**/*"
  ],
  "extraResources": [
    {
      "from": "../backend/dist",
      "to": "backend/dist"
    },
    {
      "from": "../backend/package.json",
      "to": "backend/package.json"
    },
    {
      "from": "../backend/node_modules",
      "to": "backend/node_modules"
    }
  ],
  "mac": {
    "category": "public.app-category.games",
    "icon": "resources/icon.icns",
    "target": [
      {
        "target": "dmg",
        "arch": ["x64", "arm64"]
      }
    ]
  },
  "win": {
    "icon": "resources/icon.ico",
    "target": [
      {
        "target": "nsis",
        "arch": ["x64"]
      }
    ]
  },
  "linux": {
    "icon": "resources/icon.png",
    "category": "Game",
    "target": [
      {
        "target": "AppImage",
        "arch": ["x64"]
      }
    ]
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true
  }
}
```

### Vite Configuration

```typescript
// electron/vite.config.ts
import { defineConfig } from 'electron-vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    build: {
      outDir: 'dist/main'
    }
  },
  preload: {
    build: {
      outDir: 'dist/preload'
    }
  },
  renderer: {
    root: '../frontend',
    build: {
      outDir: '../electron/dist/renderer'
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, '../frontend/src')
      }
    }
  }
});
```

## Development Scripts

### Package.json Scripts

```json
{
  "name": "chess-training-electron",
  "version": "1.0.0",
  "main": "dist/main/main.js",
  "scripts": {
    "dev": "electron-vite dev",
    "build": "electron-vite build",
    "preview": "electron-vite preview",
    "pack": "electron-builder --dir",
    "dist": "electron-builder",
    "dist:win": "electron-builder --win",
    "dist:mac": "electron-builder --mac",
    "dist:linux": "electron-builder --linux",
    "start": "electron dist/main/main.js",
    "clean": "rimraf dist dist-electron"
  }
}
```

## Frontend Integration

### Using Electron APIs in React

```typescript
// frontend/src/hooks/useElectron.ts
import { useEffect, useState } from 'react';

export const useElectron = () => {
  const [isElectron, setIsElectron] = useState(false);
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    const checkElectron = async () => {
      if (window.electronAPI) {
        setIsElectron(true);
        const appVersion = await window.electronAPI.getVersion();
        setVersion(appVersion);
      }
    };

    checkElectron();
  }, []);

  const quit = async () => {
    if (window.electronAPI) {
      await window.electronAPI.quit();
    }
  };

  return {
    isElectron,
    version,
    quit
  };
};

// Usage in component
export const AppHeader: React.FC = () => {
  const { isElectron, version, quit } = useElectron();

  if (!isElectron) return null;

  return (
    <div className="app-header">
      <span>Chess Training v{version}</span>
      <button onClick={quit}>Quit</button>
    </div>
  );
};
```

### Backend Status Monitoring

```typescript
// frontend/src/hooks/useBackendStatus.ts
import { useEffect, useState } from 'react';

export const useBackendStatus = () => {
  const [status, setStatus] = useState({ running: false, starting: false });

  useEffect(() => {
    const checkStatus = async () => {
      if (window.electronAPI) {
        const backendStatus = await window.electronAPI.getBackendStatus();
        setStatus(backendStatus);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  return status;
};
```

## Security Considerations

### Context Isolation
- ✅ `nodeIntegration: false` - Prevents renderer access to Node.js APIs
- ✅ `contextIsolation: true` - Isolates main world from isolated world
- ✅ `enableRemoteModule: false` - Disables dangerous remote module
- ✅ `webSecurity: true` - Enables web security features

### Preload Script Safety
- ✅ Only expose necessary APIs through `contextBridge`
- ✅ Validate all IPC communications
- ✅ No direct Node.js API exposure to renderer

### External Content
- ✅ Block external navigation with `setWindowOpenHandler`
- ✅ Open external links in system browser
- ✅ Validate all URLs before loading

## Development Workflow

### Starting Development
```bash
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start Electron with React
cd electron && npm run dev
```

### Building for Distribution
```bash
# Build all components
cd backend && npm run build
cd ../frontend && npm run build
cd ../electron && npm run build

# Package for current platform
cd electron && npm run dist

# Package for specific platforms
npm run dist:win   # Windows
npm run dist:mac   # macOS
npm run dist:linux # Linux
```

## File Type Associations

### Register Chess File Types

```typescript
// electron/src/main/fileAssociations.ts
import { app } from 'electron';

export const registerFileAssociations = () => {
  if (process.platform === 'win32') {
    // Register PGN file association on Windows
    app.setAsDefaultProtocolClient('chess-pgn', process.execPath, [
      '--open-file'
    ]);
  }
};

// Handle file opening
export const handleFileOpen = (filePath: string) => {
  // Send file content to renderer
  const mainWindow = WindowManager.getMainWindow();
  if (mainWindow) {
    mainWindow.webContents.send('file:open', filePath);
  }
};
```

## Auto-Updates (Future Enhancement)

### Basic Update Configuration
```typescript
// electron/src/main/updater.ts
import { autoUpdater } from 'electron-updater';

export class UpdateManager {
  constructor() {
    autoUpdater.checkForUpdatesAndNotify();
  }

  checkForUpdates() {
    if (process.env.NODE_ENV === 'production') {
      autoUpdater.checkForUpdates();
    }
  }
}
```

## POC Implementation Notes

This Electron setup provides:
- ✅ Desktop wrapper for React frontend
- ✅ Backend server lifecycle management
- ✅ Secure IPC communication
- ✅ Cross-platform build configuration
- ✅ Development hot reload
- ✅ Production packaging
- ✅ Proper security isolation

**Not included in POC:**
- ❌ Auto-updates
- ❌ Native menus
- ❌ System tray functionality
- ❌ File associations
- ❌ Advanced window management

**Ready for:** Wrapping the React frontend and providing desktop functionality for the chess training POC.