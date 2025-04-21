import React from 'react'
import './ProductCard.css'
import { Plus } from 'lucide-react'

const ProductCard = ({ product, addToCart }) => {

  const {
    name = "Product Name",
    price = 4.99,
    image = "/api/placeholder/200/200",
    category = "Category",
    description = "Product description goes here."
  } = product || {}

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-content">
        <span className="product-category">{category}</span>
        <h3 className="product-title">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">₹{price.toFixed(2)}</span>
          <button className="add-to-cart-btn" onClick={()=>addToCart(product)}>
            <Plus size={16} className="add-icon" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard