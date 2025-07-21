import React from 'react'

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-600">We're here to help and answer any questions you might have</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">First Name</label>
                <input type="text" className="input-field" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name</label>
                <input type="text" className="input-field" placeholder="Doe" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <input type="email" className="input-field" placeholder="john@example.com" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Subject</label>
              <select className="input-field">
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Account Issues</option>
                <option>Billing Questions</option>
                <option>Feature Request</option>
                <option>Report a Problem</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
              <textarea rows="6" className="input-field" placeholder="Tell us how we can help you..."></textarea>
            </div>
            
            <button type="submit" className="w-full btn-primary">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          {/* Contact Cards */}
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-envelope text-primary-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600">support@matrix.com</p>
                  <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-phone text-green-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600">+254 712 345 678</p>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EAT</p>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-comments text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Live Chat</h3>
                  <p className="text-gray-600">Available 24/7</p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Start Chat</button>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Visit Us</h3>
                  <p className="text-gray-600">Nairobi, Kenya</p>
                  <p className="text-gray-600">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact