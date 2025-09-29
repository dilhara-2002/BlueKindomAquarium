import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const getImageSrc = () => {
    if (product.image) {
      // If image is uploaded to backend (stored in uploads folder)
      return `http://localhost:5000/uploads/products/${product.image}`;
    } else if (product.id) {
      // Try to find image by product id
      return `http://localhost:5000/uploads/products/${product.id}.jpg`;
    } else {
      // Fallback to default image
      return `/src/assets/fish.png`;
    }
  };

  const handleImageError = (e) => {
    // If backend image fails to load, try different extensions
    const currentSrc = e.target.src;
    if (currentSrc.includes('.jpg')) {
      e.target.src = currentSrc.replace('.jpg', '.png');
    } else if (currentSrc.includes('.png')) {
      e.target.src = currentSrc.replace('.png', '.jpeg');
    } else if (currentSrc.includes('.jpeg')) {
      e.target.src = currentSrc.replace('.jpeg', '.gif');
    } else {
      // Final fallback to default image
      e.target.src = '/src/assets/fish.png';
    }
  };

  const handleAddToCart = () => {
    if (!product.inStock) {
      alert('This product is out of stock!');
      return;
    }

    const result = addToCart(product);
    
    if (!result.success) {
      if (result.requiresAuth) {
        alert('Please login to add items to cart');
        navigate('/signin');
      } else if (result.outOfStock) {
        alert('This product is out of stock!');
      } else {
        alert('Failed to add item to cart');
      }
    } else {
      alert('Item added to cart successfully!');
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {!product.inStock && (
          <div style={{ position: 'absolute', top: 8, left: 8, background: '#EF4444', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>Out of Stock</div>
        )}
        <img 
          src={getImageSrc()} 
          alt={product.name}
          onError={handleImageError}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">Rs. {product.price}.00</div>
        <button 
          className={`add-to-cart-btn ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
          style={!product.inStock ? { background: '#EF4444', cursor: 'not-allowed' } : undefined}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 