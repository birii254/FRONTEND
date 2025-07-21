import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { conversationsAPI } from '../services/api'
import { useAuthStore } from '../store/authStore'
import { Link } from 'react-router-dom'

const Messages = () => {
  const { user } = useAuthStore()
  
  const { data: conversations, isLoading } = useQuery(
    'conversations',
    conversationsAPI.getConversations,
    {
      select: (response) => response.data,
      enabled: !!user,
    }
  )

  return (
    <div className="h-[calc(100vh-200px)]">
      <div className="flex h-full card overflow-hidden">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                  <i className="fas fa-search"></i>
                </button>
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                  <i className="fas fa-filter"></i>
                </button>
              </div>
            </div>
            
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-center space-x-3 p-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : conversations && conversations.length > 0 ? (
              conversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  to={`/inbox/${conversation.id}`}
                  className="block p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img 
                        src={conversation.item?.image || 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=100'} 
                        alt={conversation.item?.name} 
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {conversation.members?.map((member) => {
                        if (member.id !== user?.id) {
                          return (
                            <div key={member.id}>
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-gray-900 truncate">{member.username}</h3>
                                <span className="text-xs text-gray-500">
                                  {new Date(conversation.modified_at).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">{conversation.item?.name}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {conversation.last_message || 'No messages yet'}
                              </p>
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                    
                    <div className="flex flex-col items-end space-y-1">
                      {conversation.unread_count > 0 && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      )}
                      <span className="text-xs text-primary-600 font-medium">
                        KSh {conversation.item?.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-envelope text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversations yet</h3>
                <p className="text-gray-600 mb-4">Start browsing items to connect with sellers</p>
                <Link 
                  to="/marketplace" 
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Browse Items
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {conversations && conversations.length > 0 ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {conversations[0]?.members?.find(m => m.id !== user?.id)?.username?.[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {conversations[0]?.members?.find(m => m.id !== user?.id)?.username}
                      </h3>
                      <p className="text-sm text-green-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Online
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                      <i className="fas fa-phone"></i>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                      <i className="fas fa-video"></i>
                    </button>
                    <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                      <i className="fas fa-info-circle"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">Select a conversation to view messages</p>
                </div>
              </div>
              
              {/* Message Input */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-4">
                  <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    <i className="fas fa-paperclip"></i>
                  </button>
                  <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                    <i className="fas fa-image"></i>
                  </button>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-primary-600 transition-colors duration-200">
                      <i className="fas fa-smile"></i>
                    </button>
                  </div>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-xl transition-colors duration-200">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-comments text-gray-400 text-3xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages