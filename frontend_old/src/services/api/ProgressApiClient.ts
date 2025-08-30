// Progress API client following SRP
import { ApiClient } from '../ApiClient';
import { ErrorService } from '../ErrorService';
import type { 
  ProgressOverview, 
  DetailedProgress, 
  ApiResponse 
} from '../../types/api';

export class ProgressApiClient {
  constructor(private apiClient: ApiClient) {}

  // Single responsibility: User progress tracking only
  async getOverview(): Promise<ProgressOverview> {
    try {
      const response = await this.apiClient.get<ApiResponse<ProgressOverview>>('/progress/overview');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getDetailed(): Promise<DetailedProgress> {
    try {
      const response = await this.apiClient.get<ApiResponse<DetailedProgress>>('/progress/detailed');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }
}