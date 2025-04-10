import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050/api',
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mochago_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


// Automatically attach token to all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('mochago_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
