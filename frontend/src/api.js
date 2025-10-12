import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    // Skip authentication for registration and login endpoints
    const skipAuth =
      config.url?.includes("/api/user/register/") ||
      config.url?.includes("/api/token/");

    if (!skipAuth) {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    console.log(import.meta.env.VITE_API_BASE_URL);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
