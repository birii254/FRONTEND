import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { authAPI } from '../services/api'

const Signup = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const password = watch('password1')

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError('')
    
    try {
      await authAPI.signup(data)
      navigate('/login', { 
        state: { message: 'Account created successfully! Please sign in.' }
      })
    } catch (err) {
      const errorData = err.response?.data
      if (errorData) {
        const errorMessages = Object.values(errorData).flat().join(' ')
        setError(errorMessages)
      } else {
        setError('Registration failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
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
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <i className="fas fa-user text-primary-600 mr-2"></i>
                Username
              </label>
              <input
                type="text"
                {...register('username', { required: 'Username is required' })}
                className="input-field"
                placeholder="Choose a unique username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <i className="fas fa-user text-primary-600 mr-2"></i>
                  First Name
                </label>
                <input
                  type="text"
                  {...register('first_name', { required: 'First name is required' })}
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
                  {...register('last_name', { required: 'Last name is required' })}
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
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                {...register('phone_number')}
                className="input-field"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <i className="fas fa-map-marker-alt text-primary-600 mr-2"></i>
                Location (Optional)
              </label>
              <input
                type="text"
                {...register('location')}
                className="input-field"
                placeholder="Enter your city/location"
              />
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
                <p className="text-sm text-red-700">{error}</p>
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
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
                <i className="fab fa-google text-red-500 mr-2"></i>
                Google
              </button>
              <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200">
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