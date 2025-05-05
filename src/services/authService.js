/**
 * Auth Service
 * 
 * Centralized service for handling authentication operations
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * Check if user is authenticated
 * @returns {Promise<boolean>} True if authenticated
 */
export const isAuthenticated = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies
    });
    
    return response.ok;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
};

/**
 * Login user
 * @param {string} email User email
 * @param {string} password User password
 * @returns {Promise<Object>} User data on success
 */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Include cookies
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.error || 'Login failed');
    }
    
    return response.json();
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * Logout user
 * @returns {Promise<boolean>} True if logout successful
 */
export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies
    });
    
    return response.ok;
  } catch (error) {
    console.error('Logout failed:', error);
    return false;
  }
};

/**
 * Get current user data
 * @returns {Promise<Object>} User data
 */
export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies
    });
    
    if (!response.ok) {
      throw new Error('Failed to get user data');
    }
    
    return response.json();
  } catch (error) {
    console.error('Failed to get user data:', error);
    throw error;
  }
};

export default {
  isAuthenticated,
  login,
  logout,
  getCurrentUser,
}; 