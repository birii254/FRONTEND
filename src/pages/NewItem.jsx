import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQuery } from "@tanstack/react-query";
import { categoriesAPI, itemsAPI } from '../services/api'
import { useAuthStore } from '../store/authStore'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import ImageUpload from '../components/ui/ImageUpload'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const NewItem = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState([])

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      condition: 'good',
      delivery_available: false,
      pickup_available: true,
      is_negotiable: true,
    }
  })

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery(
    ['categories'],
    categoriesAPI.getCategories,
    {
      select: (response) => response.data,
      onError: (error) => {
        console.error('Error fetching categories:', error);
      }
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
    if (!user) {
      navigate('/login')
      return
    }

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      
      // Add text fields
      Object.keys(data).forEach(key => {
        if (!key.startsWith('image') && data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key])
        }
      })
      
      // Add images
      images.forEach((image, index) => {
        if (image.file) {
          const fieldName = index === 0 ? 'image' : `image_${index + 1}`
          formData.append(fieldName, image.file)
        }
      })

      const response = await itemsAPI.createItem(formData)
      navigate(`/items/${response.data.id}`)
    } catch (error) {
      console.error('Error creating item:', error)
      alert('Failed to create item. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Listing</h1>
        <p className="text-gray-600">Fill in the details below to list your item</p>
      </div>

      {/* Form */}
      <Card className="p-8 animate-slide-up">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Image Upload */}
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxImages={5}
          />

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              <i className="fas fa-tag text-primary-600 mr-2"></i>
              Category *
            </label>
            <select
              {...register('category', { required: 'Please select a category' })}
              className="w-full py-4 px-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
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
              <p className="text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Item Name */}
          <Input
            label="Item Name *"
            icon="fas fa-box"
            placeholder="Enter item name..."
            {...register('name', { required: 'Item name is required' })}
            error={errors.name?.message}
          />

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              <i className="fas fa-align-left text-primary-600 mr-2"></i>
              Description
            </label>
            <textarea
              {...register('description')}
              rows={6}
              className="w-full py-4 px-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="Describe your item in detail..."
            />
            <p className="text-xs text-gray-500 mt-2">Provide detailed information about your item's condition, features, and any relevant details.</p>
          </div>

          {/* Location */}
          <Input
            label="Location *"
            icon="fas fa-map-marker-alt"
            placeholder="Enter your location..."
            {...register('location', { required: 'Location is required' })}
            error={errors.location?.message}
          />

          {/* Price */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
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
                className="w-full py-4 px-6 pl-16 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              <i className="fas fa-star text-primary-600 mr-2"></i>
              Condition
            </label>
            <select 
              {...register('condition')} 
              className="w-full py-4 px-6 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="new">Brand New</option>
              <option value="like_new">Like New</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <i className="fas fa-truck text-primary-600 mr-2"></i>
              Delivery & Pickup Options
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <input
                  type="checkbox"
                  {...register('delivery_available')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">Delivery Available</span>
                  <p className="text-xs text-gray-500">Offer delivery service</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <input
                  type="checkbox"
                  {...register('pickup_available')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">Pickup Available</span>
                  <p className="text-xs text-gray-500">Allow local pickup</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                <input
                  type="checkbox"
                  {...register('is_negotiable')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-900">Price Negotiable</span>
                  <p className="text-xs text-gray-500">Open to offers</p>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <Button
              variant="secondary"
              onClick={() => navigate('/dashboard')}
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              <i className="fas fa-check mr-2"></i>
              {isSubmitting ? 'Creating...' : 'List Item'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Tips */}
      <Card className="mt-8 bg-blue-50 border border-blue-200 p-6 animate-slide-up">
        <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
          <i className="fas fa-lightbulb mr-2"></i>
          Tips for a Great Listing
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          {[
            "Use high-quality, well-lit photos from multiple angles",
            "Write a detailed, honest description of the item's condition",
            "Research similar items to set a competitive price",
            "Respond quickly to buyer inquiries to build trust"
          ].map((tip, index) => (
            <li key={index} className="flex items-start space-x-2">
            <i className="fas fa-check text-blue-600 mt-0.5"></i>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

export default NewItem