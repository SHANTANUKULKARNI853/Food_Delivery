import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RestuarantList.css';

const NightlifeList = () => {
  const navigate = useNavigate();
  
  const nightrestaurants = [
    {     
      id: "65d24g1a4g1a6d4g1a6d4g1a",
      name: "High Ultra Lounge",
      cuisine: ["Asian beers", "Whiskey"],
      rating: 4.2,
      deliveryTime: "30-40 mins",
      costForTwo: 1400,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744818252/ann_eu7kkd.jpg`,
      discount: "50% OFF"
    },
    {
      id: "65d24g1a4g1a6d4g1a6d4g1b",
      name: "Lord of the Drinks",
      cuisine: ["Iced Tea", "Beer Towers", "Flavored Hookahs"],
      rating: 4.0,
      deliveryTime: "25-35 mins",
      costForTwo: 1500,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744818285/an7_bxjqtl.jpg`,
      discount: "40% OFF"
    },
    {
      id: "65d24g1a4g1a6d4g1a6d4g1c",
      name: "The Himalayan Kitchen",
      cuisine: ["Tongba", "Himalayan Whiskey", "Local craft beers"],
      rating: 4.4,
      deliveryTime: "20-30 mins",
      costForTwo: 1350,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744818303/an6_hr1w9h.jpg`,
    },
    {
      id: "65d24g1a4g1a6d4g1a6d4g1d",
      name: "The Piano Man Jazz Club",
      cuisine: ["Wine", "Whiskey Sours", "Craft Cocktails"],
      rating: 3.9,
      deliveryTime: "35-45 mins",
      costForTwo: 1600,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744818322/an5_kbkvbk.jpg`,
    },
    {
      id: "65d24g1a4g1a6d4g1a6d4g1e",
      name: "Four Seasons Hotel",
      cuisine: ["Signature Martinis", "Mojitos"],
      rating: 4.3,
      deliveryTime: "25-35 mins",
      costForTwo: 1150,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744818339/an4_dotncd.jpg`,
      discount: "25% OFF"
    },
    {
      id: "65d24g1a4g1a6d4g1a6d4g2a",
      name: "Gin Explorers Club",
      cuisine: ["100+ Gin varieties", "Botanical cocktails"],
      rating: 4.1,
      deliveryTime: "25-35 mins",
      costForTwo: 450,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744818361/an2_mqj2nx.jpg`,
      discount: "30% OFF"
    }
    
  ];

  const handleRestaurantClick = (id) => {
    navigate(`/night-restaurant/${id}`,{state: {from: 'nightlife'}});
  };

  return (
    <div className="restaurant-list-section">
      <div className="restaurant-list-container">
        <h3 className="section-title">Elevate your evening, one pour at a time</h3>
        
        <div className="restaurant-grid">
          {nightrestaurants.map((restaurant) => (
            <div 
              key={restaurant.id} 
              className="restaurant-card"
              onClick={() => handleRestaurantClick(restaurant.id)}
            >
              {restaurant.promoted && (
                <div className="promoted-label">Promoted</div>
              )}
              <div className="restaurant-image">
                <img src={restaurant.imageUrl} alt={restaurant.name} />
                {restaurant.discount && (
                  <div className="discount-badge">{restaurant.discount}</div>
                )}
              </div>
              <div className="restaurant-details">
                <h3>{restaurant.name}</h3>
                <div className="cuisine">{restaurant.cuisine.join(", ")}</div>
                <div className="restaurant-info">
                  <div className="rating">
                    <span className="star">⭐</span>
                    <span>{restaurant.rating}</span>
                  </div>
                  <div>•</div>
                  <div>{restaurant.deliveryTime}</div>
                  <div>•</div>
                  <div>₹{restaurant.costForTwo} for two</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NightlifeList;
