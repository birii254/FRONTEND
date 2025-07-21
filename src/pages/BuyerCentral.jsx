import React from 'react'
import { Link } from 'react-router-dom'

const BuyerCentral = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-user-tie text-indigo-600 text-3xl"></i>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Buyer Central</h1>
        <p className="text-xl text-gray-600">Your complete guide to successful buying on Matrix Marketplace</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
          <div className="text-sm text-gray-600">Active Suppliers</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">1M+</div>
          <div className="text-sm text-gray-600">Products Available</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">99.8%</div>
          <div className="text-sm text-gray-600">Order Success Rate</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
          <div className="text-sm text-gray-600">Customer Support</div>
        </div>
      </div>

      {/* Get Started */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Buying?</h2>
        <p className="mb-6">Join thousands of successful buyers on Matrix Marketplace today.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/marketplace" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Browse Products
          </Link>
          <Link to="/signup" className="bg-indigo-800 hover:bg-indigo-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BuyerCentral