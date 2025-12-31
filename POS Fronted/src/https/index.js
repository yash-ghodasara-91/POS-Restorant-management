import axios from "axios";

// 🔥 LIVE BACKEND URL (DIRECT FIX)
const BASE_URL = ["https://pos-restorant-management.onrender.com", "http://localhost:8000"];

const api = axios.create({
  baseURL: BASE_URL,          // ✅ yahin fix
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// API Endpoints
export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = () => api.get("/api/user");
export const logout = () => api.post("/api/user/logout");
