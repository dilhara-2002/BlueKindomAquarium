import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartLoaded, setCartLoaded] = useState(false);
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  // Load cart from localStorage only after auth is loaded
  useEffect(() => {
    if (!authLoading) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          setCartItems(cart);
          updateCartCount(cart);
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
          localStorage.removeItem('cart');
        }
      }
      setCartLoaded(true);
    }
  }, [authLoading]);

  // Save cart to localStorage whenever cart changes (but only after initial load)
  useEffect(() => {
    if (cartLoaded) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      updateCartCount(cartItems);
    }
  }, [cartItems, cartLoaded]);

  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  const addToCart = (product) => {
    if (!isAuthenticated()) {
      return { success: false, requiresAuth: true };
    }

    // Prevent adding out-of-stock items
    const notInStock = (product && (product.inStock === false || product.stock === 0));
    if (notInStock) {
      return { success: false, outOfStock: true };
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product._id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        const newItem = {
          id: product._id,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1,
          inStock: product.inStock
        };
        return [...prevItems, newItem];
      }
    });

    return { success: true };
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== itemId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItems = () => {
    return cartItems;
  };

  const getCartItemCount = () => {
    return cartCount;
  };

  const value = {
    cartItems,
    cartCount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItems,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};