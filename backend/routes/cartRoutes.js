const express = require('express');
const { getCart, addToCart, removeFromCart, clearCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getCart);

router.post('/add', authMiddleware, addToCart );

router.delete('/remove/:id', authMiddleware, removeFromCart);

router.delete('/clear', authMiddleware, clearCart);

module.exports = router;