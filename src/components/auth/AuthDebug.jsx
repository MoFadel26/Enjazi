import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import authConfig from '../../config/authConfig';

/**
 * AuthDebug - A component to display authentication state
 * Only visible in development mode for debugging
 */
const AuthDebug = () => {
  const { user, loading, isAuthenticated, error } = useAuth();

  // Only show in development with debugMode enabled
  if (process.env.NODE_ENV !== 'development' || !authConfig.debugMode) {
    return null;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        padding: '10px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        borderRadius: '5px',
        fontSize: '12px',
        maxWidth: '300px',
        zIndex: 9999
      }}
    >
      <div><strong>Auth Debug:</strong></div>
      <div>Auth enabled: {authConfig.enableAuth ? 'Yes' : 'No'}</div>
      <div>Loading: {loading ? 'Yes' : 'No'}</div>
      <div>Authenticated: {isAuthenticated() ? 'Yes' : 'No'}</div>
      <div>User: {user ? JSON.stringify(user) : 'None'}</div>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
    </div>
  );
};

export default AuthDebug; 