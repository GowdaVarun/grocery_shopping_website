import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Login from './pages/Login'
import React, { useState, useEffect } from 'react'

function App() { 
  // Initialize cart state
  const [cart, setCart] = useState([])
  
  // Initialize auth state
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('groceryUser')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])
  
  // Function to handle login
  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem('groceryUser', JSON.stringify(userData))
  }
  
  // Function to handle logout
  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('groceryUser')
  }
  
  // Function to add items to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home 
          cart={cart} 
          addToCart={addToCart} 
          user={user} 
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout} 
        />} />
        <Route path="/cart" element={<Cart 
          cartItems={cart} 
          setCartItems={setCart} 
          user={user}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />} />
        <Route path="/orders" element={
          isAuthenticated ? 
          <Orders 
            user={user}
            onLogout={handleLogout} 
          /> : 
          <Navigate to="/login" replace />
        } />
        <Route path="/login" element={<Login 
          onLogin={handleLogin}
          isAuthenticated={isAuthenticated} 
        />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App