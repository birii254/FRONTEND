import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { categoriesAPI, itemsAPI } from '../services/api'
import { useAuthStore } from '../store/authStore'

const EditItem = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  // Fetch item data
  const { data: item, isLoading: itemLoading } = useQuery(
    ['item', id],
    () => itemsAPI.getItem(id),
    {
      select: (response) => response.data,
      onSuccess: (data) => {
        // Populate form with existing data
        reset({
          category: data.category?.id,
          name: data.name,
          description: data.description,
          price: data.price,
          condition: data.condition,
          location: data.location,
          delivery_available: data.delivery_available,
          pickup_available: data.pickup_available,
          is_negotiable: data.is_negotiable,
          status: data.status,
        })
        
        // Set existing images
        const existingImages = [data.image, data.image_2, data.image_3, data.image_4, data.image_5].filter(Boolean)
        setSelectedImages(existingImages)
      }
    }
  )

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery(
    ['categories'],
    categoriesAPI.getCategories,
    {
      select: (response) => response.data,
    }
  )

  // Fallback categories if API fails
  const fallbackCategories = [
    { id: 1, name: 'Electronics & Appliances' },
    { id: 2, name: 'Fashion & Beauty' },
    { id: 3, name: 'Home & Furniture' },
    { id: 4, name: 'Vehicles & Auto Parts' },
    { id: 5, name: 'Property & Real Estate' },
    { id: 6, name: 'Jobs & Services' },
    { id: 7, name: 'Agriculture & Food' },
    { id: 8, name: 'Health & Wellness' },
    { id: 9, name: 'Kids & Baby' },
    { id: 10, name: 'Education & Training' },
    { id: 11, name: 'Events & Entertainment' },
    { id: 12, name: 'Others' }
  ]

  const displayCategories = categories || fallbackCategories

  const onSubmit = async (data) => {
    if (!user || user.id !== item?.created_by?.id) {
      navigate('/login')
      return
    }

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      
      // Add form fields
      Object.keys(data).forEach(key => {
        if (key.startsWith('image') && data[key]?.[0]) {
          formData.append(key, data[key][0])
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key])
        }
      })

      await itemsAPI.updateItem(id, formData)
      navigate(`/items/${id}`)
    } catch (error) {
      console.error('Error updating item:', error)
      alert('Failed to update item. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e, index) => {
    const file = e.target.files[0]
    if (file) {
      const newImages = [...selectedImages]
      newImages[index] = URL.createObjectURL(file)
      setSelectedImages(newImages)
    }
  }

  if (itemLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="card p-8 space-y-6">
            <div className="h-32 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!item || (user?.id !== item.created_by?.id)) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">You can only edit your own listings.</p>
        <button onClick={() => navigate('/dashboard')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Listing</h1>
        <p className="text-gray-600">Update your item details</p>
      </div>

      {/* Form */}
      <div className="card p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              <i className="fas fa-camera text-primary-600 mr-2"></i>
              Item Photos
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="relative">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-primary-400 transition-colors duration-200 h-32 flex items-center justify-center">
                    {selectedImages[index] ? (
                      <img
                        src={selectedImages[index]}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-gray-400">
                        <i className="fas fa-plus text-2xl mb-2"></i>
                        <p className="text-xs">Add Photo</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    {...register(index === 0 ? 'image' : `image_${index + 1}`)}
                    onChange={(e) => handleImageChange(e, index)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              <i className="fas fa-tag text-primary-600 mr-2"></i>
              Category *
            </label>
            <select
              {...register('category', { required: 'Please select a category' })}
              className="input-field"
              disabled={categoriesLoading}
            >
              <option value="">Select a category</option>
              {displayCategories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Item Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              <i className="fas fa-box text-primary-600 mr-2"></i>
              Item Name *
            </label>
            <input
              type="text"
              {...register('name', { required: 'Item name is required' })}
              className="input-field"
              placeholder="Enter item name..."
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              <i className="fas fa-align-left text-primary-600 mr-2"></i>
              Description
            </label>
            <textarea
              {...register('description')}
              rows={6}
              className="input-field"
              placeholder="Describe your item in detail..."
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              <i className="fas fa-map-marker-alt text-primary-600 mr-2"></i>
              Location *
            </label>
            <input
              type="text"
              {...register('location', { required: 'Location is required' })}
              className="input-field"
              placeholder="Enter your location..."
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              <i className="fas fa-dollar-sign text-primary-600 mr-2"></i>
              Price (KSh) *
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">KSh</span>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' }
                })}
                className="input-field pl-16"
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              <i className="fas fa-star text-primary-600 mr-2"></i>
              Condition
            </label>
            <select {...register('condition')} className="input-field">
              <option value="new">Brand New</option>
              <option value="like_new">Like New</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              <i className="fas fa-toggle-on text-primary-600 mr-2"></i>
              Status
            </label>
            <select {...register('status')} className="input-field">
              <option value="active">Active</option>
              <option value="sold">Sold</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Delivery & Pickup Options</h3>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('delivery_available')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="text-sm text-gray-700">Delivery available</label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('pickup_available')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="text-sm text-gray-700">Pickup available</label>
            </div>
            
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                {...register('is_negotiable')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label className="text-sm text-gray-700">Price is negotiable</label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(`/items/${id}`)}
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  <span>Update Item</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditItem