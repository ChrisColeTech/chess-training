// Analysis API client following SRP
import { ApiClient } from '../ApiClient';
import { ErrorService } from '../ErrorService';
import type { 
  AnalysisRequest, 
  AnalysisResult, 
  ApiResponse 
} from '../../types/api';

export class AnalysisApiClient {
  constructor(private apiClient: ApiClient) {}

  // Single responsibility: Chess position and game analysis
  async analyzePosition(request: AnalysisRequest): Promise<AnalysisResult> {
    try {
      const response = await this.apiClient.post<ApiResponse<AnalysisResult>>('/analysis/position', request);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async analyzeGame(pgn: string, depth?: number): Promise<{
    moves: { 
      move: string; 
      evaluation: number; 
      bestMove: string; 
      comment?: string 
    }[];
    accuracy: { white: number; black: number };
    blunders: number;
    mistakes: number;
    inaccuracies: number;
  }> {
    try {
      const response = await this.apiClient.post<ApiResponse<{
        moves: { 
          move: string; 
          evaluation: number; 
          bestMove: string; 
          comment?: string 
        }[];
        accuracy: { white: number; black: number };
        blunders: number;
        mistakes: number;
        inaccuracies: number;
      }>>('/analysis/game', { pgn, depth });
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getBestMove(fen: string, depth?: number): Promise<{ move: string; evaluation: number }> {
    try {
      const response = await this.apiClient.post<ApiResponse<{ move: string; evaluation: number }>>(
        '/analysis/best-move', 
        { fen, depth }
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getOpeningName(moves: string[]): Promise<{ opening: string; eco: string; variation?: string }> {
    try {
      const response = await this.apiClient.post<ApiResponse<{ opening: string; eco: string; variation?: string }>>(
        '/analysis/opening', 
        { moves }
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async evaluatePosition(fen: string): Promise<{ evaluation: number; mate?: number }> {
    try {
      const response = await this.apiClient.post<ApiResponse<{ evaluation: number; mate?: number }>>(
        '/analysis/evaluate', 
        { fen }
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }
}