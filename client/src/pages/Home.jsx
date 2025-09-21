import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/store');
    // Refresh page after navigation
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Blue Kingdom Aquarium</h1>
          <p>Discover the beauty of underwater life with our premium aquarium supplies and expert guidance</p>
          <button className="cta-button" onClick={handleExploreClick}>Explore Our Store</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
