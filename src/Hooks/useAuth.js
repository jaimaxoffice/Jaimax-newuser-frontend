// hooks/useAuth.js
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('authToken', null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  // Login
  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [setUser, setToken]);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    navigate('/login');
  }, [setUser, setToken, navigate]);

  // Update user profile
  const updateUser = useCallback((updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  }, [setUser]);

  // Check token validity on mount
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const response = await fetch('/api/auth/validate', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            logout();
          }
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    validateToken();
  }, [token, logout]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  };
};