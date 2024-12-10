const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create order
const createOrder = async (req, res) => {

    const { paymentMethod, address, email  } = req.body;
    console.log('CREATING ORDER:', paymentMethod, req.user);
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
        console.log('Cart fetched:', cart)
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty.' });
        }
    
        // Calculate total amount
        const totalAmount = cart.products.reduce((total, item) => {
            return total + item.quantity * item.productId.price;
        }, 0);
    
        // Generate custom order ID
        const orderCode = `COD-${Date.now()}`;
    
        // Create new order
        const newOrder = new Order({
            userId: req.user.id,
            orderCode, // Set custom order ID
            products: cart.products.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
            })),
            totalAmount,
            paymentMethod,
            status: 'Pending',
            address,
            email
        });
    
        const saveOrder = await newOrder.save();
        console.log('Order saved:', saveOrder);

        await Cart.updateOne(
            { userId: req.user.id },
            { $set: { products: [] } }
        );
        console.log('Cart cleared:');
    
        res.status(201).json(saveOrder);
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Get user orders
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send('Server error');
    }
};

const getOrderHistory = async (req, res) => {
    try {
        const orderId = req.params.orderId
        console.log(`Fetching order history for user ID: ${req.user.id}`)
        const order = await Order.findOne({ orderCode:req.params.orderId });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).send('Server error');
    }
};

// Get a single order by orderId
const getOrderById = async (req, res) => {
    try {
        console.log('fetching order with ID:', orderId);
        const order = await Order.findOne({ _id: orderId, userId: req.user.id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order); // Send single order back as response
    } catch (err) {
        console.error('Error fetching order by ID:', err);
        res.status(500).send('Server error');
    }
};

const putOrderId = async (req, res) => {
    try {
        const orderId = req.params.orderId
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        if (!req.body.status) {
            return res.status(400).json({ message: 'Status is required' });
        }
        order.status = req.body.status;
        await order.save();
        res.json(order);
    } catch (err) {
        console.error('Error updating order status:', err);
        res.status(500).json({message:'Server error', error: err.message });
    }
};

// Fetch all past orders for the logged-in user
const getOrders = async (req, res) => {
    const email = req.user.email; // Retrieved from authenticate middleware
    if (!email) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const orders = await Order.find({ email: email });

    if (orders.length) {
        res.status(200).json(orders);
    } else {
        res.status(404).json({ message: 'No orders found' });
    }
};

// Fetch tracking details for a specific order
const trackOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findOne({ _id: orderId, email: req.user.email });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({
            status: order.status,
            estimatedDelivery: order.tracking.estimatedDelivery ,
            lastUpdated: order.tracking.lastUpdated ,
        });
        console.log('Track Order API called with:', { orderId });
    } catch (error) {
        console.error('Error fetching tracking information:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createOrder, getUserOrders, getOrderById, getOrderHistory, putOrderId, getOrders, trackOrder };
