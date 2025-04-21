import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingCart, User, Package, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ cartItemCount = 0, user = null, onLogout = null }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            Small Basket
          </Link>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <Link to="/" className="navbar-item">
              <Home size={24} />
              <span className="nav-text">Home</span>
            </Link>
            <Link to="/cart" className="navbar-item">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
              <span className="nav-text">Cart</span>
            </Link>
            <Link to="/orders" className="navbar-item">
              <Package size={24} />
              <span className="nav-text">Orders</span>
            </Link>
            
            {user ? (
              <>
                <div className="navbar-item user-info">
                  <User size={24} />
                  <span className="nav-text">{user.name}</span>
                </div>
                {onLogout && (
                  <button onClick={onLogout} className="navbar-item logout-btn">
                    <LogOut size={24} />
                    <span className="nav-text">Logout</span>
                  </button>
                )}
              </>
            ) : (
              <Link to="/login" className="navbar-item">
                <User size={24} />
                <span className="nav-text">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;