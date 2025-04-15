import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

const CarouselBrand = () => {
  const foodItems = [
    {
      id: 1,
      name: "Pista House",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744444073/bpista_yiy9bo.jpg`,
    },
    {
      id: 2,
      name: "Domino's Pizza",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744444027/bdominos_itgoyp.png`,
    },
    {
      id: 3,
      name: "Cream Stone",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744444009/bcream_cler5f.png`,
    },
    {
      id: 5,
      name: "Burger King",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744444691/bb2_vzsqqj.jpg`,
    },
    {
      id: 6,
      name: "Mehfil",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744443927/bmehfil_vlbwjm.png`,
    },
    {
      id: 7,
      name: "McDonald's",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744443898/bmc_qbixvn.jpg`,
    },
    {
      id: 8,
      name: "Paradise",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744444054/bparadise_zhnukd.png`,
    },
    {
      id: 9,
      name: "Indian Food",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744443882/bindian_atyq2q.jpg`
    },
    {
      id: 10,
      name: "Kwality Wall's",
      imageUrl: `https://res.cloudinary.com/de79vmsoa/image/upload/v1744444469/bk_wcniy3.jpg`
    },
  ];

  
 const settings = {
  infinite: true,
  speed: 500, 
  slidesToShow: 6,
  slidesToScroll: 1, 
  autoplay: false,
  autoplaySpeed: 500, 
  arrows: true,
  centerMode: false,
  variableWidth: false,
  cssEase: "ease-in-out", 
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1
      }
    }
  ]
};

  return (
    
    <div className="food-carousel-container">
      <h2>Top brands for you</h2>
      <div className="food-carousel">
        <Slider {...settings}>
          {foodItems.map((item) => (
            <div key={item.id} className="carousel-item">
              <div className="food-image-container">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="food-image"
                  loading="lazy"
                />
              </div>
              <div className="food-info">
                <h3>{item.name}</h3>
              </div>
            </div>
          
            
          ))}
        </Slider>
      </div>
    </div>
    
  );
};

export default CarouselBrand;