import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://birii.onrender.com'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem('refresh_token')
      
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, {
            refresh: refreshToken
          })
          
          const { access } = response.data
          localStorage.setItem('access_token', access)
          originalRequest.headers.Authorization = `Bearer ${access}`
          return api(originalRequest)
        } catch (refreshError) {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          window.location.href = '/login'
        }
      }
    }

    return Promise.reject(error)
  }
)

// Error handler
export const handleApiError = (error) => {
  if (error.response) {
    const { status, data } = error.response
    
    switch (status) {
      case 400:
        return { message: data.detail || 'Invalid request', status }
      case 401:
        return { message: 'Authentication required', status }
      case 403:
        return { message: 'Access denied', status }
      case 404:
        return { message: 'Resource not found', status }
      case 500:
        return { message: 'Server error. Please try again later.', status }
      default:
        return { message: data.detail || 'An error occurred', status }
    }
  } else if (error.request) {
    return { message: 'Network error. Please check your connection.', status: 0 }
  } else {
    return { message: error.message || 'An unexpected error occurred', status: 0 }
  }
}

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login/', credentials),
  register: (userData) => api.post('/api/auth/register/', userData),
  getProfile: () => api.get('/api/auth/profile/'),
  updateProfile: (data) => api.patch('/api/auth/profile/', data),
}

export const itemsAPI = {
  getItems: (params = {}) => api.get('/api/items/', { params }),
  getItem: (id) => api.get(`/api/items/${id}/`),
  createItem: (data) => {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      if (key.startsWith('image') && data[key]?.[0]) {
        formData.append(key, data[key][0])
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key])
      }
    })
    return api.post('/api/items/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  updateItem: (id, data) => {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      if (key.startsWith('image') && data[key]?.[0]) {
        formData.append(key, data[key][0])
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key])
      }
    })
    return api.patch(`/api/items/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  deleteItem: (id) => api.delete(`/api/items/${id}/`),
  toggleFavorite: (id) => api.post(`/api/items/${id}/toggle-favorite/`),
}

export const categoriesAPI = {
  getCategories: () => api.get('/api/categories/'),
  getFeaturedItems: () => api.get('/api/items/?featured=true'),
}

export const conversationsAPI = {
  getConversations: () => api.get('/api/conversations/'),
  getConversation: (id) => api.get(`/api/conversations/${id}/`),
  createConversation: (data) => api.post('/api/conversations/', data),
}

export default api