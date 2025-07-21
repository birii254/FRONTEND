import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch,
    reset
  } = useForm();

  const password = watch('password1');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const formData = new FormData();
      
      // Append all form data
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('password1', data.password1);
      formData.append('password2', data.password2);
      formData.append('phone_number', data.phone_number || '');
      formData.append('location', data.location || '');

      if (profilePicture) {
        formData.append('profile_picture', profilePicture);
      }

      const response = await axios.post(
        'https://birii.onrender.com/api/auth/register/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      // Handle successful registration
      setSuccessMessage('Registration successful! Redirecting to login...');
      reset();
      setProfilePicture(null);
      
      setTimeout(() => {
        navigate('/login', {
          state: { 
            message: 'Account created successfully! Please sign in.' 
          }
        });
      }, 2000);

    } catch (err) {
      if (err.response) {
        // Handle Django backend validation errors
        const errorData = err.response.data;
        let errorMessages = [];

        // Format Django error responses
        if (typeof errorData === 'object') {
          for (const [field, messages] of Object.entries(errorData)) {
            if (Array.isArray(messages)) {
              errorMessages.push(`${field}: ${messages.join(' ')}`);
            } else {
              errorMessages.push(`${field}: ${messages}`);
            }
          }
          setError(errorMessages.join('\n'));
        } else {
          setError(errorData || 'Registration failed. Please try again.');
        }
      } else if (err.request) {
        setError('Network error. Please check your connection.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mb-4">
            <i className="fas fa-store text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-gray-600">Join our marketplace community</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center">
              <i className="fas fa-check-circle text-green-600 mr-2"></i>
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username *
              </label>
              <input
                id="username"
                type="text"
                {...register('username', { 
                  required: 'Username is required',
                  minLength: {
                    value: 4,
                    message: 'Username must be at least 4 characters'
                  },
                  maxLength: {
                    value: 150,
                    message: 'Username cannot exceed 150 characters'
                  }
                })}
                className={`input-field ${errors.username ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="johndoe"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className={`input-field ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  id="first_name"
                  type="text"
                  {...register('first_name', { 
                    required: 'First name is required',
                    maxLength: {
                      value: 30,
                      message: 'First name cannot exceed 30 characters'
                    }
                  })}
                  className={`input-field ${errors.first_name ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="John"
                />
                {errors.first_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  id="last_name"
                  type="text"
                  {...register('last_name', { 
                    required: 'Last name is required',
                    maxLength: {
                      value: 30,
                      message: 'Last name cannot exceed 30 characters'
                    }
                  })}
                  className={`input-field ${errors.last_name ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Doe"
                />
                {errors.last_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="phone_number"
                type="tel"
                {...register('phone_number', {
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: 'Enter a valid phone number (e.g., +1234567890)'
                  }
                })}
                className={`input-field ${errors.phone_number ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="+254712345678"
              />
              {errors.phone_number && (
                <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>
              )}
            </div>

            {/* Profile Picture */}
            <div>
              <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <div className="flex items-center">
                <input
                  id="profile_picture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="profile_picture"
                  className="flex-1 cursor-pointer input-field border-dashed flex items-center justify-center"
                >
                  {profilePicture ? (
                    <span className="text-primary-600">{profilePicture.name}</span>
                  ) : (
                    <span className="text-gray-500">Choose a file (optional)</span>
                  )}
                </label>
                {profilePicture && (
                  <button
                    type="button"
                    onClick={() => setProfilePicture(null)}
                    className="ml-2 p-2 text-red-600 hover:text-red-700"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                type="text"
                {...register('location', {
                  maxLength: {
                    value: 100,
                    message: 'Location cannot exceed 100 characters'
                  }
                })}
                className={`input-field ${errors.location ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="Nairobi, Kenya"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password1" className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                id="password1"
                type="password"
                {...register('password1', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
                className={`input-field ${errors.password1 ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="••••••••"
              />
              {errors.password1 && (
                <p className="mt-1 text-sm text-red-600">{errors.password1.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                id="password2"
                type="password"
                {...register('password2', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                className={`input-field ${errors.password2 ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="••••••••"
              />
              {errors.password2 && (
                <p className="mt-1 text-sm text-red-600">{errors.password2.message}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  {...register('terms', { 
                    required: 'You must accept the terms and conditions' 
                  })}
                  className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center">
                <i className="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                <h3 className="font-semibold text-red-900">Registration Error</h3>
              </div>
              <p className="mt-1 text-sm text-red-700 whitespace-pre-line">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <i className="fab fa-google text-red-500 mr-2"></i>
            Google
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <i className="fab fa-facebook-f text-blue-600 mr-2"></i>
            Facebook
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;