import React from 'react'
import { useAuthStore } from '../store/authStore'

const Profile = () => {
  const { user } = useAuthStore()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-user text-gray-400 text-3xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Page</h1>
        <p className="text-gray-600 mb-6">Profile management coming soon</p>
        <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
          <h2 className="font-semibold text-gray-900 mb-4">Current User Info</h2>
          <div className="text-left space-y-2">
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>First Name:</strong> {user?.first_name}</p>
            <p><strong>Last Name:</strong> {user?.last_name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile