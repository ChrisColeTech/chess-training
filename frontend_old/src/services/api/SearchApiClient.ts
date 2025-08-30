// Search API client following SRP
import { ApiClient } from '../ApiClient';
import { ErrorService } from '../ErrorService';
import type { 
  Puzzle, 
  Tutorial, 
  LearningPath, 
  Game, 
  ApiResponse 
} from '../../types/api';

export class SearchApiClient {
  constructor(private apiClient: ApiClient) {}

  // Single responsibility: Search functionality across all content types
  async searchAll(query: string, filters?: {
    types?: string[];
    difficulty?: string;
    category?: string;
    limit?: number;
  }): Promise<{
    puzzles: Puzzle[];
    tutorials: Tutorial[];
    learningPaths: LearningPath[];
    games: Game[];
    total: number;
  }> {
    try {
      const params = new URLSearchParams({ q: query });
      if (filters?.types) params.append('types', filters.types.join(','));
      if (filters?.difficulty) params.append('difficulty', filters.difficulty);
      if (filters?.category) params.append('category', filters.category);
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const response = await this.apiClient.get<ApiResponse<{
        puzzles: Puzzle[];
        tutorials: Tutorial[];
        learningPaths: LearningPath[];
        games: Game[];
        total: number;
      }>>(`/search?${params.toString()}`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async searchPuzzles(query: string, filters?: {
    difficulty?: string;
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<{ puzzles: Puzzle[]; total: number }> {
    try {
      const params = new URLSearchParams({ q: query });
      if (filters?.difficulty) params.append('difficulty', filters.difficulty);
      if (filters?.category) params.append('category', filters.category);
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const response = await this.apiClient.get<ApiResponse<{ puzzles: Puzzle[]; total: number }>>(
        `/search/puzzles?${params.toString()}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async searchTutorials(query: string, filters?: {
    difficulty?: string;
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<{ tutorials: Tutorial[]; total: number }> {
    try {
      const params = new URLSearchParams({ q: query });
      if (filters?.difficulty) params.append('difficulty', filters.difficulty);
      if (filters?.category) params.append('category', filters.category);
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const response = await this.apiClient.get<ApiResponse<{ tutorials: Tutorial[]; total: number }>>(
        `/search/tutorials?${params.toString()}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async searchLearningPaths(query: string, filters?: {
    difficulty?: string;
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<{ learningPaths: LearningPath[]; total: number }> {
    try {
      const params = new URLSearchParams({ q: query });
      if (filters?.difficulty) params.append('difficulty', filters.difficulty);
      if (filters?.category) params.append('category', filters.category);
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const response = await this.apiClient.get<ApiResponse<{ learningPaths: LearningPath[]; total: number }>>(
        `/search/learning-paths?${params.toString()}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async searchGames(query: string, filters?: {
    player?: string;
    result?: string;
    event?: string;
    page?: number;
    limit?: number;
  }): Promise<{ games: Game[]; total: number }> {
    try {
      const params = new URLSearchParams({ q: query });
      if (filters?.player) params.append('player', filters.player);
      if (filters?.result) params.append('result', filters.result);
      if (filters?.event) params.append('event', filters.event);
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const response = await this.apiClient.get<ApiResponse<{ games: Game[]; total: number }>>(
        `/search/games?${params.toString()}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getSearchSuggestions(query: string, type?: string): Promise<string[]> {
    try {
      const params = new URLSearchParams({ q: query });
      if (type) params.append('type', type);

      const response = await this.apiClient.get<ApiResponse<string[]>>(`/search/suggestions?${params.toString()}`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getPopularSearches(type?: string, limit: number = 10): Promise<Array<{ query: string; count: number }>> {
    try {
      const params = new URLSearchParams({ limit: limit.toString() });
      if (type) params.append('type', type);

      const response = await this.apiClient.get<ApiResponse<Array<{ query: string; count: number }>>>(
        `/search/popular?${params.toString()}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async saveSearch(query: string, filters?: Record<string, any>): Promise<{ id: string }> {
    try {
      const response = await this.apiClient.post<ApiResponse<{ id: string }>>('/search/save', {
        query,
        filters
      });
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getSavedSearches(): Promise<Array<{
    id: string;
    query: string;
    filters?: Record<string, any>;
    createdAt: string;
  }>> {
    try {
      const response = await this.apiClient.get<ApiResponse<Array<{
        id: string;
        query: string;
        filters?: Record<string, any>;
        createdAt: string;
      }>>>('/search/saved');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async deleteSavedSearch(id: string): Promise<void> {
    try {
      await this.apiClient.delete(`/search/saved/${id}`);
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

}