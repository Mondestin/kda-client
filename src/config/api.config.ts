// API configuration
export const API_CONFIG = {
  BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  ENDPOINTS: {
    ROUTES: '/routes',
    USERS: '/users',
    TRIPS: '/trips',
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      RESET_PASSWORD: '/auth/reset-password',
    },
  },
  // Add request timeout in milliseconds
  TIMEOUT: 10000,
};