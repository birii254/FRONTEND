import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import ItemDetail from './pages/ItemDetail'
import NewItem from './pages/NewItem'
import EditItem from './pages/EditItem'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'
import Messages from './pages/Messages'
import Featured from './pages/Featured'
import Contact from './pages/Contact'
import HelpCenter from './pages/HelpCenter'
import BuyerCentral from './pages/BuyerCentral'
import BecomeSupplier from './pages/BecomeSupplier'
import FAQ from './pages/FAQ'
import OrderProtection from './pages/OrderProtection'
import { useAuthStore } from './store/authStore'
import { useToast } from './components/ui/Toast'

function App() {
  const { user } = useAuthStore()
  const { ToastContainer } = useToast()

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/featured" element={<Featured />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/buyer-central" element={<BuyerCentral />} />
          <Route path="/become-supplier" element={<BecomeSupplier />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/order-protection" element={<OrderProtection />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          {user && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/items/new" element={<NewItem />} />
              <Route path="/items/:id/edit" element={<EditItem />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/inbox" element={<Messages />} />
              <Route path="/inbox/:id" element={<Messages />} />
              <Route path="/inbox/new/:itemId" element={<Messages />} />
            </>
          )}
        </Routes>
      </Layout>
      <ToastContainer />
    </>
  )
}

export default App