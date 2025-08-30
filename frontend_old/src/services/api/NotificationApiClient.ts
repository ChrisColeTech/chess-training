// Notification API client following SRP
import { ApiClient } from '../ApiClient';
import { ErrorService } from '../ErrorService';
import type { 
  Notification, 
  ApiResponse 
} from '../../types/api';

export class NotificationApiClient {
  constructor(private apiClient: ApiClient) {}

  // Single responsibility: Notification management
  async getNotifications(page: number = 1, limit: number = 20): Promise<{ notifications: Notification[]; total: number; unread: number }> {
    try {
      const response = await this.apiClient.get<ApiResponse<{ notifications: Notification[]; total: number; unread: number }>>(
        `/notifications?page=${page}&limit=${limit}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getUnreadNotifications(): Promise<Notification[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<Notification[]>>('/notifications/unread');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async markAsRead(notificationId: string): Promise<void> {
    try {
      await this.apiClient.put(`/notifications/${notificationId}/read`);
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async markAllAsRead(): Promise<void> {
    try {
      await this.apiClient.put('/notifications/read-all');
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    try {
      await this.apiClient.delete(`/notifications/${notificationId}`);
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async deleteAllNotifications(): Promise<void> {
    try {
      await this.apiClient.delete('/notifications/all');
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getNotificationsByType(type: string, page: number = 1, limit: number = 20): Promise<{ notifications: Notification[]; total: number }> {
    try {
      const response = await this.apiClient.get<ApiResponse<{ notifications: Notification[]; total: number }>>(
        `/notifications/type/${type}?page=${page}&limit=${limit}`
      );
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getNotificationSettings(): Promise<{
    emailNotifications: boolean;
    pushNotifications: boolean;
    achievementNotifications: boolean;
    tutorialReminders: boolean;
    gameInvites: boolean;
  }> {
    try {
      const response = await this.apiClient.get<ApiResponse<{
        emailNotifications: boolean;
        pushNotifications: boolean;
        achievementNotifications: boolean;
        tutorialReminders: boolean;
        gameInvites: boolean;
      }>>('/notifications/settings');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async updateNotificationSettings(settings: {
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    achievementNotifications?: boolean;
    tutorialReminders?: boolean;
    gameInvites?: boolean;
  }): Promise<{
    emailNotifications: boolean;
    pushNotifications: boolean;
    achievementNotifications: boolean;
    tutorialReminders: boolean;
    gameInvites: boolean;
  }> {
    try {
      const response = await this.apiClient.put<ApiResponse<{
        emailNotifications: boolean;
        pushNotifications: boolean;
        achievementNotifications: boolean;
        tutorialReminders: boolean;
        gameInvites: boolean;
      }>>('/notifications/settings', settings);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async sendTestNotification(type: string): Promise<void> {
    try {
      await this.apiClient.post('/notifications/test', { type });
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }
}