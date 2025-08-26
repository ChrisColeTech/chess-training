import Conf from 'conf';

interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}

class SecureStorage {
  private store: any;

  constructor() {
    this.store = new Conf({
      configName: 'chess-training-auth',
      encryptionKey: 'chess-training-secure-key-2024', // In production, this should be dynamically generated
      schema: {
        accessToken: {
          type: 'string'
        },
        refreshToken: {
          type: 'string'
        }
      }
    });
  }

  async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    this.store.set('accessToken', accessToken);
    this.store.set('refreshToken', refreshToken);
  }

  async getTokens(): Promise<AuthTokens> {
    return {
      accessToken: this.store.get('accessToken'),
      refreshToken: this.store.get('refreshToken')
    };
  }

  async clearTokens(): Promise<void> {
    this.store.delete('accessToken');
    this.store.delete('refreshToken');
  }

  async hasTokens(): Promise<boolean> {
    return this.store.has('accessToken') && this.store.has('refreshToken');
  }
}

export const secureStorage = new SecureStorage();