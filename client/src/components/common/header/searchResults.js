import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResults = ({ query, onClose }) => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const resultsRef = useRef(null);
  const searchInputRef = useRef(null); 

const restaurants = [
    {
      id: "65d24f1a4f1a6d4f1a6d4f1a",
      name: "Burger King",
      cuisine: ["Burgers", "American"],
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431713/r_burger_2_yw1j9z.jpg`,
      type: "delivery"
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f1b",
      name: "Domino's Pizza",
      cuisine: ["Pizzas", "Italian", "Desserts"],
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431332/rmcdonals_penc4r.jpg`,
          type: "delivery"

    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f1c",
      name: "Haldiram's",
      cuisine: ["North Indian", "Sweets", "Snacks"],
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431388/rhaldiramji_psuibi.jpg`,
          type: "delivery"

    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f1d",
      name: "KFC",
      cuisine: ["Fried Chicken", "American", "Fast Food"],
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431348/rkfc_mg8weh.jpg`,
          type: "delivery"

    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f1e",
      name: "Varalakshmi Tiffins",
      cuisine: ["South Indian", "Tiffins"],
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431520/r_tiffins_lsb5me.jpg`,
          type: "delivery"

    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f1f",
      name: "CakeZone",
      cuisine: ["Bakery", "Desserts", "Cakes"],
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431547/rcake_srdzyu.jpg`,
          type: "delivery"

    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f2a",
      name: "Royal Juice Center",
      cuisine: ["Juices", "Beverages"],
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431428/rfruit_juice_llht8z.jpg`,
          type: "delivery"

    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f2b",
      name: "Ram Ki Bandi",
      cuisine: ["South Indian"],
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431369/rhomelymeals_cx89el.jpg`,
          type: "delivery"

    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f2c",
      name: "Nizams Khana Ghar",
      cuisine: ["North Indian", "Chinese"],
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431315/rmulticusine_gtuxui.jpg`,
          type: "delivery"

    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f2d",
      name: "Mithai Bhandar",
      cuisine: ["Mithai", "Desserts"],
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431277/rsweets_jsbdmv.jpg`,
          type: "delivery"

    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f2e",
      name: "Ali Tasty Hub",
      cuisine: ["Street Food", "Hyderabadi"],
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431297/rpista_a0penq.jpg`,
          type: "delivery"

    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f2f",
      name: "FruitFull",
      cuisine: ["Healthy Food", "Desserts"],
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431410/rfruits_lghxok.jpg`,
          type: "delivery"

    },
    
  ];

  useEffect(() => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = restaurants.filter((restaurant) => {
      if (!restaurant.id || !restaurant.imageUrl) return false;
      return (
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.cuisine.some((c) => c.toLowerCase().includes(query.toLowerCase()))
      );
    });

    setSearchResults(results);
  }, [query]);

  const handleRestaurantClick = (id, event) => {
    if (event.type === 'contextmenu') {
      event.preventDefault();
    }

    const restaurantExists = restaurants.some((r) => r.id === id);
    if (!restaurantExists) {
      console.error(`Restaurant with ID ${id} not found`);
      return;
    }

    const isDiningRestaurant = false;

    navigate(`/restaurant/${id}`, {
      state: { from: isDiningRestaurant ? 'dining' : 'delivery' },
    });

    onClose();
  };

  const handleKeyDown = (id, event) => {
    if (event.key === 'Enter') {
      handleRestaurantClick(id, event);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const searchInputWidth = searchInputRef.current ? searchInputRef.current.offsetWidth : '100%';

  if (!query) return null;

  return (
    <div className="search-results-container" style={styles.searchResultsContainer}>
      <div className="search-results-dropdown" ref={resultsRef} style={{ ...styles.searchResultsDropdown, width: searchInputWidth }}>
        {searchResults.length > 0 ? (
          <ul className="search-results-list" style={styles.searchResultsList}>
            {searchResults.map((restaurant) =>
              restaurant?.imageUrl ? (
                <li
                  key={restaurant.id}
                  className="search-result-item"
                  onClick={(e) => handleRestaurantClick(restaurant.id, e)}
                  onContextMenu={(e) => handleRestaurantClick(restaurant.id, e)}
                  onKeyDown={(e) => handleKeyDown(restaurant.id, e)}
                  tabIndex={0}
                  style={styles.searchResultItem}
                >
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="result-image"
                    style={styles.resultImage}
                    onError={(e) => {
                      e.target.src = 'fallback-image-url.jpg';
                    }}
                  />
                  <div className="result-details" style={styles.resultDetails}>
                    <div className="result-name" style={styles.resultName}>{restaurant.name}</div>
                    <div className="result-cuisine" style={styles.resultCuisine}>
                      {Array.isArray(restaurant.cuisine)
                        ? restaurant.cuisine.join(', ')
                        : ''}
                    </div>
                  </div>
                </li>
              ) : null
            )}
          </ul>
        ) : query ? (
          <div className="no-results" style={styles.noResults}>No matching results found</div>
        ) : null}
      </div>
    </div>
  );
};
const styles = {
  searchResultsContainer: {
    position: 'relative',
    width: '100%',
  },
  searchResultsDropdown: {
    position: 'absolute',
    top: 'calc(100% + 30px)',
    left: '-70px', 
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 2000,
    maxHeight: '60vh',
    overflowY: 'auto',
    border: '1px solid #eaeaea',
    animation: 'fadeIn 0.2s ease-out',
    width: '150%',  
    minWidth: '500px',  
    transform: 'translateX(20px)',  
  },
  
  searchResultsList: { 
    listStyle: 'none',
    padding: '18px 10px',
    margin: 0,
  },
  searchResultItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  resultImage: {
    width: '64px',
    height: '64px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginRight: '16px',
    border: '1px solid #f0f0f0',
  },
  resultDetails: {
    flex: 1,
   },
  resultName: {
    fontWeight: 600,
    color: '#333',
    marginBottom: '6px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  resultCuisine: {
    fontSize: '13px',
    color: '#666',
    marginBottom: '8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  noResults: {
    padding: '24px 16px',
    color: '#666',
    textAlign: 'center',
    fontSize: '14px',
  },
};

export default SearchResults;
