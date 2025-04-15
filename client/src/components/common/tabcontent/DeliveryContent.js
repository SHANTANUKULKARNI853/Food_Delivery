import React from 'react';
import './TabContent.css';
import Carousel from '../carousel/Carousel';
import CarouselBrand from '../carousel/CarouselBrand';
import RestaurantList from '../restaurant/RestuarantList';

const DeliveryContent = ({ showFilters }) => {
  return (
    <div className="tab-content">
      {showFilters && (
        <div className="delivery-filters">
          <div className="filter-item">
            <span className="filter-icon">🔍</span>
            <span>Filters</span>
          </div>
          <div className="filter-item">
            <span>Rating: 4.0+</span>
          </div>
          <div className="filter-item">
            <span>Safe and Hygienic</span>
          </div>
          <div className="filter-item">
            <span>Pure Veg</span>
          </div>
          <div className="filter-item">
            <span>Delivery Time</span>
          </div>
          <div className="filter-item">
            <span>Great Offers</span>
          </div>
        </div>
      )}
      <Carousel/>
      <CarouselBrand/>
      <RestaurantList/>

    </div>
    
  );
};

export default DeliveryContent;