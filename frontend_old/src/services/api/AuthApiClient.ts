// Authentication API client following SRP
import { ApiClient } from '../ApiClient';
import { ErrorService } from '../ErrorService';
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthTokens, 
  User, 
  ApiResponse 
} from '../../types/api';

export class AuthApiClient {
  constructor(private apiClient: ApiClient) {}

  // Single responsibility: User authentication
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      console.log('📡 AuthApiClient.login called with:', { email: credentials.email });
      const response = await this.apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>('/auth/login', credentials);
      console.log('📡 AuthApiClient.login raw response:', response);
      console.log('📡 AuthApiClient.login returning response.data:', response.data);
      return response.data;
    } catch (error) {
      console.error('📡 AuthApiClient.login ERROR:', error);
      throw ErrorService.handleApiError(error);
    }
  }

  async register(userData: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      const response = await this.apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const response = await this.apiClient.post<ApiResponse<AuthTokens>>('/auth/refresh', { refreshToken });
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.apiClient.post('/auth/logout');
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  // Missing password management methods
  async forgotPassword(email: string): Promise<{ resetToken: string }> {
    try {
      const response = await this.apiClient.post<ApiResponse<{ resetToken: string }>>('/auth/forgot-password', { email });
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    try {
      await this.apiClient.post('/auth/reset-password', { resetToken, newPassword });
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await this.apiClient.put('/auth/change-password', { currentPassword, newPassword });
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async getProfile(): Promise<User> {
    try {
      const response = await this.apiClient.get<ApiResponse<User>>('/auth/profile');
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async updateProfile(updates: Partial<Pick<User, 'username' | 'email'>>): Promise<User> {
    try {
      const response = await this.apiClient.put<ApiResponse<User>>('/auth/profile', updates);
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }

  async validateResetToken(token: string): Promise<{ valid: boolean }> {
    try {
      const response = await this.apiClient.post<ApiResponse<{ valid: boolean }>>('/auth/validate-reset-token', { token });
      return response.data!;
    } catch (error) {
      throw ErrorService.handleApiError(error);
    }
  }
}