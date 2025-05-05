/**
 * Authentication Configuration
 * 
 * This file controls authentication settings for the application.
 * Toggle flags to enable/disable authentication checks during development.
 * 
 * In production, all authentication should be enabled.
 */

const authConfig = {
  // Master toggle for all authentication
  // Set to true to enable auth checks during development
  // Use environment variable REACT_APP_DISABLE_AUTH=true to disable auth
  enableAuth: process.env.NODE_ENV === 'production' || process.env.REACT_APP_DISABLE_AUTH !== 'true',
  
  // Specific feature toggles (only used if enableAuth is true)
  adminRouteProtection: true,
  userRouteProtection: true,
  
  // Public routes that don't require authentication
  publicRoutes: ['/', '/login', '/signup', '/forgot-password', '/reset-password'],
  
  // Debug helpers
  debugMode: process.env.NODE_ENV === 'development', // Enable logs in development
};

export default authConfig; 