import axios from 'axios';

// Use environment variable with fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://154.61.80.166:5000';

// Base API configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 15000, // 15 second timeout
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (credentials) => {
    try {
      // Use proxy URL in production
      const loginUrl = process.env.NODE_ENV === 'production' 
        ? '/api/admin/login'
        : `${API_BASE_URL}/api/admin/login`;

      const response = await axios({
        method: 'POST',
        url: loginUrl,
        data: credentials,
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      return response.data;
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data
      });
      
      // Enhanced error handling
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Connection failed. Please check your internet connection.');
      }
      if (error.response?.status === 401) {
        throw new Error('Invalid credentials');
      }
      throw error;
    }
  },
  register: (data) => api.post('/api/admin/create', data),
  logout: () => api.post('/api/admin/logout'),
};

export const productsAPI = {
  getAll: () => api.get('/api/products'),
  getById: (id) => api.get(`/api/products/${id}`),
  create: (data) => api.post('/api/products', data),
  update: (id, data) => api.put(`/api/products/${id}`, data),
  delete: (id) => api.delete(`/api/products/${id}`),
};

export const categoriesAPI = {
  getAll: () => api.get('/api/categories'),
  getById: (id) => api.get(`/api/categories/${id}`),
  create: (data) => api.post('/api/categories', data),
  update: (id, data) => api.put(`/api/categories/${id}`),
  delete: (id) => api.delete(`/api/categories/${id}`),
  getSubcategories: (categoryId) => api.get(`/api/categories/${categoryId}/subcategories`),
};

export const subcategoriesAPI = {
  getAll: () => api.get('/api/subcategories'),
  getById: (id) => api.get(`/api/subcategories/${id}`),
  create: (data) => api.post('/api/subcategories', data),
  update: (id, data) => api.put(`/api/subcategories/${id}`),
  delete: (id) => api.delete(`/api/subcategories/${id}`),
};

export const dealersAPI = {
  getAll: () => api.get('/api/dealers'),
  getById: (id) => api.get(`/api/dealers/${id}`),
  create: (data) => api.post('/api/dealers', data),
  update: (id, data) => api.put(`/api/dealers/${id}`),
  delete: (id) => api.delete(`/api/dealers/${id}`)
};

export const customersAPI = {
  getAll: () => api.get('/api/customers'),
  getById: (id) => api.get(`/api/customers/${id}`),
  create: (data) => api.post('/api/customers', data),
  update: (id, data) => api.put(`/api/customers/${id}`),
  delete: (id) => api.delete(`/api/customers/${id}`),
};

export const staffAPI = {
  getAll: () => api.get('/api/staff'),
  getById: (id) => api.get(`/api/staff/${id}`),
  create: (data) => api.post('/api/staff', data),
  update: (id, data) => api.put(`/api/staff/${id}`),
  delete: (id) => api.delete(`/api/staff/${id}`),
};

export default api;
