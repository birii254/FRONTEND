import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Menu, Transition } from '@headlessui/react'
import Button from '../ui/Button'

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const categories = [
    { name: 'Electronics & Appliances', icon: 'fas fa-laptop', href: '/marketplace?category=electronics' },
    { name: 'Fashion & Beauty', icon: 'fas fa-tshirt', href: '/marketplace?category=fashion' },
    { name: 'Home & Furniture', icon: 'fas fa-couch', href: '/marketplace?category=furniture' },
    { name: 'Vehicles & Auto Parts', icon: 'fas fa-car', href: '/marketplace?category=automotive' },
    { name: 'Property & Real Estate', icon: 'fas fa-home', href: '/marketplace?category=property' },
    { name: 'Jobs & Services', icon: 'fas fa-briefcase', href: '/marketplace?category=services' },
    { name: 'Agriculture & Food', icon: 'fas fa-seedling', href: '/marketplace?category=agriculture' },
    { name: 'Health & Wellness', icon: 'fas fa-heartbeat', href: '/marketplace?category=health' },
    { name: 'Kids & Baby', icon: 'fas fa-baby', href: '/marketplace?category=kids' },
    { name: 'Education & Training', icon: 'fas fa-graduation-cap', href: '/marketplace?category=education' },
    { name: 'Events & Entertainment', icon: 'fas fa-music', href: '/marketplace?category=events' },
    { name: 'Others', icon: 'fas fa-ellipsis-h', href: '/marketplace?category=others' },
  ]

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 matrix-gradient rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <i className="fas fa-cube text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold gradient-text">Matrix</span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, suppliers, or categories..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
                />
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/marketplace" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 flex items-center space-x-1">
                <i className="fas fa-search text-sm"></i>
                <span>Browse</span>
              </Link>
              
              {isAuthenticated && (
                <Link to="/items/new" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 flex items-center space-x-1">
                  <i className="fas fa-plus text-sm"></i>
                  <span>Sell</span>
                </Link>
              )}
              
              <Link to="/featured" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 flex items-center space-x-1">
                <i className="fas fa-star text-sm"></i>
                <span>Featured</span>
              </Link>

              {/* Categories Dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 flex items-center space-x-1">
                  <i className="fas fa-th-large text-sm"></i>
                  <span>Categories</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </Menu.Button>
                
                <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Menu.Items className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-1 p-2">
                      {categories.map((category, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <Link
                              to={category.href}
                              className={`block px-3 py-2 text-sm rounded-lg transition-colors duration-150 ${
                                active ? 'bg-gray-50' : ''
                              }`}
                            >
                              <i className={`${category.icon} text-primary-500 w-5`}></i> {category.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/marketplace"
                            className={`block px-4 py-2 text-sm font-medium ${
                              active ? 'bg-primary-50 text-primary-600' : 'text-primary-600'
                            }`}
                          >
                            View All Categories →
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    <i className="fas fa-bell text-lg"></i>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">3</span>
                  </button>

                  {/* Messages */}
                  <Link to="/inbox" className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    <i className="fas fa-envelope text-lg"></i>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
                  </Link>

                  {/* User Menu */}
                  <Menu as="div" className="relative">
                    <Menu.Button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      {user?.profile_picture ? (
                        <img src={user.profile_picture} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 matrix-gradient rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">{user?.username?.[0]?.toUpperCase()}</span>
                        </div>
                      )}
                      <i className="fas fa-chevron-down text-xs text-gray-500"></i>
                    </Menu.Button>
                    
                    <Transition
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/dashboard"
                              className={`block px-4 py-2 text-sm ${active ? 'bg-gray-50' : ''} text-gray-700 transition-colors duration-150`}
                            >
                              <i className="fas fa-tachometer-alt text-primary-500 w-5"></i> Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={`block px-4 py-2 text-sm ${active ? 'bg-gray-50' : ''} text-gray-700 transition-colors duration-150`}
                            >
                              <i className="fas fa-user text-primary-500 w-5"></i> Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/favorites"
                              className={`block px-4 py-2 text-sm ${active ? 'bg-gray-50' : ''} text-gray-700 transition-colors duration-150`}
                            >
                              <i className="fas fa-heart text-primary-500 w-5"></i> Favorites
                            </Link>
                          )}
                        </Menu.Item>
                        <div className="border-t border-gray-100 my-2"></div>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-red-50' : ''} text-red-600 transition-colors duration-150`}
                            >
                              <i className="fas fa-sign-out-alt text-red-500 w-5"></i> Logout
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200">
                    Login
                  </Link>
                  <Button as={Link} to="/signup" size="sm">
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                <i className="fas fa-bars text-lg"></i>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </form>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              <Link to="/marketplace" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
                <i className="fas fa-search w-5"></i> Browse Items
              </Link>
              {isAuthenticated && (
                <Link to="/items/new" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
                  <i className="fas fa-plus w-5"></i> Sell Item
                </Link>
              )}
              <Link to="/featured" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
                <i className="fas fa-star w-5"></i> Featured
              </Link>
              <Link to="/help-center" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
                <i className="fas fa-question-circle w-5"></i> Help Center
              </Link>
              {isAuthenticated && (
                <>
                  <Link to="/inbox" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
                    <i className="fas fa-envelope w-5"></i> Messages
                  </Link>
                  <Link to="/dashboard" className="block text-gray-700 hover:text-primary-600 font-medium py-2">
                    <i className="fas fa-tachometer-alt w-5"></i> Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header