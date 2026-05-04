import api from './api';

const ENDPOINTS = {
  LIST: '/jobs',
  CREATE: '/jobs',
  GET: '/jobs',
  UPDATE: '/jobs',
  DELETE: '/jobs',
  CLOSE: '/jobs',
  STATS: '/jobs',
};

export const getJobs = async (params = {}) => {
  try {
    const response = await api.get(ENDPOINTS.LIST, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getJob = async (id) => {
  try {
    const response = await api.get(`${ENDPOINTS.GET}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getJobStats = async (id) => {
  try {
    const response = await api.get(`${ENDPOINTS.STATS}/${id}/stats`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createJob = async (data) => {
  try {
    const response = await api.post(ENDPOINTS.CREATE, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateJob = async (id, data) => {
  try {
    const response = await api.put(`${ENDPOINTS.UPDATE}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const closeJob = async (id) => {
  try {
    const response = await api.put(`${ENDPOINTS.CLOSE}/${id}/close`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await api.delete(`${ENDPOINTS.DELETE}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getJobs,
  getJob,
  getJobStats,
  createJob,
  updateJob,
  closeJob,
  deleteJob,
};
