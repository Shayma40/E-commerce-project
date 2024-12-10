const express = require('express');
const { getUserNotifications, markNotificationAsRead } = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for protected routes
const router = express.Router();

// Route to get all notifications for a user
router.get('/', authMiddleware, getUserNotifications);

// Route to mark a specific notification as read
router.put('/:id/read', authMiddleware, markNotificationAsRead);

module.exports = router;
