import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';

const Carousel = () => {
  const foodItems = [
    {
      id: 1,
      name: "Biryani",
      imageUrl: "https://res.cloudinary.com/de79vmsoa/image/upload/v1744285450/biryani_jepxph.jpg",
    },
    {
      id: 2,
      name: "Burger",
      imageUrl: "https://res.cloudinary.com/de79vmsoa/image/upload/v1744291886/burger_bxi7rf.jpg",
    },
    {
      id: 3,
      name: "Chicken",
      imageUrl: "https://res.cloudinary.com/de79vmsoa/image/upload/v1744291904/chicken_snxp8w.jpg",
    },
    {
      id: 4,
      name: "NorthIndian",
      imageUrl: "https://res.cloudinary.com/de79vmsoa/image/upload/v1744291964/northindian_zqakpg.jpg",
    },
    {
      id: 5,
      name: "Pizza",
      imageUrl: "https://res.cloudinary.com/de79vmsoa/image/upload/v1744292090/pizza_jjzis6.jpg",
    },
    {
      id: 6,
      name: "Thali",
      imageUrl: "https://res.cloudinary.com/de79vmsoa/image/upload/v1744292170/thali_qxvdnu.jpg",
    },
    {
      id: 7,
      name: "Sweet",
      imageUrl: "https://res.cloudinary.com/de79vmsoa/image/upload/v1744292148/sweets_ibwuyk.png",
    },
    {
      id: 8,
      name: "Shawarma",
      imageUrl: "https://res.cloudinary.com/de79vmsoa/image/upload/v1744292116/shawarma_nxshkp.jpg"
    },
    {
      id: 9,
      name: "Cake",
      imageUrl: "https://res.cloudinary.com/de79vmsoa/image/upload/v1744291860/cake_ipypjc.jpg"
    },
    {
      id: 10,
      name: "Mandi",
      imageUrl: "https://res.cloudinary.com/de79vmsoa/image/upload/v1744293439/mandi_nsg6zb.jpg"
    },
  ];

  
 const settings = {
  infinite: true,
  speed: 1000, 
  slidesToShow: 6,
  slidesToScroll: 1, 
  autoplay: true,
  autoplaySpeed: 3000, 
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
      <h3><p>Craving something delicious? Start your flavor journey here!</p></h3>
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

export default Carousel;