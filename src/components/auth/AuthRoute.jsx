import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authConfig from '../../config/authConfig';
import { useAuth } from '../../contexts/AuthContext';

/**
 * AuthRoute - Navigation guard to protect internal routes from guest users
 * 
 * This component redirects unauthenticated users to the login page
 * when they try to access any internal route that requires authentication.
 */
const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Log authentication state in debug mode
    if (authConfig.debugMode) {
      console.log('AuthRoute check:', { 
        path: location.pathname,
        isAuthed: isAuthenticated(),
        loading,
        user: user ? 'Present' : 'None',
        authEnabled: authConfig.enableAuth
      });
    }
  }, [location.pathname, isAuthenticated, loading, user]);

  // Check if current path is a public route (doesn't require auth)
  const isPublicRoute = () => {
    return authConfig.publicRoutes.some(route => {
      if (route === location.pathname) return true;
      // Check for pattern matches (e.g., '/reset-password/:token')
      if (route.includes(':') && location.pathname.startsWith(route.split(':')[0])) return true;
      return false;
    });
  };

  // Skip auth check if auth is disabled in config
  const isAuthDisabled = () => !authConfig.enableAuth;

  // Show loading spinner while checking auth
  if (loading && !isPublicRoute() && !isAuthDisabled()) {
    if (authConfig.debugMode) console.log('AuthRoute: Loading state');
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Allow access if auth is disabled or it's a public route
  if (isAuthDisabled()) {
    if (authConfig.debugMode) console.log('AuthRoute: Auth disabled');
    return children;
  }

  if (isPublicRoute()) {
    if (authConfig.debugMode) console.log('AuthRoute: Public route');
    return children;
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated()) {
    if (authConfig.debugMode) {
      console.log('AuthRoute: Redirecting to login - Not authenticated', { path: location.pathname });
    }
    // Pass the current location in state to redirect back after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // User is authenticated, render the protected route
  if (authConfig.debugMode) console.log('AuthRoute: Authenticated, rendering children');
  return children;
};

export default AuthRoute; 