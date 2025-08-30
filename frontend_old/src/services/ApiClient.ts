// API Client following established architecture patterns
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    // Single responsibility: Configure HTTP client for API communication
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    this.setupInterceptors();
  }
  
  // DRY: Centralized request/response handling
  private setupInterceptors(): void {
    // Request interceptor for auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = Cookies.get('authToken');
        if (token && token !== 'demo-access-token') {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor for error handling and token refresh
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle token refresh
          const refreshToken = Cookies.get('refreshToken');
          if (refreshToken) {
            try {
              const response = await axios.post('/api/auth/refresh', {
                refreshToken,
              });
              
              // Update tokens
              const { accessToken, refreshToken: newRefreshToken } = response.data;
              Cookies.set('authToken', accessToken, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
              });
              
              if (newRefreshToken) {
                Cookies.set('refreshToken', newRefreshToken, {
                  expires: 30, // 30 days
                  secure: process.env.NODE_ENV === 'production',
                  sameSite: 'strict'
                });
              }
              
              // Retry original request
              return this.axiosInstance.request(error.config);
            } catch (refreshError) {
              // Refresh failed, redirect to login
              this.handleUnauthorized();
            }
          } else {
            this.handleUnauthorized();
          }
        }
        return Promise.reject(error);
      }
    );
  }
  
  private handleUnauthorized(): void {
    // Clear tokens but DON'T redirect - let React Router handle navigation
    Cookies.remove('authToken');
    Cookies.remove('refreshToken');
    
    // Don't use window.location.href - it causes page reload in SPAs
    // The auth hooks will detect cleared tokens and update state accordingly
    console.log('🔒 ApiClient: Unauthorized, cleared tokens - auth system will handle navigation');
  }
  
  // HTTP method helpers
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response as T;
  }
  
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response as T;
  }
  
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response as T;
  }
  
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response as T;
  }
}

// Global API client instance
export const apiClient = new ApiClient();