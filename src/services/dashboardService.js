import api from './api';

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  getDetailed: async () => {
    const response = await api.get('/dashboard/detailed');
    return response.data;
  },
};

export default dashboardService;
