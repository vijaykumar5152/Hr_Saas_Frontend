import api from './api';

const ENDPOINTS = {
  LIST: '/team',
  CREATE: '/team',
  GET: '/team',
  UPDATE: '/team',
  DELETE: '/team',
};

export const getTeamMembers = async (params = {}) => {
  try {
    const response = await api.get(ENDPOINTS.LIST, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTeamMember = async (id) => {
  try {
    const response = await api.get(`${ENDPOINTS.GET}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTeamMember = async (data) => {
  try {
    const response = await api.post(ENDPOINTS.CREATE, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTeamMember = async (id, data) => {
  try {
    const response = await api.put(`${ENDPOINTS.UPDATE}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTeamMember = async (id) => {
  try {
    const response = await api.delete(`${ENDPOINTS.DELETE}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (data) => {
  try {
    const response = await api.post('/team/change-password', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  changePassword,
};
