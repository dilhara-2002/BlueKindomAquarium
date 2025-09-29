import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';
import '../styles/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal, 
    clearCart 
  } = useCart();
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = async () => {
    if (!isAuthenticated()) {
      alert('Please login to proceed with checkout');
      navigate('/signin');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setLoading(true);
    try {
      // Prepare order data
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: address,
        paymentMethod: 'cash_on_delivery'
      };

      // Create order
      const response = await orderAPI.createOrder(orderData);
      
      if (response.order) {
        alert('Order placed successfully! Order ID: ' + response.order._id);
        clearCart();
        navigate('/');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getImageSrc = (item) => {
    if (item.image) {
      return `http://localhost:5000/uploads/products/${item.image}`;
    } else {
      return `/src/assets/fish.png`;
    }
  };

  // Shipping address local state (editable on cart)
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  // Prefill from user profile if present
  React.useEffect(() => {
    if (user?.shippingAddress) {
      setAddress(prev => ({
        ...prev,
        ...user.shippingAddress
      }));
    }
  }, [user]);

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <div className="cart-page">
        <div className="background-image">
          <img src="/src/assets/CartBG.png" alt="Aquarium Background" />
        </div>
        
        <div className="cart-container">
          <div className="cart-panel">
            <div className="cart-title">SHOPPING CART</div>
            <div className="loading-message">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return (
      <div className="cart-page">
        <div className="background-image">
          <img src="/src/assets/CartBG.png" alt="Aquarium Background" />
        </div>
        
        <div className="cart-container">
          <div className="cart-panel">
            <div className="cart-title">SHOPPING CART</div>
            <div className="login-required">
              <h3>Please Login to View Your Cart</h3>
              <p>You need to be logged in to access your shopping cart.</p>
              <button 
                className="auth-btn"
                onClick={() => navigate('/signin')}
              >
                Login
              </button>
              <button 
                className="auth-btn secondary"
                onClick={() => navigate('/signup')}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="background-image">
        <img src="/src/assets/CartBG.png" alt="Aquarium Background" />
      </div>
      
      <div className="cart-container">
        <div className="cart-panel">
          <div className="cart-title">SHOPPING CART</div>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h3>Your cart is empty</h3>
              <p>Add some products to your cart to get started!</p>
              <button 
                className="continue-shopping-btn"
                onClick={() => navigate('/store')}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="address-form" style={{ width: '90%', margin: '0 auto 20px auto', padding: '12px', borderRadius: '12px', outline: '1px solid #ffffff30' }}>
                <h4 style={{ color: '#fff', margin: '0 0 10px 0' }}>Shipping Address</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                  <input type="text" placeholder="Street" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} className="search-input" />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input type="text" placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} className="search-input" />
                    <input type="text" placeholder="State/Province" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} className="search-input" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input type="text" placeholder="Postal Code" value={address.zipCode} onChange={e => setAddress({ ...address, zipCode: e.target.value })} className="search-input" />
                    <input type="text" placeholder="Country" value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} className="search-input" />
                  </div>
                </div>
              </div>
              <div className="cart-items-container">
                {cartItems.map((item, index) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-icon">
                      <img src={getImageSrc(item)} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">Rs. {item.price}.00</div>
                      <div className="item-category">{item.category}</div>
                    </div>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn minus"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn plus"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="item-total">
                        Rs. {(item.price * item.quantity)}.00
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
                
              <div className="cart-divider"></div>
              <div className="cart-total">
                <span>Total : Rs </span>
                <span className="total-amount">{getCartTotal()}.00</span>
              </div>
              {cartItems.some(ci => ci.inStock === false) && (
                <div className="login-required" style={{ paddingTop: 10 }}>
                  <p style={{ color: '#EF4444', fontWeight: 700 }}>One or more items are out of stock. Please remove them to proceed.</p>
                </div>
              )}
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={loading || cartItems.some(ci => ci.inStock === false)}
              >
                {loading ? 'Processing...' : 'Proceed to\nCheckout'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
