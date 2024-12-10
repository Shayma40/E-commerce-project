import React, { useContext, useState } from 'react';
import './CheckoutPage.css';
import { useNavigate } from 'react-router';
import { Close } from '@mui/icons-material';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { CartContext } from '../Cart/CartContext';
import apiClient from '../../api';

const CheckoutPage = () => {
  const { calculateTotalAmount, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [email, setEmail] = useState(''); // Email state
  const [bankName, setBankName] = useState(''); 
  const [accountNumber, setAccountNumber] = useState(''); 
  const [iban, setIban] = useState(''); 
  const [swiftCode, setSwiftCode] = useState('');
  const [referenceCode, setReferenceCode] = useState(''); 
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const taxRate = 0.1; // 10% tax
  const shippingCost = 15; // Flat shipping cost
  const subtotal = calculateTotalAmount();
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;


  const createOrder = async ({address, email, paymentMethod}) => {
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }
    const response = await apiClient.post(
      'http://localhost:7800/api/orders',
      { paymentMethod, address, email },
    );

    console.log('CREATED ORDER', response.data);
    setError('');
    return response.data;
  };
  const handleNonPayPalPayment = async () => {
    try {
      if (!address || !email) { // Check for both address and email for COD
        setError('Please enter your delivery address and email');
        return;
      }
      const order = await createOrder({address, email, paymentMethod});
      const generatedOrderId = order.orderCode;
        if (paymentMethod === 'Cash on Delivery') {
          setOrderId(generatedOrderId);
          navigate(`/order-confirmation?orderID=${generatedOrderId}`, 
            { state: { 
              paymentMethod: 'Cash on Delivery', 
              total, 
              address, 
              email 
            },
          });
      } else if (paymentMethod === 'Bank Transfer') {
        if (!cardNumber || !cardHolder || !email || !bankName || !accountNumber || !iban || !swiftCode || !referenceCode) {
          setError('Please complete all bank transfer details');
          return;
        }
        setOrderId(generatedOrderId);
        navigate(`/order-confirmation?orderID=${generatedOrderId}`, 
          { state: { 
            paymentMethod: 'Bank Transfer', 
            total, 
            cardNumber, 
            cardHolder, 
            email, 
            bankName, 
            accountNumber, 
            iban, 
            swiftCode, 
            referenceCode 
          }, 
        });
      }
        await clearCart();
        console.log('Cart has been cleared successfully.');
    } catch (error) {
      setError("Failed to process the order. Please try again.");
      console.error('Error processing order:', error.message);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <Close className="close-icon" onClick={handleClose} />
        </div>

        <div className="payment-method-section">
          <h2>Select Payment Method</h2>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery"
              onChange={(e) => setPaymentMethod(e.target.value)}
            /> Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Bank Transfer"
              onChange={(e) => setPaymentMethod(e.target.value)}
            /> Bank Transfer
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            /> PayPal
          </label>
        </div>

        {error && <p className="error-message">{error}</p>}

        {/* <button className="checkout-button" onClick={handleProceedToPayment}>Proceed to Payment</button> */}

        {paymentMethod === 'Cash on Delivery' && (
          <div className="cod-section">
            <h3>Delivery Address</h3>
            <input
              type="text"
              className="checkout-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
            />
            <h3>Email Address</h3>
            <input
              type="email"
              className="checkout-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <div className="order-summary">
              <h3>Order Summary</h3>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <p>Shipping Cost: ${shippingCost.toFixed(2)}</p>
              <h4>Total: ${total.toFixed(2)}</h4>
            </div>

            <button className="checkout-button" onClick={handleNonPayPalPayment}>Confirm Cash on Delivery</button>
          </div>
        )}

        {paymentMethod === 'Bank Transfer' && (
          <div className="bank-transfer-section">
            <h3>Bank Transfer Details</h3>
            <p>Please fill in your bank transfer details below:</p>
            <input
              type="text"
              className="checkout-input"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Bank Name"
            />
            <input
              type="text"
              className="checkout-input"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Account Number"
            />
            <input
              type="text"
              className="checkout-input"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              placeholder="IBAN"
            />
            <input
              type="text"
              className="checkout-input"
              value={swiftCode}
              onChange={(e) => setSwiftCode(e.target.value)}
              placeholder="Swift Code"
            />
            <input
              type="text"
              className="checkout-input"
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
              placeholder="Reference Code"
            />
            <input
              type="text"
              className="checkout-input"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Cardholder's Name"
            />
            <input
              type="text"
              className="checkout-input"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Card Number"
            />
            <input
              type="email"
              className="checkout-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            <button className="checkout-button" onClick={handleNonPayPalPayment}>Confirm Bank Transfer</button>
          </div>
        )}

        {paymentMethod === 'PayPal' && (
          <div className="paypal-section">
            <PayPalScriptProvider options={{ "client-id": "AeokdnEHKP9QAAabILtfF2BQ7bl6plKUUgHXgPMB1sgp1RPvGjcppoaZAQIKcX6rl3jO97nqrWzzfCOy", currency: "USD" }}>
              <PayPalButtons
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: total.toFixed(2),
                        },
                      },
                    ],
                  }).then((orderId) => {
                    setOrderId(orderId);
                    return orderId;
                  });
                }}
                onApprove={async(data, actions) => {
                  try {
                  await actions.order.capture();
                    await clearCart();
                    navigate(`/order-confirmation?orderID=${orderId}`, { 
                      state: { 
                        paymentMethod: 'PayPal', 
                        total 
                      },
                    });
                    console.log('Payment successful. Cart cleared.');
                  } catch (error) {
                    console.error('Error during PayPal onApprove:', error);
                    setError('Failed to process payment. Please try again.');
                  }
                }}
                onError={(err) => {
                  setError("Payment failed. Please try again.");
                  console.error('PayPal payment error:',err);
                }}
              />
            </PayPalScriptProvider>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
