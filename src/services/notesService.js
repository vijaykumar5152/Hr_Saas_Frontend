import api from './api';

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

  exportReport: async () => {
    const response = await api.get('/notes/export/report');
    return response.data;
  },
};

export default notesService;
