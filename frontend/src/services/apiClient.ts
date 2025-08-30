import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

export class ApiClient {
  private axiosInstance: AxiosInstance;

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
      (config) => {
        // Get token from localStorage (Zustand persisted state)
        const authStorage = localStorage.getItem('chess-auth-storage');
        if (authStorage) {
          try {
            const parsed = JSON.parse(authStorage);
            if (parsed.state?.accessToken) {
              config.headers.Authorization = `Bearer ${parsed.state.accessToken}`;
            }
          } catch (error) {
            console.warn('Failed to parse auth storage:', error);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor - NO NAVIGATION (let React handle that)
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      async (error) => {
        if (error.response?.status === 401) {
          // Clear auth storage - Zustand will handle state updates
          localStorage.removeItem('chess-auth-storage');
          console.log('🔒 ApiClient: Unauthorized, cleared auth storage');
        }
        return Promise.reject(error);
      }
    );
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