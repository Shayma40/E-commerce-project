import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryPage.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AnnouncementBar from '../Header/AnnouncementBar';

const MenPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:7800/api/products/category/Men');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching men products:', error);
      }
    };

    fetchProducts();
  }, []);


  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div>
      <AnnouncementBar />
      <Header />
      <div className="category-page">
        <div className="product-grid">
          {products.map(product => (
            <div 
              key={product._id} 
              className="category-product-card"
              onClick={() => handleProductClick(product._id)}
            >
              <div 
                className="category-product-image" 
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <div className="category-product-info">
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

export default MenPage;