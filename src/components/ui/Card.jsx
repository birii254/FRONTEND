import React from 'react'
import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  animate = true,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'
  
  if (!animate) {
    return (
      <div
        className={`
          ${baseClasses}
          ${hover ? 'hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={`${baseClasses} ${className}`}
      whileHover={hover ? { 
        y: -4, 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
      } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card