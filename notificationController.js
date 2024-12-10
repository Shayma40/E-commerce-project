const Notification = require('../models/Notification');

// Get notifications for a user
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve notifications', error: error.message });
  }
};

// Mark a notification as read
const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();
    res.status(200).json({ message: 'Notification marked as read.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark notification as read', error: error.message });
  }
};

// Create notification for a user when an order is placed
const createOrderNotification = async (userId, message) => {
    try {
      const notification = new Notification({ user: userId, message });
      await notification.save();
    } catch (error) {
      console.error('Failed to create order notification:', error.message);
    }
  };

module.exports = { getUserNotifications, markNotificationAsRead, createOrderNotification };