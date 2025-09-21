import React, { createContext, useContext, useState } from 'react';

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

  // Product data - same as in Store component
  const products = [
    { id: 1, name: 'Arowana Fish', image: 'arowana.png', price: 5000, category: 'fish', inStock: false },
    { id: 2, name: 'Gold Fish', image: 'fish.png', price: 100, category: 'fish', inStock: false },
    { id: 3, name: 'Blue Care', image: 'blue.png', price: 100, category: 'medicine', inStock: true },
    { id: 4, name: 'Gold Fish', image: 'fish.png', price: 100, category: 'fish', inStock: false },
    { id: 5, name: 'Gold Fish', price: 100, category: 'fish', inStock: true },
    { id: 6, name: 'Gold Fish', price: 100, category: 'fish', inStock: true },
    { id: 7, name: 'Gold Fish', price: 100, category: 'fish', inStock: true },
    { id: 8, name: 'Gold Fish', price: 100, category: 'fish', inStock: false }
  ];

  const searchProducts = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Search by letter matching (case-insensitive)
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filtered);
  };

  const clearSearch = () => {
    setSearchResults([]);
    setIsSearching(false);
  };

  const value = {
    searchResults,
    isSearching,
    searchProducts,
    clearSearch,
    products
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}; 