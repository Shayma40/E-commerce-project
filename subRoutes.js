const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const { sendEmail } = require('../models/mailService');
const crypto = require('crypto');

// Subscribe to the newsletter with Double Opt-In
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    console.log("Received email:", email);

    if (!email) {
        console.log("No Email provided.");
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        let subscriber = await Subscriber.findOne({ email });
        if (subscriber) {
            if (subscriber.confirmed) {
                console.log("Email already confirmed:", email);
                return res.status(400).json({ message: 'This email is already subscribed.' });
            } else {
                console.log("Pending confirmation:", email);
                return res.status(400).json({ message: 'Please confirm your subscription from your email.' });
            }
        }

        // Create a new subscriber with an unconfirmed status
        subscriber = new Subscriber({
            email,
            confirmed: false,
        });

        // Generate and hash the confirmation token
        const confirmationToken = crypto.randomBytes(20).toString('hex');
        subscriber.confirmationToken = crypto.createHash('sha256').update(confirmationToken).digest('hex');
        subscriber.tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token expires in 24 hours
        console.log("Generated token:", confirmationToken);
        console.log("Hashed token:", subscriber.confirmationToken);

        // Save the new subscriber to the database
        await subscriber.save();

        // Send confirmation email with the plain token (not hashed)
        const confirmURL = `http://localhost:3002/confirm-subscription/${confirmationToken}`;
        console.log("Confirmation URL:", confirmURL);
        const subject = "Confirm Your Subscription";
        const content = `
            <h1>Confirm Your Subscription</h1>
            <p>Thank you for subscribing! Please confirm your subscription by clicking the link below:</p>
            <a href="${confirmURL}">Confirm Subscription</a>
        `;

        await sendEmail({
            to: email,
            subject,
            html: content,
        });

        console.log("Confirmation email sent:", email);
        res.status(201).json({ message: 'Confirmation email sent. Please check your inbox.' });
    } catch (error) {
        console.error('Error subscribing:', error);
        res.status(500).json({ message: 'Failed to subscribe. Please try again.', error: error.message });
    }
});

// Confirm Subscription Route
router.get('/confirm-subscription/:token', async (req, res) => {
    try {
        const receivedToken = req.params.token;
        console.log("Received token:", receivedToken);

        // Hash the token for comparison
        const hashedToken = crypto.createHash('sha256').update(receivedToken).digest('hex');
        console.log("Hashed token for lookup:", hashedToken);

        // Find subscriber with the matching hashed token and not expired
        const subscriber = await Subscriber.findOne({ 
            confirmationToken: hashedToken,
            tokenExpires: { $gt: Date.now() }
        });
        
        if (!subscriber) {
            console.log("No matching subscriber for hashed token:", hashedToken);
            return res.status(400).json({ message: 'Invalid or expired confirmation token.' });
        }

        const subscribers = await Subscriber.find();
        console.log("All Subscribers in DB:", subscribers);

        // Confirm the subscription and clear the token
        subscriber.confirmed = true;
        subscriber.confirmationToken = null;
        subscriber.tokenExpires = null;
        await subscriber.save();

        console.log("Subscription confirmed for:", subscriber.email);
        res.json({ message: 'Subscription confirmed successfully!' });
    } catch (error) {
        console.error('Error confirming subscription:', error);
        res.status(500).json({ message: 'Failed to confirm subscription.', error: error.message });
    }
});

module.exports = router;