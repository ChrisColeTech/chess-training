import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { storageUtils } from './storage/crossPlatformStorage';

// API Error types for consistent error handling (DRY principle)
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  data?: any;
}

export class ApiError extends Error {
  public status?: number;
  public code?: string;
  public data?: any;
  
  constructor(
    message: string,
    status?: number,
    code?: string,
    data?: any
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

// Cache interface for request caching (DRY principle)
interface CachedResponse<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

export class ApiClient {
  private axiosInstance: AxiosInstance;
  private cache = new Map<string, CachedResponse<any>>(); // DRY: Centralized caching

  constructor() {
    // Research-compliant axios setup 
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    this.setupInterceptors();
  }
  
  // Research-compliant interceptors
  private setupInterceptors(): void {
    // Request interceptor for auth token
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // Get token from cross-platform storage
        try {
          const tokens = await storageUtils.getAuthTokens();
          if (tokens?.accessToken) {
            config.headers.Authorization = `Bearer ${tokens.accessToken}`;
          }
        } catch (error) {
          console.warn('Failed to get auth tokens for request:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor with enhanced error handling (DRY principle)
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      async (error) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
          await storageUtils.clearAllAuth();
          console.log('🔒 ApiClient: Unauthorized, cleared auth storage');
          throw new ApiError('Authentication required', 401, 'UNAUTHORIZED');
        }

        // Handle 403 Forbidden  
        if (error.response?.status === 403) {
          throw new ApiError('Access denied', 403, 'FORBIDDEN');
        }

        // Handle 404 Not Found
        if (error.response?.status === 404) {
          throw new ApiError('Resource not found', 404, 'NOT_FOUND');
        }

        // Handle 500 Server Error
        if (error.response?.status >= 500) {
          throw new ApiError('Server error occurred', error.response.status, 'SERVER_ERROR');
        }

        // Handle network errors
        if (!error.response) {
          throw new ApiError('Network error - please check your connection', 0, 'NETWORK_ERROR');
        }

        // Default error handling
        const message = error.response?.data?.error || error.message || 'An error occurred';
        throw new ApiError(message, error.response?.status, 'API_ERROR', error.response?.data);
      }
    );
  }
  
  // Cache management (DRY principle - centralized caching)
  private getCachedResponse<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() < cached.expiry) {
      return cached.data;
    }
    // Clean expired cache entry
    if (cached) {
      this.cache.delete(key);
    }
    return null;
  }

  private setCachedResponse<T>(key: string, data: T, ttl = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    });
  }

  // Retry logic with exponential backoff (DRY principle)
  private async withRetry<T>(
    operation: () => Promise<T>,
    retries = 3,
    delay = 1000
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0 && error instanceof ApiError && 
          (error.code === 'NETWORK_ERROR' || error.status === 429)) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.withRetry(operation, retries - 1, delay * 2);
      }
      throw error;
    }
  }

  // HTTP method helpers with caching and retry (DRY principle)
  async get<T>(url: string, config?: AxiosRequestConfig & { cache?: boolean, cacheTTL?: number }): Promise<T> {
    const cacheKey = `GET:${url}:${JSON.stringify(config?.params || {})}`;
    
    // Check cache if enabled
    if (config?.cache !== false) {
      const cached = this.getCachedResponse<T>(cacheKey);
      if (cached) return cached;
    }

    const response = await this.withRetry(async () => {
      const result = await this.axiosInstance.get<T>(url, config);
      return result as T;
    });

    // Cache response if enabled
    if (config?.cache !== false) {
      this.setCachedResponse(cacheKey, response, config?.cacheTTL);
    }

    return response;
  }
  
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.withRetry(async () => {
      const result = await this.axiosInstance.post<T>(url, data, config);
      return result as T;
    });
    return response;
  }
  
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.withRetry(async () => {
      const result = await this.axiosInstance.put<T>(url, data, config);
      return result as T;
    });
    return response;
  }
  
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.withRetry(async () => {
      const result = await this.axiosInstance.delete<T>(url, config);
      return result as T;
    });
    return response;
  }

  // Utility methods for specialized clients (DRY principle)
  public clearCache(): void {
    this.cache.clear();
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      const tokens = await storageUtils.getAuthTokens();
      return !!(tokens?.accessToken && tokens?.refreshToken);
    } catch {
      return false;
    }
  }
}

// Global API client instance
export const apiClient = new ApiClient();