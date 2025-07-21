import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

// Custom toast functions
export const showToast = {
  success: (message) => toast.success(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#10B981',
      color: '#fff',
      borderRadius: '12px',
      padding: '16px',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10B981',
    },
  }),
  
  error: (message) => toast.error(message, {
    duration: 5000,
    position: 'top-right',
    style: {
      background: '#EF4444',
      color: '#fff',
      borderRadius: '12px',
      padding: '16px',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#EF4444',
    },
  }),
  
  loading: (message) => toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#3B82F6',
      color: '#fff',
      borderRadius: '12px',
      padding: '16px',
    },
  }),
  
  promise: (promise, messages) => toast.promise(promise, messages, {
    position: 'top-right',
    style: {
      borderRadius: '12px',
      padding: '16px',
    },
  }),
}

// Toast container component
export const ToastContainer = () => (
  <Toaster
    position="top-right"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      className: '',
      duration: 4000,
      style: {
        background: '#fff',
        color: '#374151',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      success: {
        iconTheme: {
          primary: '#10B981',
          secondary: '#fff',
        },
      },
      error: {
        iconTheme: {
          primary: '#EF4444',
          secondary: '#fff',
        },
      },
    }}
  />
)

export default ToastContainer