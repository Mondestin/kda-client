import { api } from './api.service';
import { API_CONFIG } from '../config/api.config';
import { User } from '../types/api.types';

export const usersService = {
  // Get current user profile
  getCurrentUser: () =>
    api.get<User>(API_CONFIG.ENDPOINTS.USERS + '/me'),

  // Update user profile
  updateProfile: (data: Partial<User>) =>
    api.put<User>(API_CONFIG.ENDPOINTS.USERS + '/me', data),

  // Update profile image
  updateProfileImage: (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    return api.post<{ imageUrl: string }>(
      API_CONFIG.ENDPOINTS.USERS + '/me/image',
      formData
    );
  },
};