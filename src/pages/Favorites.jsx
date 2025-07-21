import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/authStore'
import { itemsAPI } from '../services/api'

const Favorites = () => {
  const { user } = useAuthStore()
  
  const { data: favoriteItems, isLoading } = useQuery(
    'favoriteItems',
    () => itemsAPI.getItems({ favorites: true }),
    {
      select: (response) => response.data?.results || [],
      enabled: !!user,
    }
  )

  const handleToggleFavorite = async (itemId) => {
    try {
      await itemsAPI.toggleFavorite(itemId)
      // Refetch favorites
      window.location.reload()
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          <p className="text-gray-600 mt-1">Items you've saved for later</p>
        </div>
        <div className="text-sm text-gray-500">
          {favoriteItems?.length || 0} item{favoriteItems?.length !== 1 ? 's' : ''}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : favoriteItems && favoriteItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteItems.map((item) => (
            <div key={item.id} className="group card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative overflow-hidden">
                <img 
                  src={item.image || 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400'} 
                  alt={item.name} 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'active' ? 'bg-green-500 text-white' :
                    item.status === 'sold' ? 'bg-red-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {item.status === 'active' ? 'Available' : 
                     item.status === 'sold' ? 'Sold' : 
                     item.status}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button 
                    onClick={() => handleToggleFavorite(item.id)}
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:text-red-600 transition-colors duration-200"
                  >
                    <i className="fas fa-heart text-sm"></i>
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <i className="fas fa-star text-xs"></i>
                    <span className="text-xs text-gray-600">4.8</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description || "No description available"}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-primary-600">KSh {item.price}</span>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <i className="fas fa-user"></i>
                    <span>{item.created_by?.username}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-clock"></i>
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-heart"></i>
                    <span>Favorited</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Link 
                    to={`/items/${item.id}`} 
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-3 rounded-lg text-sm font-medium text-center transition-colors duration-200"
                  >
                    View Details
                  </Link>
                  <Link 
                    to={`/inbox/new/${item.id}`} 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium text-center transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-heart text-gray-400 text-3xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-600 mb-6">Start browsing items and add them to your favorites!</p>
          <Link to="/marketplace" className="btn-primary">
            Browse Items
          </Link>
        </div>
      )}
    </div>
  )
}

export default Favorites