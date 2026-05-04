import api from './api';

export const authService = {
  // Company registration
  registerCompany: async (userData) => {
    const response = await api.post('/auth/company/register', userData);
    console.log('📝 registerCompany response:', response.data);
    return response.data;
  },

  // Company login
  loginCompany: async (credentials) => {
    const response = await api.post('/auth/company/login', credentials);
    console.log('🔐 loginCompany response:', response.data);
    return response.data;
  },

  // Team member registration
  registerTeamMember: async (userData) => {
    console.log('📝 registerTeamMember request:', userData);
    const response = await api.post('/auth/register', userData);
    console.log('📝 registerTeamMember response:', response.data);
    return response.data;
  },

  // Team member login
  login: async (credentials) => {
    console.log('🔐 login request:', credentials.email);
    const response = await api.post('/auth/login', credentials);
    console.log('🔐 login response:', response.data);
    return response.data;
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    console.log('👤 getCurrentUser response:', response.data);
    return response.data;
  },

  // Get company profile
  getCompanyProfile: async () => {
    const response = await api.get('/auth/company/profile');
    console.log('🏢 getCompanyProfile response:', response.data);
    return response.data;
  },

  // Update company profile
  updateCompanyProfile: async (profileData) => {
    const response = await api.put('/auth/company/profile', profileData);
    console.log('📝 updateCompanyProfile response:', response.data);
    return response.data;
  },

  logout: () => {
    console.log('🚪 logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Dashboard Service
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

// Notes Service
export const notesService = {
  createNote: async (data) => {
    const response = await api.post('/notes', data);
    return response.data;
  },

  getCandidateNotes: async (candidateId) => {
    const response = await api.get(`/notes/candidate/${candidateId}`);
    return response.data;
  },

  getCandidateRating: async (candidateId) => {
    const response = await api.get(`/notes/candidate/${candidateId}/rating`);
    return response.data;
  },

  updateNote: async (id, data) => {
    const response = await api.put(`/notes/${id}`, data);
    return response.data;
  },

  deleteNote: async (id) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};

// Interview Service
export const interviewService = {
  scheduleInterview: async (data) => {
    const response = await api.post('/interviews', data);
    return response.data;
  },

  getInterviews: async (params = {}) => {
    const response = await api.get('/interviews', { params });
    return response.data;
  },

  getInterview: async (id) => {
    const response = await api.get(`/interviews/${id}`);
    return response.data;
  },

  updateInterview: async (id, data) => {
    const response = await api.put(`/interviews/${id}`, data);
    return response.data;
  },

  completeInterview: async (id, data) => {
    const response = await api.put(`/interviews/${id}/complete`, data);
    return response.data;
  },

  cancelInterview: async (id) => {
    const response = await api.put(`/interviews/${id}/cancel`);
    return response.data;
  },
};

// Team Service
export const teamService = {
  getTeamMembers: async () => {
    const response = await api.get('/team/members');
    return response.data;
  },

  getTeamMember: async (id) => {
    const response = await api.get(`/team/members/${id}`);
    return response.data;
  },

  updateTeamMember: async (id, data) => {
    const response = await api.put(`/team/members/${id}`, data);
    return response.data;
  },

  removeTeamMember: async (id) => {
    const response = await api.delete(`/team/members/${id}`);
    return response.data;
  },
};

// Subscription Service
export const subscriptionService = {
  getPlans: async () => {
    const response = await api.get('/subscriptions/plans');
    return response.data;
  },

  getCurrentSubscription: async () => {
    const response = await api.get('/subscriptions/current');
    return response.data;
  },

  upgradePlan: async (planId) => {
    const response = await api.post('/subscriptions/upgrade', { plan_id: planId });
    return response.data;
  },

  cancelSubscription: async () => {
    const response = await api.post('/subscriptions/cancel');
    return response.data;
  },

  getInvoices: async () => {
    const response = await api.get('/subscriptions/invoices');
    return response.data;
  },
};

// Jobs Service
export const jobService = {
  getAll: async () => {
    const response = await api.get('/jobs');
    return response.data;
  },

  create: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  update: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },
};

// Candidates Service
export const candidateService = {
  getAll: async () => {
    const response = await api.get('/candidates');
    return response.data;
  },

  create: async (candidateData) => {
    const response = await api.post('/candidates', candidateData);
    return response.data;
  },

  update: async (id, candidateData) => {
    const response = await api.put(`/candidates/${id}`, candidateData);
    return response.data;
  },

  updateStage: async (id, stage) => {
    const response = await api.put(`/candidates/${id}`, { stage });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/candidates/${id}`);
    return response.data;
  },
};