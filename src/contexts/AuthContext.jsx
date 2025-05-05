import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';
import authConfig from '../config/authConfig';

// Create context
const AuthContext = createContext(null);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load user on initial mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Skip if auth is disabled
        if (!authConfig.enableAuth) {
          setLoading(false);
          return;
        }

        const authenticated = await authService.isAuthenticated();
        if (authenticated) {
          try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
          } catch (userError) {
            // Handle case where we are authenticated but can't get user data
            console.error('Authenticated but failed to get user data:', userError);
            // Still consider it authenticated, just without user data
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        setError('Failed to authenticate user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await authService.login(email, password);
      setUser(userData);
      return userData;
    } catch (error) {
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Logout failed');
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    if (!authConfig.enableAuth) return true;
    return !!user;
  };

  // Check if user has a specific role
  const hasRole = (role) => {
    if (!authConfig.enableAuth) return true;
    return user && user.role === role;
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated,
    hasRole,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 