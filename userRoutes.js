const express = require('express');
const User = require('../models/User');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../models/mailService');
const router = express.Router();

// POST /register
router.post(
    '/register',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    registerUser
);

// POST /login
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    loginUser
);

// GET /profile
router.get('/profile', authMiddleware, getUserProfile);

// PUT /proifle
router.put('/profile', authMiddleware, async (req, res) => {
    try {
      // Log request data to debug
        console.log('Request Body:', req.body);
        console.log('User ID from Token:', req.user.id);

        const user = await User.findById(req.user.id);
            if (!user) return res.status(404).json({ message: 'User not found' });

      // Log existing user data
        console.log('Existing User Data:', user);

      // Update fields
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;

        await user.save();
        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});  


// POST /forgot-password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        console.log('Email to reset password:', email);


        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        // Generate a reset token and set expiration
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

    // Create reset URL and email message
        const resetURL = `http://localhost:3002/reset-password/${resetToken}`;
        const message = `
            <p>You requested a password reset. Please click the link below to reset your password:</p>
            <a href="${resetURL}">${resetURL}</a>
        `;

        // Send email
        await sendEmail({ 
            to: user.email, 
            subject: 'Password Reset Request', 
            html: message, 
        });

        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error sending password reset email:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /reset-password/:token
router.put('/reset-password/:token', async (req, res) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        console.log('Hashed reset token:', resetPasswordToken);

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            console.log('User not found or token expired'); 
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

      // Update password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save({ validateBeforeSave: false });
        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
