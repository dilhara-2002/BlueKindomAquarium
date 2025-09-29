import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { searchAPI, productAPI } from '../services/api';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productAPI.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load all products on component mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const searchProducts = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    try {
      const data = await searchAPI.searchProducts(query);
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  const value = {
    searchResults,
    isSearching,
    searchProducts,
    clearSearch,
    products,
    loading,
    loadProducts
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}; 