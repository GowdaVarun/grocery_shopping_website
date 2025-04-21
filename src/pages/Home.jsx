import React from 'react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import { Search } from 'lucide-react';
import './Home.css';

const Home = ({ cart, addToCart, user, isAuthenticated, onLogout }) => {

  const products = [
    {
  id: 1,
  name: "Fresh Apples",
  price: 3.99,
  image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=300&h=200",
  category: "Fruits",
  description: "Delicious red apples, perfect for snacking or baking.",
},
{
  id: 2,
  name: "Organic Milk",
  price: 2.49,
  image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&h=200",
  category: "Dairy",
  description: "Farm fresh organic whole milk, hormone-free.",
},
{
  id: 3,
  name: "Whole Wheat Bread",
  price: 4.29,
  image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=300&h=200",
  category: "Bakery",
  description: "Stone-ground whole wheat bread, freshly baked.",
},
{
  id: 4,
  name: "Avocados",
  price: 5.99,
  image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=300&h=200",
  category: "Fruits",
  description: "Ripe Hass avocados, ready to eat.",
},
{
  id: 5,
  name: "Free-Range Eggs",
  price: 3.49,
  image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=300&h=200",
  category: "Dairy",
  description: "Farm fresh free-range eggs from happy chickens.",
},
{
  id: 6,
  name: "Bell Peppers",
  price: 1.99,
  image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=300&h=200",
  category: "Vegetables",
  description: "Colorful bell peppers, perfect for salads and cooking.",
},
{
  id: 7,
  name: "Basmati Rice",
  price: 6.99,
  image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&h=200",
  category: "Grains",
  description: "Premium aged basmati rice, perfect for biryanis and pulaos.",
},
{
  id: 8,
  name: "Herbal Ayurvedic Shampoo",
  price: 5.49,
  image: "https://images.unsplash.com/photo-1655892810227-c0cffe1d9717?auto=format&fit=crop&w=300&h=200",
  category: "Personal Care",
  description: "Nourishing herbal shampoo with amla, shikakai and other traditional Indian herbs for healthy hair growth.",
},
{
  id: 9,
  name: "Whole Indian Spices Pack",
  price: 8.99,
  image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=300&h=200",
  category: "Spices",
  description: "Assortment of whole Indian spices including cardamom, cinnamon, and cloves.",
},
{
  id: 10,
  name: "Alphonso Mangoes",
  price: 9.99,
  image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=300&h=200",
  category: "Fruits",
  description: "Premium Alphonso mangoes from India, known for their rich flavor.",
},
{
  id: 11,
  name: "Masala Chai Tea",
  price: 4.49,
  image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=300&h=200",
  category: "Beverages",
  description: "Traditional Indian spiced tea blend with cardamom, ginger, and cinnamon.",
},
{
  id: 12,
  name: "Besan (Gram Flour)",
  price: 3.29,
  image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=300&h=200",
  category: "Flour",
  description: "Fine chickpea flour for pakoras, sweets, and savory dishes.",
}
  ];

  return (
    <div className="home-page">
      <Navbar 
        cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)} 
        user={user}
        onLogout={onLogout}
      />
      <div className="home-container">
        <div className="hero-section">
          <h1 className="home-title">
            {isAuthenticated 
              ? `Welcome to Small Basket, ${user.name}!` 
              : 'Welcome to Small Basket'}
          </h1>
          <p className="home-subtitle">
            Your one-stop destination for daily needs delivered to your doorstep.
          </p>
          <div className="search-box-container">
            {/* <input
              type="text"
              placeholder="Search for products..."
              className="search-input"
            />
            <button className="search-button">
              <Search size={20} />
            </button> */}
          </div>
        </div>
        <div className="products-section">
          <h2 className="section-title">Featured Products</h2>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;