import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 matrix-gradient rounded-lg flex items-center justify-center">
                <i className="fas fa-cube text-white text-sm"></i>
              </div>
              <span className="text-xl font-bold">Matrix Marketplace</span>
            </div>
            <p className="text-gray-400 mb-4">Your trusted marketplace for buying and selling quality items with confidence and security.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors duration-200">Browse Items</Link></li>
              <li><Link to="/items/new" className="text-gray-400 hover:text-white transition-colors duration-200">Sell Item</Link></li>
              <li><Link to="/featured" className="text-gray-400 hover:text-white transition-colors duration-200">Featured</Link></li>
              <li><Link to="/order-protection" className="text-gray-400 hover:text-white transition-colors duration-200">Order Protection</Link></li>
              <li><Link to="/become-supplier" className="text-gray-400 hover:text-white transition-colors duration-200">Become Supplier</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</Link></li>
              <li><Link to="/help-center" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</Link></li>
              <li><Link to="/buyer-central" className="text-gray-400 hover:text-white transition-colors duration-200">Buyer Central</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Report Issue</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Stay updated with the latest deals and features.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-matrix-500"
              />
              <button className="matrix-gradient hover:opacity-90 px-4 py-2 rounded-r-lg transition-all duration-200">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Matrix Marketplace. All rights reserved. Built with ❤️ for the community.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer