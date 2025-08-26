import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { storageService } from './storage';
import type {
  ApiResponse,
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  Game,
  CreateGameRequest,
  MakeMoveRequest,
  MakeMoveResponse,
  GameHistoryItem,
  Puzzle,
  PuzzleAttempt,
  PuzzleResult,
  PuzzleStats,
  DashboardStats
} from '../types/api';

class ApiService {
  private api: AxiosInstance;
  private baseURL = 'http://localhost:3000/api';

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token to requests
    this.api.interceptors.request.use(async (config) => {
      const token = await storageService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          const refreshToken = await storageService.getRefreshToken();
          if (refreshToken) {
            try {
              const response = await this.refreshToken(refreshToken);
              await storageService.setTokens(response.data.accessToken, refreshToken);
              // Retry original request
              error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
              return this.api.request(error.config);
            } catch (refreshError) {
              // Refresh failed, clear tokens and redirect to login
              await this.clearAuth();
              window.location.href = '/auth';
            }
          } else {
            await this.clearAuth();
            window.location.href = '/auth';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth methods
  async register(data: RegisterRequest): Promise<ApiResponse<{ user: User }>> {
    const response = await this.api.post('/auth/register', data);
    return response.data;
  }

  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await this.api.post('/auth/login', data);
    if (response.data.success) {
      await this.setAuth(response.data.accessToken, response.data.refreshToken);
    }
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<any> {
    return this.api.post('/auth/refresh', { refreshToken });
  }

  async logout(): Promise<void> {
    const refreshToken = await storageService.getRefreshToken();
    if (refreshToken) {
      try {
        await this.api.post('/auth/logout', { refreshToken });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    await this.clearAuth();
  }

  private async setAuth(accessToken: string, refreshToken: string): Promise<void> {
    await storageService.setTokens(accessToken, refreshToken);
  }

  private async clearAuth(): Promise<void> {
    await storageService.clearTokens();
  }

  // User methods
  async getProfile(): Promise<ApiResponse<{ user: User }>> {
    const response = await this.api.get('/user/profile');
    return response.data;
  }

  async updateProfile(preferences: any): Promise<ApiResponse<{ message: string }>> {
    const response = await this.api.put('/user/profile', { preferences });
    return response.data;
  }

  // Game methods
  async createGame(data: CreateGameRequest): Promise<ApiResponse<{
    gameId: string;
    initialFen: string;
    aiMove?: any;
  }>> {
    const response = await this.api.post('/games/create', data);
    return response.data;
  }

  async makeMove(gameId: string, data: MakeMoveRequest): Promise<MakeMoveResponse> {
    const response = await this.api.post(`/games/${gameId}/move`, data);
    return response.data;
  }

  async getGame(gameId: string): Promise<ApiResponse<{ game: Game }>> {
    const response = await this.api.get(`/games/${gameId}`);
    return response.data;
  }

  async getGameHistory(): Promise<ApiResponse<{ games: GameHistoryItem[] }>> {
    const response = await this.api.get('/games/history');
    return response.data;
  }

  // Puzzle methods
  async getNextPuzzle(): Promise<ApiResponse<{ puzzle: Puzzle }>> {
    const response = await this.api.get('/puzzles/next');
    return response.data;
  }

  async solvePuzzle(puzzleId: string, data: PuzzleAttempt): Promise<ApiResponse<PuzzleResult>> {
    const response = await this.api.post(`/puzzles/${puzzleId}/solve`, data);
    return response.data;
  }

  async getHint(puzzleId: string): Promise<ApiResponse<{ hint: string; hintsUsed: number }>> {
    const response = await this.api.post(`/puzzles/${puzzleId}/hint`);
    return response.data;
  }

  async getPuzzleStats(): Promise<ApiResponse<{ stats: PuzzleStats }>> {
    const response = await this.api.get('/puzzles/stats');
    return response.data;
  }

  // Stats methods
  async getDashboardStats(): Promise<ApiResponse<{ stats: DashboardStats }>> {
    const response = await this.api.get('/stats/dashboard');
    return response.data;
  }

  // Utility methods
  async healthCheck(): Promise<ApiResponse<{ status: string; version: string }>> {
    const response = await this.api.get('/health');
    return response.data;
  }

  async isAuthenticated(): Promise<boolean> {
    return await storageService.hasTokens();
  }
}

export const apiService = new ApiService();
export default apiService;