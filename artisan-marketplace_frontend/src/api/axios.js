import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token automatically (ONLY if exists)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (
      token &&
      !config.url.includes("/auth/login") &&
      !config.url.includes("/auth/google")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
