import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import { useSearch } from '../context/SearchContext';
import { productAPI } from '../services/api';
import '../styles/Store.css';

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { products } = useSearch();

  const categories = [
    { id: 'fish', name: 'Fish' },
    { id: 'medicine', name: 'Medicine' },
    { id: 'plants', name: 'Plants' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'foods', name: 'Foods' }
  ];

  const applyFilters = useCallback(async () => {
    try {
      setLoading(true);
      const filters = {};
      
      if (selectedCategory !== 'all') {
        filters.category = selectedCategory;
      }
      
      if (minPrice) {
        filters.minPrice = minPrice;
      }
      
      if (maxPrice) {
        filters.maxPrice = maxPrice;
      }

      const data = await productAPI.getProducts(filters);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error filtering products:', error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, minPrice, maxPrice]);

  // Apply filters when filter values change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

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
            {loading ? (
              <div className="loading-message">Loading products...</div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="no-products-message">No products found matching your criteria.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;