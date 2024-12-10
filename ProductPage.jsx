import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Components/Cart/CartContext';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AnnouncementBar from '../Header/AnnouncementBar';
import './ProductPage.css';
import { fetchProductById } from '../../api';


const ProductPage = () => {
  const { productId } = useParams();
  const { addToCart, error } = useContext(CartContext); 
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);


  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleBuyItNow = () => {
    console.log(`Bought ${quantity} of ${product.name} immediately`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
    <AnnouncementBar />
    <Header />
    <div className='product-page-container'>
      <div className="product-page">
        <div className="product-details">
          <div 
            className="product-image"
            style={{ backgroundImage: `url(${product.image})` }}
          ></div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="product-price">{product.price}</p>
            <p className="product-description">{product.description}</p>
            <div className="quantity-selector">
              <label>Quantity:</label>
              <input 
                type="number" 
                value={quantity} 
                min="1" 
                onChange={handleQuantityChange} 
              />
            </div>
            <div className="product-actions">
              <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
              <button onClick={handleBuyItNow} className="buy-it-now-btn">Buy it Now</button>
            </div>
          </div>
        </div>
      </div>
      {error && <div className='error-message'>{error}</div>}
    </div>
      <Footer />
    </div>
    
  );
};

export default ProductPage;