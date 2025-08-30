// Tutorial API client following SRP
import { ApiClient } from '../ApiClient';
import { ErrorService } from '../ErrorService';
import type { 
  Tutorial, 
  TutorialStep, 
  TutorialProgress, 
  ApiResponse 
} from '../../types/api';

export class TutorialApiClient {
  constructor(private apiClient: ApiClient) {}

  // Single responsibility: Tutorial management and progress tracking
  async getTutorials(category?: string): Promise<Tutorial[]> {
    try {
      const url = category ? `/tutorials/category/${category}` : '/tutorials';
      const response = await this.apiClient.get<ApiResponse<Tutorial[]>>(url);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getTutorialById(id: string): Promise<Tutorial> {
    try {
      const response = await this.apiClient.get<ApiResponse<Tutorial>>(`/tutorials/${id}`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getTutorialSteps(tutorialId: string): Promise<TutorialStep[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<TutorialStep[]>>(`/tutorials/${tutorialId}/steps`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getTutorialCategories(): Promise<string[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<string[]>>('/tutorials/categories');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async startTutorial(tutorialId: string): Promise<TutorialProgress> {
    try {
      const response = await this.apiClient.post<ApiResponse<TutorialProgress>>(`/tutorials/${tutorialId}/start`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async completeStep(tutorialId: string, stepId: string): Promise<TutorialProgress> {
    try {
      const response = await this.apiClient.post<ApiResponse<TutorialProgress>>(
        `/tutorials/${tutorialId}/steps/${stepId}/complete`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getUserTutorialProgress(tutorialId?: string): Promise<TutorialProgress | TutorialProgress[]> {
    try {
      const url = tutorialId ? `/tutorials/progress/${tutorialId}` : '/tutorials/progress';
      const response = await this.apiClient.get<ApiResponse<TutorialProgress | TutorialProgress[]>>(url);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getTutorialsByDifficulty(difficulty: string): Promise<Tutorial[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<Tutorial[]>>(`/tutorials/difficulty/${difficulty}`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  // Add missing methods that match the backend routes
  async getProgressForTutorial(tutorialId: string): Promise<TutorialProgress> {
    try {
      const response = await this.apiClient.get<ApiResponse<TutorialProgress>>(`/tutorials/progress/${tutorialId}`);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getAllProgress(): Promise<TutorialProgress[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<TutorialProgress[]>>('/tutorials/progress');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }
}