import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom'; 
import './BestSeller.css';

const BestSeller = () => {
  const [BestSeller, setBestSeller] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestSeller = async () => {
      try {
        const response = await fetch('http://localhost:7800/api/products/category/BestSeller');
        const data = await response.json();
        setBestSeller(data);
      } catch (error) {
        console.error('Error fetching Bestseller products:', error);
      }
    };

    fetchBestSeller();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="best-seller">
      <div className="title-container">
        <h2 className="animated-title">BEST SELLER</h2>
      </div>
      {BestSeller.length > 0 ? (
      <Slider {...settings}>
        {BestSeller.map((product) => (
          <div
            className="product"
            key={product.id}
            onClick={() => handleProductClick(product._id)} 
          >
            <img
              src={product.image}
              alt={``}
            />
          </div>
        ))}
      </Slider>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default BestSeller;