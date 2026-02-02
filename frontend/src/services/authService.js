import api from './api';

export const authService = {
  // Register new user
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout user (clears refresh token cookie)
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Continue with local logout even if API call fails
      console.error('Logout API error:', error);
    }
  },

  // Refresh access token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh-token');
    return response.data;
  },

  // Get profile
  getProfile: async () => {
    const response = await api.get('/me');
    return response.data;
  },

  // Update profile
  updateProfile: async (data) => {
    const response = await api.put('/me', data);
    return response.data;
  },
};

export default authService;
