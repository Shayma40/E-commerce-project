const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Subscriber = require('../models/Subscriber');
const { sendEmail } = require('../models/mailService');
const Newsletter = require('../models/Newsletter');
// const { validationResult } = require('express-validator');


const dashboard = async (req, res) => {
    try {
        // Fetch data for admin dashboard
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const users = await User.find({}).select('-password');
        const orders = await Order.find({});
        const products = await Product.find({})

        // Return stats to the frontend
        res.status(200).json({
            stats: {
                totalUsers,
                totalOrders,
                totalProducts
            },
            users,
            orders,
            products
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ message: 'Failed to load dashboard data' });
    }
};


// Get all users (Admin only)
const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message:'Error fetching users', error: error.message });
    }
};


// Get a single user by ID (Admin only)
const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message:'Failed to retrieve user', error: error.message });
    }
};


// Delete a user by ID (Admin only)
const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message:'Failed to delete user', error: error.message });
    }
};


// Enhanced User Action Handler for Admin 
const handleUserAction = async (req, res) => {
    const { action, userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (action === 'promote') user.isAdmin = true;
        else if (action === 'demote') user.isAdmin = false;
        else if (action === 'block') user.isBlocked = true;
        else return res.status(400).json({ message: 'Invalid action' });

        await user.save();
        res.status(200).json({ message: 'User action completed successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to perform user action', error: error.message });
    }
};


// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message:'Failed to retrieve orders', error: error.message });
    }
};


// Update an order status (Admin only)
const updateOrderStatus = async (req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        order.status = req.body.status;
        await order.save();
        res.status(200).json({ message: 'Order status updated successfully.', order });
    } catch (error) {
        res.status(500).json({ message:'Failed to update order', error: error.message });
    }
};


// Get all products (Admin only)
const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message:'Failed to retrieve products', error: error.message });
    }
};


// Add a new product (Admin only)
const addProduct = async (req, res) => {
    try{
        const { name, price, description, category, image, stock, colors, sizes } = req.body;
        const product = new Product({
            name,
            price,
            description,
            category,
            image,
            stock,
            colors,
            sizes
        });

        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(500).json({ message:'Failed to create product', error: error.message });
    }
};


// Delete a product by ID (Admin only)
const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message:'Failed to delete product', error: error.message });
    }
};


//Get all subscribers (Admin only)
const getAllSubscribers = async (req, res) => {
    try{
        const subscribers = await Subscriber.find().sort({ subscribedAT: -1 });
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message:'Failed to retrieve subscribers', error: error.message });
    }
};

// Send a newsletter to all subscribers (Admin only)
const sendNewsletter = async (req, res) => {
    const { subject, content } = req.body;

    try {
        const subscribers = await Subscriber.find({});
        const subscriberEmails = [...new Set(subscribers.map(subscriber => subscriber.email))];
        await Newsletter.create({ subject, content, sentAt: new Date() });
        console.log('Newsletter sent to all subscribers!', subscriberEmails);
      // Send the email to all subscribers
        for (let email of subscriberEmails) {
            await sendEmail({
                to:email, 
                subject, 
                html: `<p>${content}</p>`
            });
        }
        res.status(200).json({ message: 'Newsletter sent to all subscribers!' });
    } catch (error) {
        console.error('Error sending newsletter:', error);
        res.status(500).json({ message: 'Failed to send newsletter', error: error.message });
    }
};


module.exports = {
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
};
