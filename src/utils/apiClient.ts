import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthApi = error.config?.url?.includes("/auth/");

    if (error.response?.status === 401 && !isAuthApi) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_info");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);
