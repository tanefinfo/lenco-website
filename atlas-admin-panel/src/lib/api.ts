// api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  return config;
});
