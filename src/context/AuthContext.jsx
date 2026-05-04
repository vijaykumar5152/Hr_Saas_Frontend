import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      console.log('🔐 Login attempt:', credentials.email);
      const data = await authService.login(credentials);
      console.log('🔐 Login response:', data);
      
      if (!data || !data.token || !data.user) {
        throw new Error('Invalid response: missing token or user data');
      }
      
      // Ensure user object has all required fields
      const userData = {
        id: data.user.id,
        name: data.user.name || data.user.full_name,
        email: data.user.email,
        role: data.user.role,
        company_id: data.user.company_id
      };
      
      console.log('🔐 Storing token:', data.token?.substring(0, 20) + '...');
      console.log('🔐 Storing user:', userData);
      
      // Directly store to localStorage before state updates
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Verify storage
      console.log('✅ Verified token in localStorage:', localStorage.getItem('token')?.substring(0, 20) + '...');
      console.log('✅ Verified user in localStorage:', localStorage.getItem('user'));
      
      // Update state
      setToken(data.token);
      setUser(userData);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      console.error('❌ Login error:', err);
      const errorMessage = err?.message || err?.error || 'Login failed';
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      console.log('📝 Register attempt:', userData.email);
      const data = await authService.registerTeamMember(userData);
      console.log('📝 Register response:', data);
      
      if (!data || !data.token || !data.user) {
        throw new Error('Invalid response: missing token or user data');
      }
      
      // Ensure user object has all required fields
      const normalizedUser = {
        id: data.user.id,
        name: data.user.name || data.user.full_name,
        email: data.user.email,
        role: data.user.role,
        company_id: data.user.company_id
      };
      
      console.log('📝 Storing token:', data.token?.substring(0, 20) + '...');
      console.log('📝 Storing user:', normalizedUser);
      
      // Directly store to localStorage before state updates
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      
      // Verify storage
      console.log('✅ Verified token in localStorage:', localStorage.getItem('token')?.substring(0, 20) + '...');
      console.log('✅ Verified user in localStorage:', localStorage.getItem('user'));
      
      // Update state
      setToken(data.token);
      setUser(normalizedUser);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      console.error('❌ Register error:', err);
      const errorMessage = err?.message || err?.error || 'Register failed';
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    console.log('🚪 Logging out');
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token && !!user
  };

  console.log('🔄 Auth state updated:', { token: token?.substring(0, 20), user: user?.email, isAuthenticated: !!token && !!user });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};