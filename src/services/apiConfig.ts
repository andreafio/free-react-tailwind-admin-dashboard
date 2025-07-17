import axios from 'axios';

// Use the environment variable for the API URL or fallback to a default
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Set base URL for all axios requests
axios.defaults.baseURL = API_URL;

// Configure axios defaults for CORS
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Add a request interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Verifica se la risposta contiene un log di debug
    if (typeof response.data === 'string' && response.data.includes('=== API RESPONSE ===')) {
      // Estrai solo la parte JSON dalla risposta
      const jsonStartIndex = response.data.lastIndexOf('===================\n') + 20;
      const jsonPart = response.data.substring(jsonStartIndex);
      
      try {
        // Parse della parte JSON
        response.data = JSON.parse(jsonPart);
      } catch (error) {
        console.error('Errore nel parsing della risposta JSON:', error);
      }
    }
    return response;
  },
  (error) => {
    // Handle errors like 401 (unauthenticated)
    if (error.response && error.response.status === 401) {
      // Clear storage and redirect to login
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

export default {
  apiUrl: API_URL,
  axios
};
