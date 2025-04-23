import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RestuarantList.css';

const DiningoutRestaurantList = () => {
  const navigate = useNavigate();
  
  const diningRestaurants = [
    {
      id: "65d24f1a4f1a6d4f1a6d4f51",
      name: "Masala Republics By Dasu's",
      cuisine: ["Asian", "North Indian"],
      rating: 4.2,
      deliveryTime: "4.5 km",
      costForTwo: 1100,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744451800/res7_raklxd.jpg`,
      discount: "50% OFF",
      promoted: true
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
    },
    {
      id: "65d24f1a4f1a6d4f1a6d4f59",
      name: "Lord of the Food ",
      cuisine: ["Asian", "North Indian"],
      rating: 4.2,
      deliveryTime: "4.5 km",
      costForTwo: 1100,
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744451662/res1_vmxiem.jpg`,
      discount: "50% OFF"
    },
  ];

  return (
    <div className="restaurant-list-section">
      <div className="restaurant-list-container">
        <h3 className="section-title">The best local bites within walking distance</h3>
        
        <div className="restaurant-grid">
          {diningRestaurants.map((restaurant) => (
            <div 
              key={restaurant.id} 
              className="restaurant-card"
              onClick={() => navigate(`/dining-restaurant/${restaurant.id}`)}
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

export default DiningoutRestaurantList;