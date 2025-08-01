import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Signinup.css';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement sign in functionality
    console.log('Sign in data:', formData);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-panel">
          <div className="auth-header">
            <h1>BLUE KINGDOM</h1>
            <h2>Sign In</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
