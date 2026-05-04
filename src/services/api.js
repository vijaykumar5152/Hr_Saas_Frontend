import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🌐 API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔐 Request with token:', token.substring(0, 20) + '...');
    }
    console.log('📤 Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.status, error.response?.data);
    
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        console.log('🚪 Unauthorized - clearing auth');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      // Return error data with message property
      return Promise.reject({
        message: data?.message || data?.error || 'An error occurred',
        error: data?.error || data?.message || 'An error occurred',
        status: status
      });
    }
    
    console.error('❌ Network error:', error.message);
    return Promise.reject({
      message: error.message || 'Network error',
      error: error.message || 'Network error'
    });
  }
);

export default api;