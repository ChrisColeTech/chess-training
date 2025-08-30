import { apiClient } from '../apiClient'
import type { 
  LoginCredentials, 
  LoginResponse, 
  RegisterCredentials, 
  RegisterResponse,
  AuthTokens
} from '../../types/auth'

export interface ResetPasswordRequest {
  email: string
  newPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export class AuthService {
  
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
      return response
    } catch (error) {
      console.error('Login API call failed:', error)
      throw error
    }
  }

  async register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>('/auth/register', credentials)
      return response
    } catch (error) {
      console.error('Registration API call failed:', error)
      throw error
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const response = await apiClient.post<{ data: AuthTokens }>('/auth/refresh', {
        refreshToken
      })
      return response.data
    } catch (error) {
      console.error('Token refresh API call failed:', error)
      throw error
    }
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      await apiClient.post('/auth/logout', { refreshToken })
    } catch (error) {
      console.error('Logout API call failed:', error)
      // Don't throw - logout should succeed locally even if API fails
    }
  }

  async resetPassword(request: ResetPasswordRequest): Promise<void> {
    try {
      await apiClient.post('/auth/reset-password', request)
    } catch (error) {
      console.error('Password reset API call failed:', error)
      throw error
    }
  }

  async changePassword(request: ChangePasswordRequest): Promise<void> {
    try {
      await apiClient.post('/auth/change-password', request)
    } catch (error) {
      console.error('Password change API call failed:', error)
      throw error
    }
  }
}

export const authService = new AuthService()