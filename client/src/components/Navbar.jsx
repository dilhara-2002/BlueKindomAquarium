import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);
  const { searchResults, isSearching, searchProducts, clearSearch } = useSearch();
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();

  // Handle click outside to close search results and user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Real-time search as user types
  useEffect(() => {
    if (searchQuery.trim()) {
      searchProducts(searchQuery);
      setShowSearchResults(true);
    } else {
      clearSearch();
      setShowSearchResults(false);
    }
  }, [searchQuery, searchProducts, clearSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(false);
      navigate('/store');
      // Refresh page after navigation
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const handleResultClick = (product) => {
    setSearchQuery('');
    setShowSearchResults(false);
    clearSearch();
    navigate('/store');
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-title">
          <h1>BLUE KINGDOM AQUARIUM</h1>
        </div>
        
        <div className="nav-separator"></div>
        
        <div className="nav-content">
          <div className="nav-links">
            <button 
              onClick={() => handleNavClick('/')}
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              HOME
            </button>
            <button 
              onClick={() => handleNavClick('/about')}
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              ABOUT
            </button>
            <button 
              onClick={() => handleNavClick('/store')}
              className={`nav-link ${location.pathname === '/store' ? 'active' : ''}`}
            >
              STORE
            </button>
          </div>
          
          <div className="nav-right">
            <div className="search-form" ref={searchRef}>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="search here..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
              
              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="search-results">
                  {isSearching && searchResults.length > 0 ? (
                    <div className="search-results-list">
                      {searchResults.map((product) => (
                        <div 
                          key={product.id} 
                          className="search-result-item"
                          onClick={() => handleResultClick(product)}
                        >
                          <span className="result-name">{product.name}</span>
                          <span className="result-price">${product.price}</span>
                          {(() => {
                            const isOutOfStock = (product.inStock === false) || (typeof product.stock === 'number' && product.stock <= 0);
                            return (
                              <span className={`result-status ${!isOutOfStock ? 'in-stock' : 'out-of-stock'}`}>
                                {!isOutOfStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            );
                          })()}
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.trim() && !isSearching ? (
                    <div className="search-no-results">
                      <span>Unavailable</span>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
            
            <div className="nav-icons">
              <button 
                onClick={() => {
                  navigate('/cart');
                }}
                className="icon-link cart-icon"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
              
              {isAuthenticated() ? (
                <div className="user-menu" ref={userMenuRef}>
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="icon-link user-icon"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="user-name">{user?.name}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <button onClick={() => { setShowUserMenu(false); navigate('/settings'); }} className="dropdown-item">
                        Settings
                      </button>
                      <button onClick={handleLogout} className="dropdown-item">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => {
                    navigate('/signin');
                  }}
                  className="icon-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 