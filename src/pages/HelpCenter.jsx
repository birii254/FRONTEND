import React from 'react'

const HelpCenter = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-question-circle text-blue-600 text-3xl"></i>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-xl text-gray-600">Find answers to common questions and get support</p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input type="text" placeholder="Search for help..." className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg" />
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
        </div>
      </div>

      {/* Quick Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-shopping-cart text-green-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Buying</h3>
          <p className="text-sm text-gray-600 mb-4">How to find and purchase items</p>
          <a href="#buying" className="text-primary-600 hover:text-primary-700 font-medium">Learn more →</a>
        </div>

        <div className="card p-6 hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-store text-orange-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Selling</h3>
          <p className="text-sm text-gray-600 mb-4">How to list and sell your items</p>
          <a href="#selling" className="text-primary-600 hover:text-primary-700 font-medium">Learn more →</a>
        </div>

        <div className="card p-6 hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-credit-card text-blue-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Payments</h3>
          <p className="text-sm text-gray-600 mb-4">Payment methods and security</p>
          <a href="#payments" className="text-primary-600 hover:text-primary-700 font-medium">Learn more →</a>
        </div>

        <div className="card p-6 hover:shadow-md transition-shadow duration-200">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-user text-purple-600 text-xl"></i>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Account</h3>
          <p className="text-sm text-gray-600 mb-4">Managing your account settings</p>
          <a href="#account" className="text-primary-600 hover:text-primary-700 font-medium">Learn more →</a>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
        <p className="mb-6">Our support team is available 24/7 to assist you with any questions.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Contact Support
          </button>
          <a href="https://wa.me/254712345678" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            <i className="fab fa-whatsapp mr-2"></i>WhatsApp Chat
          </a>
        </div>
      </div>
    </div>
  )
}

export default HelpCenter