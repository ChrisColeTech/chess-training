import { app, BrowserWindow, ipcMain } from 'electron';
import { spawn, ChildProcess } from 'child_process';
import { join } from 'path';
import waitOn from 'wait-on';
import { secureStorage } from './storage';
import Conf from 'conf';

class ChessTrainingApp {
  private mainWindow: BrowserWindow | null = null;
  private backendProcess: ChildProcess | null = null;
  private isDev = process.env.NODE_ENV === 'development';
  private config = new Conf({
    projectName: 'chess-training',
    defaults: {
      theme: 'cyber-neon'
    }
  });

  constructor() {
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
        this.createMainWindow();
      }
    });

    // IPC handlers
    ipcMain.handle('app:get-version', () => app.getVersion());
    ipcMain.handle('app:quit', () => this.shutdown());
    ipcMain.handle('backend:status', () => this.getBackendStatus());
    
    // Config handlers
    ipcMain.handle('config:get', (_, key: string) => this.config.get(key as any));
    ipcMain.handle('config:set', (_, key: string, value: any) => {
      this.config.set(key as any, value);
      return true;
    });
    ipcMain.handle('config:delete', (_, key: string) => {
      this.config.delete(key as any);
      return true;
    });
    ipcMain.handle('config:clear', () => {
      this.config.clear();
      return true;
    });
    
    // Window control handlers
    ipcMain.handle('window:minimize', () => {
      if (this.mainWindow) {
        this.mainWindow.minimize();
      }
    });

    ipcMain.handle('window:maximize', () => {
      if (this.mainWindow) {
        if (this.mainWindow.isMaximized()) {
          this.mainWindow.unmaximize();
        } else {
          this.mainWindow.maximize();
        }
      }
    });

    ipcMain.handle('window:close', () => {
      if (this.mainWindow) {
        this.mainWindow.close();
      }
    });

    ipcMain.handle('window:is-maximized', () => {
      return this.mainWindow?.isMaximized() || false;
    });

    // Auth storage handlers
    ipcMain.handle('auth:set-tokens', async (_, accessToken: string, refreshToken: string) => {
      await secureStorage.setTokens(accessToken, refreshToken);
      return true;
    });
    
    ipcMain.handle('auth:get-tokens', async () => {
      return await secureStorage.getTokens();
    });
    
    ipcMain.handle('auth:clear-tokens', async () => {
      await secureStorage.clearTokens();
      return true;
    });
    
    ipcMain.handle('auth:has-tokens', async () => {
      return await secureStorage.hasTokens();
    });
  }

  private async initialize() {
    console.log('Starting Chess Training application...');
    
    if (!this.isDev) {
      // In production, start the backend server
      await this.startBackend();
    }
    
    // Create main window
    this.createMainWindow();
  }

  private createMainWindow(): void {
    // Create the browser window
    this.mainWindow = new BrowserWindow({
      width: 1400,
      height: 900,
      minWidth: 1200,
      minHeight: 800,
      show: false,
      autoHideMenuBar: true,
      titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: true,
        preload: join(__dirname, 'preload.js')
      },
      icon: this.getIcon()
    });

    // Load the app
    if (this.isDev) {
      // Development: load from Vite dev server
      this.mainWindow.loadURL('http://localhost:5173');
      this.mainWindow.webContents.openDevTools();
    } else {
      // Production: load from built files
      this.mainWindow.loadFile(join(__dirname, 'renderer/index.html'));
    }

    // Show window when ready
    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
    });

    // Handle window closed
    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    // Handle external links
    this.mainWindow.webContents.setWindowOpenHandler(({ url }) => {
      require('electron').shell.openExternal(url);
      return { action: 'deny' };
    });
  }

  private async startBackend(): Promise<void> {
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
      });

      this.backendProcess.on('exit', (code) => {
        console.log('Backend process exited with code:', code);
      });

      // Log backend output in development
      if (this.isDev) {
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

      console.log('Backend server started successfully');
      
    } catch (error) {
      console.error('Failed to start backend server:', error);
      throw error;
    }
  }

  private async stopBackend(): Promise<void> {
    if (!this.backendProcess) return;

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
        console.log('Backend server stopped');
        resolve();
      });

      // Graceful shutdown
      this.backendProcess.kill('SIGTERM');
    });
  }

  private getBackendStatus(): { running: boolean } {
    return {
      running: this.backendProcess !== null
    };
  }

  private getBackendPath(): string {
    if (this.isDev) {
      return join(__dirname, '../../backend');
    } else {
      return join(process.resourcesPath, 'backend');
    }
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

  private async shutdown() {
    console.log('Shutting down Chess Training application...');
    
    if (this.backendProcess) {
      await this.stopBackend();
    }
    
    app.quit();
  }
}

// Initialize app
new ChessTrainingApp();