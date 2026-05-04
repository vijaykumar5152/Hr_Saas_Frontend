import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';

const ProtectedRoute = () => {
  const { user, token, isAuthenticated } = useAuth();
  
  console.log('🛡️ ProtectedRoute check:', {
    isAuthenticated,
    hasToken: !!token,
    hasUser: !!user,
    tokenPreview: token?.substring(0, 20),
    userEmail: user?.email
  });

  // Show loader while checking authentication
  if (token === undefined || user === undefined) {
    console.log('⏳ ProtectedRoute: Checking auth...');
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated || !user || !token) {
    console.log('❌ ProtectedRoute: Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('✅ ProtectedRoute: Authenticated, allowing access');
  return <Outlet />;
};

export default ProtectedRoute;
