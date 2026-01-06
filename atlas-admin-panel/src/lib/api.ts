// api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Accept: 'application/json',
  },
});

// Interceptor to manage headers for FormData
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']; // Allow axios to set the Content-Type for FormData
  }
  return config;
}, (error) => {
  // Handle error
  return Promise.reject(error);
});
export default api;
