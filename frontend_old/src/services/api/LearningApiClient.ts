// Learning API client following SRP
import { ApiClient } from '../ApiClient';
import { ErrorService } from '../ErrorService';
import type { 
  LearningPath, 
  LearningModule, 
  LearningProgress, 
  ApiResponse 
} from '../../types/api';

export class LearningApiClient {
  constructor(private apiClient: ApiClient) {}

  // Single responsibility: Learning path management and progress tracking
  async getLearningPaths(category?: string): Promise<LearningPath[]> {
    try {
      const url = category ? `/learning/paths/category/${category}` : '/learning/paths';
      const response = await this.apiClient.get<ApiResponse<LearningPath[]>>(url);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getLearningPathById(id: string): Promise<LearningPath> {
    try {
      const response = await this.apiClient.get<ApiResponse<LearningPath>>(`/learning/paths/${id}`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getLearningPathStats(learningPathId: string): Promise<{ totalModules: number; completedModules: number; estimatedTimeRemaining: number }> {
    try {
      const response = await this.apiClient.get<ApiResponse<{ totalModules: number; completedModules: number; estimatedTimeRemaining: number }>>(
        `/learning/paths/${learningPathId}/stats`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getLearningModules(): Promise<LearningModule[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<LearningModule[]>>('/learning/modules');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getLearningModuleById(id: string): Promise<LearningModule> {
    try {
      const response = await this.apiClient.get<ApiResponse<LearningModule>>(`/learning/modules/${id}`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getLearningCategories(): Promise<string[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<string[]>>('/learning/paths/categories');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async startLearningPath(learningPathId: string): Promise<LearningProgress> {
    try {
      const response = await this.apiClient.post<ApiResponse<LearningProgress>>(`/learning/paths/${learningPathId}/start`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async updateModuleProgress(moduleId: string, progress: number): Promise<LearningProgress> {
    try {
      const response = await this.apiClient.put<ApiResponse<LearningProgress>>(
        `/learning/modules/${moduleId}/progress`,
        { progress }
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getUserLearningProgress(learningPathId?: string): Promise<LearningProgress | LearningProgress[]> {
    try {
      const url = learningPathId ? `/learning/progress/${learningPathId}` : '/learning/progress';
      const response = await this.apiClient.get<ApiResponse<LearningProgress | LearningProgress[]>>(url);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  // Learning paths from progress endpoint
  async getLearningPathsFromProgress(): Promise<LearningPath[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<LearningPath[]>>('/progress/learning-paths');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }
}