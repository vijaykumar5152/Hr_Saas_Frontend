import api from './api';

export const subscriptionService = {
  // Get all subscription plans
  getPlans: async () => {
    const response = await api.get('/subscriptions/plans');
    return response.data;
  },

  // Get current active subscription
  getCurrentSubscription: async () => {
    const response = await api.get('/subscriptions/current');
    return response.data;
  },

  // Get subscription features for current plan
  getSubscriptionFeatures: async () => {
    const response = await api.get('/subscriptions/features');
    return response.data;
  },

  // Get billing history
  getBillingHistory: async (params = {}) => {
    const response = await api.get('/subscriptions/billing/history', { params });
    return response.data;
  },

  // Get all invoices
  getInvoices: async (params = {}) => {
    const response = await api.get('/subscriptions/invoices', { params });
    return response.data;
  },

  // Get single invoice by ID
  getInvoiceById: async (id) => {
    const response = await api.get(`/subscriptions/invoices/${id}`);
    return response.data;
  },

  // Create new invoice
  createInvoice: async (data) => {
    const response = await api.post('/subscriptions/invoices', data);
    return response.data;
  },

  // Update invoice status
  updateInvoiceStatus: async (id, data) => {
    const response = await api.put(`/subscriptions/invoices/${id}`, data);
    return response.data;
  },

  // Upgrade subscription to a different plan
  upgradePlan: async (data) => {
    const response = await api.post('/subscriptions/upgrade', data);
    return response.data;
  },

  // Cancel current subscription
  cancelSubscription: async () => {
    const response = await api.post('/subscriptions/cancel');
    return response.data;
  },
};

export default subscriptionService;
