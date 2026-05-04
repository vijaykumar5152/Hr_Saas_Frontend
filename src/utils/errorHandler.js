import api from './api';

// Error logging utility
export const logError = (error, context = '') => {
  const errorData = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    url: window.location.href,
  };

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('Error:', errorData);
  }

  // Send to backend/monitoring service in production
  if (import.meta.env.PROD) {
    try {
      // Uncomment when backend logging endpoint is ready
      // api.post('/logs', errorData);
    } catch (err) {
      console.error('Failed to log error:', err);
    }
  }
};

// Centralized API error handler
export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        return data.message || 'Invalid request';
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'You do not have permission to perform this action';
      case 404:
        return 'Resource not found';
      case 409:
        return data.message || 'Conflict in request';
      case 422:
        return data.message || 'Validation error';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      default:
        return data.message || defaultMessage;
    }
  } else if (error.request) {
    // Request made but no response
    return 'No response from server. Please check your connection.';
  } else {
    // Error in request setup
    return error.message || defaultMessage;
  }
};

// Retry logic for failed API calls
export const retryWithBackoff = async (
  fn,
  maxRetries = 3,
  backoffDelay = 1000
) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      const delay = backoffDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

export default {
  logError,
  handleApiError,
  retryWithBackoff,
};
