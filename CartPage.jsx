import React, { useContext, useEffect, useState } from 'react'; 
import './CartPage.css';
import { CartContext } from '../Cart/CartContext';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AnnouncementBar from '../Header/AnnouncementBar';

const CartPage = () => {
  const { cartItems = [], removeFromCart, calculateTotalAmount, error, isLoading } = useContext(CartContext);
  const [bestseller, setBestseller] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBestseller = async () => {
      try {
        const response = await fetch('http://localhost:7800/api/products/category/BestSeller');
        if (!response.ok) {
          throw new Error('Failed to fetch Bestseller products');
        }
        const data = await response.json();
        setBestseller(data);
      } catch (error) {
        console.error('Error fetching Bestseller products:', error);
      }
    };

    fetchBestseller();
  }, []);

  const handleCheckout = async () => {
    const totalAmount = calculateTotalAmount();
    if (!totalAmount === 0) {
      console.error('Total amount is not available');
      return;
    }
    try {
      const response = await fetch('http://localhost:7800/api/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total: totalAmount }),
      });
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      const data = await response.json();
      await navigate(`/checkout?orderID=${data.id}`);
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const handleViewAll = () => {
    navigate('/Bestseller');
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      <AnnouncementBar />
      <Header />
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
          </div>
          {isLoading ? (
            <p>Loading cart...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => {
                const product = item.productId;
                if (!product) {
                  console.warn(`Product data missing for item: ${item._id}`);
                  return null;
                }
                return (
                <div key={product._id} className="cart-item">
                  <img 
                    src={product.image} 
                    alt={item.productId.name}
                    // eslint-disable-next-line no-unused-expressions
                    onError={(e) => { e.target.src }}
                  />
                  <div>
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                    <p>Quantity: {item.quantity || 1}</p>
                    <button onClick={() => removeFromCart(product._id)}>Remove</button>
                  </div>
                </div>
                );
              })}
              {/* Display Total Price */}
              <div className="cart-total">
                <h2>Total: ${calculateTotalAmount()}</h2>
              </div>
              <button className="proceed-button" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </>
          )}
        </div>

        {/* Best Seller Section */}
        <div className="best-seller-section">
          <h2>Best Seller</h2>
          <div className="best-seller-grid">
            {bestseller.slice(0, 3).map((product) => (
              <div 
                key={product._id} 
                className="best-seller-item"
                onClick={() => handleProductClick(product._id)}
              >
                <img 
                  src={product.image} 
                  alt={`Best seller product ${product._id}`}
                // eslint-disable-next-line no-unused-expressions
                  onError={(e) => { e.target.src }}
                />
                <p>{product.name}</p>
              </div>
            ))}
          </div>
          <button className="view-all-button" onClick={handleViewAll}>
            View All
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
