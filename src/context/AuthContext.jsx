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

  const register = async (userData) => {
    try {
      const response = await authAPI.register({
        ...userData,
        permissions: {
          read: true,
          write: true,
          delete: false // Sub-admins cannot delete
        }
      });

      if (response.data?.success) {
        return { success: true };
      }
      return { 
        success: false, 
        error: response.data?.message || 'Registration failed' 
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message === 'Network Error' 
          ? 'Unable to connect to server. Please check your internet connection.' 
          : error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      console.log('Login response:', response);
      
      if (response && response.token) {
        const userData = {
          email: response.email,
          name: response.name,
          role: response.role
        };

        // Store auth data
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        return { success: true };
      }
      return { 
        success: false, 
        error: response?.message || 'Invalid response from server' 
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message === 'Network Error' 
          ? 'Unable to connect to server. Please check your internet connection.' 
          : error.response?.data?.message || 'Login failed'
      };
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
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
