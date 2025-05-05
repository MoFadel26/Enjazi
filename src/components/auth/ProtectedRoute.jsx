import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authConfig from '../../config/authConfig';

const ProtectedRoute = ({ children, requiredRole = null, routeType = 'user' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Check if protection is disabled via config
  const isProtectionDisabled = () => {
    // If auth is completely disabled
    if (!authConfig.enableAuth) return true;
    
    // Check specific route type protection
    if (routeType === 'admin' && !authConfig.adminRouteProtection) return true;
    if (routeType === 'user' && !authConfig.userRouteProtection) return true;
    
    return false;
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Skip auth check if protection is disabled
        if (isProtectionDisabled()) {
          if (authConfig.debugMode) console.log('Auth protection disabled, skipping check');
          setIsAuthenticated(true);
          setUserRole('admin'); // Auto-assign admin role when protection is disabled
          setIsLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies
        });

        if (response.ok) {
          const userData = await response.json();
          setIsAuthenticated(true);
          setUserRole(userData.role);
          if (authConfig.debugMode) console.log('Auth successful:', userData.role);
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
          if (authConfig.debugMode) console.log('Auth failed: Not authenticated');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Allow access if protection is disabled
  if (isProtectionDisabled()) {
    if (authConfig.debugMode) console.log('Protection disabled - granting access');
    return children;
  }

  // Handle unauthenticated users
  if (!isAuthenticated) {
    if (authConfig.debugMode) console.log('Redirecting to login: Not authenticated');
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Handle role requirements
  if (requiredRole && userRole !== requiredRole) {
    if (authConfig.debugMode) console.log(`Role mismatch: required=${requiredRole}, actual=${userRole}`);
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has correct role
  return children;
};

export default ProtectedRoute; 