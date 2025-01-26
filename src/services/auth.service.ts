import { api } from './api.service';
import { API_CONFIG } from '../config/api.config';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const authService = {
  // Login user
  login: (email: string, password: string) =>
    api.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    }).then((response: { data: AuthResponse }) => {
      localStorage.setItem('authToken', response.data.token);
      return response;
    }),

  // Register user
  register: (name: string, email: string, password: string) =>
    api.post<AuthResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      name,
      email,
      password,
    }),

  // Reset password
  resetPassword: (email: string) =>
    api.post(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, { email }),

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  },
};