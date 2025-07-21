import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../store/authStore';
import { itemsAPI, categoriesAPI } from '../services/api';
import { useApi, useFormSubmission } from '../hooks/useApi';
import { useToast } from '../components/ui/Toast';

const NewItem = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { showToast } = useToast();
  const { submit, loading: isSubmitting, error } = useFormSubmission();
  const [imagePreviews, setImagePreviews] = useState(Array(5).fill(null));
  const [selectedCondition, setSelectedCondition] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  // Fetch categories
  const { data: categories, loading: categoriesLoading, error: categoriesError } = useApi(
    () => categoriesAPI.getCategories(),
    [],
    { 
      onError: (error) => {
        showToast('Failed to load categories', 'error');
      }
    }
  );

  // Handle image previews
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...imagePreviews];
        newPreviews[index] = reader.result;
        setImagePreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form submission
  const onSubmit = async (data) => {
    const result = await submit(
      () => itemsAPI.createItem(data),
      {
        onSuccess: (response) => {
          showToast('Item created successfully!', 'success');
          navigate(`/items/${response.data.id}`);
        },
        onError: (error) => {
          showToast(error.message || 'Failed to create item', 'error');
        }
      }
    );
  };

  // Condition options from your Django model
  const conditionOptions = [
    { value: '', label: 'Select condition' },
    { value: 'new', label: 'Brand New' },
    { value: 'used_like_new', label: 'Used - Like New' },
    { value: 'used_good', label: 'Used - Good' },
    { value: 'used_fair', label: 'Used - Fair' },
    { value: 'for_parts', label: 'For Parts/Not Working' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">List New Item</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <i className="fas fa-exclamation-triangle text-red-600 mr-2"></i>
              <h3 className="font-semibold text-red-900">Error</h3>
            </div>
            <p className="mt-1 text-sm text-red-700 whitespace-pre-line">{error.message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              {...register('category', { required: 'Category is required' })}
              className={`w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={categoriesLoading}
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {categoriesLoading && (
              <p className="mt-1 text-sm text-gray-500">Loading categories...</p>
            )}
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          {/* Item Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              {...register('name', { required: 'Item name is required' })}
              className={`w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter item name..."
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              rows={6}
              className={`w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe your item in detail..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (KSh) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register('price', { 
                required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' }
              })}
              className={`w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition *
            </label>
            <select
              {...register('condition', { required: 'Condition is required' })}
              value={selectedCondition}
              onChange={(e) => {
                setSelectedCondition(e.target.value);
                setValue('condition', e.target.value);
              }}
              className={`w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.condition ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {conditionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.condition && (
              <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              {...register('location', { required: 'Location is required' })}
              className={`w-full py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your location..."
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          {/* Delivery Options */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Options
            </label>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="delivery_available"
                {...register('delivery_available')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="delivery_available" className="ml-2 block text-sm text-gray-700">
                Delivery Available
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="pickup_available"
                {...register('pickup_available')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="pickup_available" className="ml-2 block text-sm text-gray-700">
                Pickup Available
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_negotiable"
                {...register('is_negotiable')}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="is_negotiable" className="ml-2 block text-sm text-gray-700">
                Price is Negotiable
              </label>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images (First image will be the main image)
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="space-y-2">
                  <label className="block text-xs text-gray-500">
                    {num === 1 ? 'Main Image *' : `Image ${num}`}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id={`image_${num}`}
                      accept="image/*"
                      {...register(num === 1 ? 'image' : `image_${num}`)}
                      onChange={(e) => handleImageChange(e, num - 1)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center">
                      {imagePreviews[num - 1] ? (
                        <img
                          src={imagePreviews[num - 1]}
                          alt={`Preview ${num}`}
                          className="h-full w-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <i className="fas fa-camera text-gray-400 text-2xl mb-1"></i>
                          <p className="text-xs text-gray-500">Click to upload</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting || categoriesLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Listing...
                </>
              ) : (
                'Create Listing'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewItem;