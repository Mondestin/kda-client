import { api } from './api.service';
import { API_CONFIG } from '../config/api.config';
import { Trip } from '../types/api.types';

export const tripsService = {
  // Get user trips
  getUserTrips: () =>
    api.get<Trip[]>(API_CONFIG.ENDPOINTS.TRIPS),

  // Get trip by ID
  getTripById: (id: string) =>
    api.get<Trip>(`${API_CONFIG.ENDPOINTS.TRIPS}/${id}`),

  // Download trip ticket
  downloadTicket: (ticketNumber: string) =>
    api.get<Blob>(`${API_CONFIG.ENDPOINTS.TRIPS}/ticket/${ticketNumber}`, {
      responseType: 'blob'
    }),
};