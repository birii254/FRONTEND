import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const Toast = ({ message, type = 'success', isVisible, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white'
  }

  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    warning: 'fas fa-exclamation-triangle',
    info: 'fas fa-info-circle'
  }

  return createPortal(
    <div className="fixed top-4 right-4 z-50 animate-slide-up">
      <div className={`
        ${typeStyles[type]} 
        px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3 min-w-80 max-w-md
      `}>
        <i className={`${icons[type]} text-lg`}></i>
        <span className="flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors duration-200"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>,
    document.body
  )
}

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'success', duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9)
    const toast = { id, message, type, duration }
    
    setToasts(prev => [...prev, toast])
  }

  const hideToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => hideToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>
  )

  return { showToast, ToastContainer }
}

export default Toast