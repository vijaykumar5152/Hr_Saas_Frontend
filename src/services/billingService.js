import api from './api';

const BILLING_ENDPOINTS = {
  LIST: '/billing',
  CREATE: '/billing',
  GET: '/billing',
  UPDATE: '/billing',
  DELETE: '/billing',
  INVOICE: '/billing/invoices',
};

// Get all billing records
export const getBillingRecords = async (params = {}) => {
  try {
    const response = await api.get(BILLING_ENDPOINTS.LIST, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single billing record
export const getBillingRecord = async (id) => {
  try {
    const response = await api.get(`${BILLING_ENDPOINTS.GET}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new billing record
export const createBillingRecord = async (data) => {
  try {
    const response = await api.post(BILLING_ENDPOINTS.CREATE, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update billing record
export const updateBillingRecord = async (id, data) => {
  try {
    const response = await api.put(`${BILLING_ENDPOINTS.UPDATE}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete billing record
export const deleteBillingRecord = async (id) => {
  try {
    const response = await api.delete(`${BILLING_ENDPOINTS.DELETE}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get invoices
export const getInvoices = async (params = {}) => {
  try {
    const response = await api.get(BILLING_ENDPOINTS.INVOICE, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Download invoice
export const downloadInvoice = async (invoiceId) => {
  try {
    const response = await api.get(`${BILLING_ENDPOINTS.INVOICE}/${invoiceId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getBillingRecords,
  getBillingRecord,
  createBillingRecord,
  updateBillingRecord,
  deleteBillingRecord,
  getInvoices,
  downloadInvoice,
};
