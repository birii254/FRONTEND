import React from 'react'

const BecomeSupplier = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-handshake text-orange-600 text-3xl"></i>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Become a Supplier</h1>
        <p className="text-xl text-gray-600">Join thousands of successful suppliers on Matrix Marketplace</p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-globe text-blue-600 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Global Reach</h3>
          <p className="text-gray-600">Connect with buyers from around the world and expand your market reach.</p>
        </div>

        <div className="card p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-chart-line text-green-600 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Grow Your Business</h3>
          <p className="text-gray-600">Access powerful tools and analytics to grow your sales and optimize performance.</p>
        </div>

        <div className="card p-8 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-shield-alt text-purple-600 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payments</h3>
          <p className="text-gray-600">Get paid securely and on time with our trusted payment protection system.</p>
        </div>
      </div>

      {/* Application Form */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Apply to Become a Supplier</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Company Name</label>
              <input type="text" className="input-field" placeholder="Enter your company name" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Business Registration Number</label>
              <input type="text" className="input-field" placeholder="Enter registration number" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Contact Person</label>
              <input type="text" className="input-field" placeholder="Full name" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <input type="email" className="input-field" placeholder="business@company.com" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Product Categories</label>
            <textarea rows="3" className="input-field" placeholder="Describe the products you want to sell..."></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Business Description</label>
            <textarea rows="4" className="input-field" placeholder="Tell us about your business..."></textarea>
          </div>
          
          <button type="submit" className="w-full btn-primary">
            Submit Application
          </button>
        </form>
      </div>

      {/* Contact */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Questions About Becoming a Supplier?</h2>
        <p className="mb-6">Our supplier relations team is here to help you get started.</p>
        <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
          Contact Us
        </button>
      </div>
    </div>
  )
}

export default BecomeSupplier