import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RestaurantDetail.css';
 
const NightRestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
 
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
 
  const restaurant = nightrestaurants.find(r => r.id === id);
 
  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const testUserId = "65d24f1a4f1a6d4f1a6d4f1a";
     
      const response = await fetch('https://food-delivery-gj0r.onrender.com/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: testUserId,
          productId: restaurant.id,
          quantity: 1
        }),
      });
 
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Failed to add to cart');
      }
 
      const data = await response.json();
      console.log('API Success:', data);
      alert(`${restaurant.name} added to cart successfully!`);
     
    } catch (error) {
      console.error('Cart Error:', error);
      alert(`Error: ${error.message}\nCheck console for details.`);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBackClick = () => {
    navigate('/', { state: { from: 'nightlife' } });
  };
 
  return (
    <div className="restaurant-detail-container">
      <button className="back-button" onClick={handleBackClick}>
        &larr; Back to Restaurants
      </button>
     
      <div className="restaurant-header">
        <div className="restaurant-image-container">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="restaurant-main-image"
          />
          {restaurant.discount && (
            <div className="detail-discount-badge">{restaurant.discount}</div>
          )}
        </div>
       
        <div className="restaurant-info">
          <h1>{restaurant.name}</h1>
         
          <div className="rating-info">
            <span className="rating-badge">
              ⭐ {restaurant.rating}
            </span>
            <span className="delivery-time">{restaurant.deliveryTime}</span>
            <span className="cost-for-two">₹{restaurant.costForTwo} for two</span>
          </div>
         
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
     
      <div className="restaurant-content">
        <h2>About {restaurant.name}</h2>
        <p>Enjoy delicious {restaurant.cuisine.join(", ")} cuisine with fast delivery in {restaurant.deliveryTime}.</p>
       
        <div className="menu-section">
          <h2>Menu</h2>
          <div className="menu-items">
            <div className="menu-item">
              <div className="menu-item-info">
                <div className="menu-item-name">Sample Dish 1</div>
                <div className="menu-item-price">₹200</div>
                <div className="menu-item-description">Delicious sample dish description</div>
              </div>
              <button className="menu-item-add">ADD</button>
            </div>
            <div className="menu-item">
              <div className="menu-item-info">
                <div className="menu-item-name">Sample Dish 2</div>
                <div className="menu-item-price">₹250</div>
                <div className="menu-item-description">Another tasty dish description</div>
              </div>
              <button className="menu-item-add">ADD</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default NightRestaurantDetail;