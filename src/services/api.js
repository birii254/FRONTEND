import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://birii.onrender.com'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle 401 errors (unauthorized)
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
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`
          return api(originalRequest)
        } catch (refreshError) {
          // Refresh failed, logout user
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      } else {
        // No refresh token, redirect to login
        window.location.href = '/login'
      }
    }

    // Handle network errors gracefully
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.warn('Network error detected, API might be unavailable')
      // You can show a toast notification here
    }

    return Promise.reject(error)
  }
)

// Authentication API
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login/', credentials),
  register: (userData) => {
    const formData = new FormData()
    Object.keys(userData).forEach(key => {
      if (userData[key] !== null && userData[key] !== undefined) {
        formData.append(key, userData[key])
      }
    })
    return api.post('/api/auth/register/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  refreshToken: (refreshToken) => api.post('/api/auth/token/refresh/', { refresh: refreshToken }),
  getProfile: () => api.get('/api/auth/profile/'),
  updateProfile: (data) => {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key])
      }
    })
    return api.patch('/api/auth/profile/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  changePassword: (data) => api.post('/api/auth/change-password/', data),
  resetPassword: (email) => api.post('/api/auth/password-reset/', { email }),
}

// Items API
export const itemsAPI = {
  getItems: (params = {}) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    )
    return api.get('/api/items/', { params: cleanParams })
  },
  getItem: (id) => api.get(`/api/items/${id}/`),
  createItem: (data) => {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        if (key.startsWith('image') && data[key] instanceof FileList) {
          if (data[key].length > 0) {
            formData.append(key, data[key][0])
          }
        } else if (key.startsWith('image') && data[key] instanceof File) {
          formData.append(key, data[key])
        } else {
          formData.append(key, data[key])
        }
      }
    })
    return api.post('/api/items/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  updateItem: (id, data) => {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        if (key.startsWith('image') && data[key] instanceof FileList) {
          if (data[key].length > 0) {
            formData.append(key, data[key][0])
          }
        } else if (key.startsWith('image') && data[key] instanceof File) {
          formData.append(key, data[key])
        } else {
          formData.append(key, data[key])
        }
      }
    })
    return api.patch(`/api/items/${id}/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  deleteItem: (id) => api.delete(`/api/items/${id}/`),
  toggleFavorite: (id) => api.post(`/api/items/${id}/toggle-favorite/`),
  getRelatedItems: (id) => api.get(`/api/items/${id}/related/`),
  getFeaturedItems: () => api.get('/api/items/featured/'),
  getUserItems: (userId) => api.get(`/api/items/user/${userId}/`),
}

// Categories API
export const categoriesAPI = {
  getCategories: () => api.get('/api/categories/'),
  getCategory: (id) => api.get(`/api/categories/${id}/`),
  getFeaturedItems: () => api.get('/api/items/featured/'),
}

// Conversations API
export const conversationsAPI = {
  getConversations: () => api.get('/api/conversations/'),
  getConversation: (id) => api.get(`/api/conversations/${id}/`),
  createConversation: (data) => api.post('/api/conversations/', data),
  sendMessage: (conversationId, data) => api.post(`/api/conversations/${conversationId}/messages/`, data),
  getMessages: (conversationId) => api.get(`/api/conversations/${conversationId}/messages/`),
  markAsRead: (conversationId) => api.post(`/api/conversations/${conversationId}/mark-read/`),
}

// Search API
export const searchAPI = {
  search: (query, filters = {}) => api.get('/api/search/', { 
    params: { q: query, ...filters } 
  }),
  getSuggestions: (query) => api.get('/api/search/suggestions/', { 
    params: { q: query } 
  }),
}

// Notifications API
export const notificationsAPI = {
  getNotifications: () => api.get('/api/notifications/'),
  markAsRead: (id) => api.patch(`/api/notifications/${id}/`, { is_read: true }),
  markAllAsRead: () => api.post('/api/notifications/mark-all-read/'),
}

// Reviews API
export const reviewsAPI = {
  getReviews: (itemId) => api.get(`/api/items/${itemId}/reviews/`),
  createReview: (itemId, data) => api.post(`/api/items/${itemId}/reviews/`, data),
  updateReview: (reviewId, data) => api.patch(`/api/reviews/${reviewId}/`, data),
  deleteReview: (reviewId) => api.delete(`/api/reviews/${reviewId}/`),
}

// Analytics API (for sellers)
export const analyticsAPI = {
  getDashboardStats: () => api.get('/api/analytics/dashboard/'),
  getItemStats: (itemId) => api.get(`/api/analytics/items/${itemId}/`),
  getSalesData: (period = '30d') => api.get('/api/analytics/sales/', { params: { period } }),
}

// Utility function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response
    
    switch (status) {
      case 400:
        return { message: 'Invalid request. Please check your input.', details: data }
      case 401:
        return { message: 'Authentication required. Please log in.', details: data }
      case 403:
        return { message: 'Access denied. You don\'t have permission.', details: data }
      case 404:
        return { message: 'Resource not found.', details: data }
      case 429:
        return { message: 'Too many requests. Please try again later.', details: data }
      case 500:
        return { message: 'Server error. Please try again later.', details: data }
      default:
        return { message: 'An unexpected error occurred.', details: data }
    }
  } else if (error.request) {
    // Network error
    return { message: 'Network error. Please check your connection.', details: null }
  } else {
    // Other error
    return { message: error.message || 'An unexpected error occurred.', details: null }
  }
}

export default api