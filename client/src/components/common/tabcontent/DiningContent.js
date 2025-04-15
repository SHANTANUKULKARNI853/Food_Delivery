import React from 'react';
import './TabContent.css';
import CarouselDiningout from '../carousel/CarouselDining';
import DiningoutRestaurantList from '../restaurant/DiningoutRestuarant'
const Diningout = (showFilters2) => {
  return (
    <div className="tab-content">
            <h2>Collections</h2>
            <CarouselDiningout/>

      {showFilters2 && (
        <div className="delivery-filters2">
          <div className="filter-item">
            <span className="filter-icon">🔍</span>
            <span>Filters</span>
          </div>
                    <div className="filter-item">
            <span>Offers</span>
          </div>

          <div className="filter-item">
            <span>Rating: 4.5+</span>
          </div>
          <div className="filter-item">
            <span>Pet Friendly</span>
          </div>
          <div className="filter-item">
            <span>Outdoor Seating</span>
          </div>
          <div className="filter-item">
            <span>Serves Alcohol</span>
          </div>
          <div className="filter-item">
            <span>Open Now</span>
          </div>
        </div>
      )}
<div>
        <img
      src="https://res.cloudinary.com/de79vmsoa/image/upload/v1744455047/ao_stx5m8.jpg"
      alt="Beautifully arranged outdoor dining area"

          className="dining-image1"
/>
      <img
          src="https://res.cloudinary.com/de79vmsoa/image/upload/v1744456635/add2_ovxwkf.jpg" 
          alt="Cozy indoor restaurant atmosphere"
          className="dining-image"
        />
        


</div>
<DiningoutRestaurantList/>

    </div>
  );
};

export default Diningout;