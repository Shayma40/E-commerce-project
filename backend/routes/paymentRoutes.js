const express = require('express');
const router = express.Router();
const { client } = require('../config/paypalConfig'); 
const paypal = require('@paypal/checkout-server-sdk');
const Order = require('../models/Order');

// Create a new order
router.post('/create-order', async (req, res) => {
  const { total } = req.body;


  if (!total || isNaN(total)) {
    return res.status(400).json({ message: 'Invalid total amount' });
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD', 
        value: total.toFixed(2),
      },
    }],
  });

  try {
    const order = await client.execute(request);
    res.json({
      id: order.result.id,
    });
  } catch (err) {
    console.error('Error creating PayPal order:', err.message);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Capture an order
router.post('/capture-order', async (req, res) => {
  const { orderId, userId, cartItems } = req.body;

  if (!orderId || !userId || !cartItems || !cartItems.length) {
    return res.status(400).json({ message: 'Invalid capture request' });
  }

  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    const newOrder = new Order({
        userId,
        products: cartItems.map(item => ({
          productId: item.product._id,
          quantity: item.quantity
        })),
        totalAmount: capture.result.purchase_units[0].amount.value,
        paymentMethod: 'PayPal',
        status: 'paid',
    });


    await newOrder.save();
    res.json(capture.result);
  } catch (error) {
    console.error('Error capturing PayPal order:', error.message);
    res.status(500).json({ message: 'Error capturing order' });
  }
});

module.exports = router;
