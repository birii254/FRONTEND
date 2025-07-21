import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI } from '../services/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      // Initialize auth state from localStorage
      initializeAuth: async () => {
        const accessToken = localStorage.getItem('access_token')
        const refreshToken = localStorage.getItem('refresh_token')
        
        if (accessToken && refreshToken) {
          set({ 
            accessToken, 
            refreshToken, 
            isAuthenticated: true,
            isLoading: true 
          })
          
          try {
            // Verify token and get user profile
            const response = await authAPI.getProfile()
            set({ 
              user: response.data, 
              isLoading: false,
              error: null 
            })
          } catch (error) {
            console.error('Failed to initialize auth:', error)
            // Token might be expired, try to refresh
            try {
              const refreshResponse = await authAPI.refreshToken(refreshToken)
              const newAccessToken = refreshResponse.data.access
              localStorage.setItem('access_token', newAccessToken)
              
              // Try getting profile again
              const profileResponse = await authAPI.getProfile()
              set({ 
                user: profileResponse.data,
                accessToken: newAccessToken,
                isLoading: false,
                error: null 
              })
            } catch (refreshError) {
              // Refresh failed, clear auth state
              get().logout()
            }
          }
        } else {
          set({ isLoading: false })
        }
      },
      
      // Login action
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await authAPI.login(credentials)
          const { access, refresh } = response.data
          
          // Store tokens
          localStorage.setItem('access_token', access)
          localStorage.setItem('refresh_token', refresh)
          
          // Get user profile
          const profileResponse = await authAPI.getProfile()
          
          set({
            user: profileResponse.data,
            accessToken: access,
            refreshToken: refresh,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          
          return { success: true, user: profileResponse.data }
        } catch (error) {
          const errorMessage = error.response?.data?.detail || 
                              error.response?.data?.message || 
                              'Login failed. Please try again.'
          
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false 
          })
          
          return { success: false, error: errorMessage }
        }
      },
      
      // Register action
      register: async (userData) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await authAPI.register(userData)
          
          // If registration includes auto-login
          if (response.data.access && response.data.refresh) {
            const { access, refresh } = response.data
            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            
            const profileResponse = await authAPI.getProfile()
            
            set({
              user: profileResponse.data,
              accessToken: access,
              refreshToken: refresh,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
            
            return { success: true, user: profileResponse.data }
          } else {
            // Registration successful but requires login
            set({ isLoading: false, error: null })
            return { success: true, requiresLogin: true }
          }
        } catch (error) {
          let errorMessage = 'Registration failed. Please try again.'
          
          if (error.response?.data) {
            const errorData = error.response.data
            if (typeof errorData === 'object') {
              const errors = []
              for (const [field, messages] of Object.entries(errorData)) {
                if (Array.isArray(messages)) {
                  errors.push(`${field}: ${messages.join(', ')}`)
                } else {
                  errors.push(`${field}: ${messages}`)
                }
              }
              errorMessage = errors.join('\n')
            } else {
              errorMessage = errorData
            }
          }
          
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false 
          })
          
          return { success: false, error: errorMessage }
        }
      },
      
      // Logout action
      logout: () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      },
      
      // Update user profile
      updateUser: async (userData) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await authAPI.updateProfile(userData)
          set({ 
            user: response.data, 
            isLoading: false,
            error: null 
          })
          return { success: true, user: response.data }
        } catch (error) {
          const errorMessage = error.response?.data?.message || 
                              'Failed to update profile. Please try again.'
          set({ 
            isLoading: false, 
            error: errorMessage 
          })
          return { success: false, error: errorMessage }
        }
      },
      
      // Set user data directly (for external updates)
      setUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }))
      },
      
      // Clear error
      clearError: () => {
        set({ error: null })
      },
      
      // Refresh token manually
      refreshAccessToken: async () => {
        const { refreshToken } = get()
        if (!refreshToken) {
          get().logout()
          return false
        }
        
        try {
          const response = await authAPI.refreshToken(refreshToken)
          const newAccessToken = response.data.access
          localStorage.setItem('access_token', newAccessToken)
          set({ accessToken: newAccessToken })
          return true
        } catch (error) {
          get().logout()
          return false
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)