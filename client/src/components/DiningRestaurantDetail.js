import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RestaurantDetail.css';

const DiningRestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const diningRestaurants = [
    {
      id: "65d24f1a4f1a6d4f1a6d4f51",
      name: "Masala Republics By Dasu's",
      cuisine: ["Asian", "North Indian"],
      rating: 4.2,
      deliveryTime: "4.5 km",
      costForTwo: 1100,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744451800/res7_raklxd.jpg`,
      discount: "50% OFF"
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f52",
      name: "Raja Deluxe",
      cuisine: ["South Indian", "Chinese"],
      rating: 4.4,
      deliveryTime: "7.3 km",
      costForTwo: 1500,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744459041/aa1_idzp9e.png`,
      discount: "40% OFF"
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f53",
      name: "Habitat Cafe",
      cuisine: ["Cafe", "Coffee", "Beverages"],
      rating: 4.3,
      deliveryTime: "7.1 km",
      costForTwo: 1350,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744458997/aa4_jp3xgi.jpg`
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f54",
      name: "The Camp",
      cuisine: ["Modern Indian", "Bar Food", "Chinese"],
      rating: 3.9,
      deliveryTime: "2.8 km",
      costForTwo: 1600,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744459010/aa3_cxix4r.jpg`
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f55",
      name: "Lake District Bar & Kitchen",
      cuisine: ["North Indian", "Chinese", "Salad"],
      rating: 4,
      deliveryTime: "6.4 km",
      costForTwo: 1300,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744459025/aa2_zi1d4o.jpg`
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f56",
      name: "Red Rhino",
      cuisine: ["Asian", "North Indian"],
      rating: 4.6,
      deliveryTime: "12.7 km",
      costForTwo: 2400,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744459154/a4_lbsdxl.jpg`
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f57",
      name: "Jolly Bros & Co.",
      cuisine: ["South Indian", "Continental", "Biryani"],
      rating: 4.8,
      deliveryTime: "7.9 km",
      costForTwo: 1700,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744459241/a1_ct1mbe.jpg`
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f58",
      name: "Medley",
      cuisine: ["Italian", "Desserts", "Tea"],
      rating: 4.2,
      deliveryTime: "7.5 km",
      costForTwo: 1300,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744459227/a2_itv6hw.jpg`
    }
  ];

  const restaurant = diningRestaurants.find(r => r.id === id);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      // 1. Get token and user info from localStorage
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
  
      if (!token || !userString) {
        alert('You must be logged in to add items to the cart.');
        setIsLoading(false);
        return;
      }
  
      const user = JSON.parse(userString);
      const userId = user?._id;
  
      if (!userId) {
        alert('User information is missing or invalid. Please log in again.');
        setIsLoading(false);
        return;
      }
  
      // 2. Send add-to-cart request
      const response = await fetch('https://food-delivery-gj0r.onrender.com/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // If your API uses token-based auth
        },
        body: JSON.stringify({
          userId,
          productId: restaurant.id,
          quantity: 1,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.message || 'Failed to add item to cart');
      }
  
      const data = await response.json();
      console.log('Add to cart success:', data);
      alert(`${restaurant.name} added to cart successfully!`);
      
    } catch (error) {
      console.error('Cart Error:', error);
      alert(`Error: ${error.message || 'Something went wrong'}\nCheck console for details.`);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBackClick = () => {
    navigate('/', { state: { from: 'dining' } });
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
        <p>Enjoy delicious {restaurant.cuisine.join(", ")} cuisine.</p>
        
        <div className="menu-section">
          <h3>Popular Dishes</h3>
          <div className="menu-items">
            <div className="menu-item">
              <div className="menu-item-info">
                <div className="menu-item-name">Signature Dish</div>
                <div className="menu-item-price">₹{Math.round(restaurant.costForTwo / 2)}</div>
              </div>
              <button className="menu-item-add">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiningRestaurantDetail;