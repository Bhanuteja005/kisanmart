import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        setUser(user);
      }
    } catch (error) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      
      if (response?.data?.token) {
        // Validate user data before storing
        if (!response.data.user?.id || !response.data.user?.email) {
          throw new Error('Invalid user data received');
        }
  
        const minimalUserData = {
          id: response.data.user.id,
          email: response.data.user.email,
          role: response.data.user.role || 'user'
        };
  
        try {
          // Clear and set new data
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          localStorage.setItem('auth_token', response.data.token);
          localStorage.setItem('user', JSON.stringify(minimalUserData));
        } catch (storageError) {
          console.error('Storage error:', storageError);
          // Handle QuotaExceededError
          if (storageError.name === 'QuotaExceededError') {
            localStorage.clear();
            localStorage.setItem('auth_token', response.data.token);
            localStorage.setItem('user', JSON.stringify(minimalUserData));
          }
        }
  
        setUser(minimalUserData);
        return { success: true };
      }
      return { 
        success: false, 
        error: 'Invalid server response' 
      };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message 
        || (error.message === 'Network Error' 
            ? 'Unable to connect to server' 
            : 'Login failed');
      return { success: false, error: errorMessage };
    }
  };
  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
      toast.success('Logged out successfully');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
