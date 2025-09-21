import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { SearchProvider } from './context/SearchContext';
import './App.css';

// Component to handle auto-refresh
const AutoRefresh = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Auto refresh every 30 seconds (30000 milliseconds)
    const refreshInterval = setInterval(() => {
      window.location.reload();
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(refreshInterval);
    };
  }, [location.pathname]); // Re-run effect when location changes

  return children;
};

function App() {
  return (
    <SearchProvider>
      <Router>
        <AutoRefresh>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/store" element={<Store />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </main>
          </div>
        </AutoRefresh>
      </Router>
    </SearchProvider>
  );
}

export default App;
