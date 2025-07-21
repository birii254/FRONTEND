import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch 
  } = useForm()

  const password = watch('password1')

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError('')
    
    try {
      // Create FormData for file upload
      const formData = new FormData()
      
      // Append all form fields
      Object.keys(data).forEach(key => {
        if (key !== 'profile_picture') {
          formData.append(key, data[key])
        }
      })
      
      // Append profile picture if exists
      if (profilePicture) {
        formData.append('profile_picture', profilePicture)
      }

      // Make API request to your Django backend
      const response = await axios.post(
        'https://birii.onrender.com/api/signup/', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      )

      // Handle successful registration
      navigate('/login', { 
        state: { 
          message: 'Account created successfully! Please sign in.' 
        }
      })
    } catch (err) {
      // Handle errors from Django backend
      if (err.response) {
        // Django returns errors in this format: { field: ["error1", "error2"] }
        const errorData = err.response.data
        let errorMessage = ''

        // Format Django errors into a readable string
        if (typeof errorData === 'object') {
          for (const key in errorData) {
            errorMessage += `${key}: ${errorData[key].join(' ')}\n`
          }
        } else {
          errorMessage = errorData || 'Registration failed. Please try again.'
        }

        setError(errorMessage.trim())
      } else {
        setError('Network error. Please check your connection and try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setProfilePicture(e.target.files[0])
    }
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-store text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">Join thousands of users on Matrix Marketplace</p>
        </div>

        {/* Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <i className="fas fa-user text-primary-600 mr-2"></i>
                  First Name
                </label>
                <input
                  type="text"
                  {...register('first_name', { 
                    required: 'First name is required',
                    maxLength: {
                      value: 30,
                      message: 'First name cannot exceed 30 characters'
                    }
                  })}
                  className="input-field"
                  placeholder="Enter your first name"
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <i className="fas fa-user text-primary-600 mr-2"></i>
                  Last Name
                </label>
                <input
                  type="text"
                  {...register('last_name', { 
                    required: 'Last name is required',
                    maxLength: {
                      value: 30,
                      message: 'Last name cannot exceed 30 characters'
                    }
                  })}
                  className="input-field"
                  placeholder="Enter your last name"
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <i className="fas fa-user text-primary-600 mr-2"></i>
                Username
              </label>
              <input
                type="text"
                {...register('username', { 
                  required: 'Username is required',
                  minLength: {
                    value: 4,
                    message: 'Username must be at least 4 characters'
                  }
                })}
                className="input-field"
                placeholder="Choose a unique username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <i className="fas fa-envelope text-primary-600 mr-2"></i>
                Email Address
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="input-field"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <i className="fas fa-phone text-primary-600 mr-2"></i>
                Phone Number
              </label>
              <input
                type="tel"
                {...register('phone_number', {
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: 'Enter a valid phone number (e.g., +1234567890)'
                  }
                })}
                className="input-field"
                placeholder="+1234567890"
              />
              {errors.phone_number && (
                <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <i className="fas fa-image text-primary-600 mr-2"></i>
                Profile Picture (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <i className="fas fa-map-marker-alt text-primary-600 mr-2"></i>
                Location (Optional)
              </label>
              <input
                type="text"
                {...register('location', {
                  maxLength: {
                    value: 100,
                    message: 'Location cannot exceed 100 characters'
                  }
                })}
                className="input-field"
                placeholder="Enter your city/location"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <i className="fas fa-lock text-primary-600 mr-2"></i>
                Password
              </label>
              <input
                type="password"
                {...register('password1', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
                className="input-field"
                placeholder="Create a strong password"
              />
              {errors.password1 && (
                <p className="mt-1 text-sm text-red-600">{errors.password1.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <i className="fas fa-lock text-primary-600 mr-2"></i>
                Confirm Password
              </label>
              <input
                type="password"
                {...register('password2', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                className="input-field"
                placeholder="Confirm your password"
              />
              {errors.password2 && (
                <p className="mt-1 text-sm text-red-600">{errors.password2.message}</p>
              )}
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                {...register('terms', { required: 'You must accept the terms and conditions' })}
                className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <div className="ml-3 text-sm">
                <span className="text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </div>
            </div>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <i className="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                  <h3 className="font-semibold text-red-900">Registration failed</h3>
                </div>
                <p className="text-sm text-red-700 whitespace-pre-line">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Social Signup */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                type="button"
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
              >
                <i className="fab fa-google text-red-500 mr-2"></i>
                Google
              </button>
              <button 
                type="button"
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200"
              >
                <i className="fab fa-facebook text-blue-600 mr-2"></i>
                Facebook
              </button>
            </div>
          </div>
        </div>

        {/* Sign in link */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup