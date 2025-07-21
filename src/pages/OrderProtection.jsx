import React from 'react'

const OrderProtection = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-shield-alt text-green-600 text-3xl"></i>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Protection</h1>
        <p className="text-xl text-gray-600">Your purchases are protected with our comprehensive buyer guarantee</p>
      </div>

      {/* Protection Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-money-bill-wave text-blue-600 text-xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Money Back Guarantee</h3>
          </div>
          <p className="text-gray-600">Get a full refund if your order doesn't arrive or doesn't match the description.</p>
        </div>

        <div className="card p-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-truck text-green-600 text-xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Shipping Protection</h3>
          </div>
          <p className="text-gray-600">We ensure your items are delivered safely or provide compensation for lost packages.</p>
        </div>

        <div className="card p-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <i className="fas fa-certificate text-purple-600 text-xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Quality Assurance</h3>
          </div>
          <p className="text-gray-600">All products are verified for quality and authenticity before shipping.</p>
        </div>

        <div className="card p-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <i className="fas fa-headset text-red-600 text-xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900">24/7 Support</h3>
          </div>
          <p className="text-gray-600">Our customer support team is available around the clock to help resolve any issues.</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="card p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How Order Protection Works</h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="font-semibold text-gray-900">Place Your Order</h3>
              <p className="text-gray-600">Your payment is held securely until you confirm receipt of your order.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="font-semibold text-gray-900">Track Your Shipment</h3>
              <p className="text-gray-600">Monitor your order's progress with real-time tracking updates.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="font-semibold text-gray-900">Confirm Receipt</h3>
              <p className="text-gray-600">Once you receive and approve your order, payment is released to the supplier.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Need Help with an Order?</h2>
        <p className="mb-6">Our protection team is here to assist you with any concerns.</p>
        <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
          Contact Support
        </button>
      </div>
    </div>
  )
}

export default OrderProtection