import React, { useState } from 'react';
import '../styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Gold Fish',
      price: 100,
      quantity: 2,
      image: '/src/assets/fish.png'
    },
    {
      id: 2,
      name: 'Gold Fish',
      price: 100,
      quantity: 2,
      image: '/src/assets/fish.png'
    },
    {
      id: 3,
      name: 'Gold Fish',
      price: 100,
      quantity: 2,
      image: '/src/assets/fish.png'
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="cart-page">
      <div className="background-image">
        <img src="/src/assets/CartBG.png" alt="Aquarium Background" />
      </div>
      
      <div className="cart-container">
        <div className="cart-panel">
          <div className="cart-title">SHOPPING CART</div>
          
          {cartItems.map((item, index) => (
            <div key={item.id} className="cart-item">
              <div className="item-icon">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <div className="item-name">{item.name}</div>
                <div className="item-price">{item.price}.00</div>
              </div>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn minus"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  className="quantity-btn plus"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button 
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className="cart-divider"></div>
          <div className="cart-total">
            <span>Total : Rs </span>
            <span className="total-amount">{getTotal()}.00</span>
          </div>
          <button className="checkout-btn">
            Proceed to<br/>Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
