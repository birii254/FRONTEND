import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { itemsAPI, categoriesAPI } from '../services/api'

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  const query = searchParams.get('query') || ''
  const category = searchParams.get('category') || ''
  const page = searchParams.get('page') || 1

  const { data: items, isLoading: itemsLoading } = useQuery(
    ['items', { query, category, page }],
    () => itemsAPI.getItems({ 
      search: query, 
      category: category,
      page: page,
      status: 'active',
      admin_approved: true
    }),
    {
      select: (response) => response.data,
    }
  )

  const { data: categories, isLoading: categoriesLoading } = useQuery(
    ['categories'],
    categoriesAPI.getCategories,
    {
      select: (response) => response.data,
    }
  )

  const handleSearch = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const searchQuery = formData.get('query')
    const newParams = new URLSearchParams(searchParams)
    if (searchQuery) {
      newParams.set('query', searchQuery)
    } else {
      newParams.delete('query')
    }
    newParams.delete('page') // Reset to first page
    setSearchParams(newParams)
  }

  const handleCategoryFilter = (categorySlug) => {
    const newParams = new URLSearchParams(searchParams)
    if (categorySlug) {
      newParams.set('category', categorySlug)
    } else {
      newParams.delete('category')
    }
    newParams.delete('page') // Reset to first page
    setSearchParams(newParams)
  }

  const clearFilters = () => {
    setSearchParams({})
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm rounded-2xl p-6">
        <form onSubmit={handleSearch} className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              name="query"
              defaultValue={query}
              placeholder="What are you looking for?"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            />
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
          </div>
          <button type="submit" className="btn-primary">
            Search
          </button>
        </form>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <div className={`w-full lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="card p-6 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center">
              <i className="fas fa-filter text-primary-600 mr-2"></i>
              Filters & Categories
            </h3>
            
            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Categories</h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryFilter('')}
                  className={`w-full text-left flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-150 ${!category ? 'bg-primary-50 text-primary-700' : ''}`}
                >
                  <span className="text-sm text-gray-700">All Categories</span>
                </button>
                {!categoriesLoading && categories?.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryFilter(cat.slug)}
                    className={`w-full text-left flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-150 ${category === cat.slug ? 'bg-primary-50 text-primary-700' : ''}`}
                  >
                    <i className={`${cat.icon || 'fas fa-tag'} text-primary-600 w-4`}></i>
                    <span className="text-sm text-gray-700">{cat.name}</span>
                    <span className="text-xs text-gray-500 ml-auto">({cat.items_count || 0})</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={clearFilters}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <i className="fas fa-times mr-2"></i>Clear All Filters
            </button>
          </div>
        </div>

        {/* Main Product Grid */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6 card p-4">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-900">
                {items?.results?.length || 0} products available
              </span>
              {query && (
                <span className="text-sm text-gray-600">
                  for "{query}"
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Best Match</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
              
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <i className="fas fa-th text-gray-600"></i>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <i className="fas fa-list text-gray-600"></i>
                </button>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden btn-primary"
              >
                <i className="fas fa-filter mr-2"></i>Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          {itemsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card p-4 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items?.results?.map((item) => (
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
                      <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-200">
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
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-clock"></i>
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <i className="fas fa-eye"></i>
                        <span>{item.views || 0}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Link
                        to={`/items/${item.id}`}
                        className="w-full btn-primary text-center block"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {items?.results?.map((item) => (
                <div key={item.id} className="card p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=150'}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200">
                            <Link to={`/items/${item.id}`}>{item.name}</Link>
                          </h3>
                          <p className="text-gray-600 mt-1 line-clamp-2">
                            {item.description || "No description available"}
                          </p>
                          
                          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <i className="fas fa-user"></i>
                              <span>{item.created_by?.username}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <i className="fas fa-clock"></i>
                              <span>{new Date(item.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <i className="fas fa-eye"></i>
                              <span>{item.views || 0} views</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2">
                          <span className="text-2xl font-bold text-primary-600">KSh {item.price}</span>
                          <Link
                            to={`/items/${item.id}`}
                            className="btn-primary"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!itemsLoading && (!items?.results || items.results.length === 0) && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-search text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or browse all categories.</p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Browse All Items
              </button>
            </div>
          )}

          {/* Pagination */}
          {items?.results && items.results.length > 0 && items.total_pages > 1 && (
            <div className="flex items-center justify-center mt-12">
              <nav className="flex items-center space-x-2">
                {items.current_page > 1 && (
                  <button
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams)
                      newParams.set('page', items.current_page - 1)
                      setSearchParams(newParams)
                    }}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                )}
                
                {Array.from({ length: Math.min(5, items.total_pages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        const newParams = new URLSearchParams(searchParams)
                        newParams.set('page', pageNum)
                        setSearchParams(newParams)
                      }}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        pageNum === items.current_page
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                
                {items.current_page < items.total_pages && (
                  <button
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams)
                      newParams.set('page', items.current_page + 1)
                      setSearchParams(newParams)
                    }}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Marketplace