import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={`/src/assets/${product.image}`} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">Rs. {product.price}.00</div>
        <button className={`add-to-cart-btn ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 