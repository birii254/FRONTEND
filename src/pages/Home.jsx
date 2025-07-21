import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { categoriesAPI } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const {
    data: items,
    isLoading: itemsLoading,
    error: itemsError
  } = useQuery(['featuredItems'], categoriesAPI.getFeaturedItems, {
    select: (data) => data.data
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError
  } = useQuery(['categories'], categoriesAPI.getCategories, {
    select: (data) => data.data
  });

  if (itemsLoading || categoriesLoading) {
    return <div className="flex justify-center items-center min-h-screen"><LoadingSpinner size="xl" /></div>;
  }

  if (itemsError || categoriesError) {
    return <div className="text-center py-20 text-red-600">Failed to load content. Please try again later.</div>;
  }

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "Matrix Marketplace has transformed how I source products for my business. The quality and reliability are outstanding!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Procurement Manager",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "The verification system gives me confidence in every purchase. I've saved 30% on costs while improving quality.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Retail Chain Director",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
      content: "Excellent platform with amazing customer support. The global reach has opened up new opportunities for our business.",
      rating: 5
    }
  ];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-matrix-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Connect. Trade. 
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Succeed.
                  </span>
                </h1>
                <p className="text-xl text-blue-100 leading-relaxed">
                  The world's leading B2B marketplace connecting verified suppliers with global buyers. 
                  Discover quality products, secure transactions, and endless opportunities.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button as={Link} to="/marketplace" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  <i className="fas fa-search mr-2"></i>
                  Start Buying
                </Button>
                <Button 
                  as={Link} 
                  to="/become-supplier" 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary-600"
                >
                  <i className="fas fa-handshake mr-2"></i>
                  Become a Supplier
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-blue-200 text-sm">Verified Suppliers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">1M+</div>
                  <div className="text-blue-200 text-sm">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-blue-200 text-sm">Countries</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="relative z-10">
                <img 
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Global Trading" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Matrix Marketplace?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need for successful B2B trading with security, efficiency, and global reach.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'fas fa-shield-alt',
                title: 'Secure Trading',
                description: 'Advanced security measures, verified suppliers, and secure payment processing ensure safe transactions.',
                color: 'blue'
              },
              {
                icon: 'fas fa-globe',
                title: 'Global Reach',
                description: 'Connect with suppliers and buyers from over 200 countries worldwide for unlimited opportunities.',
                color: 'green'
              },
              {
                icon: 'fas fa-chart-line',
                title: 'Business Growth',
                description: 'Powerful analytics, marketing tools, and business insights to help grow your trading business.',
                color: 'purple'
              },
              {
                icon: 'fas fa-headset',
                title: '24/7 Support',
                description: 'Round-the-clock customer support in multiple languages to assist with all your trading needs.',
                color: 'orange'
              },
              {
                icon: 'fas fa-truck',
                title: 'Logistics Support',
                description: 'Comprehensive shipping and logistics solutions to ensure your products reach their destination safely.',
                color: 'red'
              },
              {
                icon: 'fas fa-certificate',
                title: 'Quality Assurance',
                description: 'Rigorous supplier verification and product quality checks to ensure you get exactly what you order.',
                color: 'yellow'
              }
            ].map((feature, index) => (
              <Card key={index} hover className="p-8 group">
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <i className={`${feature.icon} text-${feature.color}-600 text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-xl text-gray-600">Explore millions of products across diverse categories</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories?.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                to={`/marketplace?category=${category.id}`}
                className="group bg-white hover:bg-primary-50 rounded-2xl p-6 text-center transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-primary-100 group-hover:bg-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
                  <i className={`${category.icon || 'fas fa-box'} text-primary-600 text-2xl`}></i>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.items_count || 0}+ products</p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button as={Link} to="/marketplace" variant="outline">
              View All Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Handpicked premium products from verified suppliers</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items?.slice(0, 8).map((item) => (
              <Card key={item.id} hover className="overflow-hidden group">
                <div className="relative">
                  <img
                    src={item.images?.[0] || item.image || 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-200">
                      <i className="fas fa-heart text-sm"></i>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1 truncate group-hover:text-primary-600 transition-colors duration-200">{item.name}</h3>
                  <p className="text-gray-600 text-sm truncate mb-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-primary-600 text-xl font-semibold">
                      {new Intl.NumberFormat('en-KE', {
                        style: 'currency',
                        currency: 'KES'
                      }).format(item.price)}
                    </div>
                    <Button as={Link} to={`/items/${item.id}`} size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button as={Link} to="/marketplace" size="lg">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start your global trading journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Register & Verify",
                description: "Create your account and complete our verification process to ensure secure trading."
              },
              {
                step: 2,
                title: "Connect & Negotiate",
                description: "Browse products, connect with suppliers, and negotiate the best deals for your business."
              },
              {
                step: 3,
                title: "Trade & Grow",
                description: "Complete secure transactions and grow your business with our comprehensive trading platform."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-200">
                    <span className="text-white text-2xl font-bold">{step.step}</span>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-primary-200 -z-10"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied traders worldwide</p>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-8 text-center transform hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center justify-center space-x-1 text-yellow-500 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center justify-center space-x-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-matrix-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl text-blue-100 mb-8">Join millions of businesses already trading on Matrix Marketplace</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              as={Link} 
              to="/signup" 
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100"
            >
              Get Started Free
            </Button>
            <Button 
              as={Link} 
              to="/contact" 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-600"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;