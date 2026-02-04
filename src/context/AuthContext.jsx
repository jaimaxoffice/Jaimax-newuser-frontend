import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getAuthToken, getUserData, logout as authLogout, setAuthData } from "../utils/auth.utils";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const storedToken = getAuthToken();
      const storedUser = getUserData();
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (authToken, userData) => {
    setAuthData(authToken, userData);
    setToken(authToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    authLogout();
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!token;
  }, [token]);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;