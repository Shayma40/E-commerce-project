const express = require('express');
const router = express.Router();
const { 
    getAllUsers, 
    getUserById, 
    deleteUser, 
    getAllOrders, 
    updateOrderStatus, 
    getAllProducts, 
    addProduct, 
    deleteProduct,
    getAllSubscribers, 
    sendNewsletter,
    handleUserAction,
    dashboard
} = require('../controllers/adminController');
const Newsletter = require('../models/Newsletter');

const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware'); // Import adminAuthMiddleware
const { body } = require('express-validator');

router.get('/dashboard', authMiddleware, adminAuthMiddleware, dashboard);

// User routes (Admin only)
router.get('/users', authMiddleware, adminAuthMiddleware, getAllUsers);          // Get all users
router.get('/users/:id', authMiddleware, adminAuthMiddleware, getUserById);      // Get user by ID
router.delete('/users/:id', authMiddleware, adminAuthMiddleware, deleteUser);    // Delete user by ID

// Order routes (Admin only)
router.get('/orders', authMiddleware, adminAuthMiddleware, getAllOrders);        // Get all orders
router.put('/orders/:id', authMiddleware, adminAuthMiddleware, updateOrderStatus);  // Update order status

// Product routes (Admin only)
router.get('/products', authMiddleware, adminAuthMiddleware, getAllProducts);      // Get all products
router.post('/products', authMiddleware, adminAuthMiddleware, addProduct);         // Add new product
router.delete('/products/:id', authMiddleware, adminAuthMiddleware, deleteProduct); // Delete product by ID

router.get('/Subscribers', authMiddleware, adminAuthMiddleware, getAllSubscribers);
router.post('/newsletter', authMiddleware, adminAuthMiddleware, sendNewsletter);
router.post('/user-action', authMiddleware, adminAuthMiddleware,
    [
        body('userId').isMongoId().withMessage('Valid user ID is required'),
        body('action').isIn(['promote', 'demote', 'block']).withMessage('Invalid action'),
    ],
    handleUserAction
);

router.get('/newsletter/history', authMiddleware, async (req, res) => {
    try {
      const newsletters = await Newsletter.find().sort({ sentAt: -1 }); // Fetch in descending order of date
        res.json(newsletters);
    } catch (error) {
        console.error('Error fetching newsletter history:', error);
        res.status(500).json({ message: 'Failed to retrieve newsletter history.' });
    }
});


module.exports = router;