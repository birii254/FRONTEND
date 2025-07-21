import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { itemsAPI, categoriesAPI } from '../services/api'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')

  const query = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''

  const { data: itemsData, isLoading: itemsLoading } = useQuery({
    queryKey: ['items', { search: query, category }],
    queryFn: () => itemsAPI.getItems({ search: query, category, status: 'active' }),
    select: (response) => response.data
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesAPI.getCategories,
    select: (response) => response.data || []
  })

  const items = itemsData?.results || []

  const handleSearch = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const searchQuery = formData.get('query')
    const newParams = new URLSearchParams(searchParams)
    if (searchQuery) {
      newParams.set('search', searchQuery)
    } else {
      newParams.delete('search')
    }
    setSearchParams(newParams)
  }

  const handleCategoryFilter = (categoryId) => {
    const newParams = new URLSearchParams(searchParams)
    if (categoryId) {
      newParams.set('category', categoryId)
    } else {
      newParams.delete('category')
    }
    setSearchParams(newParams)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6">
          <form onSubmit={handleSearch} className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                name="query"
                defaultValue={query}
                placeholder="What are you looking for?"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg transition-all duration-200"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
            </div>
            <Button type="submit">
              <i className="fas fa-search mr-2"></i>
              Search
            </Button>
          </form>
        </Card>
      </motion.div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <motion.div 
          className="w-full lg:w-1/4 hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center">
              <i className="fas fa-filter text-primary-600 mr-2"></i>
              Categories
            </h3>
            
            <div className="space-y-2">
              <motion.button
                onClick={() => handleCategoryFilter('')}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${!category ? 'bg-primary-50 text-primary-700 border border-primary-200' : 'hover:bg-gray-50'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                All Categories
              </motion.button>
              {categories?.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => handleCategoryFilter(cat.id)}
                  className={`w-full text-left flex items-center space-x-2 p-3 rounded-lg transition-all duration-200 ${category == cat.id ? 'bg-primary-50 text-primary-700 border border-primary-200' : 'hover:bg-gray-50'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className={`${cat.icon || 'fas fa-tag'} text-primary-600 w-4`}></i>
                  <span className="text-sm">{cat.name}</span>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Main Product Grid */}
        <div className="flex-1">
          {/* Results Header */}
          <motion.div 
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="text-lg font-semibold text-gray-900">
              {items.length} products found
            </span>
            
            <div className="flex items-center space-x-4">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200">
                <option>Best Match</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
              
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-th text-gray-600"></i>
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-list text-gray-600"></i>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Product Grid */}
          {itemsLoading ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[...Array(8)].map((_, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="p-4 animate-pulse">
                    <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-300 h-4 rounded mb-2"></div>
                    <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {items.map((item, index) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Card hover className="overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={item.image || 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400'}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute top-3 right-3">
                        <motion.button 
                          className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <i className="fas fa-heart text-sm"></i>
                        </motion.button>
                      </div>
                      {item.status === 'sold' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            SOLD
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-1 mb-2">
                        {item.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description || "No description available"}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-primary-600">
                          KSh {item.price?.toLocaleString()}
                        </span>
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <i className="fas fa-star text-xs"></i>
                          <span className="text-xs text-gray-600">4.8</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <i className="fas fa-map-marker-alt"></i>
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <i className="fas fa-clock"></i>
                          <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <Button as={Link} to={`/items/${item.id}`} className="w-full">
                        View Details
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!itemsLoading && items.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all categories.</p>
              <Button onClick={() => handleCategoryFilter('')}>
                View All Items
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Marketplace