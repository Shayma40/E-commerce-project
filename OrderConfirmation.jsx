import React, { useState, useEffect } from 'react'; 
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AnnouncementBar from '../Header/AnnouncementBar';
import axios from 'axios';

const OrderConfirmation = () => {
  const location = useLocation();
  // Extract orderID from query parameters or state
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('orderID') || location.state?.orderId;
  console.log('Order Id:', orderId);

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchOrderDetails = async () => {
        if (!orderId) {
          setError('No order ID provided');
          setLoading(false);
          return;
        }
        try {
          const authToken = localStorage.getItem('authToken');
          console.log(`Fetching order details for order ID: ${orderId}`);
          // if (!authToken) {
          //   setError('User is not authenticated.');
          //   setLoading(false);
          //   return;
          // }

          // Use orderId in the URL path for specific order details
          const response = await axios.get(`http://localhost:7800/api/orders/history/${orderId}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          setOrderDetails(response.data);
        } catch (error) {
          console.error('Error fetching order details:', error);
          setError('Failed to fetch order details');
        } finally {
          setLoading(false);
        }
      };
      fetchOrderDetails();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EFECEC',
      color: '#252525', 
      minHeight: '100vh',
      padding: '20px',
    },
    heading: {
      fontSize: '2.5rem',
      color: '#505655',
      marginBottom: '20px',
    },
    paragraph: {
      fontSize: '1.2rem',
      color: '#505655',
      marginBottom: '15px',
      lineHeight: '1.6',
      transition: 'transform 0.3s ease',
    },
    boldText: {
      color: '#252525',
    },
    hoverEffect: {
      transform: 'scale(1.05)',
    },
    orderDetails: {
      width: '100%',
      maxWidth: '600px',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      marginTop: '20px',
    },
    orderItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px',
    },
  };


  return (
    <div>
      <AnnouncementBar />
      <Header />
      <div style={styles.container}>
        <h1 style={styles.heading}>Order Confirmation</h1>
        <p style={styles.paragraph}>Thank you for your purchase!</p>
        {/* Show order details if available */}
        {orderDetails ? (
          <div style={styles.orderDetails}>
            <h2>Order Details</h2>
            <p>
              <strong style={styles.boldText}>Order ID:</strong> {orderDetails._id}
            </p>
            <p>
              <strong style={styles.boldText}>Delivery Address:</strong> {orderDetails.address}
            </p>
            <p>
              <strong style={styles.boldText}>Payment Method:</strong> {orderDetails.paymentMethod}
            </p>
            <h3>Items:</h3>
            <ul>
              {orderDetails.products && orderDetails.products.length > 0 ? (
                orderDetails.products.map((item) => (
                  <li key={item.productId_id} style={styles.orderItem}>
                    <span>{item.productId.name}</span>
                    <span>{item.quantity} x ${item.productId.price}</span>
                  </li>
                ))
              ) : (
                <p>No items found in this order.</p>
              )}
            </ul>
            <h3>Total: ${orderDetails.totalAmount}</h3>
          </div>
        ) : (
          <p>No order details available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
