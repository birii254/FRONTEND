import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://birii.onrender.com'

// Mock data for when backend is unavailable
const mockData = {
  categories: [
    { id: 1, name: 'Electronics', slug: 'electronics' },
    { id: 2, name: 'Clothing', slug: 'clothing' },
    { id: 3, name: 'Home & Garden', slug: 'home-garden' },
    { id: 4, name: 'Sports', slug: 'sports' },
    { id: 5, name: 'Books', slug: 'books' }
  ],
  items: [
    { 
      id: 1, 
      name: 'Sample Product', 
      description: 'This is a sample product', 
      price: 99.99, 
      category: 1,
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle network errors by returning mock data
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      const url = error.config?.url || ''
      
      // Return mock data for categories
      if (url.includes('/api/categories/')) {
        return { data: mockData.categories }
      }
      
      // Return mock data for items
      if (url.includes('/api/items/items/')) {
        return { data: { results: mockData.items, count: mockData.items.length } }
      }
      
      // Return mock data for featured items
      if (url.includes('/api/featured-items/')) {
        return { data: mockData.items }
      }
      
      // For other endpoints, return empty data
      return { data: [] }
    }
    
    if (error.response?.status === 401) {
      // Try to refresh token
      const refreshToken = localStorage.getItem('refresh_token')
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, {
            refresh: refreshToken
          })
          const { access } = response.data
          localStorage.setItem('access_token', access)
          
          // Retry original request
          error.config.headers.Authorization = `Bearer ${access}`
          return axios.request(error.config)
        } catch (refreshError) {
          // Refresh failed, logout user
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          window.location.href = '/login'
        }
      } else {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/api/auth/token/', credentials),
  signup: (userData) => api.post('/api/auth/register/', userData),
  getProfile: () => api.get('/api/auth/profile/'),
  updateProfile: (data) => api.patch('/api/auth/profile/', data),
}

export const itemsAPI = {
  getItems: (params) => api.get('/api/items/items/', { params }),
  getItem: (id) => api.get(`/api/items/items/${id}/`),
  createItem: (data) => api.post('/api/items/items/', data),
  updateItem: (id, data) => api.patch(`/api/items/items/${id}/`, data),
  deleteItem: (id) => api.delete(`/api/items/items/${id}/`),
  toggleFavorite: (id) => api.post(`/api/items/items/${id}/toggle-favorite/`),
  getRelatedItems: (id) => api.get(`/api/items/items/${id}/related/`),
}

export const categoriesAPI = {
  getCategories: () => api.get('/api/categories/'),
  getGeneralCategories: () => api.get('/api/categories/'),
  getItemCategories: () => api.get('/api/items/categories/'),
  getFeaturedItems: () => api.get('/api/featured-items/'),
}

export const conversationsAPI = {
  getConversations: () => api.get('/api/conversations/conversations/'),
  getConversation: (id) => api.get(`/api/conversations/conversations/${id}/`),
  getMessages: (id) => api.get(`/api/conversations/conversations/${id}/messages/`),
  createConversation: (data) => api.post('/api/conversations/conversations/create_conversation/', data),
  sendMessage: (conversationId, data) => api.post(`/api/conversations/conversations/${conversationId}/send_message/`, data),
}

export default api