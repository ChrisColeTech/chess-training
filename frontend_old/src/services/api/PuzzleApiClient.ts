// Puzzle API client following SRP
import { ApiClient } from '../ApiClient';
import { ErrorService } from '../ErrorService';
import type { 
  Puzzle, 
  PuzzleAttempt, 
  PuzzleStats, 
  ApiResponse 
} from '../../types/api';

export class PuzzleApiClient {
  constructor(private apiClient: ApiClient) {}

  // Single responsibility: Puzzle management and solving
  async getNextPuzzle(difficulty?: string, category?: string): Promise<Puzzle> {
    try {
      const params = new URLSearchParams();
      if (difficulty) params.append('difficulty', difficulty);
      if (category) params.append('category', category);
      
      const response = await this.apiClient.get<ApiResponse<Puzzle>>(
        `/puzzles/next${params.toString() ? `?${params.toString()}` : ''}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async solvePuzzle(puzzleId: string, attempt: PuzzleAttempt): Promise<{ correct: boolean; solution?: string[]; hints?: string[] }> {
    try {
      const response = await this.apiClient.post<ApiResponse<{ correct: boolean; solution?: string[]; hints?: string[] }>>(
        `/puzzles/${puzzleId}/solve`,
        attempt
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getHint(puzzleId: string): Promise<{ hint: string; penaltyApplied: boolean }> {
    try {
      const response = await this.apiClient.post<ApiResponse<{ hint: string; penaltyApplied: boolean }>>(
        `/puzzles/${puzzleId}/hint`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getPuzzleStats(): Promise<PuzzleStats> {
    try {
      const response = await this.apiClient.get<ApiResponse<PuzzleStats>>('/puzzles/stats');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getPuzzlesByCategory(category: string, page: number = 1, limit: number = 20): Promise<{ puzzles: Puzzle[]; total: number }> {
    try {
      const response = await this.apiClient.get<ApiResponse<{ puzzles: Puzzle[]; total: number }>>(
        `/puzzles/category/${category}?page=${page}&limit=${limit}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getPuzzlesByDifficulty(difficulty: string, page: number = 1, limit: number = 20): Promise<{ puzzles: Puzzle[]; total: number }> {
    try {
      const response = await this.apiClient.get<ApiResponse<{ puzzles: Puzzle[]; total: number }>>(
        `/puzzles/difficulty/${difficulty}?page=${page}&limit=${limit}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }
}