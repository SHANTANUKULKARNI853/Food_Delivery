import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const restaurants = [
    {     
      id: "65d24f1a4f1a6d4f1a6d4f1a",
      name: "Burger King",
      cuisine: ["Burgers", "American"],
      rating: 4.2,
      deliveryTime: "30-40 mins",
      costForTwo: 400,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431713/r_burger_2_yw1j9z.jpg`,
      discount: "50% OFF"
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f1b",
      name: "Domino's Pizza",
      cuisine: ["Pizzas", "Italian", "Desserts"],
      rating: 4.0,
      deliveryTime: "25-35 mins",
      costForTwo: 500,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431332/rmcdonals_penc4r.jpg`,
      discount: "40% OFF"
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f1c",
      name: "Haldiram's",
      cuisine: ["North Indian", "Sweets", "Snacks"],
      rating: 4.4,
      deliveryTime: "20-30 mins",
      costForTwo: 350,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431388/rhaldiramji_psuibi.jpg`,
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f1d",
      name: "KFC",
      cuisine: ["Fried Chicken", "American", "Fast Food"],
      rating: 3.9,
      deliveryTime: "35-45 mins",
      costForTwo: 600,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431348/rkfc_mg8weh.jpg`,
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f1e",
      name: "Varalakshmi Tiffins",
      cuisine: ["South Indian", "Tiffins"],
      rating: 4.3,
      deliveryTime: "25-35 mins",
      costForTwo: 150,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431520/r_tiffins_lsb5me.jpg`,
      discount: "25% OFF"
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f1f",
      name: "CakeZone",
      cuisine: ["Bakery", "Desserts", "Cakes"],
      rating: 4.0,
      deliveryTime: "51 mins",
      costForTwo: 350,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431547/rcake_srdzyu.jpg`,
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f2a",
      name: "Royal Juice Center",
      cuisine: ["Juices", "Beverages"],
      rating: 4.1,
      deliveryTime: "25-35 mins",
      costForTwo: 450,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431428/rfruit_juice_llht8z.jpg`,
      discount: "30% OFF"
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f2b",
      name: "Ram Ki Bandi",
      cuisine: ["South Indian"],
      rating: 4.1,
      deliveryTime: "25-35 mins",
      costForTwo: 250,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431369/rhomelymeals_cx89el.jpg`,
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f2c",
      name: "Nizams Khana Ghar",
      cuisine: ["North Indian", "Chinese"],
      rating: 4.9,
      deliveryTime: "25-50 mins",
      costForTwo: 150,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431315/rmulticusine_gtuxui.jpg`,
      discount: "30% OFF"
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f2d",
      name: "Mithai Bhandar",
      cuisine: ["Mithai", "Desserts"],
      rating: 3.9,
      deliveryTime: "35-45 mins",
      costForTwo: 450,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431277/rsweets_jsbdmv.jpg`,
      discount: "30% OFF"
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f2e",
      name: "Ali Tasty Hub",
      cuisine: ["Street Food", "Hyderabadi"],
      rating: 4.3,
      deliveryTime: "20-35 mins",
      costForTwo: 350,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431297/rpista_a0penq.jpg`,
      discount: "30% OFF"
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f2f",
      name: "FruitFull",
      cuisine: ["Healthy Food", "Desserts"],
      rating: 4.1,
      deliveryTime: "40 mins",
      costForTwo: 250,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744431410/rfruits_lghxok.jpg`,
    }
  ];

  const restaurant = restaurants.find(r => r.id === id);

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
    navigate('/', { state: { from: 'dining' }, replace: true });
  }  
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

export default RestaurantDetail;