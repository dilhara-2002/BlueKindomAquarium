import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/Store.css';

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = [
    { id: 'fish', name: 'Fish' },
    { id: 'medicine', name: 'Medicine' },
    { id: 'plants', name: 'Plants' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'foods', name: 'Foods' }
  ];

  const products = [
    { id: 1, name: 'Arowana Fish', image: 'arowana.png', price: 5000, category: 'fish', inStock: false },
    { id: 2, name: 'Gold Fish', image: 'fish.png', price: 100, category: 'fish', inStock: false },
    { id: 3, name: 'Blue Care', image: 'blue.png', price: 100, category: 'medicine', inStock: true },
    { id: 4, name: 'Gold Fish', image: 'fish.png', price: 100, category: 'fish', inStock: false },
    { id: 5, name: 'Gold Fish', image: 'fish.png', price: 100, category: 'fish', inStock: true },
    { id: 6, name: 'Gold Fish', image: 'fish.png', price: 100, category: 'fish', inStock: true },
    { id: 7, name: 'Gold Fish', image: 'fish.png', price: 100, category: 'fish', inStock: true },
    { id: 8, name: 'Gold Fish', image: 'fish.png', price: 100, category: 'fish', inStock: false }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="store">
      <div className="store-container">
        {/* Left Sidebar - Filters */}
        <div className="filter-sidebar">
          <h3>FILTERS</h3>
          
          <div className="filter-section">
            <h4>Categories</h4>
            <div className="category-list">
              {categories.map(category => (
                <label key={category.id} className="category-item">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={selectedCategory === category.id}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Price</h4>
            <div className="price-inputs">
              <div className="price-input">
                <label>Min</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="price-input">
                <label>Max</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="1000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - Products */}
        <div className="products-area">
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
