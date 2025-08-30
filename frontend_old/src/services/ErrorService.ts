// Error service for centralized error handling
import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export class ErrorService {
  // Single responsibility: Transform and handle API errors
  static handleApiError(error: unknown): ApiError {
    if (this.isAxiosError(error)) {
      const responseData = error.response?.data as any;
      return {
        message: responseData?.message || error.message || 'An unexpected error occurred',
        code: responseData?.code || error.code,
        status: error.response?.status,
        details: responseData?.details
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message,
        code: 'UNKNOWN_ERROR'
      };
    }

    return {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }

  // Type guard for Axios errors
  private static isAxiosError(error: unknown): error is AxiosError {
    return (error as AxiosError).isAxiosError === true;
  }

  // Format error for user display
  static formatErrorMessage(error: ApiError): string {
    if (error.status === 401) {
      return 'Authentication required. Please log in.';
    }
    if (error.status === 403) {
      return 'Access denied. You do not have permission to perform this action.';
    }
    if (error.status === 404) {
      return 'The requested resource was not found.';
    }
    if (error.status === 429) {
      return 'Too many requests. Please try again later.';
    }
    if (error.status && error.status >= 500) {
      return 'Server error. Please try again later.';
    }
    
    return error.message;
  }
}