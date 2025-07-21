import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { itemsAPI } from '../services/api'
import { useAuthStore } from '../store/authStore'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const { user } = useAuthStore()

  const { data: userItems, isLoading } = useQuery(
    'userItems',
    () => itemsAPI.getItems({ created_by: user?.username }),
    {
      select: (response) => response.data,
      enabled: !!user,
    }
  )

  const items = userItems?.results || []
  const activeItems = items.filter(item => item.status === 'active')
  const soldItems = items.filter(item => item.status === 'sold')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your listings and track your sales</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <Link to="/items/new" className="btn-primary flex items-center space-x-2">
            <i className="fas fa-plus"></i>
            <span>New Listing</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Listings</p>
              <p className="text-3xl font-bold text-gray-900">{items.length}</p>
              <p className="text-sm text-green-600 mt-1">
                <i className="fas fa-arrow-up mr-1"></i>
                +12% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <i className="fas fa-box text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="card p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Listings</p>
              <p className="text-3xl font-bold text-gray-900">{activeItems.length}</p>
              <p className="text-sm text-blue-600 mt-1">
                <i className="fas fa-eye mr-1"></i>
                All visible
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <i className="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="card p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-gray-900">{items.reduce((total, item) => total + (item.views || 0), 0)}</p>
              <p className="text-sm text-green-600 mt-1">
                <i className="fas fa-arrow-up mr-1"></i>
                +8% from last week
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <i className="fas fa-eye text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="card p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Messages</p>
              <p className="text-3xl font-bold text-gray-900">23</p>
              <p className="text-sm text-orange-600 mt-1">
                <i className="fas fa-clock mr-1"></i>
                5 unread
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <i className="fas fa-envelope text-orange-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'listings', 'analytics', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 capitalize ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-plus text-green-600"></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">New listing created</p>
                      <p className="text-sm text-gray-600">{items[0]?.name || 'Latest item'} - KSh {items[0]?.price || '0'}</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-message text-blue-600"></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">New message received</p>
                      <p className="text-sm text-gray-600">Inquiry about {items[1]?.name || 'your item'}</p>
                    </div>
                    <span className="text-sm text-gray-500">4 hours ago</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-eye text-purple-600"></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Item viewed</p>
                      <p className="text-sm text-gray-600">{items[0]?.name || 'Your item'} got new views</p>
                    </div>
                    <span className="text-sm text-gray-500">6 hours ago</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/items/new" className="flex items-center space-x-3 p-4 bg-primary-50 hover:bg-primary-100 rounded-xl transition-colors duration-200">
                    <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                      <i className="fas fa-plus text-white"></i>
                    </div>
                    <div>
                      <p className="font-medium text-primary-900">Create Listing</p>
                      <p className="text-sm text-primary-600">Add a new item</p>
                    </div>
                  </Link>
                  
                  <Link to="/inbox" className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <i className="fas fa-envelope text-white"></i>
                    </div>
                    <div>
                      <p className="font-medium text-green-900">Check Messages</p>
                      <p className="text-sm text-green-600">5 unread messages</p>
                    </div>
                  </Link>
                  
                  <button className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors duration-200">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                      <i className="fas fa-chart-line text-white"></i>
                    </div>
                    <div>
                      <p className="font-medium text-orange-900">View Analytics</p>
                      <p className="text-sm text-orange-600">Track performance</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'listings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">My Listings ({items.length})</h3>
                <div className="flex items-center space-x-4">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>All Items</option>
                    <option>Active</option>
                    <option>Sold</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              {items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="group card overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <img 
                          src={item.image || 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400'} 
                          alt={item.name} 
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.status === 'active' ? 'bg-green-500 text-white' :
                            item.status === 'sold' ? 'bg-red-500 text-white' :
                            item.status === 'pending' ? 'bg-yellow-500 text-white' :
                            'bg-gray-500 text-white'
                          }`}>
                            {item.status === 'active' ? 'Active' : 
                             item.status === 'sold' ? 'Sold' :
                             item.status === 'pending' ? 'Pending' :
                             item.status}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="flex space-x-2">
                            <Link to={`/items/${item.id}/edit`} className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 hover:text-blue-700">
                              <i className="fas fa-edit text-sm"></i>
                            </Link>
                            <button 
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this item?')) {
                                  // Handle delete
                                }
                              }}
                              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-600 hover:text-red-700"
                            >
                              <i className="fas fa-trash text-sm"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                            <Link to={`/items/${item.id}`}>{item.name}</Link>
                          </h4>
                          <span className="text-lg font-bold text-primary-600">KSh {item.price}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description || "No description"}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-1">
                            <i className="fas fa-eye"></i>
                            <span>{item.views || 0} views</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <i className="fas fa-clock"></i>
                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Link to={`/items/${item.id}`} className="flex-1 btn-secondary py-2 px-3 text-sm text-center">
                            View
                          </Link>
                          <Link to={`/items/${item.id}/edit`} className="flex-1 btn-primary py-2 px-3 text-sm text-center">
                            Edit
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-box-open text-gray-400 text-3xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings yet</h3>
                  <p className="text-gray-600 mb-6">Create your first listing to start selling on Matrix Marketplace.</p>
                  <Link to="/items/new" className="btn-primary">
                    Create Your First Listing
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Total Views</h4>
                    <i className="fas fa-eye text-blue-600"></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{items.reduce((total, item) => total + (item.views || 0), 0)}</div>
                  <div className="text-sm text-green-600">
                    <i className="fas fa-arrow-up mr-1"></i>
                    +12% from last month
                  </div>
                </div>
                
                <div className="card border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Active Listings</h4>
                    <i className="fas fa-box text-green-600"></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{activeItems.length}</div>
                  <div className="text-sm text-blue-600">
                    <i className="fas fa-eye mr-1"></i>
                    All visible
                  </div>
                </div>
                
                <div className="card border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Items Sold</h4>
                    <i className="fas fa-check-circle text-green-600"></i>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{soldItems.length}</div>
                  <div className="text-sm text-green-600">
                    <i className="fas fa-arrow-up mr-1"></i>
                    +5% from last week
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-chart-line text-gray-400 text-2xl"></i>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Analytics Coming Soon</h4>
                <p className="text-gray-600">Track your listing performance, views, and engagement metrics.</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Profile Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <input type="text" value={user?.username || ''} className="input-field" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" value={user?.email || ''} className="input-field" readOnly />
                    </div>
                    <Link to="/profile" className="btn-primary">
                      Update Profile
                    </Link>
                  </div>
                </div>
                
                <div className="card border border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Notifications</h4>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-3 text-sm text-gray-700">Email notifications for new messages</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-3 text-sm text-gray-700">Email notifications for item inquiries</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      <span className="ml-3 text-sm text-gray-700">Marketing emails</span>
                    </label>
                    <button className="btn-primary">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard