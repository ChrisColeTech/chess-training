// Settings API client following SRP
import { ApiClient } from '../ApiClient';
import { ErrorService } from '../ErrorService';
import type { 
  AppSettings, 
  ApiResponse 
} from '../../types/api';

export class SettingsApiClient {
  constructor(private apiClient: ApiClient) {}

  // Single responsibility: Application settings management
  async getSettings(): Promise<AppSettings> {
    try {
      const response = await this.apiClient.get<ApiResponse<AppSettings>>('/settings');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async updateSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
    try {
      const response = await this.apiClient.put<ApiResponse<AppSettings>>('/settings', settings);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async resetSettings(): Promise<AppSettings> {
    try {
      const response = await this.apiClient.post<ApiResponse<AppSettings>>('/settings/reset');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async exportSettings(): Promise<AppSettings> {
    try {
      const response = await this.apiClient.get<ApiResponse<AppSettings>>('/settings/export');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async importSettings(settings: AppSettings): Promise<AppSettings> {
    try {
      const response = await this.apiClient.post<ApiResponse<AppSettings>>('/settings/import', settings);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getBoardThemes(): Promise<Array<{ id: string; name: string; preview: string }>> {
    try {
      const response = await this.apiClient.get<ApiResponse<Array<{ id: string; name: string; preview: string }>>>(
        '/settings/board-themes'
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getPieceThemes(): Promise<Array<{ id: string; name: string; preview: string }>> {
    try {
      const response = await this.apiClient.get<ApiResponse<Array<{ id: string; name: string; preview: string }>>>(
        '/settings/piece-themes'
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getSoundPacks(): Promise<Array<{ id: string; name: string; samples: string[] }>> {
    try {
      const response = await this.apiClient.get<ApiResponse<Array<{ id: string; name: string; samples: string[] }>>>(
        '/settings/sound-packs'
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async validateSettings(settings: Partial<AppSettings>): Promise<{ valid: boolean; errors?: string[] }> {
    try {
      const response = await this.apiClient.post<ApiResponse<{ valid: boolean; errors?: string[] }>>(
        '/settings/validate', 
        settings
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }
}