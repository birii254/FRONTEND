import React from 'react'
import { Link } from 'react-router-dom'

const Featured = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Featured Selections</h1>
        <p className="text-xl text-gray-600">Handpicked premium products from verified suppliers</p>
      </div>

      {/* Featured Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <i className="fas fa-star text-3xl text-yellow-300"></i>
            <div>
              <h3 className="text-2xl font-bold">Premium Electronics</h3>
              <p className="text-blue-100">Latest tech from top brands</p>
            </div>
          </div>
          <p className="text-blue-100 mb-6">Discover cutting-edge electronics with warranty and quality assurance.</p>
          <Link to="/marketplace?featured=true&category=electronics" className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
            Explore Now
          </Link>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-8 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <i className="fas fa-shield-alt text-3xl text-yellow-300"></i>
            <div>
              <h3 className="text-2xl font-bold">Verified Suppliers</h3>
              <p className="text-green-100">Trusted business partners</p>
            </div>
          </div>
          <p className="text-green-100 mb-6">Connect with verified suppliers who meet our strict quality standards.</p>
          <Link to="/marketplace?verified=true" className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200">
            View Suppliers
          </Link>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-8 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <i className="fas fa-crown text-3xl text-yellow-300"></i>
            <div>
              <h3 className="text-2xl font-bold">Exclusive Deals</h3>
              <p className="text-purple-100">Limited time offers</p>
            </div>
          </div>
          <p className="text-purple-100 mb-6">Special pricing and exclusive products available only to our members.</p>
          <Link to="/marketplace?deals=true" className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200">
            See Deals
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">This Week's Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative card border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">Featured</span>
            </div>
            <img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Featured Product" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Premium Office Chair</h3>
              <p className="text-primary-600 font-bold">KSh 15,000 - 25,000</p>
              <p className="text-sm text-gray-600 mt-1">Min. order: 5 pieces</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured