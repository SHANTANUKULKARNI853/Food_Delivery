import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RestuarantList.css';

const RestaurantList = () => {
  const navigate = useNavigate();
  
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

  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`,{state: {from: 'delivery'}});
  };

  return (
    <div className="restaurant-list-section">
      <div className="restaurant-list-container">
        <h3 className="section-title">Hungry? Let your location reveal hidden food gems</h3>
        
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
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

export default RestaurantList;