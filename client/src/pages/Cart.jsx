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
    <div className="cart">
      <div className="cart-container">
        {/* Left Section - Background with Aquariums */}
        <div className="left-section">
          <div className="background-image">
            <img src="/src/assets/CartBG.png" alt="Aquarium Background" />
          </div>
          
          {/* Aquarium Elements Overlay */}
          <div className="aquarium-overlay">
            {/* Left Aquarium */}
            <div className="aquarium left-aquarium">
              <div className="aquarium-tank">
                <div className="aquarium-water">
                  <div className="fish goldfish-1"></div>
                  <div className="fish goldfish-2"></div>
                  <div className="fish goldfish-3"></div>
                  <div className="plants"></div>
                </div>
                <div className="filter"></div>
              </div>
              <div className="angelfish-above"></div>
            </div>

            {/* Right Aquarium */}
            <div className="aquarium right-aquarium">
              <div className="aquarium-tank">
                <div className="aquarium-water">
                  <div className="fish betta-fish"></div>
                  <div className="fish small-fish-1"></div>
                  <div className="fish small-fish-2"></div>
                  <div className="plants"></div>
                </div>
                <div className="led-light"></div>
              </div>
            </div>

            {/* Accessories */}
            <div className="accessories">
              <div className="accessory fish-medicine">
                <span>FISH MEDICINE</span>
              </div>
              <div className="accessory water-conditioner">
                <span>WATER CONDITIONER</span>
              </div>
              <div className="accessory air-pump"></div>
            </div>
          </div>
        </div>

        {/* Right Section - Shopping Cart */}
        <div className="right-section">
          <div className="cart-panel">
            <h2>SHOPPING CART</h2>
            
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-icon">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">{item.price}.00</p>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
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
            </div>

            <div className="cart-total">
              <span>Total : Rs {getTotal()}.00</span>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
