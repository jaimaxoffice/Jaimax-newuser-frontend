// AuthContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AuthUtils } from "../router/AuthUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authStatus = AuthUtils.isAuthenticated();
        const userData = AuthUtils.getUserData();
        setIsAuthenticated(authStatus);
        setUser(userData);
      } catch (error) {
        console.error("Error initializing auth:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = useCallback(async (token, userData) => {
    try {
      const success = AuthUtils.setAuthData(token, userData);
      if (success) {
        setIsAuthenticated(true);
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const success = AuthUtils.clearAuthData();
      setIsAuthenticated(false);
      setUser(null);
      return success;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  }, []);

  const refreshAuth = useCallback(() => {
    const authStatus = AuthUtils.isAuthenticated();
    const userData = AuthUtils.getUserData();
    setIsAuthenticated(authStatus);
    setUser(userData);
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      user,
      isLoading,
      login,
      logout,
      refreshAuth,
    }),
    [isAuthenticated, user, isLoading, login, logout, refreshAuth]
  );

  return (
    <AuthContext.Provider value={contextValue}>
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