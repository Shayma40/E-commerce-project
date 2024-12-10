import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AnnouncementBar from '../Header/AnnouncementBar';
import "./Bestseller.css"

const Bestseller = () => {
  const [bestseller, setbestseller] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchbestseller = async () => {
      try {
        const response = await fetch('http://localhost:7800/api/products/category/BestSeller');
        const data = await response.json();
        setbestseller(data);
      } catch (error) {
        console.error('Error fetching Bestseller products:', error);
      }
    };

    fetchbestseller();
  }, []);


  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <AnnouncementBar />
      <Header />
      <div className="bestseller-page">
        <div className="bestseller-grid">
          {bestseller.map((product) => (
            <div 
              key={product.id} 
              className="bestseller-item"
              onClick={() => handleProductClick(product._id)}
            >
              <img src={product.image} alt={''} />
              <div className="bestseller-info">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bestseller;
