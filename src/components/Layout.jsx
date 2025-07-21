import React from 'react'
import Header from './layout/Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      <Footer />
      
      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-40 matrix-gradient hover:opacity-90 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  )
}

export default Layout