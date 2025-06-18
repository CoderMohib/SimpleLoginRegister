import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await axios.post(
            "http://localhost:3000/api/refresh",
            { refreshToken: refreshToken }
          );
          const newAccessToken = response.data.accessToken;
          setToken(newAccessToken);
          localStorage.setItem("token", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (tokenRefreshError) {
          logout();
          console.error("Token refresh failed", tokenRefreshError);
          return Promise.reject(tokenRefreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  const login = (newToken, refreshToken) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", refreshToken);
    setToken(newToken);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setRefreshToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, refreshToken, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
