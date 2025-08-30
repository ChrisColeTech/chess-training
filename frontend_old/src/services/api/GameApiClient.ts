// Game API client following SRP
import { ApiClient } from '../ApiClient';
import { ErrorService } from '../ErrorService';
import type { 
  Game, 
  GameAnalysis, 
  ApiResponse 
} from '../../types/api';

export class GameApiClient {
  constructor(private apiClient: ApiClient) {}

  // Single responsibility: Game management and history
  async getGames(page: number = 1, limit: number = 20): Promise<{ games: Game[]; total: number }> {
    try {
      const response = await this.apiClient.get<ApiResponse<Game[]>>('/games');
      return { games: response.data!, total: response.data!.length };
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getGameById(id: string): Promise<Game> {
    try {
      const response = await this.apiClient.get<ApiResponse<Game>>(`/games/${id}`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async saveGame(gameData: Omit<Game, 'id' | 'createdAt' | 'updatedAt'>): Promise<Game> {
    try {
      const response = await this.apiClient.post<ApiResponse<Game>>('/games', gameData);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async deleteGame(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/games/${id}`);
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async analyzeGame(gameId: string, options?: { engine?: string; depth?: number }): Promise<GameAnalysis> {
    try {
      const response = await this.apiClient.post<ApiResponse<GameAnalysis>>(`/games/${gameId}/analysis`, options);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getGameAnalysis(gameId: string): Promise<GameAnalysis> {
    try {
      const response = await this.apiClient.get<ApiResponse<GameAnalysis>>(`/games/${gameId}/analysis`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getGamesByPlayer(player: string, page: number = 1, limit: number = 20): Promise<{ games: Game[]; total: number }> {
    try {
      const response = await this.apiClient.get<ApiResponse<{ games: Game[]; total: number }>>(
        `/games/player/${player}?page=${page}&limit=${limit}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getGamesByResult(result: string, page: number = 1, limit: number = 20): Promise<{ games: Game[]; total: number }> {
    try {
      const response = await this.apiClient.get<ApiResponse<{ games: Game[]; total: number }>>(
        `/games/result/${result}?page=${page}&limit=${limit}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async importPgn(pgn: string): Promise<Game> {
    try {
      const response = await this.apiClient.post<ApiResponse<Game>>('/games/import', { pgn });
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }
}