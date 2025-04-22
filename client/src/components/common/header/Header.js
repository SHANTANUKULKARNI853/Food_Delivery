import React, { useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiUser, FiChevronDown } from 'react-icons/fi';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import SearchResults from './searchResults';

const Header = ({ onTabChange, activeTab, onDeliveryDoubleClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLocationClick = () => {
    setShowLocationDropdown(!showLocationDropdown);
  };

  const handleTabClick = (tab) => {
    if (tab === 'delivery' && activeTab === 'delivery') {
      onDeliveryDoubleClick();
    } else {
      onTabChange(tab);
    }
  };

  return (
    <header className="zomato-header">
      <div className="header-top">
        <div className="header-container">
          <div className="logo-container">
            <span className="logo">Zomato</span>
          </div>

          <div className="search-section">
            <div className="location-selector" onClick={handleLocationClick}>
              <FiMapPin className="location-icon" />
              <span className="location-text">Current Location</span>
              <FiChevronDown className={`dropdown-icon ${showLocationDropdown ? 'rotate' : ''}`} />
            </div>
          </div>
          <div className="search-bar-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for restaurant, cuisine, or a dish"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
      <SearchResults query={searchQuery} onClose={() => setSearchQuery('')} />
    )}
            </div>
          <Link to="/cart">
            <button className="action-button">
              <FiUser className="action-icon" />
              <span className="action-text">Cart</span>
            </button>
          </Link>

          {isLoggedIn ? (
            <Link to="/userprofile">
              <button className="action-button">
                <FiUser className="action-icon" />
                <span className="action-text">Profile</span>
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="action-button">
                <FiUser className="action-icon" />
                <span className="action-text">Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="header-tabs-container">
        <div className="header-tabs">
          <div
            className={`tab ${activeTab === 'dining' ? 'active' : ''}`}
            onClick={() => handleTabClick('dining')}
          >
            <span className="tab-icon">🍽️</span>
            <span className="tab-text">Dining Out</span>
          </div>

          <div
            className={`tab ${activeTab === 'delivery' ? 'active' : ''}`}
            onClick={() => handleTabClick('delivery')}
          >
            <span className="tab-icon">🚚</span>
            <span className="tab-text">Delivery</span>
          </div>

          <div
            className={`tab ${activeTab === 'nightlife' ? 'active' : ''}`}
            onClick={() => handleTabClick('nightlife')}
          >
            <span className="tab-icon">🍸</span>
            <span className="tab-text">Nightlife</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
