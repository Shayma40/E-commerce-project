const express = require('express');
const { createOrder, getUserOrders, getOrderById, getOrderHistory, putOrderId, trackOrder, getOrders } = require('../controllers/orderController'); // Added getOrderById
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/', authMiddleware, createOrder);
router.post('/user-orders', authMiddleware, getUserOrders);
router.get('/history/:orderId', authMiddleware, getOrderHistory);
router.get('/:orderId', authMiddleware, getOrderById);  
router.put('/:orderId', authMiddleware, putOrderId);
// Fetch all past orders for the logged-in user
router.get('/', authMiddleware, getOrders);
// Fetch tracking details for a specific order
router.get('/:orderId/track', authMiddleware, trackOrder);



module.exports = router;

