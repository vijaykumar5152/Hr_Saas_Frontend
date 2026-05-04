import api from './api';

export const interviewService = {
  // Schedule a new interview
  scheduleInterview: async (data) => {
    const response = await api.post('/interviews', data);
    return response.data;
  },

  // Get all interviews with optional filters
  getInterviews: async (params = {}) => {
    const response = await api.get('/interviews', { params });
    return response.data;
  },

  // Get today's interviews
  getTodayInterviews: async (params = {}) => {
    const response = await api.get('/interviews/today', { params });
    return response.data;
  },

  // Get upcoming interviews
  getUpcomingInterviews: async (params = {}) => {
    const response = await api.get('/interviews/upcoming', { params });
    return response.data;
  },

  // Get interview by ID
  getInterview: async (id) => {
    const response = await api.get(`/interviews/${id}`);
    return response.data;
  },

  // Update interview details
  updateInterview: async (id, data) => {
    const response = await api.put(`/interviews/${id}`, data);
    return response.data;
  },

  // Add feedback to an interview
  addFeedback: async (id, data) => {
    const response = await api.put(`/interviews/${id}/feedback`, data);
    return response.data;
  },

  // Cancel an interview
  cancelInterview: async (id) => {
    const response = await api.put(`/interviews/${id}/cancel`);
    return response.data;
  },

  // Reschedule an interview (alternative method)
  rescheduleInterview: async (id, data) => {
    const response = await api.put(`/interviews/${id}`, { ...data, action: 'reschedule' });
    return response.data;
  },
};

export default interviewService;
