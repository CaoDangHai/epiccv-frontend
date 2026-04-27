import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: Tự động đính kèm Token trước khi gửi request
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

// Tự động bắt lỗi 401 (Hết hạn Token) để văng ra trang Login
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Bỏ qua nếu URL chứa chữ /auth (vì đang ở luồng đăng nhập/đăng ký)
    const isAuthApi = error.config?.url?.includes("/auth/");

    if (error.response?.status === 401 && !isAuthApi) {
      localStorage.removeItem("access_token");
      window.location.href = "/sign-in";
    }
    return Promise.reject(error);
  }
);
