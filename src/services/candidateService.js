import api from './api';

const ENDPOINTS = {
  LIST: '/candidates',
  CREATE: '/candidates',
  GET: '/candidates',
  UPDATE: '/candidates',
  DELETE: '/candidates',
};

export const getCandidates = async (params = {}) => {
  try {
    const response = await api.get(ENDPOINTS.LIST, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCandidate = async (id) => {
  try {
    const response = await api.get(`${ENDPOINTS.GET}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCandidate = async (data) => {
  try {
    const response = await api.post(ENDPOINTS.CREATE, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCandidate = async (id, data) => {
  try {
    const response = await api.put(`${ENDPOINTS.UPDATE}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCandidateStage = async (id, stage) => {
  try {
    const response = await api.put(`${ENDPOINTS.UPDATE}/${id}/stage`, { stage });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCandidate = async (id) => {
  try {
    const response = await api.delete(`${ENDPOINTS.DELETE}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getCandidates,
  getCandidate,
  createCandidate,
  updateCandidate,
  updateCandidateStage,
  deleteCandidate,
};
