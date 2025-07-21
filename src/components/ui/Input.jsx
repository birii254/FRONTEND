import React from 'react'

const Input = ({ 
  label, 
  error, 
  icon, 
  className = '', 
  containerClassName = '',
  ...props 
}) => {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {icon && <i className={`${icon} text-primary-600 mr-2`}></i>}
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`
            w-full py-4 px-6 rounded-xl border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent 
            transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default Input