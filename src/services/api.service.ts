import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_CONFIG } from '../config/api.config';

// Create a custom error class for API errors
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Create and configure Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Handle unauthorized (e.g., redirect to login)
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
      }

      throw new ApiError(
        error.response.status,
        error.response.data?.message || 'An error occurred',
        error.response.data
      );
    }
    
    throw new ApiError(500, 'Network error occurred');
  }
);

// Generic API methods
export const api = {
  get: <T>(url: string, params?: any) => 
    apiClient.get<T>(url, { params }).then(response => response.data),
    
  post: <T>(url: string, data: any) =>
    apiClient.post<T>(url, data).then(response => response.data),
    
  put: <T>(url: string, data: any) =>
    apiClient.put<T>(url, data).then(response => response.data),
    
  delete: <T>(url: string) =>
    apiClient.delete<T>(url).then(response => response.data),
};