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
      
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        
        try {
          const response = await authAPI.login(credentials)
          const { access, refresh, user } = response.data
          
          localStorage.setItem('access_token', access)
          localStorage.setItem('refresh_token', refresh)
          
          set({
            user,
            accessToken: access,
            refreshToken: refresh,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          
          return { success: true }
        } catch (error) {
          const errorMessage = error.response?.data?.detail || 'Login failed'
          set({ 
            isLoading: false, 
            error: errorMessage,
            isAuthenticated: false 
          })
          return { success: false, error: errorMessage }
        }
      },
      
      register: async (userData) => {
        set({ isLoading: true, error: null })
        
        try {
          await authAPI.register(userData)
          set({ isLoading: false, error: null })
          return { success: true }
        } catch (error) {
          const errorMessage = error.response?.data?.detail || 'Registration failed'
          set({ 
            isLoading: false, 
            error: errorMessage 
          })
          return { success: false, error: errorMessage }
        }
      },
      
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
      
      setUser: (user) => set({ user }),
      clearError: () => set({ error: null }),
      
      // Initialize auth state from localStorage
      initialize: () => {
        const token = localStorage.getItem('access_token')
        const user = localStorage.getItem('user')
        
        if (token && user) {
          try {
            set({
              accessToken: token,
              user: JSON.parse(user),
              isAuthenticated: true,
            })
          } catch (error) {
            console.error('Failed to parse stored user data:', error)
            get().logout()
          }
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