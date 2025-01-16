import { api } from './api.service';
import { API_CONFIG } from '../config/api.config';
import { Route } from '../types/api.types';

export const routesService = {
  // Get all routes between two cities
  getRoutes: (from: string, to: string, date: string) =>
    api.get<Route[]>(API_CONFIG.ENDPOINTS.ROUTES, { from, to, date }),

  // Get route by ID
  getRouteById: (id: string) =>
    api.get<Route>(`${API_CONFIG.ENDPOINTS.ROUTES}/${id}`),
};