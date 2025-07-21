import React, { useState } from 'react'

const FAQ = () => {
  const [openItems, setOpenItems] = useState({})

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const faqs = [
    {
      question: "What is Matrix Marketplace?",
      answer: "Matrix Marketplace is a B2B platform connecting buyers with verified suppliers worldwide. We facilitate secure transactions and provide tools for successful business relationships.",
      category: "general"
    },
    {
      question: "How do I find reliable suppliers?",
      answer: "Look for verified suppliers with good ratings, complete profiles, and positive reviews. Use our supplier verification tools and always communicate directly before placing orders.",
      category: "buying"
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept major credit cards, bank transfers, and mobile money payments. All transactions are secured with our buyer protection program.",
      category: "buying"
    },
    {
      question: "How do I become a verified supplier?",
      answer: "Complete your business profile, provide required documentation (business license, certifications), maintain good seller ratings, and pass our verification process.",
      category: "selling"
    },
    {
      question: "What are the selling fees?",
      answer: "Basic listings are free. We charge a small commission (3-5%) only when you successfully complete a sale. Premium features and advertising have additional costs.",
      category: "selling"
    },
    {
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page, enter your email address, and follow the instructions in the reset email we send you.",
      category: "account"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-question-circle text-yellow-600 text-3xl"></i>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">Quick answers to common questions about Matrix Marketplace</p>
      </div>

      {/* Search FAQ */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <input type="text" placeholder="Search FAQs..." className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-lg" />
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="card">
            <button
              onClick={() => toggleItem(index)}
              className="flex items-center justify-between cursor-pointer p-6 text-gray-900 font-medium w-full text-left"
            >
              <span>{faq.question}</span>
              <i className={`fas fa-chevron-down transition-transform duration-200 ${openItems[index] ? 'rotate-180' : ''}`}></i>
            </button>
            {openItems[index] && (
              <div className="px-6 pb-6">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Didn't Find Your Answer?</h2>
        <p className="mb-6">Our support team is here to help you with any questions.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
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

export default FAQ