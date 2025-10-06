import { API_CONFIG } from './config';
import type { ApiError, ApiResponse } from './types';

class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.defaultTimeout = API_CONFIG.timeout;
  }

  private buildURL(endpoint: string, params?: Record<string, any>): string {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    const fullURL = `${this.baseURL}/${cleanEndpoint}`;
    const url = new URL(fullURL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    let data: T;

    try {
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = (await response.text()) as unknown as T;
      }
    } catch (error) {
      throw new Error('Failed to parse response data');
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  }

  private createApiError(error: any, response?: Response): ApiError {
    if (response) {
      return {
        message: `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
        code: response.status.toString(),
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message,
        code: 'NETWORK_ERROR',
      };
    }

    return {
      message: 'An unknown error occurred',
      code: 'UNKNOWN_ERROR',
    };
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = this.buildURL(endpoint, params);
    console.log('API Request URL:', url); // Debug log
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.defaultTimeout);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw this.createApiError(new Error('Request timeout'), undefined);
      }
      throw this.createApiError(error);
    }
  }
}

export const apiClient = new ApiClient();
