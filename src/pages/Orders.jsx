import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Order.css';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const storedOrders = localStorage.getItem('userOrders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      // Default order for demonstration if none found
      setOrders([
        {
          id: "ORD-12342",
          date: "March 28, 2025",
          total: 21.98,
          status: "Delivered",
          items: 2
        }
      ]);
    }
  }, []);

  // Status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case "Delivered": return "status-delivered";
      case "Shipped": return "status-shipped";
      case "Processing": return "status-processing";
      default: return "status-default";
    }
  };

  return (
    <div className="orders-page">
      <Navbar />
      <div className="orders-container">
        <h1 className="orders-title">Your Orders</h1>
        
        {orders.length === 0 ? (
          <div className="empty-orders">
            <ShoppingBag size={48} className="empty-icon" />
            <p>You haven't placed any orders yet.</p>
            <button 
              className="browse-products-btn"
              onClick={() => navigate('/')}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3 className="order-id">{order.id}</h3>
                    <span className="order-date">Ordered on {order.date}</span>
                  </div>
                  <div className={`order-status ${getStatusColor(order.status)}`}>
                    {order.status}
                  </div>
                </div>
                
                <div className="order-details">
                  <div className="order-summary">
                    <Package size={18} className="order-icon" />
                    <span className="items-count">{order.items} {order.items === 1 ? 'item' : 'items'}</span>
                  </div>
                  <div className="order-total">
                    <span className="total-label">Total:</span>
                    <span className="total-amount">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;