// Storage abstraction that works in both browser and Electron

interface StorageService {
  setTokens(accessToken: string, refreshToken: string): Promise<void>;
  getTokens(): Promise<{ accessToken?: string; refreshToken?: string }>;
  clearTokens(): Promise<void>;
  hasTokens(): Promise<boolean>;
  getAccessToken(): Promise<string | null>;
  getRefreshToken(): Promise<string | null>;
}

class WebStorageService implements StorageService {
  async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  async getTokens(): Promise<{ accessToken?: string; refreshToken?: string }> {
    return {
      accessToken: localStorage.getItem('accessToken') || undefined,
      refreshToken: localStorage.getItem('refreshToken') || undefined
    };
  }

  async clearTokens(): Promise<void> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async hasTokens(): Promise<boolean> {
    return !!(localStorage.getItem('accessToken') && localStorage.getItem('refreshToken'));
  }

  async getAccessToken(): Promise<string | null> {
    return localStorage.getItem('accessToken');
  }

  async getRefreshToken(): Promise<string | null> {
    return localStorage.getItem('refreshToken');
  }
}

class ElectronStorageService implements StorageService {
  async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    console.log('💾 ElectronStorageService: Setting tokens');
    if (window.electronAPI) {
      await window.electronAPI.auth.setTokens(accessToken, refreshToken);
      console.log('✅ Tokens saved to secure storage');
    } else {
      console.log('❌ No electronAPI available');
    }
  }

  async getTokens(): Promise<{ accessToken?: string; refreshToken?: string }> {
    console.log('📖 ElectronStorageService: Getting tokens');
    if (window.electronAPI) {
      const tokens = await window.electronAPI.auth.getTokens();
      console.log('🎫 Retrieved tokens:', !!tokens.accessToken, !!tokens.refreshToken);
      return tokens;
    }
    console.log('❌ No electronAPI available for getTokens');
    return {};
  }

  async clearTokens(): Promise<void> {
    console.log('🗑️ ElectronStorageService: Clearing tokens');
    if (window.electronAPI) {
      await window.electronAPI.auth.clearTokens();
    }
  }

  async hasTokens(): Promise<boolean> {
    console.log('🔍 ElectronStorageService: Checking if tokens exist');
    if (window.electronAPI) {
      const hasTokens = await window.electronAPI.auth.hasTokens();
      console.log('🎫 Has tokens:', hasTokens);
      return hasTokens;
    }
    console.log('❌ No electronAPI available for hasTokens');
    return false;
  }

  async getAccessToken(): Promise<string | null> {
    const tokens = await this.getTokens();
    return tokens.accessToken || null;
  }

  async getRefreshToken(): Promise<string | null> {
    const tokens = await this.getTokens();
    return tokens.refreshToken || null;
  }
}

// Create the appropriate storage service based on environment
function createStorageService(): StorageService {
  // Check if running in Electron
  if (typeof window !== 'undefined' && window.electronAPI) {
    console.log('🖥️ Using Electron secure storage - electronAPI detected');
    return new ElectronStorageService();
  } else {
    console.log('🌐 Using web localStorage - no electronAPI found');
    console.log('🔍 window.electronAPI:', typeof window !== 'undefined' ? window.electronAPI : 'window undefined');
    return new WebStorageService();
  }
}

export const storageService = createStorageService();