import React from 'react';
import './TabContent.css'
import NightlifeList from '../restaurant/NightRestuarant'
 
 
const NightlifeContent = (showFilters2) => {
  return (
 
<div className="tab-content">
            <h2>Collections</h2>
 
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
         
        </div>
<NightlifeList/>
 
    </div>
 
 
  );
};
 
export default NightlifeContent;