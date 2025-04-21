import React from 'react';
import Navbar from '../components/Navbar';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, setCartItems, user, isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Normally you would process the order here
    alert('Order placed successfully!');
    setCartItems([]);
    navigate('/orders');
  };

  return (
    <div className="cart-page">
      <Navbar 
        cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} 
        user={user}
        onLogout={onLogout}
      />
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button className="continue-shopping" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="quantity-control">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="item-total">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
              </button>
              <button className="continue-link" onClick={() => navigate('/')}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;