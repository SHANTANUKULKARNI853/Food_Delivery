import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselDiningout.css';

const CarouselDiningouts = () => {
  const foodItems = [
    {
      id: 1,
      name: "Top Trending Spots",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744451662/res1_vmxiem.jpg`,
    },
    {
      id: 2,
      name: "Best Rooftop Places",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744451730/res3_wdrm4o.jpg`,
    },
    {
      id: 3,
      name: "Newly Opened Places",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744451747/res4_pgjajc.jpg`,
    },
    {
      id: 5,
      name: "Hyderabadi Biryani Spots",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744452738/resss_vfdzwg.jpg`,
    },
    {
      id: 6,
      name: "Best Pubs & Bars",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744452831/resbar_atsqbo.jpg`,
    },
    
  ];

  const settings2 = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,  
  slidesToScroll: 1,
  autoplay: false,
  arrows: true,
  centerMode: false,
  variableWidth: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};
 
   

  return (
    
    <div className="food-carousel-container2">
      <h2 className="sub-title">No more 'where should we eat?' - instant access to what's hot near you.</h2>
      <div className="food-carousel2">
        <Slider {...settings2}>
          {foodItems.map((item) => (
            <div key={item.id} className="carousel-item2">
              <div className="food-image-container2">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="food-image2"
                  loading="lazy2"
                />
              </div>
              <div className="food-info2">
                <h3>{item.name}</h3>
              </div>
            </div>
          
            
          ))}
        </Slider>
      </div>
    </div>
    
  );
};

export default CarouselDiningouts;